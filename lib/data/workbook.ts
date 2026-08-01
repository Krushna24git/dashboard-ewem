export type GenerationRow = {
  district: string
  population: number
  itTelecom: number
  consumer: number
  equipment: number
  lighting: number
  batteries: number
  other: number
  lastUpdated: string
}

export type CollectionRow = {
  district: string
  centres: number
  remarks: string
}

export type RecyclerRow = {
  name: string
  authorisationNo: string
  district: string
  installedCapacity: number
  processed: number
  recoveryRate: number
  validTill: string
}

export type ComplianceStatus = "Compliant" | "Partially Compliant" | "Non-Compliant"

export type ComplianceRow = {
  entity: string
  registrationNo: string
  status: ComplianceStatus
  inspectionPlanned: boolean
  inspectionConducted: boolean
  penaltyIssued: boolean
  penaltyResolved: boolean
  remarks: string
}

export type HotspotActivity = "Active" | "Moderate" | "Low"

export type HotspotRow = {
  name: string
  district: string
  activity: HotspotActivity
  estimatedWorkers: number
  workersTrained: number
  action: string
  remarks: string
}

export type MonitoringRow = {
  site: string
  district: string
  type: string
  date: string
  result: string
  healthCamp: boolean
  beneficiaries: number
  remarks: string
}

export type AwarenessRow = {
  program: string
  district: string
  date: string
  type: string
  audience: string
  participants: number
}

export type ScoreBand = {
  label: string
  min: number
  max: number
}

export const GENERATION_INVENTORY: GenerationRow[] = [
  { district: "Angul", population: 1400000, itTelecom: 67200, consumer: 33600, equipment: 30240, lighting: 8400, batteries: 20160, other: 8400, lastUpdated: "2025-06-30" },
  { district: "Balangir", population: 1750000, itTelecom: 84000, consumer: 42000, equipment: 37800, lighting: 10500, batteries: 25200, other: 10500, lastUpdated: "2025-06-30" },
  { district: "Balasore", population: 2600000, itTelecom: 124800, consumer: 62400, equipment: 56160, lighting: 15600, batteries: 37440, other: 15600, lastUpdated: "2025-06-30" },
  { district: "Bargarh", population: 1700000, itTelecom: 81600, consumer: 40800, equipment: 36720, lighting: 10200, batteries: 24480, other: 10200, lastUpdated: "2025-06-30" },
  { district: "Bhadrak", population: 1650000, itTelecom: 79200, consumer: 39600, equipment: 35640, lighting: 9900, batteries: 23760, other: 9900, lastUpdated: "2025-06-30" },
  { district: "Boudh", population: 500000, itTelecom: 24000, consumer: 12000, equipment: 10800, lighting: 3000, batteries: 7200, other: 3000, lastUpdated: "2025-06-30" },
  { district: "Cuttack", population: 3100000, itTelecom: 148800, consumer: 74400, equipment: 66960, lighting: 18600, batteries: 44640, other: 18600, lastUpdated: "2025-06-30" },
  { district: "Deogarh", population: 350000, itTelecom: 16800, consumer: 8400, equipment: 7560, lighting: 2100, batteries: 5040, other: 2100, lastUpdated: "2025-06-30" },
  { district: "Dhenkanal", population: 1450000, itTelecom: 69600, consumer: 34800, equipment: 31320, lighting: 8700, batteries: 20880, other: 8700, lastUpdated: "2025-06-30" },
  { district: "Gajapati", population: 650000, itTelecom: 31200, consumer: 15600, equipment: 14040, lighting: 3900, batteries: 9360, other: 3900, lastUpdated: "2025-06-30" },
  { district: "Ganjam", population: 3900000, itTelecom: 187200, consumer: 93600, equipment: 84240, lighting: 23400, batteries: 56160, other: 23400, lastUpdated: "2025-06-30" },
  { district: "Jagatsinghpur", population: 1250000, itTelecom: 60000, consumer: 30000, equipment: 27000, lighting: 7500, batteries: 18000, other: 7500, lastUpdated: "2025-06-30" },
  { district: "Jajpur", population: 2100000, itTelecom: 100800, consumer: 50400, equipment: 45360, lighting: 12600, batteries: 30240, other: 12600, lastUpdated: "2025-06-30" },
  { district: "Jharsuguda", population: 800000, itTelecom: 38400, consumer: 19200, equipment: 17280, lighting: 4800, batteries: 11520, other: 4800, lastUpdated: "2025-06-30" },
  { district: "Kalahandi", population: 1800000, itTelecom: 86400, consumer: 43200, equipment: 38880, lighting: 10800, batteries: 25920, other: 10800, lastUpdated: "2025-06-30" },
  { district: "Kandhamal", population: 820000, itTelecom: 39360, consumer: 19680, equipment: 17712, lighting: 4920, batteries: 11808, other: 4920, lastUpdated: "2025-06-30" },
  { district: "Kendrapara", population: 1550000, itTelecom: 74400, consumer: 37200, equipment: 33480, lighting: 9300, batteries: 22320, other: 9300, lastUpdated: "2025-06-30" },
  { district: "Kendujhar", population: 1950000, itTelecom: 93600, consumer: 46800, equipment: 42120, lighting: 11700, batteries: 28080, other: 11700, lastUpdated: "2025-06-30" },
  { district: "Khordha", population: 2700000, itTelecom: 129600, consumer: 64800, equipment: 58320, lighting: 16200, batteries: 38880, other: 16200, lastUpdated: "2025-06-30" },
  { district: "Koraput", population: 1450000, itTelecom: 69600, consumer: 34800, equipment: 31320, lighting: 8700, batteries: 20880, other: 8700, lastUpdated: "2025-06-30" },
  { district: "Malkangiri", population: 700000, itTelecom: 33600, consumer: 16800, equipment: 15120, lighting: 4200, batteries: 10080, other: 4200, lastUpdated: "2025-06-30" },
  { district: "Mayurbhanj", population: 2700000, itTelecom: 129600, consumer: 64800, equipment: 58320, lighting: 16200, batteries: 38880, other: 16200, lastUpdated: "2025-06-30" },
  { district: "Nabarangpur", population: 1600000, itTelecom: 76800, consumer: 38400, equipment: 34560, lighting: 9600, batteries: 23040, other: 9600, lastUpdated: "2025-06-30" },
  { district: "Nayagarh", population: 1150000, itTelecom: 55200, consumer: 27600, equipment: 24840, lighting: 6900, batteries: 16560, other: 6900, lastUpdated: "2025-06-30" },
  { district: "Nuapada", population: 750000, itTelecom: 36000, consumer: 18000, equipment: 16200, lighting: 4500, batteries: 10800, other: 4500, lastUpdated: "2025-06-30" },
  { district: "Puri", population: 1900000, itTelecom: 91200, consumer: 45600, equipment: 41040, lighting: 11400, batteries: 27360, other: 11400, lastUpdated: "2025-06-30" },
  { district: "Rayagada", population: 1050000, itTelecom: 50400, consumer: 25200, equipment: 22680, lighting: 6300, batteries: 15120, other: 6300, lastUpdated: "2025-06-30" },
  { district: "Sambalpur", population: 1200000, itTelecom: 57600, consumer: 28800, equipment: 25920, lighting: 7200, batteries: 17280, other: 7200, lastUpdated: "2025-06-30" },
  { district: "Subarnapur", population: 700000, itTelecom: 33600, consumer: 16800, equipment: 15120, lighting: 4200, batteries: 10080, other: 4200, lastUpdated: "2025-06-30" },
  { district: "Sundargarh", population: 2300000, itTelecom: 110400, consumer: 55200, equipment: 49680, lighting: 13800, batteries: 33120, other: 13800, lastUpdated: "2025-06-30" },
]

