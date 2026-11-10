"use client";

import React, { useState } from "react";
import { TrainingBlock } from "@/lib/types";
import { MUSCLE_GROUPS } from "@/lib/exerciseCatalog";
import {
  computeWeeklyVolume,
  getVolumeZone,
  STIMULUS_PROFILES,
  TrainingStimulus,
} from "@/lib/volume";
import { ArrowLeftRight, Columns2, Info, X } from "lucide-react";

interface BlockComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  blocks: TrainingBlock[];
  initialBlockAId?: string;
  stimulus: TrainingStimulus;
  includeSynergists: boolean;
}

export function BlockComparisonModal({
  isOpen,
  onClose,
  blocks,
  initialBlockAId,
  stimulus,
  includeSynergists,
}: BlockComparisonModalProps) {
  const [blockAId, setBlockAId] = useState<string>(
    initialBlockAId || blocks[0]?.id || ""
  );
  const [blockBId, setBlockBId] = useState<string>(
    blocks.find((b) => b.id !== (initialBlockAId || blocks[0]?.id))?.id ||
      blocks[0]?.id ||
      ""
  );

  if (!isOpen) return null;

  const profile = STIMULUS_PROFILES[stimulus];
  const blockA = blocks.find((b) => b.id === blockAId) || blocks[0];
  const blockB = blocks.find((b) => b.id === blockBId) || blocks[0];

  if (!blockA || !blockB) return null;

  const volA = computeWeeklyVolume(
    blockA.routines,
    blockA.weeklyFrequency,
    includeSynergists
  );
  const volB = computeWeeklyVolume(
    blockB.routines,
    blockB.weeklyFrequency,
    includeSynergists
  );

  const formatDiff = (diff: number) => {
    const rounded = Number(diff.toFixed(1));
    if (rounded === 0) return "=";
    return rounded > 0 ? `+${rounded}` : `${rounded}`;
  };

  const diffColor = (diff: number) =>
    diff > 0 ? "text-sky-300" : diff < 0 ? "text-amber-300" : "text-slate-500";

  const BlockSelect = ({
    label,
    value,
    onChange,
    accent,
  }: {
    label: string;
    value: string;
    onChange: (id: string) => void;
    accent: string;
  }) => (
    <div className="flex-1 min-w-[180px]">
      <label className={`block text-[10px] font-bold uppercase mb-1 ${accent}`}>
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-white focus:border-sky-500 outline-none"
      >
        {blocks.map((b) => (
          <option key={b.id} value={b.id}>
            {b.name}
            {b.splitType ? ` (${b.splitType})` : " (Personalizado)"}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
              <Columns2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-white">
                Comparar Blocos Semanais
              </h2>
              <p className="text-xs text-slate-400">
                Perfil: {profile.title} • Zona ideal {profile.minOptimalSets}–
                {profile.maxOptimalSets} séries/sem
                {includeSynergists ? " • incluindo séries indiretas" : ""}
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

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {blocks.length < 2 && (
            <div className="flex items-start gap-2 bg-amber-950/30 border border-amber-500/30 text-amber-200 text-xs rounded-xl p-3">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                Você tem apenas 1 bloco. Crie ou duplique um bloco para comparar
                lado a lado.
              </span>
            </div>
          )}

          {/* Seletores */}
          <div className="flex flex-wrap items-end gap-3">
            <BlockSelect
              label="Bloco A"
              value={blockA.id}
              onChange={setBlockAId}
              accent="text-sky-400"
            />
            <button
              type="button"
              onClick={() => {
                setBlockAId(blockB.id);
                setBlockBId(blockA.id);
              }}
              title="Inverter A e B"
              className="p-2 mb-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>
            <BlockSelect
              label="Bloco B"
              value={blockB.id}
              onChange={setBlockBId}
              accent="text-indigo-300"
            />
          </div>

          {/* Tabela (desktop) */}
          <div className="hidden sm:block border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="text-left px-3 py-2.5">Músculo</th>
                  <th className="text-left px-3 py-2.5 text-sky-400">
                    {blockA.name}
                  </th>
                  <th className="text-left px-3 py-2.5 text-indigo-300">
                    {blockB.name}
                  </th>
                  <th className="text-right px-3 py-2.5">Diferença (B − A)</th>
                </tr>
              </thead>
              <tbody>
                {MUSCLE_GROUPS.map((m) => {
                  const a = volA.effective[m];
                  const b = volB.effective[m];
                  const zA = getVolumeZone(a, profile);
                  const zB = getVolumeZone(b, profile);
                  return (
                    <tr
                      key={m}
                      className="border-t border-slate-800/80 hover:bg-slate-950/50"
                    >
                      <td className="px-3 py-2 font-semibold text-white">{m}</td>
                      <td className="px-3 py-2">
                        <span className="inline-flex items-center gap-1.5">
                          <span className={`w-2.5 h-2.5 rounded-full ${zA.dotColor}`} />
                          <strong className="font-mono text-white">{a}</strong>
                          <span className={`text-[10px] ${zA.textColor}`}>
                            {zA.shortLabel}
                          </span>
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <span className="inline-flex items-center gap-1.5">
                          <span className={`w-2.5 h-2.5 rounded-full ${zB.dotColor}`} />
                          <strong className="font-mono text-white">{b}</strong>
                          <span className={`text-[10px] ${zB.textColor}`}>
                            {zB.shortLabel}
                          </span>
                        </span>
                      </td>
                      <td
                        className={`px-3 py-2 text-right font-mono font-bold ${diffColor(
                          b - a
                        )}`}
                      >
                        {formatDiff(b - a)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Cards (mobile) */}
          <div className="sm:hidden space-y-2">
            {MUSCLE_GROUPS.map((m) => {
              const a = volA.effective[m];
              const b = volB.effective[m];
              const zA = getVolumeZone(a, profile);
              const zB = getVolumeZone(b, profile);
              return (
                <div
                  key={m}
                  className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{m}</span>
                    <span
                      className={`text-xs font-mono font-bold ${diffColor(b - a)}`}
                    >
                      {formatDiff(b - a)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="bg-slate-900 rounded-lg p-2">
                      <div className="text-sky-400 font-bold truncate">A</div>
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${zA.dotColor}`} />
                        <strong className="font-mono text-white">{a}</strong>
                        <span className={zA.textColor}>{zA.shortLabel}</span>
                      </div>
                    </div>
                    <div className="bg-slate-900 rounded-lg p-2">
                      <div className="text-indigo-300 font-bold truncate">B</div>
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${zB.dotColor}`} />
                        <strong className="font-mono text-white">{b}</strong>
                        <span className={zB.textColor}>{zB.shortLabel}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Totais */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            {[
              {
                label: "Séries diretas / semana",
                a: volA.totalDirectSets,
                b: volB.totalDirectSets,
              },
              {
                label: "Treinos / semana",
                a: volA.sessionsPerWeek,
                b: volB.sessionsPerWeek,
              },
              {
                label: "Exercícios no bloco",
                a: volA.exerciseCount,
                b: volB.exerciseCount,
              },
            ].map((row) => (
              <div
                key={row.label}
                className="bg-slate-950/80 border border-slate-800 rounded-xl p-3"
              >
                <div className="text-[10px] uppercase font-bold text-slate-400">
                  {row.label}
                </div>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="font-mono text-sky-300 font-black text-base">
                    {row.a}
                  </span>
                  <span className={`font-mono text-[11px] font-bold ${diffColor(row.b - row.a)}`}>
                    {formatDiff(row.b - row.a)}
                  </span>
                  <span className="font-mono text-indigo-300 font-black text-base">
                    {row.b}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3 text-[11px] text-slate-400">
          <span>
            Frequência semanal de cada ficha é a definida em cada bloco (1x, 2x,
            3x) na Calculadora de Volume.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2 rounded-xl cursor-pointer shrink-0 text-xs"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
