import { posts } from "#site/content"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import Image from "next/image"
import { MDXContent } from "@/components/modules/mdx-content"
import { TableOfContents } from "@/components/modules/toc"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"

interface PostPageProps {
  params: Promise<{
    slug: string[]
  }>
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const { slug } = await params
  const slugPath = slug.join("/")
  return posts.find((post) => post.slugAsParams === slugPath)
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  const ogSearchParams = new URLSearchParams({ title: post.title })
  if (post.description) {
    ogSearchParams.set("description", post.description)
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: post.permalink,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
        },
      ],
    },
  }
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  const illustration =
    post.slugAsParams === "handwritten-promise"
      ? {
          src: "/illustrations/promise-state-machine.png",
          alt: "Promise 状态机与回调队列插图",
        }
      : null

  return (
    <article className="mx-auto grid max-w-6xl gap-10 px-4 py-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:py-14">
      <div className="min-w-0">
        <header className="rounded-3xl border border-border/70 bg-card/85 p-6 shadow-[0_24px_80px_oklch(0.3_0.08_150_/_0.1)] md:p-8">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <Badge
              variant="secondary"
              className="border border-primary/10 bg-primary/10 text-primary"
            >
              {post.category}
            </Badge>
            <time className="text-sm text-muted-foreground">
              {formatDate(post.date)}
            </time>
          </div>
          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            {post.title}
          </h1>
          {post.description && (
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
              {post.description}
            </p>
          )}
        </header>

        {illustration && (
          <div className="mt-8 overflow-hidden rounded-3xl border border-border/70 bg-card/85 p-3 shadow-[0_22px_70px_oklch(0.28_0.08_150_/_0.13)]">
            <Image
              src={illustration.src}
              alt={illustration.alt}
              width={1200}
              height={760}
              priority
              className="aspect-[16/9] w-full rounded-[1.35rem] object-cover"
            />
          </div>
        )}

        <div className="mt-8 rounded-3xl border border-border/70 bg-card/85 p-5 shadow-[0_18px_60px_oklch(0.3_0.08_150_/_0.08)] md:p-8">
          <MDXContent code={post.body} />
        </div>

        <footer className="mt-8 rounded-3xl border border-border/70 bg-card/70 p-5">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border/70 bg-background/60 px-3 py-1 text-sm text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        </footer>
      </div>

      <aside className="hidden text-sm lg:block">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-3xl border border-border/70 bg-card/70 p-5 shadow-sm">
          <TableOfContents toc={post.toc} />
        </div>
      </aside>
    </article>
  )
}
