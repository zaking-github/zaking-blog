"use client"

import * as React from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"
import { useTheme } from "next-themes"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: "Jan", visits: 400 },
  { name: "Feb", visits: 300 },
  { name: "Mar", visits: 2000 },
  { name: "Apr", visits: 2780 },
  { name: "May", visits: 1890 },
  { name: "Jun", visits: 2390 },
  { name: "Jul", visits: 3490 },
]

export function VisitsChart() {
  const { theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="h-[350px] w-full bg-muted/10 animate-pulse rounded-lg" />

  const isDark = theme === "dark"
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Visits (Interactive Demo)</CardTitle>
      </CardHeader>
      <CardContent className="pl-0">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <XAxis 
              dataKey="name" 
              stroke="#888888" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
            />
            <YAxis 
              stroke="#888888" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip 
                contentStyle={{ 
                    backgroundColor: isDark ? "#1f1f1f" : "#fff",
                    borderColor: isDark ? "#333" : "#eee",
                    borderRadius: "8px"
                }}
            />
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
            <Line 
              type="monotone" 
              dataKey="visits" 
              stroke="var(--color-primary)" 
              strokeWidth={2}
              activeDot={{ r: 8 }}
              style={
                {
                  stroke: "var(--primary)",
                } as React.CSSProperties
              }
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
