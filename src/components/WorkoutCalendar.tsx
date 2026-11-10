"use client";

import React, { useState } from "react";
import { WorkoutSession } from "@/lib/types";
import { formatDuration } from "./WorkoutTrackerTab";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Flame,
  X,
} from "lucide-react";

interface WorkoutCalendarProps {
  sessions: WorkoutSession[];
  onSelectSession?: (session: WorkoutSession) => void;
}

export function WorkoutCalendar({ sessions }: WorkoutCalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const weekDayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  // Mapping sessions by date string (YYYY-MM-DD)
  const sessionsByDate: Record<string, WorkoutSession[]> = {};
  sessions.forEach((s) => {
    // Normalise in case date has time or timezone
    const dStr = s.date.split("T")[0];
    if (!sessionsByDate[dStr]) {
      sessionsByDate[dStr] = [];
    }
    sessionsByDate[dStr].push(s);
  });

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(null);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
    setSelectedDay(null);
  };

  // Calendar grid calculations
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Days from previous month to fill first row
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const totalCells = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;

  const todayStr = new Date().toISOString().split("T")[0];

  // Count workouts in this visible month
  const workoutsThisMonth = sessions.filter((s) => {
    const d = new Date(s.date);
    return d.getFullYear() === year && d.getMonth() === month;
  }).length;

  const activeSessionsForSelected = selectedDay
    ? sessionsByDate[selectedDay] || []
    : [];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
      {/* Header with Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-400">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <span>Calendário de Treinos</span>
              {workoutsThisMonth > 0 && (
                <span className="text-[11px] font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 px-2.5 py-0.5 rounded-full">
                  {workoutsThisMonth} {workoutsThisMonth === 1 ? "treino" : "treinos"} no mês
                </span>
              )}
            </h3>
            <span className="text-xs text-slate-400 capitalize">
              {monthNames[month]} de {year}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleToday}
            className="px-2.5 py-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg cursor-pointer"
          >
            Hoje
          </button>
          <button
            type="button"
            onClick={handlePrevMonth}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
            title="Mês Anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
            title="Próximo Mês"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Week days labels */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {weekDayNames.map((wd) => (
          <div
            key={wd}
            className="text-[11px] font-bold uppercase tracking-wider text-slate-400 py-1"
          >
            {wd}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1.5">
        {Array.from({ length: totalCells }).map((_, idx) => {
          let dayNum: number;
          let isCurrentMonth = true;
          let dateStr = "";

          if (idx < firstDayOfMonth) {
            // Days from previous month
            dayNum = daysInPrevMonth - firstDayOfMonth + idx + 1;
            isCurrentMonth = false;
            const prevMonthDate = new Date(year, month - 1, dayNum);
            dateStr = prevMonthDate.toISOString().split("T")[0];
          } else if (idx >= firstDayOfMonth + daysInMonth) {
            // Days from next month
            dayNum = idx - (firstDayOfMonth + daysInMonth) + 1;
            isCurrentMonth = false;
            const nextMonthDate = new Date(year, month + 1, dayNum);
            dateStr = nextMonthDate.toISOString().split("T")[0];
          } else {
            // Days in current month
            dayNum = idx - firstDayOfMonth + 1;
            const mStr = String(month + 1).padStart(2, "0");
            const dPad = String(dayNum).padStart(2, "0");
            dateStr = `${year}-${mStr}-${dPad}`;
          }

          const daySessions = sessionsByDate[dateStr] || [];
          const hasWorkout = daySessions.length > 0;
          const isToday = dateStr === todayStr;
          const isSelected = selectedDay === dateStr;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedDay(isSelected ? null : dateStr)}
              className={`min-h-[48px] sm:min-h-[58px] p-1.5 rounded-xl flex flex-col justify-between items-center transition-all cursor-pointer relative border ${
                !isCurrentMonth
                  ? "opacity-30 border-transparent bg-slate-950/30 text-slate-500"
                  : isSelected
                  ? "border-sky-400 bg-sky-950/40 shadow-lg shadow-sky-950/50"
                  : hasWorkout
                  ? "bg-emerald-950/30 border-emerald-500/40 hover:border-emerald-400 text-white"
                  : "bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-400"
              } ${isToday ? "ring-2 ring-sky-500/60" : ""}`}
            >
              <span
                className={`text-xs font-bold self-start pl-1 ${
                  isToday
                    ? "text-sky-400 underline font-black"
                    : isCurrentMonth
                    ? "text-slate-200"
                    : "text-slate-500"
                }`}
              >
                {dayNum}
              </span>

              {/* Workout indicator badge */}
              {hasWorkout && isCurrentMonth && (
                <div className="w-full flex items-center justify-center gap-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 py-0.5 rounded-md mt-1">
                  <Flame className="w-3 h-3 text-emerald-400 fill-emerald-400/30 shrink-0" />
                  <span className="text-[10px] font-black hidden sm:inline">
                    {daySessions.length > 1 ? `${daySessions.length}x` : "Treino"}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Day Details Panel */}
      {selectedDay && (
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-sky-400" />
              <span className="text-xs font-bold text-white">
                Treinos no dia {selectedDay.split("-").reverse().join("/")}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSelectedDay(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {activeSessionsForSelected.length === 0 ? (
            <p className="text-xs text-slate-400 py-1">
              Nenhum treino realizado nesta data (Dia de Descanso).
            </p>
          ) : (
            <div className="space-y-2.5">
              {activeSessionsForSelected.map((sess) => (
                <div
                  key={sess.id}
                  className="bg-slate-900 border border-slate-800 rounded-lg p-3 space-y-1.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <strong className="text-sm text-white font-extrabold">
                      {sess.routineName}
                    </strong>
                    <span className="text-[11px] font-mono text-sky-400">
                      {formatDuration(sess.durationSeconds)}
                    </span>
                  </div>

                  {sess.blockName && (
                    <span className="inline-block text-[10px] font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/25 px-2 py-0.5 rounded-full">
                      Bloco: {sess.blockName}
                    </span>
                  )}

                  <div className="flex flex-wrap gap-3 text-xs text-slate-400 pt-1">
                    <span>
                      Séries Concluídas:{" "}
                      <strong className="text-emerald-400">
                        {sess.completedSetsCount}
                      </strong>
                    </span>
                    <span>
                      Volume Total:{" "}
                      <strong className="text-amber-300">
                        {sess.totalVolumeKg} kg
                      </strong>
                    </span>
                  </div>

                  {/* List of exercises performed */}
                  {sess.exercises && sess.exercises.length > 0 && (
                    <div className="pt-2 border-t border-slate-800/80">
                      <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">
                        Exercícios:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {sess.exercises.map((ex, i) => (
                          <span
                            key={i}
                            className="text-[10px] bg-slate-950 border border-slate-800 text-slate-300 px-2 py-0.5 rounded"
                          >
                            {ex.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
