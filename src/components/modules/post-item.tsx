import Link from "next/link"
import { ArrowUpRight, Calendar } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface PostItemProps {
  slug: string
  title: string
  description?: string
  date: string
  category: string
  tags?: string[]
}

export function PostItem({
  slug,
  title,
  description,
  date,
  category,
  tags,
}: PostItemProps) {
  return (
    <Card className="group h-full overflow-hidden border-border/70 bg-card/85 shadow-[0_18px_60px_oklch(0.25_0.06_150_/_0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_24px_70px_oklch(0.35_0.08_150_/_0.13)]">
      <CardHeader className="gap-5">
        <div className="flex items-center justify-between gap-4">
          <Badge
            variant="secondary"
            className="border border-primary/10 bg-primary/10 text-primary"
          >
            {category}
          </Badge>
          <time className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="size-3.5" />
            {formatDate(date)}
          </time>
        </div>
        <Link href={`/${slug}`} className="block">
          <h3 className="text-balance text-2xl font-semibold leading-tight tracking-tight transition-colors group-hover:text-primary">
            {title}
          </h3>
        </Link>
      </CardHeader>
      <CardContent className="flex-1">
        {description && (
          <p className="line-clamp-3 leading-7 text-muted-foreground">
            {description}
          </p>
        )}
      </CardContent>
      <CardFooter className="justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {tags?.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs text-muted-foreground">
              #{tag}
            </span>
          ))}
        </div>
        <ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
      </CardFooter>
    </Card>
  )
}
