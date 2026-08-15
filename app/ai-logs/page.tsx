import { promises as fs } from "fs"
import path from "path"
import Link from "next/link"

const logsPath = path.join(process.cwd(), "data", "ai-logs.json")

async function getLogs() {
  try {
    const content = await fs.readFile(logsPath, "utf8")
    return JSON.parse(content)
  } catch {
    return []
  }
}

export default async function AILogsPage() {
  const logs = await getLogs()

  return (
    <main className="min-h-screen bg-background p-8 text-foreground">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">AI assistant logs</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Review the questions users have asked the assistant.
            </p>
          </div>
          <Link href="/" className="text-sm text-primary hover:underline">
            Back to portfolio
          </Link>
        </div>

        {logs.length === 0 ? (
          <div className="rounded-xl border border-border/50 bg-card p-6 text-sm text-muted-foreground">
            No logs yet.
          </div>
        ) : (
          <div className="space-y-3">
            {logs.slice().reverse().map((entry: any) => (
              <div key={entry.id} className="rounded-xl border border-border/50 bg-card p-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
                  <span>{entry.locale || "unknown"}</span>
                  <span>{entry.timestamp || "—"}</span>
                </div>
                <p className="mt-3 whitespace-pre-wrap text-sm text-foreground">{entry.question}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
