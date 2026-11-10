import { AppDatabase, TrainingBlock, WorkoutRoutine } from "./types";

export const DEFAULT_BLOCK_ID = "block-default";

export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

/**
 * Garante que o banco possua pelo menos 1 bloco semanal.
 * Bancos antigos (sem blocos) têm suas fichas migradas para um "Bloco Padrão".
 * Também mantém `routines` espelhando o bloco ativo (compatibilidade retroativa).
 */
export function normalizeDatabase(db: AppDatabase): AppDatabase {
  let blocks = db.trainingBlocks;

  if (!blocks || blocks.length === 0) {
    blocks = [
      {
        id: DEFAULT_BLOCK_ID,
        name: "Bloco Padrão",
        description: "Suas fichas atuais migradas automaticamente",
        routines: db.routines || [],
        weeklyFrequency: {},
        createdAt: new Date().toISOString(),
      },
    ];
  }

  const activeBlockId =
    db.activeBlockId && blocks.some((b) => b.id === db.activeBlockId)
      ? db.activeBlockId
      : blocks[0].id;

  const active = blocks.find((b) => b.id === activeBlockId)!;

  return {
    ...db,
    trainingBlocks: blocks,
    activeBlockId,
    routines: active.routines,
  };
}

/**
 * Clona um bloco gerando novos IDs para as fichas e exercícios
 * (preservando a frequência semanal de cada ficha).
 */
export function duplicateBlock(
  block: TrainingBlock,
  newName: string
): TrainingBlock {
  const idMap: Record<string, string> = {};
  const routines: WorkoutRoutine[] = block.routines.map((r) => {
    const newId = generateId("routine");
    idMap[r.id] = newId;
    return {
      ...r,
      id: newId,
      exercises: r.exercises.map((ex) => ({ ...ex, id: generateId("ex") })),
    };
  });

  const weeklyFrequency: Record<string, number> = {};
  Object.entries(block.weeklyFrequency || {}).forEach(([oldId, freq]) => {
    if (idMap[oldId]) weeklyFrequency[idMap[oldId]] = freq;
  });

  return {
    ...block,
    id: generateId("block"),
    name: newName,
    routines,
    weeklyFrequency,
    createdAt: new Date().toISOString(),
  };
}
