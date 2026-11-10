"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ExerciseTemplate,
  PerformedExercise,
  WorkoutRoutine,
  WorkoutSession,
} from "@/lib/types";
import { calculateEstimated1RM } from "@/lib/formulas";
import { WorkoutSplitGuideModal } from "./WorkoutSplitGuideModal";
import { ExerciseExecutionModal } from "./ExerciseExecutionModal";
import { ExerciseAnimationSVG } from "./ExerciseAnimationSVG";
import {
  CatalogExercise,
  EXERCISE_CATALOG,
  MUSCLE_GROUPS,
  resolveExerciseIllustration,
} from "@/lib/exerciseCatalog";
import {
  BookOpen,
  Check,
  Clock,
  Dumbbell,
  Eye,
  Flame,
  Pause,
  Play,
  Plus,
  SkipForward,
  Square,
  Timer,
  Trash2,
  Trophy,
  Volume2,
} from "lucide-react";

interface WorkoutTrackerTabProps {
  routines: WorkoutRoutine[];
  sessions: WorkoutSession[];
  onSaveSession: (session: WorkoutSession) => void;
  onUpdateRoutines: (routines: WorkoutRoutine[]) => void;
  onDeleteSession: (id: string) => void;
}

// Web Audio API Synthesizer for Rest Timer Alert (No external MP3 required)
function playRestFinishedAlarm() {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new AudioCtx();
    const beep = (freq: number, startOffset: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + startOffset);
      gain.gain.setValueAtTime(0.25, ctx.currentTime + startOffset);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + startOffset + duration
      );
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + startOffset);
      osc.stop(ctx.currentTime + startOffset + duration);
    };

    beep(880, 0, 0.16);
    beep(880, 0.2, 0.16);
    beep(1174.66, 0.42, 0.35);

    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
  } catch {
    // Ignore audio block if no interaction yet
  }
}

