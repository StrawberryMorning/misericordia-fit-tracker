"use client";

import React from "react";
import {
  CatalogExercise,
  MUSCLE_BIOMECHANICS_GUIDE,
  TechnicalDifficulty,
} from "@/lib/exerciseCatalog";
import { ExerciseAnimationSVG } from "./ExerciseAnimationSVG";
import {
  Activity,
  Brain,
  CheckCircle2,
  Dumbbell,
  Layers,
  Repeat,
  Sparkles,
  Target,
  X,
} from "lucide-react";

interface ExerciseExecutionModalProps {
  exercise: CatalogExercise | null;
  onClose: () => void;
}

export function getDifficultyBadgeStyle(difficulty?: TechnicalDifficulty) {
  switch (difficulty) {
    case "Baixa":
      return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
    case "Média":
      return "bg-sky-500/15 text-sky-300 border-sky-500/30";
    case "Alta":
      return "bg-amber-500/15 text-amber-300 border-amber-500/30";
    case "Altíssima":
      return "bg-rose-500/15 text-rose-300 border-rose-500/30";
    default:
      return "bg-slate-800 text-slate-300 border-slate-700";
  }
}

export function ExerciseExecutionModal({
  exercise,
  onClose,
}: ExerciseExecutionModalProps) {
  if (!exercise) return null;

  const groupGuide = MUSCLE_BIOMECHANICS_GUIDE[exercise.muscleGroup];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-5 py-4 bg-slate-950 border-b border-slate-800 shrink-0">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-400 mt-0.5">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-sky-500/15 text-sky-300 border border-sky-500/30 px-2 py-0.5 rounded-full">
                  {exercise.muscleGroup}
                </span>

                {exercise.difficulty && (
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider border px-2 py-0.5 rounded-full ${getDifficultyBadgeStyle(
                      exercise.difficulty
                    )}`}
                  >
                    Dificuldade {exercise.difficulty}
                  </span>
                )}

                {exercise.resistanceCurve && (
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-500/15 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full">
                    {exercise.resistanceCurve}
                  </span>
                )}
              </div>

              <h3 className="text-base sm:text-lg font-extrabold text-white leading-snug">
                {exercise.name}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body: Animated Figure + Scientific Biomechanics Profile */}
        <div className="p-5 space-y-4 overflow-y-auto">
          <ExerciseAnimationSVG pattern={exercise.pattern} size="lg" />

          {/* Estímulo Primário & Secundário (Tabelas 1 a 12 do Compêndio) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-950/90 border border-sky-500/30 rounded-xl p-3.5 space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                <span>Estímulo Primário (Alvo Exato)</span>
              </div>
              <p className="text-xs font-bold text-white">
                {exercise.primaryTarget || exercise.muscleGroup}
              </p>
            </div>

            <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-3.5 space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>Sinergistas / Estímulo Secundário</span>
              </div>
              <p className="text-xs font-medium text-slate-300">
                {exercise.secondaryMuscles}
              </p>
            </div>
          </div>

          {/* Perfil Biomecânico & Curva de Resistência */}
          {exercise.biomechanicalProfile && (
            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-purple-500/30 rounded-xl p-4 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-purple-400" />
                  <span>Análise Biomecânica & Perfil de Resistência</span>
                </div>
                {exercise.resistanceCurve && (
                  <span className="text-[10px] font-semibold text-purple-300 bg-purple-950/60 border border-purple-700/40 px-2 py-0.5 rounded">
                    Curva: {exercise.resistanceCurve}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {exercise.biomechanicalProfile}
              </p>
            </div>
          )}

          {/* Dicas Práticas de Execução */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Checklist Prático de Execução</span>
            </div>

            <ul className="space-y-2 text-xs text-slate-300">
              {exercise.cues.map((cue, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{cue}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Variações de Equipamento / Substituições (Caso máquina esteja ocupada) */}
          {exercise.equipmentVariations && (
            <div className="bg-slate-950/80 border border-amber-500/25 rounded-xl p-3.5 space-y-1.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <Repeat className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  Variações & Substituições Equivalentes (Aparelho Ocupado)
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {exercise.equipmentVariations}
              </p>
            </div>
          )}

          {/* Resumo da Visualização Anatômica do Grupamento */}
          {groupGuide && (
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 space-y-1.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5" />
                <span>Regra de Ouro — {exercise.muscleGroup}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {groupGuide.goldenRule}
              </p>
            </div>
          )}

          {/* Parâmetros Padrão */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-2.5">
              <span className="text-slate-400 block text-[10px]">
                Séries Sugeridas
              </span>
              <strong className="text-white text-sm">
                {exercise.defaultSets} séries
              </strong>
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-2.5">
              <span className="text-slate-400 block text-[10px]">
                Faixa de Reps
              </span>
              <strong className="text-sky-400 text-sm">
                {exercise.defaultReps} reps
              </strong>
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-2.5">
              <span className="text-slate-400 block text-[10px]">
                Descanso Ideal
              </span>
              <strong className="text-emerald-400 text-sm">
                {exercise.defaultRest}s
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
