"use client"

import { Card, Meter } from "@/components/shared/glass"
import { RankedBar } from "@/components/charts/ranked-bar"
import { SimpleTable, type Col } from "@/components/shared/simple-table"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { DATA } from "@/lib/data/dataset"
import { SCORECARD } from "@/lib/data/scorecard"
import { useDashboardStore } from "@/lib/store/use-dashboard-store"
import type {
  AwarenessRow,
  ComplianceRow,
  HotspotRow,
  MonitoringRow,
  RecyclerRow,
} from "@/lib/data/source"
import { num, pct, shortDate } from "@/lib/format"

const REGISTERS = [
  { id: "recyclers", label: "Recyclers" },
  { id: "compliance", label: "Compliance" },
  { id: "hotspots", label: "Hotspots" },
  { id: "monitoring", label: "Monitoring" },
  { id: "programs", label: "Programs" },
]

export function Domains() {
  const register = useDashboardStore((s) => s.register)
  const setRegister = useDashboardStore((s) => s.setRegister)
  const { totals, recyclers, compliance, informal, environment, awareness } = DATA

  const facts: Record<string, { k: string; v: string }[]> = {
    generation: [
      { k: "Districts", v: "30" },
      { k: "Per capita", v: `${num(totals.perCapita, 2)} kg` },
    ],
    collection: [
      { k: "Rate", v: pct(totals.collectionRate, 0) },
      { k: "Centres", v: num(totals.centres) },
    ],
    recycling: [
      { k: "Processed", v: `${num(totals.processed)} t` },
      { k: "Recovery", v: pct(totals.recoveryRate, 0) },
    ],
    compliance: [
      { k: "Compliant", v: `${compliance.compliant} / ${compliance.total}` },
      { k: "Inspected", v: pct(compliance.inspectionCoverage, 0) },
    ],
    informal: [
      { k: "Hotspots", v: num(informal.hotspots) },
      { k: "Registered", v: pct(informal.trainedShare, 0) },
    ],
    environment: [
      { k: "Camps", v: num(environment.healthCamps) },
      { k: "Screened", v: num(environment.beneficiaries) },
    ],
    awareness: [
      { k: "Programs", v: num(awareness.programs) },
      { k: "Reached", v: num(awareness.participants) },
    ],
  }

  const recyclerChart = [...recyclers]
    .sort((a, b) => b.installedCapacity - a.installedCapacity)
    .reverse()
    .map((r) => ({
      label: r.district,
      processed: r.processed,
      idle: r.installedCapacity - r.processed,
    }))

  const awarenessChart = [...awareness.byType]
    .reverse()
    .map((t) => ({ label: t.type, value: t.participants }))

  const recyclerCols: Col<RecyclerRow>[] = [
    {
      key: "name",
      header: "Facility",
      value: (r) => r.name,
      cell: (r) => <span className="font-medium">{r.name}</span>,
    },
    { key: "district", header: "District", value: (r) => r.district },
    {
      key: "installedCapacity",
      header: "Capacity",
      align: "right",
      value: (r) => r.installedCapacity,
      cell: (r) => `${num(r.installedCapacity)} t`,
    },
    {
      key: "processed",
      header: "Processed",
      align: "right",
      value: (r) => r.processed,
      cell: (r) => `${num(r.processed)} t`,
    },
    {
      key: "recoveryRate",
      header: "Recovery",
      align: "right",
      value: (r) => r.recoveryRate,
      cell: (r) => pct(r.recoveryRate, 0),
    },
    {
      key: "validTill",
      header: "Valid till",
      value: (r) => r.validTill,
      cell: (r) => shortDate(r.validTill),
    },
  ]

  const complianceCols: Col<ComplianceRow>[] = [
    {
      key: "entity",
      header: "Entity",
      value: (r) => r.entity,
      cell: (r) => <span className="font-medium">{r.entity}</span>,
    },
    {
      key: "status",
      header: "Status",
      value: (r) => r.status,
      cell: (r) => (
        <span className={r.status === "Non-Compliant" ? "text-destructive" : undefined}>
          {r.status}
        </span>
      ),
    },
    {
      key: "inspectionConducted",
      header: "Inspected",
      value: (r) => (r.inspectionConducted ? "Yes" : "No"),
    },
    {
      key: "penaltyIssued",
      header: "Penalty",
      value: (r) => (r.penaltyIssued ? (r.penaltyResolved ? "Resolved" : "Open") : "—"),
    },
  ]

  const hotspotCols: Col<HotspotRow>[] = [
    {
      key: "name",
      header: "Cluster",
      value: (r) => r.name,
      cell: (r) => <span className="font-medium">{r.name}</span>,
    },
    { key: "district", header: "District", value: (r) => r.district },
    { key: "activity", header: "Activity", value: (r) => r.activity },
    {
      key: "estimatedWorkers",
      header: "Workers",
      align: "right",
      value: (r) => r.estimatedWorkers,
      cell: (r) => num(r.estimatedWorkers),
    },
    {
      key: "workersTrained",
      header: "Registered",
      align: "right",
      value: (r) => r.workersTrained,
      cell: (r) => `${num(r.workersTrained)} · ${pct((r.workersTrained / r.estimatedWorkers) * 100, 0)}`,
    },
  ]

  const monitoringCols: Col<MonitoringRow>[] = [
    {
      key: "site",
      header: "Site",
      value: (r) => r.site,
      cell: (r) => <span className="font-medium">{r.site}</span>,
    },
    { key: "type", header: "Type", value: (r) => r.type },
    { key: "date", header: "Date", value: (r) => r.date, cell: (r) => shortDate(r.date) },
    {
      key: "result",
      header: "Result",
      value: (r) => r.result,
      cell: (r) => (
        <span className={/within|acceptable/i.test(r.result) ? undefined : "text-destructive"}>
          {r.result}
        </span>
      ),
    },
    {
      key: "beneficiaries",
      header: "Screened",
      align: "right",
      value: (r) => r.beneficiaries,
      cell: (r) => (r.beneficiaries ? num(r.beneficiaries) : "—"),
    },
  ]

  const programCols: Col<AwarenessRow>[] = [
    {
      key: "program",
      header: "Program",
      value: (r) => r.program,
      cell: (r) => <span className="font-medium">{r.program}</span>,
    },
    { key: "district", header: "District", value: (r) => r.district },
    { key: "type", header: "Type", value: (r) => r.type },
    { key: "date", header: "Date", value: (r) => r.date, cell: (r) => shortDate(r.date) },
    {
      key: "participants",
      header: "Reached",
      align: "right",
      value: (r) => r.participants,
      cell: (r) => num(r.participants),
    },
  ]

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {SCORECARD.categories.map((c, i) => (
          <Card key={c.id} index={i} title={c.short} meta={`${num(c.earned, 1)} / ${c.weight}`}>
            <Meter value={c.attainment} />
            <ul className="mt-4 space-y-2">
              {facts[c.id].map((f) => (
                <li key={f.k} className="flex items-baseline justify-between gap-3">
                  <span className="text-sm text-muted-foreground">{f.k}</span>
                  <span className="tnum text-sm font-medium">{f.v}</span>
                </li>
              ))}
            </ul>
            <ul className="mt-4 space-y-2.5 border-t border-border/60 pt-3.5">
              {c.indicators.map((ind) => (
                <li key={ind.label} className="space-y-1.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="min-w-0 truncate text-xs text-muted-foreground">
                      {ind.label}
                    </span>
                    <span className="tnum shrink-0 text-xs font-medium">
                      {pct(ind.attainment, 0)}
                    </span>
                  </div>
                  <Meter value={ind.attainment} className="h-1" />
                </li>
              ))}
            </ul>
          </Card>
        ))}

        <Card index={7} title="Gap to full marks" meta={`${num(100 - SCORECARD.total, 1)} pts`}>
          <ul className="space-y-3">
            {[...SCORECARD.categories]
              .sort((a, b) => b.weight - b.earned - (a.weight - a.earned))
              .slice(0, 5)
              .map((c) => (
                <li key={c.id} className="flex items-baseline justify-between gap-3">
                  <span className="min-w-0 truncate text-sm">{c.short}</span>
                  <span className="tnum shrink-0 text-sm font-medium">
                    +{num(c.weight - c.earned, 1)}
                  </span>
                </li>
              ))}
          </ul>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card index={0} title="Recycler capacity" meta="tonnes / year">
          <RankedBar
            stacked
            data={recyclerChart}
            series={[
              { key: "processed", label: "Processed", color: "var(--chart-1)" },
              { key: "idle", label: "Idle", color: "var(--chart-4)" },
            ]}
            format={(v) => `${num(v)} t`}
            height={210}
            labelWidth={96}
          />
        </Card>

        <Card index={1} title="Outreach by format" meta="people reached">
          <RankedBar
            data={awarenessChart}
            series={[{ key: "value", label: "Reached", color: "var(--chart-2)" }]}
            format={(v) => num(v)}
            height={210}
            labelWidth={132}
          />
        </Card>
      </div>

      <Card
        index={0}
        title="Registers"
        action={
          <ToggleGroup
            size="sm"
            value={[register]}
            onValueChange={(v) => v[0] && setRegister(v[0])}
            spacing={0}
          >
            {REGISTERS.map((r) => (
              <ToggleGroupItem key={r.id} value={r.id} variant="outline" className="text-xs">
                {r.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        }
      >
        {register === "recyclers" ? (
          <SimpleTable
            rows={recyclers}
            columns={recyclerCols}
            exportName="odisha-recyclers"
            initialSort="installedCapacity"
            rowKey={(r) => r.authorisationNo}
          />
        ) : register === "compliance" ? (
          <SimpleTable
            rows={compliance.rows}
            columns={complianceCols}
            exportName="odisha-compliance"
            rowKey={(r) => r.registrationNo}
          />
        ) : register === "hotspots" ? (
          <SimpleTable
            rows={informal.rows}
            columns={hotspotCols}
            exportName="odisha-hotspots"
            initialSort="estimatedWorkers"
            rowKey={(r) => r.name}
          />
        ) : register === "monitoring" ? (
          <SimpleTable
            rows={environment.rows}
            columns={monitoringCols}
            exportName="odisha-monitoring"
            initialSort="date"
            rowKey={(r) => `${r.site}-${r.date}`}
          />
        ) : (
          <SimpleTable
            rows={awareness.rows}
            columns={programCols}
            exportName="odisha-programs"
            initialSort="participants"
            rowKey={(r) => r.program}
          />
        )}
      </Card>
    </div>
  )
}

