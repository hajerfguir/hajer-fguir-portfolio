"use client"

import { useState } from "react"
import { MessageCircle, X, Send, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const quickResponses = [
  { question: "What are your skills?", answer: "I specialize in Python, JavaScript, React, Node.js, cybersecurity practices, CI/CD pipelines, and AI/ML development." },
  { question: "Are you available for work?", answer: "Yes! I'm currently open to new opportunities. Feel free to reach out through the contact form or email me directly." },
  { question: "Tell me about your projects", answer: "I've worked on projects like DriveSense (driver drowsiness detection), AI-powered NutriCoach chatbot, and Smart Home Automation systems." },
]

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    { role: "assistant", content: "Hi! I'm Hajer's portfolio assistant. How can I help you learn more about her work?" }
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setInput("")

    // Simple keyword matching for demo
    setTimeout(() => {
      let response = "Thanks for your question! For more detailed information, please use the contact form or check out the sections above."
      
      const lowerInput = userMessage.toLowerCase()
      if (lowerInput.includes("skill") || lowerInput.includes("tech")) {
        response = quickResponses[0].answer
      } else if (lowerInput.includes("work") || lowerInput.includes("available") || lowerInput.includes("hire")) {
        response = quickResponses[1].answer
      } else if (lowerInput.includes("project") || lowerInput.includes("portfolio")) {
        response = quickResponses[2].answer
      } else if (lowerInput.includes("contact") || lowerInput.includes("email")) {
        response = "You can reach Hajer at hajerfguir@gmail.com or connect on LinkedIn at linkedin.com/in/hajer-fguir"
      } else if (lowerInput.includes("experience") || lowerInput.includes("background")) {
        response = "Hajer has experience at University of Ottawa IT, Dana TM4, Canada Post, and is a Co-Founder at Novasoft Vision Inc. Check out the Experience section for more details!"
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }])
    }, 500)
  }

  const handleQuickResponse = (question: string) => {
    setMessages((prev) => [...prev, { role: "user", content: question }])
    const response = quickResponses.find((r) => r.question === question)
    if (response) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "assistant", content: response.answer }])
      }, 300)
    }
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-300",
          "bg-primary hover:bg-primary/90 text-primary-foreground",
          "flex items-center justify-center",
          isOpen && "rotate-90"
        )}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        <span className="sr-only">{isOpen ? "Close" : "Open"} AI Assistant</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 animate-fade-in">
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
            <div className="h-72 overflow-y-auto p-4 space-y-3">
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
                      "max-w-[80%] px-3 py-2 rounded-xl text-sm",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Responses */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-1.5">
                  {quickResponses.map((r, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuickResponse(r.question)}
                      className="px-2 py-1 text-xs rounded-md bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                    >
                      {r.question}
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
                  handleSend()
                }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-background text-sm"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="bg-primary hover:bg-primary/90"
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
