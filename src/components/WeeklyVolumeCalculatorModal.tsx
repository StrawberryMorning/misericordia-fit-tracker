"use client";

import React, { useState } from "react";
import { WorkoutRoutine } from "@/lib/types";
import { MUSCLE_GROUPS } from "@/lib/exerciseCatalog";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Flame,
  Info,
  Sliders,
  Sparkles,
  Wand2,
  X,
  Zap,
} from "lucide-react";

export type TrainingStimulus = "hypertrophy" | "strength" | "endurance";

interface StimulusProfile {
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

const STIMULUS_PROFILES: Record<TrainingStimulus, StimulusProfile> = {
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

function normalizeMuscleGroup(raw: string): string {
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

function getSynergistContributions(
  exerciseName: string,
  primaryGroup: string
): { muscle: string; factor: number }[] {
  const n = exerciseName.toLowerCase();

  // Compound Horizontal/Vertical Presses
  if (
    n.includes("supino") ||
    n.includes("paralela") ||
    n.includes("flexão")
  ) {
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

function isCompoundExercise(name: string): boolean {
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

interface WeeklyVolumeCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  routines: WorkoutRoutine[];
  onUpdateRoutines: (routines: WorkoutRoutine[]) => void;
}

export function WeeklyVolumeCalculatorModal({
  isOpen,
  onClose,
  routines,
  onUpdateRoutines,
}: WeeklyVolumeCalculatorModalProps) {
  // Simple vs Enthusiast Mode
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [stimulus, setStimulus] = useState<TrainingStimulus>("hypertrophy");
  const [includeSynergists, setIncludeSynergists] = useState(false);

  // Per-routine weekly frequency multiplier (default 1x/week; e.g., set to 2x if running ABC 2x)
  const [routineMultipliers, setRoutineMultipliers] = useState<
    Record<string, number>
  >({});

  if (!isOpen) return null;

  const profile = STIMULUS_PROFILES[stimulus];

  const getMultiplier = (routineId: string) =>
    routineMultipliers[routineId] ?? 1;

  // Calculate Direct and Indirect Sets per Muscle Group
  const directMap: Record<string, number> = {};
  const indirectMap: Record<string, number> = {};

  MUSCLE_GROUPS.forEach((m) => {
    directMap[m] = 0;
    indirectMap[m] = 0;
  });

  routines.forEach((routine) => {
    const mult = getMultiplier(routine.id);
    routine.exercises.forEach((ex) => {
      const primary = normalizeMuscleGroup(ex.muscleGroup);
      const sets = ex.targetSets * mult;
      directMap[primary] = (directMap[primary] || 0) + sets;

      const synergists = getSynergistContributions(ex.name, primary);
      synergists.forEach((syn) => {
        if (syn.muscle !== primary) {
          indirectMap[syn.muscle] =
            (indirectMap[syn.muscle] || 0) + sets * syn.factor;
        }
      });
    });
  });

  const totalDirectSetsWeek = Object.values(directMap).reduce(
    (a, b) => a + b,
    0
  );

  // Apply stimulus preset to all routine exercises (reps & rest)
  const handleApplyStimulusToRoutines = () => {
    if (
      !confirm(
        `Deseja ajustar automaticamente a Meta de Repetições e o Tempo de Descanso de todas as suas fichas para o perfil "${profile.title}"?`
      )
    ) {
      return;
    }

    const updated = routines.map((r) => ({
      ...r,
      exercises: r.exercises.map((ex) => {
        const compound = isCompoundExercise(ex.name);
        return {
          ...ex,
          targetReps: compound
            ? profile.recommendedRepsCompound
            : profile.recommendedRepsIsolation,
          restSeconds: compound
            ? profile.recommendedRestCompound
            : profile.recommendedRestIsolation,
        };
      }),
    }));

    onUpdateRoutines(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-white">
                Calculadora de Volume Semanal por Músculo
              </h2>
              <p className="text-xs text-slate-400">
                Analisa suas fichas atuais e verifica se cada músculo está na
                zona ideal ({profile.minOptimalSets} a {profile.maxOptimalSets}{" "}
                séries/semana)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* 1. Multiplicador de Frequência das Fichas na Semana */}
          {routines.length > 0 && (
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-xs font-bold uppercase tracking-wider text-sky-400">
                  Quantas vezes por semana você repete cada ficha?
                </div>
                <span className="text-xs text-slate-400">
                  Total na Semana:{" "}
                  <strong className="text-white">
                    {totalDirectSetsWeek} séries diretas
                  </strong>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {routines.map((r) => {
                  const m = getMultiplier(r.id);
                  return (
                    <div
                      key={r.id}
                      className="flex items-center justify-between bg-slate-900 border border-slate-800 px-3 py-2 rounded-lg text-xs"
                    >
                      <span className="font-semibold text-slate-200 truncate pr-2">
                        {r.name}
                      </span>
                      <div className="flex items-center gap-1 shrink-0">
                        {[1, 2, 3].map((val) => (
                          <button
                            key={val}
                            type="button"
                            onClick={() =>
                              setRoutineMultipliers({
                                ...routineMultipliers,
                                [r.id]: val,
                              })
                            }
                            className={`px-2 py-0.5 rounded font-bold text-[11px] cursor-pointer ${
                              m === val
                                ? "bg-sky-500 text-slate-950"
                                : "bg-slate-800 text-slate-400 hover:text-white"
                            }`}
                          >
                            {val}x
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. Botão Expansível: Modo Entusiasta / Avançado (Estímulo & Sinergistas) */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full flex items-center justify-between px-4 py-3 text-xs font-bold text-slate-200 hover:bg-slate-900/60 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-sky-400" />
                <span>
                  Modo Entusiasta / Avançado (Escolher Estímulo: Força,
                  Hipertrofia ou Resistência)
                </span>
                <span className="bg-sky-500/15 text-sky-300 border border-sky-500/30 px-2 py-0.5 rounded-full text-[10px]">
                  Atual: {profile.title.split(" ")[0]}
                </span>
              </div>
              {showAdvanced ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {showAdvanced && (
              <div className="p-4 border-t border-slate-800 space-y-4 bg-slate-900/40">
                {/* 3 Cards de Estímulo */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {(
                    Object.values(STIMULUS_PROFILES) as StimulusProfile[]
                  ).map((item) => {
                    const active = item.id === stimulus;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setStimulus(item.id)}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          active
                            ? "bg-sky-500/15 border-sky-500 text-white shadow-lg shadow-sky-950/50"
                            : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-white">
                            {item.title}
                          </span>
                          <Zap
                            className={`w-4 h-4 ${
                              active ? "text-sky-400" : "text-slate-600"
                            }`}
                          />
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">
                          {item.subtitle}
                        </p>
                        <div className="mt-2.5 pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-1 text-[10px]">
                          <div>
                            Meta Séries:{" "}
                            <strong className="text-emerald-400">
                              {item.minOptimalSets}-{item.maxOptimalSets}/sem
                            </strong>
                          </div>
                          <div>
                            Compostos:{" "}
                            <strong className="text-sky-300">
                              {item.recommendedRepsCompound} reps (
                              {item.recommendedRestCompound}s)
                            </strong>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Explicação Científica do Estímulo + Botão Auto-Ajustar Fichas */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-xs">
                  <div className="flex-1 min-w-[240px] space-y-1">
                    <div className="font-bold text-sky-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Parâmetros de {profile.title}</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      {profile.description}
                    </p>
                  </div>

                  {routines.length > 0 && (
                    <button
                      type="button"
                      onClick={handleApplyStimulusToRoutines}
                      className="flex items-center gap-1.5 bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-300 font-bold px-3 py-2 rounded-xl text-xs transition-all cursor-pointer shrink-0"
                    >
                      <Wand2 className="w-3.5 h-3.5" />
                      <span>
                        Adaptar Reps & Descanso das Fichas para{" "}
                        {profile.title.split(" ")[0]}
                      </span>
                    </button>
                  )}
                </div>

                {/* Toggle Séries Indiretas (0.5x de Sinergistas) */}
                <label className="flex items-center justify-between bg-slate-950 border border-slate-800 px-3.5 py-2.5 rounded-xl text-xs cursor-pointer">
                  <div>
                    <span className="font-bold text-white block">
                      Contabilizar Séries Indiretas de Músculos Sinergistas
                      (+0.5 série)
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Ex: Supino adiciona +0.5 série para Tríceps e Ombro;
                      Remada/Barra Fixa adiciona +0.5 para Bíceps; Agachamento
                      +0.5 para Glúteos.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={includeSynergists}
                    onChange={(e) => setIncludeSynergists(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-sky-500"
                  />
                </label>
              </div>
            )}
          </div>

          {/* 3. Semáforo de Volume por Grupo Muscular (Simples e Direto) */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-bold uppercase tracking-wider text-slate-300">
                Séries Semanais por Grupo Muscular
              </span>
              <div className="flex flex-wrap items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1 text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                  Baixo (&lt;{profile.mevSets})
                </span>
                <span className="flex items-center gap-1 text-amber-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  Moderado ({profile.mevSets}-{profile.minOptimalSets - 1})
                </span>
                <span className="flex items-center gap-1 text-emerald-400 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Ideal ({profile.minOptimalSets}-{profile.maxOptimalSets})
                </span>
                <span className="flex items-center gap-1 text-rose-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  Excesso (&gt;{profile.maxOptimalSets})
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {MUSCLE_GROUPS.map((muscle) => {
                const direct = directMap[muscle] || 0;
                const indirect = Number((indirectMap[muscle] || 0).toFixed(1));
                const effective = includeSynergists
                  ? Number((direct + indirect).toFixed(1))
                  : direct;

                let statusLabel = "Manutenção / Baixo";
                let barColor = "bg-slate-600";
                let badgeColor = "text-slate-400 bg-slate-800";

                if (
                  effective >= profile.minOptimalSets &&
                  effective <= profile.maxOptimalSets
                ) {
                  statusLabel = "Zona Ideal";
                  barColor = "bg-emerald-500";
                  badgeColor =
                    "text-emerald-300 bg-emerald-500/15 border border-emerald-500/30";
                } else if (
                  effective >= profile.mevSets &&
                  effective < profile.minOptimalSets
                ) {
                  statusLabel = "Volume Mínimo (MEV)";
                  barColor = "bg-amber-400";
                  badgeColor =
                    "text-amber-300 bg-amber-500/15 border border-amber-500/30";
                } else if (effective > profile.maxOptimalSets) {
                  statusLabel = "Volume Alto / Excesso";
                  barColor = "bg-rose-500";
                  badgeColor =
                    "text-rose-300 bg-rose-500/15 border border-rose-500/30";
                }

                const maxScale = profile.maxOptimalSets + 6;
                const pct = Math.min(100, (effective / maxScale) * 100);

                return (
                  <div
                    key={muscle}
                    className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-3.5 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="text-xs font-extrabold text-white">
                          {muscle}
                        </span>
                        <span
                          className={`ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeColor}`}
                        >
                          {statusLabel}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-mono font-black text-white">
                          {effective}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {" "}
                          / {profile.minOptimalSets}-{profile.maxOptimalSets}{" "}
                          séries
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden relative">
                      <div
                        className={`h-full transition-all duration-300 rounded-full ${barColor}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    {includeSynergists && indirect > 0 && (
                      <div className="text-[10px] text-slate-400 flex justify-between">
                        <span>Séries Diretas: {direct}</span>
                        <span className="text-sky-400">
                          +{indirect} séries indiretas (sinergistas)
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Info className="w-4 h-4 text-sky-400 shrink-0" />
            <span>
              Dica: Músculos pequenos ou auxiliares (Antebraço, Trapézio,
              Abdômen) costumam evoluir bem mesmo na faixa de 4 a 8 séries
              diretas.
            </span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2 rounded-xl cursor-pointer shrink-0"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
