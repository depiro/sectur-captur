"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { BackofficeSidebar } from "@/components/layout/BackofficeSidebar"
import { BackofficeHeader } from "@/components/layout/BackofficeHeader"

export default function BackofficeLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className="flex h-screen overflow-hidden">
      <BackofficeSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        activeItem={pathname}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <BackofficeHeader
          collapsed={collapsed}
          onToggle={() => setCollapsed((c) => !c)}
        />
        <main className="flex-1 overflow-y-auto" style={{ backgroundColor: "var(--color-surface)" }}>
          {children}
        </main>
      </div>
    </div>
  )
}
