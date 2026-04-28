"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  MessageSquare,
  Calendar,
  FolderOpen,
  AlertTriangle,
  Clock,
  ChevronRight,
  Heart,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import {
  notices,
  urgentNotices,
  shifts,
  priorityClass,
  priorityLabel,
  formatRelative,
  shiftClass,
  shiftLabel,
} from "@/lib/mock-data"

function getGreeting(h: number): string {
  if (h < 12) return "Bom dia"
  if (h < 18) return "Boa tarde"
  return "Boa noite"
}

export default function HomePage() {
  const { user } = useAuth()
  const [greeting, setGreeting] = useState("Bom plantão")
  const [today, setToday] = useState("")
  const [dateLabel, setDateLabel] = useState("")

  useEffect(() => {
    const now = new Date()
    setGreeting(getGreeting(now.getHours()))
    setToday(now.toISOString().split("T")[0])
    setDateLabel(
      now.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    )
  }, [])
  const todayShifts = shifts.filter((s) => s.date === today)
  const recentNotices = notices.slice(0, 4)
  const openUrgent = urgentNotices.filter((u) => !u.acknowledged)

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground text-balance">
            {greeting}, {user.name.split(" ").slice(0, 2).join(" ")}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {dateLabel}
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button asChild size="sm" variant="outline">
            <Link href="/escalas">
              <Calendar className="w-4 h-4 mr-1.5" />
              Ver escalas
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link href="/documentos">
              <FolderOpen className="w-4 h-4 mr-1.5" />
              Documentos
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/avisos">
              <MessageSquare className="w-4 h-4 mr-1.5" />
              Publicar aviso
            </Link>
          </Button>
        </div>
      </div>

      {/* Urgent alert banner */}
      {openUrgent.length > 0 && (
        <div className="rounded-xl border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900 p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-red-800 dark:text-red-300">
              {openUrgent.length} comunicado{openUrgent.length > 1 ? "s" : ""} urgente{openUrgent.length > 1 ? "s" : ""} pendente{openUrgent.length > 1 ? "s" : ""}
            </p>
            <p className="text-sm text-red-700 dark:text-red-400 mt-0.5 truncate">
              {openUrgent[0].title}
            </p>
          </div>
          <Button asChild size="sm" variant="destructive" className="shrink-0">
            <Link href="/urgentes">Ver agora</Link>
          </Button>
        </div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Avisos esta semana", value: notices.length.toString(), icon: MessageSquare, color: "text-primary" },
          { label: "Escalas hoje", value: todayShifts.length.toString(), icon: Calendar, color: "text-emerald-600" },
          { label: "Documentos", value: "8", icon: FolderOpen, color: "text-amber-600" },
          { label: "Urgentes pendentes", value: openUrgent.length.toString(), icon: AlertTriangle, color: openUrgent.length > 0 ? "text-red-600" : "text-muted-foreground" },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground leading-tight">{value}</p>
                <p className="text-xs text-muted-foreground leading-tight">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent notices */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-semibold">Avisos Recentes</CardTitle>
            <Button asChild variant="ghost" size="sm" className="text-primary h-8 px-2">
              <Link href="/avisos" className="flex items-center gap-1">
                Ver todos <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            {recentNotices.map((notice) => (
              <div
                key={notice.id}
                className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/40 transition-colors cursor-pointer"
              >
                <Avatar className="w-8 h-8 shrink-0 mt-0.5">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                    {notice.authorAvatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 flex-wrap">
                    <p className="text-sm font-medium text-foreground text-balance leading-snug">
                      {notice.title}
                    </p>
                    <Badge
                      variant="outline"
                      className={`text-xs shrink-0 ${priorityClass[notice.priority]}`}
                    >
                      {priorityLabel[notice.priority]}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{notice.author}</span>
                    <span className="text-muted-foreground/40">·</span>
                    <span className="text-xs text-muted-foreground">{formatRelative(notice.date)}</span>
                    <span className="text-muted-foreground/40">·</span>
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{notice.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Today's shifts */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-semibold">Escala de Hoje</CardTitle>
            <Button asChild variant="ghost" size="sm" className="text-primary h-8 px-2">
              <Link href="/escalas" className="flex items-center gap-1">
                Ver mais <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            {todayShifts.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                Nenhuma escala cadastrada para hoje.
              </p>
            ) : (
              todayShifts.map((shift) => (
                <div key={shift.id} className="flex items-center gap-3 p-2.5 rounded-lg border border-border">
                  <Avatar className="w-8 h-8 shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                      {shift.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{shift.professional}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-3 h-3 text-muted-foreground shrink-0" />
                      <span className="text-xs text-muted-foreground">
                        {shift.start} – {shift.end}
                      </span>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-xs shrink-0 ${shiftClass[shift.type]}`}
                  >
                    {shiftLabel[shift.type]}
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
