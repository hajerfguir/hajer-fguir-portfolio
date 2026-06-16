"use client"

import { Building2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/section-header"

const experiences = [
  {
    company: "University of Ottawa IT",
    role: "Software Engineer",
    type: "Intern → Part-time → Contract",
    period: "May 2025 – Present",
    location: "Ottawa, ON, Canada",
    description: [
      "Developed and maintained the Experiential Learning platform by integrating APIs using Node.js, .NET, and JavaScript",
      "Performed comprehensive API testing, including functional, load, regression, and security testing using Apache JMeter and Postman",
      "Optimized database queries, reducing API response times by up to 70%",
      "Contributed to CI/CD pipeline integration and applied Secure Software Development Lifecycle (SSDLC) practices",
    ],
    technologies: ["Node.js", ".NET", "JavaScript", "JMeter", "Postman", "CI/CD", "SSDLC"],
  },
  {
    company: "University of Ottawa",
    role: "Teaching Assistant",
    type: "Part-time",
    period: "Jan 2025 – Dec 2025",
    location: "Ottawa, ON, Canada",
    description: [
      "Graded assignments and provided detailed feedback for 100+ students in ITI1520 and SEG2911",
      "Conducted lab sessions and provided one-on-one support to students in Python Programming",
    ],
    technologies: ["Python", "Teaching", "Mentorship"],
  },
  {
    company: "Novasoft Vision Incorporated",
    role: "Co-Founder & Software Developer",
    type: "Full-time",
    period: "Dec 2024 – Dec 2025",
    location: "Laval, QC, Canada",
    description: [
      "Developed secure data-processing and validation tools using Python and AVL Concerto",
      "Improved reliability and data integrity across the platform",
      "Defined technical requirements and contributed to full-stack development applying secure coding practices",
    ],
    technologies: ["Python", "AVL Concerto", "Full-Stack", "Security"],
  },
  {
    company: "Dana TM4 Incorporated",
    role: "Verification and Validation Project Management Intern",
    type: "Internship",
    period: "Sep 2024 – Dec 2024",
    location: "Boucherville, QC, Canada",
    description: [
      "Developed an AVL-Concerto Application using Python to automate the verification process, reducing manual validation by 60%",
      "Built a Laboratory Tools Viewer website using JavaScript, standardizing SQL database output and reducing load time by 40%",
      "Implemented a secure ETL pipeline using Flask and Django resulting in a 30% increase in inbound data flow speed",
      "Integrated SAML2 protocol for SSO and user authentication via Microsoft Azure AD ensuring data security compliance",
    ],
    technologies: ["Python", "JavaScript", "Flask", "Django", "SAML2", "Azure AD", "SQL"],
  },
  {
    company: "Canada Post Corporation",
    role: "Performance Data Analyst Intern",
    type: "Internship",
    period: "Jan 2024 – Apr 2024",
    location: "Ottawa, ON, Canada",
    description: [
      "Built Python-based automation scripts for critical data analysis by integrating Power BI and TRENDS databases",
      "Improved KPI-driven decision-making, reducing manual workload by 60%",
      "Deployed machine learning models to predict failures, reducing downtime by 15%",
      "Optimized CI/CD pipelines and implemented DevOps best practices, improving deployment efficiency by 25%",
    ],
    technologies: ["Python", "Power BI", "Machine Learning", "CI/CD", "DevOps"],
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 sm:py-32 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          label="Experience"
          title="My professional journey"
          subtitle="Building expertise through diverse roles and impactful projects"
          centered={true}
        />

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={`${exp.company}-${exp.role}`}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-3 h-3 bg-primary rounded-full md:-translate-x-1.5 ring-4 ring-background" />

                {/* Content */}
                <div className={`md:w-1/2 pl-8 md:pl-0 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                  <div className="group p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{exp.company}</h3>
                          <p className="text-sm text-muted-foreground">{exp.location}</p>
                        </div>
                      </div>
                    </div>

                    {/* Role & Period */}
                    <div className="mb-4">
                      <p className="font-medium text-foreground">{exp.role}</p>
                      <p className="text-sm text-muted-foreground">
                        {exp.type} | {exp.period}
                      </p>
                    </div>

                    {/* Description */}
                    <ul className="space-y-2 mb-4">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs bg-secondary/50 hover:bg-secondary"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
