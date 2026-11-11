"use client";

import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

interface AtlasScrollHeroProps {
  onStartWorkout?: () => void;
}

export function AtlasScrollHero({ onStartWorkout }: AtlasScrollHeroProps) {
  // progress: 0 = completely separated, 1 = perfectly locked and unified
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Reaches 100% lock when scrolled ~180px down
      const progress = Math.min(1, Math.max(0, scrollY / 180));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // When progress = 0: globe is lifted up by 38px, titan rests lower by 12px
  // When progress = 1: both translations reach 0px and snap into one monolithic statue
  const globeTranslateY = -((1 - scrollProgress) * 44);
  const titanTranslateY = (1 - scrollProgress) * 16;
  const separationGap = Math.round((1 - scrollProgress) * 60);
  const isLocked = scrollProgress >= 0.95;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 mb-8 shadow-2xl shadow-amber-950/20">
      {/* Background ethereal radial lights */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Column: Conceptual Mythological Lore & Metrics */}
        <div className="max-w-xl space-y-4 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>O Peso do Cosmos sob Teus Ombros</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-serif">
            ATLAS
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
            Na mitologia grega, o Titã Atlas sustenta a esfera celeste inteira
            pela eternidade. No treinamento de força, cada repetição é um ato de
            resistência à gravidade — forjando ossos, fáscias e vontade
            inabalável.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs">
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-2 text-left">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                Estado da Abóbada
              </span>
              <strong className={isLocked ? "text-emerald-400 font-extrabold" : "text-amber-300 font-bold"}>
                {isLocked ? "✦ Unificado ao Titã (Carga Máxima)" : `✦ Em Aproximação (${separationGap}px)`}
              </strong>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-2 text-left">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                Gesto Interativo
              </span>
              <span className="text-slate-300 font-semibold">
                Role a tela para unir a esfera ao Titã
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: The Interactive Split & Merge Sculpture Stage */}
        <div className="relative flex flex-col items-center justify-center w-full max-w-[280px] sm:max-w-[320px]">
          {/* Subtle glowing halo behind sphere */}
          <div
            className="absolute top-10 w-48 h-48 rounded-full bg-amber-400/20 blur-2xl pointer-events-none transition-all duration-300"
            style={{
              opacity: 0.3 + scrollProgress * 0.7,
              transform: `scale(${0.9 + scrollProgress * 0.2})`,
            }}
          />

          {/* The Sculpture Assembly Container */}
          <div className="relative w-[240px] sm:w-[270px] h-[460px] sm:h-[510px] rounded-2xl overflow-hidden border border-amber-500/20 bg-slate-950 shadow-2xl">
            {/* 1. Abóbada Celeste (Upper Layer) */}
            <div
              className="absolute inset-0 z-20 pointer-events-none transition-transform duration-75 will-change-transform"
              style={{
                transform: `translateY(${globeTranslateY}px)`,
              }}
            >
              <img
                src="/atlas-layer-globe.png"
                alt="Abóbada Celeste de Atlas"
                className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]"
              />
            </div>

            {/* 2. O Titã Atlas (Lower Layer) */}
            <div
              className="absolute inset-0 z-10 pointer-events-none transition-transform duration-75 will-change-transform"
              style={{
                transform: `translateY(${titanTranslateY}px)`,
              }}
            >
              <img
                src="/atlas-layer-titan.png"
                alt="O Titã Atlas"
                className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
              />
            </div>

            {/* Lock indicator label inside the frame */}
            <div className="absolute bottom-3 inset-x-3 z-30 flex items-center justify-between rounded-lg bg-slate-950/80 border border-slate-800/80 px-2.5 py-1 text-[10px] backdrop-blur-sm">
              <span className="text-slate-400">
                {isLocked ? "Estátua Completa" : "Rolar para Unir"}
              </span>
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isLocked ? "bg-emerald-400 animate-ping" : "bg-amber-400"
                  }`}
                />
                <span className="font-mono font-bold text-white">
                  {Math.round(scrollProgress * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
