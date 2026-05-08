import * as React from "react"
import Image from "next/image"
import * as runtime from "react/jsx-runtime"
import { cn } from "@/lib/utils"
import { VisitsChart } from "@/components/modules/visualization/visits-chart"

const getMDXComponent = (code: string) => {
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
  const Component = getMDXComponent(code)
  return (
    <div
      className={cn(
        "prose prose-zinc dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-p:leading-8 prose-li:leading-8 prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-code:rounded-md prose-code:bg-accent/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none",
        className
      )}
    >
      {React.createElement(Component, { components })}
    </div>
  )
}
