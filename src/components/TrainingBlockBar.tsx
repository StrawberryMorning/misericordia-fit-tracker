"use client";

import React, { useState } from "react";
import { TrainingBlock } from "@/lib/types";
import { MUSCLE_GROUPS } from "@/lib/exerciseCatalog";
import { duplicateBlock, generateId } from "@/lib/trainingBlocks";
import {
  computeWeeklyVolume,
  getVolumeZone,
  STIMULUS_PROFILES,
  TrainingStimulus,
} from "@/lib/volume";
import {
  BarChart3,
  Check,
  Columns2,
  Copy,
  Layers,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";

interface TrainingBlockBarProps {
  blocks: TrainingBlock[];
  activeBlockId: string;
  onUpdateBlocks: (blocks: TrainingBlock[], activeBlockId: string) => void;
  stimulus: TrainingStimulus;
  includeSynergists: boolean;
  onOpenComparison: () => void;
  onOpenVolume: () => void;
}

type NameMode = "create" | "rename" | "duplicate" | null;

export function TrainingBlockBar({
  blocks,
  activeBlockId,
  onUpdateBlocks,
  stimulus,
  includeSynergists,
  onOpenComparison,
  onOpenVolume,
}: TrainingBlockBarProps) {
  const [nameMode, setNameMode] = useState<NameMode>(null);
  const [nameInput, setNameInput] = useState("");

  const active = blocks.find((b) => b.id === activeBlockId) || blocks[0];
  if (!active) return null;

  const profile = STIMULUS_PROFILES[stimulus];
  const volume = computeWeeklyVolume(
    active.routines,
    active.weeklyFrequency,
    includeSynergists
  );

  const openNameForm = (mode: NameMode) => {
    setNameMode(mode);
    if (mode === "rename") setNameInput(active.name);
    else if (mode === "duplicate") setNameInput(`${active.name} (Cópia)`);
    else setNameInput("");
  };

  const handleConfirmName = () => {
    const name = nameInput.trim();
    if (!name) return;

    if (nameMode === "create") {
      const created: TrainingBlock = {
        id: generateId("block"),
        name,
        description: "Bloco personalizado",
        routines: [],
        weeklyFrequency: {},
        createdAt: new Date().toISOString(),
      };
      onUpdateBlocks([...blocks, created], created.id);
    } else if (nameMode === "duplicate") {
      const copy = duplicateBlock(active, name);
      onUpdateBlocks([...blocks, copy], copy.id);
    } else if (nameMode === "rename") {
      onUpdateBlocks(
        blocks.map((b) => (b.id === active.id ? { ...b, name } : b)),
        active.id
      );
    }
    setNameMode(null);
    setNameInput("");
  };

  const handleDelete = () => {
    if (blocks.length <= 1) {
      alert("Você precisa ter pelo menos 1 bloco semanal.");
      return;
    }
    if (
      !confirm(
        `Apagar o bloco "${active.name}" e todas as suas fichas? (O histórico de treinos concluídos é mantido.)`
      )
    ) {
      return;
    }
    const remaining = blocks.filter((b) => b.id !== active.id);
    onUpdateBlocks(remaining, remaining[0].id);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-indigo-500/30 rounded-2xl p-4 space-y-3.5">
      {/* Linha 1: Seletor + ações */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex-1 min-w-[220px]">
          <label className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5 mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Bloco Semanal Ativo ({blocks.length} blocos)</span>
          </label>
          <select
            value={active.id}
            onChange={(e) => onUpdateBlocks(blocks, e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm font-bold text-white focus:border-indigo-400 outline-none cursor-pointer"
          >
            {blocks.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} — {b.splitType ? b.splitType : "Personalizado"} (
                {b.routines.length} fichas)
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => openNameForm("create")}
            className="flex items-center gap-1 text-[11px] font-bold bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/40 text-indigo-200 px-2.5 py-2 rounded-lg cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Novo Bloco</span>
          </button>
          <button
            type="button"
            onClick={() => openNameForm("duplicate")}
            title="Duplicar bloco atual"
            className="flex items-center gap-1 text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-2 rounded-lg cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Duplicar</span>
          </button>
          <button
            type="button"
            onClick={() => openNameForm("rename")}
            title="Renomear bloco"
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleDelete}
            title="Apagar bloco"
            className="p-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/50 border border-rose-800/40 text-rose-300 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onOpenComparison}
            className="flex items-center gap-1 text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-indigo-200 px-2.5 py-2 rounded-lg cursor-pointer"
          >
            <Columns2 className="w-3.5 h-3.5" />
            <span>Comparar Blocos</span>
          </button>
        </div>
      </div>

      {/* Formulário inline de nome */}
      {nameMode && (
        <div className="flex flex-wrap items-center gap-2 bg-slate-950/80 border border-slate-800 rounded-xl p-2.5">
          <span className="text-[11px] font-bold text-slate-300">
            {nameMode === "create"
              ? "Nome do novo bloco:"
              : nameMode === "duplicate"
              ? "Nome da cópia:"
              : "Novo nome:"}
          </span>
          <input
            autoFocus
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleConfirmName();
              if (e.key === "Escape") setNameMode(null);
            }}
            placeholder="Ex: PPL — Semana Pesada / Deload / Viagem"
            className="flex-1 min-w-[180px] bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-indigo-400 outline-none"
          />
          <button
            type="button"
            onClick={handleConfirmName}
            className="p-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 cursor-pointer"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setNameMode(null)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Volume semanal embutido do bloco */}
      <button
        type="button"
        onClick={onOpenVolume}
        title="Abrir Calculadora de Volume deste bloco"
        className="w-full text-left bg-slate-950/70 border border-slate-800 hover:border-slate-700 rounded-xl p-3 space-y-2 cursor-pointer transition-colors"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
          <span className="font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
            Volume semanal deste bloco
          </span>
          <span className="text-slate-400">
            Total do bloco: <strong className="text-white">{volume.totalDirectSets} séries</strong> •{" "}
            <strong className="text-white">{volume.sessionsPerWeek} treinos/sem</strong> • Meta:{" "}
            <strong className="text-emerald-400">{profile.minOptimalSets}–{profile.maxOptimalSets} séries por músculo</strong>
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {MUSCLE_GROUPS.map((m) => {
            const sets = volume.effective[m];
            const z = getVolumeZone(sets, profile);
            return (
              <span
                key={m}
                className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${z.badgeColor}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${z.dotColor}`} />
                {m} <strong className="font-mono">{sets}</strong>
              </span>
            );
          })}
        </div>
      </button>
    </div>
  );
}
