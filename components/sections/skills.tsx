"use client"

import { useState } from "react"
import { Code, Layers, Cloud, Shield, Cpu } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionHeader } from "@/components/section-header"
import { useTranslation } from "@/components/language-provider"

const skillCategories = [
  {
    id: "languages",
    name: "Languages",
    icon: Code,
    skills: ["Python", "Java", "JavaScript", "TypeScript", "C/C++", "SQL", "HTML", "CSS"],
  },
  {
    id: "frameworks",
    name: "Frameworks & Libraries",
    icon: Layers,
    skills: ["React.js", "Node.js", ".NET", "Flask", "Django", "PyTorch", "OpenCV", "Electron.js", "FreeRTOS"],
  },
  {
    id: "cloud",
    name: "Cloud & DevOps",
    icon: Cloud,
    skills: ["Docker", "Git", "GitHub Actions", "CI/CD", "Linux", "Azure AD", "Google Cloud Platform", "Grafana"],
  },
  {
    id: "security",
    name: "Security & Testing",
    icon: Shield,
    skills: ["SSDLC", "SAML2", "SSO", "Postman", "JMeter", "Wireshark", "API Testing", "Security Compliance"],
  },
  {
    id: "embedded",
    name: "Embedded Systems",
    icon: Cpu,
    skills: ["ESP32", "VHDL", "FPGA", "MATLAB", "Simulink", "UART", "Assembly", "Real-time OS", "AVL Concerto"],
  },
]

export function SkillsSection() {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id)

  const get = (key: string, fallback: any) => {
    const val = t(key)
    return typeof val === "string" && val === key ? fallback : val
  }

  const activeSkills = skillCategories.find((cat) => cat.id === activeCategory)

  return (
    <section id="skills" className="py-24 sm:py-32 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          label={t("skills.label")}
          title={t("skills.title")}
          subtitle={t("skills.subtitle")}
          centered={true}
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {skillCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30"
              )}
            >
              <category.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{get(`skills.categories.${category.id}`, category.name)}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {activeSkills?.skills.map((skill, index) => (
            <div
              key={skill}
              className="group p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-200"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {skill}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* All Skills Overview */}
        <div className="mt-16 p-8 rounded-2xl bg-card border border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-6">{t("skills.completeSet")}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {skillCategories.map((category) => (
              <div key={category.id}>
                <div className="flex items-center gap-2 mb-3">
                  <category.icon className="w-4 h-4 text-primary" />
                  <h4 className="font-medium text-foreground text-sm">{get(`skills.categories.${category.id}`, category.name)}</h4>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 text-xs rounded-md bg-secondary/50 text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
