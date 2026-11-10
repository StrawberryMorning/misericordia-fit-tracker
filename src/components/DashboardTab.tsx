"use client";

import React, { useState } from "react";
import { BodyLog, UserProfile, WorkoutSession } from "@/lib/types";
import { EvolutionChart } from "./EvolutionChart";
import { getBFCategory } from "@/lib/formulas";
import {
  Activity,
  Award,
  Dumbbell,
  Flame,
  Scale,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

interface DashboardTabProps {
  profile: UserProfile;
  bodyLogs: BodyLog[];
  workoutSessions: WorkoutSession[];
  onNavigateTab: (tab: "dashboard" | "workout" | "body") => void;
}

export function DashboardTab({
  profile,
  bodyLogs,
  workoutSessions,
  onNavigateTab,
}: DashboardTabProps) {
  const [chartMode, setChartMode] = useState<
    "composition" | "bf" | "circumferences"
  >("composition");

  const latest = bodyLogs[bodyLogs.length - 1];
  const previous = bodyLogs.length > 1 ? bodyLogs[bodyLogs.length - 2] : null;

  const weightDiff =
    latest && previous
      ? Number((latest.weightKg - previous.weightKg).toFixed(1))
      : 0;
  const lbmDiff =
    latest && previous
      ? Number((latest.lbmKg - previous.lbmKg).toFixed(2))
      : 0;
  const bfDiff =
    latest && previous
      ? Number((latest.bfPercent - previous.bfPercent).toFixed(1))
      : 0;

  const labels = bodyLogs.map((l) => l.date.slice(5)); // MM-DD

  const totalVolumeAllTime = workoutSessions.reduce(
    (acc, s) => acc + s.totalVolumeKg,
    0
  );

  const bfStatus = latest
    ? getBFCategory(profile.sex, latest.bfPercent)
    : { label: "—", color: "text-slate-400" };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Peso Corporal</span>
            <Scale className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black text-white mt-2">
            {latest ? `${latest.weightKg} kg` : "—"}
          </div>
          {previous && (
            <div className="text-xs mt-1 flex items-center gap-1 text-slate-400">
              {weightDiff <= 0 ? (
                <TrendingDown className="w-3.5 h-3.5 text-sky-400" />
              ) : (
                <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
              )}
              <span>
                {weightDiff > 0 ? `+${weightDiff}` : weightDiff} kg vs. anterior
              </span>
            </div>
          )}
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Massa Magra (LBM)</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-2">
            {latest ? `${latest.lbmKg} kg` : "—"}
          </div>
          {previous && (
            <div className="text-xs mt-1 text-slate-400">
              {lbmDiff >= 0 ? (
                <span className="text-emerald-400 font-semibold">
                  +{lbmDiff} kg ganho limpo
                </span>
              ) : (
                <span className="text-rose-400">{lbmDiff} kg</span>
              )}
            </div>
          )}
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Gordura Corporal (BF%)</span>
            <Activity className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black text-sky-400 mt-2">
            {latest ? `${latest.bfPercent}%` : "—"}
          </div>
          <div className={`text-xs mt-1 font-semibold ${bfStatus.color}`}>
            {bfStatus.label}{" "}
            {previous && `(${bfDiff > 0 ? `+${bfDiff}` : bfDiff}%)`}
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Treinos & Volume</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400 mt-2">
            {workoutSessions.length}{" "}
            <span className="text-sm font-normal text-slate-400">sessões</span>
          </div>
          <div className="text-xs mt-1 text-slate-400">
            Volume Acumulado:{" "}
            <strong className="text-slate-200">{totalVolumeAllTime} kg</strong>
          </div>
        </div>
      </div>

      {/* Gráficos Interativos */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-sky-400">
              Curvas de Evolução Física
            </h2>
            <p className="text-xs text-slate-400">
              Alterne entre Peso vs. Massa Magra, Percentual de Gordura e
              Circunferências
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {[
              { id: "composition", label: "Peso vs. Massa Magra" },
              { id: "bf", label: "Evolução BF%" },
              { id: "circumferences", label: "Cintura vs. Ombros" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() =>
                  setChartMode(
                    tab.id as "composition" | "bf" | "circumferences"
                  )
                }
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  chartMode === tab.id
                    ? "bg-sky-500 text-slate-950"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {chartMode === "composition" && (
          <EvolutionChart
            labels={labels}
            unit="kg"
            series={[
              {
                label: "Peso Bruto (kg)",
                color: "#94a3b8",
                data: bodyLogs.map((l) => l.weightKg),
              },
              {
                label: "Massa Magra LBM (kg)",
                color: "#10b981",
                data: bodyLogs.map((l) => l.lbmKg),
                fill: true,
              },
            ]}
          />
        )}

        {chartMode === "bf" && (
          <EvolutionChart
            labels={labels}
            unit="%"
            series={[
              {
                label: "Gordura Corporal BF (%)",
                color: "#0ea5e9",
                data: bodyLogs.map((l) => l.bfPercent),
                fill: true,
              },
            ]}
          />
        )}

        {chartMode === "circumferences" && (
          <EvolutionChart
            labels={labels}
            unit="cm"
            series={[
              {
                label: "Ombros (cm)",
                color: "#f59e0b",
                data: bodyLogs.map((l) => l.circumferences.shoulders || 0),
              },
              {
                label: "Cintura (cm)",
                color: "#f43f5e",
                data: bodyLogs.map((l) => l.circumferences.waist || 0),
              },
            ]}
          />
        )}
      </div>

      {/* Índices Estéticos & Ações Rápidas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400">
            Proporções Corporais & Saúde Atual
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
              <div className="text-xs text-slate-400">
                Índice V-Taper (Ombro/Cintura)
              </div>
              <div className="text-2xl font-black text-amber-400 mt-1">
                {latest?.vTaper ?? "—"}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Proporção Áurea Clássica: <strong>1.618</strong>
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
              <div className="text-xs text-slate-400">
                FFMI (Massa Magra / Altura)
              </div>
              <div className="text-2xl font-black text-emerald-400 mt-1">
                {latest?.ffmi ?? "—"}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                19-21: Fitness • 22-25: Avançado
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
              <div className="text-xs text-slate-400">
                Relação Cintura/Altura
              </div>
              <div className="text-2xl font-black text-sky-400 mt-1">
                {latest?.waistToHeight ?? "—"}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Ideal Cardíaco: <strong>&lt; 0.50</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-gradient-to-br from-sky-950/70 via-slate-900 to-slate-900 border border-sky-500/30 rounded-2xl p-5 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">
              Pronto para o próximo registro?
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Inicie seu treino com cronômetro ao vivo e timer de descanso
              automático ou registre novas medidas e dobras cutâneas.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onNavigateTab("workout")}
              className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold py-3 px-4 rounded-xl text-xs transition-all cursor-pointer"
            >
              <Dumbbell className="w-4 h-4" />
              <span>Ir para Treinos</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab("body")}
              className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold py-3 px-4 rounded-xl text-xs transition-all cursor-pointer"
            >
              <Scale className="w-4 h-4 text-sky-400" />
              <span>Nova Medição / BF%</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
