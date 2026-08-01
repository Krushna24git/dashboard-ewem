"use client"

import { Download, FileText, Moon, Recycle, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DATA } from "@/lib/data/dataset"
import { SCORECARD } from "@/lib/data/scorecard"
import { ASSESSMENT_YEAR } from "@/lib/data/reference"
import { downloadJson, printView } from "@/lib/export"
import { cn } from "@/lib/utils"

export type TabId = "overview" | "districts" | "domains"

export const TABS: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "districts", label: "Districts" },
  { id: "domains", label: "Domains" },
]

export function SiteHeader({
  tab,
  onTabChange,
}: {
  tab: TabId
  onTabChange: (tab: TabId) => void
}) {
  const { theme, setTheme } = useTheme()

  function exportJson() {
    downloadJson(
      {
        year: ASSESSMENT_YEAR,
        score: Number(SCORECARD.total.toFixed(2)),
        band: SCORECARD.band.label,
        categories: SCORECARD.categories,
        totals: DATA.totals,
        equipmentCategories: DATA.categories,
        districts: DATA.districts,
        recyclers: DATA.recyclers,
        compliance: DATA.compliance,
        informal: DATA.informal,
        environment: DATA.environment,
        awareness: DATA.awareness,
      },
      "odisha-ewaste"
    )
  }

  return (
    <header className="no-print">
      <div className="glass-strong rounded-none border-x-0 border-t-0">
        <div className="mx-auto grid h-16 w-full max-w-350 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 px-3 sm:gap-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Recycle className="size-4.5" />
            </span>
            <div className="hidden min-w-0 sm:block">
              <p className="truncate text-[15px] leading-tight font-semibold">Odisha E-Waste</p>
              <p className="truncate text-xs text-muted-foreground">{ASSESSMENT_YEAR}</p>
            </div>
          </div>

          <nav className="flex items-center gap-0.5 justify-self-center rounded-full bg-muted/60 p-1">
            {TABS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "relative rounded-full px-2.5 py-1.5 text-xs font-medium transition-colors sm:px-5 sm:text-sm",
                  tab === item.id
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab === item.id ? (
                  <motion.span
                    layoutId="tab-pill"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="absolute inset-0 rounded-full bg-primary"
                  />
                ) : null}
                <span className="relative">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-0.5 justify-self-end sm:gap-1.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              <Sun className="hidden size-4.5 dark:block" />
              <Moon className="size-4.5 dark:hidden" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="ghost" size="icon" aria-label="Export" />}
              >
                <Download className="size-4.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={exportJson}>
                    <Download className="size-4" />
                    JSON
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={printView}>
                    <FileText className="size-4" />
                    PDF
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
