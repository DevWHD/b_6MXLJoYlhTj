export type Priority = "urgente" | "alta" | "normal" | "informativo"
export type ShiftType = "diurno" | "noturno" | "sobreaviso"

// ------- NOTICES -------
export interface Notice {
  id: string
  title: string
  content: string
  author: string
  authorRole: string
  authorAvatar: string
  sector: string
  date: string
  priority: Priority
  tags: string[]
  likes: number
  liked: boolean
  comments: Comment[]
}

export interface Comment {
  id: string
  author: string
  authorAvatar: string
  content: string
  date: string
}

export const notices: Notice[] = [
  {
    id: "n1",
    title: "Protocolo atualizado: Manejo do pré-eclâmpsia",
    content:
      "Informamos que o protocolo de manejo de pré-eclâmpsia foi atualizado em conformidade com as diretrizes FEBRASGO 2025. Todas as equipes devem revisar o documento disponível na aba Documentos antes de assumir o próximo plantão.",
    author: "Dr. Ricardo Mendes",
    authorRole: "Médico",
    authorAvatar: "RM",
    sector: "Obstetrícia",
    date: "2025-07-10T08:30:00",
    priority: "alta",
    tags: ["Obstetrícia", "Protocolo"],
    likes: 12,
    liked: false,
    comments: [
      {
        id: "c1",
        author: "Enf. Patrícia Lima",
        authorAvatar: "PL",
        content: "Obrigada pela atualização! Já avisamos a equipe de enfermagem.",
        date: "2025-07-10T09:15:00",
      },
    ],
  },
  {
    id: "n2",
    title: "Reunião de equipe — Sexta-feira 14h",
    content:
      "Fica convocada reunião multiprofissional para sexta-feira às 14h na Sala de Reuniões 2. Pauta: reorganização das escalas de julho e apresentação do novo fluxo de triagem.",
    author: "Coord. Ana Beatriz",
    authorRole: "Administrativo",
    authorAvatar: "AB",
    sector: "Administrativo",
    date: "2025-07-09T16:00:00",
    priority: "normal",
    tags: ["Reunião", "Administrativo"],
    likes: 7,
    liked: true,
    comments: [],
  },
  {
    id: "n3",
    title: "Troca de plantão aprovada — Enfermagem",
    content:
      "A troca de plantão entre Enf. Sofia Rocha (14/07) e Enf. Carla Dias (16/07) foi aprovada pela coordenação. Favor atualizar os registros.",
    author: "Coord. Ana Beatriz",
    authorRole: "Administrativo",
    authorAvatar: "AB",
    sector: "Enfermagem",
    date: "2025-07-08T11:20:00",
    priority: "normal",
    tags: ["Enfermagem", "Escala"],
    likes: 3,
    liked: false,
    comments: [],
  },
  {
    id: "n4",
    title: "Novo equipamento de cardiotocografia disponível",
    content:
      "O novo monitor de cardiotocografia (CTG Philips FM50) já está disponível na sala 4B. Treinamento agendado para quarta-feira às 10h com o técnico da empresa.",
    author: "Dr. Fernando Costa",
    authorRole: "Médico",
    authorAvatar: "FC",
    sector: "Obstetrícia",
    date: "2025-07-07T09:00:00",
    priority: "informativo",
    tags: ["Equipamento", "Treinamento"],
    likes: 15,
    liked: false,
    comments: [
      {
        id: "c2",
        author: "Enf. Sofia Rocha",
        authorAvatar: "SR",
        content: "Ótima notícia! Confirmo presença no treinamento.",
        date: "2025-07-07T10:30:00",
      },
    ],
  },
  {
    id: "n5",
    title: "Lembrete: Higiene das mãos — Campanha mensal",
    content:
      "Relembramos a todos que julho é o mês da campanha de higiene das mãos. Cartazes foram afixados em todos os postos. A adesão correta ao protocolo é fundamental para a segurança das pacientes.",
    author: "CCIH",
    authorRole: "Administrativo",
    authorAvatar: "CC",
    sector: "Todos",
    date: "2025-07-06T07:00:00",
    priority: "informativo",
    tags: ["CCIH", "Segurança"],
    likes: 20,
    liked: true,
    comments: [],
  },
]

