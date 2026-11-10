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
  "Bíceps",
  "Tríceps",
  "Panturrilha",
] as const;

export const EXERCISE_CATALOG: CatalogExercise[] = [
  // PEITORAL
  {
    id: "cat-bench",
    name: "Supino Reto com Barra",
    muscleGroup: "Peitoral",
    secondaryMuscles: "Tríceps, Deltoide Anterior",
    pattern: "bench",
    defaultSets: 4,
    defaultReps: "6-8",
    defaultRest: 120,
    cues: [
      "Mantenha as escápulas retraídas e deprimidas contra o banco.",
      "Desça a barra controladamente até tocar a linha inferior do peitoral com cotovelos a ~45°.",
      "Empurre explosivamente mantendo os pés firmes no chão.",
    ],
  },
  {
    id: "cat-incline-db",
    name: "Supino Inclinado com Halteres",
    muscleGroup: "Peitoral",
    secondaryMuscles: "Deltoide Anterior, Tríceps",
    pattern: "incline",
    defaultSets: 3,
    defaultReps: "8-10",
    defaultRest: 90,
    cues: [
      "Ajuste o banco entre 30° e 45° para focar na porção clavicular (superior) do peito.",
      "Desça alongando bem as fibras peitorais sem perder a estabilidade dos ombros.",
      "Suba aproximando os halteres sem bater um no outro no topo.",
    ],
  },
  {
    id: "cat-fly",
    name: "Crucifixo / Peck Deck (Voador)",
    muscleGroup: "Peitoral",
    secondaryMuscles: "Deltoide Anterior",
    pattern: "fly",
    defaultSets: 3,
    defaultReps: "10-12",
    defaultRest: 75,
    cues: [
      "Mantenha uma leve flexão fixa nos cotovelos durante todo o arco do movimento.",
      "Foque em 'abraçar uma árvore', esmagando o centro do peitoral por 1s no pico da contração.",
    ],
  },
  {
    id: "cat-crossover",
    name: "Cross-over na Polia Alta",
    muscleGroup: "Peitoral",
    secondaryMuscles: "Deltoide Anterior, Tríceps",
    pattern: "fly",
    defaultSets: 3,
    defaultReps: "12-15",
    defaultRest: 60,
    cues: [
      "Incline levemente o tronco à frente e estabilize o abdômen.",
      "Puxe os cabos para baixo e para dentro, cruzando ou unindo as mãos na frente do quadril.",
    ],
  },

  // COSTAS
  {
    id: "cat-pullup",
    name: "Barra Fixa / Puxada Alta Frontal",
    muscleGroup: "Costas",
    secondaryMuscles: "Bíceps, Redondo Maior, Trapézio Inferior",
    pattern: "pullup",
    defaultSets: 4,
    defaultReps: "8-10",
    defaultRest: 120,
    cues: [
      "Inicie o movimento deprimindo as escápulas (abaixando os ombros longe das orelhas).",
      "Puxe pensando em levar os cotovelos em direção aos bolsos da calça.",
      "Alongue a dorsal completamente na subida sem soltar a tensão.",
    ],
  },
  {
    id: "cat-barbell-row",
    name: "Remada Curvada com Barra",
    muscleGroup: "Costas",
    secondaryMuscles: "Lombar, Bíceps, Deltoide Posterior, Trapézio",
    pattern: "row",
    defaultSets: 4,
    defaultReps: "8-10",
    defaultRest: 120,
    cues: [
      "Incline o tronco entre 45° e 70° mantendo a coluna neutra e o abdômen travado.",
      "Puxe a barra em direção ao umbigo esmagando as escápulas no topo.",
      "Evite dar impulsos excessivos com o quadril.",
    ],
  },
  {
    id: "cat-seated-row",
    name: "Remada Baixa na Polia (Triângulo)",
    muscleGroup: "Costas",
    secondaryMuscles: "Bíceps, Romboides",
    pattern: "row",
    defaultSets: 3,
    defaultReps: "10-12",
    defaultRest: 90,
    cues: [
      "Mantenha o peito estufado e puxe o triângulo até a linha do abdômen.",
      "Deixe as escápulas abrirem levemente na fase excêntrica sem curvar a lombar.",
    ],
  },
  {
    id: "cat-one-arm-row",
    name: "Remada Unilateral com Halter (Serrote)",
    muscleGroup: "Costas",
    secondaryMuscles: "Bíceps, Core",
    pattern: "row",
    defaultSets: 3,
    defaultReps: "10-12",
    defaultRest: 75,
    cues: [
      "Puxe o halter fazendo uma trajetória em arco ('J') em direção ao quadril, não ao ombro.",
      "Mantenha o tronco paralelo ao banco sem girar a coluna.",
    ],
  },

  // OMBROS
  {
    id: "cat-ohp",
    name: "Desenvolvimento Militar (OHP / Halteres)",
    muscleGroup: "Ombros",
    secondaryMuscles: "Tríceps, Peitoral Superior, Core",
    pattern: "ohp",
    defaultSets: 4,
    defaultReps: "6-10",
    defaultRest: 120,
    cues: [
      "Contraia glúteos e abdômen para não hiperestender a lombar.",
      "Empurre a carga verticalmente até alinhar os braços com as orelhas no topo.",
      "Desça até a altura do queixo com os cotovelos levemente à frente da linha dos ombros.",
    ],
  },
  {
    id: "cat-lat-raise",
    name: "Elevação Lateral com Halteres",
    muscleGroup: "Ombros",
    secondaryMuscles: "Trapézio Superior",
    pattern: "lateral",
    defaultSets: 4,
    defaultReps: "12-15",
    defaultRest: 60,
    cues: [
      "Suba os braços no plano escapular (~20° à frente da linha lateral do tronco).",
      "Lidere o movimento pelos cotovelos até a altura dos ombros, sem encolher o trapézio.",
    ],
  },
  {
    id: "cat-facepull",
    name: "Face Pull / Crucifixo Inverso",
    muscleGroup: "Ombros",
    secondaryMuscles: "Manguito Rotador, Trapézio Médio",
    pattern: "row",
    defaultSets: 3,
    defaultReps: "12-15",
    defaultRest: 60,
    cues: [
      "Puxe a corda na direção da testa abrindo os cotovelos e rodando os punhos para trás.",
      "Excelente para postura, saúde dos ombros e aspecto 3D do deltoide posterior.",
    ],
  },

  // QUADRÍCEPS
  {
    id: "cat-squat",
    name: "Agachamento Livre com Barra",
    muscleGroup: "Quadríceps",
    secondaryMuscles: "Glúteos, Core, Adutores",
    pattern: "squat",
    defaultSets: 4,
    defaultReps: "6-8",
    defaultRest: 150,
    cues: [
      "Inspire fundo travando o core (manobra de Valsalva) antes de iniciar a descida.",
      "Flexione joelhos e quadril simultaneamente mantendo os joelhos alinhados com a ponta dos pés.",
      "Desça pelo menos até a linha paralela (90°) mantendo os calcanhares plantados.",
    ],
  },
  {
    id: "cat-legpress",
    name: "Leg Press 45°",
    muscleGroup: "Quadríceps",
    secondaryMuscles: "Glúteos",
    pattern: "legpress",
    defaultSets: 4,
    defaultReps: "10-12",
    defaultRest: 120,
    cues: [
      "Mantenha o quadril e a lombar 100% colados no encosto durante toda a descida.",
      "Não trave os joelhos completamente no final da subida para manter a tensão muscular e proteger a articulação.",
    ],
  },
  {
    id: "cat-legext",
    name: "Cadeira Extensora",
    muscleGroup: "Quadríceps",
    secondaryMuscles: "Reto Femoral",
    pattern: "legext",
    defaultSets: 3,
    defaultReps: "12-15",
    defaultRest: 75,
    cues: [
      "Alinhe o eixo de rotação da máquina com a linha do seu joelho.",
      "Segure 1 segundo no topo com os joelhos totalmente estendidos para máxima contração do quadríceps.",
    ],
  },

  // POSTERIOR DE COXA
  {
    id: "cat-rdl",
    name: "Stiff / Levantamento Terra Romeno (RDL)",
    muscleGroup: "Posterior de Coxa",
    secondaryMuscles: "Glúteos, Eretores da Espinha",
    pattern: "rdl",
    defaultSets: 4,
    defaultReps: "8-10",
    defaultRest: 120,
    cues: [
      "Mantenha uma leve flexão fixa nos joelhos e empurre o quadril para trás (como se fosse fechar uma porta com o glúteo).",
      "Desça a barra raspando nas coxas/canelas até sentir forte alongamento no posterior, sem arredondar a lombar.",
    ],
  },
  {
    id: "cat-legcurl",
    name: "Mesa ou Cadeira Flexora",
    muscleGroup: "Posterior de Coxa",
    secondaryMuscles: "Panturrilha (Gastrocnêmio)",
    pattern: "legext",
    defaultSets: 3,
    defaultReps: "10-15",
    defaultRest: 75,
    cues: [
      "Mantenha o quadril pressionado contra o banco (não levante o glúteo ao puxar o peso).",
      "Controle a fase de volta (excêntrica) em 2 a 3 segundos.",
    ],
  },

  // BÍCEPS
  {
    id: "cat-barbell-curl",
    name: "Rosca Direta com Barra W / Reta",
    muscleGroup: "Bíceps",
    secondaryMuscles: "Antebraço, Braquial",
    pattern: "curl",
    defaultSets: 3,
    defaultReps: "8-12",
    defaultRest: 75,
    cues: [
      "Mantenha os cotovelos colados ao lado das costelas, sem jogar o tronco para trás.",
      "Contraia o bíceps no topo e desça alongando quase totalmente o braço.",
    ],
  },
  {
    id: "cat-hammer-curl",
    name: "Rosca Martelo com Halteres",
    muscleGroup: "Bíceps",
    secondaryMuscles: "Braquiorradial (Antebraço), Braquial",
    pattern: "curl",
    defaultSets: 3,
    defaultReps: "10-12",
    defaultRest: 60,
    cues: [
      "Mantenha a pegada neutra (palmas viradas uma para a outra) do início ao fim.",
      "Dá volume lateral ao braço e fortalece o antebraço.",
    ],
  },

  // TRÍCEPS
  {
    id: "cat-pushdown",
    name: "Tríceps Pulley na Corda / Barra",
    muscleGroup: "Tríceps",
    secondaryMuscles: "Cabeça Lateral do Tríceps",
    pattern: "pushdown",
    defaultSets: 3,
    defaultReps: "10-12",
    defaultRest: 60,
    cues: [
      "Trave os cotovelos fixos ao lado do tronco; apenas o antebraço deve se mover.",
      "Ao usar a corda, abra as pontas para fora no final do movimento para esmagar o tríceps.",
    ],
  },
  {
    id: "cat-skullcrusher",
    name: "Tríceps Testa / Francês",
    muscleGroup: "Tríceps",
    secondaryMuscles: "Cabeça Longa do Tríceps",
    pattern: "bench",
    defaultSets: 3,
    defaultReps: "8-12",
    defaultRest: 75,
    cues: [
      "Incline os braços levemente para trás da linha da cabeça para manter tensão contínua na cabeça longa do tríceps.",
      "Evite abrir demais os cotovelos durante a descida.",
    ],
  },

  // PANTURRILHA
  {
    id: "cat-calf",
    name: "Panturrilha em Pé / Sentado",
    muscleGroup: "Panturrilha",
    secondaryMuscles: "Gastrocnêmio e Sóleo",
    pattern: "calf",
    defaultSets: 4,
    defaultReps: "12-15",
    defaultRest: 60,
    cues: [
      "Faça uma pausa de 1 segundo lá embaixo alongando o tendão (sem quicar!) e 1 segundo na ponta dos pés.",
      "Amplitude máxima é mais importante do que excesso de carga curta.",
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

  // 1. Exact or substring match in catalog
  const direct = EXERCISE_CATALOG.find(
    (item) =>
      item.name.toLowerCase() === normName ||
      normName.includes(item.name.toLowerCase().split(" ")[0])
  );

  if (normName.includes("inclinado")) {
    return EXERCISE_CATALOG.find((e) => e.id === "cat-incline-db")!;
  }
  if (
    normName.includes("crucifixo") ||
    normName.includes("peck") ||
    normName.includes("cross") ||
    normName.includes("voador")
  ) {
    return EXERCISE_CATALOG.find((e) => e.id === "cat-fly")!;
  }
  if (normName.includes("supino") || normName.includes("flexão")) {
    return EXERCISE_CATALOG.find((e) => e.id === "cat-bench")!;
  }
  if (normName.includes("elevação lateral")) {
    return EXERCISE_CATALOG.find((e) => e.id === "cat-lat-raise")!;
  }
  if (normName.includes("desenvolvimento") || normName.includes("ohp")) {
    return EXERCISE_CATALOG.find((e) => e.id === "cat-ohp")!;
  }
  if (
    normName.includes("barra fixa") ||
    normName.includes("puxada") ||
    normName.includes("pulldown")
  ) {
    return EXERCISE_CATALOG.find((e) => e.id === "cat-pullup")!;
  }
  if (
    normName.includes("remada") ||
    normName.includes("serrote") ||
    normName.includes("face pull")
  ) {
    return EXERCISE_CATALOG.find((e) => e.id === "cat-barbell-row")!;
  }
  if (normName.includes("agachamento") || normName.includes("afundo")) {
    return EXERCISE_CATALOG.find((e) => e.id === "cat-squat")!;
  }
  if (normName.includes("leg press") || normName.includes("hack")) {
    return EXERCISE_CATALOG.find((e) => e.id === "cat-legpress")!;
  }
  if (normName.includes("extensora") || normName.includes("flexora")) {
    return EXERCISE_CATALOG.find((e) => e.id === "cat-legext")!;
  }
  if (normName.includes("stiff") || normName.includes("terra") || normName.includes("rdl")) {
    return EXERCISE_CATALOG.find((e) => e.id === "cat-rdl")!;
  }
  if (normName.includes("rosca")) {
    return EXERCISE_CATALOG.find((e) => e.id === "cat-barbell-curl")!;
  }
  if (normName.includes("tríceps") || normName.includes("triceps") || normName.includes("testa") || normName.includes("pulley")) {
    return EXERCISE_CATALOG.find((e) => e.id === "cat-pushdown")!;
  }
  if (normName.includes("panturrilha") || normName.includes("gêmeos")) {
    return EXERCISE_CATALOG.find((e) => e.id === "cat-calf")!;
  }

  if (direct) return direct;

  // 2. Fallback based on muscle group for custom exercises
  const normMuscle = muscleGroup.toLowerCase();
  if (normMuscle.includes("peito")) return EXERCISE_CATALOG[0];
  if (normMuscle.includes("costas") || normMuscle.includes("dorsal"))
    return EXERCISE_CATALOG[4];
  if (normMuscle.includes("ombro")) return EXERCISE_CATALOG[8];
  if (normMuscle.includes("quadr")) return EXERCISE_CATALOG[11];
  if (normMuscle.includes("posterior") || normMuscle.includes("glúteo"))
    return EXERCISE_CATALOG[14];
  if (normMuscle.includes("bíceps") || normMuscle.includes("biceps"))
    return EXERCISE_CATALOG[16];
  if (normMuscle.includes("tríceps") || normMuscle.includes("triceps"))
    return EXERCISE_CATALOG[18];
  if (normMuscle.includes("panturrilha")) return EXERCISE_CATALOG[20];

  return {
    ...EXERCISE_CATALOG[0],
    name: exerciseName,
    muscleGroup,
  };
}
