"use client"

import { PanelLeftClose, PanelLeftOpen, LogOut, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Props {
  collapsed: boolean
  onToggle: () => void
  sectionTitle?: string
  user?: { firstName: string; lastName: string; email: string }
}

function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

export function BackofficeHeader({
  collapsed,
  onToggle,
  sectionTitle,
  user,
}: Props) {
  return (
    <header
      className="flex h-16 items-center justify-between border-b px-4 shrink-0"
      style={{
        backgroundColor: "var(--color-background)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onToggle}
          className="p-2 rounded transition-colors"
          style={{ color: "var(--color-text-secondary)" }}
          aria-label={collapsed ? "Expandir menú" : "Colapsar menú"}
        >
          {collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
        </button>
        {sectionTitle && (
          <h1 className="text-heading-4" style={{ color: "var(--color-text-primary)" }}>
            {sectionTitle}
          </h1>
        )}
      </div>

      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-(--color-surface)" style={{ background: "none", border: "none", cursor: "pointer" }}>
              <span
                className="inline-flex items-center justify-center text-label font-semibold text-white"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "var(--radius-full)",
                  backgroundColor: "var(--color-brand-teal)",
                }}
              >
                {getInitials(user.firstName, user.lastName)}
              </span>
              <span className="text-body-md hidden md:block" style={{ color: "var(--color-text-primary)" }}>
                {user.firstName} {user.lastName}
              </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="gap-2">
              <User size={16} />
              Mi perfil
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2"
              style={{ color: "var(--color-error)" }}
            >
              <LogOut size={16} />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  )
}
