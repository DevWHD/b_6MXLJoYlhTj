"use client"

import { useState } from "react"
import {
  Heart,
  Baby,
  Stethoscope,
  Briefcase,
  Users,
  FileText,
  MessageSquare,
  ChevronRight,
  X,
  Package,
  ShieldAlert,
  BookOpen,
  LayoutDashboard,
  Syringe,
  UserRound,
  BedDouble,
  FlaskConical,
  Scale,
  ClipboardList,
  ShoppingCart,
  ShieldCheck,
  Pill,
  Receipt,
  Wrench,
  Microscope,
  Salad,
  MessageCircle,
  ScanLine,
  HandHeart,
  Monitor,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { sectors, notices, documents, contacts, Sector } from "@/lib/mock-data"

const iconMap: Record<string, React.ElementType> = {
  Heart,
  Baby,
  Stethoscope,
  Briefcase,
  Users,
  FileText,
  Package,
  ShieldAlert,
  BookOpen,
  LayoutDashboard,
  Syringe,
  UserRound,
  BedDouble,
  FlaskConical,
  Scale,
  ClipboardList,
  ShoppingCart,
  ShieldCheck,
  Pill,
  Receipt,
  Wrench,
  Microscope,
  Salad,
  MessageCircle,
  ScanLine,
  HandHeart,
  Monitor,
}

export default function SetoresPage() {
  const [selected, setSelected] = useState<Sector | null>(null)

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Setores</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Informações por departamento
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sectors.map((sector) => {
          const Icon = iconMap[sector.icon] ?? Heart
          const sectorNotices = notices.filter(
            (n) => n.sector === sector.name || n.sector === "Todos"
          )
          const sectorDocs = documents.filter(
            (d) => d.sector === sector.name || d.sector === "Todos"
          )
          const sectorContacts = contacts.filter(
            (c) => c.sector === sector.name
          )

          return (
            <Card
              key={sector.id}
              className="shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelected(sector)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setSelected(sector)}
              aria-label={`Ver detalhes do setor ${sector.name}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${sector.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base">{sector.name}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">
                      {sector.description}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {sector.staffCount} profissionais
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" />
                    {sectorNotices.length} avisos
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" />
                    {sectorDocs.length} docs
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Sector detail dialog */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon = iconMap[selected.icon] ?? Heart
                    return (
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${selected.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    )
                  })()}
                  <DialogTitle className="text-lg">{selected.name}</DialogTitle>
                </div>
              </DialogHeader>

              <div className="space-y-6 pt-2">
                {/* Notices */}
                <section>
                  <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" /> Avisos do setor
                  </h3>
                  {notices
                    .filter((n) => n.sector === selected.name || n.sector === "Todos")
                    .slice(0, 3)
                    .map((n) => (
                      <div key={n.id} className="flex items-start gap-2 py-2 border-b border-border last:border-0">
                        <div className="flex-1">
                          <p className="text-sm font-medium leading-snug">{n.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{n.author}</p>
                        </div>
                        <Badge variant="outline" className="text-xs shrink-0">
                          {n.sector}
                        </Badge>
                      </div>
                    ))}
                </section>

                {/* Documents */}
                <section>
                  <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Documentos
                  </h3>
                  {documents
                    .filter((d) => d.sector === selected.name || d.sector === "Todos")
                    .slice(0, 3)
                    .map((d) => (
                      <div key={d.id} className="flex items-center gap-2 py-2 border-b border-border last:border-0">
                        <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm truncate">{d.name}</p>
                          <p className="text-xs text-muted-foreground">{d.category} · {d.size}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="h-7 text-xs shrink-0">
                          Baixar
                        </Button>
                      </div>
                    ))}
                </section>

                {/* Contacts */}
                <section>
                  <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4" /> Equipe
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {contacts
                      .filter((c) => c.sector === selected.name)
                      .map((c) => (
                        <div key={c.id} className="flex items-center gap-2.5 p-2 rounded-lg border border-border">
                          <Avatar className="w-8 h-8 shrink-0">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                              {c.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">{c.name}</p>
                            <p className="text-xs text-muted-foreground">Ramal {c.ramal}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </section>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
