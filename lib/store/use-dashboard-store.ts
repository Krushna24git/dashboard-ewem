"use client"

import { create } from "zustand"

import type { MapMetric } from "@/components/charts/choropleth"

type State = {
  tab: "overview" | "districts" | "domains"
  mapMetric: MapMetric
  selectedDistrict: string | null
  register: string
  setTab: (tab: State["tab"]) => void
  setMapMetric: (metric: MapMetric) => void
  setSelectedDistrict: (district: string | null) => void
  setRegister: (register: string) => void
}

export const useDashboardStore = create<State>()((set) => ({
  tab: "overview",
  mapMetric: "generated",
  selectedDistrict: null,
  register: "recyclers",
  setTab: (tab) => set({ tab }),
  setMapMetric: (mapMetric) => set({ mapMetric }),
  setSelectedDistrict: (selectedDistrict) => set({ selectedDistrict }),
  setRegister: (register) => set({ register }),
}))
