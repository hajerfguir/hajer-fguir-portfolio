"use client"

import { useEffect, useRef, useState } from "react"
import { MessageCircle, X, Send, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type Message = { role: "user" | "assistant"; content: string }

/**
 * Knowledge base derived from Hajer Fguir's resume & portfolio content.
 * Each intent has trigger keywords and a recruiter-friendly, concise answer.
 * The matcher scores intents by keyword hits and returns the best match,
 * politely redirecting anything unrelated to her professional background.
 */
const INTENTS: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["experience", "background", "work history", "career", "roles", "job", "worked", "professional"],
    answer:
      "Hajer is a Computer Engineering graduate with 4+ years of hands-on experience across 5 companies. She currently works as a Software Engineer at the University of Ottawa IT (May 2025–present), building and testing APIs in Node.js, .NET, and JavaScript. She has also been Co-Founder & Software Developer at Novasoft Vision Inc., a V&V Project Management Intern at Dana TM4, a Performance Data Analyst Intern at Canada Post, and a Teaching Assistant at the University of Ottawa.",
  },
  {
    keywords: ["cyber", "cybersecurity", "security", "ssdlc", "saml", "sso", "penetration", "secure", "wireshark", "compliance"],
    answer:
      "Cybersecurity is one of Hajer's core focuses. She applies Secure Software Development Lifecycle (SSDLC) practices, integrated the SAML2 protocol for SSO and authentication via Microsoft Azure AD, and performs functional, load, regression, and security testing with JMeter and Postman. Her toolkit also includes Wireshark, API security testing, and ensuring data-security compliance across the systems she builds.",
  },
  {
    keywords: ["skill", "tech", "stack", "technolog", "tool", "language", "framework", "programming", "expertise", "proficient"],
    answer:
      "Hajer's technical skills span several domains:\n• Languages: Python, Java, JavaScript, TypeScript, C/C++, SQL\n• Frameworks: React.js, Node.js, .NET, Flask, Django, PyTorch, OpenCV, Electron.js\n• Cloud & DevOps: Docker, Git, GitHub Actions, CI/CD, Linux, Azure AD, GCP, Grafana\n• Security & Testing: SSDLC, SAML2, SSO, Postman, JMeter, Wireshark\n• Embedded: ESP32, VHDL, FPGA, MATLAB, Simulink, Real-time OS",
  },
  {
    keywords: ["project", "portfolio", "built", "build", "drivesense", "nutricoach", "smart home", "capstone", "made"],
    answer:
      "Hajer's featured projects include:\n• DriveSense (Capstone) — a real-time driver drowsiness detection system using PyTorch, OpenCV, and a React/TypeScript UI, optimized for Jetson Nano.\n• AI-Powered NutriCoach — a nutrition chatbot built with the OpenAI GPT API, Python, and Gradio, with voice interaction via gTTS.\n• Smart Home Automation — an IoT system on ESP32 with FreeRTOS, REST APIs, and a real-time web UI.\nYou can explore more on her GitHub: github.com/hajerfguir",
  },
  {
    keywords: ["contact", "email", "reach", "hire me", "linkedin", "github", "get in touch", "connect", "message", "phone"],
    answer:
      "You can reach Hajer at hajerfguir@gmail.com, connect on LinkedIn (linkedin.com/in/hajer-fguir), or view her work on GitHub (github.com/hajerfguir). She's based in Ottawa, ON, Canada, and you can also use the contact form in the Contact section above.",
  },
  {
    keywords: ["education", "degree", "university", "study", "studied", "school", "academic", "ottawa", "graduate", "course", "gpa"],
    answer:
      "Hajer holds a BASc in Computer Engineering (Co-op) from the University of Ottawa (2021–2025), graduating Magna Cum Laude with Dean's Honour List recognition and a Merit Scholarship. Her coursework covered Cybersecurity, AI, Data Structures & Algorithms, Operating Systems, Embedded & Real-Time Systems, and Computer Architecture.",
  },
  {
    keywords: ["available", "availability", "hiring", "hire", "opportunit", "open to", "looking for", "recruit", "freelance", "full time"],
    answer:
      "Yes — Hajer is open to new opportunities. The best way to start a conversation is through the contact form above or by emailing hajerfguir@gmail.com. She typically responds within 24–48 hours.",
  },
  {
    keywords: ["ai", "machine learning", "ml", "artificial intelligence", "pytorch", "openai", "data science", "model"],
    answer:
      "Hajer has solid AI/ML experience: she built drowsiness-detection models with PyTorch and OpenCV for DriveSense, developed an OpenAI GPT-powered NutriCoach chatbot, and deployed machine-learning failure-prediction models at Canada Post that reduced downtime by 15%. She also holds certifications in AI and Machine Learning in Python.",
  },
  {
    keywords: ["devops", "ci/cd", "cicd", "pipeline", "docker", "deployment", "cloud", "azure", "automation"],
    answer:
      "Hajer is experienced in DevOps and CI/CD. She contributed to CI/CD pipeline integration with SSDLC practices at the University of Ottawa, optimized pipelines at Canada Post to improve deployment efficiency by 25%, and works with Docker, GitHub Actions, Linux, Azure AD, and Grafana.",
  },
  {
    keywords: ["about", "who is", "tell me about", "summary", "herself", "introduce", "bio"],
    answer:
      "Hajer Fguir is a Software Engineer specializing in Cybersecurity, APIs, CI/CD, and AI. A University of Ottawa Computer Engineering graduate, she's passionate about building secure, scalable software and integrating security into every phase of the development lifecycle.",
  },
  {
    keywords: ["certification", "certificate", "award", "scholarship", "honour", "honor", "recognition"],
    answer:
      "Hajer graduated Magna Cum Laude with Dean's Honour List recognition and a Merit Scholarship. She also earned certifications from 365 Data Science (Intro to AI, Machine Learning in Python, Data Engineering, Git & GitHub) and Meta via Coursera (Front-End Development, Version Control).",
  },
]