export const COLLECTION_LOG: CollectionRow[] = [
  { district: "Angul", centres: 3, remarks: "" },
  { district: "Balangir", centres: 4, remarks: "" },
  { district: "Balasore", centres: 1, remarks: "" },
  { district: "Bargarh", centres: 2, remarks: "" },
  { district: "Bhadrak", centres: 3, remarks: "" },
  { district: "Boudh", centres: 4, remarks: "" },
  { district: "Cuttack", centres: 1, remarks: "" },
  { district: "Deogarh", centres: 2, remarks: "" },
  { district: "Dhenkanal", centres: 3, remarks: "" },
  { district: "Gajapati", centres: 4, remarks: "" },
  { district: "Ganjam", centres: 1, remarks: "" },
  { district: "Jagatsinghpur", centres: 2, remarks: "" },
  { district: "Jajpur", centres: 3, remarks: "" },
  { district: "Jharsuguda", centres: 4, remarks: "" },
  { district: "Kalahandi", centres: 1, remarks: "" },
  { district: "Kandhamal", centres: 2, remarks: "" },
  { district: "Kendrapara", centres: 3, remarks: "" },
  { district: "Kendujhar", centres: 4, remarks: "" },
  { district: "Khordha", centres: 1, remarks: "" },
  { district: "Koraput", centres: 2, remarks: "" },
  { district: "Malkangiri", centres: 3, remarks: "" },
  { district: "Mayurbhanj", centres: 4, remarks: "" },
  { district: "Nabarangpur", centres: 1, remarks: "" },
  { district: "Nayagarh", centres: 2, remarks: "" },
  { district: "Nuapada", centres: 3, remarks: "" },
  { district: "Puri", centres: 4, remarks: "" },
  { district: "Rayagada", centres: 1, remarks: "" },
  { district: "Sambalpur", centres: 2, remarks: "" },
  { district: "Subarnapur", centres: 3, remarks: "" },
  { district: "Sundargarh", centres: 4, remarks: "" },
]

