"use client"

import Image from "next/image"
import Link from "next/link"
import { Building2, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/section-header"

const experiences = [
  {
    company: "University of Ottawa",
    organizationUrl: "https://www.uottawa.ca/fr",
    logo: "/images/uottawa_logo.png",
    role: "Software Developer",
    type: "Full-time",
    period: "Jan 2026 – Present",
    location: "Ottawa, ON, Canada",
    description: [
      "Performed functional, regression, load, end-to-end, and security testing for university platforms, including uoZone and Experiential Learning",
      "Developed authentication and security test scenarios for SAML2/SSO login workflows, including session handling, token validation, and high-load authentication scenarios",
      "Supported SSDLC security initiatives by improving secure testing practices, validating security requirements, and contributing to quality assurance documentation",
      "Collaborated with developers, QA analysts, and stakeholders to troubleshoot issues, validate system behavior, and improve application reliability",
    ],
    technologies: [
      "JMeter",
      "Postman",
      "Playwright",
      "Artillery",
      "Splunk",
      "API Testing",
      "Security Testing",
      "SSDLC",
    ],
  },
  {
    company: "University of Ottawa",
    organizationUrl: "https://www.uottawa.ca/fr",
    logo: "/images/uottawa_logo.png",
    role: "IT Systems Developer",
    type: "Co-op",
    period: "May 2025 – Dec 2025",
    location: "Ottawa, ON, Canada",
    description: [
      "Executed API load testing and validation activities for the Experiential Learning platform",
      "Developed automation scripts and JSON output validations to support data integrity and reliable backend integrations",
      "Developed and maintained RESTful APIs using JavaScript, Node.js, Docker, Redis, and CI/CD workflows",
      "Conducted end-to-end API validation and performance testing to support high-volume user traffic and system reliability",
    ],
    technologies: [
      "JavaScript",
      "Node.js",
      "Docker",
      "Redis",
      "REST APIs",
      "JMeter",
      "Postman",
      "CI/CD",
    ],
  },
  {
    company: "University of Ottawa — Faculty of Engineering",
    organizationUrl: "https://www.uottawa.ca/faculty-engineering/",
    logo: "/images/Engineering-uottawa.jpeg",
    role: "Teaching Assistant",
    type: "Part-time",
    period: "Jan 2025 – Dec 2025",
    location: "Ottawa, ON, Canada",
    description: [
      "Supported undergraduate students in ITI1520: Introduction to Computing I and SEG2911: Professional Software Engineering Practice through labs, feedback, and academic guidance",
      "Graded assignments and provided detailed feedback to help students improve their technical understanding and problem-solving skills",
      "Conducted lab sessions and provided one-on-one support in Python programming, software engineering concepts, and core computing fundamentals",
      "Strengthened communication, mentorship, and leadership skills by working with students from diverse technical backgrounds",
    ],
    technologies: [
      "Python",
      "Programming",
      "Software Engineering",
      "Teaching",
      "Mentorship",
      "Academic Support",
    ],
  },
  {
    company: "Novasoft Vision Incorporated",
    organizationUrl: "https://novasoftvision.com/",
    logo: "/images/novasoft Logo.png",
    role: "Co-Founder & Software Developer",
    type: "Entrepreneurship",
    period: "Dec 2024 – Dec 2025",
    location: "Laval, QC, Canada",
    description: [
      "Co-founded a technology startup focused on building software solutions and exploring innovative digital products",
      "Developed secure data-processing and validation tools using Python and AVL Concerto",
      "Defined technical requirements and contributed to full-stack development while applying secure coding practices",
      "Worked across technical, product, and entrepreneurial responsibilities, strengthening ownership, adaptability, and problem-solving skills",
    ],
    technologies: [
      "Python",
      "AVL Concerto",
      "Full-Stack Development",
      "Secure Coding",
      "Product Development",
      "Entrepreneurship",
    ],
  },
  {
    company: "Dana TM4 Incorporated",
    organizationUrl: "https://www.dana.com/",
    logo: "/images/dana_TM4.png",
    role: "Verification and Validation Project Management Intern",
    type: "Co-op",
    period: "Sep 2024 – Dec 2024",
    location: "Boucherville, QC, Canada",
    description: [
      "Supported verification and validation activities by contributing to internal tools, automation workflows, and data-driven reporting",
      "Developed Python-based solutions to support verification processes and improve access to test-related information",
      "Built internal web tools using JavaScript to standardize database outputs and improve engineering visibility",
      "Contributed to secure data workflows and authentication-related integrations, including SAML2-based SSO with Microsoft Azure AD",
    ],
    technologies: [
      "Python",
      "JavaScript",
      "SQL",
      "Automation",
      "Data Analysis",
      "SAML2",
      "Azure AD",
      "Engineering Tools",
    ],
  },
  {
    company: "Canada Post Corporation",
    organizationUrl: "https://www.canadapost-postescanada.ca/cpc/en/home.page",
    logo: "/images/canada-post-logo.png",
    role: "Performance Data Analyst Intern",
    type: "Co-op",
    period: "Jan 2024 – Apr 2024",
    location: "Ottawa, ON, Canada",
    description: [
      "Built Python-based automation scripts and data analysis workflows to support operational performance monitoring",
      "Worked with Power BI and internal databases to transform technical and operational data into useful insights",
      "Supported KPI analysis, reporting improvements, and data-driven decision-making in an enterprise environment",
      "Gained experience working with business stakeholders, technical systems, and large-scale operational data",
    ],
    technologies: [
      "Python",
      "Power BI",
      "Data Analysis",
      "Automation",
      "Reporting",
      "KPI Analysis",
    ],
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
                <div
                  className={`md:w-1/2 pl-8 md:pl-0 ${
                    index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  }`}
                >
                  <div className="group p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <Link
                          href={exp.organizationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${exp.company} website`}
                          className="w-12 h-12 rounded-lg bg-white flex items-center justify-center flex-shrink-0 overflow-hidden border border-border/40 hover:border-primary/40 hover:scale-105 transition-all duration-300"
                        >
                          {exp.logo ? (
                            <Image
                              src={exp.logo}
                              alt={`${exp.company} logo`}
                              width={40}
                              height={40}
                              className="max-h-9 max-w-9 object-contain"
                            />
                          ) : (
                            <Building2 className="w-5 h-5 text-primary" />
                          )}
                        </Link>

                        <div>
                          <Link
                            href={exp.organizationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/link inline-flex items-center gap-1 font-semibold text-foreground hover:text-primary transition-colors"
                          >
                            {exp.company}
                            <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                          </Link>

                          <p className="text-sm text-muted-foreground">
                            {exp.location}
                          </p>
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
                        <li
                          key={i}
                          className="text-sm text-muted-foreground flex gap-2"
                        >
                          <span className="text-primary mt-1.5 flex-shrink-0">
                            •
                          </span>
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