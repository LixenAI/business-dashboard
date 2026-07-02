import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const fieldVariants = cva("grid gap-2", {
  variants: {
    layout: {
      vertical: "",
      horizontal: "grid-cols-[1fr_2fr] items-center",
    },
  },
  defaultVariants: {
    layout: "vertical",
  },
})

interface FieldProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof fieldVariants> {
  label?: React.ReactNode
  description?: React.ReactNode
  error?: React.ReactNode
}

const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ className, layout, label, description, error, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(fieldVariants({ layout }), className)}
        {...props}
      >
        {label && (
          <div className="space-y-1">
            {typeof label === "string" ? (
              <Label className={error ? "text-destructive" : ""}>{label}</Label>
            ) : (
              label
            )}
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        )}
        <div className="space-y-1">
          <Slot aria-invalid={!!error}>{children}</Slot>
          {error && (
            <p className="text-xs font-medium text-destructive">{error}</p>
          )}
        </div>
      </div>
    )
  }
)
Field.displayName = "Field"

export { Field, fieldVariants }
