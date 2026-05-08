import { siteConfig } from "@/lib/config"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. 记录前端工程、源码阅读与实践。
        </p>
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-foreground decoration-primary/40 underline-offset-4 hover:text-primary hover:underline"
        >
          GitHub
        </a>
      </div>
    </footer>
  )
}
