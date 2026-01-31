import { posts } from "#site/content"
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
  
  const filteredPosts = posts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase() && post.published
  )

  if (filteredPosts.length === 0) {
    notFound()
  }

  return (
    <div className="space-y-10 py-10">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Category: <span className="capitalize text-primary">{category}</span>
        </h1>
        <p className="text-muted-foreground">
          Explore all articles in the {category} technical column.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <PostItem key={post.slug} {...post} />
        ))}
      </div>
    </div>
  )
}
