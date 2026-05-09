"use client"

import Link from "next/link"
import {
  LayoutDashboard,
  BookOpen,
  User,
  BarChart2,
  Settings,
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

const GROUPS: SidebarGroup[] = [
  {
    items: [
      { href: "/backoffice",                 label: "Dashboard",      icon: LayoutDashboard },
      { href: "/backoffice/capacitaciones",  label: "Capacitaciones", icon: BookOpen },
      { href: "/backoffice/beneficiarios",   label: "Beneficiarios",  icon: User },
      { href: "/backoffice/reportes",        label: "Reportes",       icon: BarChart2 },
      { href: "/backoffice/configuracion",   label: "Configuración",  icon: Settings },
    ],
  },
]

interface Props {
  collapsed: boolean
  onToggle: () => void
  activeItem: string
}

function isActive(href: string, activeItem: string): boolean {
  if (href === "/backoffice") return activeItem === "/backoffice"
  return activeItem === href || activeItem.startsWith(href + "/")
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
        className="flex h-14 items-center border-b px-4"
        style={{ borderColor: "var(--color-sidebar-border)" }}
      >
        {collapsed ? (
          <CapturLogoInitials />
        ) : (
          <span
            className="text-heading-3"
            style={{ color: "var(--color-brand-teal)" }}
          >
            CAPTUR
          </span>
        )}
        <button
          onClick={onToggle}
          className="ml-auto p-1 rounded transition-colors"
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
        {GROUPS.map((group, gi) => (
          <div
            key={gi}
            className={gi > 0 ? "mt-1" : ""}
          >
            {gi > 0 && (
              <div
                className="mx-3 mb-1 border-t"
                style={{ borderColor: "var(--color-sidebar-border)" }}
              />
            )}
            {group.label && !collapsed && (
              <p
                className="px-4 pb-1 pt-2 text-label uppercase tracking-wider"
                style={{ color: "var(--color-sidebar-group-label)", fontSize: "10px" }}
              >
                {group.label}
              </p>
            )}
            {group.items.map(({ href, label, icon: Icon }) => {
              const active = isActive(href, activeItem)
              const item = (
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-3 py-2 transition-colors",
                    collapsed ? "mx-1 justify-center px-2 rounded-md" : "mx-2 px-2",
                  )}
                  style={{
                    borderRadius: active && !collapsed
                      ? "0 var(--radius-md) var(--radius-md) 0"
                      : active && collapsed
                      ? "var(--radius-md)"
                      : "var(--radius-md)",
                    backgroundColor: active ? "var(--color-sidebar-active-bg)" : undefined,
                    color: active ? "var(--color-sidebar-active-text)" : "var(--color-sidebar-text)",
                    borderLeft: !collapsed
                      ? active
                        ? "3px solid var(--color-sidebar-active-border)"
                        : "3px solid transparent"
                      : undefined,
                    fontWeight: active ? 500 : 400,
                  }}
                  onMouseEnter={(e) => {
                    if (!active)
                      (e.currentTarget as HTMLElement).style.backgroundColor =
                        "var(--color-sidebar-hover-bg)"
                  }}
                  onMouseLeave={(e) => {
                    if (!active)
                      (e.currentTarget as HTMLElement).style.backgroundColor = ""
                  }}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon
                    size={18}
                    style={{
                      color: active
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
