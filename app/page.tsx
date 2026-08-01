"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

import { SiteHeader } from "@/components/layout/site-header"
import { Overview } from "@/components/views/overview"
import { Districts } from "@/components/views/districts"
import { Domains } from "@/components/views/domains"
import { useDashboardStore } from "@/lib/store/use-dashboard-store"
import { SOURCES } from "@/lib/data/reference"

export default function Page() {
  const tab = useDashboardStore((s) => s.tab)
  const setTab = useDashboardStore((s) => s.setTab)

  return (
    <>
      <SiteHeader tab={tab} onTabChange={setTab} />

      <main className="mx-auto w-full max-w-350 px-4 pt-5 pb-10 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {tab === "overview" ? <Overview /> : tab === "districts" ? <Districts /> : <Domains />}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="mx-auto w-full max-w-350 px-4 pb-8 sm:px-6">
        <div className="glass rounded-2xl px-5 py-4">
          <p className="mb-3 text-[13px] font-medium text-muted-foreground">Sources</p>
          <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {SOURCES.map((s) => (
              <li key={s.label} className="flex items-baseline justify-between gap-3 text-sm">
                {s.href ? (
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-w-0 items-center gap-1.5 truncate underline-offset-4 hover:underline"
                  >
                    <span className="truncate">{s.label}</span>
                    <ExternalLink className="size-3 shrink-0 text-muted-foreground" />
                  </a>
                ) : (
                  <span className="min-w-0 truncate">{s.label}</span>
                )}
                <span className="shrink-0 text-[13px] text-muted-foreground">{s.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  )
}

