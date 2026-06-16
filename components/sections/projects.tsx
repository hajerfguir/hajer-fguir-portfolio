"use client"

import { Github, ExternalLink, Car, MessageSquare, Home } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    title: "DriveSense",
    subtitle: "Capstone Project",
    description:
      "Real-time driver alert system designed to detect drowsiness through webcam analysis. Built for direct deployment on Jetson Nano with a custom React/TypeScript UI.",
    icon: Car,
    technologies: ["React.js", "TypeScript", "Electron.js", "Firebase", "PyTorch", "OpenCV", "Dlib", "NumPy"],
    highlights: [
      "Eye and Yawning Detection models for drowsiness identification",
      "Real-time webcam analysis for immediate driver alerts",
      "Optimized for Jetson Nano edge deployment",
    ],
    github: "#",
    demo: null,
    featured: true,
  },
  {
    title: "AI-Powered NutriCoach Chatbot",
    subtitle: "Personal Project",
    description:
      "An intelligent chatbot providing personalized nutrition advice using OpenAI GPT API with voice interaction capabilities for enhanced accessibility.",
    icon: MessageSquare,
    technologies: ["Python", "Gradio", "OpenAI API", "JSON", "YAML", "gTTS"],
    highlights: [
      "Personalized nutrition recommendations based on user input",
      "Voice interaction via gTTS for improved accessibility",
      "Intuitive Gradio-based user interface",
    ],
    github: "#",
    demo: null,
    featured: true,
  },
  {
    title: "Smart Home Automation",
    subtitle: "IoT Project",
    description:
      "A comprehensive smart home system with real-time sensor monitoring, device control, and a web-based UI built on ESP32 with FreeRTOS.",
    icon: Home,
    technologies: ["C++", "ESP32", "FreeRTOS", "JavaScript", "LittleFS", "REST API"],
    highlights: [
      "Real-time sensor reading and UI synchronization",
      "FreeRTOS tasks for reliable concurrent operations",
      "REST endpoints for seamless device control",
    ],
    github: "#",
    demo: null,
    featured: false,
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-4 mb-16">
          <p className="text-primary font-medium tracking-wide uppercase text-sm">
            Projects
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-balance">
            Featured work
          </h2>
          <p className="text-muted-foreground max-w-2xl text-pretty">
            A selection of projects showcasing my expertise in AI, embedded systems, and full-stack development.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group relative flex flex-col p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute -top-3 -right-3">
                  <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                </div>
              )}

              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <project.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Title & Subtitle */}
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground">{project.subtitle}</p>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-grow">
                {project.description}
              </p>

              {/* Highlights */}
              <ul className="space-y-1.5 mb-4">
                {project.highlights.map((highlight, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex gap-2">
                    <span className="text-primary">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.technologies.slice(0, 5).map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="text-xs bg-secondary/50 hover:bg-secondary"
                  >
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 5 && (
                  <Badge variant="secondary" className="text-xs bg-secondary/50">
                    +{project.technologies.length - 5}
                  </Badge>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-auto">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <Link href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Link>
                </Button>
                {project.demo && (
                  <Button asChild size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                    <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="mt-12 text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
          >
            <Link href="https://github.com/hajerfguir" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 mr-2" />
              View All Projects on GitHub
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
