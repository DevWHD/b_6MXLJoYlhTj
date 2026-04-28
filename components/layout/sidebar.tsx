"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  MessageSquare,
  Calendar,
  Building2,
  FolderOpen,
  AlertTriangle,
  Phone,
  LogOut,
  Activity,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const navItems = [
  { href: "/", label: "Início", icon: Home },
  { href: "/avisos", label: "Mural de Avisos", icon: MessageSquare },
  { href: "/escalas", label: "Escalas de Plantão", icon: Calendar },
  { href: "/setores", label: "Setores", icon: Building2 },
  { href: "/documentos", label: "Documentos", icon: FolderOpen },
  { href: "/urgentes", label: "Comunicados Urgentes", icon: AlertTriangle },
  { href: "/contatos", label: "Contatos", icon: Phone },
]

interface SidebarProps {
  collapsed?: boolean
}

export function Sidebar({ collapsed = false }: SidebarProps) {
  const pathname = usePathname()
  const { user } = useAuth()

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-200 shrink-0",
          collapsed ? "w-16" : "w-60"
        )}
      >
        {/* Logo */}
        <div
          className={cn(
            "flex items-center gap-3 px-4 py-5 border-b border-sidebar-border",
            collapsed && "justify-center px-0"
          )}
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-sidebar-primary shrink-0">
            <Activity className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-semibold text-sidebar-foreground leading-tight truncate">
                IntraNetHTS
              </p>
              <p className="text-xs text-sidebar-accent-foreground/60 leading-tight truncate">
                HMFM
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href)
            return collapsed ? (
              <Tooltip key={href}>
                <TooltipTrigger asChild>
                  <Link
                    href={href}
                    className={cn(
                      "flex items-center justify-center w-full h-10 rounded-lg transition-colors",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="sr-only">{label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{label}</TooltipContent>
              </Tooltip>
            ) : (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="truncate">{label}</span>
                {href === "/urgentes" && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-red-400 shrink-0" aria-label="Novos comunicados urgentes" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* User profile */}
        <div className={cn("border-t border-sidebar-border p-3", collapsed && "px-0 flex justify-center")}>
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="w-9 h-9 cursor-pointer">
                  <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground text-xs font-semibold">
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent side="right">
                {user.name} — {user.role}
              </TooltipContent>
            </Tooltip>
          ) : (
            <div className="flex items-center gap-3">
              <Avatar className="w-9 h-9 shrink-0">
                <AvatarFallback className="bg-sidebar-primary/30 text-sidebar-primary-foreground text-xs font-semibold">
                  {user.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
                <p className="text-xs text-sidebar-accent-foreground/60 truncate">{user.role}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent shrink-0"
                aria-label="Sair"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </aside>
    </TooltipProvider>
  )
}
