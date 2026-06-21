"use client"

import { useEffect, useRef, useState } from "react"
import { MessageCircle, X, Send, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type Message = {
  role: "user" | "assistant"
  content: string
}

const INTENTS: { keywords: string[]; answer: string }[] = [
  {
    keywords: [
      "experience",
      "background",
      "work history",
      "career",
      "roles",
      "job",
      "worked",
      "professional",
      "years",
      "organizations",
    ],
    answer:
      "Hajer is a Computer Engineering graduate and Software Developer with 3+ years of hands-on experience across 5+ organizations. Her journey includes university IT, private industry, entrepreneurship, government-related work, performance/data analysis, teaching, QA, API testing, and secure software development. She currently works at the University of Ottawa IT, where she contributes to software development, API testing, QA, performance testing, and SSDLC/security-related initiatives.",
  },
  {
    keywords: [
      "cyber",
      "cybersecurity",
      "security",
      "ssdlc",
      "saml",
      "sso",
      "penetration",
      "secure",
      "wireshark",
      "compliance",
      "authentication",
      "authorization",
    ],
    answer:
      "Cybersecurity is one of Hajer's main areas of interest. She works with secure development practices, SSDLC activities, API security considerations, authentication and authorization testing, SSO/SAML concepts, and security-aware QA. She is especially interested in building systems that are not only functional, but secure, thoughtful, and reliable.",
  },
  {
    keywords: [
      "skill",
      "tech",
      "stack",
      "technolog",
      "tool",
      "language",
      "framework",
      "programming",
      "expertise",
      "proficient",
    ],
    answer:
      "Hajer's technical skills include:\n• Languages: Python, Java, JavaScript, TypeScript, C/C++, SQL\n• Web & Software: React, Next.js, Node.js, .NET, REST APIs\n• QA & Testing: Postman, JMeter, API testing, performance testing, regression testing\n• DevOps: Git, GitHub, GitLab, CI/CD, Docker, Linux\n• Security: SSDLC, API security, authentication, authorization, SSO/SAML concepts\n• AI/ML: OpenAI, PyTorch, OpenCV, intelligent automation",
  },
  {
    keywords: [
      "project",
      "portfolio",
      "built",
      "build",
      "drivesense",
      "nutricoach",
      "smart home",
      "capstone",
      "made",
      "projects",
    ],
    answer:
      "Hajer has worked on 10+ projects across software development, cybersecurity, AI, automation, and web technologies. Some highlighted projects include:\n• DriveSense — a driver drowsiness detection system using PyTorch, OpenCV, and React/TypeScript.\n• AI-Powered NutriCoach — a chatbot experience using AI to support nutrition guidance.\n• Smart Home Automation — an IoT-based automation project using ESP32 and web technologies.\n• Personal Portfolio Website — a modern portfolio built with Next.js, TypeScript, Tailwind CSS, GitHub, and Vercel.",
  },
  {
    keywords: [
      "contact",
      "email",
      "reach",
      "hire me",
      "linkedin",
      "github",
      "get in touch",
      "connect",
      "message",
      "phone",
    ],
    answer:
      "You can reach Hajer through her portfolio contact form, email her at hajerfguir@gmail.com, connect with her on LinkedIn at linkedin.com/in/hajer-fguir, or view her work on GitHub at github.com/hajerfguir.",
  },
  {
    keywords: [
      "education",
      "degree",
      "university",
      "study",
      "studied",
      "school",
      "academic",
      "ottawa",
      "graduate",
      "course",
      "gpa",
      "computer engineering",
    ],
    answer:
      "Hajer holds a BASc in Computer Engineering from the University of Ottawa. Her academic background includes cybersecurity, artificial intelligence, data structures and algorithms, operating systems, embedded systems, computer architecture, and software engineering.",
  },
  {
    keywords: [
      "available",
      "availability",
      "hiring",
      "hire",
      "opportunit",
      "open to",
      "looking for",
      "recruit",
      "freelance",
      "full time",
    ],
    answer:
      "Hajer is open to meaningful opportunities in software development, cybersecurity, QA automation, API testing, AI, and secure software engineering. The best way to reach her is through the contact form on this portfolio or by email at hajerfguir@gmail.com.",
  },
  {
    keywords: [
      "ai",
      "machine learning",
      "ml",
      "artificial intelligence",
      "pytorch",
      "openai",
      "data science",
      "model",
      "automation",
    ],
    answer:
      "Hajer is interested in the intersection of AI, automation, and secure software. Her experience includes AI-powered projects, PyTorch/OpenCV work, chatbot-style applications, and exploring how AI can improve development, testing, and user experiences.",
  },
  {
    keywords: [
      "devops",
      "ci/cd",
      "cicd",
      "pipeline",
      "docker",
      "deployment",
      "cloud",
      "azure",
      "automation",
      "gitlab",
      "github",
    ],
    answer:
      "Hajer has experience with DevOps and automation concepts, including Git, GitHub, GitLab, CI/CD workflows, Docker, Linux, deployment practices, and testing automation. She is especially interested in how DevOps and SSDLC practices can make software delivery more secure and reliable.",
  },
  {
    keywords: [
      "about",
      "who is",
      "tell me about",
      "summary",
      "herself",
      "introduce",
      "bio",
    ],
    answer:
      "Hajer Fguir is a Software Developer and Computer Engineering graduate passionate about cybersecurity, AI, automation, and community-driven impact. She enjoys turning ideas into secure, scalable, and intelligent digital experiences.",
  },
  {
    keywords: [
      "community",
      "volunteer",
      "involvement",
      "impact",
      "people",
      "teaching",
      "mentorship",
      "organizations",
    ],
    answer:
      "Community involvement is an important part of Hajer's journey. Her experience spans 5+ organizations and includes teaching, mentoring, entrepreneurship, university IT, and building technology with real-world impact. She values work that supports people, communities, and meaningful innovation.",
  },
  {
    keywords: [
      "certification",
      "certificate",
      "award",
      "scholarship",
      "honour",
      "honor",
      "recognition",
      "dean",
    ],
    answer:
      "Hajer has academic recognition and technical certifications related to software development, AI, machine learning, Git/GitHub, and front-end development. She is continuously learning and expanding her skills in cybersecurity, AI, and secure software engineering.",
  },
]

const GREETINGS = [
  "hi",
  "hello",
  "hey",
  "good morning",
  "good afternoon",
  "good evening",
  "greetings",
  "yo",
]

const THANKS = ["thank", "thanks", "appreciate", "cheers"]

const quickQuestions = [
  "What is Hajer's experience?",
  "What are her technical skills?",
  "What cybersecurity experience does she have?",
  "What projects has she worked on?",
  "How can I contact her?",
]

function getResponse(rawInput: string): string {
  const input = rawInput.toLowerCase().trim()

  if (
    GREETINGS.some(
      (g) =>
        input === g ||
        input.startsWith(g + " ") ||
        input.startsWith(g + "!")
    )
  ) {
    return "Hello! I'm Hajer's AI Portfolio Assistant. You can ask me about her experience, technical skills, cybersecurity work, projects, education, community involvement, or how to get in touch."
  }

  if (THANKS.some((t) => input.includes(t))) {
    return "You're welcome! Feel free to ask anything else about Hajer's background, skills, projects, cybersecurity work, community involvement, or how to contact her."
  }

  let best: { score: number; answer: string } | null = null

  for (const intent of INTENTS) {
    let score = 0

    for (const kw of intent.keywords) {
      if (input.includes(kw)) {
        score += kw.includes(" ") ? 2 : 1
      }
    }

    if (score > 0 && (!best || score > best.score)) {
      best = { score, answer: intent.answer }
    }
  }

  if (best) return best.answer

  return "I'm Hajer's AI Portfolio Assistant, so I can help with questions about her professional background. Try asking about her experience, technical skills, cybersecurity work, projects, education, community involvement, or how to contact her."
}

function hasCookieConsentAccepted() {
  if (typeof window === "undefined") return false

  const possibleKeys = [
    "cookie-consent",
    "cookieConsent",
    "cookiesAccepted",
    "cookie-preferences",
    "cookie_preferences",
  ]

  for (const key of possibleKeys) {
    const value = localStorage.getItem(key)

    if (
      value === "accepted" ||
      value === "true" ||
      value === "yes" ||
      value === "all"
    ) {
      return true
    }
  }

  if (
    document.cookie.includes("cookie-consent=accepted") ||
    document.cookie.includes("cookieConsent=true") ||
    document.cookie.includes("cookiesAccepted=true")
  ) {
    return true
  }

  return false
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [showIntro, setShowIntro] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Hajer's AI Portfolio Assistant. Ask me about her experience, skills, cybersecurity work, projects, education, community involvement, or how to reach her.",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem("hajer-ai-intro-seen")

    if (hasSeenIntro === "true") return

    const checkConsent = setInterval(() => {
      if (hasCookieConsentAccepted()) {
        clearInterval(checkConsent)

        setTimeout(() => {
          setShowIntro(true)
        }, 1200)
      }
    }, 1000)

    return () => clearInterval(checkConsent)
  }, [])

  const openAssistant = () => {
    setShowIntro(false)
    localStorage.setItem("hajer-ai-intro-seen", "true")
    setIsOpen(true)
  }

  const closeIntro = () => {
    setShowIntro(false)
    localStorage.setItem("hajer-ai-intro-seen", "true")
  }

  const toggleAssistant = () => {
    setShowIntro(false)
    localStorage.setItem("hajer-ai-intro-seen", "true")
    setIsOpen((prev) => !prev)
  }

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
      {showIntro && !isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-[calc(100vw-3rem)] sm:w-80 animate-fade-in">
          <div className="relative rounded-2xl bg-card border border-border/50 shadow-2xl p-4">
            <button
              onClick={closeIntro}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
              aria-label="Close AI intro"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-3 pr-5">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 text-primary" />
              </div>

              <div>
                <h3 className="font-semibold text-foreground">
                  AI Portfolio Assistant
                </h3>

                <p className="text-sm text-muted-foreground mt-1">
                  Hi! I can answer questions about Hajer&apos;s experience,
                  projects, technical skills, cybersecurity work, community
                  involvement, and contact details.
                </p>

                <button
                  onClick={openAssistant}
                  className="mt-3 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors"
                >
                  Ask me anything
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={toggleAssistant}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-300",
          "bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer",
          "flex items-center justify-center hover:scale-105",
          isOpen && "rotate-90"
        )}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
        <span className="sr-only">
          {isOpen ? "Close" : "Open"} AI Portfolio Assistant
        </span>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 animate-fade-in">
          <div className="rounded-2xl bg-card border border-border/50 shadow-2xl overflow-hidden">
            <div className="p-4 bg-primary/5 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>

                <div>
                  <h3 className="font-semibold text-foreground">
                    AI Portfolio Assistant
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Ask me about Hajer&apos;s work
                  </p>
                </div>
              </div>
            </div>

            <div className="h-80 overflow-y-auto p-4 space-y-3">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
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

            {messages.length === 1 && !isTyping && (
              <div className="px-4 pb-2">
                <p className="text-xs text-muted-foreground mb-2">
                  Try asking:
                </p>
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