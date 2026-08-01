import { GENERATION_INVENTORY, SCORE_BANDS } from "./workbook"
import { BENCHMARKS, EPR_TARGET_SHARE } from "./reference"
import { CATEGORY_KEYS, DATA } from "./dataset"

export type Indicator = {
  label: string
  achieved: number
  benchmark: number
  unit: "%" | "ratio" | "count"
  weight: number
  attainment: number
  earned: number
}

export type ScoreCategory = {
  id: string
  label: string
  short: string
  weight: number
  earned: number
  attainment: number
  indicators: Indicator[]
}

type Spec = Omit<Indicator, "attainment" | "earned">

function indicator(spec: Spec): Indicator {
  const attainment = spec.benchmark > 0 ? Math.min(spec.achieved / spec.benchmark, 1) * 100 : 0
  return { ...spec, attainment, earned: (attainment / 100) * spec.weight }
}

function category(
  id: string,
  label: string,
  short: string,
  weight: number,
  specs: Spec[]
): ScoreCategory {
  const indicators = specs.map(indicator)
  const earned = indicators.reduce((a, i) => a + i.earned, 0)
  return { id, label, short, weight, indicators, earned, attainment: (earned / weight) * 100 }
}

const { totals, compliance, informal, environment, awareness } = DATA
const districtCount = GENERATION_INVENTORY.length

const withBreakup = GENERATION_INVENTORY.filter((row) => CATEGORY_KEYS.every((k) => row[k] > 0))
  .length

export const CATEGORIES: ScoreCategory[] = [
  category("generation", "Generation & inventory", "Generation", 15, [
    {
      label: "Districts reporting an inventory",
      achieved: districtCount,
      benchmark: districtCount,
      unit: "count",
      weight: 6,
    },
    {
      label: "Full category breakup",
      achieved: withBreakup,
      benchmark: districtCount,
      unit: "count",
      weight: 5,
    },
    {
      label: "Refreshed within 12 months",
      achieved: districtCount,
      benchmark: districtCount,
      unit: "count",
      weight: 4,
    },
  ]),

  category("collection", "Collection performance", "Collection", 20, [
    {
      label: "Collection rate",
      achieved: totals.collectionRate,
      benchmark: EPR_TARGET_SHARE * 100,
      unit: "%",
      weight: 8,
    },
    {
      label: "Centres per million people",
      achieved: totals.centresPerMillion,
      benchmark: BENCHMARKS.centresPerMillion,
      unit: "ratio",
      weight: 4,
    },
    {
      label: "EPR target achievement",
      achieved: totals.eprAchievement,
      benchmark: 100,
      unit: "%",
      weight: 8,
    },
  ]),

  category("recycling", "Formal recycling & treatment", "Recycling", 20, [
    {
      label: "Processed by authorised recyclers",
      achieved: totals.processedShare,
      benchmark: EPR_TARGET_SHARE * 100,
      unit: "%",
      weight: 8,
    },
    {
      label: "Capacity against generation",
      achieved: totals.capacityAdequacy,
      benchmark: 100,
      unit: "%",
      weight: 6,
    },
    {
      label: "Material recovery rate",
      achieved: totals.recoveryRate,
      benchmark: BENCHMARKS.materialRecoveryRate,
      unit: "%",
      weight: 6,
    },
  ]),

  category("compliance", "Regulatory compliance", "Compliance", 15, [
    {
      label: "EPR entities compliant",
      achieved: compliance.complianceRate,
      benchmark: 100,
      unit: "%",
      weight: 7,
    },
    {
      label: "Inspections conducted",
      achieved: compliance.inspectionCoverage,
      benchmark: 100,
      unit: "%",
      weight: 5,
    },
    {
      label: "Penalties resolved",
      achieved: compliance.penaltyResolution,
      benchmark: 100,
      unit: "%",
      weight: 3,
    },
  ]),

  category("informal", "Informal sector integration", "Informal", 10, [
    {
      label: "Hotspots with action underway",
      achieved: informal.actionShare,
      benchmark: 100,
      unit: "%",
      weight: 4,
    },
    {
      label: "Workers registered or trained",
      achieved: informal.trainedShare,
      benchmark: 100,
      unit: "%",
      weight: 6,
    },
  ]),

  category("environment", "Environment & health", "Env & health", 10, [
    {
      label: "Hotspots monitored",
      achieved: informal.monitoringCoverage,
      benchmark: 100,
      unit: "%",
      weight: 4,
    },
    {
      label: "Health camps per hotspot",
      achieved: environment.campCoverage,
      benchmark: 100,
      unit: "%",
      weight: 3,
    },
    {
      label: "Workers screened",
      achieved: environment.screeningCoverage,
      benchmark: 100,
      unit: "%",
      weight: 3,
    },
  ]),

  category("awareness", "Awareness & outreach", "Awareness", 10, [
    {
      label: "Campaigns against target",
      achieved: awareness.programs,
      benchmark: BENCHMARKS.awarenessCampaigns,
      unit: "count",
      weight: 6,
    },
    {
      label: "Collection drives against target",
      achieved: awareness.collectionDrives,
      benchmark: BENCHMARKS.collectionDrives,
      unit: "count",
      weight: 4,
    },
  ]),
]

export const TOTAL_SCORE = CATEGORIES.reduce((a, c) => a + c.earned, 0)

export const BAND =
  SCORE_BANDS.find((b) => TOTAL_SCORE >= b.min && TOTAL_SCORE <= b.max) ??
  SCORE_BANDS[SCORE_BANDS.length - 1]

export const SCORECARD = { total: TOTAL_SCORE, band: BAND, categories: CATEGORIES }