export const RECYCLING_INFRASTRUCTURE: RecyclerRow[] = [
  { name: "E-Parisaraa East India Pvt. Ltd.", authorisationNo: "ODSPCB/AUTH/2025/001", district: "Khordha", installedCapacity: 12000, processed: 9650, recoveryRate: 91, validTill: "2028-03-31" },
  { name: "Eco Recycling Odisha", authorisationNo: "ODSPCB/AUTH/2025/002", district: "Cuttack", installedCapacity: 8500, processed: 7020, recoveryRate: 89, validTill: "2027-03-31" },
  { name: "Green Circle Recyclers", authorisationNo: "ODSPCB/AUTH/2025/003", district: "Sundargarh", installedCapacity: 6000, processed: 4810, recoveryRate: 88, validTill: "2028-03-31" },
  { name: "Eastern E-Waste Solutions", authorisationNo: "ODSPCB/AUTH/2025/004", district: "Sambalpur", installedCapacity: 5000, processed: 3925, recoveryRate: 87, validTill: "2027-03-31" },
  { name: "EcoMetal Recovery", authorisationNo: "ODSPCB/AUTH/2025/005", district: "Ganjam", installedCapacity: 4200, processed: 3380, recoveryRate: 90, validTill: "2028-03-31" },
]

export const COMPLIANCE_TRACKER: ComplianceRow[] = [
  { entity: "ABC Electronics Ltd.", registrationNo: "EPR/2024/ST/00456", status: "Compliant", inspectionPlanned: true, inspectionConducted: true, penaltyIssued: false, penaltyResolved: false, remarks: "Annual EPR target met (105%)" },
  { entity: "Odisha Electronics Pvt. Ltd.", registrationNo: "EPR/2025/OD/1001", status: "Compliant", inspectionPlanned: true, inspectionConducted: true, penaltyIssued: false, penaltyResolved: false, remarks: "Target achieved" },
  { entity: "GreenTech Appliances", registrationNo: "EPR/2025/OD/1002", status: "Compliant", inspectionPlanned: true, inspectionConducted: true, penaltyIssued: false, penaltyResolved: false, remarks: "Records verified" },
  { entity: "EcoMobiles India", registrationNo: "EPR/2025/OD/1003", status: "Partially Compliant", inspectionPlanned: true, inspectionConducted: false, penaltyIssued: false, penaltyResolved: false, remarks: "Inspection pending" },
  { entity: "Digital World Pvt. Ltd.", registrationNo: "EPR/2025/OD/1004", status: "Compliant", inspectionPlanned: false, inspectionConducted: false, penaltyIssued: false, penaltyResolved: false, remarks: "Next cycle" },
  { entity: "Bright Home Electronics", registrationNo: "EPR/2025/OD/1005", status: "Non-Compliant", inspectionPlanned: true, inspectionConducted: true, penaltyIssued: true, penaltyResolved: false, remarks: "Show-cause issued" },
  { entity: "PowerCell Batteries", registrationNo: "EPR/2025/OD/1006", status: "Compliant", inspectionPlanned: true, inspectionConducted: true, penaltyIssued: false, penaltyResolved: false, remarks: "Battery target met" },
  { entity: "Smart Vision India", registrationNo: "EPR/2025/OD/1007", status: "Partially Compliant", inspectionPlanned: true, inspectionConducted: true, penaltyIssued: false, penaltyResolved: false, remarks: "Docs awaited" },
  { entity: "Future Gadgets", registrationNo: "EPR/2025/OD/1008", status: "Compliant", inspectionPlanned: false, inspectionConducted: false, penaltyIssued: false, penaltyResolved: false, remarks: "No issues" },
  { entity: "EcoRecycle Devices", registrationNo: "EPR/2025/OD/1009", status: "Compliant", inspectionPlanned: true, inspectionConducted: true, penaltyIssued: false, penaltyResolved: false, remarks: "Compliant" },
  { entity: "TechNova Systems", registrationNo: "EPR/2025/OD/1010", status: "Compliant", inspectionPlanned: true, inspectionConducted: true, penaltyIssued: false, penaltyResolved: false, remarks: "Verified" },
]

