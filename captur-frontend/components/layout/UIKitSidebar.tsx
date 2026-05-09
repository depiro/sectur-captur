"use client"

import { useEffect, useRef, useState } from "react"
import { CapturLogo } from "@/components/shared/CapturLogo"

interface NavItem {
  id: string
  label: string
}

const NAV_ITEMS: NavItem[] = [
  { id: "logo",              label: "Logo" },
  { id: "colores",           label: "Colores" },
  { id: "tipografia",        label: "Tipografía" },
  { id: "botones",           label: "Botones" },
  { id: "formularios",       label: "Formularios" },
  { id: "multiselect",       label: "MultiSelect" },
  { id: "badges",            label: "Badges y etiquetas" },
  { id: "toasts",            label: "Toasts y feedback" },
  { id: "estados-carga",     label: "Estados de carga" },
  { id: "estados-vacios",    label: "Estados vacíos" },
  { id: "dialogs",           label: "Dialogs" },
  { id: "card-capacitacion", label: "Card de capacitación" },
  { id: "header-publico",    label: "Header público" },
  { id: "sidebar-backoffice",label: "Sidebar backoffice" },
  { id: "tablas",            label: "Tablas" },
]

export function UIKitSidebar() {
  const [activeSection, setActiveSection] = useState<string>(NAV_ITEMS[0].id)
  const intersecting = useRef(new Set<string>())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            intersecting.current.add(e.target.id)
          } else {
            intersecting.current.delete(e.target.id)
          }
        })
        const activeId = NAV_ITEMS.find((item) =>
          intersecting.current.has(item.id)
        )?.id
        if (activeId) setActiveSection(activeId)
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0 },
    )

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <aside
      className="flex shrink-0 flex-col border-r"
      style={{
        width: 240,
        backgroundColor: "var(--color-sidebar-bg)",
        borderColor: "var(--color-sidebar-border)",
      }}
    >
      {/* Header */}
      <div
        className="flex flex-col border-b px-4 py-5"
        style={{ borderColor: "var(--color-sidebar-border)" }}
      >
        <CapturLogo size="sm" />
        <p
          className="text-body-sm mt-2"
          style={{ color: "var(--color-text-secondary)" }}
        >
          UI Kit · Fase 0
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3">
        {NAV_ITEMS.map(({ id, label }) => {
          const isActive = activeSection === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => scrollToSection(id)}
              className="flex items-center py-2 text-body-sm text-left transition-colors outline-none"
              style={{
                width: "calc(100% - 8px)",
                marginLeft: 8,
                paddingLeft: 10,
                paddingRight: 10,
                borderRadius: isActive
                  ? "0 var(--radius-md) var(--radius-md) 0"
                  : "var(--radius-md)",
                backgroundColor: isActive
                  ? "var(--color-sidebar-active-bg)"
                  : "transparent",
                color: isActive
                  ? "var(--color-sidebar-active-text)"
                  : "var(--color-sidebar-text)",
                borderTop: "none",
                borderRight: "none",
                borderBottom: "none",
                borderLeft: isActive
                  ? "3px solid var(--color-sidebar-active-border)"
                  : "3px solid transparent",
                fontWeight: isActive ? 500 : 400,
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
