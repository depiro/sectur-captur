import { Skeleton } from "@/components/ui/skeleton"

export function TrainingCardSkeleton() {
  return (
    <article
      className="flex flex-col overflow-hidden border"
      style={{
        borderRadius: "var(--radius-lg)",
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-background)",
      }}
    >
      {/* Thumb */}
      <Skeleton className="shrink-0" style={{ height: 160 }} />

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Badge */}
        <Skeleton className="h-5 w-24 rounded-sm" />

        {/* Title */}
        <Skeleton className="h-5 w-full rounded" />
        <Skeleton className="h-5 w-3/4 rounded" />

        {/* Program */}
        <Skeleton className="h-4 w-1/2 rounded" />

        {/* Metadata */}
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-4 w-2/3 rounded" />
          <Skeleton className="h-4 w-1/2 rounded" />
          <Skeleton className="h-4 w-1/3 rounded" />
          <Skeleton className="h-4 w-3/4 rounded" />
        </div>

        {/* Divider + actions */}
        <div
          className="mt-auto border-t pt-3"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-24 rounded-md" />
            <Skeleton className="h-4 w-20 rounded ml-auto" />
          </div>
        </div>
      </div>
    </article>
  )
}
