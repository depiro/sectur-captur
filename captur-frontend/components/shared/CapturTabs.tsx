"use client"

import { Tabs } from "@base-ui/react/tabs"
import { cn } from "@/lib/utils"

export interface CapturTabItem {
  value: string
  label: string
}

interface CapturTabsProps {
  tabs: CapturTabItem[]
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  className?: string
  children: React.ReactNode
}

export function CapturTabs({
  tabs,
  defaultValue,
  value,
  onValueChange,
  className,
  children,
}: CapturTabsProps) {
  return (
    <Tabs.Root
      defaultValue={defaultValue ?? tabs[0]?.value}
      value={value}
      onValueChange={onValueChange}
      className={cn("flex flex-col", className)}
    >
      <Tabs.List
        className="relative flex border-b"
        style={{ borderColor: "var(--color-border)" }}
      >
        {tabs.map((tab) => (
          <Tabs.Tab
            key={tab.value}
            value={tab.value}
            className={cn(
              "px-4 py-2.5 text-body-md font-normal transition-colors outline-none cursor-pointer select-none",
              "[color:var(--color-text-secondary)]",
              "[&[data-selected]]:[color:var(--color-brand-teal)] [&[data-selected]]:font-medium",
            )}
          >
            {tab.label}
          </Tabs.Tab>
        ))}
        <Tabs.Indicator
          className="absolute bottom-0 h-0.5 transition-[left,width] duration-200"
          style={{ backgroundColor: "var(--color-brand-teal)" }}
        />
      </Tabs.List>
      {children}
    </Tabs.Root>
  )
}

interface CapturTabPanelProps {
  value: string
  children: React.ReactNode
  className?: string
}

export function CapturTabPanel({ value, children, className }: CapturTabPanelProps) {
  return (
    <Tabs.Panel value={value} className={cn("pt-4 outline-none", className)}>
      {children}
    </Tabs.Panel>
  )
}
