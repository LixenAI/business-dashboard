import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonGroupVariants = cva("inline-flex", {
  variants: {
    variant: {
      default: "divide-border border",
      outline: "divide-border border",
      ghost: "divide-border",
    },
    orientation: {
      horizontal: "flex-row divide-x",
      vertical: "flex-col divide-y",
    },
  },
  defaultVariants: {
    variant: "default",
    orientation: "horizontal",
  },
})

interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonGroupVariants> {}

function ButtonGroup({
  className,
  variant,
  orientation,
  ...props
}: ButtonGroupProps) {
  return (
    <div
      className={cn(
        buttonGroupVariants({ variant, orientation }),
        "[>*:first-child]:rounded-none",
        orientation === "horizontal"
          ? "[>*:first-child]:rounded-l-md [>*:last-child]:rounded-r-md"
          : "[>*:first-child]:rounded-t-md [>*:last-child]:rounded-b-md",
        "[>*:not(:first-child):not(:last-child)]:rounded-none",
        className
      )}
      {...props}
    />
  )
}

export { ButtonGroup, buttonGroupVariants }
