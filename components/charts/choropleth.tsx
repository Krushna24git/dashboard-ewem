"use client"

import * as React from "react"
import { motion } from "framer-motion"

import { DISTRICT_SHAPES, MAP_VIEWBOX } from "@/lib/data/odisha-geometry"
import { num, pct } from "@/lib/format"
import type { DistrictRecord } from "@/lib/data/dataset"

export type MapMetric = "generated" | "collected" | "collectionRate" | "perCapita"

export const MAP_METRICS: Record<
  MapMetric,
  { label: string; unit: string; format: (v: number) => string }
> = {
  generated: { label: "Generated", unit: "tonnes / year", format: (v) => `${num(v)} t` },
  collected: { label: "Collected", unit: "tonnes / year", format: (v) => `${num(v)} t` },
  collectionRate: { label: "Collection rate", unit: "% of generation", format: (v) => pct(v, 0) },
  perCapita: { label: "Per capita", unit: "kg / person", format: (v) => `${num(v, 2)} kg` },
}

const SCALE = [
  "var(--scale-1)",
  "var(--scale-2)",
  "var(--scale-3)",
  "var(--scale-4)",
  "var(--scale-5)",
]

function breaks(values: number[], bins: number) {
  const sorted = [...values].sort((a, b) => a - b)
  return Array.from({ length: bins - 1 }, (_, i) => {
    const p = (sorted.length - 1) * ((i + 1) / bins)
    const lo = Math.floor(p)
    const hi = Math.ceil(p)
    return sorted[lo] + (sorted[hi] - sorted[lo]) * (p - lo)
  })
}

export function Choropleth({
  districts,
  metric,
  selected,
  onSelect,
}: {
  districts: DistrictRecord[]
  metric: MapMetric
  selected: string | null
  onSelect: (district: string | null) => void
}) {
  const [hovered, setHovered] = React.useState<string | null>(null)

  const byDistrict = React.useMemo(
    () => new Map(districts.map((d) => [d.district, d])),
    [districts]
  )
  const values = districts.map((d) => d[metric])
  const edges = React.useMemo(() => breaks(values, SCALE.length), [values])
  const meta = MAP_METRICS[metric]

  const binOf = (v: number) => {
    let b = 0
    while (b < edges.length && v > edges[b]) b += 1
    return b
  }

  const active = hovered ?? selected
  const record = active ? byDistrict.get(active) : null
  const legend = React.useMemo(() => {
    const all = [Math.min(...values), ...edges]
    return SCALE.map((color, i) => ({ color, from: all[i] }))
  }, [values, edges])

  return (
    <div className="min-w-0 space-y-4">
      <div className="relative mx-auto w-full max-w-2xl">
        <svg
          viewBox={`${MAP_VIEWBOX.x} ${MAP_VIEWBOX.y} ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
          className="h-auto w-full"
          role="img"
          aria-label={`${meta.label} by district`}
        >
          {DISTRICT_SHAPES.map((shape, i) => {
            const d = byDistrict.get(shape.id)
            const isActive = active === shape.id
            return (
              <motion.path
                key={shape.id}
                d={shape.d}
                initial={{ opacity: 0 }}
                animate={{ opacity: active && !isActive ? 0.42 : 1 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.012, 0.3) }}
                fill={SCALE[binOf(d ? d[metric] : 0)]}
                stroke="var(--card)"
                strokeWidth={isActive ? 4 : 1.5}
                className="cursor-pointer transition-[stroke-width] duration-150 focus:outline-none"
                onMouseEnter={() => setHovered(shape.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(shape.id)}
                onBlur={() => setHovered(null)}
                onClick={() => onSelect(selected === shape.id ? null : shape.id)}
                tabIndex={0}
                role="button"
                aria-label={`${shape.id}: ${meta.format(d ? d[metric] : 0)}`}
              />
            )
          })}
          {DISTRICT_SHAPES.filter((s) => s.id === active).map((s) => (
            <g key={s.id} className="pointer-events-none">
              <circle cx={s.cx} cy={s.cy} r={6} className="fill-foreground" />
              <circle
                cx={s.cx}
                cy={s.cy}
                r={13}
                className="fill-none stroke-foreground"
                strokeWidth={2}
                strokeOpacity={0.35}
              />
            </g>
          ))}
        </svg>

        {record ? (
          <div className="glass-strong pointer-events-none absolute top-1 left-1 rounded-xl px-4 py-2.5">
            <p className="text-sm font-semibold">{record.district}</p>
            <p className="tnum text-2xl leading-tight font-semibold">
              {meta.format(record[metric])}
            </p>
          </div>
        ) : null}
      </div>

      <div className="flex items-center gap-1.5">
        {legend.map((r) => (
          <div key={r.color} className="min-w-0 flex-1">
            <div className="h-2.5 w-full rounded-sm" style={{ backgroundColor: r.color }} />
            <p className="tnum mt-1.5 truncate text-xs text-muted-foreground">
              {meta.format(r.from)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
