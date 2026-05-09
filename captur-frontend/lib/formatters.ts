import { format, formatDistanceToNow, parseISO } from "date-fns"
import { es } from "date-fns/locale"

export function formatDate(date: string | Date | null): string {
  if (!date) return "Fecha a confirmar"
  const d = typeof date === "string" ? parseISO(date) : date
  return format(d, "d 'de' MMMM 'de' yyyy", { locale: es })
}

export function formatDateShort(date: string | Date | null): string {
  if (!date) return "—"
  const d = typeof date === "string" ? parseISO(date) : date
  return format(d, "dd/MM/yyyy")
}

export function formatDateRelative(date: string | Date): string {
  const d = typeof date === "string" ? parseISO(date) : date
  return formatDistanceToNow(d, { addSuffix: true, locale: es })
}

export function formatHours(hs: number | null): string {
  if (hs === null) return "—"
  return `${hs} hs`
}

export function formatFullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`
}

export function isPublishedWithinDays(publishedAt: string | null | undefined, days = 7): boolean {
  if (!publishedAt) return false
  const published = parseISO(publishedAt)
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - days)
  return published >= cutoff
}
