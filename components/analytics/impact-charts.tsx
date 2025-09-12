"use client"

import {
  Line,
  LineChart,
  Bar,
  BarChart,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

// Sample data - in real app this would come from database
const monthlyData = [
  { month: "Jan", wasteCollected: 1200, volunteers: 45, events: 8, carbonOffset: 2400 },
  { month: "Feb", wasteCollected: 1800, volunteers: 62, events: 12, carbonOffset: 3600 },
  { month: "Mar", wasteCollected: 2200, volunteers: 78, events: 15, carbonOffset: 4400 },
  { month: "Apr", wasteCollected: 2800, volunteers: 95, events: 18, carbonOffset: 5600 },
  { month: "May", wasteCollected: 3200, volunteers: 112, events: 22, carbonOffset: 6400 },
  { month: "Jun", wasteCollected: 3800, volunteers: 128, events: 25, carbonOffset: 7600 },
]

const wasteTypeData = [
  { name: "Plastic Bottles", value: 35, color: "#ef4444" },
  { name: "Plastic Bags", value: 25, color: "#f97316" },
  { name: "Food Containers", value: 20, color: "#eab308" },
  { name: "Fishing Nets", value: 12, color: "#22c55e" },
  { name: "Other", value: 8, color: "#6b7280" },
]

const locationData = [
  { location: "Marine Drive", events: 15, impact: 2400 },
  { location: "Juhu Beach", events: 12, impact: 1800 },
  { location: "Versova Beach", events: 18, impact: 2800 },
  { location: "Worli Seaface", events: 8, impact: 1200 },
  { location: "Bandra Bandstand", events: 10, impact: 1500 },
]

export function ImpactCharts() {
  const [timeRange, setTimeRange] = useState("6months")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="1year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Progress</CardTitle>
            <CardDescription>Waste collection and volunteer growth over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                wasteCollected: {
                  label: "Waste Collected (kg)",
                  color: "hsl(var(--chart-1))",
                },
                volunteers: {
                  label: "Active Volunteers",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="wasteCollected"
                    stroke="var(--color-wasteCollected)"
                    strokeWidth={2}
                    name="Waste Collected (kg)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="volunteers"
                    stroke="var(--color-volunteers)"
                    strokeWidth={2}
                    name="Active Volunteers"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Waste Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Waste Type Distribution</CardTitle>
            <CardDescription>Breakdown of collected waste by type</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Percentage",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={wasteTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {wasteTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="bg-background border rounded-lg p-2 shadow-lg">
                            <p className="font-medium">{data.name}</p>
                            <p className="text-sm text-muted-foreground">{data.value}%</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Carbon Offset Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Carbon Offset Impact</CardTitle>
            <CardDescription>CO₂ reduction achieved through cleanup activities</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                carbonOffset: {
                  label: "Carbon Offset (kg CO₂)",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="carbonOffset"
                    stroke="var(--color-carbonOffset)"
                    fill="var(--color-carbonOffset)"
                    fillOpacity={0.3}
                    name="Carbon Offset (kg CO₂)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Location Impact */}
        <Card>
          <CardHeader>
            <CardTitle>Impact by Location</CardTitle>
            <CardDescription>Cleanup events and environmental impact by area</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                events: {
                  label: "Events",
                  color: "hsl(var(--chart-4))",
                },
                impact: {
                  label: "Impact Score",
                  color: "hsl(var(--chart-5))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={locationData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="location" type="category" width={100} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="events" fill="var(--color-events)" name="Events" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
