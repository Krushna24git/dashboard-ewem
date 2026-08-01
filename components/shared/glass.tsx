"use client"

import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

export function Card({
  title,
  meta,
  action,
  className,
  bodyClassName,
  index = 0,
  children,
}: {
  title?: string
  meta?: string
  action?: React.ReactNode
  className?: string
  bodyClassName?: string
  index?: number
  children: React.ReactNode
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.25), ease: [0.22, 1, 0.36, 1] }}
      className={cn("glass min-w-0 rounded-2xl", className)}
    >
      {title ? (
        <header className="flex items-center gap-3 px-5 pt-4 pb-3">
          <h2 className="min-w-0 flex-1 truncate text-base font-semibold tracking-tight">
            {title}
          </h2>
          {meta ? (
            <span className="tnum shrink-0 text-sm text-muted-foreground">{meta}</span>
          ) : null}
          {action}
        </header>
      ) : null}
      <div className={cn("px-5 pb-5", !title && "pt-5", bodyClassName)}>{children}</div>
    </motion.section>
  )
}

export function Stat({
  label,
  value,
  unit,
  foot,
  index = 0,
}: {
  label: string
  value: string
  unit?: string
  foot?: string
  index?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-2xl px-5 py-4"
    >
      <p className="truncate text-[13px] font-medium text-muted-foreground">{label}</p>
      <p className="mt-2 flex flex-wrap items-baseline gap-x-1.5">
        <span className="tnum text-3xl leading-none font-semibold tracking-tight">{value}</span>
        {unit ? (
          <span className="text-sm whitespace-nowrap text-muted-foreground">{unit}</span>
        ) : null}
      </p>
      {foot ? <p className="mt-2 truncate text-[13px] text-muted-foreground">{foot}</p> : null}
    </motion.div>
  )
}

export function Meter({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("h-2 overflow-hidden rounded-full bg-muted", className)}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="h-full rounded-full bg-chart-1"
      />
    </div>
  )
}
