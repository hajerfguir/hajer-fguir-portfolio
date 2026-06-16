"use client"

import { useEffect, useRef, useMemo, useState } from "react"
import { useTheme } from "next-themes"

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  twinkleSpeed: number
  twinkleOffset: number
}

interface ShootingStar {
  x: number
  y: number
  length: number
  speed: number
  angle: number
  opacity: number
  active: boolean
  delay: number
}

export function StarfieldBackground() {
  const [mounted, setMounted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const animationRef = useRef<number | null>(null)
  const starsRef = useRef<Star[]>([])
  const shootingStarsRef = useRef<ShootingStar[]>([])
  const timeRef = useRef(0)

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === "dark"

  // Generate stars only once
  const generateStars = useMemo(() => {
    return (width: number, height: number): Star[] => {
      const stars: Star[] = []
      const numStars = Math.floor((width * height) / 8000) // Density based on screen size
      
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.7 + 0.3,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          twinkleOffset: Math.random() * Math.PI * 2,
        })
      }
      return stars
    }
  }, [])

  const generateShootingStars = useMemo(() => {
    return (width: number): ShootingStar[] => {
      return Array.from({ length: 3 }, (_, i) => ({
        x: Math.random() * width * 0.8,
        y: Math.random() * 200,
        length: Math.random() * 80 + 60,
        speed: Math.random() * 8 + 6,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
        opacity: 0,
        active: false,
        delay: i * 3000 + Math.random() * 2000,
      }))
    }
  }, [])

  useEffect(() => {
    // Don't run animation until component is mounted
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
      
      // Regenerate stars on resize
      starsRef.current = generateStars(window.innerWidth, window.innerHeight)
      shootingStarsRef.current = generateShootingStars(window.innerWidth)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const animate = () => {
      if (!ctx || !canvas) return
      
      const width = window.innerWidth
      const height = window.innerHeight
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      if (!isDark) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      timeRef.current += 1

      // Draw stars with twinkling
      starsRef.current.forEach((star) => {
        const twinkle = Math.sin(timeRef.current * star.twinkleSpeed + star.twinkleOffset)
        const currentOpacity = star.opacity * (0.5 + twinkle * 0.5)
        
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`
        ctx.fill()
      })

      // Update and draw shooting stars
      shootingStarsRef.current.forEach((shootingStar, index) => {
        if (!shootingStar.active) {
          shootingStar.delay -= 16.67 // ~60fps
          if (shootingStar.delay <= 0) {
            shootingStar.active = true
            shootingStar.opacity = 1
            shootingStar.x = Math.random() * width * 0.6
            shootingStar.y = Math.random() * 150
          }
          return
        }

        // Move shooting star
        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed
        shootingStar.opacity -= 0.012

        if (shootingStar.opacity <= 0 || shootingStar.x > width || shootingStar.y > height) {
          // Reset shooting star
          shootingStar.active = false
          shootingStar.delay = 4000 + Math.random() * 6000
          shootingStar.x = Math.random() * width * 0.6
          shootingStar.y = Math.random() * 150
          shootingStar.opacity = 0
          return
        }

        // Draw shooting star trail
        const gradient = ctx.createLinearGradient(
          shootingStar.x,
          shootingStar.y,
          shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length,
          shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length
        )
        gradient.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.opacity})`)
        gradient.addColorStop(0.3, `rgba(255, 255, 255, ${shootingStar.opacity * 0.5})`)
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

        ctx.beginPath()
        ctx.moveTo(shootingStar.x, shootingStar.y)
        ctx.lineTo(
          shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length,
          shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length
        )
        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.lineCap = "round"
        ctx.stroke()

        // Draw bright head
        ctx.beginPath()
        ctx.arc(shootingStar.x, shootingStar.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${shootingStar.opacity})`
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mounted, isDark, generateStars, generateShootingStars])

  // Always render the same element to prevent hydration mismatch
  // Hide with CSS when not in dark mode, but keep the same DOM structure
  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-500 ${
        mounted && isDark ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
      style={{ display: mounted && isDark ? "block" : "none" }}
    />
  )
}
