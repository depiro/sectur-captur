"use client"

import Link from "next/link"
import {
  LayoutDashboard,
  BookOpen,
  ExternalLink,
  Layers,
  Users,
  UserCheck,
  ShieldCheck,
  Award,
  ClipboardList,
  Image,
  HelpCircle,
  Settings,
  Grid3x3,
  Building2,
  Tags,
  Globe,
  ChevronRight,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { CapturLogoInitials } from "@/components/shared/CapturLogo"
import { cn } from "@/lib/utils"

interface SidebarItem {
  href: string
  label: string
  icon: React.ElementType
}

interface SidebarGroup {
  label?: string
  items: SidebarItem[]
}

const groups: SidebarGroup[] = [
  {
    items: [
      { href: "/backoffice", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Capacitaciones",
    items: [
      { href: "/backoffice/capacitaciones", label: "Todas", icon: BookOpen },
      { href: "/backoffice/capacitaciones-externas", label: "Externas", icon: ExternalLink },
      { href: "/backoffice/programas", label: "Programas", icon: Layers },
    ],
  },
  {
    label: "Usuarios",
    items: [
      { href: "/backoffice/beneficiarios", label: "Beneficiarios", icon: Users },
      { href: "/backoffice/capacitadores", label: "Capacitadores", icon: UserCheck },
      { href: "/backoffice/administradores", label: "Administradores", icon: ShieldCheck },
    ],
  },
  {
    items: [
      { href: "/backoffice/certificados", label: "Certificados", icon: Award },
      { href: "/backoffice/encuestas", label: "Encuestas", icon: ClipboardList },
    ],
  },
  {
    label: "Contenido",
    items: [
      { href: "/backoffice/slideshow", label: "Slideshow", icon: Image },
      { href: "/backoffice/preguntas-frecuentes", label: "Preguntas frecuentes", icon: HelpCircle },
    ],
  },
  {
    label: "Configuración",
    items: [
      { href: "/backoffice/configuracion/modalidades", label: "Modalidades", icon: Settings },
      { href: "/backoffice/configuracion/organizadores", label: "Organizadores", icon: Building2 },
      { href: "/backoffice/configuracion/tipos-destinatario", label: "Tipos de destinatario", icon: Tags },
      { href: "/backoffice/configuracion/ambitos", label: "Ámbitos", icon: Globe },
    ],
  },
]

interface Props {
  collapsed: boolean
  onToggle: () => void
  activeItem: string
}

export function BackofficeSidebar({ collapsed, onToggle, activeItem }: Props) {
  return (
    <aside
      className="flex flex-col border-r transition-all duration-200 ease-in-out shrink-0"
      style={{
        width: collapsed ? 64 : 240,
        backgroundColor: "var(--color-sidebar-bg)",
        borderColor: "var(--color-sidebar-border)",
      }}
    >
      {/* Header */}
      <div
        className="flex h-16 items-center border-b px-4"
        style={{ borderColor: "var(--color-sidebar-border)" }}
      >
        {collapsed ? (
          <CapturLogoInitials />
        ) : (
          <span
            className="text-heading-4 font-semibold"
            style={{ color: "var(--color-brand-teal)" }}
          >
            Captur
          </span>
        )}
        <button
          onClick={onToggle}
          className="ml-auto p-1 transition-colors rounded"
          style={{ color: "var(--color-sidebar-icon)" }}
          aria-label={collapsed ? "Expandir menú" : "Colapsar menú"}
        >
          <ChevronRight
            size={16}
            className={cn("transition-transform duration-200", !collapsed && "rotate-180")}
          />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3">
        {groups.map((group, gi) => (
          <div key={gi} className={gi > 0 ? "mt-4" : ""}>
            {group.label && !collapsed && (
              <p
                className="mb-1 px-4 text-label uppercase tracking-wider"
                style={{ color: "var(--color-sidebar-group-label)" }}
              >
                {group.label}
              </p>
            )}
            {group.label && gi > 0 && (
              <div
                className="mx-4 mb-2 border-t"
                style={{ borderColor: "var(--color-sidebar-border)" }}
              />
            )}
            {group.items.map(({ href, label, icon: Icon }) => {
              const isActive = activeItem === href
              const item = (
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-3 mx-2 px-2 py-2 rounded transition-colors",
                    isActive ? "" : "hover:bg-(--color-sidebar-hover-bg)"
                  )}
                  style={{
                    backgroundColor: isActive
                      ? "var(--color-sidebar-active-bg)"
                      : undefined,
                    color: isActive
                      ? "var(--color-sidebar-active-text)"
                      : "var(--color-sidebar-text)",
                    borderLeft: isActive ? "3px solid var(--color-sidebar-active-border)" : "3px solid transparent",
                    fontWeight: isActive ? 500 : 400,
                  }}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon
                    size={18}
                    style={{
                      color: isActive
                        ? "var(--color-sidebar-active-icon)"
                        : "var(--color-sidebar-icon)",
                      flexShrink: 0,
                    }}
                  />
                  {!collapsed && (
                    <span className="text-body-md truncate">{label}</span>
                  )}
                </Link>
              )

              if (collapsed) {
                return (
                  <Tooltip key={href}>
                    <TooltipTrigger render={<span />}>{item}</TooltipTrigger>
                    <TooltipContent side="right">{label}</TooltipContent>
                  </Tooltip>
                )
              }

              return <div key={href}>{item}</div>
            })}
          </div>
        ))}
      </nav>
    </aside>
  )
}
