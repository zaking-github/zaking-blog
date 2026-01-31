import { posts } from "#site/content"
import { notFound } from "next/navigation"
import { MDXContent } from "@/components/modules/mdx-content"
import { TableOfContents } from "@/components/modules/toc"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { Metadata } from "next"

interface PostPageProps {
  params: Promise<{
    slug: string[]
  }>
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const { slug } = await params
  const slugPath = slug.join("/")
  const post = posts.find((post) => post.slugAsParams === slugPath)
  return post
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
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
          url: `/api/og?title=${post.title}`, // Needs implementation later
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

  return (
    <article className="container relative max-w-screen-2xl py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-primary border-primary/20">
              {post.category}
            </Badge>
            <time className="text-sm text-muted-foreground">
              {formatDate(post.date)}
            </time>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            {post.title}
          </h1>
          {post.description && (
            <p className="text-xl text-muted-foreground">{post.description}</p>
          )}
        </div>
        <div className="border-b border-border/40 pb-8 mb-8" />
        <MDXContent code={post.body} />
        
        <div className="mt-10 border-t pt-8">
            <div className="flex gap-2">
                {post.tags.map(tag => (
                    <span key={tag} className="text-sm text-muted-foreground">#{tag}</span>
                ))}
            </div>
        </div>
      </div>
      
      {/* TOC Sidebar */}
      <div className="hidden text-sm xl:block">
        <div className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto pr-4">
          <TableOfContents toc={post.toc} />
        </div>
      </div>
    </article>
  )
}
