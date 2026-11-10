"use client";

import React, { useState } from "react";
import {
  buildRoutinesFromSplit,
  SplitGuideItem,
  WORKOUT_SPLITS_GUIDE,
} from "@/lib/splitsGuide";
import { WorkoutRoutine } from "@/lib/types";
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  FolderPlus,
  Layers,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";

export type SplitApplyMode = "newBlock" | "replace" | "append";

interface WorkoutSplitGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyRoutines: (
    newRoutines: WorkoutRoutine[],
    mode: SplitApplyMode,
    splitName: string
  ) => void;
  hasExistingRoutines: boolean;
}

export function WorkoutSplitGuideModal({
  isOpen,
  onClose,
  onApplyRoutines,
  hasExistingRoutines,
}: WorkoutSplitGuideModalProps) {
  const [selectedSplitId, setSelectedSplitId] = useState<string>(
    WORKOUT_SPLITS_GUIDE[1].id // Upper / Lower default
  );
  const [applyMode, setApplyMode] = useState<SplitApplyMode>("newBlock");

  if (!isOpen) return null;

  const currentSplit: SplitGuideItem =
    WORKOUT_SPLITS_GUIDE.find((s) => s.id === selectedSplitId) ||
    WORKOUT_SPLITS_GUIDE[0];

  const handleGenerate = (includeExercises: boolean) => {
    const generated = buildRoutinesFromSplit(currentSplit, includeExercises);
    onApplyRoutines(generated, applyMode, currentSplit.name);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Top Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-white">
                Guia de Divisões & Gerador de Estruturas de Treino
              </h2>
              <p className="text-xs text-slate-400">
                Consulte como estruturar sua semana ou gere fichas vazias/sugeridas com 1 clique
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

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Parte 1: As 4 Regras de Ouro da Estruturação */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>As 4 Regras de Ouro para Montar Qualquer Treino</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-900/90 border border-slate-800/80 p-3 rounded-lg">
                <strong className="text-white block mb-1">
                  1. Volume Semanal
                </strong>
                <span className="text-slate-400">
                  Busque entre <strong>10 a 20 séries válidas</strong> por grupo
                  muscular por semana (divididas em 1 ou 2 sessões).
                </span>
              </div>
              <div className="bg-slate-900/90 border border-slate-800/80 p-3 rounded-lg">
                <strong className="text-white block mb-1">
                  2. Ordem dos Exercícios
                </strong>
                <span className="text-slate-400">
                  Comece sempre pelos <strong>Multiarticulares pesados</strong>{" "}
                  (Supino, Agachamento, Remada) e finalize nos{" "}
                  <strong>Isoladores</strong>.
                </span>
              </div>
              <div className="bg-slate-900/90 border border-slate-800/80 p-3 rounded-lg">
                <strong className="text-white block mb-1">
                  3. Tempo de Descanso
                </strong>
                <span className="text-slate-400">
                  <strong>120s a 180s</strong> em exercícios compostos pesados;{" "}
                  <strong>60s a 90s</strong> em exercícios isoladores.
                </span>
              </div>
              <div className="bg-slate-900/90 border border-slate-800/80 p-3 rounded-lg">
                <strong className="text-white block mb-1">
                  4. Faixa de Repetições
                </strong>
                <span className="text-slate-400">
                  <strong>6-8 reps</strong> para força/tensão mecânica;{" "}
                  <strong>8-12 reps</strong> hipertrofia base;{" "}
                  <strong>12-15</strong> isoladores.
                </span>
              </div>
            </div>
          </div>

          {/* Parte 2: Seletor das Divisões */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Lista de Divisões (Esquerda) */}
            <div className="lg:col-span-4 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Escolha a Divisão ({WORKOUT_SPLITS_GUIDE.length} opções)
              </div>
              {WORKOUT_SPLITS_GUIDE.map((split) => {
                const active = split.id === currentSplit.id;
                return (
                  <button
                    key={split.id}
                    type="button"
                    onClick={() => setSelectedSplitId(split.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                      active
                        ? "bg-sky-500/15 border-sky-500 text-white shadow-lg shadow-sky-950/40"
                        : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-extrabold">{split.name}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {split.frequency}
                      </div>
                    </div>
                    <span className="text-[10px] font-bold bg-slate-900 border border-slate-700 text-sky-400 px-2 py-0.5 rounded-full shrink-0">
                      {split.badge}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Detalhes da Divisão Selecionada (Direita) */}
            <div className="lg:col-span-8 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-5">
              <div className="border-b border-slate-800 pb-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-black text-white">
                    {currentSplit.name}
                  </h3>
                  <span className="text-xs font-bold bg-sky-500/15 text-sky-300 border border-sky-500/30 px-3 py-1 rounded-full">
                    {currentSplit.level}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {currentSplit.summary}
                </p>
              </div>

              {/* Calendário Semanal Sugerido */}
              <div>
                <div className="text-xs font-bold uppercase text-slate-400 mb-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-sky-400" />
                  <span>Distribuição Semanal Exemplo</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-7 gap-1.5">
                  {currentSplit.weeklySchedule.map((dayStr, i) => {
                    const isRest = dayStr.toLowerCase().includes("descanso");
                    return (
                      <div
                        key={i}
                        className={`p-2 rounded-lg border text-center text-[11px] font-semibold ${
                          isRest
                            ? "bg-slate-900/40 border-slate-800/60 text-slate-500"
                            : "bg-sky-950/30 border-sky-500/30 text-sky-200"
                        }`}
                      >
                        {dayStr}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Prós e Contras */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-3 space-y-1.5">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Pontos Fortes</span>
                  </div>
                  <ul className="space-y-1 text-slate-300 list-disc list-inside">
                    {currentSplit.pros.map((p, idx) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-950/20 border border-amber-500/20 rounded-xl p-3 space-y-1.5">
                  <div className="font-bold text-amber-400 flex items-center gap-1.5">
                    <ThumbsDown className="w-3.5 h-3.5" />
                    <span>Pontos de Atenção</span>
                  </div>
                  <ul className="space-y-1 text-slate-300 list-disc list-inside">
                    {currentSplit.cons.map((c, idx) => (
                      <li key={idx}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Fichas que compõem esta divisão */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold uppercase text-slate-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-sky-400" />
                  <span>
                    Estrutura das Fichas ({currentSplit.days.length} fichas)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentSplit.days.map((day, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-2"
                    >
                      <div>
                        <div className="text-xs font-extrabold text-white">
                          {day.title}
                        </div>
                        <div className="text-[11px] text-sky-400">
                          Foco: {day.focus}
                        </div>
                      </div>
                      <ul className="space-y-1 text-[11px] text-slate-400 border-t border-slate-800 pt-2">
                        {day.suggestedExercises.map((ex, j) => (
                          <li key={j} className="flex justify-between">
                            <span className="truncate pr-2">• {ex.name}</span>
                            <span className="font-mono text-slate-300 shrink-0">
                              {ex.targetSets}x{ex.targetReps}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Footer: User Chooses Empty Structure vs Full Suggested */}
        <div className="px-5 py-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-1.5 text-xs text-slate-300">
            <span className="text-slate-400">
              Como aplicar <strong className="text-white">{currentSplit.name}</strong>:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {(
                [
                  { id: "newBlock", label: "Criar como novo bloco semanal" },
                  ...(hasExistingRoutines
                    ? [
                        { id: "replace", label: "Substituir fichas do bloco atual" },
                        { id: "append", label: "Adicionar ao bloco atual" },
                      ]
                    : [{ id: "replace", label: "Usar no bloco atual" }]),
                ] as { id: SplitApplyMode; label: string }[]
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setApplyMode(opt.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold border cursor-pointer transition-all ${
                    applyMode === opt.id
                      ? "bg-indigo-500/20 border-indigo-400 text-indigo-200"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => handleGenerate(false)}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all cursor-pointer"
            >
              <FolderPlus className="w-4 h-4 text-sky-400" />
              <span>Criar Fichas Vazias (Só a Estrutura)</span>
            </button>

            <button
              type="button"
              onClick={() => handleGenerate(true)}
              className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold px-4 py-2.5 rounded-xl text-xs transition-all shadow-lg shadow-sky-500/20 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Importar com Exercícios Sugeridos</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
