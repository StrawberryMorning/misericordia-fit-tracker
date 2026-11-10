"use client";

import React from "react";
import { CatalogExercise } from "@/lib/exerciseCatalog";
import { ExerciseAnimationSVG } from "./ExerciseAnimationSVG";
import { CheckCircle2, Dumbbell, Sparkles, X } from "lucide-react";

interface ExerciseExecutionModalProps {
  exercise: CatalogExercise | null;
  onClose: () => void;
}

export function ExerciseExecutionModal({
  exercise,
  onClose,
}: ExerciseExecutionModalProps) {
  if (!exercise) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-400">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
                {exercise.muscleGroup} • Secundário: {exercise.secondaryMuscles}
              </span>
              <h3 className="text-base font-extrabold text-white">
                {exercise.name}
              </h3>
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

        {/* Body: Animated Figure + Biomechanics Cues */}
        <div className="p-5 space-y-5">
          <ExerciseAnimationSVG pattern={exercise.pattern} size="lg" />

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Dicas de Execução & Biomecânica</span>
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

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
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
