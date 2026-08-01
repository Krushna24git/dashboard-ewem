"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export type Series = { key: string; label: string; color: string }

export function RankedBar({
  data,
  series,
  format,
  height,
  stacked = false,
  labelWidth = 108,
}: {
  data: Record<string, string | number>[]
  series: Series[]
  format: (value: number) => string
  height?: number
  stacked?: boolean
  labelWidth?: number
}) {
  const config = series.reduce((acc, s) => {
    acc[s.key] = { label: s.label, color: s.color }
    return acc
  }, {} as ChartConfig)

  return (
    <ChartContainer
      config={config}
      className="aspect-auto w-full"
      style={{ height: height ?? Math.max(170, data.length * 26 + (series.length > 1 ? 48 : 20)) }}
    >
      <BarChart
        accessibilityLayer
        data={data}
        layout="vertical"
        margin={{ top: 2, right: 12, bottom: 2, left: 0 }}
        barCategoryGap="24%"
      >
        <CartesianGrid horizontal={false} strokeDasharray="2 5" className="stroke-border/70" />
        <XAxis
          type="number"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(v) => format(Number(v))}
          className="text-xs"
        />
        <YAxis
          type="category"
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          width={labelWidth}
          interval={0}
          className="text-xs"
        />
        <ChartTooltip
          cursor={{ className: "fill-muted/50" }}
          content={
            <ChartTooltipContent
              formatter={(value, name) => (
                <div className="flex w-full items-center justify-between gap-4">
                  <span className="text-muted-foreground">
                    {config[name as string]?.label ?? name}
                  </span>
                  <span className="tnum font-medium">{format(Number(value))}</span>
                </div>
              )}
            />
          }
        />
        {series.length > 1 ? <ChartLegend content={<ChartLegendContent />} /> : null}
        {series.map((s, i) => (
          <Bar
            key={s.key}
            dataKey={s.key}
            fill={`var(--color-${s.key})`}
            stackId={stacked ? "a" : undefined}
            radius={stacked && i < series.length - 1 ? [0, 0, 0, 0] : [0, 5, 5, 0]}
            stroke={stacked ? "var(--card)" : undefined}
            strokeWidth={stacked ? 2 : 0}
          />
        ))}
      </BarChart>
    </ChartContainer>
  )
}
