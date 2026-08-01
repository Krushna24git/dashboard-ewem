"use client"

import { motion } from "framer-motion"

import { SCORE_BANDS } from "@/lib/data/workbook"
import { num } from "@/lib/format"
import { cn } from "@/lib/utils"

const SIZE = 196
const STROKE = 14
const R = (SIZE - STROKE) / 2
const C = 2 * Math.PI * R

export function ScoreDial({ total, band }: { total: number; band: string }) {
  const fraction = Math.min(Math.max(total, 0), 100) / 100

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} className="-rotate-90">
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            fill="none"
            strokeWidth={STROKE}
            className="stroke-muted"
          />
          <motion.circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            fill="none"
            strokeWidth={STROKE}
            strokeLinecap="round"
            className="stroke-chart-1"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            animate={{ strokeDashoffset: C * (1 - fraction) }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="tnum text-5xl leading-none font-semibold tracking-tight"
          >
            {num(total, 1)}
          </motion.span>
          <span className="mt-2 text-sm text-muted-foreground">of 100</span>
        </div>
      </div>

      <div className="w-full space-y-2.5">
        <p className="text-center text-base font-semibold">{band}</p>
        <div className="flex gap-1.5">
          {[...SCORE_BANDS].reverse().map((item) => {
            const active = item.label === band
            return (
              <div key={item.label} className="min-w-0 flex-1 space-y-1.5">
                <div
                  className={cn(
                    "h-1.5 rounded-full transition-colors",
                    active ? "bg-chart-1" : "bg-muted"
                  )}
                />
                <p
                  className={cn(
                    "tnum truncate text-center text-xs",
                    active ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {item.min}
                  {item.max === 100 ? "+" : `–${item.max}`}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
