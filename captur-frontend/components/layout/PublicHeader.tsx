"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CapturLogo } from "@/components/shared/CapturLogo"

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/capacitaciones", label: "Capacitaciones" },
  { href: "/preguntas-frecuentes", label: "Preguntas frecuentes" },
]

export function PublicHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-40 w-full border-b"
      style={{
        backgroundColor: "var(--color-background)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link href="/" aria-label="Captur — Inicio">
          <CapturLogo size="md" context="light" />
        </Link>

        {/* Nav — desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className="text-body-md transition-colors"
                style={{
                  color: isActive
                    ? "var(--color-brand-teal)"
                    : "var(--color-text-secondary)",
                  fontWeight: isActive ? 500 : 400,
                }}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Actions — desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="inline-flex items-center justify-center h-8 px-3 text-label rounded-md font-medium transition-colors"
            style={{ color: "var(--color-text-primary)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "var(--color-surface)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "transparent")
            }
          >
            Ingresar
          </Link>
          <Link
            href="/registro"
            className="inline-flex items-center justify-center h-8 px-3 text-label rounded-md font-medium text-white transition-colors"
            style={{ backgroundColor: "var(--color-brand-teal)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "var(--color-brand-teal-dark)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "var(--color-brand-teal)")
            }
          >
            Registrarse
          </Link>
        </div>

        {/* Hamburger — mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="md:hidden p-2"
            aria-label="Abrir menú"
            style={{ color: "var(--color-text-primary)", background: "none", border: "none", cursor: "pointer" }}
          >
            <Menu size={22} />
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-6 flex flex-col gap-6">
            <CapturLogo size="sm" context="light" />
            <nav className="flex flex-col gap-4">
              {navLinks.map(({ href, label }) => {
                const isActive = pathname === href
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="text-body-lg"
                    style={{
                      color: isActive
                        ? "var(--color-brand-teal)"
                        : "var(--color-text-primary)",
                      fontWeight: isActive ? 500 : 400,
                    }}
                  >
                    {label}
                  </Link>
                )
              })}
            </nav>
            <div className="flex flex-col gap-3 mt-auto">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center h-10 px-4 text-button rounded-md font-medium border transition-colors"
                style={{
                  borderColor: "var(--color-brand-teal)",
                  color: "var(--color-brand-teal)",
                }}
              >
                Ingresar
              </Link>
              <Link
                href="/registro"
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center h-10 px-4 text-button rounded-md font-medium text-white transition-colors"
                style={{ backgroundColor: "var(--color-brand-teal)" }}
              >
                Registrarse
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
