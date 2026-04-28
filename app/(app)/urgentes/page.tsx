"use client"

import { useState } from "react"
import { AlertTriangle, CheckCheck, Clock, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { urgentNotices, UrgentNotice, formatDate, formatTime } from "@/lib/mock-data"
import { useAuth } from "@/contexts/auth-context"

export default function UrgentesPage() {
  const { user } = useAuth()
  const [items, setItems] = useState<UrgentNotice[]>(urgentNotices)

  const pending = items.filter((u) => !u.acknowledged)
  const acknowledged = items.filter((u) => u.acknowledged)

  const acknowledge = (id: string) => {
    setItems((prev) =>
      prev.map((u) => (u.id === id ? { ...u, acknowledged: true } : u))
    )
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-red-500" />
          Comunicados Urgentes
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {pending.length} comunicado{pending.length !== 1 ? "s" : ""} aguardando confirmação
        </p>
      </div>

      {/* Pending */}
      {pending.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-red-600 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block" aria-hidden="true" />
            Pendentes — ação necessária
          </h2>
          {pending.map((item) => (
            <div
              key={item.id}
              role="alert"
              aria-live="polite"
              className="rounded-xl border-2 border-red-300 bg-red-50 dark:bg-red-950/20 dark:border-red-800 overflow-hidden shadow-sm"
            >
              {/* Red banner top */}
              <div className="bg-red-600 px-4 py-2.5 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-white shrink-0" />
                <span className="text-sm font-semibold text-white">Comunicado urgente</span>
                <Badge className="ml-auto bg-white/20 text-white border-white/30 text-xs">
                  Ação necessária
                </Badge>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <h3 className="text-base font-bold text-red-900 dark:text-red-200 text-balance leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-red-800 dark:text-red-300 mt-2 leading-relaxed">
                    {item.content}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs text-red-700 dark:text-red-400 flex-wrap">
                  <span className="flex items-center gap-1">
                    <span className="font-medium">Emitido por:</span> {item.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {formatDate(item.date)} às {formatTime(item.date)}
                  </span>
                </div>

                <div className="border-t border-red-200 dark:border-red-800 pt-4">
                  <Button
                    className="w-full gap-2 bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => acknowledge(item.id)}
                  >
                    <CheckCheck className="w-4 h-4" />
                    Li e estou ciente — {user.name.split(" ").slice(0, 2).join(" ")}
                  </Button>
                  <p className="text-xs text-red-600/70 text-center mt-2">
                    Ao confirmar, seu nome e horário serão registrados.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {pending.length === 0 && (
        <Card className="shadow-sm border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20 dark:border-emerald-900">
          <CardContent className="py-10 text-center">
            <ShieldCheck className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
            <p className="text-base font-semibold text-emerald-800 dark:text-emerald-300">
              Tudo em dia!
            </p>
            <p className="text-sm text-emerald-700/80 dark:text-emerald-400 mt-1">
              Nenhum comunicado urgente pendente.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Acknowledged */}
      {acknowledged.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <CheckCheck className="w-4 h-4 text-emerald-500" />
            Confirmados
          </h2>
          {acknowledged.map((item) => (
            <Card key={item.id} className="shadow-sm opacity-75">
              <CardHeader className="pb-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCheck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground text-balance leading-snug">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-3 mt-1 flex-wrap text-xs text-muted-foreground">
                      <span>{item.author}</span>
                      <span className="text-muted-foreground/40">·</span>
                      <span>{formatDate(item.date)}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs border-emerald-200 bg-emerald-50 text-emerald-700 shrink-0">
                    Ciente
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {item.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>
      )}
    </div>
  )
}