export const INFORMAL_HOTSPOTS: HotspotRow[] = [
  { name: "Cuttack Scrap Market", district: "Cuttack", activity: "Active", estimatedWorkers: 420, workersTrained: 180, action: "Awareness & Registration Drive", remarks: "Major dismantling cluster" },
  { name: "Bhubaneswar Bhangar Hub", district: "Khordha", activity: "Active", estimatedWorkers: 380, workersTrained: 160, action: "Collection linkage established", remarks: "High e-waste inflow" },
  { name: "Rourkela Scrap Cluster", district: "Sundargarh", activity: "Active", estimatedWorkers: 290, workersTrained: 120, action: "Training conducted", remarks: "Industrial area" },
  { name: "Berhampur Informal Cluster", district: "Ganjam", activity: "Moderate", estimatedWorkers: 210, workersTrained: 95, action: "Safety awareness", remarks: "Growing activity" },
  { name: "Balasore Scrap Market", district: "Balasore", activity: "Moderate", estimatedWorkers: 170, workersTrained: 80, action: "Registration ongoing", remarks: "Periodic monitoring" },
  { name: "Sambalpur Metal Market", district: "Sambalpur", activity: "Active", estimatedWorkers: 190, workersTrained: 90, action: "PPE distribution", remarks: "Needs formalization" },
  { name: "Jeypore Scrap Cluster", district: "Koraput", activity: "Low", estimatedWorkers: 85, workersTrained: 30, action: "Survey completed", remarks: "Small cluster" },
  { name: "Jharsuguda Scrap Yard", district: "Jharsuguda", activity: "Moderate", estimatedWorkers: 110, workersTrained: 45, action: "Training planned", remarks: "Linked with industries" },
]

export const ENV_HEALTH_MONITORING: MonitoringRow[] = [
  { site: "Bhubaneswar Scrap Hub", district: "Khordha", type: "Air & Soil", date: "2025-02-15", result: "Within permissible limits", healthCamp: true, beneficiaries: 86, remarks: "Routine monitoring" },
  { site: "Cuttack Scrap Market", district: "Cuttack", type: "Air Quality", date: "2025-03-12", result: "Moderate PM levels", healthCamp: true, beneficiaries: 74, remarks: "Awareness provided" },
  { site: "Rourkela Cluster", district: "Sundargarh", type: "Water Quality", date: "2025-03-28", result: "Acceptable", healthCamp: false, beneficiaries: 0, remarks: "Quarterly sampling" },
  { site: "Berhampur Cluster", district: "Ganjam", type: "Health Camp", date: "2025-04-09", result: "Minor respiratory cases", healthCamp: true, beneficiaries: 112, remarks: "Medical team deployed" },
  { site: "Balasore Market", district: "Balasore", type: "Noise Monitoring", date: "2025-05-21", result: "Within limits", healthCamp: false, beneficiaries: 0, remarks: "No action required" },
  { site: "Sambalpur Market", district: "Sambalpur", type: "Air & Soil", date: "2025-06-18", result: "Within limits", healthCamp: true, beneficiaries: 65, remarks: "Periodic inspection" },
]

export const AWARENESS_PROGRAMS: AwarenessRow[] = [
  { program: "E-Waste Awareness Drive 2025", district: "Khordha", date: "2025-01-15", type: "Workshop", audience: "Students", participants: 450 },
  { program: "Green Gadget Collection", district: "Cuttack", date: "2025-02-10", type: "Collection Drive", audience: "Residents", participants: 380 },
  { program: "Recycle Right Odisha", district: "Puri", date: "2025-03-05", type: "Seminar", audience: "College Students", participants: 300 },
  { program: "Safe E-Waste Disposal", district: "Sundargarh", date: "2025-04-18", type: "Campaign", audience: "Industries", participants: 220 },
  { program: "Digital Waste Awareness", district: "Ganjam", date: "2025-05-22", type: "Workshop", audience: "Schools", participants: 410 },
  { program: "EPR Awareness Camp", district: "Balasore", date: "2025-06-12", type: "Seminar", audience: "Retailers", participants: 180 },
  { program: "Clean Tech Odisha", district: "Sambalpur", date: "2025-07-08", type: "Public Campaign", audience: "General Public", participants: 520 },
  { program: "Battery Recycling Drive", district: "Koraput", date: "2025-08-19", type: "Collection Drive", audience: "Villagers", participants: 260 },
]

export const SCORE_BANDS: ScoreBand[] = [
  { label: "Excellent", min: 85, max: 100 },
  { label: "Good", min: 65, max: 84 },
  { label: "Needs Improvement", min: 45, max: 64 },
  { label: "Critical", min: 0, max: 44 },
]
