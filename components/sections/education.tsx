"use client"

import { GraduationCap, Award, BookOpen, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const certifications = [
  {
    title: "Intro to AI - Machine Learning in Python - Intro to Data Engineering - Git and GitHub",
    issuer: "365 Data Science",
    date: "Sep 2024 - Nov 2024",
  },
  {
    title: "Introduction to Front-End Development - Version Control",
    issuer: "Meta (Coursera)",
    date: "Aug 2023",
  },
]

const relevantCourses = [
  "Software Concepts",
  "Data Structures and Algorithms",
  "OOP in Python and Java",
  "Operating Systems",
  "Embedded & Real-Time Systems",
  "Digital Systems",
  "Data Communications and Networking",
  "Fundamentals of Cybersecurity",
  "Artificial Intelligence",
  "Computer Architecture",
]

export function EducationSection() {
  return (
    <section id="education" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-4 mb-16">
          <p className="text-primary font-medium tracking-wide uppercase text-sm">
            Education
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-balance">
            Academic background
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Main Education */}
          <div className="space-y-8">
            {/* University Card */}
            <div className="p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">University of Ottawa</h3>
                  <p className="text-muted-foreground">BASc Computer Engineering, Co-op</p>
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Sep 2021 - Dec 2025</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Ottawa, ON, Canada</p>
                </div>
              </div>

              {/* Awards */}
              <div className="space-y-3 mb-6">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" />
                  Scholarships & Awards
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
                    Magna Cum Laude
                  </Badge>
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
                    Dean&apos;s Honour List
                  </Badge>
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
                    Merit Scholarship
                  </Badge>
                </div>
              </div>

              {/* Relevant Courses */}
              <div>
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-primary" />
                  Relevant Coursework
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {relevantCourses.map((course) => (
                    <span
                      key={course}
                      className="px-2.5 py-1 text-xs rounded-md bg-secondary/50 text-muted-foreground"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Certifications</h3>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">{cert.title}</h4>
                      <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                      <p className="text-xs text-muted-foreground mt-1">{cert.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info Card */}
            <div className="p-6 rounded-xl bg-primary/5 border border-primary/10">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Continuously expanding my knowledge through online courses and certifications 
                in emerging technologies, with a focus on AI, machine learning, and modern 
                development practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
