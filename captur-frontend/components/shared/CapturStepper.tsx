import { Check } from "lucide-react"

export interface StepperStep {
  label: string
  description?: string
}

interface CapturStepperProps {
  steps: StepperStep[]
  currentStep: number // 0-indexed
}

export function CapturStepper({ steps, currentStep }: CapturStepperProps) {
  return (
    <div className="flex w-full items-start">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep
        const isActive = index === currentStep
        const isLast = index === steps.length - 1

        return (
          <div key={index} className="flex flex-1 items-start">
            {/* Step node */}
            <div className="flex flex-col items-center gap-2 shrink-0">
              <div
                className="flex items-center justify-center text-label font-semibold transition-colors"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "var(--radius-full)",
                  backgroundColor:
                    isCompleted || isActive
                      ? "var(--color-brand-teal)"
                      : "var(--color-surface)",
                  border:
                    isCompleted || isActive
                      ? "2px solid var(--color-brand-teal)"
                      : "2px solid var(--color-border)",
                  color:
                    isCompleted || isActive
                      ? "#fff"
                      : "var(--color-text-disabled)",
                }}
              >
                {isCompleted ? <Check size={16} strokeWidth={2.5} /> : index + 1}
              </div>

              <div className="text-center min-w-[64px] max-w-[96px]">
                <p
                  className="text-label font-medium"
                  style={{
                    color: isActive
                      ? "var(--color-brand-teal)"
                      : isCompleted
                      ? "var(--color-text-primary)"
                      : "var(--color-text-secondary)",
                  }}
                >
                  {step.label}
                </p>
                {step.description && (
                  <p
                    className="mt-0.5 text-body-sm"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {step.description}
                  </p>
                )}
              </div>
            </div>

            {/* Connector */}
            {!isLast && (
              <div
                className="mx-2 mt-4 h-0.5 flex-1 transition-colors"
                style={{
                  backgroundColor: isCompleted
                    ? "var(--color-brand-teal)"
                    : "var(--color-border)",
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
