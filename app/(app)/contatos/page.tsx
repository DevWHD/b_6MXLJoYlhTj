"use client"

import { useState } from "react"
import { Phone, Hash, Layers } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { contacts, Contact } from "@/lib/mock-data"

const FLOORS = ["1º Andar", "2º Andar", "3º Andar", "4º Andar", "5º Andar", "6º Andar", "7º Andar", "8º Andar", "9º Andar", "10º Andar"]

export default function ContatosPage() {
  const [search, setSearch] = useState("")
  const [floorFilter, setFloorFilter] = useState<string[]>([])
  const [selected, setSelected] = useState<Contact | null>(null)

  const toggleFloor = (f: string) =>
    setFloorFilter((p) => (p.includes(f) ? p.filter((x) => x !== f) : [...p, f]))

  const filtered = contacts.filter((c) => {
    const q = search.toLowerCase()
    const matchSearch =
      q === "" ||
      c.name.toLowerCase().includes(q) ||
      c.ramais.some((r) => r.includes(q))
    const matchFloor = floorFilter.length === 0 || floorFilter.includes(c.floor)
    return matchSearch && matchFloor
  })

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Contatos</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {filtered.length} profissiona{filtered.length !== 1 ? "is" : "l"} encontrado{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Search + filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Input
            placeholder="Buscar por nome ou ramal..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-3 h-9"
            aria-label="Buscar contatos"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1.5 h-9">
              Andar
              {floorFilter.length > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">{floorFilter.length}</Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Filtrar por andar</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {FLOORS.map((f) => (
              <DropdownMenuCheckboxItem key={f} checked={floorFilter.includes(f)} onCheckedChange={() => toggleFloor(f)}>
                {f}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <p className="text-muted-foreground">Nenhum contato encontrado.</p>
            <Button
              variant="ghost"
              className="mt-3"
              onClick={() => { setSearch(""); setFloorFilter([]) }}
            >
              Limpar filtros
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((contact) => (
            <Card
              key={contact.id}
              className="shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelected(contact)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setSelected(contact)}
              aria-label={`Ver contatos de ${contact.name}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{contact.name}</p>
                    <Badge variant="outline" className="text-xs mt-0.5">
                      {contact.floor}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-1.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 shrink-0" />
                    <span>Ramal: {contact.ramais.join(", ")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Profile dialog */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-sm">
          {selected && (
            <>
              <DialogHeader>
                <div className="flex flex-col items-center gap-3 pt-2">
                  <div className="text-center">
                    <DialogTitle className="text-lg">{selected.name}</DialogTitle>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {selected.floor}
                    </Badge>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-3 pt-2">
                <div className="flex flex-col gap-2 p-3 rounded-lg border border-border bg-muted/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Hash className="w-4 h-4 text-muted-foreground shrink-0" />
                    <p className="text-xs text-muted-foreground">Ramais</p>
                  </div>
                  {selected.ramais.map((ramal, index) => (
                    <div key={index} className="flex justify-between bg-background p-2 rounded border">
                      <p className="text-sm font-medium">{ramal}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
