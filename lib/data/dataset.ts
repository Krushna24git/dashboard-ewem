import {
  AWARENESS_PROGRAMS,
  COLLECTION_LOG,
  COMPLIANCE_TRACKER,
  ENV_HEALTH_MONITORING,
  GENERATION_INVENTORY,
  INFORMAL_HOTSPOTS,
  RECYCLING_INFRASTRUCTURE,
  type AwarenessRow,
  type ComplianceRow,
  type HotspotRow,
  type MonitoringRow,
  type RecyclerRow,
} from "./source"
import {
  BENCHMARKS,
  CHANNEL_SPLIT,
  COLLECTION_MODEL,
  DISTRICT_GENERATION,
  EPR_TARGET_SHARE,
} from "./reference"

export const CATEGORY_KEYS = [
  "itTelecom",
  "consumer",
  "equipment",
  "lighting",
  "batteries",
  "other",
] as const

export type CategoryKey = (typeof CATEGORY_KEYS)[number]

export const CATEGORY_LABELS: Record<CategoryKey, string> = {
  itTelecom: "IT & Telecom",
  consumer: "Consumer electronics",
  equipment: "Large & small equipment",
  lighting: "Lighting",
  batteries: "Batteries",
  other: "Other",
}

export type DistrictRecord = {
  district: string
  population: number
  generated: number
  categories: Record<CategoryKey, number>
  centres: number
  centresPerMillion: number
  collected: number
  collectionRate: number
  eprTarget: number
  eprAchieved: number
  eprAchievement: number
  uncollected: number
  perCapita: number
  hasRecycler: boolean
  hotspots: number
  informalWorkers: number
  monitoringVisits: number
  awarenessPrograms: number
  participantsReached: number
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))
const share = (part: number, whole: number) => (whole > 0 ? (part / whole) * 100 : 0)

const CATEGORY_SHARES: Record<CategoryKey, number> = (() => {
  const totals = CATEGORY_KEYS.reduce(
    (acc, key) => {
      acc[key] = GENERATION_INVENTORY.reduce((sum, row) => sum + row[key], 0)
      return acc
    },
    {} as Record<CategoryKey, number>
  )
  const grand = CATEGORY_KEYS.reduce((acc, key) => acc + totals[key], 0)
  return CATEGORY_KEYS.reduce(
    (acc, key) => {
      acc[key] = totals[key] / grand
      return acc
    },
    {} as Record<CategoryKey, number>
  )
})()

