import Link from "next/link"
import { Github, Leaf } from "lucide-react"
import { siteConfig } from "@/lib/config"
import { ModeToggle } from "@/components/shared/mode-toggle"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center px-4">
        <Link href="/" className="mr-7 flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary shadow-sm">
            <Leaf className="size-4" />
          </span>
          <span className="font-semibold tracking-tight">{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-border/70 bg-card/70 p-1 text-sm font-medium shadow-sm md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Github className="size-4" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
