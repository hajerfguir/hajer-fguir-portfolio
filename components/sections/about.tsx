"use client"

import { Shield, Code, Cloud, Cpu } from "lucide-react"
import { SectionHeader } from "@/components/section-header"
import { useTranslation } from "@/components/language-provider"

const highlights = [
  {
    id: "cybersecurity",
    icon: Shield,
    description: "Exploring secure development, SSDLC practices, authentication, and application security.",
  },
  {
    id: "software",
    icon: Code,
    description: "Building reliable applications with React, Node.js, .NET, Python, and modern web technologies.",
  },
  {
    id: "devops",
    icon: Cloud,
    description: "Working with CI/CD, Docker, API testing, automation, and modern development workflows.",
  },
  {
    id: "ai",
    icon: Cpu,
    description: "Exploring AI-powered solutions using OpenAI, PyTorch, OpenCV, and intelligent automation.",
  },
]

export function AboutSection() {
  const { t } = useTranslation()
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          label={t("about.label")}
          title={t("about.title")}
          centered={true}
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Bio */}
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              {t("about.bio1")}
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              {t("about.bio2")}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">3+</p>
                <p className="text-sm text-muted-foreground">{t("about.stats.years")}</p>
              </div>

              <div className="text-center">
                <p className="text-3xl font-bold text-primary">10+</p>
                <p className="text-sm text-muted-foreground">{t("about.stats.projects")}</p>
              </div>

              <div className="text-center">
                <p className="text-3xl font-bold text-primary">5+</p>
                <p className="text-sm text-muted-foreground">{t("about.stats.orgs")}</p>
              </div>
            </div>
          </div>

          {/* Right - Highlight Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <div
                key={item.id}
                className="group p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="font-semibold text-foreground mb-2">
                  {t(`about.highlights.${item.id}`)}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}