// ------- URGENT NOTICES -------
export interface UrgentNotice {
  id: string
  title: string
  content: string
  author: string
  date: string
  acknowledged: boolean
}

export const urgentNotices: UrgentNotice[] = [
  {
    id: "u1",
    title: "ALERTA: Falta de insumos — Kit de sutura em falta",
    content:
      "Informamos que os kits de sutura absorvível (Vicryl 2-0) estão em falta no estoque. A farmácia já foi acionada e reposição é esperada até 12h de hoje. Em caso de necessidade urgente, acionar a coordenação pelo ramal 201.",
    author: "Farmácia Hospitalar",
    date: "2025-07-10T06:00:00",
    acknowledged: false,
  },
  {
    id: "u2",
    title: "URGENTE: Mudança temporária no fluxo de triagem",
    content:
      "Devido à reforma da recepção, o fluxo de triagem será redirecionado para a entrada lateral (Portão B) a partir de hoje até o dia 14/07. Todos os profissionais devem orientar as pacientes corretamente.",
    author: "Administração",
    date: "2025-07-09T18:00:00",
    acknowledged: false,
  },
]

// ------- SHIFTS -------
export interface Shift {
  id: string
  professional: string
  role: string
  avatar: string
  type: ShiftType
  date: string
  start: string
  end: string
  sector: string
}

const today = new Date()
const fmt = (d: Date) => d.toISOString().split("T")[0]
const addDays = (d: Date, n: number) => {
  const r = new Date(d)
  r.setDate(r.getDate() + n)
  return r
}

export const shifts: Shift[] = [
  // Today
  { id: "s1", professional: "Dra. Maria Oliveira", role: "Médico", avatar: "MO", type: "diurno", date: fmt(today), start: "07:00", end: "19:00", sector: "Obstetrícia" },
  { id: "s2", professional: "Enf. Patrícia Lima", role: "Enfermagem", avatar: "PL", type: "diurno", date: fmt(today), start: "07:00", end: "19:00", sector: "Enfermagem" },
  { id: "s3", professional: "Dr. Fernando Costa", role: "Médico", avatar: "FC", type: "noturno", date: fmt(today), start: "19:00", end: "07:00", sector: "Obstetrícia" },
  { id: "s4", professional: "Enf. Sofia Rocha", role: "Enfermagem", avatar: "SR", type: "noturno", date: fmt(today), start: "19:00", end: "07:00", sector: "Enfermagem" },
  // Tomorrow
  { id: "s5", professional: "Dra. Maria Oliveira", role: "Médico", avatar: "MO", type: "sobreaviso", date: fmt(addDays(today, 1)), start: "08:00", end: "20:00", sector: "Pediatria" },
  { id: "s6", professional: "Dr. Ricardo Mendes", role: "Médico", avatar: "RM", type: "diurno", date: fmt(addDays(today, 1)), start: "07:00", end: "19:00", sector: "Obstetrícia" },
  { id: "s7", professional: "Enf. Carla Dias", role: "Enfermagem", avatar: "CD", type: "diurno", date: fmt(addDays(today, 1)), start: "07:00", end: "19:00", sector: "Enfermagem" },
  // +2
  { id: "s8", professional: "Dr. Fernando Costa", role: "Médico", avatar: "FC", type: "diurno", date: fmt(addDays(today, 2)), start: "07:00", end: "19:00", sector: "Obstetrícia" },
  { id: "s9", professional: "Enf. Patrícia Lima", role: "Enfermagem", avatar: "PL", type: "noturno", date: fmt(addDays(today, 2)), start: "19:00", end: "07:00", sector: "Enfermagem" },
  // +3
  { id: "s10", professional: "Dr. Ricardo Mendes", role: "Médico", avatar: "RM", type: "noturno", date: fmt(addDays(today, 3)), start: "19:00", end: "07:00", sector: "Obstetrícia" },
  { id: "s11", professional: "Enf. Sofia Rocha", role: "Enfermagem", avatar: "SR", type: "diurno", date: fmt(addDays(today, 3)), start: "07:00", end: "19:00", sector: "Enfermagem" },
  // -1 (yesterday)
  { id: "s12", professional: "Dra. Maria Oliveira", role: "Médico", avatar: "MO", type: "noturno", date: fmt(addDays(today, -1)), start: "19:00", end: "07:00", sector: "Obstetrícia" },
  { id: "s13", professional: "Enf. Carla Dias", role: "Enfermagem", avatar: "CD", type: "diurno", date: fmt(addDays(today, -1)), start: "07:00", end: "19:00", sector: "Enfermagem" },
]

