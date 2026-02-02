import { posts } from "#site/content"
import { PostItem } from "@/components/modules/post-item"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog",
  description: "All posts on the blog",
}

export default function PostsPage() {
  const allPosts = posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl">Blog</h1>
          <p className="text-xl text-muted-foreground">
            所有文章列表。
          </p>
        </div>
      </div>
      <hr className="mt-8" />
      <div className="grid gap-10 sm:grid-cols-2 mt-8">
        {allPosts.length > 0 ? (
          allPosts.map((post) => (
            <PostItem key={post.slug} {...post} />
          ))
        ) : (
          <p>No posts published.</p>
        )}
      </div>
    </div>
  )
}
