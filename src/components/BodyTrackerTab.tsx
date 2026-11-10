"use client";

import React, { useState } from "react";
import {
  BFMethod,
  BodyLog,
  Circumferences,
  Skinfolds,
  UserProfile,
} from "@/lib/types";
import {
  calculateCompositionMetrics,
  calculateNavyBF,
  calculatePollock3BF,
  calculatePollock7BF,
  getBFCategory,
} from "@/lib/formulas";
import {
  Calculator,
  CheckCircle2,
  Ruler,
  Scale,
  Sparkles,
  Trash2,
} from "lucide-react";

interface BodyTrackerTabProps {
  profile: UserProfile;
  bodyLogs: BodyLog[];
  onSaveLog: (log: BodyLog) => void;
  onDeleteLog: (id: string) => void;
  onUpdateProfile: (profile: UserProfile) => void;
}

export function BodyTrackerTab({
  profile,
  bodyLogs,
  onSaveLog,
  onDeleteLog,
  onUpdateProfile,
}: BodyTrackerTabProps) {
  const todayStr = new Date().toISOString().split("T")[0];
  const latestLog = bodyLogs[bodyLogs.length - 1];

  const [date, setDate] = useState(todayStr);
  const [weightKg, setWeightKg] = useState<string>(
    latestLog ? String(latestLog.weightKg) : "75.0"
  );
  const [selectedMethod, setSelectedMethod] = useState<BFMethod>("navy");
  const [manualBf, setManualBf] = useState<string>(
    latestLog ? String(latestLog.bfPercent) : "15.0"
  );
  const [notes, setNotes] = useState("");

  // Circumferences (cm)
  const [circ, setCirc] = useState<Circumferences>({
    neck: latestLog?.circumferences.neck ?? 40,
    shoulders: latestLog?.circumferences.shoulders ?? 121,
    chest: latestLog?.circumferences.chest ?? 103,
    armRight: latestLog?.circumferences.armRight ?? 38.5,
    armLeft: latestLog?.circumferences.armLeft ?? 38.0,
    forearm: latestLog?.circumferences.forearm ?? 30.5,
    waist: latestLog?.circumferences.waist ?? 82,
    hips: latestLog?.circumferences.hips ?? 96,
    thighRight: latestLog?.circumferences.thighRight ?? 59,
    calf: latestLog?.circumferences.calf ?? 39,
  });

  // Skinfolds (mm)
  const [folds, setFolds] = useState<Skinfolds>({
    chest: latestLog?.skinfolds?.chest ?? 10,
    abdomen: latestLog?.skinfolds?.abdomen ?? 18,
    thigh: latestLog?.skinfolds?.thigh ?? 14,
    triceps: latestLog?.skinfolds?.triceps ?? 10,
    subscapular: latestLog?.skinfolds?.subscapular ?? 13,
    suprailiac: latestLog?.skinfolds?.suprailiac ?? 14,
    midaxillary: latestLog?.skinfolds?.midaxillary ?? 11,
  });

  // Live BF% Calculations across all 3 methods
  const navyResult = calculateNavyBF(
    profile.sex,
    profile.heightCm,
    circ.neck || 0,
    circ.waist || 0,
    circ.hips
  );

  const pollock3Result = calculatePollock3BF(profile.sex, profile.age, folds);
  const pollock7Result = calculatePollock7BF(profile.sex, profile.age, folds);

  // Consensus Average if multiple methods are valid
  const validResults = [navyResult, pollock3Result, pollock7Result].filter(
    (v): v is number => v !== null
  );
  const consensusBf =
    validResults.length > 0
      ? Number(
          (
            validResults.reduce((acc, v) => acc + v, 0) / validResults.length
          ).toFixed(1)
        )
      : null;

  const activeBf: number = (() => {
    if (selectedMethod === "navy" && navyResult !== null) return navyResult;
    if (selectedMethod === "pollock3" && pollock3Result !== null)
      return pollock3Result;
    if (selectedMethod === "pollock7" && pollock7Result !== null)
      return pollock7Result;
    return parseFloat(manualBf) || 15;
  })();

  const parsedWeight = parseFloat(weightKg) || 0;
  const derived = calculateCompositionMetrics(
    parsedWeight,
    activeBf,
    profile.heightCm,
    circ
  );
  const bfCategory = getBFCategory(profile.sex, activeBf);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || parsedWeight <= 0 || activeBf <= 0) {
      alert("Preencha Data, Peso e verifique o cálculo de BF%.");
      return;
    }

    const newLog: BodyLog = {
      id: `body-${Date.now()}`,
      date,
      weightKg: parsedWeight,
      bfPercent: activeBf,
      bfMethod: selectedMethod,
      lbmKg: derived.lbmKg,
      fatMassKg: derived.fatMassKg,
      ffmi: derived.ffmi,
      vTaper: derived.vTaper,
      waistToHeight: derived.waistToHeight,
      circumferences: circ,
      skinfolds: folds,
      notes: notes.trim() || undefined,
    };

    onSaveLog(newLog);
    setNotes("");
  };

  return (
    <div className="space-y-6">
      {/* Perfil Base */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-sky-400">
              Parâmetros Biométricos do Atleta
            </h2>
            <p className="text-xs text-slate-400">
              Usados nas equações de densidade corporal (Marinha Americana &
              Jackson-Pollock)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">
              Altura (cm)
            </label>
            <input
              type="number"
              value={profile.heightCm}
              onChange={(e) =>
                onUpdateProfile({
                  ...profile,
                  heightCm: Number(e.target.value) || 169,
                })
              }
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:border-sky-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Idade</label>
            <input
              type="number"
              value={profile.age}
              onChange={(e) =>
                onUpdateProfile({
                  ...profile,
                  age: Number(e.target.value) || 21,
                })
              }
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:border-sky-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">
              Sexo Biológico (Fórmulas)
            </label>
            <select
              value={profile.sex}
              onChange={(e) =>
                onUpdateProfile({
                  ...profile,
                  sex: e.target.value as "male" | "female",
                })
              }
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:border-sky-500 outline-none"
            >
              <option value="male">Masculino</option>
              <option value="female">Feminino</option>
            </select>
          </div>
        </div>
      </div>

      {/* Formulário Unificado: Peso + Calculadora Multi-Método + Circunferências */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Coluna Esquerda: Dados Principais & Escolha de Método BF% */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-sm uppercase tracking-wider">
              <Scale className="w-4 h-4" />
              <span>1. Data & Peso Corporal</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Data da Medição
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Peso em Jejum (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-sm font-bold text-sky-400"
                />
              </div>
            </div>
          </div>

          {/* Seletor dos 3 Melhores Métodos de BF% */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-sm uppercase tracking-wider">
                <Calculator className="w-4 h-4" />
                <span>2. Método de Cálculo de BF%</span>
              </div>
              {consensusBf !== null && (
                <span className="text-xs bg-sky-500/10 border border-sky-500/30 text-sky-300 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Consenso Médio: <strong>{consensusBf}%</strong>
                </span>
              )}
            </div>

            {/* Botões de Método */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                {
                  id: "navy",
                  title: "US Navy",
                  sub: "Fita Métrica",
                  val: navyResult ? `${navyResult}%` : "—",
                },
                {
                  id: "pollock3",
                  title: "Pollock 3",
                  sub: "3 Dobras (mm)",
                  val: pollock3Result ? `${pollock3Result}%` : "—",
                },
                {
                  id: "pollock7",
                  title: "Pollock 7",
                  sub: "7 Dobras (mm)",
                  val: pollock7Result ? `${pollock7Result}%` : "—",
                },
                {
                  id: "manual",
                  title: "Bio / DEXA",
                  sub: "Valor Manual",
                  val: `${manualBf}%`,
                },
              ].map((m) => {
                const active = selectedMethod === m.id;
                return (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => setSelectedMethod(m.id as BFMethod)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      active
                        ? "bg-sky-500/15 border-sky-500 text-white shadow-lg shadow-sky-950/50"
                        : "bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className="text-xs font-bold">{m.title}</div>
                    <div className="text-[10px] text-slate-400">{m.sub}</div>
                    <div className="text-base font-extrabold text-sky-400 mt-1">
                      {m.val}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Campos específicos do método selecionado */}
            {selectedMethod === "navy" && (
              <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-4 space-y-3">
                <p className="text-xs text-slate-400">
                  <strong>Método Marinha Americana (US Navy):</strong> Mede a
                  relação entre pescoço, cintura (na linha do umbigo) e altura.
                  Excelente consistência para acompanhar perda de gordura
                  abdominal.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Pescoço (cm)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={circ.neck ?? ""}
                      onChange={(e) =>
                        setCirc({ ...circ, neck: parseFloat(e.target.value) })
                      }
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Cintura (cm)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={circ.waist ?? ""}
                      onChange={(e) =>
                        setCirc({ ...circ, waist: parseFloat(e.target.value) })
                      }
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                    />
                  </div>
                  {profile.sex === "female" && (
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">
                        Quadril (cm)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={circ.hips ?? ""}
                        onChange={(e) =>
                          setCirc({ ...circ, hips: parseFloat(e.target.value) })
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {selectedMethod === "pollock3" && (
              <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-4 space-y-3">
                <p className="text-xs text-slate-400">
                  <strong>Jackson & Pollock (3 Dobras Cutâneas):</strong> O
                  melhor método com adipômetro para fazer sozinho em casa (todos
                  os pontos ficam na parte frontal do corpo).
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {profile.sex === "male" ? (
                    <>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">
                          Peitoral (mm)
                        </label>
                        <input
                          type="number"
                          step="0.5"
                          value={folds.chest ?? ""}
                          onChange={(e) =>
                            setFolds({
                              ...folds,
                              chest: parseFloat(e.target.value),
                            })
                          }
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">
                          Abdominal (mm)
                        </label>
                        <input
                          type="number"
                          step="0.5"
                          value={folds.abdomen ?? ""}
                          onChange={(e) =>
                            setFolds({
                              ...folds,
                              abdomen: parseFloat(e.target.value),
                            })
                          }
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">
                          Coxa (mm)
                        </label>
                        <input
                          type="number"
                          step="0.5"
                          value={folds.thigh ?? ""}
                          onChange={(e) =>
                            setFolds({
                              ...folds,
                              thigh: parseFloat(e.target.value),
                            })
                          }
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">
                          Tríceps (mm)
                        </label>
                        <input
                          type="number"
                          step="0.5"
                          value={folds.triceps ?? ""}
                          onChange={(e) =>
                            setFolds({
                              ...folds,
                              triceps: parseFloat(e.target.value),
                            })
                          }
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">
                          Supra-ilíaca (mm)
                        </label>
                        <input
                          type="number"
                          step="0.5"
                          value={folds.suprailiac ?? ""}
                          onChange={(e) =>
                            setFolds({
                              ...folds,
                              suprailiac: parseFloat(e.target.value),
                            })
                          }
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">
                          Coxa (mm)
                        </label>
                        <input
                          type="number"
                          step="0.5"
                          value={folds.thigh ?? ""}
                          onChange={(e) =>
                            setFolds({
                              ...folds,
                              thigh: parseFloat(e.target.value),
                            })
                          }
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {selectedMethod === "pollock7" && (
              <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-4 space-y-3">
                <p className="text-xs text-slate-400">
                  <strong>Jackson & Pollock (7 Dobras Cutâneas):</strong>{" "}
                  Protocolo completo de avaliação física esportiva.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { key: "chest", label: "Peitoral (mm)" },
                    { key: "abdomen", label: "Abdominal (mm)" },
                    { key: "thigh", label: "Coxa (mm)" },
                    { key: "triceps", label: "Tríceps (mm)" },
                    { key: "subscapular", label: "Subescapular (mm)" },
                    { key: "suprailiac", label: "Supra-ilíaca (mm)" },
                    { key: "midaxillary", label: "Axilar Média (mm)" },
                  ].map((item) => (
                    <div key={item.key}>
                      <label className="block text-[11px] text-slate-400 mb-1">
                        {item.label}
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        value={folds[item.key as keyof Skinfolds] ?? ""}
                        onChange={(e) =>
                          setFolds({
                            ...folds,
                            [item.key]: parseFloat(e.target.value),
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm text-white"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedMethod === "manual" && (
              <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-4 space-y-3">
                <p className="text-xs text-slate-400">
                  Insira diretamente o percentual obtido em exame{" "}
                  <strong>DEXA</strong> ou balança de{" "}
                  <strong>Bioimpedância (InBody / Omron / Xiaomi)</strong>.
                </p>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    BF (%) Manual
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={manualBf}
                    onChange={(e) => setManualBf(e.target.value)}
                    className="w-40 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm font-bold text-sky-400"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Circunferências Completas */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-sm uppercase tracking-wider">
              <Ruler className="w-4 h-4" />
              <span>3. Circunferências Musculares (cm)</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { key: "shoulders", label: "Ombros" },
                { key: "chest", label: "Peitoral" },
                { key: "waist", label: "Cintura" },
                { key: "neck", label: "Pescoço" },
                { key: "armRight", label: "Braço Dir." },
                { key: "armLeft", label: "Braço Esq." },
                { key: "forearm", label: "Antebraço" },
                { key: "hips", label: "Quadril" },
                { key: "thighRight", label: "Coxa" },
                { key: "calf", label: "Panturrilha" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-xs text-slate-400 mb-1">
                    {field.label}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={circ[field.key as keyof Circumferences] ?? ""}
                    onChange={(e) =>
                      setCirc({
                        ...circ,
                        [field.key]: parseFloat(e.target.value) || undefined,
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:border-sky-500 outline-none"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Observações (ex: Pós-refeição livre, em cutting, etc.)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Opcional..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200"
              />
            </div>
          </div>
        </div>

        {/* Coluna Direita: Painel de Resultado em Tempo Real + Botão Salvar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-sky-500/30 rounded-2xl p-6 space-y-5 sticky top-6">
            <div className="text-center border-b border-slate-800 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Resultado da Avaliação
              </span>
              <div className="flex items-baseline justify-center gap-1 mt-2">
                <span className="text-5xl font-black text-sky-400">
                  {activeBf.toFixed(1)}
                </span>
                <span className="text-xl text-slate-400 font-bold">% BF</span>
              </div>
              <p className={`text-xs font-semibold mt-1 ${bfCategory.color}`}>
                Classificação: {bfCategory.label}
              </p>
            </div>

            {/* Decomposição Corporal */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl">
                <div className="text-[11px] text-slate-400">
                  Massa Magra (LBM)
                </div>
                <div className="text-xl font-extrabold text-emerald-400 mt-0.5">
                  {derived.lbmKg} <span className="text-xs font-normal">kg</span>
                </div>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl">
                <div className="text-[11px] text-slate-400">Massa Gorda</div>
                <div className="text-xl font-extrabold text-rose-400 mt-0.5">
                  {derived.fatMassKg}{" "}
                  <span className="text-xs font-normal">kg</span>
                </div>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl">
                <div className="text-[11px] text-slate-400">
                  FFMI Normalizado
                </div>
                <div className="text-lg font-bold text-sky-300 mt-0.5">
                  {derived.ffmi}
                  <span className="text-[10px] text-slate-500 block">
                    {derived.ffmi >= 22
                      ? "Alto Desenvolvimento"
                      : "Atlético / Evoluindo"}
                  </span>
                </div>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl">
                <div className="text-[11px] text-slate-400">
                  Proporção V-Taper
                </div>
                <div className="text-lg font-bold text-amber-300 mt-0.5">
                  {derived.vTaper ?? "—"}
                  <span className="text-[10px] text-slate-500 block">
                    Meta Áurea: 1.618
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold py-3.5 rounded-xl transition-all shadow-lg shadow-sky-500/20 cursor-pointer"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Salvar Avaliação no Histórico</span>
            </button>

            {/* Histórico de Avaliações com botão de Excluir individual */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <h4 className="text-xs font-bold uppercase text-slate-400">
                Histórico de Medidas ({bodyLogs.length})
              </h4>
              <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                {bodyLogs
                  .slice()
                  .reverse()
                  .map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between bg-slate-900/80 border border-slate-800/80 px-3 py-2 rounded-lg text-xs"
                    >
                      <div>
                        <span className="font-mono text-slate-300 font-semibold">
                          {item.date}
                        </span>
                        <span className="ml-2 text-sky-400 font-bold">
                          {item.weightKg}kg
                        </span>
                        <span className="ml-1.5 text-emerald-400">
                          ({item.bfPercent}% BF • LBM {item.lbmKg}kg)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => onDeleteLog(item.id)}
                        title="Excluir este registro"
                        className="text-slate-500 hover:text-rose-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
