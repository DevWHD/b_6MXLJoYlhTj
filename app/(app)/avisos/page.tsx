"use client"

import { useState } from "react"
import {
  Heart,
  MessageCircle,
  ChevronDown,
  Filter,
  Plus,
  Send,
  CheckCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  notices as initialNotices,
  Notice,
  priorityClass,
  priorityLabel,
  formatDate,
  formatTime,
  formatRelative,
  Priority,
} from "@/lib/mock-data"
import { useAuth } from "@/contexts/auth-context"

const ALL_SECTORS = ["Enfermagem", "Obstetrícia", "Pediatria", "Administrativo", "Todos"]
const ALL_PRIORITIES: Priority[] = ["urgente", "alta", "normal", "informativo"]

export default function AvisosPage() {
  const { user } = useAuth()
  const [items, setItems] = useState<Notice[]>(initialNotices)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [commentInput, setCommentInput] = useState<Record<string, string>>({})
  const [sectorFilter, setSectorFilter] = useState<string[]>([])
  const [priorityFilter, setPriorityFilter] = useState<Priority[]>([])
  const [newTitle, setNewTitle] = useState("")
  const [newContent, setNewContent] = useState("")
  const [newPriority, setNewPriority] = useState<Priority>("normal")
  const [dialogOpen, setDialogOpen] = useState(false)

  const filtered = items.filter((n) => {
    const sectorOk = sectorFilter.length === 0 || sectorFilter.includes(n.sector)
    const priorityOk = priorityFilter.length === 0 || priorityFilter.includes(n.priority)
    return sectorOk && priorityOk
  })

  const toggleLike = (id: string) => {
    setItems((prev) =>
      prev.map((n) =>
        n.id === id
          ? { ...n, liked: !n.liked, likes: n.liked ? n.likes - 1 : n.likes + 1 }
          : n
      )
    )
  }

  const addComment = (id: string) => {
    const text = commentInput[id]?.trim()
    if (!text) return
    setItems((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              comments: [
                ...n.comments,
                {
                  id: `c${Date.now()}`,
                  author: user.name,
                  authorAvatar: user.avatar,
                  content: text,
                  date: new Date().toISOString(),
                },
              ],
            }
          : n
      )
    )
    setCommentInput((prev) => ({ ...prev, [id]: "" }))
  }

  const publishNotice = () => {
    if (!newTitle.trim() || !newContent.trim()) return
    const novel: Notice = {
      id: `n${Date.now()}`,
      title: newTitle,
      content: newContent,
      author: user.name,
      authorRole: user.role,
      authorAvatar: user.avatar,
      sector: user.sector,
      date: new Date().toISOString(),
      priority: newPriority,
      tags: [user.sector],
      likes: 0,
      liked: false,
      comments: [],
    }
    setItems((prev) => [novel, ...prev])
    setNewTitle("")
    setNewContent("")
    setNewPriority("normal")
    setDialogOpen(false)
  }

  const toggleSector = (s: string) =>
    setSectorFilter((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]))

  const togglePriority = (p: Priority) =>
    setPriorityFilter((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]))

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Mural de Avisos</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {filtered.length} aviso{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Sector filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5 h-9">
                <Filter className="w-3.5 h-3.5" />
                Setor
                {sectorFilter.length > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                    {sectorFilter.length}
                  </Badge>
                )}
                <ChevronDown className="w-3.5 h-3.5 ml-0.5 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filtrar por setor</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {ALL_SECTORS.map((s) => (
                <DropdownMenuCheckboxItem
                  key={s}
                  checked={sectorFilter.includes(s)}
                  onCheckedChange={() => toggleSector(s)}
                >
                  {s}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Priority filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5 h-9">
                Prioridade
                {priorityFilter.length > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                    {priorityFilter.length}
                  </Badge>
                )}
                <ChevronDown className="w-3.5 h-3.5 ml-0.5 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filtrar por prioridade</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {ALL_PRIORITIES.map((p) => (
                <DropdownMenuCheckboxItem
                  key={p}
                  checked={priorityFilter.includes(p)}
                  onCheckedChange={() => togglePriority(p)}
                >
                  {priorityLabel[p]}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Publish */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1.5 h-9">
                <Plus className="w-3.5 h-3.5" />
                Novo aviso
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Publicar aviso</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Título</label>
                  <Input
                    placeholder="Título do aviso..."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Conteúdo</label>
                  <Textarea
                    placeholder="Descreva o aviso..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Prioridade</label>
                  <div className="flex gap-2 flex-wrap">
                    {ALL_PRIORITIES.map((p) => (
                      <button
                        key={p}
                        onClick={() => setNewPriority(p)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${priorityClass[p]} ${newPriority === p ? "ring-2 ring-ring" : "opacity-60"}`}
                      >
                        {priorityLabel[p]}
                      </button>
                    ))}
                  </div>
                </div>
                <Button className="w-full" onClick={publishNotice}>
                  Publicar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Feed */}
      {filtered.length === 0 ? (
        <Card className="shadow-sm">
          <CardContent className="py-16 text-center">
            <p className="text-muted-foreground">Nenhum aviso disponível com os filtros selecionados.</p>
            <Button variant="ghost" className="mt-3" onClick={() => { setSectorFilter([]); setPriorityFilter([]) }}>
              Limpar filtros
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map((notice) => {
            const isExpanded = expandedId === notice.id
            return (
              <Card key={notice.id} className="shadow-sm overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10 shrink-0">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                        {notice.authorAvatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-foreground">{notice.author}</span>
                        <span className="text-xs text-muted-foreground">{notice.authorRole}</span>
                        <span className="text-muted-foreground/40">·</span>
                        <span className="text-xs text-muted-foreground">{formatRelative(notice.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <Badge variant="outline" className="text-xs h-5 px-1.5">
                          {notice.sector}
                        </Badge>
                        <Badge variant="outline" className={`text-xs h-5 px-1.5 ${priorityClass[notice.priority]}`}>
                          {priorityLabel[notice.priority]}
                        </Badge>
                      </div>
                    </div>
                    <time
                      className="text-xs text-muted-foreground shrink-0"
                      dateTime={notice.date}
                      title={`${formatDate(notice.date)} às ${formatTime(notice.date)}`}
                    >
                      {formatDate(notice.date)}
                    </time>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 space-y-3">
                  <div>
                    <h2 className="text-base font-semibold text-foreground text-balance mb-1">
                      {notice.title}
                    </h2>
                    <p className={`text-sm text-muted-foreground leading-relaxed ${!isExpanded && "line-clamp-3"}`}>
                      {notice.content}
                    </p>
                    {notice.content.length > 120 && (
                      <button
                        className="text-xs text-primary mt-1 hover:underline"
                        onClick={() => setExpandedId(isExpanded ? null : notice.id)}
                      >
                        {isExpanded ? "Ver menos" : "Ver mais"}
                      </button>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex gap-1.5 flex-wrap">
                    {notice.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 pt-1 border-t border-border">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`gap-1.5 h-8 text-sm ${notice.liked ? "text-red-500" : "text-muted-foreground"}`}
                      onClick={() => toggleLike(notice.id)}
                      aria-label={notice.liked ? "Descurtir aviso" : "Curtir aviso"}
                      aria-pressed={notice.liked}
                    >
                      <Heart className={`w-4 h-4 ${notice.liked ? "fill-current" : ""}`} />
                      {notice.likes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1.5 h-8 text-sm text-muted-foreground"
                      onClick={() => setExpandedId(isExpanded ? null : notice.id)}
                      aria-label="Ver comentários"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {notice.comments.length}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1.5 h-8 text-sm text-muted-foreground ml-auto"
                      onClick={() => toggleLike(notice.id)}
                      aria-label="Marcar como ciente"
                    >
                      <CheckCheck className="w-4 h-4" />
                      Ciente
                    </Button>
                  </div>

                  {/* Comments section */}
                  {isExpanded && (
                    <div className="space-y-3 pt-1">
                      {notice.comments.map((c) => (
                        <div key={c.id} className="flex gap-2.5">
                          <Avatar className="w-7 h-7 shrink-0">
                            <AvatarFallback className="bg-muted text-xs font-medium">
                              {c.authorAvatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 bg-muted/50 rounded-lg px-3 py-2">
                            <p className="text-xs font-medium text-foreground">{c.author}</p>
                            <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{c.content}</p>
                            <p className="text-xs text-muted-foreground/60 mt-1">{formatRelative(c.date)}</p>
                          </div>
                        </div>
                      ))}

                      {/* Add comment */}
                      <div className="flex gap-2.5">
                        <Avatar className="w-7 h-7 shrink-0">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                            {user.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 flex gap-2">
                          <Input
                            placeholder="Adicionar comentário..."
                            value={commentInput[notice.id] ?? ""}
                            onChange={(e) =>
                              setCommentInput((prev) => ({ ...prev, [notice.id]: e.target.value }))
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault()
                                addComment(notice.id)
                              }
                            }}
                            className="h-8 text-sm"
                          />
                          <Button
                            size="icon"
                            className="h-8 w-8 shrink-0"
                            onClick={() => addComment(notice.id)}
                            aria-label="Enviar comentário"
                          >
                            <Send className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
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
