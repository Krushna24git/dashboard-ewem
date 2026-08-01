"use client"

import { motion } from "framer-motion"

import { num, pct } from "@/lib/format"

export type Segment = { key: string; label: string; value: number; share: number; color: string }

export function CompositionBar({ segments }: { segments: Segment[] }) {
  return (
    <div className="space-y-5">
      <div className="flex h-4 w-full gap-1 overflow-hidden rounded-full">
        {segments.map((s, i) => (
          <motion.div
            key={s.key}
            initial={{ width: 0 }}
            animate={{ width: `${s.share}%` }}
            transition={{ duration: 0.7, delay: Math.min(i * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
            style={{ backgroundColor: s.color }}
            className="h-full first:rounded-l-full last:rounded-r-full"
          />
        ))}
      </div>

      <ul className="divide-y divide-border/60">
        {segments.map((s) => (
          <li key={s.key} className="flex items-center gap-3 py-2 text-sm">
            <span
              aria-hidden
              className="size-3 shrink-0 rounded-sm ring-1 ring-border"
              style={{ backgroundColor: s.color }}
            />
            <span className="min-w-0 flex-1 truncate">{s.label}</span>
            <span className="tnum w-14 shrink-0 text-right font-medium">{pct(s.share, 0)}</span>
            <span className="tnum w-20 shrink-0 text-right text-muted-foreground">
              {num(s.value)} t
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
