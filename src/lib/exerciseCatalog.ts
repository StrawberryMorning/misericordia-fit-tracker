export type AnimationPattern =
  | "bench"
  | "incline"
  | "fly"
  | "ohp"
  | "lateral"
  | "pullup"
  | "row"
  | "curl"
  | "pushdown"
  | "squat"
  | "rdl"
  | "legpress"
  | "legext"
  | "calf";

export interface CatalogExercise {
  id: string;
  name: string;
  muscleGroup: string;
  secondaryMuscles: string;
  pattern: AnimationPattern;
  defaultSets: number;
  defaultReps: string;
  defaultRest: number;
  cues: string[];
}

export const MUSCLE_GROUPS = [
  "Peitoral",
  "Costas",
  "Ombros",
  "Quadríceps",
  "Posterior de Coxa",
  "Glúteos",
  "Bíceps",
  "Tríceps",
  "Antebraço",
  "Trapézio",
  "Panturrilha",
  "Abdômen / Core",
] as const;

export const EXERCISE_CATALOG: CatalogExercise[] = [
  // ==========================================================================
  // 1. PEITORAL (12 variações)
  // ==========================================================================
  {
    id: "cat-bench-barbell",
    name: "Supino Reto com Barra",
    muscleGroup: "Peitoral",
    secondaryMuscles: "Tríceps, Deltoide Anterior",
    pattern: "bench",
    defaultSets: 4,
    defaultReps: "6-8",
    defaultRest: 120,
    cues: [
      "Mantenha as escápulas retraídas e deprimidas contra o banco.",
      "Desça a barra até tocar a linha inferior do peitoral com cotovelos a ~45°.",
      "Empurre mantendo os pés firmes no chão e glúteos no banco.",
    ],
  },
  {
    id: "cat-bench-db",
    name: "Supino Reto com Halteres",
    muscleGroup: "Peitoral",
    secondaryMuscles: "Tríceps, Deltoide Anterior, Estabilizadores",
    pattern: "bench",
    defaultSets: 4,
    defaultReps: "8-10",
    defaultRest: 90,
    cues: [
      "Permite maior amplitude de alongamento na descida do que a barra.",
      "Mantenha os punhos firmes e desça os halteres na linha do mamilo.",
      "Suba convergindo levemente sem bater os halteres no topo.",
    ],
  },
  {
    id: "cat-incline-barbell",
    name: "Supino Inclinado com Barra",
    muscleGroup: "Peitoral",
    secondaryMuscles: "Feixe Clavicular (Superior), Deltoide Anterior, Tríceps",
    pattern: "incline",
    defaultSets: 4,
    defaultReps: "6-10",
    defaultRest: 120,
    cues: [
      "Desça a barra na parte alta do peitoral (próximo à clavícula).",
      "Mantenha os cotovelos levemente apontados para frente (não 90° abertos).",
    ],
  },
  {
    id: "cat-incline-db",
    name: "Supino Inclinado com Halteres (30° a 45°)",
    muscleGroup: "Peitoral",
    secondaryMuscles: "Peitoral Superior, Deltoide Anterior, Tríceps",
    pattern: "incline",
    defaultSets: 4,
    defaultReps: "8-10",
    defaultRest: 90,
    cues: [
      "Ajuste o banco em 30° para isolar o peitoral superior sem roubar com ombro.",
      "Alongue bem as fibras peitorais na fase excêntrica.",
    ],
  },
  {
    id: "cat-decline-bench",
    name: "Supino Declinado (Barra ou Halteres)",
    muscleGroup: "Peitoral",
    secondaryMuscles: "Porção Costal (Inferior do Peito), Tríceps",
    pattern: "bench",
    defaultSets: 3,
    defaultReps: "8-10",
    defaultRest: 90,
    cues: [
      "Foco total na porção inferior do peitoral com menor estresse no ombro.",
      "Desça de forma controlada até a linha inferior do esterno.",
    ],
  },
  {
    id: "cat-chest-press-machine",
    name: "Supino Máquina / Articulado (Hammer)",
    muscleGroup: "Peitoral",
    secondaryMuscles: "Tríceps, Deltoide Anterior",
    pattern: "bench",
    defaultSets: 3,
    defaultReps: "8-12",
    defaultRest: 90,
    cues: [
      "Ajuste a altura do banco para que a pegada fique na linha média do peitoral.",
      "Excelente para ir até a falha total com segurança máxima.",
    ],
  },
  {
    id: "cat-peck-deck",
    name: "Peck Deck / Voador Máquina",
    muscleGroup: "Peitoral",
    secondaryMuscles: "Deltoide Anterior",
    pattern: "fly",
    defaultSets: 3,
    defaultReps: "10-15",
    defaultRest: 75,
    cues: [
      "Mantenha o peito alto e as costas coladas no encosto.",
      "Segure 1 segundo esmagando o miolo do peito quando as hastes se encontrarem.",
    ],
  },
  {
    id: "cat-db-fly",
    name: "Crucifixo Reto ou Inclinado com Halteres",
    muscleGroup: "Peitoral",
    secondaryMuscles: "Deltoide Anterior, Bíceps (isometria)",
    pattern: "fly",
    defaultSets: 3,
    defaultReps: "10-12",
    defaultRest: 75,
    cues: [
      "Mantenha uma leve flexão fixa nos cotovelos como se abraçasse um barril.",
      "Foque no alongamento máximo na parte baixa do movimento.",
    ],
  },
  {
    id: "cat-crossover-high",
    name: "Cross-over na Polia Alta",
    muscleGroup: "Peitoral",
    secondaryMuscles: "Peitoral Inferior e Miolo",
    pattern: "fly",
    defaultSets: 3,
    defaultReps: "12-15",
    defaultRest: 60,
    cues: [
      "Incline levemente o tronco e puxe os cabos para baixo e para dentro.",
      "Cruze levemente as mãos na frente do quadril para adução completa.",
    ],
  },
  {
    id: "cat-crossover-low",
    name: "Cross-over na Polia Baixa (De baixo para cima)",
    muscleGroup: "Peitoral",
    secondaryMuscles: "Peitoral Superior (Clavicular), Deltoide Anterior",
    pattern: "incline",
    defaultSets: 3,
    defaultReps: "12-15",
    defaultRest: 60,
    cues: [
      "Suba os cabos em arco unindo as mãos na altura do queixo/rosto.",
      "Isola a linha superior do peitoral com tensão contínua dos cabos.",
    ],
  },
  {
    id: "cat-chest-dips",
    name: "Paralelas (Foco Peitoral)",
    muscleGroup: "Peitoral",
    secondaryMuscles: "Tríceps, Deltoide Anterior",
    pattern: "bench",
    defaultSets: 3,
    defaultReps: "8-12",
    defaultRest: 90,
    cues: [
      "Incline o tronco ~30° para frente e deixe os cotovelos abrirem levemente.",
      "Desça até sentir alongar a borda externa e inferior do peito.",
    ],
  },
  {
    id: "cat-pushups",
    name: "Flexão de Braços (Push-up)",
    muscleGroup: "Peitoral",
    secondaryMuscles: "Tríceps, Core, Serrátil",
    pattern: "bench",
    defaultSets: 3,
    defaultReps: "12-20",
    defaultRest: 60,
    cues: [
      "Corpo reto em prancha com glúteos e abdômen contraídos.",
      "Desça até o peito quase tocar o solo e estenda totalmente no topo.",
    ],
  },

  // ==========================================================================
  // 2. COSTAS (12 variações)
  // ==========================================================================
  {
    id: "cat-pullup",
    name: "Barra Fixa Pronada (Pull-up)",
    muscleGroup: "Costas",
    secondaryMuscles: "Latíssimo do Dorso, Bíceps, Redondo Maior",
    pattern: "pullup",
    defaultSets: 4,
    defaultReps: "6-12",
    defaultRest: 120,
    cues: [
      "Deprima as escápulas antes de flexionar os cotovelos.",
      "Puxe até o queixo passar da barra estufando o peito.",
    ],
  },
  {
    id: "cat-chinup",
    name: "Barra Fixa Supinada / Neutra (Chin-up)",
    muscleGroup: "Costas",
    secondaryMuscles: "Dorsal Inferior, Bíceps (Forte ativação)",
    pattern: "pullup",
    defaultSets: 4,
    defaultReps: "6-10",
    defaultRest: 120,
    cues: [
      "Pegada na largura dos ombros com palmas viradas para você.",
      "Leve os cotovelos colados às costelas puxando o esterno até a barra.",
    ],
  },
  {
    id: "cat-lat-pulldown-wide",
    name: "Puxada Alta Frontal Aberta (Pulldown)",
    muscleGroup: "Costas",
    secondaryMuscles: "Largura de Dorsal (V-Taper), Bíceps",
    pattern: "pullup",
    defaultSets: 4,
    defaultReps: "8-12",
    defaultRest: 90,
    cues: [
      "Puxe a barra na direção da parte superior do peito inclinando levemente ~15°.",
      "Foque em puxar pelos cotovelos para baixo, não pelas mãos.",
    ],
  },
  {
    id: "cat-lat-pulldown-triangle",
    name: "Puxada Alta com Triângulo (Pegada Fechada)",
    muscleGroup: "Costas",
    secondaryMuscles: "Dorsal Inferior, Bíceps, Braquial",
    pattern: "pullup",
    defaultSets: 3,
    defaultReps: "10-12",
    defaultRest: 90,
    cues: [
      "Alongue tudo no topo deixando os ombros subirem de forma controlada.",
      "Traga o triângulo até encostar no osso esterno.",
    ],
  },
  {
    id: "cat-barbell-row",
    name: "Remada Curvada com Barra (Pronada ou Supinada)",
    muscleGroup: "Costas",
    secondaryMuscles: "Espessura de Costas, Lombar, Trapézio, Bíceps",
    pattern: "row",
    defaultSets: 4,
    defaultReps: "6-10",
    defaultRest: 120,
    cues: [
      "Coluna totalmente neutra, tronco inclinado a ~45°-60°.",
      "Puxe a barra em direção ao umbigo esmagando as escápulas.",
    ],
  },
  {
    id: "cat-pendlay-row",
    name: "Remada Pendlay (Barra saindo do chão)",
    muscleGroup: "Costas",
    secondaryMuscles: "Dorsal, Romboides, Eretores da Espinha",
    pattern: "row",
    defaultSets: 4,
    defaultReps: "6-8",
    defaultRest: 120,
    cues: [
      "Tronco paralelo ao solo (90°); a barra descansa no chão a cada repetição.",
      "Puxada explosiva desenvolvendo força bruta e densidade dorsal.",
    ],
  },
  {
    id: "cat-tbar-row",
    name: "Remada Cavalinho (T-Bar Row)",
    muscleGroup: "Costas",
    secondaryMuscles: "Miolo das Costas (Romboides/Trapézio), Dorsal",
    pattern: "row",
    defaultSets: 4,
    defaultReps: "8-10",
    defaultRest: 120,
    cues: [
      "Mantenha o peito aberto e joelhos semiflexionados.",
      "Deixe as escápulas abrirem na descida e contraia forte no topo.",
    ],
  },
  {
    id: "cat-seated-cable-row",
    name: "Remada Baixa Sentado na Polia",
    muscleGroup: "Costas",
    secondaryMuscles: "Dorsal, Romboides, Bíceps",
    pattern: "row",
    defaultSets: 3,
    defaultReps: "10-12",
    defaultRest: 90,
    cues: [
      "Evite ficar balançando a lombar para frente e para trás.",
      "Puxe o puxador até o abdômen abrindo o peitoral.",
    ],
  },
  {
    id: "cat-one-arm-db-row",
    name: "Remada Unilateral com Halter (Serrote)",
    muscleGroup: "Costas",
    secondaryMuscles: "Grande Dorsal Unilateral, Bíceps",
    pattern: "row",
    defaultSets: 3,
    defaultReps: "8-12",
    defaultRest: 75,
    cues: [
      "Traga o halter em arco na direção do bolso da calça (quadril).",
      "Corrige assimetrias de força e volume entre o lado direito e esquerdo.",
    ],
  },
  {
    id: "cat-chest-supported-row",
    name: "Remada Máquina / Banco Inclinado (Apoio no Peito)",
    muscleGroup: "Costas",
    secondaryMuscles: "Trapézio Médio, Romboides, Dorsal",
    pattern: "row",
    defaultSets: 3,
    defaultReps: "10-12",
    defaultRest: 90,
    cues: [
      "Como o peito está apoiado, tira 100% da sobrecarga na lombar.",
      "Permite focar exclusivamente na retração escapular.",
    ],
  },
  {
    id: "cat-straight-arm-pulldown",
    name: "Pulldown na Polia com Corda ou Barra",
    muscleGroup: "Costas",
    secondaryMuscles: "Isolador de Grande Dorsal,Cabeça Longa do Tríceps",
    pattern: "pushdown",
    defaultSets: 3,
    defaultReps: "12-15",
    defaultRest: 60,
    cues: [
      "Braços quase retos; movimente apenas a articulação do ombro levando as mãos até a coxa.",
      "Único exercício que isola a dorsal sem usar o bíceps.",
    ],
  },
  {
    id: "cat-hyperextension",
    name: "Extensão Lombar (Banco Romano) / Levantamento Terra",
    muscleGroup: "Costas",
    secondaryMuscles: "Eretores da Espinha (Lombar), Glúteos, Posterior",
    pattern: "rdl",
    defaultSets: 3,
    defaultReps: "10-15",
    defaultRest: 90,
    cues: [
      "Suba até alinhar o tronco com as pernas sem hiperestender a coluna.",
      "Fortalece toda a base de sustentação da coluna vertebral.",
    ],
  },

  // ==========================================================================
  // 3. OMBROS (10 variações)
  // ==========================================================================
  {
    id: "cat-ohp-barbell",
    name: "Desenvolvimento Militar em Pé com Barra (OHP)",
    muscleGroup: "Ombros",
    secondaryMuscles: "Deltoide Anterior/Lateral, Tríceps, Core",
    pattern: "ohp",
    defaultSets: 4,
    defaultReps: "6-8",
    defaultRest: 120,
    cues: [
      "Contraia glúteos e abdômen firmemente para proteger a lombar.",
      "Passe a barra próxima ao queixo e encaixe a cabeça à frente quando a barra subir.",
    ],
  },
  {
    id: "cat-ohp-db",
    name: "Desenvolvimento Sentado com Halteres",
    muscleGroup: "Ombros",
    secondaryMuscles: "Deltoide Anterior e Lateral, Tríceps",
    pattern: "ohp",
    defaultSets: 4,
    defaultReps: "8-10",
    defaultRest: 90,
    cues: [
      "Desça os halteres até a linha das orelhas/queixo com cotovelos ~30° à frente.",
      "Empurre sem bater os halteres no topo mantendo tensão contínua.",
    ],
  },
  {
    id: "cat-arnold-press",
    name: "Desenvolvimento Arnold (Arnold Press)",
    muscleGroup: "Ombros",
    secondaryMuscles: "Deltoide Anterior e Lateral, Tríceps",
    pattern: "ohp",
    defaultSets: 3,
    defaultReps: "8-12",
    defaultRest: 90,
    cues: [
      "Comece embaixo com as palmas viradas para o rosto e gire para frente enquanto sobe.",
      "Aumenta o tempo sob tensão e trabalha todas as cabeças do deltoide.",
    ],
  },
  {
    id: "cat-shoulder-press-machine",
    name: "Desenvolvimento Máquina Articulada",
    muscleGroup: "Ombros",
    secondaryMuscles: "Tríceps",
    pattern: "ohp",
    defaultSets: 3,
    defaultReps: "8-12",
    defaultRest: 90,
    cues: [
      "Estabilidade máxima para progredir carga com segurança.",
      "Mantenha a lombar apoiada no encosto.",
    ],
  },
  {
    id: "cat-lat-raise-db",
    name: "Elevação Lateral com Halteres",
    muscleGroup: "Ombros",
    secondaryMuscles: "Deltoide Lateral (Largura V-Taper)",
    pattern: "lateral",
    defaultSets: 4,
    defaultReps: "12-15",
    defaultRest: 60,
    cues: [
      "Eleve no plano escapular (~20° à frente do corpo) liderando pelos cotovelos.",
      "Pare na linha dos ombros para não transferir o foco para o trapézio.",
    ],
  },
  {
    id: "cat-lat-raise-cable",
    name: "Elevação Lateral na Polia Baixa (Unilateral)",
    muscleGroup: "Ombros",
    secondaryMuscles: "Deltoide Lateral (Tensão constante desde o início)",
    pattern: "lateral",
    defaultSets: 4,
    defaultReps: "12-15",
    defaultRest: 60,
    cues: [
      "Diferente do halter, o cabo já gera tensão máxima logo nos primeiros graus embaixo.",
      "Passe o cabo por trás ou pela frente do corpo mantendo o tronco firme.",
    ],
  },
  {
    id: "cat-front-raise",
    name: "Elevação Frontal (Halteres, Corda ou Anilha)",
    muscleGroup: "Ombros",
    secondaryMuscles: "Deltoide Anterior, Peitoral Superior",
    pattern: "lateral",
    defaultSets: 3,
    defaultReps: "10-12",
    defaultRest: 60,
    cues: [
      "Eleve os braços à frente até a linha dos olhos sem balançar o quadril.",
      "Desça controlando o peso em 2 segundos.",
    ],
  },
  {
    id: "cat-reverse-peck-deck",
    name: "Crucifixo Inverso na Máquina (Peck Deck Invertido)",
    muscleGroup: "Ombros",
    secondaryMuscles: "Deltoide Posterior, Trapézio Médio",
    pattern: "fly",
    defaultSets: 4,
    defaultReps: "12-15",
    defaultRest: 60,
    cues: [
      "Empurre os braços para trás mantendo os ombros baixos (sem encolher).",
      "Foque em mover apenas a articulação do ombro sem juntar demais as escápulas.",
    ],
  },
  {
    id: "cat-facepull-rope",
    name: "Face Pull na Polia Alta com Corda",
    muscleGroup: "Ombros",
    secondaryMuscles: "Deltoide Posterior, Manguito Rotador, Trapézio",
    pattern: "row",
    defaultSets: 3,
    defaultReps: "12-15",
    defaultRest: 60,
    cues: [
      "Puxe a corda na direção dos olhos abrindo as mãos para trás das orelhas.",
      "Indispensável para saúde articular do ombro e postura.",
    ],
  },
  {
    id: "cat-upright-row",
    name: "Remada Alta (Barra W ou Polia Pegada Aberta)",
    muscleGroup: "Ombros",
    secondaryMuscles: "Deltoide Lateral, Trapézio Superior",
    pattern: "pullup",
    defaultSets: 3,
    defaultReps: "10-12",
    defaultRest: 75,
    cues: [
      "Use pegada na largura dos ombros e suba apenas até os cotovelos alinharem com os ombros.",
      "Evite pegadas muito fechadas para proteger o impacto no ombro.",
    ],
  },

  // ==========================================================================
  // 4. QUADRÍCEPS (9 variações)
  // ==========================================================================
  {
    id: "cat-squat-barbell",
    name: "Agachamento Livre com Barra",
    muscleGroup: "Quadríceps",
    secondaryMuscles: "Glúteos, Adutores, Core",
    pattern: "squat",
    defaultSets: 4,
    defaultReps: "6-8",
    defaultRest: 150,
    cues: [
      "Bracing abdominal firme; joelhos acompanhando a linha dos pés.",
      "Desça pelo menos até 90° mantendo a coluna neutra.",
    ],
  },
  {
    id: "cat-front-squat",
    name: "Agachamento Frontal (Front Squat)",
    muscleGroup: "Quadríceps",
    secondaryMuscles: "Quadríceps (Ênfase máxima), Core, Torácica",
    pattern: "squat",
    defaultSets: 4,
    defaultReps: "6-10",
    defaultRest: 150,
    cues: [
      "Cotovelos apontados bem para o alto mantendo o tronco vertical.",
      "Menor inclinação na lombar e maior recrutamento direto dos quadríceps.",
    ],
  },
  {
    id: "cat-hack-squat",
    name: "Agachamento Hack (Hack Machine)",
    muscleGroup: "Quadríceps",
    secondaryMuscles: "Vasto Lateral e Medial, Glúteos",
    pattern: "squat",
    defaultSets: 4,
    defaultReps: "8-12",
    defaultRest: 120,
    cues: [
      "Coluna 100% estabilizada no encosto permitindo descer com grande amplitude.",
      "Pés mais baixos na plataforma aumentam a flexão do joelho e foco no quadríceps.",
    ],
  },
  {
    id: "cat-smith-squat",
    name: "Agachamento no Smith (Barra Guiada)",
    muscleGroup: "Quadríceps",
    secondaryMuscles: "Glúteos",
    pattern: "squat",
    defaultSets: 4,
    defaultReps: "8-12",
    defaultRest: 120,
    cues: [
      "Posicione os pés levemente à frente da linha da barra.",
      "Ótima segurança para chegar próximo da falha sem perder o equilíbrio.",
    ],
  },
  {
    id: "cat-legpress-45",
    name: "Leg Press 45°",
    muscleGroup: "Quadríceps",
    secondaryMuscles: "Glúteos, Adutores",
    pattern: "legpress",
    defaultSets: 4,
    defaultReps: "10-12",
    defaultRest: 120,
    cues: [
      "Desça o máximo possível sem deixar o quadril/lombar descolar do banco.",
      "Nunca hiperestenda (trave) os joelhos no topo.",
    ],
  },
  {
    id: "cat-legpress-horizontal",
    name: "Leg Press Horizontal / Unilateral",
    muscleGroup: "Quadríceps",
    secondaryMuscles: "Glúteos",
    pattern: "legpress",
    defaultSets: 3,
    defaultReps: "10-15",
    defaultRest: 90,
    cues: [
      "Excelente para fazer unilateral (uma perna de cada vez) e corrigir diferenças de força.",
    ],
  },
  {
    id: "cat-bulgarian-split-squat",
    name: "Agachamento Búlgaro (Pé Traseiro Apoiado)",
    muscleGroup: "Quadríceps",
    secondaryMuscles: "Glúteo Máximo, Equilíbrio",
    pattern: "squat",
    defaultSets: 3,
    defaultReps: "8-12",
    defaultRest: 90,
    cues: [
      "Tronco mais reto foca mais no quadríceps; tronco levemente inclinado à frente foca mais no glúteo.",
      "Toda a força deve estar na perna da frente (a de trás é só apoio).",
    ],
  },
  {
    id: "cat-lunges",
    name: "Afundo / Passada com Halteres ou Barra",
    muscleGroup: "Quadríceps",
    secondaryMuscles: "Glúteos, Posterior",
    pattern: "squat",
    defaultSets: 3,
    defaultReps: "10-12",
    defaultRest: 90,
    cues: [
      "Dê um passo firme e desça até o joelho de trás quase tocar o solo.",
      "Empurre o chão com o calcanhar da perna da frente.",
    ],
  },
  {
    id: "cat-leg-extension",
    name: "Cadeira Extensora (Bilateral ou Unilateral)",
    muscleGroup: "Quadríceps",
    secondaryMuscles: "Isolamento dos 4 feixes do Quadríceps (Reto Femoral)",
    pattern: "legext",
    defaultSets: 4,
    defaultReps: "12-15",
    defaultRest: 75,
    cues: [
      "Único exercício que trabalha o reto femoral em encurtamento máximo.",
      "Segure 1 segundo no topo travando a contração da coxa.",
    ],
  },

  // ==========================================================================
  // 5. POSTERIOR DE COXA (7 variações)
  // ==========================================================================
  {
    id: "cat-rdl-barbell",
    name: "Stiff / Levantamento Terra Romeno (RDL) com Barra",
    muscleGroup: "Posterior de Coxa",
    secondaryMuscles: "Glúteos, Eretores da Espinha",
    pattern: "rdl",
    defaultSets: 4,
    defaultReps: "6-10",
    defaultRest: 120,
    cues: [
      "Joelhos semiflexionados fixos; projete o quadril todo para trás.",
      "Desça a barra colada na coxa/canela até onde sua flexibilidade permitir com coluna reta.",
    ],
  },
  {
    id: "cat-rdl-db",
    name: "Stiff com Halteres (Bilateral ou Unilateral)",
    muscleGroup: "Posterior de Coxa",
    secondaryMuscles: "Glúteos, Lombar",
    pattern: "rdl",
    defaultSets: 3,
    defaultReps: "8-12",
    defaultRest: 90,
    cues: [
      "Mantenha os halteres próximos às pernas e o peito aberto.",
      "Sinta o alongamento intenso nos isquiotibiais antes de subir.",
    ],
  },
  {
    id: "cat-seated-leg-curl",
    name: "Cadeira Flexora (Flexora Sentado)",
    muscleGroup: "Posterior de Coxa",
    secondaryMuscles: "Isquiotibiais (Maior alongamento inicial)",
    pattern: "legext",
    defaultSets: 4,
    defaultReps: "10-15",
    defaultRest: 75,
    cues: [
      "Como o quadril está flexionado (sentado), o posterior trabalha mais alongado — ótimo para hipertrofia.",
      "Trave bem a almofada sobre as coxas.",
    ],
  },
  {
    id: "cat-lying-leg-curl",
    name: "Mesa Flexora (Flexora Deitado)",
    muscleGroup: "Posterior de Coxa",
    secondaryMuscles: "Gastrocnêmio (Panturrilha)",
    pattern: "legext",
    defaultSets: 4,
    defaultReps: "10-12",
    defaultRest: 75,
    cues: [
      "Mantenha a pelve pressionada contra o banco durante toda a puxada.",
      "Controle a descida em 2-3 segundos sem soltar o peso.",
    ],
  },
  {
    id: "cat-standing-leg-curl",
    name: "Flexora em Pé Unilateral",
    muscleGroup: "Posterior de Coxa",
    secondaryMuscles: "Bíceps Femoral",
    pattern: "legext",
    defaultSets: 3,
    defaultReps: "12-15",
    defaultRest: 60,
    cues: [
      "Excelente para isolar cada perna individualmente no final do treino.",
    ],
  },
  {
    id: "cat-nordic-curl",
    name: "Flexão Nórdica / Glute-Ham Raise",
    muscleGroup: "Posterior de Coxa",
    secondaryMuscles: "Glúteos, Panturrilha",
    pattern: "rdl",
    defaultSets: 3,
    defaultReps: "6-10",
    defaultRest: 90,
    cues: [
      "Foque em segurar a descida do corpo o mais devagar possível usando a força do posterior.",
    ],
  },
  {
    id: "cat-good-morning",
    name: "Good Morning (Bom Dia com Barra)",
    muscleGroup: "Posterior de Coxa",
    secondaryMuscles: "Lombar, Glúteos",
    pattern: "rdl",
    defaultSets: 3,
    defaultReps: "8-10",
    defaultRest: 120,
    cues: [
      "Barra apoiada no trapézio; faça a dobradiça de quadril empurrando o glúteo para trás.",
    ],
  },

  // ==========================================================================
  // 6. GLÚTEOS (6 variações)
  // ==========================================================================
  {
    id: "cat-hip-thrust",
    name: "Elevação Pélvica com Barra ou Máquina (Hip Thrust)",
    muscleGroup: "Glúteos",
    secondaryMuscles: "Posterior de Coxa, Core",
    pattern: "bench",
    defaultSets: 4,
    defaultReps: "8-12",
    defaultRest: 120,
    cues: [
      "Apoie a linha inferior das escápulas no banco e mantenha o queixo próximo ao peito.",
      "No topo, as canelas devem ficar verticais (90°); segure 1s contraindo o glúteo máximo.",
    ],
  },
  {
    id: "cat-sumo-deadlift",
    name: "Levantamento Terra Sumô / Agachamento Sumô",
    muscleGroup: "Glúteos",
    secondaryMuscles: "Adutores (Interno de Coxa), Quadríceps",
    pattern: "squat",
    defaultSets: 4,
    defaultReps: "8-10",
    defaultRest: 120,
    cues: [
      "Pés afastados com pontas voltadas ~45° para fora; joelhos abrem na direção dos pés.",
    ],
  },
  {
    id: "cat-cable-kickback",
    name: "Coice na Polia Baixa (Extensão de Quadril no Cabo)",
    muscleGroup: "Glúteos",
    secondaryMuscles: "Glúteo Máximo e Médio",
    pattern: "rdl",
    defaultSets: 3,
    defaultReps: "12-15",
    defaultRest: 60,
    cues: [
      "Chute para trás e levemente na diagonal (~30°) sem arquear a coluna lombar.",
    ],
  },
  {
    id: "cat-abductor-machine",
    name: "Cadeira Abdutora",
    muscleGroup: "Glúteos",
    secondaryMuscles: "Glúteo Médio e Mínimo (Lateral do Quadril)",
    pattern: "legext",
    defaultSets: 4,
    defaultReps: "12-15",
    defaultRest: 60,
    cues: [
      "Controlar a volta sem deixar as placas baterem mantém tensão contínua no glúteo médio.",
    ],
  },
  {
    id: "cat-adductor-machine",
    name: "Cadeira Adutora (Interno de Coxa)",
    muscleGroup: "Glúteos",
    secondaryMuscles: "Adutores Magno/Longo (Volume Interno de Coxa)",
    pattern: "legext",
    defaultSets: 3,
    defaultReps: "12-15",
    defaultRest: 60,
    cues: [
      "Abra com amplitude controlada e feche esmagando por 1 segundo.",
    ],
  },
  {
    id: "cat-step-up",
    name: "Subida no Caixote / Banco (Step-up)",
    muscleGroup: "Glúteos",
    secondaryMuscles: "Quadríceps",
    pattern: "squat",
    defaultSets: 3,
    defaultReps: "10-12",
    defaultRest: 75,
    cues: [
      "Incline levemente o tronco à frente e suba usando exclusivamente a força da perna apoiada no banco.",
    ],
  },

  // ==========================================================================
  // 7. BÍCEPS (9 variações)
  // ==========================================================================
  {
    id: "cat-barbell-curl",
    name: "Rosca Direta com Barra Reta ou Barra W",
    muscleGroup: "Bíceps",
    secondaryMuscles: "Cabeça Curta e Longa do Bíceps, Antebraço",
    pattern: "curl",
    defaultSets: 4,
    defaultReps: "8-12",
    defaultRest: 75,
    cues: [
      "Cotovelos travados ao lado do tronco; suba sem impulsionar com a lombar.",
      "A barra W alivia a tensão nos punhos e antebraços.",
    ],
  },
  {
    id: "cat-alt-db-curl",
    name: "Rosca Alternada com Halteres (Com Supinação)",
    muscleGroup: "Bíceps",
    secondaryMuscles: "Bíceps Braquial, Supinador",
    pattern: "curl",
    defaultSets: 3,
    defaultReps: "8-12",
    defaultRest: 75,
    cues: [
      "Gire a palma da mão para cima (supinando o punho) conforme o halter sobe.",
    ],
  },
  {
    id: "cat-incline-db-curl",
    name: "Rosca Inclinada com Halteres (Banco 45°)",
    muscleGroup: "Bíceps",
    secondaryMuscles: "Cabeça Longa do Bíceps (Pico do Bíceps)",
    pattern: "curl",
    defaultSets: 3,
    defaultReps: "10-12",
    defaultRest: 75,
    cues: [
      "Com os braços para trás da linha do tronco, o bíceps inicia em alongamento máximo.",
      "Não jogue os cotovelos para frente ao subir.",
    ],
  },
  {
    id: "cat-preacher-curl",
    name: "Rosca Scott (Barra W, Halter ou Máquina)",
    muscleGroup: "Bíceps",
    secondaryMuscles: "Cabeça Curta do Bíceps, Braquial",
    pattern: "curl",
    defaultSets: 3,
    defaultReps: "10-12",
    defaultRest: 75,
    cues: [
      "Trava os braços no apoio impedindo qualquer roubo com o ombro.",
      "Desça de forma controlada sem soltar o peso no final.",
    ],
  },
  {
    id: "cat-hammer-curl",
    name: "Rosca Martelo (Halteres ou Corda na Polia)",
    muscleGroup: "Bíceps",
    secondaryMuscles: "Braquial e Braquiorradial (Espessura do Braço)",
    pattern: "curl",
    defaultSets: 3,
    defaultReps: "10-12",
    defaultRest: 60,
    cues: [
      "Pegada neutra o tempo todo; empurra o bíceps para cima dando aspecto mais largo ao braço.",
    ],
  },
  {
    id: "cat-concentration-curl",
    name: "Rosca Concentrada Sentado",
    muscleGroup: "Bíceps",
    secondaryMuscles: "Pico do Bíceps",
    pattern: "curl",
    defaultSets: 3,
    defaultReps: "10-12",
    defaultRest: 60,
    cues: [
      "Apoie a parte de trás do tríceps na parte interna da coxa e contraia forte no topo.",
    ],
  },
  {
    id: "cat-spider-curl",
    name: "Rosca Spider (Peito Apoiado no Banco Inclinado)",
    muscleGroup: "Bíceps",
    secondaryMuscles: "Cabeça Curta do Bíceps (Contração Máxima)",
    pattern: "curl",
    defaultSets: 3,
    defaultReps: "10-15",
    defaultRest: 60,
    cues: [
      "Braços pendurados à frente do corpo; pico de tensão no topo da repetição.",
    ],
  },
  {
    id: "cat-cable-curl",
    name: "Rosca Direta na Polia Baixa / Rosca Bayesiana",
    muscleGroup: "Bíceps",
    secondaryMuscles: "Bíceps (Tensão constante do cabo)",
    pattern: "curl",
    defaultSets: 3,
    defaultReps: "12-15",
    defaultRest: 60,
    cues: [
      "Mantém tensão uniforme em todos os ângulos da curva de força.",
    ],
  },
  {
    id: "cat-21-curl",
    name: "Rosca 21 (7 Meia Baixa + 7 Meia Alta + 7 Completas)",
    muscleGroup: "Bíceps",
    secondaryMuscles: "Estresse Metabólico de Bíceps",
    pattern: "curl",
    defaultSets: 3,
    defaultReps: "21",
    defaultRest: 90,
    cues: [
      "Excelente finalizador para pump máximo no final do treino de braços.",
    ],
  },

  // ==========================================================================
  // 8. TRÍCEPS (9 variações)
  // ==========================================================================
  {
    id: "cat-pushdown-rope",
    name: "Tríceps Pulley na Corda",
    muscleGroup: "Tríceps",
    secondaryMuscles: "Cabeça Lateral e Medial do Tríceps",
    pattern: "pushdown",
    defaultSets: 4,
    defaultReps: "10-12",
    defaultRest: 60,
    cues: [
      "Cotovelos fixos ao lado do corpo; abra a corda no final estendendo totalmente.",
    ],
  },
  {
    id: "cat-pushdown-bar",
    name: "Tríceps Pulley na Barra Reta ou Barra V",
    muscleGroup: "Tríceps",
    secondaryMuscles: "Cabeça Lateral do Tríceps",
    pattern: "pushdown",
    defaultSets: 4,
    defaultReps: "8-12",
    defaultRest: 60,
    cues: [
      "Permite usar mais carga que a corda; mantenha os ombros baixos e peito aberto.",
    ],
  },
  {
    id: "cat-skullcrusher",
    name: "Tríceps Testa com Barra W ou Halteres",
    muscleGroup: "Tríceps",
    secondaryMuscles: "Cabeça Longa e Medial do Tríceps",
    pattern: "bench",
    defaultSets: 4,
    defaultReps: "8-10",
    defaultRest: 75,
    cues: [
      "Desça a barra na direção da testa ou levemente atrás da cabeça para alongar a cabeça longa.",
    ],
  },
  {
    id: "cat-overhead-extension",
    name: "Tríceps Francês (Halter ou Corda Acima da Cabeça)",
    muscleGroup: "Tríceps",
    secondaryMuscles: "Cabeça Longa do Tríceps (A maior porção do braço)",
    pattern: "ohp",
    defaultSets: 3,
    defaultReps: "10-12",
    defaultRest: 75,
    cues: [
      "Quando o braço está elevado acima da cabeça, a cabeça longa do tríceps sofre alongamento máximo.",
    ],
  },
  {
    id: "cat-close-grip-bench",
    name: "Supino Fechado com Barra (Close-Grip Bench)",
    muscleGroup: "Tríceps",
    secondaryMuscles: "Peitoral, Deltoide Anterior",
    pattern: "bench",
    defaultSets: 3,
    defaultReps: "6-10",
    defaultRest: 90,
    cues: [
      "Pegada na largura dos ombros e cotovelos rentes às costelas durante a descida.",
    ],
  },
  {
    id: "cat-triceps-dips",
    name: "Paralelas / Mergulho no Banco (Foco Tríceps)",
    muscleGroup: "Tríceps",
    secondaryMuscles: "Peitoral Inferior, Deltoide",
    pattern: "pushdown",
    defaultSets: 3,
    defaultReps: "8-12",
    defaultRest: 90,
    cues: [
      "Mantenha o tronco o mais vertical possível e cotovelos apontados para trás.",
    ],
  },
  {
    id: "cat-kickback",
    name: "Tríceps Coice (Halter ou Polia Unilateral)",
    muscleGroup: "Tríceps",
    secondaryMuscles: "Contração de Pico do Tríceps",
    pattern: "row",
    defaultSets: 3,
    defaultReps: "12-15",
    defaultRest: 60,
    cues: [
      "Cotovelo alto paralelo ao tronco; estenda o antebraço totalmente para trás.",
    ],
  },
  {
    id: "cat-one-arm-pushdown",
    name: "Tríceps Unilateral na Polia (Pegada Supinada/Neutra)",
    muscleGroup: "Tríceps",
    secondaryMuscles: "Cabeça Medial e Lateral",
    pattern: "pushdown",
    defaultSets: 3,
    defaultReps: "12-15",
    defaultRest: 60,
    cues: [
      "Ótimo para isolar cada braço e corrigir assimetrias.",
    ],
  },
  {
    id: "cat-jm-press",
    name: "Tríceps Máquina Sentado",
    muscleGroup: "Tríceps",
    secondaryMuscles: "Tríceps Completo",
    pattern: "pushdown",
    defaultSets: 3,
    defaultReps: "10-12",
    defaultRest: 75,
    cues: [
      "Costas apoiadas; empurre até estender os cotovelos completamente.",
    ],
  },

  // ==========================================================================
  // 9. ANTEBRAÇO (5 variações)
  // ==========================================================================
  {
    id: "cat-reverse-curl",
    name: "Rosca Inversa (Barra W ou Polia Pegada Pronada)",
    muscleGroup: "Antebraço",
    secondaryMuscles: "Braquiorradial, Extensores do Punho, Bíceps",
    pattern: "curl",
    defaultSets: 3,
    defaultReps: "10-15",
    defaultRest: 60,
    cues: [
      "Palmas das mãos voltadas para baixo; mantenha os punhos firmes e retos.",
    ],
  },
  {
    id: "cat-wrist-curl",
    name: "Flexão de Punho Sentado (Barra ou Halteres)",
    muscleGroup: "Antebraço",
    secondaryMuscles: "Flexores do Antebraço (Parte Interna)",
    pattern: "curl",
    defaultSets: 3,
    defaultReps: "15-20",
    defaultRest: 45,
    cues: [
      "Apoie os antebraços nas coxas ou no banco e movimente apenas os punhos.",
    ],
  },
  {
    id: "cat-reverse-wrist-curl",
    name: "Extensão de Punho Invertida",
    muscleGroup: "Antebraço",
    secondaryMuscles: "Extensores do Antebraço (Parte Externa)",
    pattern: "curl",
    defaultSets: 3,
    defaultReps: "15-20",
    defaultRest: 45,
    cues: [
      "Fortalece os tendões do cotovelo (prevenção de epicondilite).",
    ],
  },
  {
    id: "cat-farmers-walk",
    name: "Caminhada do Fazendeiro (Farmer's Walk)",
    muscleGroup: "Antebraço",
    secondaryMuscles: "Pegada (Grip), Trapézio, Core",
    pattern: "calf",
    defaultSets: 3,
    defaultReps: "45s",
    defaultRest: 75,
    cues: [
      "Segure um par de halteres pesados ao lado do corpo e caminhe com postura ereta.",
    ],
  },
  {
    id: "cat-wrist-roller",
    name: "Rolo de Punho (Wrist Roller) / Flexão atrás das Costas",
    muscleGroup: "Antebraço",
    secondaryMuscles: "Antebraço Completo",
    pattern: "pushdown",
    defaultSets: 3,
    defaultReps: "15-20",
    defaultRest: 60,
    cues: [
      "Enrole e desenrole a carga mantendo o controle total sem soltar de vez.",
    ],
  },

  // ==========================================================================
  // 10. TRAPÉZIO (4 variações)
  // ==========================================================================
  {
    id: "cat-db-shrugs",
    name: "Encolhimento de Ombros com Halteres",
    muscleGroup: "Trapézio",
    secondaryMuscles: "Trapézio Superior, Elevador da Escápula",
    pattern: "lateral",
    defaultSets: 4,
    defaultReps: "10-15",
    defaultRest: 60,
    cues: [
      "Eleve os ombros em direção às orelhas e segure 1 a 2 segundos no topo (não fique girando o ombro).",
    ],
  },
  {
    id: "cat-barbell-shrugs",
    name: "Encolhimento com Barra (Pela Frente ou no Smith)",
    muscleGroup: "Trapézio",
    secondaryMuscles: "Trapézio Superior, Pegada",
    pattern: "lateral",
    defaultSets: 4,
    defaultReps: "8-12",
    defaultRest: 75,
    cues: [
      "Incline o tronco levemente (~10°) à frente para alinhar a puxada com as fibras do trapézio.",
    ],
  },
  {
    id: "cat-kelso-shrugs",
    name: "Encolhimento no Banco Inclinado (Trapézio Médio)",
    muscleGroup: "Trapézio",
    secondaryMuscles: "Trapézio Médio e Inferior, Romboides",
    pattern: "row",
    defaultSets: 3,
    defaultReps: "12-15",
    defaultRest: 60,
    cues: [
      "Deitado de bruços no banco inclinado, junte as escápulas sem dobrar os cotovelos.",
    ],
  },
  {
    id: "cat-cable-shrugs",
    name: "Encolhimento na Polia Baixa",
    muscleGroup: "Trapézio",
    secondaryMuscles: "Trapézio Superior e Médio",
    pattern: "lateral",
    defaultSets: 3,
    defaultReps: "12-15",
    defaultRest: 60,
    cues: [
      "A tração diagonal do cabo recruta perfeitamente as fibras transversais do trapézio.",
    ],
  },

  // ==========================================================================
  // 11. PANTURRILHA (5 variações)
  // ==========================================================================
  {
    id: "cat-standing-calf",
    name: "Panturrilha em Pé (Máquina ou Smith)",
    muscleGroup: "Panturrilha",
    secondaryMuscles: "Gastrocnêmio (Porção mais volumosa)",
    pattern: "calf",
    defaultSets: 4,
    defaultReps: "10-15",
    defaultRest: 60,
    cues: [
      "Com os joelhos estendidos, o gastrocnêmio recebe a maior parte da carga.",
      "Pause 1s alongando tudo embaixo (para tirar o reflexo elástico do tendão) e 1s no topo.",
    ],
  },
  {
    id: "cat-seated-calf",
    name: "Panturrilha Sentado (Gêmeos Sentado)",
    muscleGroup: "Panturrilha",
    secondaryMuscles: "Músculo Sóleo (Largura inferior da canela)",
    pattern: "calf",
    defaultSets: 4,
    defaultReps: "12-15",
    defaultRest: 60,
    cues: [
      "Com os joelhos dobrados a 90°, isola o músculo sóleo.",
    ],
  },
  {
    id: "cat-legpress-calf",
    name: "Panturrilha no Leg Press 45°",
    muscleGroup: "Panturrilha",
    secondaryMuscles: "Gastrocnêmio",
    pattern: "legpress",
    defaultSets: 4,
    defaultReps: "12-15",
    defaultRest: 60,
    cues: [
      "Apoie a metade anterior do pé com segurança e mantenha uma microflexão nos joelhos.",
    ],
  },
  {
    id: "cat-single-leg-calf",
    name: "Panturrilha Unilateral no Degrau com Halter",
    muscleGroup: "Panturrilha",
    secondaryMuscles: "Gastrocnêmio e Estabilizadores do Tornozelo",
    pattern: "calf",
    defaultSets: 3,
    defaultReps: "12-15",
    defaultRest: 45,
    cues: [
      "Amplitude máxima em uma perna de cada vez.",
    ],
  },
  {
    id: "cat-tibialis-raise",
    name: "Elevação Tibial (Tibial Anterior)",
    muscleGroup: "Panturrilha",
    secondaryMuscles: "Frente da Canela (Prevenção de Canelite)",
    pattern: "calf",
    defaultSets: 3,
    defaultReps: "15-20",
    defaultRest: 45,
    cues: [
      "Encoste as costas na parede e puxe a ponta dos pés para cima em direção à canela.",
    ],
  },

  // ==========================================================================
  // 12. ABDÔMEN / CORE (6 variações)
  // ==========================================================================
  {
    id: "cat-cable-crunch",
    name: "Abdominal Supra na Polia Alta (Ajoelhado com Corda)",
    muscleGroup: "Abdômen / Core",
    secondaryMuscles: "Reto Abdominal (Permite progressão de carga)",
    pattern: "pushdown",
    defaultSets: 4,
    defaultReps: "10-15",
    defaultRest: 60,
    cues: [
      "Enrole a coluna vertebral levando as costelas em direção ao umbigo (não sente nos calcanhares).",
    ],
  },
  {
    id: "cat-hanging-leg-raise",
    name: "Elevação de Pernas na Barra Fixa ou Paralela (Infra)",
    muscleGroup: "Abdômen / Core",
    secondaryMuscles: "Porção Inferior do Abdômen, Flexores do Quadril",
    pattern: "pullup",
    defaultSets: 4,
    defaultReps: "10-15",
    defaultRest: 60,
    cues: [
      "Tire a pelve para cima no final da subida para realmente contrair o reto abdominal.",
    ],
  },
  {
    id: "cat-plank",
    name: "Prancha Isométrica Abdominal",
    muscleGroup: "Abdômen / Core",
    secondaryMuscles: "Transverso do Abdômen, Core Profundo",
    pattern: "bench",
    defaultSets: 3,
    defaultReps: "60s",
    defaultRest: 60,
    cues: [
      "Contraia glúteos e puxe o umbigo para dentro mantendo a linha reta dos ombros aos tornozelos.",
    ],
  },
  {
    id: "cat-ab-wheel",
    name: "Roda Abdominal (Ab Wheel Rollout)",
    muscleGroup: "Abdômen / Core",
    secondaryMuscles: "Reto Abdominal, Grande Dorsal, Serrátil",
    pattern: "bench",
    defaultSets: 3,
    defaultReps: "8-12",
    defaultRest: 60,
    cues: [
      "Mantenha a pelve em retroversão (encaixada) para não deixar a lombar afundar.",
    ],
  },
  {
    id: "cat-russian-twist",
    name: "Abdominal Oblíquo / Russian Twist / Lenhador na Polia",
    muscleGroup: "Abdômen / Core",
    secondaryMuscles: "Oblíquos Internos e Externos",
    pattern: "row",
    defaultSets: 3,
    defaultReps: "12-15",
    defaultRest: 60,
    cues: [
      "Gire a caixa torácica controladamente trabalhando a rotação do tronco.",
    ],
  },
  {
    id: "cat-stomach-vacuum",
    name: "Stomach Vacuum (Vácuo Abdominal)",
    muscleGroup: "Abdômen / Core",
    secondaryMuscles: "Transverso do Abdômen (Afinar Linha de Cintura)",
    pattern: "calf",
    defaultSets: 4,
    defaultReps: "20s",
    defaultRest: 45,
    cues: [
      "Solte todo o ar dos pulmões e sugue o umbigo em direção à coluna vertebral segurando por 15-20s.",
      "Melhora diretamente sua proporção de V-Taper (Ombro/Cintura).",
    ],
  },
];

