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

export type TechnicalDifficulty = "Baixa" | "Média" | "Alta" | "Altíssima";

export type ResistanceCurveTag =
  | "Pico no Alongamento"
  | "Pico na Contração"
  | "Tensão Constante"
  | "Curva Ascendente / Composto";

export interface CatalogExercise {
  id: string;
  name: string;
  muscleGroup: string;
  primaryTarget?: string;
  secondaryMuscles: string;
  pattern: AnimationPattern;
  defaultSets: number;
  defaultReps: string;
  defaultRest: number;
  difficulty?: TechnicalDifficulty;
  resistanceCurve?: ResistanceCurveTag;
  biomechanicalProfile?: string;
  equipmentVariations?: string;
  cues: string[];
}

export interface MuscleBiomechanicsGuide {
  title: string;
  anatomicalVisualization: string;
  goldenRule: string;
  subdivisions: string[];
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

export const MUSCLE_BIOMECHANICS_GUIDE: Record<string, MuscleBiomechanicsGuide> =
  {
    Peitoral: {
      title: "Complexo Peitoral (Adução Horizontal & Flexão)",
      anatomicalVisualization:
        "Imagine um leque de fibras: as superiores descem da clavícula para o úmero (pedem trajetória de baixo para cima a 30°–45°), as médias cruzam horizontalmente do esterno, e as inferiores sobem das costelas (pedem trajetória de cima para baixo).",
      goldenRule:
        "Combine empurradas pesadas (Supinos) para sobrecarga mecânica em alongamento com aduções em cabos/máquinas (Cross-over/Peck Deck) para manter tensão no encurtamento final.",
      subdivisions: [
        "Feixe Clavicular (Superior)",
        "Porção Esternocostal (Média)",
        "Porção Abdominal/Costal (Inferior)",
      ],
    },
    Costas: {
      title: "Complexo Dorsal (Tração Vertical, Sagital & Transversal)",
      anatomicalVisualization:
        "Para isolar o Grande Dorsal (largura V-Taper), mantenha os cotovelos rentes ao tronco puxando em direção ao quadril. Para atingir Trapézio Médio e Romboides (espessura do miolo), abra os cotovelos a 45°–90° focando em esmagar as escápulas.",
      goldenRule:
        "Um treino completo de costas precisa de 1 puxada no plano frontal (aberta), 1 puxada ou remada sagital (cotovelo fechado para dorsal inferior) e 1 remada transversal (cotovelo aberto com peito apoiado para o alto das costas).",
      subdivisions: [
        "Grande Dorsal (Largura V-Taper)",
        "Trapézio Médio/Inferior & Romboides (Espessura)",
        "Eretores da Espinha (Base Lombar)",
      ],
    },
    Ombros: {
      title: "Complexo Deltoide (3 Cabeças Independentes)",
      anatomicalVisualization:
        "Três músculos distintos abraçando a articulação: o Anterior empurra à frente, o Lateral (multipenado) abre no plano escapular (30° à frente do tronco) dando largura estética, e o Posterior puxa para trás estabilizando o manguito.",
      goldenRule:
        "Na elevação lateral, cabos vencem os halteres nos primeiros 30° (onde o músculo está alongado e a gravidade do halter é zero). Eleve no plano escapular (~20°–30° à frente) para proteger o espaço subacromial.",
      subdivisions: [
        "Deltoide Anterior (Flexão)",
        "Deltoide Lateral (Abdução / Largura)",
        "Deltoide Posterior & Manguito (Abdução Horizontal)",
      ],
    },
    Quadríceps: {
      title: "Quadríceps Femoral (Os 3 Vastos + Reto Femoral)",
      anatomicalVisualization:
        "Os três Vastos (Lateral, Medial e Intermédio) cruzam apenas o joelho e amam agachamentos profundos. Já o Reto Femoral cruza o quadril e o joelho: no agachamento ele encurta no quadril enquanto alonga no joelho (Paradoxo de Lombard).",
      goldenRule:
        "Agachamentos e Leg Press desenvolvem os Vastos de forma brutal, mas a Cadeira Extensora (ou Sissy Squat) com quadril fixo é obrigatória para hipertrofiar 100% do Reto Femoral.",
      subdivisions: [
        "Vasto Lateral (Sweep Externo)",
        "Vasto Medial Oblíquo (Gota d'água)",
        "Reto Femoral (Centro da Coxa — Biarticular)",
      ],
    },
    "Posterior de Coxa": {
      title: "Isquiotibiais (Extensão de Quadril + Flexão de Joelho)",
      anatomicalVisualization:
        "Três dos quatro ventres cruzam o quadril e o joelho (biarticulares), enquanto a cabeça curta do bíceps femoral cruza apenas o joelho. Sentar na Cadeira Flexora pré-alonga os isquiotibiais no quadril, gerando até +55% mais hipertrofia que deitado.",
      goldenRule:
        "Nunca treine posterior só com flexoras ou só com Stiff: combine 1 padrão de dobradiça de quadril (Stiff/RDL) com 1 flexão de joelho (preferencialmente Cadeira Flexora Sentado).",
      subdivisions: [
        "Semitendíneo & Semimembranoso (Porção Medial)",
        "Bíceps Femoral Cabeça Longa (Biarticular)",
        "Bíceps Femoral Cabeça Curta (Apenas Flexão de Joelho)",
      ],
    },
    Glúteos: {
      title: "Complexo Glúteo (Máximo, Médio & Mínimo)",
      anatomicalVisualization:
        "O Glúteo Máximo é o motor de potência na extensão do quadril (tanto alongado em baixo nos agachamentos/búlgaros quanto encurtado no topo da elevação pélvica). Já o Glúteo Médio/Mínimo fica na lateral superior dando o formato 'prateleira' e estabilizando a pelve.",
      goldenRule:
        "Una um exercício de pico em alongamento (Agachamento Búlgaro / Passada / RDL) + um de pico em encurtamento (Elevação Pélvica) + uma abdução (Cadeira Abdutora ou Cabo) para a região superior.",
      subdivisions: [
        "Glúteo Máximo (Projeção Posterior & Potência)",
        "Glúteo Médio (Estabilidade Pélvica & Lateral Superior)",
        "Glúteo Mínimo & Rotadores Profundos",
      ],
    },
    Bíceps: {
      title: "Flexores do Cotovelo (Bíceps, Braquial & Braquiorradial)",
      anatomicalVisualization:
        "Três andares empilhados: o Bíceps Braquial gira o punho (supinação) e dobra o braço; o Braquial fica por baixo empurrando o bíceps para cima; e o Braquiorradial domina na pegada neutra (Martelo). Mudar a posição do cotovelo muda a cabeça enfatizada.",
      goldenRule:
        "Cotovelo atrás do tronco (Rosca Inclinada / Bayesiana) alonga e foca na Cabeça Longa (pico); cotovelo à frente (Rosca Scott / Spider) foca na Cabeça Curta; pegada neutra (Martelo) foca em espessura (Braquial).",
      subdivisions: [
        "Cabeça Longa (Externa / Pico — Ombro em Extensão)",
        "Cabeça Curta (Interna — Ombro em Flexão)",
        "Músculo Braquial & Braquiorradial (Espessura)",
      ],
    },
    Tríceps: {
      title: "Tríceps Braquial (2/3 do Volume do Braço)",
      anatomicalVisualization:
        "As cabeças Lateral e Medial cruzam apenas o cotovelo e trabalham forte em qualquer empurrada ou Pulley. Já a Cabeça Longa (a maior e mais volumosa) cruza o ombro: ela só entra em alongamento máximo quando o braço sobe acima da cabeça ou à frente.",
      goldenRule:
        "Exercícios acima da cabeça (Tríceps Francês / Testa) geram até 40% mais hipertrofia na Cabeça Longa do que ficar apenas no Tríceps Pulley tradicional.",
      subdivisions: [
        "Cabeça Longa (Biarticular — Exige Ombro Elevado)",
        "Cabeça Lateral (Ferradura Externa)",
        "Cabeça Medial (Profunda — Ativa em todos os ângulos)",
      ],
    },
    Antebraço: {
      title: "Antebraço & Força de Preensão (Grip)",
      anatomicalVisualization:
        "Uma malha densa dividida em três funções: os Flexores na face interna (fecham a mão e dobram o punho para dentro), os Extensores na face externa (estabilizam o punho), e o Braquiorradial no topo externo.",
      goldenRule:
        "Trabalhe tanto a isometria pesada de preensão (Farmer's Walk / Dead Hang) quanto a flexão/extensão dinâmica de punho em altas repetições (15–20) para blindar cotovelos e punhos.",
      subdivisions: [
        "Braquiorradial (Volume Superior Externo)",
        "Flexores do Carpo (Face Anterior / Interna)",
        "Extensores do Carpo (Face Posterior — Prevenção de Lesões)",
      ],
    },
    Trapézio: {
      title: "Trapézio (Superior, Médio & Inferior)",
      anatomicalVisualization:
        "Não é só o músculo do pescoço: é um grande diamante nas costas. As fibras superiores elevam a escápula (encolhimentos), as médias retraem (juntam as escápulas nas remadas abertas) e as inferiores deprimem e estabilizam o ombro em elevações em Y.",
      goldenRule:
        "No encolhimento tradicional, incline o tronco ~10°–15° à frente e nunca gire os ombros (puxe reto para cima e levemente para trás segurando 2s no topo).",
      subdivisions: [
        "Trapézio Descendente (Superior / Pescoço)",
        "Trapézio Transverso (Médio / Densidade Escapular)",
        "Trapézio Ascendente (Inferior / Saúde Postural)",
      ],
    },
    Panturrilha: {
      title: "Tríceps Sural (Gastrocnêmio + Sóleo)",
      anatomicalVisualization:
        "O Gastrocnêmio (diamante superior) cruza o joelho e o tornozelo: só trabalha 100% com o joelho esticado (em pé). O Sóleo fica por baixo dando largura à canela e cruza apenas o tornozelo, assumindo o comando quando você dobra o joelho a 90° (sentado).",
      goldenRule:
        "O tendão de Aquiles funciona como um elástico poderoso: se você quicar rápido embaixo, o tendão faz o trabalho sozinho. Faça uma PAUSA MORTA de 2 a 3 segundos no fundo de cada repetição!",
      subdivisions: [
        "Gastrocnêmio Medial e Lateral (Joelho Estendido)",
        "Músculo Sóleo (Joelho Flexionado a 90°)",
        "Tibial Anterior (Frente da Canela — Estabilidade)",
      ],
    },
    "Abdômen / Core": {
      title: "Core 360° (Flexão Dinâmica + Anti-Movimento)",
      anatomicalVisualization:
        "Um colete pressurizado: o Reto Abdominal aproxima as costelas da pelve (ou a pelve das costelas), os Oblíquos giram e impedem rotações indesejadas, e o Transverso profundo funciona como uma cinta natural que afina a cintura.",
      goldenRule:
        "Para hipertrofiar os gomos ('six-pack'), você precisa dobrar a coluna vertebral contra carga progressiva (Polia Alta / Elevação de Pernas enrolando a pelve), não apenas mexer o quadril com a coluna reta.",
      subdivisions: [
        "Reto Abdominal Supra & Infra (Flexão Espinhal)",
        "Oblíquos Internos e Externos (Rotação & Anti-Rotação)",
        "Transverso do Abdômen (Cinta Profunda / V-Taper)",
      ],
    },
  };

export const EXERCISE_CATALOG: CatalogExercise[] = [
  // ==========================================================================
  // 1. PEITORAL (14 variações — Tabela 1 do Compêndio)
  // ==========================================================================
  {
    id: "cat-bench-barbell",
    name: "Supino Reto com Barra",
    muscleGroup: "Peitoral",
    primaryTarget: "Porção Esternocostal (Média)",
    secondaryMuscles: "Feixe Clavicular, Deltoide Anterior, Tríceps Braquial",
    pattern: "bench",
    defaultSets: 4,
    defaultReps: "6-8",
    defaultRest: 120,
    difficulty: "Média",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "Movimento multiarticular de cadeia cinética fechada relativa para as mãos. O pico de torque ocorre na fase inicial da subida (peitoral máximo alongado). Permite a maior carga absoluta do grupamento.",
    equipmentVariations: "Barra Olímpica, Máquina Smith, Supino Articulado Reto",
    cues: [
      "Mantenha as escápulas retraídas e deprimidas contra o banco.",
      "Desça a barra até tocar a linha inferior do peitoral com cotovelos a ~45°–60°.",
      "Empurre mantendo os pés firmes no chão e glúteos no banco.",
    ],
  },
  {
    id: "cat-bench-db",
    name: "Supino Reto com Halteres",
    muscleGroup: "Peitoral",
    primaryTarget: "Porção Esternocostal (Amplitude Máxima)",
    secondaryMuscles: "Deltoide Anterior, Tríceps, Manguito Rotador",
    pattern: "bench",
    defaultSets: 4,
    defaultReps: "8-10",
    defaultRest: 90,
    difficulty: "Alta",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "Libera as mãos da restrição da barra, permitindo maior estiramento na base e convergência natural no topo (adução horizontal superior). Exige maior estabilização.",
    equipmentVariations: "Halteres Livres, Cabos no Banco Reto",
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
    primaryTarget: "Feixe Clavicular (Peitoral Superior)",
    secondaryMuscles: "Deltoide Anterior, Porção Esternocostal, Tríceps",
    pattern: "incline",
    defaultSets: 4,
    defaultReps: "6-10",
    defaultRest: 120,
    difficulty: "Média",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "A inclinação de 30° a 45° alinha o vetor de empurrar com as fibras ascendentes da clavícula, maximizando o preenchimento superior do tórax.",
    equipmentVariations: "Barra Livre, Smith Inclinado, Máquina Articulada Inclinada",
    cues: [
      "Desça a barra na parte alta do peitoral (próximo à clavícula).",
      "Mantenha os cotovelos levemente apontados para frente (não 90° abertos).",
    ],
  },
  {
    id: "cat-incline-db",
    name: "Supino Inclinado com Halteres (30° a 45°)",
    muscleGroup: "Peitoral",
    primaryTarget: "Feixe Clavicular (Peitoral Superior)",
    secondaryMuscles: "Deltoide Anterior, Tríceps, Serrátil Anterior",
    pattern: "incline",
    defaultSets: 4,
    defaultReps: "8-10",
    defaultRest: 90,
    difficulty: "Alta",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "Combina o ângulo ideal de 30° para o feixe clavicular com a liberdade de rotação escapular e adução convergente dos halteres.",
    equipmentVariations: "Halteres em Banco 30° ou 45°, Polia Baixa com Banco Inclinado",
    cues: [
      "Ajuste o banco em 30° para isolar o peitoral superior sem roubar com ombro.",
      "Alongue bem as fibras peitorais na fase excêntrica.",
    ],
  },
  {
    id: "cat-decline-bench",
    name: "Supino Declinado (Barra ou Halteres)",
    muscleGroup: "Peitoral",
    primaryTarget: "Porção Abdominal / Costal (Inferior)",
    secondaryMuscles: "Porção Esternocostal, Tríceps Braquial",
    pattern: "bench",
    defaultSets: 3,
    defaultReps: "8-10",
    defaultRest: 90,
    difficulty: "Média",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "A declinação (−15° a −30°) reduz a participação do deltoide anterior e alinha o movimento com as fibras inferiores do peitoral.",
    equipmentVariations: "Barra, Halteres, Máquina Declinada Convergente",
    cues: [
      "Foco total na porção inferior do peitoral com menor estresse no ombro.",
      "Desça de forma controlada até a linha inferior do esterno.",
    ],
  },
  {
    id: "cat-chest-press-machine",
    name: "Supino Máquina / Press Convergente Articulado",
    muscleGroup: "Peitoral",
    primaryTarget: "Peitoral Maior (Consoante o Ângulo)",
    secondaryMuscles: "Tríceps Braquial, Deltoide Anterior",
    pattern: "bench",
    defaultSets: 3,
    defaultReps: "8-12",
    defaultRest: 90,
    difficulty: "Baixa",
    resistanceCurve: "Tensão Constante",
    biomechanicalProfile:
      "Braços independentes que convergem à medida que se estendem, combinando a sobrecarga pesada do supino com a adução final do crucifixo em total estabilidade.",
    equipmentVariations: "Máquinas Articuladas (Plate-Loaded / Hammer) ou Seletorizadas",
    cues: [
      "Ajuste a altura do banco para que a pegada fique na linha média do peitoral.",
      "Excelente para ir até a falha total com segurança máxima.",
    ],
  },
  {
    id: "cat-peck-deck",
    name: "Peck Deck / Voador Máquina",
    muscleGroup: "Peitoral",
    primaryTarget: "Porção Esternocostal (Miolo & Contração)",
    secondaryMuscles: "Deltoide Anterior, Coracobraquial",
    pattern: "fly",
    defaultSets: 3,
    defaultReps: "10-15",
    defaultRest: 75,
    difficulty: "Baixa",
    resistanceCurve: "Tensão Constante",
    biomechanicalProfile:
      "Isolamento puro de adução horizontal com cames/polias que mantêm o torque máximo mesmo quando as mãos se tocam no centro do peito.",
    equipmentVariations: "Peck Deck (Cotovelos Apoiados) ou Fly Machine (Mãos nas Manoplas)",
    cues: [
      "Mantenha o peito alto e as costas coladas no encosto.",
      "Segure 1–2 segundos esmagando o miolo do peito quando as hastes se encontrarem.",
    ],
  },
  {
    id: "cat-db-fly",
    name: "Crucifixo Reto ou Inclinado com Halteres",
    muscleGroup: "Peitoral",
    primaryTarget: "Porção Esternocostal (Hipertrofia por Estiramento)",
    secondaryMuscles: "Deltoide Anterior, Bíceps Braquial (Isometria)",
    pattern: "fly",
    defaultSets: 3,
    defaultReps: "10-12",
    defaultRest: 75,
    difficulty: "Alta",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "Braço de momento gigantesco na base (braços abertos) e tensão quase nula no topo. Foco cirúrgico na tensão passiva/ativa das fibras alongadas.",
    equipmentVariations: "Halteres no Banco Reto/Inclinado, Crucifixo no Cabo no Banco",
    cues: [
      "Mantenha uma leve flexão fixa nos cotovelos como se abraçasse um barril.",
      "Foque no alongamento máximo na parte baixa e suba apenas até antes de perder a tensão.",
    ],
  },
  {
    id: "cat-crossover-high",
    name: "Cross-over na Polia Alta",
    muscleGroup: "Peitoral",
    primaryTarget: "Porção Esternocostal & Inferior",
    secondaryMuscles: "Deltoide Anterior, Peitoral Menor",
    pattern: "fly",
    defaultSets: 3,
    defaultReps: "12-15",
    defaultRest: 60,
    difficulty: "Média",
    resistanceCurve: "Pico na Contração",
    biomechanicalProfile:
      "Os cabos fornecem resistência multidirecional contínua, permitindo cruzar as mãos à frente do abdômen (adução horizontal completa além da linha média).",
    equipmentVariations: "Polia Alta, Polia Média (Foco Esternal Puro)",
    cues: [
      "Incline levemente o tronco e puxe os cabos para baixo e para dentro.",
      "Cruze levemente as mãos na frente do quadril para adução completa.",
    ],
  },
  {
    id: "cat-crossover-low",
    name: "Cross-over na Polia Baixa (Ascendente)",
    muscleGroup: "Peitoral",
    primaryTarget: "Feixe Clavicular (Peitoral Superior)",
    secondaryMuscles: "Deltoide Anterior, Bíceps (Estabilizador)",
    pattern: "incline",
    defaultSets: 3,
    defaultReps: "12-15",
    defaultRest: 60,
    difficulty: "Média",
    resistanceCurve: "Tensão Constante",
    biomechanicalProfile:
      "Trajetória de baixo para cima e para dentro que acompanha perfeitamente o ângulo das fibras claviculares com tensão ininterrupta.",
    equipmentVariations: "Dupla Polia Baixa em Pé ou Sentado no Banco Inclinado",
    cues: [
      "Suba os cabos em arco unindo as mãos na altura do queixo/rosto.",
      "Isola a linha superior do peitoral com tensão contínua dos cabos.",
    ],
  },
  {
    id: "cat-chest-dips",
    name: "Paralelas (Mergulho Foco Peitoral)",
    muscleGroup: "Peitoral",
    primaryTarget: "Porção Abdominal (Inferior) & Esternocostal",
    secondaryMuscles: "Tríceps Braquial, Deltoide Anterior, Peitoral Menor",
    pattern: "bench",
    defaultSets: 3,
    defaultReps: "8-12",
    defaultRest: 90,
    difficulty: "Alta",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "Cadeia cinética fechada com forte inclinação anterior do tronco (~30°–45°). Promove estiramento extremo das fibras inferiores sob o peso corporal.",
    equipmentVariations: "Barras Paralelas, Graviton (Assistido), Paralelas com Cinturão de Carga",
    cues: [
      "Incline o tronco ~30° para frente e deixe os cotovelos abrirem levemente.",
      "Desça até sentir alongar a borda externa e inferior do peito.",
    ],
  },
  {
    id: "cat-pushups",
    name: "Flexão de Braços (Push-up)",
    muscleGroup: "Peitoral",
    primaryTarget: "Porção Esternocostal",
    secondaryMuscles: "Tríceps, Deltoide Anterior, Serrátil Anterior, Core",
    pattern: "bench",
    defaultSets: 3,
    defaultReps: "12-20",
    defaultRest: 60,
    difficulty: "Baixa",
    resistanceCurve: "Curva Ascendente / Composto",
    biomechanicalProfile:
      "Diferente do supino (onde as escápulas ficam presas), permite livre protração escapular no topo, ativando fortemente o serrátil anterior.",
    equipmentVariations: "Solo, Pés Elevados (Foco Superior), Com Elástico ou Anilha nas Costas",
    cues: [
      "Corpo reto em prancha com glúteos e abdômen contraídos.",
      "Desça até o peito quase tocar o solo e estenda totalmente no topo.",
    ],
  },
  {
    id: "cat-pullover-db",
    name: "Pullover com Halter ou Máquina",
    muscleGroup: "Peitoral",
    primaryTarget: "Peitoral Esternocostal & Grande Dorsal",
    secondaryMuscles: "Serrátil Anterior, Cabeça Longa do Tríceps, Intercostais",
    pattern: "incline",
    defaultSets: 3,
    defaultReps: "10-12",
    defaultRest: 75,
    difficulty: "Média",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "Extensão pura do ombro no plano sagital partindo de flexão máxima. Recruta as fibras peitorais nos primeiros graus de saída do alongamento profundo.",
    equipmentVariations: "Halter Transversal no Banco, Máquina Pullover (Nautilus), Barra W",
    cues: [
      "Mantenha o quadril baixo e leve o halter para trás da cabeça sentindo expandir a caixa torácica.",
      "Para focar mais no peitoral, puxe fechando os cotovelos e pare quando o halter alinhar com os olhos.",
    ],
  },

  // ==========================================================================
  // 2. COSTAS (14 variações — Tabela 2 do Compêndio)
  // ==========================================================================
  {
    id: "cat-pullup",
    name: "Barra Fixa Pronada (Pull-up)",
    muscleGroup: "Costas",
    primaryTarget: "Grande Dorsal (Fibras Superiores / Largura)",
    secondaryMuscles: "Redondo Maior, Bíceps, Braquial, Trapézio Inferior",
    pattern: "pullup",
    defaultSets: 4,
    defaultReps: "6-12",
    defaultRest: 120,
    difficulty: "Alta",
    resistanceCurve: "Curva Ascendente / Composto",
    biomechanicalProfile:
      "Cadeia cinética fechada no plano frontal (adução do ombro). Constrói a silhueta em 'V' ao recrutar intensamente o redondo maior e a porção lateral do dorsal.",
    equipmentVariations: "Peso Corporal, Graviton (Assistida), Cinturão de Carga, Elástico",
    cues: [
      "Deprima as escápulas antes de flexionar os cotovelos.",
      "Puxe até o queixo passar da barra estufando o peito.",
    ],
  },
  {
    id: "cat-chinup",
    name: "Barra Fixa Supinada / Neutra (Chin-up)",
    muscleGroup: "Costas",
    primaryTarget: "Grande Dorsal (Extensão Sagital Completa)",
    secondaryMuscles: "Bíceps Braquial (Ativação Máxima), Redondo Maior",
    pattern: "pullup",
    defaultSets: 4,
    defaultReps: "6-10",
    defaultRest: 120,
    difficulty: "Média",
    resistanceCurve: "Curva Ascendente / Composto",
    biomechanicalProfile:
      "Move os braços no plano sagital com os cotovelos à frente do tronco, colocando o bíceps em linha mecânica perfeita e alongando toda a extensão da dorsal.",
    equipmentVariations: "Pegada Supinada (Palmas p/ Você) ou Neutra Paralela",
    cues: [
      "Pegada na largura dos ombros com palmas viradas para você.",
      "Leve os cotovelos colados às costelas puxando o esterno até a barra.",
    ],
  },
  {
    id: "cat-lat-pulldown-wide",
    name: "Puxada Alta Frontal Aberta (Pulldown)",
    muscleGroup: "Costas",
    primaryTarget: "Grande Dorsal & Redondo Maior (V-Taper)",
    secondaryMuscles: "Bíceps, Romboides, Trapézio Médio/Inferior",
    pattern: "pullup",
    defaultSets: 4,
    defaultReps: "8-12",
    defaultRest: 90,
    difficulty: "Baixa",
    resistanceCurve: "Tensão Constante",
    biomechanicalProfile:
      "Versão em cadeia aberta da barra fixa com joelhos fixos sob os rolos, permitindo modular a carga exata e focar na depressão escapular.",
    equipmentVariations: "Barra Longa Pronada, Barra Romana (Pegada Neutra), Máquina Articulada",
    cues: [
      "Puxe a barra na direção da parte superior do peito inclinando levemente ~15°.",
      "Foque em puxar pelos cotovelos para baixo, não pelas mãos.",
    ],
  },
  {
    id: "cat-lat-pulldown-triangle",
    name: "Puxada Alta Fechada com Triângulo / Unilateral",
    muscleGroup: "Costas",
    primaryTarget: "Grande Dorsal (Fibras Inferiores / Iliocostais)",
    secondaryMuscles: "Bíceps, Braquiorradial, Peitoral Esternal",
    pattern: "pullup",
    defaultSets: 3,
    defaultReps: "10-12",
    defaultRest: 90,
    difficulty: "Baixa",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "Adução estreita no plano sagital que permite maior amplitude vertical no topo (estiramento) e traciona diretamente a inserção baixa da dorsal.",
    equipmentVariations: "Puxador Triângulo, Barra Supinada Fechada, Polia Alta Unilateral (Iliac Pulldown)",
    cues: [
      "Alongue tudo no topo deixando os ombros subirem de forma controlada.",
      "Traga o triângulo até encostar no osso esterno mantendo os cotovelos fechados.",
    ],
  },
  {
    id: "cat-barbell-row",
    name: "Remada Curvada com Barra (Pronada ou Supinada)",
    muscleGroup: "Costas",
    primaryTarget: "Costas Completas (Dorsal, Trapézio & Romboides)",
    secondaryMuscles: "Eretores da Espinha (Isometria), Deltoide Posterior, Bíceps",
    pattern: "row",
    defaultSets: 4,
    defaultReps: "6-10",
    defaultRest: 120,
    difficulty: "Alta",
    resistanceCurve: "Pico na Contração",
    biomechanicalProfile:
      "Tração horizontal livre com tronco inclinado a 45°–75°. Exige estabilização isométrica brutal de toda a cadeia posterior (lombar e isquiotibiais).",
    equipmentVariations: "Barra Reta Pronada (Yates Row), Supinada, Máquina Smith",
    cues: [
      "Coluna totalmente neutra, tronco inclinado a ~45°–60°.",
      "Puxe a barra em direção ao umbigo esmagando as escápulas.",
    ],
  },
  {
    id: "cat-pendlay-row",
    name: "Remada Pendlay (Barra saindo do chão)",
    muscleGroup: "Costas",
    primaryTarget: "Grande Dorsal & Romboides (Potência Explosiva)",
    secondaryMuscles: "Eretores da Espinha, Deltoide Posterior, Trapézio",
    pattern: "row",
    defaultSets: 4,
    defaultReps: "6-8",
    defaultRest: 120,
    difficulty: "Altíssima",
    resistanceCurve: "Curva Ascendente / Composto",
    biomechanicalProfile:
      "Tronco estritamente paralelo ao solo (90°). Cada repetição parte da inércia zero no chão (dead-stop), eliminando o reflexo elástico e construindo força bruta.",
    equipmentVariations: "Barra Olímpica com Anilhas Padrão a partir do Solo",
    cues: [
      "Tronco paralelo ao solo (90°); a barra descansa 100% no chão a cada repetição.",
      "Puxada explosiva até a linha inferior do peito.",
    ],
  },
  {
    id: "cat-tbar-row",
    name: "Remada Cavalinho (T-Bar Row)",
    muscleGroup: "Costas",
    primaryTarget: "Miolo das Costas (Trapézio Médio/Inferior & Romboides)",
    secondaryMuscles: "Grande Dorsal, Eretores da Espinha, Bíceps",
    pattern: "row",
    defaultSets: 4,
    defaultReps: "8-10",
    defaultRest: 120,
    difficulty: "Alta",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "O fulcro fixo da barra no chão estabiliza a trajetória angular e permite cargas altíssimas com grande alongamento protraído das escápulas na base.",
    equipmentVariations: "Cavalinho Livre (Landmine) c/ Triângulo, Máquina Cavalinho com Apoio no Peito",
    cues: [
      "Mantenha o peito aberto e joelhos semiflexionados.",
      "Deixe as escápulas abrirem na descida e contraia forte no topo.",
    ],
  },
  {
    id: "cat-seated-cable-row",
    name: "Remada Baixa Sentado na Polia",
    muscleGroup: "Costas",
    primaryTarget: "Grande Dorsal (Triângulo) ou Alto das Costas (Barra Aberta)",
    secondaryMuscles: "Romboides, Trapézio Médio, Eretores, Bíceps",
    pattern: "row",
    defaultSets: 3,
    defaultReps: "10-12",
    defaultRest: 90,
    difficulty: "Baixa",
    resistanceCurve: "Tensão Constante",
    biomechanicalProfile:
      "Resistência horizontal constante por cabo. Com triângulo fechado e cotovelos baixos foca na dorsal; com barra aberta puxada na linha do peito foca em romboides e trapézio.",
    equipmentVariations: "Triângulo Fechado, Barra Romana Aberta, Corda ou Unilateral",
    cues: [
      "Evite ficar balançando a lombar para frente e para trás.",
      "Puxe o puxador até o abdômen abrindo o peitoral.",
    ],
  },
  {
    id: "cat-one-arm-db-row",
    name: "Remada Unilateral com Halter (Serrote / Kroc Row)",
    muscleGroup: "Costas",
    primaryTarget: "Grande Dorsal Unilateral",
    secondaryMuscles: "Trapézio, Romboides, Deltoide Posterior, Core (Anti-Rotação)",
    pattern: "row",
    defaultSets: 3,
    defaultReps: "8-12",
    defaultRest: 75,
    difficulty: "Média",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "Apoio tripé no banco elimina a sobrecarga lombar e permite puxar o halter em arco de pêndulo na direção do quadril (extensão sagital pura da dorsal).",
    equipmentVariations: "Halter no Banco, Remada Unilateral na Polia Média",
    cues: [
      "Traga o halter em arco na direção do bolso da calça (quadril), não do ombro.",
      "Corrige assimetrias de força e volume entre o lado direito e esquerdo.",
    ],
  },
  {
    id: "cat-chest-supported-row",
    name: "Remada Máquina / Banco Inclinado (Apoio no Peito)",
    muscleGroup: "Costas",
    primaryTarget: "Trapézio Médio/Inferior, Romboides & Dorsal",
    secondaryMuscles: "Deltoide Posterior, Bíceps Braquial",
    pattern: "row",
    defaultSets: 3,
    defaultReps: "10-12",
    defaultRest: 90,
    difficulty: "Baixa",
    resistanceCurve: "Tensão Constante",
    biomechanicalProfile:
      "O apoio torácico anula 100% da fadiga lombar e impede qualquer roubo de tronco, canalizando todo o drive neural para a retração escapular.",
    equipmentVariations: "Máquina Articulada c/ Apoio, Dois Halteres no Banco 30°–45°",
    cues: [
      "Como o peito está apoiado, tira 100% da sobrecarga na lombar.",
      "Permite focar exclusivamente na retração escapular.",
    ],
  },
  {
    id: "cat-meadows-row",
    name: "Remada Meadows (Unilateral no Landmine)",
    muscleGroup: "Costas",
    primaryTarget: "Trapézio Médio, Romboides, Redondo Maior & Dorsal Alta",
    secondaryMuscles: "Deltoide Posterior, Braquiorradial",
    pattern: "row",
    defaultSets: 3,
    defaultReps: "8-12",
    defaultRest: 75,
    difficulty: "Alta",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "Posicionado perpendicularmente à ponta da barra Landmine com o cotovelo abduzido (~60°). Gera um estiramento transversal extremo na parte alta e lateral das costas.",
    equipmentVariations: "Barra Olímpica no Landmine / Canto da Parede (Uso de Strap recomendado)",
    cues: [
      "Posicione-se de lado para a ponta da barra e apoie o antebraço oposto no joelho.",
      "Deixe a carga alongar toda a escápula embaixo e puxe abrindo o cotovelo.",
    ],
  },
  {
    id: "cat-straight-arm-pulldown",
    name: "Pulldown na Polia Alta com Braços Estendidos",
    muscleGroup: "Costas",
    primaryTarget: "Grande Dorsal (Isolamento Puro) & Redondo Maior",
    secondaryMuscles: "Cabeça Longa do Tríceps, Peitoral Menor, Core",
    pattern: "pushdown",
    defaultSets: 3,
    defaultReps: "12-15",
    defaultRest: 60,
    difficulty: "Média",
    resistanceCurve: "Tensão Constante",
    biomechanicalProfile:
      "Único exercício que trabalha a extensão do ombro (dorsal) em isolamento monoarticular sem participação dos flexores do cotovelo (bíceps).",
    equipmentVariations: "Corda (Maior Amplitude Final), Barra Reta ou Barra W",
    cues: [
      "Braços quase retos; movimente apenas a articulação do ombro levando as mãos até a coxa.",
      "Excelente para pré-exaustão ou finalização da dorsal.",
    ],
  },
  {
    id: "cat-hyperextension",
    name: "Extensão Lombar (Banco Romano 45°)",
    muscleGroup: "Costas",
    primaryTarget: "Eretores da Espinha (Lombar) & Glúteos",
    secondaryMuscles: "Isquiotibiais",
    pattern: "rdl",
    defaultSets: 3,
    defaultReps: "10-15",
    defaultRest: 75,
    difficulty: "Baixa",
    resistanceCurve: "Pico na Contração",
    biomechanicalProfile:
      "Fortalece a cadeia extensora da coluna e quadril com baixa compressão axial sobre os discos intervertebrais.",
    equipmentVariations: "Banco Romano 45°, GHD (90°), Com Anilha Abraçada no Peito",
    cues: [
      "Suba até alinhar o tronco com as pernas sem hiperestender a coluna.",
      "Fortalece toda a base de sustentação da coluna vertebral.",
    ],
  },
  {
    id: "cat-deadlift-conventional",
    name: "Levantamento Terra Convencional (Deadlift)",
    muscleGroup: "Costas",
    primaryTarget: "Cadeia Posterior Completa (Eretores, Glúteos, Costas)",
    secondaryMuscles: "Isquiotibiais, Quadríceps, Trapézio, Antebraços",
    pattern: "rdl",
    defaultSets: 3,
    defaultReps: "5-8",
    defaultRest: 150,
    difficulty: "Altíssima",
    resistanceCurve: "Curva Ascendente / Composto",
    biomechanicalProfile:
      "O exercício de maior recrutamento sistêmico da musculação: une extensão potente de quadril e joelhos com isometria máxima de toda a musculatura dorsal e trapézio.",
    equipmentVariations: "Barra Olímpica do Chão, Rack Pull (Meio Terra), Barra Hexagonal (Trap Bar)",
    cues: [
      "Barra colada na canela, peito alto, dorsal travada ('quebre a barra') antes de tirar do chão.",
      "Empurre o chão com os pés mantendo a coluna 100% neutra.",
    ],
  },

  // ==========================================================================
  // 3. OMBROS (12 variações — Tabela 3 do Compêndio)
  // ==========================================================================
  {
    id: "cat-ohp-barbell",
    name: "Desenvolvimento Militar em Pé com Barra (OHP)",
    muscleGroup: "Ombros",
    primaryTarget: "Deltoide Anterior & Lateral",
    secondaryMuscles: "Tríceps Braquial, Feixe Clavicular, Trapézio, Core",
    pattern: "ohp",
    defaultSets: 4,
    defaultReps: "6-8",
    defaultRest: 120,
    difficulty: "Alta",
    resistanceCurve: "Curva Ascendente / Composto",
    biomechanicalProfile:
      "Empurrada vertical livre que exige forte rotação superior das escápulas (trapézio + serrátil) e estabilização rígida de todo o core e glúteos.",
    equipmentVariations: "Barra em Pé, Sentado com Barra, Máquina Smith",
    cues: [
      "Contraia glúteos e abdômen firmemente para proteger a lombar.",
      "Passe a barra próxima ao queixo e encaixe a cabeça à frente quando a barra subir.",
    ],
  },
  {
    id: "cat-ohp-db",
    name: "Desenvolvimento Sentado com Halteres",
    muscleGroup: "Ombros",
    primaryTarget: "Deltoide Anterior & Lateral",
    secondaryMuscles: "Tríceps Braquial, Trapézio Superior, Manguito Rotador",
    pattern: "ohp",
    defaultSets: 4,
    defaultReps: "8-10",
    defaultRest: 90,
    difficulty: "Média",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "Sentado com encosto a ~80° permite empurrar no plano escapular natural (~30° à frente do tronco), reduzindo o risco de impacto subacromial.",
    equipmentVariations: "Halteres Sentado, Pegada Neutra (Martelo) para Ombros Sensíveis",
    cues: [
      "Desça os halteres até a linha das orelhas/queixo com cotovelos ~30° à frente.",
      "Empurre sem bater os halteres no topo mantendo tensão contínua.",
    ],
  },
  {
    id: "cat-arnold-press",
    name: "Desenvolvimento Arnold (Arnold Press)",
    muscleGroup: "Ombros",
    primaryTarget: "Deltoide Anterior & Lateral (Tempo sob Tensão)",
    secondaryMuscles: "Tríceps Braquial, Trapézio Superior",
    pattern: "ohp",
    defaultSets: 3,
    defaultReps: "8-12",
    defaultRest: 90,
    difficulty: "Alta",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "Inicia em supinação à frente do peito (estiramento do deltoide anterior) e roda para pronação ao subir, transitando o vetor da flexão para a abdução.",
    equipmentVariations: "Halteres Sentado ou em Pé",
    cues: [
      "Comece embaixo com as palmas viradas para o rosto e gire para frente enquanto sobe.",
      "Aumenta o tempo sob tensão e trabalha todas as cabeças do deltoide.",
    ],
  },
  {
    id: "cat-shoulder-press-machine",
    name: "Desenvolvimento Máquina Articulada",
    muscleGroup: "Ombros",
    primaryTarget: "Deltoide Anterior & Lateral",
    secondaryMuscles: "Tríceps Braquial",
    pattern: "ohp",
    defaultSets: 3,
    defaultReps: "8-12",
    defaultRest: 90,
    difficulty: "Baixa",
    resistanceCurve: "Tensão Constante",
    biomechanicalProfile:
      "Remove a demanda de estabilização dos rotadores do manguito, permitindo levar o deltoide até a falha concêntrica com total segurança.",
    equipmentVariations: "Pegada Pronada Aberta ou Pegada Neutra Convergente",
    cues: [
      "Estabilidade máxima para progredir carga com segurança.",
      "Mantenha a lombar apoiada no encosto.",
    ],
  },
  {
    id: "cat-lat-raise-db",
    name: "Elevação Lateral com Halteres",
    muscleGroup: "Ombros",
    primaryTarget: "Deltoide Lateral (Largura V-Taper)",
    secondaryMuscles: "Deltoide Anterior, Supraespinhal, Trapézio Superior",
    pattern: "lateral",
    defaultSets: 4,
    defaultReps: "12-15",
    defaultRest: 60,
    difficulty: "Média",
    resistanceCurve: "Pico na Contração",
    biomechanicalProfile:
      "Torque zero na base (braços ao lado do corpo) e torque máximo a 90° de abdução. Por isso, evite descansar no fundo e controle o topo.",
    equipmentVariations: "Em Pé, Sentado (Zero Roubo), Máquina de Elevação Lateral",
    cues: [
      "Eleve no plano escapular (~20°–30° à frente do corpo) liderando pelos cotovelos.",
      "Pare na linha dos ombros para não transferir o foco para o trapézio.",
    ],
  },
  {
    id: "cat-lat-raise-cable",
    name: "Elevação Lateral na Polia Baixa (Unilateral)",
    muscleGroup: "Ombros",
    primaryTarget: "Deltoide Lateral (Hipertrofia em Alongamento)",
    secondaryMuscles: "Músculo Supraespinhal, Trapézio",
    pattern: "lateral",
    defaultSets: 4,
    defaultReps: "12-15",
    defaultRest: 60,
    difficulty: "Média",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "O padrão ouro para o deltoide lateral: diferente do halter, o cabo traciona a 90° logo nos primeiros graus embaixo (quando o músculo está alongado).",
    equipmentVariations: "Polia na Altura do Punho (Maior Estiramento) ou Polia no Tornozelo, Com Punho (Cuff)",
    cues: [
      "Posicione a polia na altura do punho/quadril para tensão máxima logo na saída.",
      "Passe o cabo por trás ou pela frente do corpo mantendo o tronco firme.",
    ],
  },
  {
    id: "cat-front-raise",
    name: "Elevação Frontal (Halteres, Corda ou Barra)",
    muscleGroup: "Ombros",
    primaryTarget: "Deltoide Anterior",
    secondaryMuscles: "Feixe Clavicular do Peitoral, Trapézio",
    pattern: "lateral",
    defaultSets: 3,
    defaultReps: "10-12",
    defaultRest: 60,
    difficulty: "Baixa",
    resistanceCurve: "Pico na Contração",
    biomechanicalProfile:
      "Isolamento puro de flexão sagital do ombro. Como o deltoide anterior já trabalha muito nos supinos, use apenas se precisar de estímulo extra localizado.",
    equipmentVariations: "Halteres Alternados, Corda na Polia Baixa, Anilha ou Barra W",
    cues: [
      "Eleve os braços à frente até a linha dos olhos sem balançar o quadril.",
      "Desça controlando o peso em 2 segundos.",
    ],
  },
  {
    id: "cat-reverse-peck-deck",
    name: "Crucifixo Inverso na Máquina (Peck Deck Invertido)",
    muscleGroup: "Ombros",
    primaryTarget: "Deltoide Posterior",
    secondaryMuscles: "Infraespinhal, Redondo Menor, Trapézio Médio",
    pattern: "fly",
    defaultSets: 4,
    defaultReps: "12-15",
    defaultRest: 60,
    difficulty: "Baixa",
    resistanceCurve: "Tensão Constante",
    biomechanicalProfile:
      "Isola a abdução horizontal transversal com peito apoiado e resistência constante do início ao fim da abertura.",
    equipmentVariations: "Peck Deck Invertido, Crucifixo Inverso Cruzado nos Cabos, Halteres no Banco Inclinado",
    cues: [
      "Empurre os braços para trás mantendo os ombros baixos (sem encolher).",
      "Pense em afastar os punhos para os lados em vez de esmagar as escápulas (para focar no deltoide e não no trapézio).",
    ],
  },
  {
    id: "cat-facepull-rope",
    name: "Face Pull na Polia Alta com Corda",
    muscleGroup: "Ombros",
    primaryTarget: "Deltoide Posterior & Manguito Rotador (Infraespinhal)",
    secondaryMuscles: "Trapézio Médio e Inferior, Romboides",
    pattern: "row",
    defaultSets: 3,
    defaultReps: "12-15",
    defaultRest: 60,
    difficulty: "Média",
    resistanceCurve: "Pico na Contração",
    biomechanicalProfile:
      "Combina abdução horizontal com rotação externa máxima do úmero a 90°. Essencial para blindar o ombro contra lesões de supino e corrigir postura.",
    equipmentVariations: "Polia Alta em Pé, Sentado no Chão ou com Duas Cordas (Maior Amplitude)",
    cues: [
      "Puxe a corda na direção da testa abrindo os polegares para trás das orelhas (pose de duplo bíceps).",
      "Indispensável para saúde articular do ombro e postura.",
    ],
  },
  {
    id: "cat-upright-row",
    name: "Remada Alta Aberta (Barra W, Halteres ou Cabo)",
    muscleGroup: "Ombros",
    primaryTarget: "Deltoide Lateral & Trapézio Superior",
    secondaryMuscles: "Deltoide Anterior, Braquiorradial, Infraespinhal",
    pattern: "pullup",
    defaultSets: 3,
    defaultReps: "10-12",
    defaultRest: 75,
    difficulty: "Média",
    resistanceCurve: "Tensão Constante",
    biomechanicalProfile:
      "Multiarticular de abdução do ombro. Usar pegada na largura dos ombros (ou mais aberta) e parar os cotovelos a 90° elimina totalmente o risco de impacto.",
    equipmentVariations: "Corda na Polia Baixa, Halteres Livres, Barra W Pegada Aberta",
    cues: [
      "Use pegada na largura dos ombros e suba apenas até os cotovelos alinharem com os ombros.",
      "Lidere o movimento pelos cotovelos apontando para os lados.",
    ],
  },
  {
    id: "cat-seated-high-row-rear-delt",
    name: "Remada Alta Sentado no Cabo para Posterior (Rear Delt Row)",
    muscleGroup: "Ombros",
    primaryTarget: "Deltoide Posterior (Sobrecarga Pesada)",
    secondaryMuscles: "Trapézio Médio, Romboides, Braquial",
    pattern: "row",
    defaultSets: 3,
    defaultReps: "10-12",
    defaultRest: 75,
    difficulty: "Média",
    resistanceCurve: "Tensão Constante",
    biomechanicalProfile:
      "Ao puxar uma barra aberta na altura do peito superior com cotovelos abduzidos a 90° e escápulas relativamente fixas, aplica carga pesada diretamente no deltoide posterior.",
    equipmentVariations: "Polia Sentado com Barra Longa ou Corda Longa, Máquina High Row",
    cues: [
      "Mantenha os cotovelos abertos na linha dos ombros (90°) durante toda a puxada.",
      "Puxe em direção à linha da clavícula focando na parte de trás do ombro.",
    ],
  },

  // ==========================================================================
  // 4. QUADRÍCEPS (11 variações — Tabela 4 do Compêndio)
  // ==========================================================================
  {
    id: "cat-squat-barbell",
    name: "Agachamento Livre com Barra (Back Squat)",
    muscleGroup: "Quadríceps",
    primaryTarget: "Vasto Lateral, Medial & Intermédio",
    secondaryMuscles: "Glúteo Máximo, Adutor Magno, Eretores da Espinha, Core",
    pattern: "squat",
    defaultSets: 4,
    defaultReps: "6-8",
    defaultRest: 150,
    difficulty: "Alta",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "Rei dos membros inferiores: torque máximo no fundo do movimento (alongamento de vastos e glúteos). Nota: o reto femoral atua pouco devido ao Paradoxo de Lombard.",
    equipmentVariations: "High Bar (Tronco Vertical / Mais Quadríceps), Low Bar (Mais Cadeia Posterior)",
    cues: [
      "Bracing abdominal firme; joelhos acompanhando a linha dos pés.",
      "Desça pelo menos até 90° mantendo a coluna neutra.",
    ],
  },
  {
    id: "cat-front-squat",
    name: "Agachamento Frontal (Front Squat)",
    muscleGroup: "Quadríceps",
    primaryTarget: "Três Vastos do Quadríceps (Ênfase Máxima)",
    secondaryMuscles: "Glúteo Máximo, Eretores Torácicos Superiores, Core",
    pattern: "squat",
    defaultSets: 4,
    defaultReps: "6-10",
    defaultRest: 150,
    difficulty: "Altíssima",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "A barra apoiada sobre as clavículas obriga o tronco a ficar quase vertical, maximizando o avanço dos joelhos à frente (dorsiflexão) e reduzindo o cisalhamento lombar.",
    equipmentVariations: "Pegada Olímpica, Pegada Cruzada, Uso de Straps na Barra",
    cues: [
      "Cotovelos apontados bem para o alto mantendo o tronco vertical.",
      "Menor inclinação na lombar e maior recrutamento direto dos quadríceps.",
    ],
  },
  {
    id: "cat-goblet-squat",
    name: "Agachamento Cálice (Goblet Squat)",
    muscleGroup: "Quadríceps",
    primaryTarget: "Vastos do Quadríceps & Glúteos",
    secondaryMuscles: "Core Anterior, Trapézio Superior, Bíceps (Isometria)",
    pattern: "squat",
    defaultSets: 3,
    defaultReps: "10-15",
    defaultRest: 90,
    difficulty: "Baixa",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "O halter/kettlebell seguro à frente do esterno funciona como contrapeso biomecânico, facilitando agachar profundo com coluna reta e calcanhares elevados.",
    equipmentVariations: "Halter Vertical, Kettlebell, Calcanhares Elevados em Anilhas (Cyclist Squat)",
    cues: [
      "Segure o halter colado ao peito e desça profundo mantendo o tronco reto.",
      "Elevar os calcanhares em duas anilhas aumenta ainda mais o foco nos quadríceps.",
    ],
  },
  {
    id: "cat-hack-squat",
    name: "Agachamento Hack (Hack Machine)",
    muscleGroup: "Quadríceps",
    primaryTarget: "Vasto Lateral, Medial & Intermédio",
    secondaryMuscles: "Glúteo Máximo",
    pattern: "squat",
    defaultSets: 4,
    defaultReps: "8-12",
    defaultRest: 120,
    difficulty: "Baixa",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "O trenó em trilhos a 45° estabiliza 100% a coluna e pelve, removendo o fator limitante da lombar e permitindo levar os quadríceps até a falha mecânica real.",
    equipmentVariations: "Hack 45° Tradicional, Hack Pêndulo (Pendulum Squat)",
    cues: [
      "Coluna 100% estabilizada no encosto permitindo descer com grande amplitude.",
      "Pés mais baixos na plataforma aumentam a flexão do joelho e foco no quadríceps.",
    ],
  },
  {
    id: "cat-smith-squat",
    name: "Agachamento no Smith (Barra Guiada)",
    muscleGroup: "Quadríceps",
    primaryTarget: "Vastos do Quadríceps (Pés à Frente = Glúteos)",
    secondaryMuscles: "Glúteo Máximo, Adutores",
    pattern: "squat",
    defaultSets: 4,
    defaultReps: "8-12",
    defaultRest: 120,
    difficulty: "Baixa",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "Como o trilho é fixo, você pode posicionar os pés levemente à frente e manter o tronco vertical como numa cadeira, isolando os quadríceps sem cair para trás.",
    equipmentVariations: "Smith Vertical ou Inclinado (7°)",
    cues: [
      "Posicione os pés levemente à frente da linha da barra.",
      "Ótima segurança para chegar próximo da falha sem perder o equilíbrio.",
    ],
  },
  {
    id: "cat-legpress-45",
    name: "Leg Press 45°",
    muscleGroup: "Quadríceps",
    primaryTarget: "Vastos do Quadríceps",
    secondaryMuscles: "Glúteo Máximo, Adutor Magno",
    pattern: "legpress",
    defaultSets: 4,
    defaultReps: "10-12",
    defaultRest: 120,
    difficulty: "Baixa",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "Cadeia fechada sem carga axial na coluna vertebral. Permite sobrecarga extrema nos vastos (pés mais baixos na plataforma = maior flexão de joelho).",
    equipmentVariations: "Leg Press 45° Linear, Leg Press Articulado, Unilateral",
    cues: [
      "Desça o máximo possível sem deixar o quadril/lombar descolar do banco.",
      "Nunca hiperestenda (trave) os joelhos no topo.",
    ],
  },
  {
    id: "cat-legpress-horizontal",
    name: "Leg Press Horizontal / Unilateral",
    muscleGroup: "Quadríceps",
    primaryTarget: "Quadríceps Unilateral & Simetria",
    secondaryMuscles: "Glúteo Máximo",
    pattern: "legpress",
    defaultSets: 3,
    defaultReps: "10-15",
    defaultRest: 90,
    difficulty: "Baixa",
    resistanceCurve: "Tensão Constante",
    biomechanicalProfile:
      "Cabos e cames da máquina horizontal mantêm resistência mais uniforme ao longo de toda a extensão do que o trilho de gravidade de 45°.",
    equipmentVariations: "Máquina Seletorizada Horizontal (Bilateral ou Unilateral)",
    cues: [
      "Excelente para fazer unilateral (uma perna de cada vez) e corrigir diferenças de força.",
    ],
  },
  {
    id: "cat-bulgarian-split-squat",
    name: "Agachamento Búlgaro (Pé Traseiro Elevado)",
    muscleGroup: "Quadríceps",
    primaryTarget: "Quadríceps (Tronco Reto) ou Glúteo (Tronco Inclinado)",
    secondaryMuscles: "Glúteo Médio (Estabilizador Pélvico), Adutor Magno",
    pattern: "squat",
    defaultSets: 3,
    defaultReps: "8-12",
    defaultRest: 90,
    difficulty: "Alta",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "Unilateral de altíssimo recrutamento: corrige déficits bilaterais e gera estiramento profundo tanto no quadríceps da frente quanto nos flexores da perna de trás.",
    equipmentVariations: "Halteres nas Mãos, No Smith (Máxima Estabilidade), Barra Livre",
    cues: [
      "Tronco mais reto e passo curto foca no quadríceps; tronco inclinado à frente foca no glúteo.",
      "Toda a força deve estar na perna da frente (a de trás é só apoio).",
    ],
  },
  {
    id: "cat-lunges",
    name: "Afundo / Passada com Halteres ou Barra",
    muscleGroup: "Quadríceps",
    primaryTarget: "Vastos do Quadríceps & Glúteo Máximo",
    secondaryMuscles: "Glúteo Médio, Isquiotibiais, Core",
    pattern: "squat",
    defaultSets: 3,
    defaultReps: "10-12",
    defaultRest: 90,
    difficulty: "Média",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "Desaceleração excêntrica e propulsão unilateral dinâmica. O afundo reverso (passo para trás) reduz o cisalhamento patelar em comparação ao passo à frente.",
    equipmentVariations: "Estático (Split Squat), Passada Caminhando, Afundo Reverso, No Smith",
    cues: [
      "Dê um passo firme e desça até o joelho de trás quase tocar o solo.",
      "Empurre o chão com a perna da frente mantendo o joelho alinhado.",
    ],
  },
  {
    id: "cat-leg-extension",
    name: "Cadeira Extensora (Bilateral ou Unilateral)",
    muscleGroup: "Quadríceps",
    primaryTarget: "Os 4 Feixes do Quadríceps (Única que isola o Reto Femoral)",
    secondaryMuscles: "Nenhum (Isolamento Puro)",
    pattern: "legext",
    defaultSets: 4,
    defaultReps: "12-15",
    defaultRest: 75,
    difficulty: "Baixa",
    resistanceCurve: "Pico na Contração",
    biomechanicalProfile:
      "Indispensável! Como o quadril permanece estático, vence o Paradoxo de Lombard dos agachamentos e recruta 100% do Reto Femoral em conjunto com os 3 Vastos.",
    equipmentVariations: "Bilateral, Unilateral, Encosto Reclinado para Trás (Maior Alongamento do Reto Femoral)",
    cues: [
      "Incline o encosto levemente para trás se possível para alongar mais o reto femoral na base.",
      "Segure 1–2 segundos no topo travando a contração máxima da coxa.",
    ],
  },
  {
    id: "cat-sissy-squat",
    name: "Agachamento Sissy (Sissy Squat / Spanish Squat)",
    muscleGroup: "Quadríceps",
    primaryTarget: "Reto Femoral & Vastos (Estiramento Extremo)",
    secondaryMuscles: "Core e Flexores do Quadril (Isometria)",
    pattern: "squat",
    defaultSets: 3,
    defaultReps: "10-15",
    defaultRest: 75,
    difficulty: "Altíssima",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "Ao manter o quadril totalmente estendido (alinhado com o tronco) enquanto os joelhos avançam ao máximo, coloca o Reto Femoral sob alongamento extremo sob carga.",
    equipmentVariations: "Banco Sissy Squat, Sissy Livre Apoiado no Rack, Spanish Squat com Elástico",
    cues: [
      "Mantenha joelhos, quadril e ombros em uma linha reta rígida enquanto inclina o corpo para trás.",
      "Vá apenas até a amplitude confortável para os tendões patelares.",
    ],
  },

  // ==========================================================================
  // 5. POSTERIOR DE COXA (9 variações — Tabela 5 do Compêndio)
  // ==========================================================================
  {
    id: "cat-rdl-barbell",
    name: "Stiff / Levantamento Terra Romeno (RDL) com Barra",
    muscleGroup: "Posterior de Coxa",
    primaryTarget: "Isquiotibiais (Semitendíneo, Semimembranoso, Bíceps Femoral Longo)",
    secondaryMuscles: "Glúteo Máximo, Adutor Magno, Eretores da Espinha",
    pattern: "rdl",
    defaultSets: 4,
    defaultReps: "6-10",
    defaultRest: 120,
    difficulty: "Alta",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "Padrão de dobradiça de quadril (Hip Hinge) puro. Promove hipertrofia mediada pelo estiramento máxima nas fibras proximais dos isquiotibiais.",
    equipmentVariations: "RDL (Joelhos ~15°–20° flexionados), Stiff (Pernas Quase Retas — Maior Alongamento)",
    cues: [
      "Joelhos semiflexionados fixos; projete o quadril todo para trás como se fosse fechar uma porta com o glúteo.",
      "Pare a descida assim que o quadril parar de ir para trás (geralmente no meio da canela).",
    ],
  },
  {
    id: "cat-rdl-db",
    name: "Stiff / RDL com Halteres (Bilateral ou B-Stance)",
    muscleGroup: "Posterior de Coxa",
    primaryTarget: "Isquiotibiais & Glúteo Máximo",
    secondaryMuscles: "Eretores da Espinha, Glúteo Médio (no B-Stance)",
    pattern: "rdl",
    defaultSets: 3,
    defaultReps: "8-12",
    defaultRest: 90,
    difficulty: "Média",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "Permite posicionar os pesos ao lado das pernas (aproximando do centro de massa) ou fazer em Base Assimétrica (B-Stance: 80% do peso na perna da frente) sem perder o equilíbrio.",
    equipmentVariations: "Bilateral com Halteres, B-Stance (Pé de trás na ponta do pé), Unilateral Apoiado",
    cues: [
      "Mantenha os halteres raspando na lateral das coxas/canelas e o peito aberto.",
      "No B-Stance, use o pé de trás apenas como rodinha de equilíbrio e concentre tudo na perna da frente.",
    ],
  },
  {
    id: "cat-seated-leg-curl",
    name: "Cadeira Flexora (Flexora Sentado)",
    muscleGroup: "Posterior de Coxa",
    primaryTarget: "Todos os 4 Ventres dos Isquiotibiais (+55% Hipertrofia)",
    secondaryMuscles: "Gastrocnêmio, Grácil, Sartório",
    pattern: "legext",
    defaultSets: 4,
    defaultReps: "10-15",
    defaultRest: 75,
    difficulty: "Baixa",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "O exercício nº 1 para hipertrofia dos posteriores segundo estudos de ressonância magnética: sentar com o quadril a 90° pré-estira os isquiotibiais biarticulares antes mesmo de dobrar o joelho!",
    equipmentVariations: "Bilateral, Unilateral, Inclinando o Tronco à Frente (Ainda Mais Estiramento)",
    cues: [
      "Trave a almofada das coxas o mais firme possível para a pelve não levantar.",
      "Incline levemente o tronco à frente no encosto para maximizar o alongamento inicial.",
    ],
  },
  {
    id: "cat-lying-leg-curl",
    name: "Mesa Flexora (Flexora Deitado)",
    muscleGroup: "Posterior de Coxa",
    primaryTarget: "Bíceps Femoral (Cabeça Curta e Longa) & Semitendíneo",
    secondaryMuscles: "Gastrocnêmio (Panturrilha)",
    pattern: "legext",
    defaultSets: 4,
    defaultReps: "10-12",
    defaultRest: 75,
    difficulty: "Baixa",
    resistanceCurve: "Pico na Contração",
    biomechanicalProfile:
      "Com o quadril estendido (deitado), as cabeças biarticulares ficam mais curtas no quadril, transferindo excelente foco para a Cabeça Curta do Bíceps Femoral e para a contração de pico.",
    equipmentVariations: "Mesa Flexora Angulada, Unilateral, Com Halter Entre os Pés",
    cues: [
      "Mantenha a pelve/quadril pressionada contra o banco durante toda a puxada (não empine o glúteo).",
      "Controle a descida em 2–3 segundos sem soltar o peso.",
    ],
  },
  {
    id: "cat-standing-leg-curl",
    name: "Flexora em Pé Unilateral",
    muscleGroup: "Posterior de Coxa",
    primaryTarget: "Bíceps Femoral & Semimembranoso (Unilateral)",
    secondaryMuscles: "Gastrocnêmio",
    pattern: "legext",
    defaultSets: 3,
    defaultReps: "12-15",
    defaultRest: 60,
    difficulty: "Baixa",
    resistanceCurve: "Pico na Contração",
    biomechanicalProfile:
      "Isolamento unilateral estrito em pé ou ajoelhado que corrige assimetrias entre perna direita e esquerda.",
    equipmentVariations: "Máquina Flexora Vertical, Polia Baixa com Tornozeleira, Ajoelhado",
    cues: [
      "Mantenha a coxa colada no apoio à frente e flexione até o máximo de contração.",
    ],
  },
  {
    id: "cat-nordic-curl",
    name: "Flexão Nórdica / Glute-Ham Raise (GHR)",
    muscleGroup: "Posterior de Coxa",
    primaryTarget: "Isquiotibiais (Sobrecarga Excêntrica Extrema)",
    secondaryMuscles: "Gastrocnêmio, Glúteo Máximo",
    pattern: "rdl",
    defaultSets: 3,
    defaultReps: "6-10",
    defaultRest: 90,
    difficulty: "Altíssima",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "Padrão ouro na prevenção de lesões de posteriores: gera tensão excêntrica supramáxima à medida que o tronco avança à frente com tornozelos fixos.",
    equipmentVariations: "Solo c/ Calcanhares Presos, Assistida com Elástico, Máquina GHD (Glute-Ham Developer)",
    cues: [
      "Mantenha o quadril reto (sem dobrar na cintura) e segure a descida o mais devagar possível.",
      "Empurre o chão levemente com as mãos embaixo se precisar de ajuda para voltar.",
    ],
  },
  {
    id: "cat-good-morning",
    name: "Good Morning (Bom Dia com Barra)",
    muscleGroup: "Posterior de Coxa",
    primaryTarget: "Isquiotibiais & Eretores da Espinha",
    secondaryMuscles: "Glúteo Máximo, Adutor Magno",
    pattern: "rdl",
    defaultSets: 3,
    defaultReps: "8-10",
    defaultRest: 120,
    difficulty: "Alta",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "Como a carga está nos ombros (distante do quadril), cria um braço de alavanca longuíssimo, exigindo menos peso absoluto na barra que o Stiff para gerar o mesmo torque no quadril.",
    equipmentVariations: "Barra Livre, Safety Squat Bar (SSB), No Smith",
    cues: [
      "Barra apoiada no trapézio; faça a dobradiça de quadril empurrando o glúteo para trás.",
      "Mantenha o bracing abdominal rígido durante todo o arco.",
    ],
  },
  {
    id: "cat-sliding-leg-curl",
    name: "Elevação Pélvica Deslizante (Sliding / Swiss Ball Leg Curl)",
    muscleGroup: "Posterior de Coxa",
    primaryTarget: "Isquiotibiais (Contração Biarticular Simultânea)",
    secondaryMuscles: "Glúteo Máximo, Core",
    pattern: "bench",
    defaultSets: 3,
    defaultReps: "10-15",
    defaultRest: 60,
    difficulty: "Alta",
    resistanceCurve: "Pico na Contração",
    biomechanicalProfile:
      "Exige que os isquiotibiais estendam o quadril E flexionem os joelhos ao mesmo tempo (contração máxima nas duas articulações).",
    equipmentVariations: "Calcanhares na Bola Suíça, Discos Deslizantes (Sliders), TRX",
    cues: [
      "Eleve o quadril em ponte e puxe os calcanhares em direção ao glúteo sem deixar o quadril cair.",
    ],
  },
  {
    id: "cat-kettlebell-swing",
    name: "Kettlebell Swing (Balanço Russo)",
    muscleGroup: "Posterior de Coxa",
    primaryTarget: "Isquiotibiais & Glúteo Máximo (Potência Balística)",
    secondaryMuscles: "Eretores da Espinha, Core, Deltoides (Estabilização)",
    pattern: "rdl",
    defaultSets: 3,
    defaultReps: "15-20",
    defaultRest: 60,
    difficulty: "Alta",
    resistanceCurve: "Curva Ascendente / Composto",
    biomechanicalProfile:
      "Ciclo alongamento-encurtamento balístico de dobradiça de quadril: desenvolve potência explosiva das fibras rápidas (Tipo II) da cadeia posterior.",
    equipmentVariations: "Kettlebell com Duas Mãos, Unilateral, Halter",
    cues: [
      "Não é um agachamento nem uma elevação frontal: o peso sobe pelo impulso explosivo do quadril para frente.",
    ],
  },

  // ==========================================================================
  // 6. GLÚTEOS (10 variações — Tabela 6 do Compêndio)
  // ==========================================================================
  {
    id: "cat-hip-thrust",
    name: "Elevação Pélvica com Barra ou Máquina (Hip Thrust)",
    muscleGroup: "Glúteos",
    primaryTarget: "Glúteo Máximo (Superior e Inferior — Pico no Encurtamento)",
    secondaryMuscles: "Isquiotibiais, Adutor Magno, Quadríceps",
    pattern: "bench",
    defaultSets: 4,
    defaultReps: "8-12",
    defaultRest: 120,
    difficulty: "Média",
    resistanceCurve: "Pico na Contração",
    biomechanicalProfile:
      "O exercício de maior ativação eletromiográfica (EMG) no encurtamento total do glúteo (0° de extensão de quadril), exatamente onde o agachamento perde tensão.",
    equipmentVariations: "Barra Livre no Banco, Máquina Hip Thrust, No Smith, Unilateral / B-Stance",
    cues: [
      "Apoie a linha inferior das escápulas no banco e mantenha o queixo colado ao peito (olhando para frente).",
      "No topo, as canelas devem ficar verticais (90°); segure 1–2s em retroversão pélvica contraindo o glúteo.",
    ],
  },
  {
    id: "cat-glute-bridge",
    name: "Ponte de Glúteos no Solo (Glute Bridge / Kas Glute Bridge)",
    muscleGroup: "Glúteos",
    primaryTarget: "Glúteo Máximo (Isolamento com Menor Quadríceps)",
    secondaryMuscles: "Isquiotibiais",
    pattern: "bench",
    defaultSets: 3,
    defaultReps: "10-15",
    defaultRest: 90,
    difficulty: "Baixa",
    resistanceCurve: "Pico na Contração",
    biomechanicalProfile:
      "Com as costas no chão (ou realizando a variação Kas nos 1/3 superiores no banco), reduz a flexão/extensão do joelho e isola puramente o encurtamento final do glúteo.",
    equipmentVariations: "Barra no Solo, Kas Glute Bridge (Curta no Topo do Banco), Com Mini-Band",
    cues: [
      "Suba apenas usando a extensão do quadril e esmague os glúteos por 2 segundos no topo.",
    ],
  },
  {
    id: "cat-sumo-deadlift",
    name: "Levantamento Terra Sumô / Agachamento Sumô",
    muscleGroup: "Glúteos",
    primaryTarget: "Glúteo Máximo & Adutores (Interno de Coxa)",
    secondaryMuscles: "Quadríceps, Isquiotibiais, Eretores da Espinha",
    pattern: "squat",
    defaultSets: 4,
    defaultReps: "8-10",
    defaultRest: 120,
    difficulty: "Alta",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "A base afastada com rotação externa dos quadris (~45°) alinha as fibras do glúteo máximo e adutor magno para uma tração potente a partir do alongamento.",
    equipmentVariations: "Barra Olímpica Sumô, Agachamento Sumô com Halter entre Steps, No Smith",
    cues: [
      "Pés afastados com pontas voltadas ~45° para fora; joelhos abrem exatamente na direção dos pés.",
    ],
  },
  {
    id: "cat-cable-kickback",
    name: "Coice na Polia Baixa (Extensão de Quadril no Cabo)",
    muscleGroup: "Glúteos",
    primaryTarget: "Glúteo Máximo (Reto) ou Glúteo Médio/Superior (Diagonal 30°)",
    secondaryMuscles: "Isquiotibiais, Glúteo da Perna de Apoio (Isometria)",
    pattern: "rdl",
    defaultSets: 3,
    defaultReps: "12-15",
    defaultRest: 60,
    difficulty: "Média",
    resistanceCurve: "Pico na Contração",
    biomechanicalProfile:
      "Isolamento unilateral em cadeia aberta. Chutar levemente na diagonal (~30° para fora) alinha o vetor exatamente com as fibras superiores do glúteo máximo e glúteo médio.",
    equipmentVariations: "Polia Baixa com Tornozeleira, Máquina de Glúteo Coice",
    cues: [
      "Chute para trás e levemente na diagonal (~30°) sem arquear a coluna lombar.",
      "Pause 1 segundo no ponto máximo atrás.",
    ],
  },
  {
    id: "cat-abductor-machine",
    name: "Cadeira Abdutora",
    muscleGroup: "Glúteos",
    primaryTarget: "Glúteo Médio, Glúteo Mínimo & Glúteo Máximo Superior",
    secondaryMuscles: "Tensor da Fáscia Lata (TFL)",
    pattern: "legext",
    defaultSets: 4,
    defaultReps: "12-15",
    defaultRest: 60,
    difficulty: "Baixa",
    resistanceCurve: "Tensão Constante",
    biomechanicalProfile:
      "Com o quadril flexionado sentado, isola os abdutores laterais (responsáveis pelo contorno arredondado superior do glúteo).",
    equipmentVariations: "Tronco Colado no Encosto (Foco Glúteo Médio) ou Levemente Inclinado à Frente (Foco Glúteo Máximo Superior)",
    cues: [
      "Controlar a volta sem deixar as placas baterem mantém tensão contínua no glúteo médio.",
    ],
  },
  {
    id: "cat-cable-hip-abduction",
    name: "Abdução de Quadril em Pé na Polia Baixa",
    muscleGroup: "Glúteos",
    primaryTarget: "Glúteo Médio & Mínimo (Estabilidade Pélvica)",
    secondaryMuscles: "Glúteo Médio da Perna de Base (Forte Isometria)",
    pattern: "lateral",
    defaultSets: 3,
    defaultReps: "12-15",
    defaultRest: 60,
    difficulty: "Média",
    resistanceCurve: "Tensão Constante",
    biomechanicalProfile:
      "A abdução com o quadril estendido (em pé) coloca o glúteo médio em sua linha de tração anatômica mais pura, sem interferência do piriforme.",
    equipmentVariations: "Polia Baixa com Tornozeleira (Passando por Trás da Perna de Apoio), Caneleira",
    cues: [
      "Eleve a perna lateralmente e ligeiramente para trás mantendo a ponta do pé voltada para frente.",
    ],
  },
  {
    id: "cat-adductor-machine",
    name: "Cadeira Adutora (Interno de Coxa)",
    muscleGroup: "Glúteos",
    primaryTarget: "Adutor Magno, Longo e Curto (Volume Medial da Coxa)",
    secondaryMuscles: "Grácil, Pectíneo",
    pattern: "legext",
    defaultSets: 3,
    defaultReps: "12-15",
    defaultRest: 60,
    difficulty: "Baixa",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "Os adutores compõem enorme volume da coxa e atuam como potentes extensores sinergistas do quadril no fundo dos agachamentos.",
    equipmentVariations: "Máquina Adutora Sentada, Adução na Polia Baixa",
    cues: [
      "Abra com amplitude controlada sentindo alongar e feche esmagando por 1 segundo.",
    ],
  },
  {
    id: "cat-step-up",
    name: "Subida no Caixote / Banco Alto (Step-up)",
    muscleGroup: "Glúteos",
    primaryTarget: "Glúteo Máximo (Alongamento Profundo Unilateral)",
    secondaryMuscles: "Quadríceps, Glúteo Médio (Estabilizador)",
    pattern: "squat",
    defaultSets: 3,
    defaultReps: "10-12",
    defaultRest: 75,
    difficulty: "Alta",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "Subir em uma caixa alta com o tronco inclinado à frente coloca o glúteo máximo em flexão profunda (>90°) sem o estresse de tração na perna de trás do Búlgaro.",
    equipmentVariations: "Segurando 1 Halter e 1 Mão Apoiada no Rack (Máxima Estabilidade), No Smith",
    cues: [
      "Incline o tronco à frente e suba usando 100% da força do calcanhar de cima (não dê impulso com o pé do chão!).",
    ],
  },
  {
    id: "cat-frog-pumps",
    name: "Frog Pumps & Clamshells (Ostra com Mini-Band)",
    muscleGroup: "Glúteos",
    primaryTarget: "Glúteo Máximo & Médio (Rotação Externa + Abdução)",
    secondaryMuscles: "Rotadores Profundos do Quadril",
    pattern: "bench",
    defaultSets: 3,
    defaultReps: "15-25",
    defaultRest: 45,
    difficulty: "Baixa",
    resistanceCurve: "Pico na Contração",
    biomechanicalProfile:
      "Ao unir as solas dos pés com joelhos abertos (abdução + rotação externa), coloca os glúteos em posição de encurtamento tridimensional máximo para estresse metabólico.",
    equipmentVariations: "Frog Pumps com Halter no Quadril, Ostra (Clamshells) Lateral com Mini-Band",
    cues: [
      "Excelente para ativação pré-treino ou burn-out finalizador de altas repetições.",
    ],
  },

  // ==========================================================================
  // 7. BÍCEPS (11 variações — Tabela 7 do Compêndio)
  // ==========================================================================
  {
    id: "cat-barbell-curl",
    name: "Rosca Direta com Barra Reta ou Barra W (EZ)",
    muscleGroup: "Bíceps",
    primaryTarget: "Bíceps Braquial (Cabeça Curta e Longa)",
    secondaryMuscles: "Braquial, Braquiorradial, Flexores do Antebraço",
    pattern: "curl",
    defaultSets: 4,
    defaultReps: "8-12",
    defaultRest: 75,
    difficulty: "Baixa",
    resistanceCurve: "Curva Ascendente / Composto",
    biomechanicalProfile:
      "A barra reta mantém supinação total (favorecendo o bíceps), enquanto a barra W coloca o punho em semi-supinação ergonômica (aliviando punhos e recrutando mais o braquial).",
    equipmentVariations: "Barra Reta (Mais Cabeça Curta), Barra W (Conforto Articular)",
    cues: [
      "Cotovelos travados ao lado do tronco; suba sem impulsionar com a lombar.",
      "Pico de tensão ocorre quando o antebraço está paralelo ao chão (90°).",
    ],
  },
  {
    id: "cat-alt-db-curl",
    name: "Rosca Alternada com Halteres (Com Supinação)",
    muscleGroup: "Bíceps",
    primaryTarget: "Bíceps Braquial (Dupla Função: Flexão + Supinação)",
    secondaryMuscles: "Braquial, Braquiorradial, Músculo Supinador",
    pattern: "curl",
    defaultSets: 3,
    defaultReps: "8-12",
    defaultRest: 75,
    difficulty: "Média",
    resistanceCurve: "Curva Ascendente / Composto",
    biomechanicalProfile:
      "Unilateral que explora as duas funções anatômicas reais do bíceps: dobrar o cotovelo e girar o rádio sobre a ulna (supinar o punho).",
    equipmentVariations: "Em Pé ou Sentado com Encosto Vertical",
    cues: [
      "Gire a palma da mão para fora (tentando apontar o mindinho para o ombro) conforme o halter sobe.",
    ],
  },
  {
    id: "cat-incline-db-curl",
    name: "Rosca Inclinada com Halteres (Banco 45° a 60°)",
    muscleGroup: "Bíceps",
    primaryTarget: "Cabeça Longa do Bíceps (Pico Externo)",
    secondaryMuscles: "Cabeça Curta do Bíceps, Braquial",
    pattern: "curl",
    defaultSets: 3,
    defaultReps: "10-12",
    defaultRest: 75,
    difficulty: "Média",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "Deitar no banco inclinado leva os ombros em hiperextensão (cotovelos atrás do tronco), esticando a Cabeça Longa sobre a cabeça do úmero para hipertrofia mediada pelo estiramento.",
    equipmentVariations: "Banco a 45° (Mais Extremo) ou 60°",
    cues: [
      "Mantenha os cotovelos apontados para o chão (não jogue os cotovelos para frente ao subir).",
      "Alongue 100% na base de cada repetição.",
    ],
  },
  {
    id: "cat-bayesian-cable-curl",
    name: "Rosca Bayesiana na Polia Baixa (De Costas para o Cabo)",
    muscleGroup: "Bíceps",
    primaryTarget: "Cabeça Longa do Bíceps (Alongamento + Tensão Contínua)",
    secondaryMuscles: "Cabeça Curta, Braquial",
    pattern: "curl",
    defaultSets: 3,
    defaultReps: "10-15",
    defaultRest: 60,
    difficulty: "Média",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "Superior à rosca inclinada com halter: ao dar um passo à frente da polia baixa, o cabo traciona o braço para trás mantendo tensão máxima exatamente no ponto de maior alongamento!",
    equipmentVariations: "Unilateral na Polia Baixa ou Dupla Polia (Cross-over)",
    cues: [
      "Dê um passo à frente para que seu braço comece atrás da linha do tronco.",
      "Flexione mantendo o cotovelo fixo atrás do corpo.",
    ],
  },
  {
    id: "cat-preacher-curl",
    name: "Rosca Scott (Barra W, Halter ou Máquina)",
    muscleGroup: "Bíceps",
    primaryTarget: "Cabeça Curta do Bíceps & Braquial (Porção Distal)",
    secondaryMuscles: "Cabeça Longa, Braquiorradial",
    pattern: "curl",
    defaultSets: 3,
    defaultReps: "10-12",
    defaultRest: 75,
    difficulty: "Baixa",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "Com os braços apoiados à frente do tronco (flexão de ombro), a cabeça longa relaxa e a carga recai pesadamente sobre a Cabeça Curta e o Braquial logo na saída do banco.",
    equipmentVariations: "Barra W no Banco Scott, Unilateral com Halter, Máquina Scott, Scott no Cabo",
    cues: [
      "Trava os tríceps no apoio impedindo qualquer roubo com o ombro.",
      "Controle muito bem o final da descida onde o braço de alavanca é máximo.",
    ],
  },
  {
    id: "cat-hammer-curl",
    name: "Rosca Martelo (Halteres ou Corda na Polia)",
    muscleGroup: "Bíceps",
    primaryTarget: "Músculo Braquial & Braquiorradial (Espessura Lateral)",
    secondaryMuscles: "Cabeça Longa do Bíceps",
    pattern: "curl",
    defaultSets: 3,
    defaultReps: "10-12",
    defaultRest: 60,
    difficulty: "Baixa",
    resistanceCurve: "Curva Ascendente / Composto",
    biomechanicalProfile:
      "A pegada neutra (polegares para cima) coloca o braquiorradial em linha mecânica direta e trabalha o braquial profundo (que empurra o bíceps para cima dando volume 3D ao braço).",
    equipmentVariations: "Halteres Simultâneos/Alternados, Martelo Cruzado (Cross-Body), Corda na Polia Baixa",
    cues: [
      "Pegada neutra o tempo todo; empurra o bíceps para cima dando aspecto mais largo ao braço.",
    ],
  },
  {
    id: "cat-concentration-curl",
    name: "Rosca Concentrada Sentado",
    muscleGroup: "Bíceps",
    primaryTarget: "Pico de Contração do Bíceps & Braquial",
    secondaryMuscles: "Braquiorradial",
    pattern: "curl",
    defaultSets: 3,
    defaultReps: "10-12",
    defaultRest: 60,
    difficulty: "Baixa",
    resistanceCurve: "Pico na Contração",
    biomechanicalProfile:
      "O apoio do úmero contra a parte interna da coxa bloqueia 100% da compensação do deltoide anterior, gerando altíssimo recrutamento EMG no encurtamento.",
    equipmentVariations: "Sentado Apoiado na Coxa, Em Pé Curvado (Estilo Arnold)",
    cues: [
      "Apoie a parte de trás do tríceps na parte interna da coxa e contraia forte no topo.",
    ],
  },
  {
    id: "cat-spider-curl",
    name: "Rosca Spider (Peito Apoiado no Banco Inclinado)",
    muscleGroup: "Bíceps",
    primaryTarget: "Cabeça Curta do Bíceps (Pico no Encurtamento)",
    secondaryMuscles: "Cabeça Longa, Braquial",
    pattern: "curl",
    defaultSets: 3,
    defaultReps: "10-15",
    defaultRest: 60,
    difficulty: "Baixa",
    resistanceCurve: "Pico na Contração",
    biomechanicalProfile:
      "Oposto da rosca Scott: com o peito apoiado no banco e braços pendurados na vertical, o torque máximo da gravidade ocorre no TOPO da repetição (esmagamento máximo).",
    equipmentVariations: "Barra W, Halteres com Supinação",
    cues: [
      "Segure 1–2 segundos no topo da repetição onde o peso está mais pesado.",
    ],
  },
  {
    id: "cat-cable-curl",
    name: "Rosca Direta na Polia Baixa / Crucifixo Bíceps no Cabo Alto",
    muscleGroup: "Bíceps",
    primaryTarget: "Bíceps Completo (Tensão Constante)",
    secondaryMuscles: "Braquial, Antebraço",
    pattern: "curl",
    defaultSets: 3,
    defaultReps: "12-15",
    defaultRest: 60,
    difficulty: "Baixa",
    resistanceCurve: "Tensão Constante",
    biomechanicalProfile:
      "O cabo elimina os 'pontos mortos' dos pesos livres (embaixo e no topo), mantendo tensão mecânica ininterrupta durante os 130° de flexão.",
    equipmentVariations: "Polia Baixa c/ Barra Reta/W, Duplo Bíceps na Polia Alta (Crucifixo Bíceps)",
    cues: [
      "Mantém tensão uniforme em todos os ângulos da curva de força.",
    ],
  },
  {
    id: "cat-zottman-curl",
    name: "Rosca Zottman com Halteres",
    muscleGroup: "Bíceps",
    primaryTarget: "Bíceps (Subida Supinada) + Antebraço (Descida Pronada)",
    secondaryMuscles: "Braquiorradial, Braquial, Extensores do Punho",
    pattern: "curl",
    defaultSets: 3,
    defaultReps: "10-12",
    defaultRest: 60,
    difficulty: "Média",
    resistanceCurve: "Curva Ascendente / Composto",
    biomechanicalProfile:
      "Exercício híbrido genial: você sobe em supinação (usando a força máxima do bíceps), gira as palmas para baixo no topo e desce devagar em pronação (sobrecarregando excentricamente o antebraço e braquiorradial).",
    equipmentVariations: "Halteres em Pé ou Sentado",
    cues: [
      "Suba com as palmas para cima, gire os punhos no topo (palmas para baixo) e desça em 3 segundos.",
    ],
  },
  {
    id: "cat-21-curl",
    name: "Rosca 21 (7 Meia Baixa + 7 Meia Alta + 7 Completas)",
    muscleGroup: "Bíceps",
    primaryTarget: "Estresse Metabólico & Oclusão Vascular do Bíceps",
    secondaryMuscles: "Braquial, Antebraço",
    pattern: "curl",
    defaultSets: 3,
    defaultReps: "21",
    defaultRest: 90,
    difficulty: "Média",
    resistanceCurve: "Tensão Constante",
    biomechanicalProfile:
      "Divide a curva de força em 3 zonas sem descanso, gerando alto acúmulo de metabólitos e recrutamento de todas as unidades motoras por fadiga.",
    equipmentVariations: "Barra W, Barra Reta ou Polia Baixa",
    cues: [
      "Excelente finalizador para pump máximo no final do treino de braços.",
    ],
  },

  // ==========================================================================
  // 8. TRÍCEPS (11 variações — Tabela 8 do Compêndio)
  // ==========================================================================
  {
    id: "cat-pushdown-rope",
    name: "Tríceps Pulley na Corda",
    muscleGroup: "Tríceps",
    primaryTarget: "Cabeça Lateral & Medial do Tríceps",
    secondaryMuscles: "Cabeça Longa, Ancôneo",
    pattern: "pushdown",
    defaultSets: 4,
    defaultReps: "10-12",
    defaultRest: 60,
    difficulty: "Baixa",
    resistanceCurve: "Pico na Contração",
    biomechanicalProfile:
      "Com os braços ao lado do tronco, a Cabeça Lateral (ferradura externa) e Medial dominam. Abrir a corda no final permite estender o cotovelo além da linha das coxas.",
    equipmentVariations: "Uma Corda ou Duas Cordas (Para não limitar a abertura final)",
    cues: [
      "Cotovelos fixos ao lado do corpo; abra a corda no final estendendo totalmente.",
    ],
  },
  {
    id: "cat-pushdown-bar",
    name: "Tríceps Pulley na Barra Reta ou Barra V",
    muscleGroup: "Tríceps",
    primaryTarget: "Cabeça Lateral & Medial (Sobrecarga de Carga)",
    secondaryMuscles: "Cabeça Longa, Peitoral Menor (Estabilizador)",
    pattern: "pushdown",
    defaultSets: 4,
    defaultReps: "8-12",
    defaultRest: 60,
    difficulty: "Baixa",
    resistanceCurve: "Tensão Constante",
    biomechanicalProfile:
      "A barra rígida une a força dos dois braços e elimina a fadiga dos extensores do punho da corda, permitindo empurrar cargas significativamente maiores.",
    equipmentVariations: "Barra Reta, Barra W, Barra V (Triângulo Aberto)",
    cues: [
      "Permite usar mais carga que a corda; mantenha os ombros baixos e peito aberto.",
    ],
  },
  {
    id: "cat-skullcrusher",
    name: "Tríceps Testa com Barra W, Halteres ou Cabo",
    muscleGroup: "Tríceps",
    primaryTarget: "Cabeça Longa & Medial do Tríceps",
    secondaryMuscles: "Cabeça Lateral",
    pattern: "bench",
    defaultSets: 4,
    defaultReps: "8-10",
    defaultRest: 75,
    difficulty: "Média",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "Ombros flexionados a 90°–110° pré-estiram a Cabeça Longa. Apontar os braços levemente para trás da cabeça (em vez de 90° retos) mantém tensão no topo!",
    equipmentVariations: "Barra W no Banco Reto/Inclinado, Halteres Neutros, Na Polia Baixa",
    cues: [
      "Desça a barra na direção da testa ou atrás da cabeça mantendo os cotovelos apontados levemente para trás.",
    ],
  },
  {
    id: "cat-overhead-extension",
    name: "Tríceps Francês Acima da Cabeça (Corda ou Halter)",
    muscleGroup: "Tríceps",
    primaryTarget: "Cabeça Longa do Tríceps (+40% Hipertrofia)",
    secondaryMuscles: "Cabeça Medial e Lateral",
    pattern: "ohp",
    defaultSets: 3,
    defaultReps: "10-12",
    defaultRest: 75,
    difficulty: "Média",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "O exercício nº 1 para o volume total do braço: elevar o úmero acima da cabeça coloca a Cabeça Longa (a maior porção do tríceps) em estiramento máximo sob carga.",
    equipmentVariations: "Corda na Polia (De Costas para o Aparelho), Halter com Duas Mãos Sentado, Unilateral",
    cues: [
      "Deixe os antebraços descerem bem atrás da cabeça sentindo rasgar a parte interna/traseira do tríceps.",
    ],
  },
  {
    id: "cat-close-grip-bench",
    name: "Supino Fechado com Barra (Close-Grip Bench)",
    muscleGroup: "Tríceps",
    primaryTarget: "Tríceps Completo (Sobrecarga Mecânica Máxima)",
    secondaryMuscles: "Peitoral Esternocostal, Deltoide Anterior",
    pattern: "bench",
    defaultSets: 3,
    defaultReps: "6-10",
    defaultRest: 90,
    difficulty: "Média",
    resistanceCurve: "Curva Ascendente / Composto",
    biomechanicalProfile:
      "Pegada na largura dos ombros com cotovelos colados às costelas maximiza a flexão/extensão sagital do cotovelo com cargas pesadas.",
    equipmentVariations: "Barra Reta, Barra W, Máquina Smith",
    cues: [
      "Use pegada na largura dos ombros (não precisa colar as mãos, o que machuca o punho) e mantenha os cotovelos rentes ao tronco.",
    ],
  },
  {
    id: "cat-jm-press",
    name: "JM Press (Híbrido Supino Fechado + Tríceps Testa)",
    muscleGroup: "Tríceps",
    primaryTarget: "Cabeça Lateral & Medial (Força Extrema)",
    secondaryMuscles: "Cabeça Longa, Deltoide Anterior",
    pattern: "bench",
    defaultSets: 3,
    defaultReps: "6-10",
    defaultRest: 90,
    difficulty: "Altíssima",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "Criado pelo powerlifter JM Blakley: a barra desce em linha reta na direção do pescoço/queixo enquanto os cotovelos avançam, gerando flexão extrema dos cotovelos com carga alta.",
    equipmentVariations: "Máquina Smith (Mais Seguro), Barra Livre",
    cues: [
      "Desça a barra em direção ao queixo/pescoço dobrando ao máximo os cotovelos e pare a 5 cm do rosto antes de explodir para cima.",
    ],
  },
  {
    id: "cat-triceps-dips",
    name: "Paralelas / Mergulho Máquina (Foco Tríceps)",
    muscleGroup: "Tríceps",
    primaryTarget: "Tríceps Completo (Cabeças Lateral e Medial)",
    secondaryMuscles: "Peitoral Inferior, Deltoide Anterior",
    pattern: "pushdown",
    defaultSets: 3,
    defaultReps: "8-12",
    defaultRest: 90,
    difficulty: "Média",
    resistanceCurve: "Curva Ascendente / Composto",
    biomechanicalProfile:
      "Manter o tronco vertical e os cotovelos apontados para trás minimiza a ação do peitoral e transforma as paralelas em um agachamento para os tríceps.",
    equipmentVariations: "Paralelas Verticais, Máquina de Tríceps Sentado (Dip Machine), Mergulho no Banco",
    cues: [
      "Mantenha o tronco o mais vertical possível e cotovelos apontados para trás.",
    ],
  },
  {
    id: "cat-kickback",
    name: "Tríceps Coice na Polia ou Halter (Kickback)",
    muscleGroup: "Tríceps",
    primaryTarget: "Cabeça Longa do Tríceps (Encurtamento Total)",
    secondaryMuscles: "Cabeça Lateral e Medial, Deltoide Posterior (Isometria)",
    pattern: "row",
    defaultSets: 3,
    defaultReps: "12-15",
    defaultRest: 60,
    difficulty: "Média",
    resistanceCurve: "Pico na Contração",
    biomechanicalProfile:
      "Único exercício que coloca a Cabeça Longa em encurtamento total simultâneo (ombro em hiperextensão para trás + cotovelo estendido a 0°).",
    equipmentVariations: "Polia Baixa sem Puxador (Segurando na Bolinha do Cabo), Halter no Banco",
    cues: [
      "Cotovelo alto travado paralelo ao tronco; estenda o braço todo para trás e segure 1s.",
    ],
  },
  {
    id: "cat-one-arm-pushdown",
    name: "Tríceps Unilateral / Pulley Inverso (Pegada Supinada)",
    muscleGroup: "Tríceps",
    primaryTarget: "Cabeça Medial & Lateral (Unilateral / Simetria)",
    secondaryMuscles: "Extensores do Carpo (na pegada supinada)",
    pattern: "pushdown",
    defaultSets: 3,
    defaultReps: "12-15",
    defaultRest: 60,
    difficulty: "Baixa",
    resistanceCurve: "Tensão Constante",
    biomechanicalProfile:
      "Permite alinhar perfeitamente o cabo com o plano escapular de cada braço (Cross-Body Pushdown) ou usar pegada supinada para enfatizar a porção distal.",
    equipmentVariations: "Manopla Unilateral, Pegada Supinada (Inversa), Cross-Body Duplo nos Cabos",
    cues: [
      "Ótimo para isolar cada braço e corrigir assimetrias sem estresse nos punhos.",
    ],
  },

  // ==========================================================================
  // 9. ANTEBRAÇO (7 variações — Tabela 9 do Compêndio)
  // ==========================================================================
  {
    id: "cat-reverse-curl",
    name: "Rosca Inversa (Barra W, Barra Reta ou Polia Pronada)",
    muscleGroup: "Antebraço",
    primaryTarget: "Braquiorradial & Extensores do Carpo",
    secondaryMuscles: "Músculo Braquial, Bíceps Braquial",
    pattern: "curl",
    defaultSets: 3,
    defaultReps: "10-15",
    defaultRest: 60,
    difficulty: "Baixa",
    resistanceCurve: "Curva Ascendente / Composto",
    biomechanicalProfile:
      "A pronação completa enrola o tendão do bíceps ao redor do rádio, reduzindo sua vantagem mecânica e forçando o Braquiorradial e o Braquial a assumirem a carga.",
    equipmentVariations: "Barra W (Menos Estresse no Punho), Barra Reta, Polia Baixa",
    cues: [
      "Palmas das mãos voltadas para baixo; mantenha os punhos firmes e retos (sem deixar dobrar).",
    ],
  },
  {
    id: "cat-wrist-curl",
    name: "Flexão de Punho Sentado ou Atrás das Costas",
    muscleGroup: "Antebraço",
    primaryTarget: "Flexores do Antebraço (Face Interna / Ventre Volumoso)",
    secondaryMuscles: "Flexores Profundos dos Dedos",
    pattern: "curl",
    defaultSets: 3,
    defaultReps: "15-20",
    defaultRest: 45,
    difficulty: "Baixa",
    resistanceCurve: "Pico na Contração",
    biomechanicalProfile:
      "Isolamento direto da massa muscular anterior do antebraço. Deixar a barra rolar até a ponta dos dedos na descida adiciona trabalho dos flexores dos dedos.",
    equipmentVariations: "Sentado Apoiado nos Joelhos/Banco, Em Pé com Barra Atrás dos Glúteos, Na Polia",
    cues: [
      "Deixe a barra descer até os dedos quase abrirem e enrole o punho ao máximo para cima.",
    ],
  },
  {
    id: "cat-reverse-wrist-curl",
    name: "Extensão de Punho Invertida (Halter ou Barra)",
    muscleGroup: "Antebraço",
    primaryTarget: "Extensores Radiais e Ulnares do Carpo (Face Externa)",
    secondaryMuscles: "Extensor dos Dedos",
    pattern: "curl",
    defaultSets: 3,
    defaultReps: "15-20",
    defaultRest: 45,
    difficulty: "Baixa",
    resistanceCurve: "Pico na Contração",
    biomechanicalProfile:
      "Fortalece a musculatura extensora e o tendão comum lateral do cotovelo, sendo a melhor proteção contra epicondilite lateral ('cotovelo de tenista').",
    equipmentVariations: "Halteres Unilaterais Apoiados no Banco, Barra Leve, Polia Baixa",
    cues: [
      "Use cargas leves a moderadas e foque na amplitude máxima de subida do dorso da mão.",
    ],
  },
  {
    id: "cat-farmers-walk",
    name: "Caminhada do Fazendeiro (Farmer's Walk)",
    muscleGroup: "Antebraço",
    primaryTarget: "Força de Preensão (Crush & Support Grip) + Trapézio",
    secondaryMuscles: "Core 360° (Oblíquos/Quadrado Lombar), Glúteo Médio, Panturrilhas",
    pattern: "calf",
    defaultSets: 3,
    defaultReps: "45s",
    defaultRest: 75,
    difficulty: "Média",
    resistanceCurve: "Tensão Constante",
    biomechanicalProfile:
      "Contração isométrica máxima dos flexores dos dedos sob carga dinâmica, somada à estabilização escapular pesada do trapézio superior.",
    equipmentVariations: "Halteres Pesados, Kettlebells, Trap Bar (Barra Hexagonal)",
    cues: [
      "Peito estufado, ombros firmes (não deixe os ombros despencarem) e passos curtos e firmes.",
    ],
  },
  {
    id: "cat-dead-hang",
    name: "Suspensão Isométrica na Barra Fixa (Dead Hang)",
    muscleGroup: "Antebraço",
    primaryTarget: "Flexores Profundos dos Dedos & Descompressão Vertebral",
    secondaryMuscles: "Alongamento Passivo de Dorsal e Peitoral, Manguito",
    pattern: "pullup",
    defaultSets: 3,
    defaultReps: "45-60s",
    defaultRest: 60,
    difficulty: "Baixa",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "Desenvolve resistência isométrica extrema de pegada enquanto promove descompressão axial da coluna vertebral e remodelamento do espaço subacromial do ombro.",
    equipmentVariations: "Duas Mãos na Barra Fixa, Com Toalha (Pegada Grossa), Unilateral",
    cues: [
      "Segure firme com o polegar envolvendo a barra e respire fundo mantendo o abdômen levemente ativo.",
    ],
  },
  {
    id: "cat-wrist-roller",
    name: "Rolo de Punho (Wrist Roller) & Hand Grip Crushers",
    muscleGroup: "Antebraço",
    primaryTarget: "Antebraço Completo (Flexores + Extensores em Oclusão)",
    secondaryMuscles: "Deltoide Anterior (Isometria no Rolo)",
    pattern: "pushdown",
    defaultSets: 3,
    defaultReps: "15-20",
    defaultRest: 60,
    difficulty: "Baixa",
    resistanceCurve: "Tensão Constante",
    biomechanicalProfile:
      "Gera estresse metabólico intenso sem impacto articular, trabalhando tanto o enrolamento concêntrico quanto a frenagem excêntrica.",
    equipmentVariations: "Bastão com Corda e Anilha, Hand Grip de Mola (Captains of Crush), Pinça de Anilha (Pinch Grip)",
    cues: [
      "Enrole e desenrole a carga mantendo o controle total de cada giro do punho.",
    ],
  },

  // ==========================================================================
  // 10. TRAPÉZIO (6 variações — Tabela 10 do Compêndio)
  // ==========================================================================
  {
    id: "cat-db-shrugs",
    name: "Encolhimento de Ombros com Halteres",
    muscleGroup: "Trapézio",
    primaryTarget: "Trapézio Superior (Fibras Descendentes) & Elevador da Escápula",
    secondaryMuscles: "Trapézio Médio, Antebraços (Pegada)",
    pattern: "lateral",
    defaultSets: 4,
    defaultReps: "10-15",
    defaultRest: 60,
    difficulty: "Baixa",
    resistanceCurve: "Pico na Contração",
    biomechanicalProfile:
      "Os halteres ao lado do corpo alinham o movimento perfeitamente com o centro de massa, permitindo elevar e retrair levemente as escápulas sem raspar na coxa.",
    equipmentVariations: "Em Pé com Halteres, Sentado, Na Máquina de Panturrilha em Pé",
    cues: [
      "Eleve os ombros em direção às orelhas e segure 2 segundos no topo (NUNCA fique girando os ombros).",
    ],
  },
  {
    id: "cat-barbell-shrugs",
    name: "Encolhimento com Barra (Livre, Smith ou Trap Bar)",
    muscleGroup: "Trapézio",
    primaryTarget: "Trapézio Superior & Médio (Sobrecarga Máxima)",
    secondaryMuscles: "Elevador da Escápula, Romboides",
    pattern: "lateral",
    defaultSets: 4,
    defaultReps: "8-12",
    defaultRest: 75,
    difficulty: "Baixa",
    resistanceCurve: "Pico na Contração",
    biomechanicalProfile:
      "Inclinar o tronco ~10°–15° à frente alinha o vetor vertical da gravidade exatamente com a orientação diagonal das fibras superiores-médias do trapézio.",
    equipmentVariations: "Barra Livre (Use Straps para não falhar a mão antes do trapézio!), Smith, Barra Hexagonal",
    cues: [
      "Incline o tronco ~10° à frente e puxe os ombros para cima e levemente para trás.",
    ],
  },
  {
    id: "cat-kelso-shrugs",
    name: "Encolhimento no Banco Inclinado (Kelso Shrug — Trapézio Médio)",
    muscleGroup: "Trapézio",
    primaryTarget: "Trapézio Médio (Fibras Transversais) & Romboides",
    secondaryMuscles: "Trapézio Inferior",
    pattern: "row",
    defaultSets: 3,
    defaultReps: "12-15",
    defaultRest: 60,
    difficulty: "Baixa",
    resistanceCurve: "Pico na Contração",
    biomechanicalProfile:
      "Deitado de bruços no banco a 30°–45° com braços esticados: realiza-se apenas a retração pura das escápulas (juntar as costas) sem dobrar os cotovelos.",
    equipmentVariations: "Halteres no Banco Inclinado, Na Máquina de Remada Apoiada",
    cues: [
      "Deixe os ombros caírem à frente alongando tudo e depois esmague uma escápula contra a outra por 2s.",
    ],
  },
  {
    id: "cat-cable-shrugs",
    name: "Encolhimento na Polia Baixa (Vetor Diagonal)",
    muscleGroup: "Trapézio",
    primaryTarget: "Trapézio Superior & Médio",
    secondaryMuscles: "Romboides",
    pattern: "lateral",
    defaultSets: 3,
    defaultReps: "12-15",
    defaultRest: 60,
    difficulty: "Baixa",
    resistanceCurve: "Tensão Constante",
    biomechanicalProfile:
      "Dar um passo para trás da polia baixa cria uma linha de tração diagonal (45°) que casa perfeitamente com a anatomia real do trapézio.",
    equipmentVariations: "Barra Reta ou Corda na Polia Baixa, Duplo Cabo Cruzado",
    cues: [
      "Puxe os ombros para cima e para trás ao mesmo tempo, acompanhando o ângulo do cabo.",
    ],
  },
  {
    id: "cat-y-raise-lower-trap",
    name: "Elevação em Y no Banco Inclinado ou Cabo (Prone Y-Raise)",
    muscleGroup: "Trapézio",
    primaryTarget: "Trapézio Inferior (Fibras Ascendentes)",
    secondaryMuscles: "Deltoide Posterior, Serrátil Anterior, Manguito",
    pattern: "ohp",
    defaultSets: 3,
    defaultReps: "12-15",
    defaultRest: 60,
    difficulty: "Média",
    resistanceCurve: "Pico na Contração",
    biomechanicalProfile:
      "Elevar os braços formando a letra 'Y' (~135° de abdução com polegares para cima) alinha o úmero exatamente com as fibras ascendentes do Trapézio Inferior — fundamental para estabilidade escapular.",
    equipmentVariations: "Halteres Leves no Banco 30°–45°, Cabos Cruzados na Polia Baixa",
    cues: [
      "Use cargas bem leves! Mantenha os ombros longe das orelhas (deprimidos) e suba os braços em formato de 'Y'.",
    ],
  },

  // ==========================================================================
  // 11. PANTURRILHA (6 variações — Tabela 11 do Compêndio)
  // ==========================================================================
  {
    id: "cat-standing-calf",
    name: "Panturrilha em Pé (Máquina ou Smith)",
    muscleGroup: "Panturrilha",
    primaryTarget: "Gastrocnêmio (Cabeças Medial e Lateral — Volume Superior)",
    secondaryMuscles: "Músculo Sóleo",
    pattern: "calf",
    defaultSets: 4,
    defaultReps: "10-15",
    defaultRest: 60,
    difficulty: "Baixa",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "Com o joelho estendido (180°), o gastrocnêmio biarticular fica totalmente esticado e recebe a maior sobrecarga. Obrigatório pausar embaixo para dissipar a energia elástica do tendão de Aquiles!",
    equipmentVariations: "Máquina em Pé, No Smith sobre Step, Hack Machine",
    cues: [
      "REGRA DE OURO: Faça uma pausa morta de 2 a 3 segundos lá embaixo no alongamento máximo de cada repetição (sem quicar!).",
      "Suba o máximo possível na ponta do dedão.",
    ],
  },
  {
    id: "cat-seated-calf",
    name: "Panturrilha Sentado (Gêmeos Sentado)",
    muscleGroup: "Panturrilha",
    primaryTarget: "Músculo Sóleo (Largura Inferior da Canela)",
    secondaryMuscles: "Gastrocnêmio (Ativação Mínima)",
    pattern: "calf",
    defaultSets: 4,
    defaultReps: "12-15",
    defaultRest: 60,
    difficulty: "Baixa",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "Dobrar os joelhos a 90° coloca o gastrocnêmio em insuficiência ativa (frouxo), obrigando o músculo Sóleo (monoarticular) a fazer quase 100% do trabalho.",
    equipmentVariations: "Máquina Sentada de Panturrilha, Barra/Halteres sobre os Joelhos com Step",
    cues: [
      "Pause 2 segundos no fundo alongando tudo e suba contraindo forte por 1 segundo.",
    ],
  },
  {
    id: "cat-legpress-calf",
    name: "Panturrilha no Leg Press 45°",
    muscleGroup: "Panturrilha",
    primaryTarget: "Gastrocnêmio (Alto Estiramento por Flexão de Quadril)",
    secondaryMuscles: "Músculo Sóleo",
    pattern: "legpress",
    defaultSets: 4,
    defaultReps: "10-15",
    defaultRest: 60,
    difficulty: "Baixa",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "Combina joelhos estendidos com quadris flexionados a 90°, gerando excelente tensão na cadeia fascial posterior sem carga axial sobre a coluna vertebral.",
    equipmentVariations: "Leg Press 45° ou Leg Press Horizontal (Bilateral ou Unilateral)",
    cues: [
      "Apoie o metatarso (bola do pé) com firmeza, mantenha uma microflexão destravada nos joelhos e pause 2s no alongamento.",
    ],
  },
  {
    id: "cat-donkey-calf-raise",
    name: "Panturrilha Burrinho (Donkey Calf Raise)",
    muscleGroup: "Panturrilha",
    primaryTarget: "Gastrocnêmio (Alongamento Máximo sem Compressão Espinhal)",
    secondaryMuscles: "Sóleo",
    pattern: "calf",
    defaultSets: 3,
    defaultReps: "12-15",
    defaultRest: 60,
    difficulty: "Média",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "Clássico da Era de Ouro (favorito de Arnold): o tronco inclinado a 90° com joelhos retos estica toda a fáscia posterior (isquiotibiais + gastrocnêmio), maximizando o pico de torque no fundo.",
    equipmentVariations: "Máquina Burrinho, No Smith com Lombar/Quadril sob a Barra Acolchoada, Cinturão de Carga",
    cues: [
      "Tronco paralelo ao chão apoiado à frente, joelhos esticados e amplitude máxima no calcanhar.",
    ],
  },
  {
    id: "cat-single-leg-calf",
    name: "Panturrilha Unilateral no Degrau com Halter",
    muscleGroup: "Panturrilha",
    primaryTarget: "Gastrocnêmio, Sóleo & Estabilizadores (Fibulares)",
    secondaryMuscles: "Tibial Posterior",
    pattern: "calf",
    defaultSets: 3,
    defaultReps: "12-15",
    defaultRest: 45,
    difficulty: "Média",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "Corrige assimetrias entre as panturrilhas e recruta intensamente os músculos fibulares laterais que estabilizam o tornozelo.",
    equipmentVariations: "No Step/Escada segurando 1 Halter e 1 Mão de Equilíbrio",
    cues: [
      "Desça lento em 3 segundos, pause 2 segundos lá embaixo e suba até o limite do dedão.",
    ],
  },
  {
    id: "cat-tibialis-raise",
    name: "Elevação Tibial (Tibial Anterior)",
    muscleGroup: "Panturrilha",
    primaryTarget: "Músculo Tibial Anterior (Frente da Canela)",
    secondaryMuscles: "Extensor Longo dos Dedos",
    pattern: "calf",
    defaultSets: 3,
    defaultReps: "15-20",
    defaultRest: 45,
    difficulty: "Baixa",
    resistanceCurve: "Pico na Contração",
    biomechanicalProfile:
      "Trabalha a dorsiflexão do tornozelo (antagonista da panturrilha). Essencial para estética frontal da canela, estabilidade no agachamento e prevenção de canelite.",
    equipmentVariations: "Costas na Parede (Peso Corporal), Tib Bar, Sentado com Polia Baixa no Peito do Pé",
    cues: [
      "Encoste os glúteos na parede com os pés à frente e puxe a ponta dos pés o mais alto possível em direção à canela.",
    ],
  },

  // ==========================================================================
  // 12. ABDÔMEN / CORE (8 variações — Tabela 12 do Compêndio)
  // ==========================================================================
  {
    id: "cat-cable-crunch",
    name: "Abdominal Supra na Polia Alta (Ajoelhado com Corda)",
    muscleGroup: "Abdômen / Core",
    primaryTarget: "Reto Abdominal (Ênfase Supra — Sobrecarga Progressiva)",
    secondaryMuscles: "Oblíquos Externos e Internos",
    pattern: "pushdown",
    defaultSets: 4,
    defaultReps: "10-15",
    defaultRest: 60,
    difficulty: "Média",
    resistanceCurve: "Tensão Constante",
    biomechanicalProfile:
      "O melhor exercício para hipertrofiar os gomos do abdômen: permite aplicar sobrecarga progressiva real na flexão dinâmica da coluna torácica e lombar.",
    equipmentVariations: "Ajoelhado de Frente ou de Costas para a Polia Alta, Máquina de Abdominal",
    cues: [
      "Trave o quadril parado e ENROLE a coluna levando o esterno em direção ao umbigo (não sente nos calcanhares!).",
    ],
  },
  {
    id: "cat-hanging-leg-raise",
    name: "Elevação de Pernas na Barra Fixa ou Paralela (Infra)",
    muscleGroup: "Abdômen / Core",
    primaryTarget: "Reto Abdominal (Ênfase Infra) & Oblíquos",
    secondaryMuscles: "Iliopsoas, Reto Femoral, Pegada (Antebraço)",
    pattern: "pullup",
    defaultSets: 4,
    defaultReps: "10-15",
    defaultRest: 60,
    difficulty: "Alta",
    resistanceCurve: "Pico na Contração",
    biomechanicalProfile:
      "Subir as pernas apenas até 90° trabalha quase só os flexores do quadril (iliopsoas). Para ativar o abdômen inferior, é obrigatório enrolar a pelve para cima no final (retroversão pélvica)!",
    equipmentVariations: "Pendurado na Barra (Pernas Estendidas ou Joelhos Flexionados), Na Cadeira Capitão (Paralela)",
    cues: [
      "Enrole o quadril para cima no topo (tentando mostrar os glúteos para frente) para realmente contrair o abdômen.",
    ],
  },
  {
    id: "cat-reverse-crunch",
    name: "Abdominal Reverso no Banco Reto ou Declinado",
    muscleGroup: "Abdômen / Core",
    primaryTarget: "Reto Abdominal (Porção Infra)",
    secondaryMuscles: "Oblíquos Internos, Transverso",
    pattern: "bench",
    defaultSets: 3,
    defaultReps: "12-15",
    defaultRest: 60,
    difficulty: "Média",
    resistanceCurve: "Pico na Contração",
    biomechanicalProfile:
      "Flexão espinhal de baixo para cima (aproximando o púbis do esterno) com as costas apoiadas, eliminando a limitação da força de pegada da barra fixa.",
    equipmentVariations: "Banco Reto Segurando Atrás da Cabeça, Banco Declinado",
    cues: [
      "Desça controlando a lombar vértebra por vértebra e suba descolando o quadril do banco.",
    ],
  },
  {
    id: "cat-ab-wheel",
    name: "Roda Abdominal (Ab Wheel Rollout)",
    muscleGroup: "Abdômen / Core",
    primaryTarget: "Reto Abdominal & Core (Anti-Extensão Extrema)",
    secondaryMuscles: "Grande Dorsal, Cabeça Longa do Tríceps, Serrátil",
    pattern: "bench",
    defaultSets: 3,
    defaultReps: "8-12",
    defaultRest: 60,
    difficulty: "Altíssima",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "Gera ativação eletromiográfica brutal em todo o reto abdominal para impedir que a coluna lombar desabe em hiperextensão quando os braços se afastam.",
    equipmentVariations: "Roda Abdominal de Joelhos, Rollout com Barra e Anilhas, Na Bola Suíça (Iniciantes)",
    cues: [
      "Mantenha a pelve encaixada em retroversão ('gato arrepiado') do início ao fim — nunca deixe a lombar afundar!",
    ],
  },
  {
    id: "cat-plank",
    name: "Prancha Isométrica Frontal & Prancha Lateral (Side Plank)",
    muscleGroup: "Abdômen / Core",
    primaryTarget: "Transverso, Reto Abdominal, Oblíquos & Quadrado Lombar",
    secondaryMuscles: "Glúteo Médio (na Prancha Lateral), Serrátil",
    pattern: "bench",
    defaultSets: 3,
    defaultReps: "45-60s",
    defaultRest: 60,
    difficulty: "Baixa",
    resistanceCurve: "Tensão Constante",
    biomechanicalProfile:
      "Treina a função primária estabilizadora do core: anti-extensão (prancha frontal) e anti-flexão lateral (prancha lateral, essencial para blindar o quadrado lombar).",
    equipmentVariations: "Prancha RKC (Contração Máxima de Tudo por 20s–30s), Prancha Lateral sobre o Cotovelo",
    cues: [
      "Trave glúteos, quadríceps e puxe os cotovelos isometricamente na direção dos pés para dobrar a ativação.",
    ],
  },
  {
    id: "cat-russian-twist",
    name: "Lenhador na Polia (Woodchopper) / Press Pallof / Russian Twist",
    muscleGroup: "Abdômen / Core",
    primaryTarget: "Oblíquos Externos e Internos (Rotação & Anti-Rotação)",
    secondaryMuscles: "Transverso do Abdômen, Glúteo Médio",
    pattern: "row",
    defaultSets: 3,
    defaultReps: "12-15",
    defaultRest: 60,
    difficulty: "Média",
    resistanceCurve: "Tensão Constante",
    biomechanicalProfile:
      "Trabalha o plano transversal: o Lenhador (Woodchopper) fortalece a rotação dinâmica da caixa torácica, enquanto o Press Pallof fortalece a resistência anti-rotação pura.",
    equipmentVariations: "Lenhador na Polia Alta/Baixa, Press Pallof no Cabo, Russian Twist com Anilha",
    cues: [
      "Gire os ombros e a caixa torácica em bloco mantendo o quadril firme.",
    ],
  },
  {
    id: "cat-dead-bug",
    name: "Dead Bug (Inseto Morto — Controle Lombopélvico)",
    muscleGroup: "Abdômen / Core",
    primaryTarget: "Transverso do Abdômen & Reto Abdominal (Anti-Extensão)",
    secondaryMuscles: "Oblíquos Internos, Flexores do Quadril",
    pattern: "bench",
    defaultSets: 3,
    defaultReps: "10-12",
    defaultRest: 45,
    difficulty: "Baixa",
    resistanceCurve: "Pico no Alongamento",
    biomechanicalProfile:
      "Ensina o cérebro a manter a coluna lombar 100% colada no chão enquanto braços e pernas opostos se movem — excelente para quem sente dor lombar em outros abdominais.",
    equipmentVariations: "Peso Corporal, Segurando Elástico na Polia Baixa atrás da Cabeça",
    cues: [
      "Esmague a lombar contra o chão (não deixe passar nem uma folha de papel por baixo) enquanto estica a perna e o braço oposto.",
    ],
  },
  {
    id: "cat-stomach-vacuum",
    name: "Stomach Vacuum (Vácuo Abdominal)",
    muscleGroup: "Abdômen / Core",
    primaryTarget: "Músculo Transverso do Abdômen (Afinar Linha de Cintura)",
    secondaryMuscles: "Assoalho Pélvico, Diafragma",
    pattern: "calf",
    defaultSets: 4,
    defaultReps: "20s",
    defaultRest: 45,
    difficulty: "Baixa",
    resistanceCurve: "Pico na Contração",
    biomechanicalProfile:
      "Isola o músculo mais profundo do abdômen (que envolve as vísceras como uma cinta). Fortalecê-lo reduz a circunferência de cintura em repouso e destaca o V-Taper.",
    equipmentVariations: "Em Pé, De 4 Apoios ou Deitado de Costas",
    cues: [
      "Solte 100% do ar dos pulmões e sugue o umbigo o mais fundo possível em direção à coluna segurando por 15–20s.",
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

  if (normName.includes("pullover")) {
    return EXERCISE_CATALOG.find((e) => e.id === "cat-pullover-db")!;
  }
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
  if (normName.includes("meadows")) {
    return EXERCISE_CATALOG.find((e) => e.id === "cat-meadows-row")!;
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
    normName.includes("arnold") ||
    normName.includes("francês")
  ) {
    return EXERCISE_CATALOG.find((e) => e.id === "cat-ohp-barbell")!;
  }
  if (
    normName.includes("barra fixa") ||
    normName.includes("puxada") ||
    normName.includes("chin") ||
    normName.includes("elevação de pernas") ||
    normName.includes("hang")
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
  if (normName.includes("sissy")) {
    return EXERCISE_CATALOG.find((e) => e.id === "cat-sissy-squat")!;
  }
  if (
    normName.includes("agachamento") ||
    normName.includes("afundo") ||
    normName.includes("búlgaro") ||
    normName.includes("passada") ||
    normName.includes("hack") ||
    normName.includes("step-up")
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
    normName.includes("good morning") ||
    normName.includes("swing")
  ) {
    return EXERCISE_CATALOG.find((e) => e.id === "cat-rdl-barbell")!;
  }
  if (normName.includes("zottman")) {
    return EXERCISE_CATALOG.find((e) => e.id === "cat-zottman-curl")!;
  }
  if (normName.includes("rosca") || normName.includes("punho")) {
    return EXERCISE_CATALOG.find((e) => e.id === "cat-barbell-curl")!;
  }
  if (
    normName.includes("tríceps") ||
    normName.includes("triceps") ||
    normName.includes("pulley") ||
    normName.includes("pulldown") ||
    normName.includes("paralela") ||
    normName.includes("jm press")
  ) {
    return EXERCISE_CATALOG.find((e) => e.id === "cat-pushdown-rope")!;
  }
  if (
    normName.includes("panturrilha") ||
    normName.includes("gêmeos") ||
    normName.includes("burrinho") ||
    normName.includes("tibial")
  ) {
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
