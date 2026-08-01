import { NextResponse } from "next/server"

import { DATA } from "@/lib/data/dataset"
import { SCORECARD } from "@/lib/data/scorecard"
import { ASSESSMENT_YEAR, EPR_LADDER, NATIONAL, SOURCES } from "@/lib/data/reference"

export async function GET() {
  return NextResponse.json({
    state: "Odisha",
    year: ASSESSMENT_YEAR,
    framework: "E-Waste (Management) Rules, 2022",
    eprLadder: EPR_LADDER,
    national: NATIONAL,
    sources: SOURCES,
    score: Number(SCORECARD.total.toFixed(2)),
    band: SCORECARD.band,
    categories: SCORECARD.categories,
    totals: DATA.totals,
    equipmentCategories: DATA.categories,
    districts: DATA.districts,
    recyclers: DATA.recyclers,
    compliance: DATA.compliance,
    informal: DATA.informal,
    environment: DATA.environment,
    awareness: DATA.awareness,
  })
}
