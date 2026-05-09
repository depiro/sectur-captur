"use client"

import { PanelLeftClose, PanelLeftOpen, ChevronDown, LogOut, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Props {
  sidebarCollapsed: boolean
  onToggleSidebar: () => void
  pageTitle: string
}

const MOCK_USER = { firstName: "María", lastName: "Rodríguez", initials: "MR" }

export function BackofficeHeader({ sidebarCollapsed, onToggleSidebar, pageTitle }: Props) {
  return (
    <header
      className="flex h-14 shrink-0 items-center justify-between border-b px-4"
      style={{
        backgroundColor: "var(--color-background)",
        borderColor: "var(--color-border)",
      }}
    >
      {/* Left: toggle + title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="rounded p-1.5 transition-colors"
          style={{ color: "var(--color-text-secondary)" }}
          aria-label={sidebarCollapsed ? "Expandir menú" : "Colapsar menú"}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.backgroundColor =
              "var(--color-surface)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.backgroundColor = "")
          }
        >
          {sidebarCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
        </button>
        <h1 className="text-heading-4" style={{ color: "var(--color-text-primary)" }}>
          {pageTitle}
        </h1>
      </div>

      {/* Right: user dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors"
          style={{ background: "none", border: "none", cursor: "pointer" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.backgroundColor =
              "var(--color-surface)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.backgroundColor = "")
          }
        >
          <span
            className="inline-flex items-center justify-center text-label font-semibold"
            style={{
              width: 32,
              height: 32,
              borderRadius: "var(--radius-full)",
              backgroundColor: "var(--color-brand-teal-bg)",
              color: "var(--color-brand-teal)",
            }}
          >
            {MOCK_USER.initials}
          </span>
          <span
            className="hidden text-body-md md:block"
            style={{ color: "var(--color-text-primary)" }}
          >
            {MOCK_USER.firstName} {MOCK_USER.lastName}
          </span>
          <ChevronDown
            size={14}
            style={{ color: "var(--color-text-secondary)" }}
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem className="gap-2">
            <User size={15} />
            Mi perfil
          </DropdownMenuItem>
          <DropdownMenuItem
            className="gap-2"
            style={{ color: "var(--color-error)" }}
          >
            <LogOut size={15} />
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
