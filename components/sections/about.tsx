"use client"

import { Shield, Code, Cloud, Cpu } from "lucide-react"
import { SectionHeader } from "@/components/section-header"

const highlights = [
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Exploring secure development, SSDLC practices, authentication, and application security.",
  },
  {
    icon: Code,
    title: "Software Development",
    description: "Building reliable applications with React, Node.js, .NET, Python, and modern web technologies.",
  },
  {
    icon: Cloud,
    title: "DevOps & Automation",
    description: "Working with CI/CD, Docker, API testing, automation, and modern development workflows.",
  },
  {
    icon: Cpu,
    title: "AI & Machine Learning",
    description: "Exploring AI-powered solutions using OpenAI, PyTorch, OpenCV, and intelligent automation.",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          label="About Me"
          title="Where secure engineering meets purposeful innovation"
          centered={true}
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Bio */}
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              Welcome to my digital space. If we haven&apos;t had the opportunity
              to meet in person yet, consider this my way of introducing myself
              beyond a resume.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              I&apos;m Hajer Fguir, a Computer Engineering graduate and Software
              Developer at the University of Ottawa. I&apos;m passionate about
              building technology that is not only functional, but secure,
              thoughtful, and meaningful.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              My journey has taken me through government, private industry,
              university IT, entrepreneurship, and teaching. Along the way,
              I&apos;ve learned to embrace complexity, ask better questions, and
              turn ideas into solutions that create real value. Beyond code, I&apos;m driven by curiosity, collaboration, and
              continuous growth. I&apos;m especially inspired by the intersection
              of cybersecurity, AI, and automation, and by the people and
              communities that make technology more impactful.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">3+</p>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>

              <div className="text-center">
                <p className="text-3xl font-bold text-primary">10+</p>
                <p className="text-sm text-muted-foreground">Projects</p>
              </div>

              <div className="text-center">
                <p className="text-3xl font-bold text-primary">5+</p>
                <p className="text-sm text-muted-foreground">Organizations</p>
              </div>
            </div>
          </div>

          {/* Right - Highlight Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <div
                key={item.title}
                className="group p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="font-semibold text-foreground mb-2">
                  {item.title}
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