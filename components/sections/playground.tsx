"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Brain, Sparkles, RotateCcw, CheckCircle, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Pattern Recognition Challenge
const PATTERNS = [
  {
    sequence: [2, 4, 8, 16, "?"],
    answer: 32,
    hint: "Each number is doubled",
    explanation: "Geometric progression: multiply by 2",
  },
  {
    sequence: [1, 1, 2, 3, 5, "?"],
    answer: 8,
    hint: "Sum of the two preceding numbers",
    explanation: "Fibonacci sequence",
  },
  {
    sequence: [3, 6, 11, 18, "?"],
    answer: 27,
    hint: "The difference increases by 2 each time",
    explanation: "Differences: +3, +5, +7, +9",
  },
  {
    sequence: [1, 4, 9, 16, "?"],
    answer: 25,
    hint: "Perfect squares",
    explanation: "Square numbers: 1², 2², 3², 4², 5²",
  },
  {
    sequence: [2, 6, 12, 20, "?"],
    answer: 30,
    hint: "n × (n + 1)",
    explanation: "Product of consecutive numbers",
  },
]

export function PlaygroundSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentPattern, setCurrentPattern] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [solved, setSolved] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const pattern = PATTERNS[currentPattern]

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / 25
    const y = (e.clientY - rect.top - rect.height / 2) / 25
    setMousePosition({ x, y })
  }, [])

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    card.addEventListener("mousemove", handleMouseMove)
    return () => card.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const answer = parseInt(userAnswer)
    if (answer === pattern.answer) {
      setIsCorrect(true)
      setSolved((prev) => prev + 1)
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 600)
    } else {
      setIsCorrect(false)
    }
  }

  const nextChallenge = () => {
    setCurrentPattern((prev) => (prev + 1) % PATTERNS.length)
    setUserAnswer("")
    setIsCorrect(null)
    setShowHint(false)
  }

  const resetGame = () => {
    setCurrentPattern(0)
    setUserAnswer("")
    setIsCorrect(null)
    setShowHint(false)
    setSolved(0)
  }

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Header - Centered, Premium */}
        <div className="text-center space-y-4 mb-16">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-primary/50" />
            <p className="text-primary font-semibold tracking-widest uppercase text-xs sm:text-sm">
              Logic Playground
            </p>
            <span className="h-px w-8 bg-primary/50" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Engineers love solving problems
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Want to try one? Test your pattern recognition skills.
          </p>
        </div>

        {/* 3D Interactive Card */}
        <div className="flex justify-center">
          <div
            ref={cardRef}
            className="relative w-full max-w-xl perspective-1000"
            style={{
              transform: `rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`,
              transition: "transform 0.1s ease-out",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Glow effect */}
            <div
              className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-2xl opacity-50"
              style={{
                transform: "translateZ(-20px)",
              }}
            />

            {/* Main Card */}
            <div
              className={cn(
                "relative p-8 sm:p-10 rounded-2xl bg-card border border-border/50 shadow-2xl",
                "backdrop-blur-sm transition-all duration-300",
                isAnimating && "scale-[1.02] shadow-primary/20"
              )}
              style={{
                transform: "translateZ(20px)",
              }}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Challenge</p>
                    <p className="font-semibold text-foreground">
                      {currentPattern + 1} of {PATTERNS.length}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    {solved} solved
                  </span>
                </div>
              </div>

              {/* Pattern Display */}
              <div className="mb-8">
                <p className="text-sm text-muted-foreground mb-4 text-center">
                  Find the next number in the sequence:
                </p>
                <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
                  {pattern.sequence.map((num, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-xl font-bold transition-all duration-300",
                        num === "?"
                          ? "bg-primary/20 text-primary border-2 border-dashed border-primary/50"
                          : "bg-secondary/50 text-foreground border border-border/50"
                      )}
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </div>

              {/* Input Form */}
              {isCorrect ? (
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-2 text-emerald-500">
                    <CheckCircle className="w-6 h-6" />
                    <span className="font-semibold text-lg">Correct!</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {pattern.explanation}
                  </p>
                  <Button onClick={nextChallenge} className="mt-4">
                    Next Challenge
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex gap-3">
                    <input
                      type="number"
                      value={userAnswer}
                      onChange={(e) => {
                        setUserAnswer(e.target.value)
                        setIsCorrect(null)
                      }}
                      placeholder="Your answer"
                      className={cn(
                        "flex-1 h-12 px-4 rounded-xl bg-background/50 border text-center text-lg font-medium",
                        "focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all",
                        isCorrect === false
                          ? "border-red-500/50 bg-red-500/5"
                          : "border-border/50"
                      )}
                    />
                    <Button type="submit" className="h-12 px-6">
                      Check
                    </Button>
                  </div>

                  {isCorrect === false && (
                    <p className="text-sm text-red-500 text-center">
                      Not quite right. Try again!
                    </p>
                  )}

                  {/* Hint Toggle */}
                  <div className="flex items-center justify-center gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowHint(!showHint)}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Lightbulb className="w-4 h-4" />
                      {showHint ? "Hide hint" : "Need a hint?"}
                    </button>
                    <button
                      type="button"
                      onClick={resetGame}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reset
                    </button>
                  </div>

                  {showHint && (
                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 text-center">
                      <p className="text-sm text-muted-foreground">
                        <span className="text-primary font-medium">Hint:</span>{" "}
                        {pattern.hint}
                      </p>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Floating text */}
        <p className="text-center text-sm text-muted-foreground mt-12">
          Interact with HF&apos;s logic environment
        </p>
      </div>
    </section>
  )
}
