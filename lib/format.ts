const LOCALE = "en-IN"

export function num(value: number, digits = 0) {
  return value.toLocaleString(LOCALE, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
}

export function tonnes(value: number, digits = 0) {
  return `${num(value, digits)} t`
}

export function pct(value: number, digits = 1) {
  return `${num(value, digits)}%`
}

export function compact(value: number) {
  if (Math.abs(value) >= 1_00_00_000) return `${num(value / 1_00_00_000, 2)} Cr`
  if (Math.abs(value) >= 1_00_000) return `${num(value / 1_00_000, 2)} L`
  if (Math.abs(value) >= 1_000) return `${num(value / 1_000, 1)}k`
  return num(value)
}

export function kg(value: number, digits = 2) {
  return `${num(value, digits)} kg`
}

export function shortDate(iso: string) {
  const date = new Date(iso)
  return date.toLocaleDateString(LOCALE, { day: "2-digit", month: "short", year: "numeric" })
}

export function monthLabel(iso: string) {
  return new Date(iso).toLocaleDateString(LOCALE, { month: "short", year: "2-digit" })
}
