"use client"

import * as React from "react"
import { ArrowDown, ArrowUp, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { downloadCsv } from "@/lib/export"
import { cn } from "@/lib/utils"

export type Col<T> = {
  key: string
  header: string
  value: (row: T) => string | number
  cell?: (row: T) => React.ReactNode
  align?: "right"
}

export function SimpleTable<T>({
  rows,
  columns,
  exportName,
  initialSort,
  rowKey,
  onRowClick,
  activeRowKey,
  maxHeight = "24rem",
}: {
  rows: readonly T[]
  columns: Col<T>[]
  exportName: string
  initialSort?: string
  rowKey: (row: T) => string
  onRowClick?: (row: T) => void
  activeRowKey?: string | null
  maxHeight?: string
}) {
  const [sort, setSort] = React.useState<{ key: string; dir: "asc" | "desc" }>({
    key: initialSort ?? columns[0].key,
    dir: initialSort ? "desc" : "asc",
  })

  const sorted = React.useMemo(() => {
    const col = columns.find((c) => c.key === sort.key)
    if (!col) return [...rows]
    const f = sort.dir === "asc" ? 1 : -1
    return [...rows].sort((a, b) => {
      const av = col.value(a)
      const bv = col.value(b)
      return typeof av === "number" && typeof bv === "number"
        ? (av - bv) * f
        : String(av).localeCompare(String(bv)) * f
    })
  }, [rows, columns, sort])

  return (
    <div className="min-w-0">
      <div className="overflow-x-auto overflow-y-auto rounded-xl" style={{ maxHeight }}>
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-10">
            <tr className="glass-strong">
              {columns.map((col) => {
                const active = sort.key === col.key
                const Icon = sort.dir === "asc" ? ArrowUp : ArrowDown
                return (
                  <th
                    key={col.key}
                    className={cn(
                      "px-3 py-2.5 text-[13px] font-medium whitespace-nowrap",
                      col.align === "right" ? "text-right" : "text-left"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setSort((s) =>
                          s.key === col.key
                            ? { key: col.key, dir: s.dir === "desc" ? "asc" : "desc" }
                            : { key: col.key, dir: "desc" }
                        )
                      }
                      className={cn(
                        "inline-flex items-center gap-1 transition-colors hover:text-foreground",
                        active ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {col.header}
                      {active ? <Icon className="size-3" /> : null}
                    </button>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => {
              const key = rowKey(row)
              return (
                <tr
                  key={key}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={cn(
                    "border-t border-border/60 transition-colors",
                    onRowClick && "cursor-pointer hover:bg-muted/50",
                    activeRowKey === key && "bg-muted/70"
                  )}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn(
                        "px-3 py-2.5 whitespace-nowrap",
                        col.align === "right" && "tnum text-right"
                      )}
                    >
                      {col.cell ? col.cell(row) : col.value(row)}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="no-print mt-3 flex items-center justify-between gap-3">
        <span className="text-[13px] text-muted-foreground">{sorted.length} rows</span>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5"
          onClick={() =>
            downloadCsv(
              sorted,
              columns.map((c) => ({ key: c.key, header: c.header, value: c.value })),
              exportName
            )
          }
        >
          <Download className="size-3.5" />
          CSV
        </Button>
      </div>
    </div>
  )
}