// ------- DOCUMENTS -------
export type DocCategory = "Protocolos clínicos" | "Manuais" | "Formulários"

export interface Document {
  id: string
  name: string
  category: DocCategory
  size: string
  updatedAt: string
  author: string
  sector: string
}

export const documents: Document[] = [
  { id: "d1", name: "Protocolo de Pré-eclâmpsia 2025.pdf", category: "Protocolos clínicos", size: "1.2 MB", updatedAt: "2025-07-10", author: "Dr. Ricardo Mendes", sector: "Obstetrícia" },
  { id: "d2", name: "Protocolo de Hemorragia Pós-parto.pdf", category: "Protocolos clínicos", size: "980 KB", updatedAt: "2025-06-15", author: "Dra. Maria Oliveira", sector: "Obstetrícia" },
  { id: "d3", name: "Manual do Recém-Nascido.pdf", category: "Manuais", size: "3.4 MB", updatedAt: "2025-05-20", author: "Dr. Fernando Costa", sector: "Pediatria" },
  { id: "d4", name: "Manual de Enfermagem Obstétrica.pdf", category: "Manuais", size: "2.1 MB", updatedAt: "2025-04-10", author: "Enf. Patrícia Lima", sector: "Enfermagem" },
  { id: "d5", name: "Formulário de Admissão Obstétrica.pdf", category: "Formulários", size: "240 KB", updatedAt: "2025-07-01", author: "Administração", sector: "Todos" },
  { id: "d6", name: "Formulário de Alta Hospitalar.pdf", category: "Formulários", size: "180 KB", updatedAt: "2025-07-01", author: "Administração", sector: "Todos" },
  { id: "d7", name: "Protocolo CCIH — Higiene das Mãos.pdf", category: "Protocolos clínicos", size: "560 KB", updatedAt: "2025-03-01", author: "CCIH", sector: "Todos" },
  { id: "d8", name: "Manual de Uso — CTG Philips FM50.pdf", category: "Manuais", size: "4.8 MB", updatedAt: "2025-07-07", author: "Engenharia Clínica", sector: "Obstetrícia" },
]

// ------- CONTACTS (RAMAIS POR SETOR) -------
export interface Contact {
  id: string
  name: string
  floor: string
  ramais: string[]
}

