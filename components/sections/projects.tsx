"use client"

import {
  Github,
  ExternalLink,
  Car,
  MessageSquare,
  Home,
  Cpu,
  Bell,
  Radio,
  Utensils,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/section-header"

const projects = [
  {
    title: "DriveSense™",
    subtitle: "Capstone Project · LockedIn LTD",
    description:
      "An intelligent driver alert system designed to monitor driver attentiveness in real time using sensors, computer vision, and machine-learning-based detection.",
    icon: Car,
    technologies: ["React.js", "TypeScript", "Electron.js", "Firebase", "PyTorch", "OpenCV", "Dlib", "Jetson Nano"],
    highlights: [
      "Detects signs of drowsiness, fatigue, or distress",
      "Provides real-time driver alerts for unsafe behavior",
      "Logs events to a cloud platform to support road safety",
    ],
    github: "https://github.com/LockedIn-LTD",
    demo: null,
    featured: true,
  },
  {
    title: "Smart Home Automation System",
    subtitle: "Embedded Systems Project",
    description:
      "A real-time smart home automation system that enables touchless control of lights, fans, and temperature using hand gestures and a locally hosted web interface.",
    icon: Home,
    technologies: ["C++", "ESP32", "FreeRTOS", "JavaScript", "LittleFS", "APDS-9960", "DHT11", "REST API"],
    highlights: [
      "Gesture-based control using APDS-9960 sensor",
      "Real-time sensor processing with ESP32 and FreeRTOS",
      "Local web interface for remote monitoring and control",
    ],
    github: "https://github.com/Jenny-Carl/Home-Automation-Project_CEG4566-",
    demo: null,
    featured: true,
  },
  {
    title: "AI-Powered NutriCoach Chatbot",
    subtitle: "AI Chatbot Project",
    description:
      "An AI-powered chatbot that provides personalized nutrition guidance based on user goals and input through an interactive Gradio interface.",
    icon: MessageSquare,
    technologies: ["Python", "Gradio", "OpenAI API", "JSON", "YAML", "gTTS"],
    highlights: [
      "Personalized nutrition recommendations based on user input",
      "User-friendly interface hosted on Hugging Face Spaces",
      "Voice interaction support using gTTS",
    ],
    github: null,
    demo: "https://huggingface.co/spaces/HajerFguir/SEG3525",
    featured: true,
  },
  {
    title: "M.Glam Beauty Salon Website",
    subtitle: "Web Development Project",
    description:
      "A modern beauty salon website designed to showcase services, support appointment booking, and provide a clean and elegant user experience.",
    icon: ExternalLink,
    technologies: ["React.js", "JavaScript", "HTML", "CSS", "Bootstrap"],
    highlights: [
      "Responsive and elegant salon website interface",
      "Service showcase and appointment-focused design",
      "Hosted live using GitHub Pages",
    ],
    github: "https://github.com/hajerfguir/mglam-beauty-salon",
    demo: "https://hajerfguir.github.io/mglam-beauty-salon/",
    featured: false,
  },
  {
    title: "MIPS Pipelined RISC Processor",
    subtitle: "VHDL / FPGA Design",
    description:
      "A 5-stage pipelined RISC processor designed in VHDL, integrating control and datapaths with pipeline registers on an Altera DE2 FPGA.",
    icon: Cpu,
    technologies: ["VHDL", "FPGA", "MIPS", "CPU Design", "Pipelining", "Quartus II"],
    highlights: [
      "Implemented IF, ID, EX, MEM, and WB pipeline stages",
      "Designed hazard detection and data forwarding units",
      "Validated timing, clock frequency, and execution cycles",
    ],
    github: null,
    demo: null,
    featured: false,
  },
  {
    title: "UART Communication System",
    subtitle: "Digital Systems Project",
    description:
      "A UART communication system designed in VHDL with transmitter, receiver, and programmable baud rate generator for serial communication.",
    icon: Radio,
    technologies: ["VHDL", "FSM", "UART", "FPGA", "Quartus II", "PuTTY"],
    highlights: [
      "Designed transmitter, receiver, and baud rate generator",
      "Performed loopback testing with MAX232",
      "Integrated UART with a traffic light controller for debugging",
    ],
    github: "https://github.com/hajerfguir/UART-project",
    demo: null,
    featured: false,
  },
  {
    title: "Alarm System on Microcontroller",
    subtitle: "Embedded Systems Project",
    description:
      "An embedded alarm system built in C on the Dragon-12 board, integrating keypad input, display output, speaker alerts, and temperature sensing.",
    icon: Bell,
    technologies: ["C", "Assembly", "Dragon-12", "Microcontroller", "Interrupts", "Timers", "ADC"],
    highlights: [
      "Integrated keypad, 7-segment display, speaker, and thermistor",
      "Used interrupts, timers, and ADC for real-time behavior",
      "Focused on modular embedded systems programming",
    ],
    github: "https://github.com/hajerfguir/AlarmSystem",
    demo: null,
    featured: false,
  },
  {
    title: "Restaurant Webpage",
    subtitle: "Frontend Web Project",
    description:
      "A responsive restaurant webpage built to practice frontend fundamentals, including layout design, styling, navigation, and content presentation.",
    icon: Utensils,
    technologies: ["HTML", "CSS"],
    highlights: [
      "Built a clean static restaurant webpage",
      "Practiced responsive layout and visual styling",
      "Focused on frontend structure and presentation",
    ],
    github: "https://github.com/hajerfguir/restaurant-webpage",
    demo: null,
    featured: false,
  },
]

export function ProjectsSection() {
  const [startIndex, setStartIndex] = useState(0)
  const projectsPerPage = 3
  const visibleProjects = projects.slice(startIndex, startIndex + projectsPerPage)

  const canGoBack = startIndex > 0
  const canGoNext = startIndex + projectsPerPage < projects.length

  const handlePrevious = () => {
    if (canGoBack) {
      setStartIndex(startIndex - projectsPerPage)
    }
  }

  const handleNext = () => {
    if (canGoNext) {
      setStartIndex(startIndex + projectsPerPage)
    }
  }

  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          label="Projects"
          title="Featured work"
          subtitle="A selection of projects showcasing my work across AI, embedded systems, cybersecurity, software development, and automation."
          centered={true}
        />

        {/* Projects Navigation + Grid */}
        <div className="relative">
          {/* Left Navigation */}
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            disabled={!canGoBack}
            className="absolute -left-5 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-background/80 backdrop-blur md:flex"
            aria-label="Previous projects"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleProjects.map((project, index) => (
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
                  {project.github && (
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <Link href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Link>
                    </Button>
                  )}

                  {project.demo && (
                    <Button asChild size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                      <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Explore
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Navigation */}
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={!canGoNext}
            className="absolute -right-5 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-background/80 backdrop-blur md:flex"
            aria-label="Next projects"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="mt-8 flex justify-center gap-3 md:hidden">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            disabled={!canGoBack}
            aria-label="Previous projects"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={!canGoNext}
            aria-label="Next projects"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* View All Projects CTA */}
        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
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