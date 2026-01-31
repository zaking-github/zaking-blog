import { posts } from "#site/content"
import { PostItem } from "@/components/modules/post-item"
import { siteConfig } from "@/lib/config"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  const latestPosts = posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="space-y-16 py-10">
      {/* Hero Section */}
      <section className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:items-center">
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Building the <span className="text-primary">Next</span> Web
          </h1>
          <p className="text-xl text-muted-foreground max-w-[600px]">
            资深前端架构师的个人技术博客。分享 Next.js 生态、高性能工程化实践以及前沿的可视化技术。
          </p>
          <div className="flex gap-4">
            <Link href="/about">
              <Button size="lg">关于我</Button>
            </Link>
            <Link href="/posts">
              <Button variant="outline" size="lg">
                浏览文章 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">最新文章</h2>
          <Link
            href="/posts"
            className="text-muted-foreground hover:text-foreground hover:underline underline-offset-4"
          >
            View all posts →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <PostItem key={post.slug} {...post} />
          ))}
        </div>
      </section>
    </div>
  )
}