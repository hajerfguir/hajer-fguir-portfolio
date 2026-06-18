"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Mail,
  Linkedin,
  Github,
  MapPin,
  Send,
  CheckCircle,
  Clock,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { SectionHeader } from "@/components/section-header"

export function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      )
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      console.error(error)
      setErrorMessage(
        "Sorry, something went wrong. Please try again or email me directly."
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <section id="contact" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          label="Get In Touch"
          title="Let's Start a Conversation"
          subtitle="Have a project in mind or want to discuss opportunities? I'd love to hear from you."
          centered={true}
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Message Preview Panel - macOS style */}
          <div className="order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-card">
              {/* Window Chrome */}
              <div className="bg-secondary/80 dark:bg-secondary/50 px-4 py-3 flex items-center gap-3 border-b border-border/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>

                <div className="flex-1 text-center">
                  <span className="text-sm font-medium text-foreground/80">
                    New Message
                  </span>
                </div>

                <Mail className="w-4 h-4 text-muted-foreground" />
              </div>

              {/* Email Header */}
              <div className="p-5 space-y-3 border-b border-border/30 bg-card">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground w-14">
                    To:
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    hajerfguir@gmail.com
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground w-14">
                    From:
                  </span>
                  <span className="text-sm text-foreground/70 italic">
                    {formData.email || "your@email.com"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground w-14">
                    Subject:
                  </span>
                  <span className="text-sm text-foreground/70 italic">
                    {formData.subject || "New Collaboration Inquiry"}
                  </span>
                </div>
              </div>

              {/* Email Body */}
              <div className="p-6 min-h-[280px] bg-background/50">
                <div className="space-y-4 text-foreground/80">
                  <p>
                    Hi, my name is{" "}
                    <span className="font-medium text-primary italic">
                      {formData.name || "[your name]"}
                    </span>
                    .
                  </p>

                  <p>I&apos;m interested in working with you on a project.</p>

                  <div className="min-h-[80px] py-2">
                    {formData.message ? (
                      <p className="whitespace-pre-wrap">{formData.message}</p>
                    ) : (
                      <p className="text-muted-foreground/50 italic">
                        [Your project details will appear here...]
                      </p>
                    )}
                  </div>

                  <div className="pt-4 space-y-1">
                    <p>Best regards,</p>
                    <p className="font-medium italic text-primary">
                      {formData.name || "[your name]"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Bar */}
              <div className="px-5 py-3 bg-secondary/30 dark:bg-secondary/20 border-t border-border/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-xs text-muted-foreground">Draft</span>
                </div>

                <span className="text-xs text-muted-foreground">
                  {formData.message.length > 0
                    ? `${formData.message.length}`
                    : "0"}{" "}
                  characters
                </span>
              </div>
            </div>

            {/* Contact Info Cards */}
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <Link
                href="https://www.linkedin.com/in/hajer-fguir/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0077b5]/10 flex items-center justify-center group-hover:bg-[#0077b5]/20 transition-colors">
                  <Linkedin className="w-5 h-5 text-[#0077b5]" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">LinkedIn</p>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    /hajer-fguir
                  </p>
                </div>
              </Link>

              <Link
                href="https://github.com/hajerfguir"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center group-hover:bg-foreground/10 transition-colors">
                  <Github className="w-5 h-5 text-foreground" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">GitHub</p>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    /hajerfguir
                  </p>
                </div>
              </Link>

              <Link
                href="mailto:hajerfguir@gmail.com"
                className="group flex items-center gap-3 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    hajerfguir@gmail.com
                  </p>
                </div>
              </Link>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border/50">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-emerald-500" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-medium text-foreground">
                    Ottawa, ON, Canada
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="order-1 lg:order-2">
            <div className="p-8 sm:p-10 rounded-2xl bg-card border border-border/50 shadow-xl">
              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                    <div className="relative w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-primary" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold text-foreground">
                      Message Sent!
                    </h3>
                    <p className="text-muted-foreground max-w-sm">
                      Thank you for reaching out. I&apos;ll review your message
                      and get back to you soon.
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsSubmitted(false)
                      setErrorMessage("")
                      setFormData({
                        name: "",
                        email: "",
                        subject: "",
                        message: "",
                      })
                    }}
                    className="mt-4"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Send Me a Message
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Fill out the form and I&apos;ll get back to you within 24
                      hours.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">
                          Your Name <span className="text-primary">*</span>
                        </Label>

                        <div className="relative">
                          <Input
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className="bg-background/50 border-border/50 focus:border-primary/50 pl-10 h-12"
                          />
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email Address <span className="text-primary">*</span>
                        </Label>

                        <div className="relative">
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="bg-background/50 border-border/50 focus:border-primary/50 pl-10 h-12"
                          />
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Project Collaboration"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="bg-background/50 border-border/50 focus:border-primary/50 h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium">
                        Tell Me About Your Project{" "}
                        <span className="text-primary">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="I'm looking for help with..."
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        className="bg-background/50 border-border/50 focus:border-primary/50 resize-none"
                      />
                    </div>

                    {errorMessage && (
                      <p className="text-sm text-red-500">{errorMessage}</p>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>

                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>I typically respond within 24–48 hours</span>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}