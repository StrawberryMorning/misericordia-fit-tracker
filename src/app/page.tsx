"use client";

import React, { useEffect, useState } from "react";
import {
  AppDatabase,
  BodyLog,
  TrainingBlock,
  UserProfile,
  WorkoutRoutine,
  WorkoutSession,
} from "@/lib/types";
import { DEFAULT_DATABASE } from "@/lib/defaultData";
import { normalizeDatabase } from "@/lib/trainingBlocks";
import { DashboardTab } from "@/components/DashboardTab";
import { WorkoutTrackerTab } from "@/components/WorkoutTrackerTab";
import { BodyTrackerTab } from "@/components/BodyTrackerTab";
import {
  Cloud,
  Download,
  Dumbbell,
  LayoutDashboard,
  RotateCcw,
  Ruler,
  Upload,
} from "lucide-react";

const LOCAL_STORAGE_KEY = "brass_bell_v2_db_clean";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "workout" | "body">(
    "dashboard"
  );
  const [db, setDb] = useState<AppDatabase>(() =>
    normalizeDatabase(DEFAULT_DATABASE)
  );
  const [syncStatus, setSyncStatus] = useState<
    "synced" | "syncing" | "offline"
  >("synced");

  // Load initial data from Server API (/api/sync) + LocalStorage fallback
  useEffect(() => {
    async function loadInitial() {
      try {
        const res = await fetch("/api/sync");
        if (res.ok) {
          const serverDb = normalizeDatabase(
            (await res.json()) as AppDatabase
          );
          setDb(serverDb);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(serverDb));
          setSyncStatus("synced");
          return;
        }
      } catch {
        // Fallback to offline local cache
      }

      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        try {
          setDb(normalizeDatabase(JSON.parse(cached)));
        } catch {
          setDb(normalizeDatabase(DEFAULT_DATABASE));
        }
      }
      setSyncStatus("offline");
    }

    loadInitial();
  }, []);

  // Persist changes to LocalStorage AND Server API
  const persistDatabase = async (nextDb: AppDatabase) => {
    const stamped: AppDatabase = {
      ...normalizeDatabase(nextDb),
      updatedAt: new Date().toISOString(),
    };
    setDb(stamped);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stamped));
    setSyncStatus("syncing");

    try {
      const res = await fetch("/api/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stamped),
      });
      setSyncStatus(res.ok ? "synced" : "offline");
    } catch {
      setSyncStatus("offline");
    }
  };

  // Handlers
  const handleSaveBodyLog = (newLog: BodyLog) => {
    const updatedLogs = [...db.bodyLogs, newLog].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    persistDatabase({ ...db, bodyLogs: updatedLogs });
    setActiveTab("dashboard");
  };

  const handleDeleteBodyLog = (id: string) => {
    const updatedLogs = db.bodyLogs.filter((l) => l.id !== id);
    persistDatabase({ ...db, bodyLogs: updatedLogs });
  };

  const handleUpdateProfile = (profile: UserProfile) => {
    persistDatabase({ ...db, profile });
  };

  const handleSaveWorkoutSession = (session: WorkoutSession) => {
    persistDatabase({
      ...db,
      workoutSessions: [...db.workoutSessions, session],
    });
  };

  const handleDeleteWorkoutSession = (id: string) => {
    persistDatabase({
      ...db,
      workoutSessions: db.workoutSessions.filter((s) => s.id !== id),
    });
  };

  // Atualiza as fichas do BLOCO ATIVO
  const handleUpdateRoutines = (routines: WorkoutRoutine[]) => {
    const blocks = (db.trainingBlocks || []).map((b) =>
      b.id === db.activeBlockId ? { ...b, routines } : b
    );
    persistDatabase({ ...db, trainingBlocks: blocks, routines });
  };

  // Atualiza a lista de blocos semanais e/ou o bloco ativo
  const handleUpdateBlocks = (
    blocks: TrainingBlock[],
    activeBlockId: string
  ) => {
    persistDatabase({ ...db, trainingBlocks: blocks, activeBlockId });
  };

  const handleResetAllData = () => {
    if (
      confirm(
        "Tem certeza que deseja zerar todo o histórico de medidas e sessões de treino?"
      )
    ) {
      localStorage.removeItem("brass_bell_v2_db");
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      persistDatabase({
        ...DEFAULT_DATABASE,
        trainingBlocks: undefined,
        activeBlockId: undefined,
      });
    }
  };

  // JSON Backup Export & Import
  const handleExportBackup = () => {
    const blob = new Blob([JSON.stringify(db, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `brass-bell-backup-${
      new Date().toISOString().split("T")[0]
    }.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(String(reader.result)) as AppDatabase;
        if (imported.bodyLogs && imported.routines) {
          persistDatabase(imported);
        }
      } catch {
        alert("Arquivo JSON inválido.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-950 text-slate-100">
      {/* Desktop Left Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-slate-900/95 border-r border-slate-800 p-5 justify-between">
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-sky-500 flex items-center justify-center text-slate-950 font-black text-lg shadow-lg shadow-sky-500/30">
                BB
              </div>
              <div>
                <h1 className="text-base font-black uppercase tracking-widest text-white">
                  Brass Bell
                </h1>
                <p className="text-[11px] text-sky-400 font-semibold">
                  Fit & Body Tracker 2.0
                </p>
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            {[
              {
                id: "dashboard",
                label: "Dashboard & Evolução",
                icon: LayoutDashboard,
              },
              {
                id: "workout",
                label: "Treino Ao Vivo & Fichas",
                icon: Dumbbell,
              },
              {
                id: "body",
                label: "Medidas & Cálculo BF%",
                icon: Ruler,
              },
            ].map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setActiveTab(item.id as "dashboard" | "workout" | "body")
                  }
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                    active
                      ? "bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20"
                      : "text-slate-400 hover:bg-slate-800/70 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sync Status & Backup Controls */}
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between text-xs bg-slate-950 px-3 py-2 rounded-lg border border-slate-800">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Cloud className="w-3.5 h-3.5 text-sky-400" />
              Sincronização
            </span>
            <span
              className={`font-bold ${
                syncStatus === "synced"
                  ? "text-emerald-400"
                  : syncStatus === "syncing"
                  ? "text-amber-400"
                  : "text-slate-400"
              }`}
            >
              {syncStatus === "synced"
                ? "Ativa (API + Local)"
                : syncStatus === "syncing"
                ? "Salvando..."
                : "Modo Offline"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleExportBackup}
              className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2 rounded-lg cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar</span>
            </button>
            <label className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2 rounded-lg cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>Importar</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportBackup}
                className="hidden"
              />
            </label>
          </div>
          <button
            type="button"
            onClick={handleResetAllData}
            className="w-full flex items-center justify-center gap-1.5 bg-rose-950/40 hover:bg-rose-900/50 border border-rose-800/40 text-rose-300 text-xs font-semibold py-2 rounded-lg cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Zerar Histórico</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:pl-64 pb-24 md:pb-10">
        {/* Top Mobile Header */}
        <header className="md:hidden flex items-center justify-between px-4 py-3.5 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-sky-500 flex items-center justify-center text-slate-950 font-black text-xs">
              BB
            </div>
            <div>
              <h1 className="text-sm font-black uppercase tracking-wider text-white">
                Brass Bell 2.0
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetAllData}
              className="text-xs bg-rose-950/50 border border-rose-800/50 px-2.5 py-1.5 rounded-lg text-rose-300 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Zerar
            </button>
            <button
              type="button"
              onClick={handleExportBackup}
              className="text-xs bg-slate-800 px-2.5 py-1.5 rounded-lg text-slate-300 flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              Backup
            </button>
          </div>
        </header>

        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
          {activeTab === "dashboard" && (
            <DashboardTab
              profile={db.profile}
              bodyLogs={db.bodyLogs}
              workoutSessions={db.workoutSessions}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === "workout" && (
            <WorkoutTrackerTab
              routines={db.routines}
              blocks={db.trainingBlocks || []}
              activeBlockId={db.activeBlockId || ""}
              sessions={db.workoutSessions}
              onSaveSession={handleSaveWorkoutSession}
              onUpdateRoutines={handleUpdateRoutines}
              onUpdateBlocks={handleUpdateBlocks}
              onDeleteSession={handleDeleteWorkoutSession}
            />
          )}

          {activeTab === "body" && (
            <BodyTrackerTab
              profile={db.profile}
              bodyLogs={db.bodyLogs}
              onSaveLog={handleSaveBodyLog}
              onDeleteLog={handleDeleteBodyLog}
              onUpdateProfile={handleUpdateProfile}
            />
          )}
        </div>
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 grid grid-cols-3 p-1.5">
        {[
          { id: "dashboard", label: "Evolução", icon: LayoutDashboard },
          { id: "workout", label: "Treinar", icon: Dumbbell },
          { id: "body", label: "Medidas & BF%", icon: Ruler },
        ].map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() =>
                setActiveTab(item.id as "dashboard" | "workout" | "body")
              }
              className={`flex flex-col items-center justify-center py-2 rounded-xl text-xs font-bold transition-all ${
                active ? "text-sky-400 bg-sky-500/10" : "text-slate-400"
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
