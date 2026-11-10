import { WorkoutRoutine } from "./types";
import { MUSCLE_GROUPS } from "./exerciseCatalog";

export type TrainingStimulus = "hypertrophy" | "strength" | "endurance";

export interface StimulusProfile {
  id: TrainingStimulus;
  title: string;
  subtitle: string;
  minOptimalSets: number;
  maxOptimalSets: number;
  mevSets: number; // Minimum Effective Volume
  recommendedRepsCompound: string;
  recommendedRepsIsolation: string;
  recommendedRestCompound: number;
  recommendedRestIsolation: number;
  description: string;
}

export const STIMULUS_PROFILES: Record<TrainingStimulus, StimulusProfile> = {
  hypertrophy: {
    id: "hypertrophy",
    title: "Hipertrofia (Ganho Muscular)",
    subtitle: "Foco em tensão mecânica + volume moderado/alto",
    mevSets: 6,
    minOptimalSets: 10,
    maxOptimalSets: 20,
    recommendedRepsCompound: "6-10",
    recommendedRepsIsolation: "10-15",
    recommendedRestCompound: 120,
    recommendedRestIsolation: 60,
    description:
      "Zona clássica científica (10 a 20 séries semanais por grupo muscular) trabalhando próximo da falha concêntrica (1 a 2 repetições na reserva).",
  },
  strength: {
    id: "strength",
    title: "Força Pura / Powerbuilding",
    subtitle: "Cargas altas (80-90% 1RM) e recuperação neural",
    mevSets: 4,
    minOptimalSets: 6,
    maxOptimalSets: 12,
    recommendedRepsCompound: "3-6",
    recommendedRepsIsolation: "6-10",
    recommendedRestCompound: 180,
    recommendedRestIsolation: 90,
    description:
      "Menos séries totais (6 a 12 séries pesadas) para evitar sobrecarga articular e do Sistema Nervoso Central, com descansos longos (3 min) nos básicos.",
  },
  endurance: {
    id: "endurance",
    title: "Resistência Muscular / Metabólico",
    subtitle: "Altas repetições, densidade e condicionamento",
    mevSets: 8,
    minOptimalSets: 12,
    maxOptimalSets: 22,
    recommendedRepsCompound: "12-15",
    recommendedRepsIsolation: "15-20",
    recommendedRestCompound: 60,
    recommendedRestIsolation: 45,
    description:
      "Maior tolerância a volume de séries com descansos curtos (45s a 60s), maximizando a capilarização, resistência local e gasto calórico.",
  },
};

export function normalizeMuscleGroup(raw: string): string {
  const s = raw.toLowerCase();
  if (s.includes("peito")) return "Peitoral";
  if (s.includes("costas") || s.includes("dorsal") || s.includes("lombar"))
    return "Costas";
  if (s.includes("ombro") || s.includes("deltoide")) return "Ombros";
  if (s.includes("quadr")) return "Quadríceps";
  if (s.includes("posterior") || s.includes("isquio"))
    return "Posterior de Coxa";
  if (s.includes("glúteo") || s.includes("gluteo")) return "Glúteos";
  if (s.includes("bíceps") || s.includes("biceps")) return "Bíceps";
  if (s.includes("tríceps") || s.includes("triceps")) return "Tríceps";
  if (s.includes("antebraço")) return "Antebraço";
  if (s.includes("trapézio") || s.includes("trapezio")) return "Trapézio";
  if (s.includes("panturrilha") || s.includes("gêmeos")) return "Panturrilha";
  if (s.includes("abd") || s.includes("core")) return "Abdômen / Core";
  return "Peitoral";
}

export function getSynergistContributions(
  exerciseName: string,
  primaryGroup: string
): { muscle: string; factor: number }[] {
  const n = exerciseName.toLowerCase();

  // Compound Horizontal/Vertical Presses
  if (n.includes("supino") || n.includes("paralela") || n.includes("flexão")) {
    return [
      { muscle: "Tríceps", factor: 0.5 },
      { muscle: "Ombros", factor: 0.5 },
    ];
  }

  // Compound Overhead Presses
  if (n.includes("desenvolvimento") || n.includes("ohp") || n.includes("arnold")) {
    return [{ muscle: "Tríceps", factor: 0.5 }];
  }

  // Compound Back Pulls & Rows
  if (
    n.includes("barra fixa") ||
    n.includes("puxada") ||
    n.includes("chin") ||
    n.includes("remada") ||
    n.includes("serrote") ||
    n.includes("cavalinho")
  ) {
    return [
      { muscle: "Bíceps", factor: 0.5 },
      { muscle: "Ombros", factor: 0.35 },
      { muscle: "Antebraço", factor: 0.35 },
    ];
  }

  // Compound Lower Body Squats/Presses
  if (
    n.includes("agachamento") ||
    n.includes("leg press") ||
    n.includes("afundo") ||
    n.includes("búlgaro") ||
    n.includes("hack")
  ) {
    if (primaryGroup === "Quadríceps") {
      return [{ muscle: "Glúteos", factor: 0.5 }];
    }
  }

  // Hinges (Stiff / RDL / Terra)
  if (n.includes("stiff") || n.includes("terra") || n.includes("rdl")) {
    return [
      { muscle: "Glúteos", factor: 0.5 },
      { muscle: "Costas", factor: 0.35 },
    ];
  }

  return [];
}