export const contacts: Contact[] = [
  // 1º Andar
  { id: "c1", name: "Recepção Emergência", floor: "1º Andar", ramais: ["2088-1300", "3878-2327"] },
  { id: "c2", name: "Acolhimento", floor: "1º Andar", ramais: ["2088-1301"] },
  { id: "c3", name: "Emergência", floor: "1º Andar", ramais: ["2088-1302"] },
  { id: "c4", name: "Ambulatório (Chefia)", floor: "1º Andar", ramais: ["2088-1303"] },
  { id: "c5", name: "Ambulatório (Registro Geral)", floor: "1º Andar", ramais: ["2088-1304"] },
  { id: "c6", name: "Ambulatório (Procedimento)", floor: "1º Andar", ramais: ["2088-1305"] },
  { id: "c7", name: "NIR (Admissão e Alta)", floor: "1º Andar", ramais: ["2088-1306", "3878-1845"] },
  // 2º Andar
  { id: "c8", name: "Portaria Principal", floor: "2º Andar", ramais: ["2088-1307"] },
  { id: "c9", name: "Faturamento (AIH/GIL/CNES)", floor: "2º Andar", ramais: ["2088-1308"] },
  { id: "c10", name: "Faturamento (Chefia)", floor: "2º Andar", ramais: ["3878-2544"] },
  { id: "c11", name: "Documentação Médica", floor: "2º Andar", ramais: ["2088-1309"] },
  { id: "c12", name: "Manutenção (Chefia)", floor: "2º Andar", ramais: ["2088-1310"] },
  { id: "c13", name: "Radiologia", floor: "2º Andar", ramais: ["2088-1311"] },
  { id: "c14", name: "Rouparia", floor: "2º Andar", ramais: ["2088-1312"] },
  { id: "c15", name: "Farmácia", floor: "2º Andar", ramais: ["2088-1313", "3895-5616"] },
  { id: "c16", name: "Cozinha/Firma", floor: "2º Andar", ramais: ["2088-1314"] },
  { id: "c17", name: "Almoxarifado", floor: "2º Andar", ramais: ["2088-1315", "3895-5208"] },
  { id: "c18", name: "Anatomia Patológica", floor: "2º Andar", ramais: ["2088-1316"] },
  { id: "c19", name: "Cantina", floor: "2º Andar", ramais: ["2088-1317"] },
  { id: "c20", name: "Associação (Bazar)", floor: "2º Andar", ramais: ["2088-1318"] },
  { id: "c21", name: "Cartório", floor: "2º Andar", ramais: ["2088-1319"] },
  // 3º Andar
  { id: "c22", name: "Direção / Secretária", floor: "3º Andar", ramais: ["2088-1320", "3878-1498"] },
  { id: "c23", name: "Coordenação Médica", floor: "3º Andar", ramais: ["2088-1321", "3878-2371"] },
  { id: "c24", name: "Coordenadora ADM", floor: "3º Andar", ramais: ["2088-1322", "3895-2396"] },
  { id: "c25", name: "Assessoria Médica", floor: "3º Andar", ramais: ["3895-3453"] },
  { id: "c26", name: "Assessoria ADM", floor: "3º Andar", ramais: ["2088-1324", "3878-1548"] },
  { id: "c27", name: "Apoio Administrativo", floor: "3º Andar", ramais: ["2088-1326"] },
  { id: "c28", name: "Assessoria da Direção", floor: "3º Andar", ramais: ["2088-1327"] },
  { id: "c29", name: "Laboratório", floor: "3º Andar", ramais: ["2088-1328"] },
  { id: "c30", name: "Comunicação / Xerox", floor: "3º Andar", ramais: ["2088-1329"] },
  { id: "c31", name: "Centro de Estudos", floor: "3º Andar", ramais: ["2088-2207"] },
  { id: "c32", name: "Gerência de Contratos", floor: "3º Andar", ramais: ["2088-1331", "3878-1837"] },
  { id: "c33", name: "Recursos Humanos", floor: "3º Andar", ramais: ["2088-1332", "3895-5138"] },
  { id: "c34", name: "Diretora", floor: "3º Andar", ramais: ["3878-2562"] },
  // 4º Andar
  { id: "c35", name: "Nutrição", floor: "4º Andar", ramais: ["2088-1333", "2088-1334"] },
  { id: "c36", name: "Chefia Nutrição", floor: "4º Andar", ramais: ["2088-1335"] },
  { id: "c37", name: "Banco de Leite", floor: "4º Andar", ramais: ["2088-1336"] },
  { id: "c38", name: "Supervisão Enfermagem", floor: "4º Andar", ramais: ["2088-1338"] },
  { id: "c39", name: "Hall - Recepção / Vigilância", floor: "4º Andar", ramais: ["2088-1339"] },
  { id: "c40", name: "Chefia Neonatal (Enfermagem)", floor: "4º Andar", ramais: ["2088-1340"] },
  { id: "c41", name: "UTI Neo Natal", floor: "4º Andar", ramais: ["2088-1341"] },
  { id: "c42", name: "UI Neonatal", floor: "4º Andar", ramais: ["2088-1342"] },
  { id: "c43", name: "Equipe Médica Neonatal", floor: "4º Andar", ramais: ["2088-1343"] },
  { id: "c44", name: "Quarto dos Médicos (Neonatologia)", floor: "4º Andar", ramais: ["2088-1343"] },
  // 5º Andar
  { id: "c45", name: "Posto de Enfermagem (AC)", floor: "5º Andar", ramais: ["2088-1344", "2088-1345"] },
  { id: "c46", name: "Enfermaria Canguru", floor: "5º Andar", ramais: ["2088-1346"] },
  { id: "c47", name: "Hemoterapia", floor: "5º Andar", ramais: ["3895-5548", "2088-1347"] },
  { id: "c48", name: "Citopatologia", floor: "5º Andar", ramais: ["2088-1348"] },
  { id: "c49", name: "Saúde Mental", floor: "5º Andar", ramais: ["2088-1350"] },
  { id: "c50", name: "Serviço Social", floor: "5º Andar", ramais: ["2088-1350", "3895-2518"] },
  // 6º Andar
  { id: "c51", name: "Posto de Enfermagem (AC)", floor: "6º Andar", ramais: ["2088-1351"] },
  { id: "c52", name: "Posto de Enfermagem (Ginecologia)", floor: "6º Andar", ramais: ["2088-1352"] },
  { id: "c53", name: "Chefia Seção de Enfermagem", floor: "6º Andar", ramais: ["2088-1353"] },
  { id: "c54", name: "Associação de Funcionários", floor: "6º Andar", ramais: ["2088-1349"] },
  // 7º Andar
  { id: "c55", name: "Posto de Enfermagem - Ala A", floor: "7º Andar", ramais: ["2088-1354"] },
  { id: "c56", name: "Posto de Enfermagem - Ala B", floor: "7º Andar", ramais: ["2088-1355"] },
  { id: "c57", name: "Ultrassonografia", floor: "7º Andar", ramais: ["2088-1356"] },
  { id: "c58", name: "Chefia Obstetrícia", floor: "7º Andar", ramais: ["2088-1357"] },
  { id: "c59", name: "Sala de Fisioterapia", floor: "7º Andar", ramais: ["2088-1358"] },
  { id: "c60", name: "Quarto dos Médicos", floor: "7º Andar", ramais: ["2088-1359"] },
  { id: "c61", name: "Epidemio / CCIH", floor: "7º Andar", ramais: ["2088-1325"] },
  // 8º Andar
  { id: "c62", name: "Hall - Recepção", floor: "8º Andar", ramais: ["2088-1360"] },
  { id: "c63", name: "Sala de Parto", floor: "8º Andar", ramais: ["2088-1361"] },
  { id: "c64", name: "Equipe Médica de Plantão", floor: "8º Andar", ramais: ["2088-1362", "3878-2510"] },
  { id: "c65", name: "Centro Cirúrgico", floor: "8º Andar", ramais: ["2088-1363"] },
  { id: "c66", name: "Chefia - Anestesiologia", floor: "8º Andar", ramais: ["2088-1364"] },
  { id: "c67", name: "UTI Materna", floor: "8º Andar", ramais: ["2088-1365"] },
  { id: "c68", name: "Equipe de Plantão - UTI Materna", floor: "8º Andar", ramais: ["2088-1366"] },
  // 9º Andar
  { id: "c69", name: "Centro de Material e Esterilização", floor: "9º Andar", ramais: ["2088-1367"] },
  { id: "c70", name: "Limpeza (Supervisão)", floor: "9º Andar", ramais: ["2088-1368"] },
  { id: "c71", name: "Manutenção Predial (Encarregado)", floor: "9º Andar", ramais: ["2088-1369"] },
  { id: "c72", name: "Manutenção Predial (Plantão)", floor: "9º Andar", ramais: ["2088-1370"] },
  // 10º Andar
  { id: "c73", name: "Manutenção", floor: "10º Andar", ramais: ["2088-1371"] },
]

