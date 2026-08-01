export type Column<T> = {
  key: string
  header: string
  value: (row: T) => string | number
}

function escapeCell(value: string | number) {
  const text = String(value ?? "")
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

export function toCsv<T>(rows: T[], columns: Column<T>[]) {
  const head = columns.map((c) => escapeCell(c.header)).join(",")
  const body = rows.map((row) => columns.map((c) => escapeCell(c.value(row))).join(","))
  return [head, ...body].join("\r\n")
}

function timestamp() {
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`
}

function download(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: `${mime};charset=utf-8;` })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}

export function downloadCsv<T>(rows: T[], columns: Column<T>[], name: string) {
  download(toCsv(rows, columns), `${name}-${timestamp()}.csv`, "text/csv")
}

export function downloadJson(payload: unknown, name: string) {
  download(JSON.stringify(payload, null, 2), `${name}-${timestamp()}.json`, "application/json")
}

export function printView() {
  window.print()
}