export function isCompoundExercise(name: string): boolean {
  const n = name.toLowerCase();
  return (
    n.includes("supino") ||
    n.includes("agachamento") ||
    n.includes("terra") ||
    n.includes("stiff") ||
    n.includes("rdl") ||
    n.includes("remada") ||
    n.includes("barra fixa") ||
    n.includes("puxada") ||
    n.includes("desenvolvimento") ||
    n.includes("leg press") ||
    n.includes("paralela")
  );
}

export interface VolumeResult {
  direct: Record<string, number>;
  indirect: Record<string, number>;
  effective: Record<string, number>;
  totalDirectSets: number;
  sessionsPerWeek: number;
  exerciseCount: number;
}

/**
 * Calculates weekly direct / indirect sets per muscle group for a set of routines,
 * honoring each routine's weekly frequency multiplier (1x, 2x, 3x).
 */
export function computeWeeklyVolume(
  routines: WorkoutRoutine[],
  weeklyFrequency: Record<string, number> = {},
  includeSynergists = false
): VolumeResult {
  const direct: Record<string, number> = {};
  const indirect: Record<string, number> = {};
  MUSCLE_GROUPS.forEach((m) => {
    direct[m] = 0;
    indirect[m] = 0;
  });

  let sessionsPerWeek = 0;
  let exerciseCount = 0;

  routines.forEach((routine) => {
    const mult = weeklyFrequency[routine.id] ?? 1;
    sessionsPerWeek += mult;
    exerciseCount += routine.exercises.length;

    routine.exercises.forEach((ex) => {
      const primary = normalizeMuscleGroup(ex.muscleGroup);
      const sets = ex.targetSets * mult;
      direct[primary] = (direct[primary] || 0) + sets;

      getSynergistContributions(ex.name, primary).forEach((syn) => {
        if (syn.muscle !== primary) {
          indirect[syn.muscle] = (indirect[syn.muscle] || 0) + sets * syn.factor;
        }
      });
    });
  });

  const effective: Record<string, number> = {};
  MUSCLE_GROUPS.forEach((m) => {
    effective[m] = includeSynergists
      ? Number((direct[m] + indirect[m]).toFixed(1))
      : direct[m];
  });

  const totalDirectSets = Object.values(direct).reduce((a, b) => a + b, 0);

  return {
    direct,
    indirect,
    effective,
    totalDirectSets,
    sessionsPerWeek,
    exerciseCount,
  };
}

export type VolumeZone = "low" | "mev" | "optimal" | "excess";

export interface VolumeZoneStyle {
  zone: VolumeZone;
  label: string;
  shortLabel: string;
  barColor: string;
  dotColor: string;
  badgeColor: string;
  textColor: string;
}

export function getVolumeZone(
  sets: number,
  profile: StimulusProfile
): VolumeZoneStyle {
  if (sets >= profile.minOptimalSets && sets <= profile.maxOptimalSets) {
    return {
      zone: "optimal",
      label: "Zona Ideal",
      shortLabel: "Ideal",
      barColor: "bg-emerald-500",
      dotColor: "bg-emerald-400",
      badgeColor:
        "text-emerald-300 bg-emerald-500/15 border border-emerald-500/30",
      textColor: "text-emerald-300",
    };
  }
  if (sets > profile.maxOptimalSets) {
    return {
      zone: "excess",
      label: "Volume Alto / Excesso",
      shortLabel: "Excesso",
      barColor: "bg-rose-500",
      dotColor: "bg-rose-500",
      badgeColor: "text-rose-300 bg-rose-500/15 border border-rose-500/30",
      textColor: "text-rose-300",
    };
  }
  if (sets >= profile.mevSets) {
    return {
      zone: "mev",
      label: "Volume Mínimo (MEV)",
      shortLabel: "Mínimo",
      barColor: "bg-amber-400",
      dotColor: "bg-amber-400",
      badgeColor: "text-amber-300 bg-amber-500/15 border border-amber-500/30",
      textColor: "text-amber-300",
    };
  }
  return {
    zone: "low",
    label: "Manutenção / Baixo",
    shortLabel: "Baixo",
    barColor: "bg-slate-600",
    dotColor: "bg-slate-600",
    badgeColor: "text-slate-400 bg-slate-800",
    textColor: "text-slate-400",
  };
}