export function formatDuration(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (hrs > 0) {
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  }
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export function WorkoutTrackerTab({
  routines,
  sessions,
  onSaveSession,
  onUpdateRoutines,
  onDeleteSession,
}: WorkoutTrackerTabProps) {
  // Active Workout Session State
  const [activeRoutine, setActiveRoutine] = useState<WorkoutRoutine | null>(
    null
  );
  const [sessionStartMs, setSessionStartMs] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isSessionPaused, setIsSessionPaused] = useState<boolean>(false);
  const [exercisesState, setExercisesState] = useState<PerformedExercise[]>([]);
  const [sessionNotes, setSessionNotes] = useState("");

  // Automatic Rest Timer State
  const [restRemaining, setRestRemaining] = useState<number>(0);
  const [restTotal, setRestTotal] = useState<number>(90);
  const [restExerciseName, setRestExerciseName] = useState<string>("");
  const restEndTimeRef = useRef<number | null>(null);

  // New Exercise Form inside Routine Manager
  const [editingRoutineId, setEditingRoutineId] = useState<string | null>(null);
  const [addMode, setAddMode] = useState<"catalog" | "custom">("catalog");
  const [selectedMuscleFilter, setSelectedMuscleFilter] =
    useState<string>("Peitoral");
  const [catalogSearch, setCatalogSearch] = useState<string>("");
  const [newExName, setNewExName] = useState("");
  const [newExMuscle, setNewExMuscle] = useState("Peitoral");
  const [newExSets, setNewExSets] = useState("3");
  const [newExReps, setNewExReps] = useState("8-12");
  const [newExRest, setNewExRest] = useState("90");

  // New Routine Modal/State
  const [newRoutineName, setNewRoutineName] = useState("");
  const [newRoutineDesc, setNewRoutineDesc] = useState("");
  const [isSplitGuideOpen, setIsSplitGuideOpen] = useState(false);
  const [previewExercise, setPreviewExercise] =
    useState<CatalogExercise | null>(null);

  // 1. Live Session Stopwatch Effect
  useEffect(() => {
    if (!sessionStartMs || isSessionPaused) return;
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [sessionStartMs, isSessionPaused]);

  // 2. Automatic Rest Timer Countdown Effect (Timestamp-accurate)
  useEffect(() => {
    if (restRemaining <= 0) return;

    const timer = setInterval(() => {
      if (!restEndTimeRef.current) return;
      const diff = Math.ceil((restEndTimeRef.current - Date.now()) / 1000);
      if (diff <= 0) {
        restEndTimeRef.current = null;
        setRestRemaining(0);
        playRestFinishedAlarm();
      } else {
        setRestRemaining(diff);
      }
    }, 250);

    return () => clearInterval(timer);
  }, [restRemaining]);

  const startRestTimer = (seconds: number, exerciseName: string) => {
    setRestTotal(seconds);
    setRestRemaining(seconds);
    setRestExerciseName(exerciseName);
    restEndTimeRef.current = Date.now() + seconds * 1000;
  };

  const adjustRestTimer = (deltaSeconds: number) => {
    if (!restEndTimeRef.current) {
      startRestTimer(Math.max(15, deltaSeconds), restExerciseName || "Descanso");
      return;
    }
    const nextRemaining = Math.max(0, restRemaining + deltaSeconds);
    restEndTimeRef.current = Date.now() + nextRemaining * 1000;
    setRestRemaining(nextRemaining);
    if (nextRemaining > restTotal) setRestTotal(nextRemaining);
  };

  const skipRestTimer = () => {
    restEndTimeRef.current = null;
    setRestRemaining(0);
  };

  // Find previous performance of an exercise for smart pre-fill
  const getLastExerciseSets = (exerciseId: string, exerciseName: string) => {
    for (let i = sessions.length - 1; i >= 0; i--) {
      const found = sessions[i].exercises.find(
        (e) => e.exerciseId === exerciseId || e.name === exerciseName
      );
      if (found && found.sets.length > 0) return found.sets;
    }
    return null;
  };

  // Start Live Workout from a Routine
  const handleStartWorkout = (routine: WorkoutRoutine) => {
    const initializedExercises: PerformedExercise[] = routine.exercises.map(
      (ex) => {
        const previousSets = getLastExerciseSets(ex.id, ex.name);
        const sets = Array.from({ length: ex.targetSets }, (_, idx) => {
          const prevSet = previousSets?.[idx] || previousSets?.[0];
          return {
            setNumber: idx + 1,
            weightKg: prevSet ? prevSet.weightKg : 20,
            reps: prevSet ? prevSet.reps : parseInt(ex.targetReps) || 10,
            completed: false,
          };
        });

        return {
          exerciseId: ex.id,
          name: ex.name,
          muscleGroup: ex.muscleGroup,
          restSeconds: ex.restSeconds,
          sets,
        };
      }
    );

    setActiveRoutine(routine);
    setExercisesState(initializedExercises);
    setSessionStartMs(Date.now());
    setElapsedSeconds(0);
    setIsSessionPaused(false);
    setSessionNotes("");
  };

  // Toggle Set Completion -> Automatically Triggers Rest Timer!
  const handleToggleSet = (exIdx: number, setIdx: number) => {
    setExercisesState((prev) => {
      const updated = prev.map((ex, i) => {
        if (i !== exIdx) return ex;
        const newSets = ex.sets.map((s, j) => {
          if (j !== setIdx) return s;
          const nextCompleted = !s.completed;
          if (nextCompleted) {
            startRestTimer(
              ex.restSeconds,
              `${ex.name} (Série ${s.setNumber})`
            );
          }
          return { ...s, completed: nextCompleted };
        });
        return { ...ex, sets: newSets };
      });
      return updated;
    });
  };

  const handleUpdateSetField = (
    exIdx: number,
    setIdx: number,
    field: "weightKg" | "reps",
    val: string
  ) => {
    const num = parseFloat(val) || 0;
    setExercisesState((prev) =>
      prev.map((ex, i) =>
        i !== exIdx
          ? ex
          : {
              ...ex,
              sets: ex.sets.map((s, j) =>
                j !== setIdx ? s : { ...s, [field]: num }
              ),
            }
      )
    );
  };

  const handleAddSetToActiveExercise = (exIdx: number) => {
    setExercisesState((prev) =>
      prev.map((ex, i) => {
        if (i !== exIdx) return ex;
        const lastSet = ex.sets[ex.sets.length - 1];
        return {
          ...ex,
          sets: [
            ...ex.sets,
            {
              setNumber: ex.sets.length + 1,
              weightKg: lastSet ? lastSet.weightKg : 20,
              reps: lastSet ? lastSet.reps : 10,
              completed: false,
            },
          ],
        };
      })
    );
  };

  // Finish and Save Live Workout
  const handleFinishWorkout = () => {
    if (!activeRoutine || !sessionStartMs) return;

    let totalVolumeKg = 0;
    let completedSetsCount = 0;

    exercisesState.forEach((ex) => {
      ex.sets.forEach((s) => {
        if (s.completed) {
          totalVolumeKg += s.weightKg * s.reps;
          completedSetsCount += 1;
        }
      });
    });

    if (completedSetsCount === 0) {
      if (
        !confirm(
          "Nenhuma série foi marcada como concluída (✓). Deseja cancelar o treino?"
        )
      ) {
        return;
      }
      setActiveRoutine(null);
      setSessionStartMs(null);
      skipRestTimer();
      return;
    }

    const session: WorkoutSession = {
      id: `session-${Date.now()}`,
      routineId: activeRoutine.id,
      routineName: activeRoutine.name,
      date: new Date().toISOString().split("T")[0],
      startedAt: sessionStartMs,
      finishedAt: Date.now(),
      durationSeconds: elapsedSeconds,
      totalVolumeKg: Math.round(totalVolumeKg),
      completedSetsCount,
      exercises: exercisesState,
      notes: sessionNotes.trim() || undefined,
    };

    onSaveSession(session);
    setActiveRoutine(null);
    setSessionStartMs(null);
    skipRestTimer();
  };

  // Add Exercise to a Routine Template
  const handleAddExerciseToRoutine = (routineId: string) => {
    if (!newExName.trim()) return;
    const newEx: ExerciseTemplate = {
      id: `ex-${Date.now()}`,
      name: newExName.trim(),
      muscleGroup: newExMuscle,
      targetSets: Math.max(1, parseInt(newExSets) || 3),
      targetReps: newExReps || "8-12",
      restSeconds: Math.max(15, parseInt(newExRest) || 90),
    };

    const updated = routines.map((r) =>
      r.id === routineId ? { ...r, exercises: [...r.exercises, newEx] } : r
    );
    onUpdateRoutines(updated);
    setNewExName("");
  };

  const handleQuickAddCatalogExercise = (
    routineId: string,
    cat: CatalogExercise
  ) => {
    const newEx: ExerciseTemplate = {
      id: `ex-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: cat.name,
      muscleGroup: cat.muscleGroup,
      targetSets: cat.defaultSets,
      targetReps: cat.defaultReps,
      restSeconds: cat.defaultRest,
    };

    const updated = routines.map((r) =>
      r.id === routineId ? { ...r, exercises: [...r.exercises, newEx] } : r
    );
    onUpdateRoutines(updated);
  };

  const handleRemoveExerciseFromRoutine = (
    routineId: string,
    exId: string
  ) => {
    const updated = routines.map((r) =>
      r.id === routineId
        ? { ...r, exercises: r.exercises.filter((e) => e.id !== exId) }
        : r
    );
    onUpdateRoutines(updated);
  };

  const handleCreateRoutine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoutineName.trim()) return;
    const created: WorkoutRoutine = {
      id: `routine-${Date.now()}`,
      name: newRoutineName.trim(),
      description: newRoutineDesc.trim() || "Rotina personalizada",
      exercises: [],
    };
    onUpdateRoutines([...routines, created]);
    setNewRoutineName("");
    setNewRoutineDesc("");
    setEditingRoutineId(created.id);
  };

  const handleDeleteRoutine = (routineId: string, routineName: string) => {
    if (confirm(`Deseja apagar a ficha "${routineName}"?`)) {
      onUpdateRoutines(routines.filter((r) => r.id !== routineId));
      if (editingRoutineId === routineId) setEditingRoutineId(null);
    }
  };

  // ============================================================================
  // VIEW 1: MODO TREINO AO VIVO (Quando há um treino em andamento)
  // ============================================================================
  if (activeRoutine) {
    const liveVolume = exercisesState.reduce(
      (acc, ex) =>
        acc +
        ex.sets
          .filter((s) => s.completed)
          .reduce((sAcc, s) => sAcc + s.weightKg * s.reps, 0),
      0
    );
    const liveSetsCompleted = exercisesState.reduce(
      (acc, ex) => acc + ex.sets.filter((s) => s.completed).length,
      0
    );
    const totalTargetSets = exercisesState.reduce(
      (acc, ex) => acc + ex.sets.length,
      0
    );

    return (
      <div className="space-y-6 pb-28">
        <ExerciseExecutionModal
          exercise={previewExercise}
          onClose={() => setPreviewExercise(null)}
        />

        {/* Top Sticky Live Workout Header + Stopwatch */}
        <div className="sticky top-2 z-30 bg-slate-900/95 backdrop-blur-md border-2 border-sky-500/60 rounded-2xl p-4 shadow-2xl shadow-sky-950/60">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Treino Ao Vivo
              </span>
              <h2 className="text-lg font-extrabold text-white mt-1">
                {activeRoutine.name}
              </h2>
            </div>

            {/* Cronômetro Geral do Treino */}
            <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl">
              <Clock className="w-5 h-5 text-sky-400" />
              <div>
                <div className="text-[10px] uppercase text-slate-400 font-bold">
                  Tempo de Treino
                </div>
                <div className="text-2xl font-mono font-black text-white">
                  {formatDuration(elapsedSeconds)}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSessionPaused(!isSessionPaused)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                title={isSessionPaused ? "Retomar" : "Pausar"}
              >
                {isSessionPaused ? (
                  <Play className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Pause className="w-4 h-4 text-amber-400" />
                )}
              </button>
            </div>

            {/* Estatísticas Ao Vivo + Finalizar */}
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <div className="text-xs text-slate-400">
                  Séries:{" "}
                  <strong className="text-white">
                    {liveSetsCompleted}/{totalTargetSets}
                  </strong>
                </div>
                <div className="text-xs text-slate-400">
                  Volume:{" "}
                  <strong className="text-sky-400">{liveVolume} kg</strong>
                </div>
              </div>

              <button
                type="button"
                onClick={handleFinishWorkout}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                <Square className="w-4 h-4 fill-current" />
                <span>Finalizar Treino</span>
              </button>
            </div>
          </div>
        </div>

        {/* Floating / Sticky Rest Timer Bar (Sempre visível ou disparado automaticamente ao dar Check) */}
        <div
          className={`rounded-2xl border p-4 transition-all ${
            restRemaining > 0
              ? "bg-gradient-to-r from-sky-950 via-slate-900 to-sky-950 border-sky-400 shadow-xl shadow-sky-950/60"
              : "bg-slate-900/80 border-slate-800"
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className={`p-3 rounded-xl ${
                  restRemaining > 0
                    ? "bg-sky-500 text-slate-950 animate-pulse"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                <Timer className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                  <span>Timer de Descanso Automático</span>
                  <Volume2 className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div className="text-xs text-slate-400">
                  {restRemaining > 0
                    ? `Descansando após: ${restExerciseName}`
                    : "Marque o Check (✓) em qualquer série para disparar automaticamente"}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-3xl font-mono font-black text-white">
                {formatDuration(restRemaining)}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => adjustRestTimer(-15)}
                  className="px-2.5 py-1.5 text-xs font-bold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  -15s
                </button>
                <button
                  type="button"
                  onClick={() => adjustRestTimer(15)}
                  className="px-2.5 py-1.5 text-xs font-bold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  +15s
                </button>
                <button
                  type="button"
                  onClick={() => startRestTimer(90, "Descanso Manual")}
                  className="px-2.5 py-1.5 text-xs font-bold rounded-lg bg-sky-500/20 border border-sky-500/40 text-sky-300 hover:bg-sky-500/30"
                >
                  90s
                </button>
                {restRemaining > 0 && (
                  <button
                    type="button"
                    onClick={skipRestTimer}
                    className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30"
                    title="Pular Descanso"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Barra de Progresso Visual do Descanso */}
          {restRemaining > 0 && (
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden mt-3">
              <div
                className="h-full bg-sky-400 transition-all duration-300"
                style={{
                  width: `${Math.min(
                    100,
                    (restRemaining / Math.max(1, restTotal)) * 100
                  )}%`,
                }}
              />
            </div>
          )}
        </div>

        {/* Lista de Exercícios da Sessão */}
        <div className="space-y-4">
          {exercisesState.map((ex, exIdx) => {
            const bestSet1RM = Math.max(
              0,
              ...ex.sets.map((s) => calculateEstimated1RM(s.weightKg, s.reps))
            );
            const illustration = resolveExerciseIllustration(
              ex.name,
              ex.muscleGroup
            );

            return (
              <div
                key={ex.exerciseId}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setPreviewExercise(illustration)}
                      title="Ver bonequinho e dicas de execução"
                      className="group relative cursor-pointer shrink-0"
                    >
                      <ExerciseAnimationSVG
                        pattern={illustration.pattern}
                        size="sm"
                      />
                    </button>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded">
                        {ex.muscleGroup}
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <h3 className="text-base font-bold text-white">
                          {ex.name}
                        </h3>
                        <button
                          type="button"
                          onClick={() => setPreviewExercise(illustration)}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-400 hover:text-sky-300 bg-sky-500/10 border border-sky-500/30 px-2 py-0.5 rounded-lg cursor-pointer"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Ver Execução</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Trophy className="w-3.5 h-3.5 text-amber-400" />
                      1RM Est.:{" "}
                      <strong className="text-amber-300">{bestSet1RM} kg</strong>
                    </span>
                    <span className="bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-lg">
                      Descanso padrão: <strong>{ex.restSeconds}s</strong>
                    </span>
                  </div>
                </div>

                {/* Tabela de Séries */}
                <div className="space-y-2">
                  <div className="grid grid-cols-12 gap-2 text-[11px] font-bold uppercase text-slate-400 px-2">
                    <div className="col-span-2">Série</div>
                    <div className="col-span-4">Carga (kg)</div>
                    <div className="col-span-4">Repetições</div>
                    <div className="col-span-2 text-center">Feito</div>
                  </div>

                  {ex.sets.map((s, setIdx) => (
                    <div
                      key={s.setNumber}
                      className={`grid grid-cols-12 gap-2 items-center p-2 rounded-xl border transition-all ${
                        s.completed
                          ? "bg-emerald-950/30 border-emerald-500/40"
                          : "bg-slate-950/60 border-slate-800/80"
                      }`}
                    >
                      <div className="col-span-2 font-mono font-bold text-sm text-slate-300 pl-2">
                        #{s.setNumber}
                      </div>
                      <div className="col-span-4">
                        <input
                          type="number"
                          step="0.5"
                          value={s.weightKg}
                          onChange={(e) =>
                            handleUpdateSetField(
                              exIdx,
                              setIdx,
                              "weightKg",
                              e.target.value
                            )
                          }
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm font-bold text-white text-center"
                        />
                      </div>
                      <div className="col-span-4">
                        <input
                          type="number"
                          value={s.reps}
                          onChange={(e) =>
                            handleUpdateSetField(
                              exIdx,
                              setIdx,
                              "reps",
                              e.target.value
                            )
                          }
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm font-bold text-white text-center"
                        />
                      </div>
                      <div className="col-span-2 flex justify-center">
                        <button
                          type="button"
                          onClick={() => handleToggleSet(exIdx, setIdx)}
                          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                            s.completed
                              ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30"
                              : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                          }`}
                        >
                          <Check className="w-5 h-5 stroke-[3]" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => handleAddSetToActiveExercise(exIdx)}
                  className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 pt-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Adicionar Série Extra</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ============================================================================
  // VIEW 2: GERENCIADOR DE FICHAS DE TREINO + HISTÓRICO DE SESSÕES
  // ============================================================================
  return (
    <div className="space-y-8">
      <ExerciseExecutionModal
        exercise={previewExercise}
        onClose={() => setPreviewExercise(null)}
      />

      <WorkoutSplitGuideModal
        isOpen={isSplitGuideOpen}
        onClose={() => setIsSplitGuideOpen(false)}
        hasExistingRoutines={routines.length > 0}
        onApplyRoutines={(generated, replaceExisting) => {
          if (replaceExisting) {
            onUpdateRoutines(generated);
          } else {
            onUpdateRoutines([...routines, ...generated]);
          }
          setEditingRoutineId(null);
        }}
      />

      {/* Fichas de Treino Disponíveis */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold uppercase tracking-wider text-sky-400">
              Suas Fichas de Treino (Splits)
            </h2>
            <p className="text-xs text-slate-400">
              Escolha uma ficha para abrir o Modo Treino Ao Vivo com cronômetro
              e descanso automático
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setIsSplitGuideOpen(true)}
              className="text-xs flex items-center gap-1.5 bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/40 text-sky-300 px-3.5 py-2 rounded-xl font-bold transition-colors cursor-pointer shadow-sm"
            >
              <BookOpen className="w-4 h-4 text-sky-400" />
              <span>Guia de Divisões & Gerador de Treinos</span>
            </button>

            {routines.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  if (
                    confirm("Deseja apagar todas as fichas de treino atuais?")
                  ) {
                    onUpdateRoutines([]);
                    setEditingRoutineId(null);
                  }
                }}
                className="text-xs flex items-center gap-1.5 bg-rose-950/40 hover:bg-rose-900/50 border border-rose-800/40 text-rose-300 px-3 py-2 rounded-xl font-semibold transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Apagar Todas as Fichas</span>
              </button>
            )}
          </div>
        </div>

        {routines.length === 0 && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
            <p className="text-sm text-slate-400">
              Nenhuma ficha cadastrada no momento.
            </p>
            <button
              type="button"
              onClick={() => setIsSplitGuideOpen(true)}
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold px-4 py-2.5 rounded-xl text-xs transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Abrir Guia de Divisões (Upper/Lower, Full Body, ABC, ABCD...)</span>
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {routines.map((routine) => {
            const isEditing = editingRoutineId === routine.id;
            return (
              <div
                key={routine.id}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-extrabold text-white">
                      {routine.name}
                    </h3>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[11px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2 py-0.5 rounded-full">
                        {routine.exercises.length} exerc.
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteRoutine(routine.id, routine.name)
                        }
                        title="Apagar esta ficha de treino"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400">{routine.description}</p>

                  {/* Lista Resumida de Exercícios */}
                  <ul className="space-y-1.5 pt-2 border-t border-slate-800/80 text-xs">
                    {routine.exercises.map((ex) => {
                      const ill = resolveExerciseIllustration(
                        ex.name,
                        ex.muscleGroup
                      );
                      return (
                        <li
                          key={ex.id}
                          className="flex items-center justify-between text-slate-300 bg-slate-950/60 px-2.5 py-1.5 rounded-lg gap-2"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <button
                              type="button"
                              onClick={() => setPreviewExercise(ill)}
                              title="Ver bonequinho de execução"
                              className="shrink-0 cursor-pointer hover:scale-105 transition-transform"
                            >
                              <ExerciseAnimationSVG
                                pattern={ill.pattern}
                                size="sm"
                              />
                            </button>
                            <div className="truncate">
                              <span className="font-semibold block truncate">
                                {ex.name}
                              </span>
                              <span className="text-[10px] text-slate-500 block">
                                {ex.muscleGroup} • Descanso {ex.restSeconds}s
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => setPreviewExercise(ill)}
                              title="Ver execução e dicas"
                              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-sky-400 border border-slate-800 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <span className="font-mono text-sky-400 font-bold">
                              {ex.targetSets}x{ex.targetReps}
                            </span>
                            {isEditing && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveExerciseFromRoutine(
                                    routine.id,
                                    ex.id
                                  )
                                }
                                className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Formulário para adicionar exercício na ficha (Biblioteca Pré-Selecionada + Personalizado) */}
                  {isEditing && (
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-3 mt-2">
                      <div className="flex items-center justify-between gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                        <button
                          type="button"
                          onClick={() => setAddMode("catalog")}
                          className={`flex-1 py-1.5 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                            addMode === "catalog"
                              ? "bg-sky-500 text-slate-950"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          Biblioteca de Exercícios
                        </button>
                        <button
                          type="button"
                          onClick={() => setAddMode("custom")}
                          className={`flex-1 py-1.5 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                            addMode === "custom"
                              ? "bg-sky-500 text-slate-950"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          + Personalizado
                        </button>
                      </div>

                      {addMode === "catalog" ? (
                        <div className="space-y-2.5">
                          <input
                            type="text"
                            placeholder="Buscar exercício em todos os músculos (ex: Supino, Rosca, Polia)..."
                            value={catalogSearch}
                            onChange={(e) => setCatalogSearch(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-sky-500 outline-none"
                          />

                          {/* Filtro por Grupo Muscular */}
                          {!catalogSearch.trim() && (
                            <div className="flex flex-wrap gap-1">
                              {MUSCLE_GROUPS.map((m) => {
                                const count = EXERCISE_CATALOG.filter(
                                  (e) => e.muscleGroup === m
                                ).length;
                                return (
                                  <button
                                    key={m}
                                    type="button"
                                    onClick={() => setSelectedMuscleFilter(m)}
                                    className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                                      selectedMuscleFilter === m
                                        ? "bg-sky-500/20 border border-sky-500 text-sky-300"
                                        : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
                                    }`}
                                  >
                                    {m} ({count})
                                  </button>
                                );
                              })}
                            </div>
                          )}

                          {/* Lista de Exercícios Pré-Selecionados daquele Músculo */}
                          <div className="max-h-64 overflow-y-auto space-y-1.5 pr-1">
                            {EXERCISE_CATALOG.filter((item) =>
                              catalogSearch.trim()
                                ? item.name
                                    .toLowerCase()
                                    .includes(catalogSearch.toLowerCase()) ||
                                  item.muscleGroup
                                    .toLowerCase()
                                    .includes(catalogSearch.toLowerCase())
                                : item.muscleGroup === selectedMuscleFilter
                            ).map((cat) => (
                              <div
                                key={cat.id}
                                className="flex items-center justify-between gap-2 bg-slate-900/90 border border-slate-800/90 p-2 rounded-lg"
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <button
                                    type="button"
                                    onClick={() => setPreviewExercise(cat)}
                                    title="Ver bonequinho executando"
                                    className="shrink-0 cursor-pointer"
                                  >
                                    <ExerciseAnimationSVG
                                      pattern={cat.pattern}
                                      size="sm"
                                    />
                                  </button>
                                  <div className="min-w-0">
                                    <div className="text-xs font-bold text-white truncate">
                                      {cat.name}
                                    </div>
                                    <div className="text-[10px] text-slate-400">
                                      {cat.defaultSets}x{cat.defaultReps} •{" "}
                                      {cat.defaultRest}s
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-1 shrink-0">
                                  <button
                                    type="button"
                                    onClick={() => setPreviewExercise(cat)}
                                    title="Ver bonequinho e dicas"
                                    className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-sky-400 border border-slate-800 cursor-pointer"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleQuickAddCatalogExercise(
                                        routine.id,
                                        cat
                                      )
                                    }
                                    className="px-2.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-[11px] cursor-pointer"
                                  >
                                    + Add
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2.5">
                          <div className="text-xs font-bold text-sky-400">
                            Criar Exercício Personalizado
                          </div>
                          <input
                            type="text"
                            placeholder="Nome (ex: Supino Articulado Máquina)"
                            value={newExName}
                            onChange={(e) => setNewExName(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <select
                              value={newExMuscle}
                              onChange={(e) => setNewExMuscle(e.target.value)}
                              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                            >
                              {MUSCLE_GROUPS.map((m) => (
                                <option key={m} value={m}>
                                  {m}
                                </option>
                              ))}
                            </select>
                            <input
                              type="number"
                              placeholder="Descanso (seg)"
                              value={newExRest}
                              onChange={(e) => setNewExRest(e.target.value)}
                              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="number"
                              placeholder="Séries (ex: 4)"
                              value={newExSets}
                              onChange={(e) => setNewExSets(e.target.value)}
                              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                            />
                            <input
                              type="text"
                              placeholder="Reps (ex: 8-12)"
                              value={newExReps}
                              onChange={(e) => setNewExReps(e.target.value)}
                              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              handleAddExerciseToRoutine(routine.id)
                            }
                            className="w-full bg-sky-500/20 border border-sky-500/40 text-sky-300 font-bold py-1.5 rounded-lg text-xs hover:bg-sky-500/30 cursor-pointer"
                          >
                            + Adicionar Exercício Personalizado
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Botões de Ação da Ficha */}
                <div className="pt-2 space-y-2">
                  <button
                    type="button"
                    onClick={() => handleStartWorkout(routine)}
                    className="w-full flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold py-3 rounded-xl transition-all shadow-lg shadow-sky-500/20 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Iniciar Treino Ao Vivo</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingRoutineId(isEditing ? null : routine.id)
                    }
                    className="w-full text-xs text-slate-400 hover:text-slate-200 py-1"
                  >
                    {isEditing
                      ? "Concluir Edição da Ficha"
                      : "Editar Exercícios / Descanso"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Criar Nova Ficha Personalizada & Histórico de Treinos */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <form
          onSubmit={handleCreateRoutine}
          className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 h-fit"
        >
          <div className="flex items-center gap-2 text-sky-400 font-bold text-sm uppercase tracking-wider">
            <Dumbbell className="w-4 h-4" />
            <span>Criar Nova Divisão / Ficha</span>
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">
              Nome da Ficha
            </label>
            <input
              type="text"
              placeholder="Ex: Treino D — Upper Body / Braços"
              value={newRoutineName}
              onChange={(e) => setNewRoutineName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">
              Foco / Descrição
            </label>
            <input
              type="text"
              placeholder="Ex: Foco em hipertrofia de braços e deltoides"
              value={newRoutineDesc}
              onChange={(e) => setNewRoutineDesc(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold py-2.5 rounded-xl text-sm transition-colors"
          >
            + Criar Ficha de Treino
          </button>
        </form>

        {/* Histórico de Sessões Realizadas */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-sm uppercase tracking-wider">
              <Flame className="w-4 h-4" />
              <span>Histórico de Treinos Concluídos ({sessions.length})</span>
            </div>
          </div>

          {sessions.length === 0 ? (
            <p className="text-sm text-slate-500 py-8 text-center">
              Nenhum treino registrado ainda. Clique em &ldquo;Iniciar Treino Ao
              Vivo&rdquo; acima!
            </p>
          ) : (
            <div className="space-y-3">
              {sessions
                .slice()
                .reverse()
                .map((sess) => (
                  <div
                    key={sess.id}
                    className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4"
                  >
                    <div>
                      <div className="text-xs text-slate-400 font-mono">
                        {sess.date} • Duração:{" "}
                        <strong className="text-sky-400">
                          {formatDuration(sess.durationSeconds)}
                        </strong>
                      </div>
                      <div className="text-sm font-bold text-white mt-0.5">
                        {sess.routineName}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        Séries concluídas:{" "}
                        <strong className="text-emerald-400">
                          {sess.completedSetsCount}
                        </strong>{" "}
                        • Volume Total:{" "}
                        <strong className="text-amber-300">
                          {sess.totalVolumeKg} kg
                        </strong>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onDeleteSession(sess.id)}
                      className="text-slate-500 hover:text-rose-400 p-1.5"
                      title="Apagar sessão"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
