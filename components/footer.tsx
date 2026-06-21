"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, Heart } from "lucide-react"
import { useTranslation } from "@/components/language-provider"

const navLinks = [
  { id: "home", href: "#home" },
  { id: "about", href: "#about" },
  { id: "experience", href: "#experience" },
  { id: "projects", href: "#projects" },
  { id: "skills", href: "#skills" },
  { id: "education", href: "#education" },
  { id: "contact", href: "#contact" },
]

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/hajer-fguir/",
    icon: Linkedin,
  },
  {
    name: "GitHub",
    href: "https://github.com/hajerfguir",
    icon: Github,
  },
  {
    name: "Email",
    href: "mailto:hajerfguir@gmail.com",
    icon: Mail,
  },
]

export function Footer() {
  const currentYear = new Date().getFullYear()
  const { t } = useTranslation()

  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="#home" className="text-2xl font-bold text-foreground">
              {t("brand.title")}
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              {t("brand.description")}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              {t("footer.quickLinks")}
            </h3>
            <nav className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t(`nav.${link.id}`)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              {t("footer.connect")}
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                >
                  <link.icon className="w-5 h-5" />
                  <span className="sr-only">{link.name}</span>
                </Link>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              {t("footer.email") || "hajerfguir@gmail.com"}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Hajer Fguir. {t("footer.rights")}
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            {t("footer.builtWith")} <Heart className="w-4 h-4 text-primary fill-primary" /> {t("footer.using")}
          </p>
        </div>
      </div>
    </footer>
  )
}
