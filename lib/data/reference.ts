export const DISTRICT_GENERATION: Record<string, number> = {
  Sundargarh: 2845,
  Mayurbhanj: 4210,
  Kendujhar: 2356,
  Balasore: 3985,
  Bhadrak: 1650,
  Jajpur: 2913,
  Kendrapara: 1526,
  Jagatsinghpur: 1742,
  Cuttack: 5892,
  Dhenkanal: 1807,
  Angul: 2102,
  Deogarh: 1025,
  Sambalpur: 3876,
  Jharsuguda: 1654,
  Bargarh: 1832,
  Subarnapur: 1286,
  Boudh: 894,
  Balangir: 1944,
  Nuapada: 712,
  Kalahandi: 1605,
  Kandhamal: 1231,
  Nayagarh: 1477,
  Khordha: 2987,
  Puri: 2110,
  Ganjam: 3325,
  Gajapati: 1083,
  Rayagada: 1291,
  Koraput: 1678,
  Malkangiri: 589,
  Nabarangpur: 1074,
}

export const ASSESSMENT_YEAR = "2024-25"

export const EPR_TARGET_SHARE = 0.6

export const EPR_LADDER = [
  { year: "2023-24", target: 60 },
  { year: "2024-25", target: 60 },
  { year: "2025-26", target: 70 },
  { year: "2026-27", target: 70 },
  { year: "2027-28", target: 80 },
]

export const NATIONAL = {
  perCapitaKg: 1.23,
  processedShare: 43,
  generatedTonnes: 1751000,
}

export const CHANNEL_SPLIT = { eprRouted: 0.72 }

export const COLLECTION_MODEL = {
  floor: 0.2,
  ceiling: 0.72,
  base: 0.24,
  centreWeight: 0.11,
  centreCap: 2.4,
  recyclerBonus: 0.13,
  hotspotLinkageBonus: 0.05,
  awarenessBonus: 0.04,
}

export const BENCHMARKS = {
  centresPerMillion: 1,
  awarenessCampaigns: 20,
  collectionDrives: 8,
  materialRecoveryRate: 90,
  inventoryRefreshMonths: 12,
}

export const SOURCES = [
  {
    label: "E-Waste (Management) Rules, 2022",
    note: "Schedule I categories · Schedule III EPR targets",
    href: "https://www.iea.org/policies/25027-e-waste-management-rules-2022",
  },
  {
    label: "CPCB national inventory",
    note: "1.75 Mt generated, 43% processed, 2023-24",
    href: "https://www.data.gov.in/keywords/E-Waste",
  },
  {
    label: "Odisha SPCB district returns",
    note: "Generation, recyclers, compliance, hotspots",
    href: null,
  },
  {
    label: "District boundaries",
    note: "Census 2011, 30 districts",
    href: "https://github.com/udit-001/india-maps-data",
  },
]
