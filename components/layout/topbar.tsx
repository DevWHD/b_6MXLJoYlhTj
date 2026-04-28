"use client"

import { useState } from "react"
import { Bell, Plus, Search, Upload, FileText, PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DarkModeToggle } from "@/components/layout/dark-mode-toggle"

const MOCK_NOTIFICATIONS = [
  { id: 1, text: "Novo aviso: Protocolo de pré-eclâmpsia atualizado", time: "há 30 min", unread: true },
  { id: 2, text: "Comunicado urgente: Kit de sutura em falta", time: "há 1h", unread: true },
  { id: 3, text: "Reunião de equipe agendada para sexta-feira", time: "há 3h", unread: false },
]

interface TopbarProps {
  collapsed: boolean
  onToggleCollapse: () => void
}

export function Topbar({ collapsed, onToggleCollapse }: TopbarProps) {
  const [search, setSearch] = useState("")
  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => n.unread).length

  return (
    <header className="h-14 border-b border-border bg-card flex items-center gap-3 px-4 shrink-0">
      {/* Sidebar toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground"
        onClick={onToggleCollapse}
        aria-label={collapsed ? "Expandir menu lateral" : "Recolher menu lateral"}
      >
        {collapsed ? (
          <PanelLeftOpen className="w-4 h-4" />
        ) : (
          <PanelLeftClose className="w-4 h-4" />
        )}
      </Button>

      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          type="search"
          placeholder="Buscar avisos, documentos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-9 bg-muted/50 border-border text-sm focus-visible:bg-card"
          aria-label="Buscar"
        />
      </div>

      <div className="flex items-center gap-1 ml-auto">
        {/* Quick actions */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 gap-2 hidden sm:flex">
              <Plus className="w-4 h-4" />
              <span>Novo</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Ações rápidas</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <FileText className="w-4 h-4 mr-2" />
              Publicar aviso
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Upload className="w-4 h-4 mr-2" />
              Upload de documento
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Dark mode */}
        <DarkModeToggle />

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 relative" aria-label={`${unreadCount} notificações não lidas`}>
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" aria-hidden="true" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notificações
              {unreadCount > 0 && (
                <span className="text-xs bg-primary text-primary-foreground rounded-full px-2 py-0.5">
                  {unreadCount} novas
                </span>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {MOCK_NOTIFICATIONS.map((n) => (
              <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-1 py-3 cursor-pointer">
                <div className="flex items-start gap-2 w-full">
                  {n.unread && <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" aria-hidden="true" />}
                  <span className={`text-sm leading-snug ${n.unread ? "font-medium" : "font-normal text-muted-foreground"}`}>
                    {n.text}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground ml-4">{n.time}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
