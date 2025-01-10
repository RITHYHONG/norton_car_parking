"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Available", value: 20, color: "hsl(var(--chart-1))" },
  { name: "Occupied", value: 70, color: "hsl(var(--chart-2))" },
  { name: "Reserved", value: 10, color: "hsl(var(--chart-3))" },
]

export function ParkingOverview() {
  return (
    <ChartContainer
      config={{
        available: {
          label: "Available",
          color: "hsl(var(--chart-1))",
        },
        occupied: {
          label: "Occupied",
          color: "hsl(var(--chart-2))",
        },
        reserved: {
          label: "Reserved",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[300px] w-full"
    >
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="70%"
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend layout="vertical" align="right" verticalAlign="middle" />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

