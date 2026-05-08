import { posts } from "#site/content"
import Image from "next/image"
import { PostItem } from "@/components/modules/post-item"
import { notFound } from "next/navigation"

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

export async function generateStaticParams() {
  const categories = Array.from(new Set(posts.map((post) => post.category)))
  return categories.map((category) => ({
    category: category.toLowerCase(),
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params

  const filteredPosts = posts
    .filter(
      (post) =>
        post.category.toLowerCase() === category.toLowerCase() && post.published
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  if (filteredPosts.length === 0) {
    notFound()
  }

  const categoryName = filteredPosts[0].category

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 lg:py-16">
      <div className="grid gap-5 rounded-3xl border border-border/70 bg-card/80 p-6 shadow-[0_24px_80px_oklch(0.3_0.08_150_/_0.1)] md:grid-cols-[1fr_320px] md:items-center md:p-8">
        <div>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-primary">
            Category
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            {categoryName}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
            当前分类下共有 {filteredPosts.length} 篇文章，集中记录这一主题的概念、实践和代码细节。
          </p>
        </div>
        <Image
          src="/illustrations/source-architecture.png"
          alt={`${categoryName} 分类插图`}
          width={900}
          height={640}
          className="aspect-[4/3] w-full rounded-2xl object-cover"
        />
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <PostItem key={post.slug} {...post} />
        ))}
      </div>
    </div>
  )
}
