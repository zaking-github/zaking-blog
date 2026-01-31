"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface TocItem {
  title: string
  url: string
  items?: TocItem[]
}

interface TocProps {
  toc: TocItem[]
}

export function TableOfContents({ toc }: TocProps) {
  const [activeId, setActiveId] = React.useState<string | null>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0% 0% -80% 0%" }
    )

    const headings = document.querySelectorAll("h2, h3")
    headings.forEach((heading) => observer.observe(heading))

    return () => {
      headings.forEach((heading) => observer.unobserve(heading))
    }
  }, [])

  if (!toc?.length) return null

  return (
    <nav className="space-y-2">
      <h4 className="font-medium">On This Page</h4>
      <Tree tree={toc} activeId={activeId} />
    </nav>
  )
}

function Tree({
  tree,
  level = 1,
  activeId,
}: {
  tree: TocItem[]
  level?: number
  activeId: string | null
}) {
  if (!tree?.length || level > 3) return null

  return (
    <ul className={cn("m-0 list-none", { "pl-4": level !== 1 })}>
      {tree.map((item, index) => (
        <li key={index} className="mt-0 pt-2">
          <Link
            href={item.url}
            className={cn(
              "inline-block no-underline transition-colors hover:text-foreground",
              item.url === `#${activeId}`
                ? "font-medium text-foreground"
                : "text-muted-foreground"
            )}
          >
            {item.title}
          </Link>
          {item.items?.length ? (
            <Tree tree={item.items} level={level + 1} activeId={activeId} />
          ) : null}
        </li>
      ))}
    </ul>
  )
}
