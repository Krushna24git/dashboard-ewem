"use client"

import { motion } from "framer-motion"

const BLOBS = [
  { color: "var(--blob-a)", size: 46, x: "-6%", y: "-10%", drift: [0, 40, -20, 0], lift: [0, -30, 20, 0], seconds: 26 },
  { color: "var(--blob-b)", size: 40, x: "62%", y: "-14%", drift: [0, -34, 24, 0], lift: [0, 28, -18, 0], seconds: 32 },
  { color: "var(--blob-c)", size: 44, x: "70%", y: "48%", drift: [0, 26, -30, 0], lift: [0, -24, 18, 0], seconds: 29 },
  { color: "var(--blob-d)", size: 38, x: "8%", y: "58%", drift: [0, -28, 18, 0], lift: [0, 22, -26, 0], seconds: 35 },
]

export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {BLOBS.map((blob, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, x: blob.drift, y: blob.lift }}
          transition={{
            opacity: { duration: 1.4, ease: "easeOut" },
            x: { duration: blob.seconds, repeat: Infinity, ease: "easeInOut" },
            y: { duration: blob.seconds * 1.2, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{
            width: `${blob.size}rem`,
            height: `${blob.size}rem`,
            left: blob.x,
            top: blob.y,
            background: `radial-gradient(circle at 50% 50%, ${blob.color}, transparent 68%)`,
          }}
          className="absolute rounded-full blur-3xl"
        />
      ))}
      <div className="absolute inset-0 bg-background/35" />
    </div>
  )
}
