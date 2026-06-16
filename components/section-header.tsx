"use client"

import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  label: string
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export function SectionHeader({
  label,
  title,
  subtitle,
  centered = true,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "space-y-4 mb-16",
        centered && "text-center",
        className
      )}
    >
      {/* Small uppercase label with accent */}
      <div className={cn("flex items-center gap-3", centered && "justify-center")}>
        <span className="h-px w-8 bg-primary/50" />
        <p className="text-primary font-semibold tracking-widest uppercase text-xs sm:text-sm">
          {label}
        </p>
        <span className="h-px w-8 bg-primary/50" />
      </div>

      {/* Main title */}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
        {title}
      </h2>

      {/* Optional subtitle */}
      {subtitle && (
        <p
          className={cn(
            "text-muted-foreground text-lg leading-relaxed text-pretty",
            centered && "max-w-2xl mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
