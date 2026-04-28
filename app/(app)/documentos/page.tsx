"use client"

import { useState } from "react"
import {
  FileText,
  Search,
  Download,
  Eye,
  Upload,
  Filter,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
} from "@/components/ui/dialog"
import { documents, Document, DocCategory } from "@/lib/mock-data"

const CATEGORIES: DocCategory[] = ["Protocolos clínicos", "Manuais", "Formulários"]

const categoryColor: Record<DocCategory, string> = {
  "Protocolos clínicos": "bg-blue-100 text-blue-700 border-blue-200",
  Manuais: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Formulários: "bg-amber-100 text-amber-700 border-amber-200",
}

export default function DocumentosPage() {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<DocCategory[]>([])
  const [previewing, setPreviewing] = useState<Document | null>(null)

  const toggleCategory = (c: DocCategory) =>
    setCategoryFilter((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    )

  const filtered = documents.filter((d) => {
    const matchSearch =
      search.trim() === "" ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.category.toLowerCase().includes(search.toLowerCase())
    const matchCat =
      categoryFilter.length === 0 || categoryFilter.includes(d.category)
    return matchSearch && matchCat
  })

  const grouped = CATEGORIES.reduce<Record<DocCategory, Document[]>>((acc, cat) => {
    acc[cat] = filtered.filter((d) => d.category === cat)
    return acc
  }, {} as Record<DocCategory, Document[]>)

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Documentos</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {filtered.length} documento{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button size="sm" className="gap-1.5 h-9 self-start">
          <Upload className="w-4 h-4" />
          Enviar documento
        </Button>
      </div>

      {/* Search + filter */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Buscar documentos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9"
            aria-label="Buscar documentos"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1.5 h-9">
              <Filter className="w-3.5 h-3.5" />
              Categoria
              {categoryFilter.length > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                  {categoryFilter.length}
                </Badge>
              )}
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Filtrar por categoria</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {CATEGORIES.map((c) => (
              <DropdownMenuCheckboxItem
                key={c}
                checked={categoryFilter.includes(c)}
                onCheckedChange={() => toggleCategory(c)}
              >
                {c}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Category sections */}
      {filtered.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <FileText className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground">Nenhum documento encontrado.</p>
            <Button
              variant="ghost"
              className="mt-3"
              onClick={() => { setSearch(""); setCategoryFilter([]) }}
            >
              Limpar filtros
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {CATEGORIES.map((cat) => {
            const items = grouped[cat]
            if (items.length === 0) return null
            return (
              <Card key={cat} className="shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={`text-xs ${categoryColor[cat]}`}>
                      {cat}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{items.length} arquivo{items.length !== 1 ? "s" : ""}</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="divide-y divide-border">
                    {items.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center gap-3 py-3 group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4 text-red-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {doc.size} · Atualizado em{" "}
                            {new Date(doc.updatedAt).toLocaleDateString("pt-BR")} · {doc.author}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setPreviewing(doc)}
                            aria-label={`Visualizar ${doc.name}`}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            aria-label={`Baixar ${doc.name}`}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Preview dialog */}
      <Dialog open={!!previewing} onOpenChange={(o) => !o && setPreviewing(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base leading-snug">{previewing?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="rounded-xl border border-border bg-muted/30 h-64 flex flex-col items-center justify-center gap-3 text-muted-foreground">
              <FileText className="w-12 h-12 opacity-30" />
              <p className="text-sm">Pré-visualização de PDF</p>
              <p className="text-xs opacity-60">Viewer integrado disponível em produção</p>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1 gap-2">
                <Download className="w-4 h-4" />
                Baixar documento
              </Button>
              <Button variant="outline" onClick={() => setPreviewing(null)}>
                Fechar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
