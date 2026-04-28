"use client"

import { Coffee, Utensils, UtensilsCrossed, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const menu = {
  date: new Date().toISOString().split("T")[0],
  items: [
    {
      meal: "Café da Manhã",
      time: "07:00 - 08:30",
      icon: Coffee,
      options: [
        "Pão francês com manteiga ou requeijão",
        "Ovos mexidos",
        "Mamão em fatias",
        "Café, leite e suco de laranja",
      ],
      diet: "Geral",
    },
    {
      meal: "Almoço",
      time: "11:30 - 14:00",
      icon: Utensils,
      options: [
        "Arroz branco e arroz integral",
        "Feijão carioca",
        "Opção 1: Filé de frango grelhado ao molho de laranja",
        "Opção 2: Iscas de carne acebolada",
        "Opção Vegana: Grão-de-bico com legumes salteados",
        "Guarnição: Purê de batata",
        "Salada: Mix de folhas verdes, tomate e cenoura",
        "Sobremesa: Gelatina de morango ou Fruta (Maçã)",
        "Suco: Maracujá ou Limão",
      ],
      diet: "Geral",
    },
    {
      meal: "Café da Tarde",
      time: "15:30 - 16:30",
      icon: Coffee,
      options: [
        "Bolo de cenoura simples",
        "Torradas com patê de ervas",
        "Café, leite e chá mate",
      ],
      diet: "Geral",
    },
    {
      meal: "Jantar",
      time: "18:30 - 20:00",
      icon: UtensilsCrossed,
      options: [
        "Sopa de legumes com macarrão",
        "Arroz branco",
        "Feijão carioca",
        "Opção única: Escondidinho de carne moída",
        "Salada: Alface e beterraba ralada",
        "Sobremesa: Pudim de chocolate",
        "Suco: Uva",
      ],
      diet: "Geral",
    },
  ],
}

export default function CardapioPage() {
  const diaSemana = new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })
  
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Cardápio do Dia</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Refeitório Central</p>
        </div>
        <Badge variant="outline" className="w-fit gap-1.5 py-1.5 px-3 bg-card border-border text-sm font-normal">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="capitalize">{diaSemana}</span>
        </Badge>
      </div>

      <div className="grid gap-6">
        {menu.items.map((item, i) => {
          const Icon = item.icon
          return (
            <Card key={item.meal} className="shadow-sm overflow-hidden border-border/60">
              <CardHeader className="bg-muted/30 pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{item.meal}</CardTitle>
                    <CardDescription className="text-xs font-medium text-foreground/70 flex items-center gap-1.5 mt-0.5">
                       <span>{item.time}</span>
                       <span className="w-1 h-1 rounded-full bg-muted-foreground/30"></span>
                       <span>Dieta {item.diet}</span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="pt-4 pb-5">
                <ul className="space-y-2.5">
                  {item.options.map((option, j) => (
                    <li key={j} className="flex gap-2.5 items-start text-sm text-foreground/90">
                      <span className="text-primary mt-1.5 shrink-0 block w-1.5 h-1.5 rounded-full bg-primary/50" />
                      <span className="leading-relaxed">{option}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="bg-amber-50/50 border-amber-100 dark:bg-amber-950/10 dark:border-amber-900/30">
        <CardContent className="p-4 flex gap-3 text-sm text-amber-800 dark:text-amber-400">
          <UtensilsCrossed className="w-5 h-5 shrink-0" />
          <div>
            <p className="font-semibold mb-1">Dietas Especiais e Restrições</p>
            <p>
              Pacientes com restrições alimentares ou dietas específicas (pastosa, leve, hipossódica, para diabéticos, etc.) 
              recebem o cardápio prescrito pela equipe de <span className="font-semibold text-primary">Nutrição (Ramal: 2088-1335)</span> de forma individualizada nos leitos.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
