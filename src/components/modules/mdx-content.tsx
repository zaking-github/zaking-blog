import * as React from "react"
import Image from "next/image"
import * as runtime from "react/jsx-runtime"
import { cn } from "@/lib/utils"
import { VisitsChart } from "@/components/modules/visualization/visits-chart"

const useMDXComponent = (code: string) => {
  const fn = new Function(code)
  return fn({ ...runtime }).default
}

const components = {
  Image,
  VisitsChart,
}

interface MDXContentProps {
  code: string
  className?: string
}

export function MDXContent({ code, className }: MDXContentProps) {
  const Component = useMDXComponent(code)
  return (
    <div className={cn("prose prose-zinc dark:prose-invert max-w-none", className)}>
      <Component components={components} />
    </div>
  )
}
