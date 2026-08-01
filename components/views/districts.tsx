"use client"

import { Card, Stat } from "@/components/shared/glass"
import { Choropleth, MAP_METRICS, type MapMetric } from "@/components/charts/choropleth"
import { SimpleTable, type Col } from "@/components/shared/simple-table"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { DATA, type DistrictRecord } from "@/lib/data/dataset"
import { useDashboardStore } from "@/lib/store/use-dashboard-store"
import { num, pct } from "@/lib/format"

export function Districts() {
  const metric = useDashboardStore((s) => s.mapMetric)
  const setMetric = useDashboardStore((s) => s.setMapMetric)
  const selected = useDashboardStore((s) => s.selectedDistrict)
  const setSelected = useDashboardStore((s) => s.setSelectedDistrict)

  const { districts, totals } = DATA
  const ranked = [...districts].sort((a, b) => b.generated - a.generated)
  const record = selected ? districts.find((d) => d.district === selected) : null
  const best = [...districts].sort((a, b) => b.collectionRate - a.collectionRate)[0]

  const columns: Col<DistrictRecord>[] = [
    {
      key: "district",
      header: "District",
      value: (r) => r.district,
      cell: (r) => <span className="font-medium">{r.district}</span>,
    },
    {
      key: "generated",
      header: "Generated",
      align: "right",
      value: (r) => Math.round(r.generated),
      cell: (r) => `${num(r.generated)} t`,
    },
    {
      key: "collected",
      header: "Collected",
      align: "right",
      value: (r) => Math.round(r.collected),
      cell: (r) => `${num(r.collected)} t`,
    },
    {
      key: "collectionRate",
      header: "Rate",
      align: "right",
      value: (r) => Number(r.collectionRate.toFixed(1)),
      cell: (r) => pct(r.collectionRate, 0),
    },
    { key: "centres", header: "Centres", align: "right", value: (r) => r.centres },
    {
      key: "perCapita",
      header: "kg / person",
      align: "right",
      value: (r) => Number(r.perCapita.toFixed(2)),
      cell: (r) => num(r.perCapita, 2),
    },
    {
      key: "eprAchievement",
      header: "EPR",
      align: "right",
      value: (r) => Number(r.eprAchievement.toFixed(1)),
      cell: (r) => pct(r.eprAchievement, 0),
    },
  ]

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat index={0} label="Districts" value="30" foot="All reporting" />
        <Stat
          index={1}
          label="Largest"
          value={ranked[0].district}
          foot={`${num(ranked[0].generated)} t · ${pct((ranked[0].generated / totals.generated) * 100, 0)}`}
        />
        <Stat
          index={2}
          label="Best rate"
          value={pct(best.collectionRate, 0)}
          foot={best.district}
        />
        <Stat
          index={3}
          label="Under benchmark"
          value={num(districts.filter((d) => d.centresPerMillion < 1).length)}
          foot="< 1 centre per million"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-12">
        <Card
          index={0}
          className="lg:col-span-7"
          title={MAP_METRICS[metric].label}
          meta={MAP_METRICS[metric].unit}
          action={
            <ToggleGroup
              size="sm"
              value={[metric]}
              onValueChange={(v) => v[0] && setMetric(v[0] as MapMetric)}
              spacing={0}
            >
              {(Object.keys(MAP_METRICS) as MapMetric[]).map((key) => (
                <ToggleGroupItem key={key} value={key} variant="outline" className="text-xs">
                  {MAP_METRICS[key].label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          }
        >
          <Choropleth
            districts={districts}
            metric={metric}
            selected={selected}
            onSelect={setSelected}
          />
        </Card>

        <Card
          index={1}
          className="lg:col-span-5"
          title={record ? record.district : "Select a district"}
          meta={record ? `#${ranked.indexOf(record) + 1} of 30` : undefined}
        >
          <dl className="divide-y divide-border/60">
            {(record
              ? [
                  { k: "Population", v: `${num(record.population / 100000, 1)} lakh` },
                  { k: "Generated", v: `${num(record.generated)} t` },
                  { k: "Per capita", v: `${num(record.perCapita, 2)} kg` },
                  { k: "Collected", v: `${num(record.collected)} t` },
                  { k: "Collection rate", v: pct(record.collectionRate, 0) },
                  { k: "Collection centres", v: num(record.centres) },
                  { k: "EPR achievement", v: pct(record.eprAchievement, 0) },
                  { k: "Authorised recycler", v: record.hasRecycler ? "Yes" : "No" },
                  { k: "Informal hotspots", v: record.hotspots ? num(record.hotspots) : "—" },
                  {
                    k: "Awareness programs",
                    v: record.awarenessPrograms ? num(record.awarenessPrograms) : "—",
                  },
                ]
              : [
                  { k: "State generation", v: `${num(totals.generated)} t` },
                  { k: "Per capita", v: `${num(totals.perCapita, 2)} kg` },
                  { k: "Collection rate", v: pct(totals.collectionRate, 0) },
                  {
                    k: "Top 5 share",
                    v: pct(
                      (ranked.slice(0, 5).reduce((a, d) => a + d.generated, 0) / totals.generated) *
                        100,
                      0
                    ),
                  },
                  { k: "With a recycler", v: num(districts.filter((d) => d.hasRecycler).length) },
                  { k: "With a hotspot", v: num(districts.filter((d) => d.hotspots > 0).length) },
                  {
                    k: "With outreach",
                    v: num(districts.filter((d) => d.awarenessPrograms > 0).length),
                  },
                  {
                    k: "Never monitored",
                    v: num(districts.filter((d) => d.monitoringVisits === 0).length),
                  },
                ]
            ).map((row) => (
              <div key={row.k} className="flex items-baseline justify-between gap-4 py-2.5">
                <dt className="text-sm text-muted-foreground">{row.k}</dt>
                <dd className="tnum text-sm font-medium">{row.v}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>

      <Card index={0} title="All districts">
        <SimpleTable
          rows={districts}
          columns={columns}
          exportName="odisha-districts"
          initialSort="generated"
          rowKey={(r) => r.district}
          onRowClick={(r) => setSelected(selected === r.district ? null : r.district)}
          activeRowKey={selected}
          maxHeight="30rem"
        />
      </Card>
    </div>
  )
}
