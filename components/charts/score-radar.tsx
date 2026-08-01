"use client"

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { pct } from "@/lib/format"
import type { ScoreCategory } from "@/lib/data/scorecard"

const config = { attainment: { label: "Attainment", color: "var(--chart-1)" } } satisfies ChartConfig

export function ScoreRadar({ categories }: { categories: ScoreCategory[] }) {
  const data = categories.map((c) => ({
    axis: c.short,
    attainment: Number(c.attainment.toFixed(1)),
    earned: Number(c.earned.toFixed(1)),
    weight: c.weight,
  }))

  return (
    <ChartContainer config={config} className="mx-auto aspect-square max-h-85 w-full">
      <RadarChart data={data} outerRadius="68%" margin={{ top: 8, right: 52, bottom: 8, left: 52 }}>
        <PolarGrid className="stroke-border" radialLines gridType="polygon" />
        <PolarAngleAxis dataKey="axis" className="text-xs" tick={{ fill: "currentColor" }} />
        <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
        <ChartTooltip
          content={
            <ChartTooltipContent
              hideIndicator
              formatter={(value, _n, item) => (
                <div>
                  <p className="font-medium">{item?.payload?.axis}</p>
                  <p className="text-muted-foreground">
                    {pct(Number(value), 0)} · {item?.payload?.earned}/{item?.payload?.weight} pts
                  </p>
                </div>
              )}
            />
          }
        />
        <Radar
          dataKey="attainment"
          stroke="var(--chart-1)"
          strokeWidth={2}
          fill="var(--chart-1)"
          fillOpacity={0.15}
          dot={{ r: 3.5, fill: "var(--chart-1)", strokeWidth: 0 }}
        />
      </RadarChart>
    </ChartContainer>
  )
}
