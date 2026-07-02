import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const itemVariants = cva(
  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
  {
    variants: {
      variant: {
        default: "hover:bg-accent hover:text-accent-foreground",
        active: "bg-accent text-accent-foreground font-medium",
        subtle: "text-muted-foreground hover:text-foreground",
        ghost: "hover:bg-accent/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof itemVariants> {
  asChild?: boolean
  icon?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
}

const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  (
    {
      className,
      variant,
      asChild = false,
      icon,
      title,
      description,
      action,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "div"

    if (children) {
      return (
        <Comp
          ref={ref}
          className={cn(itemVariants({ variant }), className)}
          {...props}
        >
          {icon && <span className="flex shrink-0">{icon}</span>}
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate">{title}</div>
            {description && (
              <div className="text-xs text-muted-foreground truncate">
                {description}
              </div>
            )}
          </div>
          {action && <span className="flex shrink-0">{action}</span>}
        </Comp>
      )
    }

    return (
      <Comp
        ref={ref}
        className={cn(itemVariants({ variant }), className)}
        {...props}
      >
        {icon && <span className="flex shrink-0">{icon}</span>}
        <div className="flex-1 min-w-0">
          <div className="font-medium truncate">{title}</div>
          {description && (
            <div className="text-xs text-muted-foreground truncate">
              {description}
            </div>
          )}
        </div>
        {action && <span className="flex shrink-0">{action}</span>}
      </Comp>
    )
  }
)
Item.displayName = "Item"

export { Item, itemVariants }