// ------- SECTORS -------
export interface Sector {
  id: string
  name: string
  description: string
  color: string
  staffCount: number
  icon: string
}

export const sectors: Sector[] = [
  { id: "almoxarifado", name: "Almoxarifado", description: "Gestão e controle de estoque de materiais", color: "bg-amber-100 text-amber-800 border-amber-200", staffCount: 4, icon: "Package" },
  { id: "ccih", name: "CCIH", description: "Comissão de Controle de Infecção Hospitalar", color: "bg-red-100 text-red-800 border-red-200", staffCount: 5, icon: "ShieldAlert" },
  { id: "centro-estudos", name: "Centro de Estudos", description: "Educação continuada e pesquisa", color: "bg-violet-100 text-violet-800 border-violet-200", staffCount: 3, icon: "BookOpen" },
  { id: "cga", name: "CGA", description: "Coordenação Geral Assistencial", color: "bg-sky-100 text-sky-800 border-sky-200", staffCount: 4, icon: "LayoutDashboard" },
  { id: "chefia-anestesia", name: "Chefia de Anestesia", description: "Coordenação do serviço de anestesiologia", color: "bg-indigo-100 text-indigo-800 border-indigo-200", staffCount: 6, icon: "Syringe" },
  { id: "chefia-clinica-medica", name: "Chefe de Clínica Médica", description: "Supervisão clínica e assistencial", color: "bg-blue-100 text-blue-800 border-blue-200", staffCount: 2, icon: "Stethoscope" },
  { id: "chefia-enfermagem-neonatal", name: "Chefia de Enfermagem Neonatal", description: "Coordenação da enfermagem na UTI neonatal", color: "bg-pink-100 text-pink-800 border-pink-200", staffCount: 3, icon: "Heart" },
  { id: "chefia-ginecologia", name: "Chefia de Ginecologia", description: "Coordenação do serviço de ginecologia", color: "bg-rose-100 text-rose-800 border-rose-200", staffCount: 4, icon: "UserRound" },
  { id: "chefia-neonatologia", name: "Chefia de Neonatologia", description: "Coordenação da neonatologia", color: "bg-green-100 text-green-800 border-green-200", staffCount: 5, icon: "Baby" },
  { id: "chefia-obstetricia", name: "Chefia de Obstetrícia", description: "Coordenação do serviço de obstetrícia", color: "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200", staffCount: 5, icon: "Baby" },
  { id: "chefia-pacientes-externos", name: "Chefia de Pacientes Externos", description: "Coordenação do atendimento ambulatorial", color: "bg-cyan-100 text-cyan-800 border-cyan-200", staffCount: 4, icon: "UserRound" },
  { id: "chefia-pacientes-internos", name: "Chefia de Pacientes Internos", description: "Coordenação da internação hospitalar", color: "bg-teal-100 text-teal-800 border-teal-200", staffCount: 4, icon: "BedDouble" },
  { id: "chefias-enfermagem", name: "Chefias de Enfermagem", description: "Coordenação geral da equipe de enfermagem", color: "bg-blue-100 text-blue-800 border-blue-200", staffCount: 8, icon: "Heart" },
  { id: "cma", name: "CMA", description: "Central de Material e Esterilização", color: "bg-slate-100 text-slate-700 border-slate-200", staffCount: 6, icon: "FlaskConical" },
  { id: "comite-etica-enfermagem", name: "Comitê de Ética de Enfermagem", description: "Ética e conduta profissional em enfermagem", color: "bg-purple-100 text-purple-800 border-purple-200", staffCount: 5, icon: "Scale" },
  { id: "comite-etica-medica", name: "Comitê de Ética Médica", description: "Ética e conduta profissional médica", color: "bg-violet-100 text-violet-800 border-violet-200", staffCount: 5, icon: "Scale" },
  { id: "comite-obito-materno", name: "Comitê de Óbito Materno", description: "Análise e prevenção de óbito materno", color: "bg-red-100 text-red-800 border-red-200", staffCount: 6, icon: "ClipboardList" },
  { id: "compras", name: "Compras", description: "Aquisição de materiais e serviços", color: "bg-orange-100 text-orange-800 border-orange-200", staffCount: 4, icon: "ShoppingCart" },
  { id: "direcao-geral", name: "Direção Geral", description: "Gestão e direção da unidade hospitalar", color: "bg-yellow-100 text-yellow-800 border-yellow-200", staffCount: 3, icon: "Briefcase" },
  { id: "documentacao-medica", name: "Documentação Médica", description: "Gestão de prontuários e registros clínicos", color: "bg-stone-100 text-stone-700 border-stone-200", staffCount: 5, icon: "FileText" },
  { id: "dsadt", name: "DSADT", description: "Divisão de Saúde do Trabalhador", color: "bg-lime-100 text-lime-800 border-lime-200", staffCount: 4, icon: "ShieldCheck" },
  { id: "farmacia", name: "Farmácia", description: "Dispensação e controle de medicamentos", color: "bg-emerald-100 text-emerald-800 border-emerald-200", staffCount: 7, icon: "Pill" },
  { id: "faturamento", name: "Faturamento", description: "Controle financeiro e faturamento hospitalar", color: "bg-green-100 text-green-800 border-green-200", staffCount: 5, icon: "Receipt" },
  { id: "laboratorio", name: "Laboratório", description: "Análises clínicas e exames laboratoriais", color: "bg-sky-100 text-sky-800 border-sky-200", staffCount: 8, icon: "FlaskConical" },
  { id: "manutencao", name: "Manutenção", description: "Conservação e manutenção da infraestrutura", color: "bg-zinc-100 text-zinc-700 border-zinc-200", staffCount: 5, icon: "Wrench" },
  { id: "nats", name: "NATS", description: "Núcleo de Avaliação de Tecnologias em Saúde", color: "bg-indigo-100 text-indigo-800 border-indigo-200", staffCount: 3, icon: "Microscope" },
  { id: "nsp", name: "NSP", description: "Núcleo de Segurança do Paciente", color: "bg-red-100 text-red-800 border-red-200", staffCount: 4, icon: "ShieldAlert" },
  { id: "nutricao", name: "Nutrição", description: "Suporte nutricional e dietoterapia", color: "bg-green-100 text-green-800 border-green-200", staffCount: 5, icon: "Salad" },
  { id: "ouvidoria", name: "Ouvidoria 2026", description: "Atendimento a reclamações e sugestões", color: "bg-orange-100 text-orange-800 border-orange-200", staffCount: 2, icon: "MessageCircle" },
  { id: "radiologia", name: "Radiologia", description: "Diagnóstico por imagem", color: "bg-slate-100 text-slate-700 border-slate-200", staffCount: 5, icon: "ScanLine" },
  { id: "rh", name: "RH", description: "Recursos Humanos e gestão de pessoas", color: "bg-amber-100 text-amber-800 border-amber-200", staffCount: 5, icon: "Users" },
  { id: "servico-social", name: "Serviço Social", description: "Apoio social a pacientes e familiares", color: "bg-pink-100 text-pink-800 border-pink-200", staffCount: 4, icon: "HandHeart" },
  { id: "ti", name: "TI", description: "Tecnologia da Informação e suporte técnico", color: "bg-blue-100 text-blue-800 border-blue-200", staffCount: 4, icon: "Monitor" },
]

