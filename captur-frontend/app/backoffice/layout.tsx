"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { BackofficeSidebar } from "@/components/layout/BackofficeSidebar"
import { BackofficeHeader } from "@/components/layout/BackofficeHeader"

const PAGE_TITLES: Record<string, string> = {
  "/backoffice":                                        "Dashboard",
  "/backoffice/capacitaciones":                         "Capacitaciones",
  "/backoffice/capacitaciones/nueva":                   "Nueva capacitación",
  "/backoffice/capacitaciones-externas":                "Capacitaciones externas",
  "/backoffice/programas":                              "Programas",
  "/backoffice/beneficiarios":                          "Beneficiarios",
  "/backoffice/capacitadores":                          "Capacitadores",
  "/backoffice/administradores":                        "Administradores",
  "/backoffice/certificados":                           "Certificados",
  "/backoffice/encuestas":                              "Encuestas",
  "/backoffice/reportes":                               "Reportes",
  "/backoffice/slideshow":                              "Slideshow",
  "/backoffice/preguntas-frecuentes":                   "Preguntas frecuentes",
  "/backoffice/configuracion":                          "Configuración",
  "/backoffice/configuracion/modalidades":              "Modalidades",
  "/backoffice/configuracion/organizadores":            "Organizadores",
  "/backoffice/configuracion/tipos-destinatario":       "Tipos de destinatario",
  "/backoffice/configuracion/ambitos":                  "Ámbitos",
}

function getPageTitle(pathname: string): string {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname]
  if (pathname.startsWith("/backoffice/capacitaciones-externas/")) return "Capacitaciones externas"
  if (pathname.startsWith("/backoffice/capacitaciones/")) {
    if (pathname.includes("/inscripciones")) return "Inscripciones"
    if (pathname.includes("/editar")) return "Editar capacitación"
    return "Capacitación"
  }
  if (pathname.startsWith("/backoffice/beneficiarios/")) return "Beneficiario"
  if (pathname.startsWith("/backoffice/capacitadores/")) return "Capacitador"
  if (pathname.startsWith("/backoffice/encuestas/")) return "Encuesta"
  if (pathname.startsWith("/backoffice/configuracion/")) return "Configuración"
  return "Backoffice"
}

export default function BackofficeLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const pageTitle = getPageTitle(pathname)

  return (
    <div className="flex h-screen overflow-hidden">
      <BackofficeSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        activeItem={pathname}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <BackofficeHeader
          sidebarCollapsed={collapsed}
          onToggleSidebar={() => setCollapsed((c) => !c)}
          pageTitle={pageTitle}
        />
        <main
          className="flex-1 overflow-y-auto"
          style={{ backgroundColor: "var(--color-surface)" }}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
