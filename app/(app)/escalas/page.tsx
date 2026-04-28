"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Clock, Download, LayoutList, LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { shifts, shiftClass, shiftLabel, ShiftType } from "@/lib/mock-data"

const DAYS_PT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
const MONTHS_PT = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
]

function getWeekDays(baseDate: Date): Date[] {
  const start = new Date(baseDate)
  const day = start.getDay()
  start.setDate(start.getDate() - day)
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    return d
  })
}

function fmt(d: Date): string {
  return d.toISOString().split("T")[0]
}

const SHIFT_LEGEND: { type: ShiftType; label: string }[] = [
  { type: "diurno", label: "Diurno" },
  { type: "noturno", label: "Noturno" },
  { type: "sobreaviso", label: "Sobreaviso" },
]

export default function EscalasPage() {
  const [baseDate, setBaseDate] = useState(new Date())
  const [view, setView] = useState<"week" | "list">("week")
  const weekDays = getWeekDays(baseDate)
  const today = fmt(new Date())

  const prevWeek = () => {
    const d = new Date(baseDate)
    d.setDate(d.getDate() - 7)
    setBaseDate(d)
  }
  const nextWeek = () => {
    const d = new Date(baseDate)
    d.setDate(d.getDate() + 7)
    setBaseDate(d)
  }
  const goToday = () => setBaseDate(new Date())

  const shiftsForDate = (dateStr: string) => shifts.filter((s) => s.date === dateStr)

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Escalas de Plantão</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {MONTHS_PT[baseDate.getMonth()]} {baseDate.getFullYear()}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Legend */}
          <div className="hidden lg:flex items-center gap-2">
            {SHIFT_LEGEND.map(({ type, label }) => (
              <Badge key={type} variant="outline" className={`text-xs ${shiftClass[type]}`}>
                {label}
              </Badge>
            ))}
          </div>

          <Button variant="outline" size="sm" onClick={goToday} className="h-9">
            Hoje
          </Button>

          {/* View toggle */}
          <div className="flex border border-border rounded-lg overflow-hidden h-9">
            <button
              onClick={() => setView("week")}
              className={`px-3 flex items-center gap-1.5 text-sm transition-colors ${view === "week" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
              aria-label="Visão semanal"
              aria-pressed={view === "week"}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Semana</span>
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-3 flex items-center gap-1.5 text-sm transition-colors ${view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
              aria-label="Visão em lista"
              aria-pressed={view === "list"}
            >
              <LayoutList className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lista</span>
            </button>
          </div>

          <Button variant="outline" size="sm" className="gap-1.5 h-9">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Exportar</span>
          </Button>
        </div>
      </div>

      {/* Week navigation */}
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={prevWeek} aria-label="Semana anterior">
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <span className="text-sm text-muted-foreground flex-1 text-center">
          {weekDays[0].toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })} –{" "}
          {weekDays[6].toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
        </span>
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={nextWeek} aria-label="Próxima semana">
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {view === "week" ? (
        /* Weekly grid */
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {weekDays.map((day) => {
            const dateStr = fmt(day)
            const dayShifts = shiftsForDate(dateStr)
            const isToday = dateStr === today
            return (
              <div
                key={dateStr}
                className={`rounded-xl border p-3 min-h-[200px] space-y-2 transition-colors ${
                  isToday
                    ? "border-primary/40 bg-primary/5"
                    : "border-border bg-card"
                }`}
              >
                <div className="text-center">
                  <p className={`text-xs font-medium uppercase tracking-wide ${isToday ? "text-primary" : "text-muted-foreground"}`}>
                    {DAYS_PT[day.getDay()]}
                  </p>
                  <p className={`text-xl font-bold mt-0.5 ${isToday ? "text-primary" : "text-foreground"}`}>
                    {day.getDate()}
                  </p>
                </div>
                {dayShifts.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-2">—</p>
                ) : (
                  <div className="space-y-1.5">
                    {dayShifts.map((s) => (
                      <div
                        key={s.id}
                        className={`rounded-lg border px-2 py-1.5 ${shiftClass[s.type]}`}
                        title={`${s.professional} — ${s.start} às ${s.end}`}
                      >
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <Avatar className="w-5 h-5 shrink-0">
                            <AvatarFallback className="text-[9px] font-bold bg-white/40">
                              {s.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <p className="text-xs font-semibold truncate leading-tight">
                            {s.professional.split(" ").slice(-1)[0]}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5 opacity-70 shrink-0" />
                          <span className="text-[10px] opacity-80">
                            {s.start}–{s.end}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        /* List view */
        <div className="space-y-4">
          {weekDays.map((day) => {
            const dateStr = fmt(day)
            const dayShifts = shiftsForDate(dateStr)
            const isToday = dateStr === today
            return (
              <Card key={dateStr} className={`shadow-sm ${isToday ? "ring-1 ring-primary/30" : ""}`}>
                <CardHeader className="py-3 px-4 flex flex-row items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex flex-col items-center justify-center shrink-0 ${
                      isToday ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <span className="text-[10px] font-medium uppercase">{DAYS_PT[day.getDay()]}</span>
                    <span className="text-base font-bold leading-none">{day.getDate()}</span>
                  </div>
                  <CardTitle className="text-sm font-semibold capitalize">
                    {day.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
                    {isToday && (
                      <Badge className="ml-2 text-xs h-5 px-2 bg-primary text-primary-foreground">
                        Hoje
                      </Badge>
                    )}
                  </CardTitle>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {dayShifts.length} profissiona{dayShifts.length !== 1 ? "is" : "l"}
                  </span>
                </CardHeader>
                <CardContent className="px-4 pb-4 pt-0">
                  {dayShifts.length === 0 ? (
                    <p className="text-sm text-muted-foreground py-2">Nenhuma escala cadastrada.</p>
                  ) : (
                    <div className="space-y-2">
                      {dayShifts.map((s) => (
                        <div key={s.id} className="flex items-center gap-3 p-2.5 rounded-lg border border-border bg-muted/20">
                          <Avatar className="w-9 h-9 shrink-0">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                              {s.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{s.professional}</p>
                            <p className="text-xs text-muted-foreground">{s.role} · {s.sector}</p>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{s.start} – {s.end}</span>
                          </div>
                          <Badge variant="outline" className={`text-xs shrink-0 ${shiftClass[s.type]}`}>
                            {shiftLabel[s.type]}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
