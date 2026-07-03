"use client"

import { useEffect, useMemo, useState } from "react"
import { Gamepad2, RotateCcw, Sparkles, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/components/language-provider"
import { cn } from "@/lib/utils"

type Player = "X" | "O"
type Square = Player | null

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const

function calculateWinner(squares: Square[]) {
  for (const [a, b, c] of WINNING_LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }

  return null
}

function getComputerMove(squares: Square[]) {
  for (const [a, b, c] of WINNING_LINES) {
    const values = [squares[a], squares[b], squares[c]]
    if (values.filter(Boolean).length === 2 && values.filter((value) => value === "O").length === 2) {
      const emptyIndex = [a, b, c].find((index) => squares[index] === null)
      if (emptyIndex !== undefined) return emptyIndex
    }
  }

  for (const [a, b, c] of WINNING_LINES) {
    const values = [squares[a], squares[b], squares[c]]
    if (values.filter(Boolean).length === 2 && values.filter((value) => value === "X").length === 2) {
      const emptyIndex = [a, b, c].find((index) => squares[index] === null)
      if (emptyIndex !== undefined) return emptyIndex
    }
  }

  const priorities = [4, 0, 2, 6, 8, 1, 3, 5, 7]
  for (const index of priorities) {
    if (squares[index] === null) return index
  }

  return -1
}

export function FunGameSection() {
  const { t } = useTranslation()
  const [squares, setSquares] = useState<Square[]>(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  const winner = useMemo(() => calculateWinner(squares), [squares])
  const isDraw = !winner && squares.every(Boolean)
  const currentPlayer: Player = xIsNext ? "X" : "O"

  useEffect(() => {
    if (xIsNext || winner || isDraw) return

    const timeout = window.setTimeout(() => {
      const move = getComputerMove(squares)
      if (move === -1) return

      const nextSquares = [...squares]
      nextSquares[move] = "O"
      setSquares(nextSquares)
      setXIsNext(true)
    }, 450)

    return () => window.clearTimeout(timeout)
  }, [xIsNext, winner, isDraw, squares])

  const handleCellClick = (index: number) => {
    if (squares[index] || winner || isDraw) return

    const nextSquares = [...squares]
    nextSquares[index] = currentPlayer
    setSquares(nextSquares)
    setXIsNext((prev) => !prev)
  }

  const resetGame = () => {
    setSquares(Array(9).fill(null))
    setXIsNext(true)
  }

  const status = winner
    ? winner === "X"
      ? t("game.status.xWins")
      : t("game.status.oWins")
    : isDraw
      ? t("game.status.draw")
      : currentPlayer === "X"
        ? t("game.status.xTurn")
        : t("game.status.computerTurn")

  return (
    <section id="game" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">
              <Gamepad2 className="h-4 w-4" />
              <span>{t("game.label")}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
              {t("game.title")}
            </h2>

            <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
              {t("game.description")}
            </p>

            <div className="flex flex-wrap gap-3">
              <div className="rounded-full border border-border/60 bg-card px-3 py-1.5 text-sm text-muted-foreground">
                {t("game.hint")}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border/50 bg-card p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {t("game.statusLabel")}
                </p>
                <p className="mt-1 text-base font-medium text-foreground">{status}</p>
              </div>
              <div className="rounded-full bg-primary/10 p-2 text-primary">
                {winner ? <Trophy className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {squares.map((square, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleCellClick(index)}
                  className={cn(
                    "flex aspect-square items-center justify-center rounded-xl border border-border/60 bg-background text-3xl font-semibold transition-colors hover:border-primary/40 hover:bg-secondary/40",
                    square ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {square}
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">{t("game.footer")}</p>
              <Button type="button" variant="outline" onClick={resetGame} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                {t("game.reset")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
