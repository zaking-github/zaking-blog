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
    <div className="mx-auto max-w-6xl px-4 py-10 lg:py-16">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
          Archive
        </p>
        <h1 className="text-balance text-5xl font-semibold tracking-tight">
          全部文章
        </h1>
        <p className="text-lg leading-8 text-muted-foreground">
          按时间整理所有已发布内容，覆盖源码阅读、工程实践、性能优化和可视化。
        </p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {allPosts.length > 0 ? (
          allPosts.map((post) => <PostItem key={post.slug} {...post} />)
        ) : (
          <p className="text-muted-foreground">暂无已发布文章。</p>
        )}
      </div>
    </div>
  )
}