/**
 * Helper that finds the best matching catalog item (or synthesizes one from the muscle group)
 * so EVERY exercise—preset or custom—has an animated figure and biomechanics cues!
 */
export function resolveExerciseIllustration(
  exerciseName: string,
  muscleGroup: string
): CatalogExercise {
  const normName = exerciseName.toLowerCase();

  const exact = EXERCISE_CATALOG.find(
    (item) => item.name.toLowerCase() === normName
  );
  if (exact) return exact;

  if (normName.includes("inclinado") && !normName.includes("rosca")) {
    return EXERCISE_CATALOG.find((e) => e.id === "cat-incline-db")!;
  }
  if (
    normName.includes("crucifixo") ||
    normName.includes("peck") ||
    normName.includes("cross") ||
    normName.includes("voador")
  ) {
    return EXERCISE_CATALOG.find((e) => e.id === "cat-peck-deck")!;
  }
  if (normName.includes("supino") || normName.includes("flexão")) {
    return EXERCISE_CATALOG.find((e) => e.id === "cat-bench-barbell")!;
  }
  if (
    normName.includes("elevação lateral") ||
    normName.includes("elevação frontal") ||
    normName.includes("encolhimento")
  ) {
    return EXERCISE_CATALOG.find((e) => e.id === "cat-lat-raise-db")!;
  }
  if (
    normName.includes("desenvolvimento") ||
    normName.includes("ohp") ||
    normName.includes("arnold")
  ) {
    return EXERCISE_CATALOG.find((e) => e.id === "cat-ohp-barbell")!;
  }
  if (
    normName.includes("barra fixa") ||
    normName.includes("puxada") ||
    normName.includes("chin") ||
    normName.includes("elevação de pernas")
  ) {
    return EXERCISE_CATALOG.find((e) => e.id === "cat-pullup")!;
  }
  if (
    normName.includes("remada") ||
    normName.includes("serrote") ||
    normName.includes("cavalinho") ||
    normName.includes("face pull")
  ) {
    return EXERCISE_CATALOG.find((e) => e.id === "cat-barbell-row")!;
  }
  if (
    normName.includes("agachamento") ||
    normName.includes("afundo") ||
    normName.includes("búlgaro") ||
    normName.includes("passada") ||
    normName.includes("hack")
  ) {
    return EXERCISE_CATALOG.find((e) => e.id === "cat-squat-barbell")!;
  }
  if (normName.includes("leg press")) {
    return EXERCISE_CATALOG.find((e) => e.id === "cat-legpress-45")!;
  }
  if (
    normName.includes("extensora") ||
    normName.includes("flexora") ||
    normName.includes("abdutora") ||
    normName.includes("adutora")
  ) {
    return EXERCISE_CATALOG.find((e) => e.id === "cat-leg-extension")!;
  }
  if (
    normName.includes("stiff") ||
    normName.includes("terra") ||
    normName.includes("rdl") ||
    normName.includes("lombar") ||
    normName.includes("good morning")
  ) {
    return EXERCISE_CATALOG.find((e) => e.id === "cat-rdl-barbell")!;
  }
  if (normName.includes("rosca") || normName.includes("punho")) {
    return EXERCISE_CATALOG.find((e) => e.id === "cat-barbell-curl")!;
  }
  if (
    normName.includes("tríceps") ||
    normName.includes("triceps") ||
    normName.includes("pulley") ||
    normName.includes("pulldown") ||
    normName.includes("paralela")
  ) {
    return EXERCISE_CATALOG.find((e) => e.id === "cat-pushdown-rope")!;
  }
  if (normName.includes("panturrilha") || normName.includes("gêmeos")) {
    return EXERCISE_CATALOG.find((e) => e.id === "cat-standing-calf")!;
  }

  // Fallback by muscle group
  const byGroup = EXERCISE_CATALOG.find(
    (item) => item.muscleGroup.toLowerCase() === muscleGroup.toLowerCase()
  );
  if (byGroup) return { ...byGroup, name: exerciseName };

  return {
    ...EXERCISE_CATALOG[0],
    name: exerciseName,
    muscleGroup,
  };
}
