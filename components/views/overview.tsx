"use client"

import { Card, Meter, Stat } from "@/components/shared/glass"
import { CompositionBar } from "@/components/charts/composition-bar"
import { RankedBar } from "@/components/charts/ranked-bar"
import { ScoreDial } from "@/components/charts/score-dial"
import { ScoreRadar } from "@/components/charts/score-radar"
import { DATA } from "@/lib/data/dataset"
import { SCORECARD } from "@/lib/data/scorecard"
import { NATIONAL } from "@/lib/data/reference"
import { num, pct } from "@/lib/format"

const RAMP = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)", "var(--scale-2)"]

export function Overview() {
  const { totals, districts, categories } = DATA

  const flows = [
    { label: "Generated", a: Math.round(totals.generated) },
    { label: "Collected", a: Math.round(totals.collected) },
    { label: "Processed", a: Math.round(totals.processed) },
    { label: "EPR target", a: Math.round(totals.eprTarget) },
  ].reverse()

  const top = [...districts]
    .sort((a, b) => b.generated - a.generated)
    .slice(0, 8)
    .reverse()
    .map((d) => ({
      label: d.district,
      collected: Math.round(d.collected),
      gap: Math.round(d.uncollected),
    }))

  const segments = categories.map((c, i) => ({
    key: c.key,
    label: c.label,
    value: Math.round(c.tonnes),
    share: c.share,
    color: RAMP[i],
  }))

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat
          index={0}
          label="Generated"
          value={num(totals.generated)}
          unit="t / yr"
          foot={`${num(totals.perCapita, 2)} kg per person`}
        />
        <Stat
          index={1}
          label="Collected"
          value={pct(totals.collectionRate, 0)}
          foot={`${num(totals.collected)} t of ${num(totals.generated)} t`}
        />
        <Stat
          index={2}
          label="Processed"
          value={pct(totals.processedShare, 0)}
          foot={`${NATIONAL.processedShare}% nationally`}
        />
        <Stat
          index={3}
          label="EPR achievement"
          value={pct(totals.eprAchievement, 0)}
          foot={`Target ${num(totals.eprTarget)} t`}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-12">
        <Card
          index={0}
          className="lg:col-span-4"
          title="State score"
          bodyClassName="flex h-[calc(100%-3.5rem)] items-center justify-center"
        >
          <ScoreDial total={SCORECARD.total} band={SCORECARD.band.label} />
        </Card>

        <Card index={1} className="lg:col-span-4" title="Domain attainment">
          <ScoreRadar categories={SCORECARD.categories} />
        </Card>

        <Card index={2} className="lg:col-span-4" title="Points by domain" meta="of 100">
          <ul className="space-y-3">
            {[...SCORECARD.categories]
              .sort((a, b) => b.attainment - a.attainment)
              .map((c) => (
                <li key={c.id} className="space-y-1.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="min-w-0 truncate text-sm">{c.short}</span>
                    <span className="tnum shrink-0 text-sm font-medium">
                      {num(c.earned, 1)}
                      <span className="text-muted-foreground"> / {c.weight}</span>
                    </span>
                  </div>
                  <Meter value={c.attainment} className="h-1.5" />
                </li>
              ))}
          </ul>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-12">
        <Card index={0} className="lg:col-span-5" title="Material flow" meta="tonnes / year">
          <RankedBar
            data={flows}
            series={[{ key: "a", label: "Tonnes", color: "var(--chart-1)" }]}
            format={(v) => `${num(v)} t`}
            labelWidth={92}
            height={190}
          />
        </Card>

        <Card index={1} className="lg:col-span-7" title="Largest districts" meta="tonnes / year">
          <RankedBar
            stacked
            data={top}
            series={[
              { key: "collected", label: "Collected", color: "var(--chart-1)" },
              { key: "gap", label: "Uncollected", color: "var(--chart-4)" },
            ]}
            format={(v) => `${num(v)} t`}
          />
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-12">
        <Card index={0} className="lg:col-span-7" title="Equipment categories">
          <CompositionBar segments={segments} />
        </Card>

        <Card index={1} className="lg:col-span-5" title="Network">
          <dl className="divide-y divide-border/60">
            {[
              { k: "Authorised recyclers", v: num(totals.recyclers) },
              { k: "Installed capacity", v: `${num(totals.installedCapacity)} t` },
              { k: "Capacity used", v: pct(totals.capacityUtilisation, 0) },
              { k: "Material recovery", v: pct(totals.recoveryRate, 0) },
              { k: "Collection centres", v: num(totals.centres) },
              { k: "Centres per million", v: num(totals.centresPerMillion, 2) },
            ].map((row) => (
              <div key={row.k} className="flex items-baseline justify-between gap-4 py-2.5">
                <dt className="text-sm text-muted-foreground">{row.k}</dt>
                <dd className="tnum text-sm font-medium">{row.v}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>
    </div>
  )
}
