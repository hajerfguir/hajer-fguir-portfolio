"use client"

import { Shield, Code, Cloud, Cpu } from "lucide-react"
import { SectionHeader } from "@/components/section-header"

const highlights = [
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Implementing SSDLC practices, SAML2, SSO, and security-first development",
  },
  {
    icon: Code,
    title: "Full-Stack Development",
    description: "Building scalable applications with React, Node.js, .NET, and Python",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "CI/CD pipelines, Docker, Azure AD, and modern deployment practices",
  },
  {
    icon: Cpu,
    title: "AI & Machine Learning",
    description: "Developing AI-powered solutions with PyTorch, OpenCV, and OpenAI",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          label="About Me"
          title="Passionate about building secure and impactful software"
          centered={true}
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Bio */}
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              I&apos;m a Computer Engineering graduate from the University of Ottawa with a focus on 
              secure software development, API design, and modern DevOps practices. My journey in 
              tech has been driven by a passion for building robust, scalable solutions that make 
              a real impact.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              As a Co-Founder and Software Developer at Novasoft Vision Inc., I lead technical 
              initiatives while applying secure coding practices across the full stack. My experience 
              spans from optimizing CI/CD pipelines at major corporations like Canada Post to 
              developing verification tools at Dana TM4.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              I&apos;m particularly interested in the intersection of cybersecurity and modern software 
              engineering, constantly exploring ways to integrate security into every phase of the 
              development lifecycle.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">4+</p>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">10+</p>
                <p className="text-sm text-muted-foreground">Projects</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">5+</p>
                <p className="text-sm text-muted-foreground">Companies</p>
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
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
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