export function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })
}

export function formatTime(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
}

export function formatRelative(iso: string): string {
  const d = new Date(iso)
  const now = new Date()
  const diff = Math.floor((now.getTime() - d.getTime()) / 1000)
  if (diff < 60) return "agora mesmo"
  if (diff < 3600) return `há ${Math.floor(diff / 60)} min`
  if (diff < 86400) return `há ${Math.floor(diff / 3600)}h`
  return `há ${Math.floor(diff / 86400)} dias`
}

export const priorityLabel: Record<Priority, string> = {
  urgente: "Urgente",
  alta: "Alta prioridade",
  normal: "Normal",
  informativo: "Informativo",
}

export const priorityClass: Record<Priority, string> = {
  urgente: "bg-red-100 text-red-700 border-red-200",
  alta: "bg-orange-100 text-orange-700 border-orange-200",
  normal: "bg-blue-100 text-blue-700 border-blue-200",
  informativo: "bg-slate-100 text-slate-600 border-slate-200",
}

export const shiftLabel: Record<ShiftType, string> = {
  diurno: "Diurno",
  noturno: "Noturno",
  sobreaviso: "Sobreaviso",
}

export const shiftClass: Record<ShiftType, string> = {
  diurno: "bg-sky-100 text-sky-800 border-sky-200",
  noturno: "bg-indigo-100 text-indigo-800 border-indigo-200",
  sobreaviso: "bg-amber-100 text-amber-800 border-amber-200",
}
