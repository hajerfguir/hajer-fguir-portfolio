import { promises as fs } from "fs"
import path from "path"
import { NextResponse } from "next/server"

const logsPath = path.join(process.cwd(), "data", "ai-logs.json")

async function ensureLogFile() {
  await fs.mkdir(path.dirname(logsPath), { recursive: true })

  try {
    await fs.access(logsPath)
  } catch {
    await fs.writeFile(logsPath, "[]", "utf8")
  }
}

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    await ensureLogFile()
    const content = await fs.readFile(logsPath, "utf8")
    return NextResponse.json(JSON.parse(content))
  } catch (error) {
    console.error("AI log read error:", error)
    return NextResponse.json([], { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const question = typeof body?.question === "string" ? body.question.trim() : ""

    if (!question) {
      return NextResponse.json({ error: "Question is required." }, { status: 400 })
    }

    await ensureLogFile()

    const content = await fs.readFile(logsPath, "utf8")
    const logs = JSON.parse(content)

    const entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      question,
      timestamp: body?.timestamp || new Date().toISOString(),
      locale: body?.locale || "unknown",
    }

    const nextLogs = [...logs, entry]

    await fs.writeFile(logsPath, JSON.stringify(nextLogs, null, 2), "utf8")

    return NextResponse.json({ success: true, count: nextLogs.length })
  } catch (error) {
    console.error("AI log write error:", error)
    return NextResponse.json({ error: "Unable to save the AI log entry." }, { status: 500 })
  }
}