const GREETINGS = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "greetings", "yo"]
const THANKS = ["thank", "thanks", "appreciate", "cheers"]

function getResponse(rawInput: string): string {
  const input = rawInput.toLowerCase().trim()

  // Greetings
  if (GREETINGS.some((g) => input === g || input.startsWith(g + " ") || input.startsWith(g + "!"))) {
    return "Hello! I'm Hajer's portfolio assistant. You can ask me about her experience, technical skills, cybersecurity work, projects, education, or how to get in touch."
  }

  // Thanks
  if (THANKS.some((t) => input.includes(t))) {
    return "You're welcome! Feel free to ask anything else about Hajer's background, skills, projects, or how to contact her."
  }

  // Score each intent by how many of its keywords appear in the input
  let best: { score: number; answer: string } | null = null
  for (const intent of INTENTS) {
    let score = 0
    for (const kw of intent.keywords) {
      if (input.includes(kw)) score += kw.includes(" ") ? 2 : 1
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { score, answer: intent.answer }
    }
  }

  if (best) return best.answer

  // Unrelated question — politely redirect
  return "I'm Hajer's portfolio assistant, so I can only help with questions about her professional background. Try asking about her experience, technical skills, cybersecurity work, projects, education, or how to contact her."
}

const quickQuestions = [
  "What is Hajer's experience?",
  "What are her technical skills?",
  "What cybersecurity experience does she have?",
  "What projects has she worked on?",
  "How can I contact her?",
]

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Hajer's portfolio assistant. Ask me about her experience, skills, cybersecurity work, projects, education, or how to reach her.",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const sendQuestion = (question: string) => {
    const text = question.trim()
    if (!text) return

    setMessages((prev) => [...prev, { role: "user", content: text }])
    setInput("")
    setIsTyping(true)

    const reply = getResponse(text)
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [...prev, { role: "assistant", content: reply }])
    }, 550)
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-300",
          "bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer",
          "flex items-center justify-center hover:scale-105",
          isOpen && "rotate-90"
        )}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        <span className="sr-only">{isOpen ? "Close" : "Open"} AI Assistant</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 animate-fade-in">
          <div className="rounded-2xl bg-card border border-border/50 shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="p-4 bg-primary/5 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Portfolio Assistant</h3>
                  <p className="text-xs text-muted-foreground">Ask me about Hajer&apos;s work</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-3">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[85%] px-3 py-2 rounded-xl text-sm whitespace-pre-line leading-relaxed",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-secondary text-secondary-foreground px-3 py-2.5 rounded-xl">
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce" />
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && !isTyping && (
              <div className="px-4 pb-2">
                <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
                <div className="flex flex-wrap gap-1.5">
                  {quickQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => sendQuestion(q)}
                      className="px-2 py-1 text-xs rounded-md bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border/50">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  sendQuestion(input)
                }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Hajer's background..."
                  className="flex-1 bg-background text-sm"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="bg-primary hover:bg-primary/90 cursor-pointer"
                  disabled={!input.trim()}
                >
                  <Send className="w-4 h-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
