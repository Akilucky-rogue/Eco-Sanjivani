"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", waste: 45, events: 3, volunteers: 12 },
  { month: "Feb", waste: 52, events: 4, volunteers: 18 },
  { month: "Mar", waste: 48, events: 5, volunteers: 25 },
  { month: "Apr", waste: 61, events: 6, volunteers: 32 },
  { month: "May", waste: 55, events: 4, volunteers: 28 },
  { month: "Jun", waste: 67, events: 7, volunteers: 45 },
  { month: "Jul", waste: 69, events: 8, volunteers: 52 },
  { month: "Aug", waste: 76, events: 9, volunteers: 61 },
  { month: "Sep", waste: 82, events: 11, volunteers: 68 },
  { month: "Oct", waste: 89, events: 12, volunteers: 75 },
  { month: "Nov", waste: 95, events: 14, volunteers: 82 },
  { month: "Dec", waste: 127, events: 16, volunteers: 95 },
]

const chartConfig = {
  waste: {
    label: "Waste Collected (kg)",
    color: "hsl(var(--chart-1))",
  },
  events: {
    label: "Events Participated",
    color: "hsl(var(--chart-2))",
  },
  volunteers: {
    label: "Volunteers Recruited",
    color: "hsl(var(--chart-3))",
  },
}

export function ImpactChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Impact Over Time</CardTitle>
        <CardDescription>Track your environmental contribution throughout the year</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="waste"
                stackId="1"
                stroke="var(--color-waste)"
                fill="var(--color-waste)"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="volunteers"
                stackId="1"
                stroke="var(--color-volunteers)"
                fill="var(--color-volunteers)"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
