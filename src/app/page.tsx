import { posts } from "#site/content"
import { ArrowRight, BookOpen, Layers3, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { PostItem } from "@/components/modules/post-item"
import { Button } from "@/components/ui/button"

const focusAreas = [
  { label: "JavaScript", href: "/category/javascript", count: "源码阅读" },
  { label: "Engineering", href: "/category/engineering", count: "工程实践" },
  { label: "Visualization", href: "/category/visualization", count: "可视化" },
]

export default function Home() {
  const latestPosts = posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 lg:py-16">
      <section className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
        <div className="space-y-7">
          <h1 className="max-w-3xl text-balance text-5xl font-semibold leading-[1.04] tracking-tight text-foreground md:text-6xl">
            写给长期主义前端工程师的技术札记
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
            聚焦 JavaScript 源码、工程化实践、性能优化和可视化，把复杂知识整理成可复盘、可迁移的技术文章。
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full px-6">
              <Link href="/posts">
                浏览文章 <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-6">
              <Link href="/category/javascript">JavaScript 栏目</Link>
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card/80 p-3 shadow-[0_30px_90px_oklch(0.28_0.08_150_/_0.16)]">
          <Image
            src="/illustrations/blog-hero.png"
            alt="前端工程博客插图"
            width={1280}
            height={900}
            priority
            className="aspect-[4/3] w-full rounded-[1.55rem] object-cover"
          />
        </div>
      </section>

      <section className="mt-14 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-3xl border border-border/70 bg-card/80 p-5 shadow-[0_20px_70px_oklch(0.3_0.08_150_/_0.1)] backdrop-blur">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Sparkles className="size-5" />
            </span>
            <div>
              <p className="text-sm font-medium">Latest Dispatch</p>
              <p className="text-xs text-muted-foreground">持续整理中的知识库</p>
            </div>
          </div>
          <div className="space-y-3">
            {focusAreas.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/55 px-4 py-3 transition-colors hover:border-primary/30 hover:bg-accent/70"
              >
                <span className="font-medium">{item.label}</span>
                <span className="text-sm text-muted-foreground">{item.count}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-4 rounded-3xl border border-border/70 bg-card/75 p-5 md:grid-cols-[220px_1fr] md:items-center">
          <Image
            src="/illustrations/source-architecture.png"
            alt="源码架构插图"
            width={900}
            height={640}
            className="aspect-[4/3] w-full rounded-2xl object-cover"
          />
          <p className="text-balance text-lg leading-8 text-muted-foreground">
            站点内容按照主题分类沉淀，每篇文章优先保留可运行的代码、关键设计取舍和容易踩坑的实现细节。
          </p>
        </div>
      </section>

      <section className="mt-16 space-y-6">
        <div className="flex flex-col justify-between gap-4 border-t border-border/70 pt-8 md:flex-row md:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-primary">
              <BookOpen className="size-4" />
              最新文章
            </div>
            <h2 className="text-3xl font-semibold tracking-tight">最近更新</h2>
          </div>
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            查看全部 <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {latestPosts.slice(0, 6).map((post) => (
            <PostItem key={post.slug} {...post} />
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-4 rounded-3xl border border-border/70 bg-primary/8 p-6 md:grid-cols-[auto_1fr] md:items-center">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Layers3 className="size-5" />
        </span>
        <p className="text-balance text-lg leading-8 text-muted-foreground">
          从单篇文章到分类沉淀，目标是把经验写成可以长期查阅的工程手册。
        </p>
      </section>
    </div>
  )
}
