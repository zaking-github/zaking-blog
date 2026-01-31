import Link from "next/link"
import { Calendar } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

// Define a type interface based on Velite schema
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
    <Card className="flex flex-col h-full hover:border-foreground/50 transition-colors bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex justify-between items-start gap-4 mb-2">
           <Badge variant="secondary" className="hover:bg-secondary/80">
             {category}
           </Badge>
           <time className="text-sm text-muted-foreground flex items-center gap-1">
             <Calendar className="h-3 w-3" />
             {formatDate(date)}
           </time>
        </div>
        <Link href={`/${slug}`} className="hover:underline underline-offset-4 decoration-primary">
          <h3 className="text-2xl font-bold leading-tight tracking-tighter">
            {title}
          </h3>
        </Link>
      </CardHeader>
      <CardContent className="flex-1">
        {description && (
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex gap-2 flex-wrap">
        {tags?.slice(0, 3).map((tag) => (
          <span key={tag} className="text-xs text-muted-foreground/80">
            #{tag}
          </span>
        ))}
      </CardFooter>
    </Card>
  )
}
