import * as React from "react"
import { cn } from "@/lib/utils"

interface IconTileProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'accent' | 'muted' | 'skill';
}

const IconTile = React.forwardRef<HTMLDivElement, IconTileProps>(
  ({ className, icon, size = 'md', variant = 'default', ...props }, ref) => {
    const sizeClasses = {
      sm: 'h-6 w-6',
      md: 'h-8 w-8',
      lg: 'h-10 w-10'
    };

    const variantClasses = {
      default: 'bg-white/8',
      accent: 'bg-brand-teal/20',
      muted: 'bg-white/5',
      skill: 'bg-white/10 border border-white/15'
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl transition-all duration-200",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {icon}
      </div>
    )
  }
)
IconTile.displayName = "IconTile"

export { IconTile }
