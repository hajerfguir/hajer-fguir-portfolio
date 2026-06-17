"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={cn(
        // Sits to the left of the AI assistant toggle so the two never overlap
        "fixed bottom-6 right-24 z-50 flex h-11 w-11 items-center justify-center rounded-full",
        "border border-border/50 bg-card/80 text-muted-foreground backdrop-blur-md shadow-lg",
        "cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:text-primary hover:border-primary/40 hover:shadow-xl",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        isVisible
          ? "pointer-events-auto opacity-100 translate-y-0"
          : "pointer-events-none opacity-0 translate-y-3"
      )}
    >
      <ArrowUp className="h-5 w-5" />
      <span className="sr-only">Back to top</span>
    </button>
  )
}
