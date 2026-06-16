"use client"

import { useState, useEffect } from "react"
import { X, Cookie } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem("cookieConsent")
    if (!hasAccepted) {
      // Show the banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted")
    setIsVisible(false)
  }

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-fade-in">
      <div className="p-4 rounded-xl bg-card border border-border/50 shadow-xl backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Cookie className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-medium text-foreground">Cookie Preferences</h3>
              <button
                onClick={declineCookies}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
                <span className="sr-only">Close</span>
              </button>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This site uses cookies to enhance your browsing experience and analyze site traffic.
            </p>
            <div className="flex gap-2">
              <Button
                onClick={acceptCookies}
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Accept
              </Button>
              <Button
                onClick={declineCookies}
                variant="outline"
                size="sm"
              >
                Preferences
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
