"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react"
import { useTranslation } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { StarfieldBackground } from "@/components/starfield-background"
import { cn } from "@/lib/utils"

// Carousel images cycle in the order requested: graduation, profile, photo 3, photo 4.
const heroImages = [
  { src: "/images/hero-1.png", alt: "graduation", position: "42% 22%" },
  { src: "/images/hero-2.png", alt: "graduating", position: "50% 12%" },
  { src: "/images/hero-3.png", alt: "professional", position: "50% 16%" },
  { src: "/images/hero-4.png", alt: "business", position: "50% 14%" },
]

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const { t } = useTranslation()

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Animated starfield for dark mode */}
      <StarfieldBackground />
      
      {/* Subtle background effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground animate-fade-in animation-delay-200 text-balance">
                {t("hero.name")}
              </h1>
              <p className="text-primary font-medium tracking-wide uppercase text-sm animate-fade-in">
                {t("hero.role")}
              </p>
            </div>

            <p className="text-muted-foreground text-lg max-w-xl mx-auto lg:mx-0 animate-fade-in animation-delay-600 leading-relaxed text-pretty">
              {t("hero.description")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-in animation-delay-600">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Link href="#projects">{t("hero.cta.viewProjects")}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-border hover:bg-secondary"
              >
                <Link href="#contact">{t("hero.cta.contact")}</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
              >
                <Link
                  href="https://github.com/hajerfguir"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-5 w-5" />
                  {t("hero.cta.github")}
                </Link>
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center lg:justify-start animate-fade-in animation-delay-600">
              <Link
                href="https://www.linkedin.com/in/hajer-fguir/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-all"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">{t("contact.linkedIn") || "LinkedIn"}</span>
              </Link>
              <Link
                href="https://github.com/hajerfguir"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-all"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">{t("contact.github") || "GitHub"}</span>
              </Link>
              <Link
                href="mailto:hajerfguir@gmail.com"
                className="p-2 rounded-full bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-all"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">{t("contact.email") || "Email"}</span>
              </Link>
            </div>
          </div>

          {/* Right side - Animated Image Carousel */}
          <div className="flex flex-col items-center lg:items-end gap-5 animate-fade-in animation-delay-400">
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-2xl" />
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-border/50 shadow-2xl">
                {heroImages.map((image, index) => (
                  <Image
                    key={image.src}
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 1024px) 20rem, 24rem"
                    style={{ objectPosition: image.position }}
                    className={cn(
                      "object-cover transition-opacity duration-1000 ease-in-out",
                      index === activeIndex ? "opacity-100" : "opacity-0"
                    )}
                    priority={index === 0}
                  />
                ))}
              </div>
            </div>

            {/* Carousel indicators */}
            <div className="flex items-center gap-2">
              {heroImages.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show image ${index + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300 cursor-pointer",
                    index === activeIndex
                      ? "w-6 bg-primary"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden lg:block">
          <Link
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-xs uppercase tracking-widest">{t("hero.scroll")}</span>
            <ArrowDown className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