function build() {
  const centresByDistrict = new Map(COLLECTION_LOG.map((row) => [row.district, row.centres]))
  const recyclerDistricts = new Set(RECYCLING_INFRASTRUCTURE.map((row) => row.district))

  const group = <T extends { district: string }>(rows: readonly T[]) => {
    const map = new Map<string, T[]>()
    for (const row of rows) {
      const list = map.get(row.district) ?? []
      list.push(row)
      map.set(row.district, list)
    }
    return map
  }

  const hotspotsBy = group(INFORMAL_HOTSPOTS)
  const monitoringBy = group(ENV_HEALTH_MONITORING)
  const awarenessBy = group(AWARENESS_PROGRAMS)

  const districts: DistrictRecord[] = GENERATION_INVENTORY.map((row) => {
    const generated = DISTRICT_GENERATION[row.district] ?? 0
    const categories = CATEGORY_KEYS.reduce(
      (acc, key) => {
        acc[key] = generated * CATEGORY_SHARES[key]
        return acc
      },
      {} as Record<CategoryKey, number>
    )

    const centres = centresByDistrict.get(row.district) ?? 0
    const centresPerMillion = centres / (row.population / 1_000_000)
    const hasRecycler = recyclerDistricts.has(row.district)
    const districtHotspots = hotspotsBy.get(row.district) ?? []
    const districtAwareness = awarenessBy.get(row.district) ?? []

    const m = COLLECTION_MODEL
    const rate = clamp(
      m.base +
        m.centreWeight * Math.min(centresPerMillion, m.centreCap) +
        (hasRecycler ? m.recyclerBonus : 0) +
        (districtHotspots.length ? m.hotspotLinkageBonus : 0) +
        (districtAwareness.length ? m.awarenessBonus : 0),
      m.floor,
      m.ceiling
    )

    const collected = generated * rate
    const eprTarget = generated * EPR_TARGET_SHARE
    const eprAchieved = collected * CHANNEL_SPLIT.eprRouted

    return {
      district: row.district,
      population: row.population,
      generated,
      categories,
      centres,
      centresPerMillion,
      collected,
      collectionRate: rate * 100,
      eprTarget,
      eprAchieved,
      eprAchievement: share(eprAchieved, eprTarget),
      uncollected: generated - collected,
      perCapita: (generated * 1000) / row.population,
      hasRecycler,
      hotspots: districtHotspots.length,
      informalWorkers: districtHotspots.reduce((a, h) => a + h.estimatedWorkers, 0),
      monitoringVisits: (monitoringBy.get(row.district) ?? []).length,
      awarenessPrograms: districtAwareness.length,
      participantsReached: districtAwareness.reduce((a, p) => a + p.participants, 0),
    }
  })

  const sum = (fn: (d: DistrictRecord) => number) => districts.reduce((a, d) => a + fn(d), 0)

  const population = sum((d) => d.population)
  const generated = sum((d) => d.generated)
  const collected = sum((d) => d.collected)
  const centres = sum((d) => d.centres)
  const eprTarget = sum((d) => d.eprTarget)
  const eprAchieved = sum((d) => d.eprAchieved)

  const processed = RECYCLING_INFRASTRUCTURE.reduce((a, r) => a + r.processed, 0)
  const installedCapacity = RECYCLING_INFRASTRUCTURE.reduce((a, r) => a + r.installedCapacity, 0)
  const recoveryRate =
    RECYCLING_INFRASTRUCTURE.reduce((a, r) => a + r.processed * r.recoveryRate, 0) / processed

  const compliant = COMPLIANCE_TRACKER.filter((r) => r.status === "Compliant").length
  const inspectionsPlanned = COMPLIANCE_TRACKER.filter((r) => r.inspectionPlanned).length
  const inspectionsConducted = COMPLIANCE_TRACKER.filter((r) => r.inspectionConducted).length
  const penaltiesIssued = COMPLIANCE_TRACKER.filter((r) => r.penaltyIssued).length
  const penaltiesResolved = COMPLIANCE_TRACKER.filter(
    (r) => r.penaltyIssued && r.penaltyResolved
  ).length

  const workers = INFORMAL_HOTSPOTS.reduce((a, r) => a + r.estimatedWorkers, 0)
  const trained = INFORMAL_HOTSPOTS.reduce((a, r) => a + r.workersTrained, 0)
  const monitoredDistricts = new Set(ENV_HEALTH_MONITORING.map((r) => r.district))
  const monitoredHotspots = INFORMAL_HOTSPOTS.filter((r) =>
    monitoredDistricts.has(r.district)
  ).length

  const healthCamps = ENV_HEALTH_MONITORING.filter((r) => r.healthCamp).length
  const beneficiaries = ENV_HEALTH_MONITORING.reduce((a, r) => a + r.beneficiaries, 0)
  const withinLimits = ENV_HEALTH_MONITORING.filter((r) => /within|acceptable/i.test(r.result))
    .length

  const participants = AWARENESS_PROGRAMS.reduce((a, r) => a + r.participants, 0)
  const collectionDrives = AWARENESS_PROGRAMS.filter((r) => /collection drive/i.test(r.type)).length

  const byType = new Map<string, { programs: number; participants: number }>()
  for (const row of AWARENESS_PROGRAMS) {
    const entry = byType.get(row.type) ?? { programs: 0, participants: 0 }
    entry.programs += 1
    entry.participants += row.participants
    byType.set(row.type, entry)
  }

  return {
    districts,
    totals: {
      population,
      generated,
      collected,
      collectionRate: share(collected, generated),
      uncollected: generated - collected,
      perCapita: (generated * 1000) / population,
      centres,
      centresPerMillion: centres / (population / 1_000_000),
      eprTarget,
      eprAchieved,
      eprAchievement: share(eprAchieved, eprTarget),
      processed,
      processedShare: share(processed, generated),
      installedCapacity,
      capacityUtilisation: share(processed, installedCapacity),
      capacityAdequacy: share(installedCapacity, generated),
      recoveryRate,
      recyclers: RECYCLING_INFRASTRUCTURE.length,
    },
    categories: CATEGORY_KEYS.map((key) => {
      const tonnes = districts.reduce((a, d) => a + d.categories[key], 0)
      return { key, label: CATEGORY_LABELS[key], tonnes, share: share(tonnes, generated) }
    }),
    recyclers: RECYCLING_INFRASTRUCTURE as readonly RecyclerRow[],
    compliance: {
      rows: COMPLIANCE_TRACKER as readonly ComplianceRow[],
      total: COMPLIANCE_TRACKER.length,
      compliant,
      partiallyCompliant: COMPLIANCE_TRACKER.filter((r) => r.status === "Partially Compliant")
        .length,
      nonCompliant: COMPLIANCE_TRACKER.filter((r) => r.status === "Non-Compliant").length,
      complianceRate: share(compliant, COMPLIANCE_TRACKER.length),
      inspectionsPlanned,
      inspectionsConducted,
      inspectionCoverage: share(inspectionsConducted, inspectionsPlanned),
      penaltiesIssued,
      penaltiesResolved,
      penaltyResolution: share(penaltiesResolved, penaltiesIssued),
    },
    informal: {
      rows: INFORMAL_HOTSPOTS as readonly HotspotRow[],
      hotspots: INFORMAL_HOTSPOTS.length,
      workers,
      trained,
      trainedShare: share(trained, workers),
      actionShare: share(
        INFORMAL_HOTSPOTS.filter((r) => r.action.trim().length > 0).length,
        INFORMAL_HOTSPOTS.length
      ),
      monitoredHotspots,
      monitoringCoverage: share(monitoredHotspots, INFORMAL_HOTSPOTS.length),
    },
    environment: {
      rows: ENV_HEALTH_MONITORING as readonly MonitoringRow[],
      visits: ENV_HEALTH_MONITORING.length,
      healthCamps,
      beneficiaries,
      withinLimits,
      campCoverage: share(healthCamps, INFORMAL_HOTSPOTS.length),
      screeningCoverage: share(beneficiaries, workers),
    },
    awareness: {
      rows: AWARENESS_PROGRAMS as readonly AwarenessRow[],
      programs: AWARENESS_PROGRAMS.length,
      participants,
      collectionDrives,
      districtsCovered: new Set(AWARENESS_PROGRAMS.map((r) => r.district)).size,
      campaignAchievement: share(AWARENESS_PROGRAMS.length, BENCHMARKS.awarenessCampaigns),
      driveAchievement: share(collectionDrives, BENCHMARKS.collectionDrives),
      byType: [...byType.entries()]
        .map(([type, v]) => ({ type, ...v }))
        .sort((a, b) => b.participants - a.participants),
    },
  }
}

export const DATA = build()

export type Dataset = typeof DATA
