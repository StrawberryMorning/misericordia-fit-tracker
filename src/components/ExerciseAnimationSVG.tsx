"use client";

import React from "react";
import { AnimationPattern } from "@/lib/exerciseCatalog";

interface ExerciseAnimationSVGProps {
  pattern: AnimationPattern;
  size?: "sm" | "lg";
}

/**
 * Animated SVG Stick/Anatomical Figure ("Bonequinho") performing the exercise movement
 * with glowing primary target muscle highlights.
 */
export function ExerciseAnimationSVG({
  pattern,
  size = "lg",
}: ExerciseAnimationSVGProps) {
  const dim = size === "sm" ? "w-11 h-11" : "w-full h-56";

  return (
    <div
      className={`${dim} rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden relative select-none`}
    >
      <style>{`
        @keyframes repUpDown {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
        @keyframes repSquat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(16px); }
        }
        @keyframes repPull {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(15px); }
        }
        @keyframes repRow {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(-10px, -8px); }
        }
        @keyframes repCurl {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-55deg); }
        }
        @keyframes repPushdown {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(50deg); }
        }
        @keyframes repLateral {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulseMuscle {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 1; }
        }
        .anim-updown { animation: repUpDown 2.2s ease-in-out infinite; }
        .anim-squat { animation: repSquat 2.4s ease-in-out infinite; }
        .anim-pull { animation: repPull 2.2s ease-in-out infinite; }
        .anim-row { animation: repRow 2s ease-in-out infinite; }
        .anim-curl { transform-origin: 95px 88px; animation: repCurl 2s ease-in-out infinite; }
        .anim-pushdown { transform-origin: 95px 86px; animation: repPushdown 2s ease-in-out infinite; }
        .anim-lateral { animation: repLateral 2s ease-in-out infinite; }
        .muscle-glow { animation: pulseMuscle 1.1s ease-in-out infinite; }
      `}</style>

      <svg viewBox="0 0 200 160" className="w-full h-full">
        {/* Floor Line */}
        <line
          x1="20"
          y1="142"
          x2="180"
          y2="142"
          stroke="#1e293b"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* ============================================================
            1. SUPINO RETO / INCLINADO / CRUCIFIXO (Bench & Chest)
           ============================================================ */}
        {(pattern === "bench" || pattern === "incline" || pattern === "fly") && (
          <g>
            {/* Bench Structure */}
            <line
              x1="45"
              y1="112"
              x2="135"
              y2={pattern === "incline" ? "92" : "112"}
              stroke="#475569"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <line x1="60" y1="112" x2="60" y2="142" stroke="#334155" strokeWidth="4" />
            <line x1="120" y1="112" x2="120" y2="142" stroke="#334155" strokeWidth="4" />

            {/* Athlete Body on Bench */}
            <circle cx="55" cy="98" r="10" fill="#cbd5e1" />
            {/* Torso with Chest Glow */}
            <line
              x1="67"
              y1="103"
              x2="118"
              y2="105"
              stroke="#94a3b8"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Glowing Pectoral Muscle */}
            <ellipse
              cx="85"
              cy="99"
              rx="14"
              ry="6"
              fill="#f43f5e"
              className="muscle-glow"
            />
            {/* Legs bent to floor */}
            <polyline
              points="118,105 142,108 148,140"
              fill="none"
              stroke="#64748b"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Animated Arms + Barbell */}
            <g className="anim-updown">
              {/* Arms pushing up */}
              <line
                x1="82"
                y1="100"
                x2="82"
                y2="66"
                stroke="#38bdf8"
                strokeWidth="5"
                strokeLinecap="round"
              />
              {/* Barbell & Plates */}
              <line
                x1="58"
                y1="64"
                x2="106"
                y2="64"
                stroke="#e2e8f0"
                strokeWidth="3"
              />
              <rect x="62" y="52" width="6" height="24" rx="2" fill="#0ea5e9" />
              <rect x="96" y="52" width="6" height="24" rx="2" fill="#0ea5e9" />
            </g>
          </g>
        )}

        {/* ============================================================
            2. AGACHAMENTO LIVRE (Squat)
           ============================================================ */}
        {pattern === "squat" && (
          <g>
            {/* Squat Rack Uprights */}
            <line x1="65" y1="25" x2="65" y2="142" stroke="#334155" strokeWidth="4" />

            {/* Lower Leg (Shins fixed) */}
            <line
              x1="105"
              y1="140"
              x2="95"
              y2="108"
              stroke="#94a3b8"
              strokeWidth="7"
              strokeLinecap="round"
            />

            {/* Animated Upper Body + Thighs Squatting */}
            <g className="anim-squat">
              {/* Glowing Quads & Glutes */}
              <line
                x1="95"
                y1="106"
                x2="118"
                y2="92"
                stroke="#f43f5e"
                strokeWidth="10"
                strokeLinecap="round"
                className="muscle-glow"
              />
              {/* Torso */}
              <line
                x1="118"
                y1="92"
                x2="96"
                y2="52"
                stroke="#cbd5e1"
                strokeWidth="9"
                strokeLinecap="round"
              />
              {/* Head */}
              <circle cx="94" cy="36" r="10" fill="#e2e8f0" />
              {/* Barbell on Traps */}
              <line x1="68" y1="50" x2="126" y2="50" stroke="#38bdf8" strokeWidth="4" />
              <circle cx="96" cy="50" r="11" fill="#0ea5e9" fillOpacity="0.85" />
              <circle cx="96" cy="50" r="4" fill="#0f172a" />
            </g>
          </g>
        )}

        {/* ============================================================
            3. STIFF / TERRA ROMENO (RDL - Posterior Chain)
           ============================================================ */}
        {pattern === "rdl" && (
          <g>
            {/* Legs with Glowing Hamstrings */}
            <line
              x1="95"
              y1="140"
              x2="88"
              y2="92"
              stroke="#94a3b8"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <line
              x1="85"
              y1="115"
              x2="82"
              y2="90"
              stroke="#f43f5e"
              strokeWidth="6"
              strokeLinecap="round"
              className="muscle-glow"
            />

            {/* Hinged Torso + Barbell moving */}
            <g className="anim-squat">
              {/* Glute Highlight */}
              <circle cx="84" cy="88" r="8" fill="#f43f5e" className="muscle-glow" />
              {/* Torso Hinged Forward */}
              <line
                x1="86"
                y1="88"
                x2="126"
                y2="66"
                stroke="#cbd5e1"
                strokeWidth="9"
                strokeLinecap="round"
              />
              <circle cx="138" cy="58" r="9" fill="#e2e8f0" />
              {/* Arms hanging straight down holding barbell */}
              <line
                x1="118"
                y1="70"
                x2="112"
                y2="108"
                stroke="#38bdf8"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <circle cx="112" cy="112" r="11" fill="#0ea5e9" />
              <circle cx="112" cy="112" r="4" fill="#0f172a" />
            </g>
          </g>
        )}

        {/* ============================================================
            4. BARRA FIXA / PUXADA ALTA (Pullup / Lat Pulldown)
           ============================================================ */}
        {pattern === "pullup" && (
          <g>
            {/* Overhead Pullup Bar */}
            <line x1="55" y1="24" x2="145" y2="24" stroke="#64748b" strokeWidth="5" />
            {/* Hands on bar */}
            <circle cx="76" cy="24" r="4" fill="#38bdf8" />
            <circle cx="124" cy="24" r="4" fill="#38bdf8" />

            {/* Athlete Body Pulling Up */}
            <g className="anim-updown">
              {/* Arms */}
              <line x1="76" y1="26" x2="88" y2="62" stroke="#94a3b8" strokeWidth="5" />
              <line x1="124" y1="26" x2="112" y2="62" stroke="#94a3b8" strokeWidth="5" />
              {/* Head */}
              <circle cx="100" cy="46" r="9" fill="#e2e8f0" />
              {/* V-Taper Lat Torso Glowing */}
              <polygon
                points="84,60 116,60 106,98 94,98"
                fill="#f43f5e"
                className="muscle-glow"
              />
              {/* Legs */}
              <line x1="96" y1="98" x2="96" y2="134" stroke="#64748b" strokeWidth="6" />
              <line x1="104" y1="98" x2="104" y2="134" stroke="#64748b" strokeWidth="6" />
            </g>
          </g>
        )}

        {/* ============================================================
            5. REMADA CURVADA / BAIXA (Row)
           ============================================================ */}
        {pattern === "row" && (
          <g>
            {/* Legs */}
            <polyline
              points="92,140 82,110 92,86"
              fill="none"
              stroke="#64748b"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Torso Bent Over with Glowing Upper Back */}
            <line
              x1="92"
              y1="86"
              x2="128"
              y2="58"
              stroke="#cbd5e1"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <line
              x1="98"
              y1="78"
              x2="122"
              y2="60"
              stroke="#f43f5e"
              strokeWidth="6"
              strokeLinecap="round"
              className="muscle-glow"
            />
            <circle cx="139" cy="49" r="9" fill="#e2e8f0" />

            {/* Pulling Arm + Weight */}
            <g className="anim-row">
              <line
                x1="120"
                y1="64"
                x2="120"
                y2="102"
                stroke="#38bdf8"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <circle cx="120" cy="106" r="10" fill="#0ea5e9" />
            </g>
          </g>
        )}

        {/* ============================================================
            6. DESENVOLVIMENTO MILITAR / OMBROS (OHP & Lateral Raise)
           ============================================================ */}
        {(pattern === "ohp" || pattern === "lateral") && (
          <g>
            {/* Standing Body */}
            <line x1="95" y1="95" x2="95" y2="140" stroke="#64748b" strokeWidth="6" />
            <line x1="105" y1="95" x2="105" y2="140" stroke="#64748b" strokeWidth="6" />
            <rect x="89" y="58" width="22" height="38" rx="6" fill="#94a3b8" />
            <circle cx="100" cy="43" r="9" fill="#e2e8f0" />

            {/* Glowing Deltoid Shoulders */}
            <circle cx="86" cy="63" r="7" fill="#f43f5e" className="muscle-glow" />
            <circle cx="114" cy="63" r="7" fill="#f43f5e" className="muscle-glow" />

            {pattern === "ohp" ? (
              <g className="anim-updown">
                <polyline
                  points="86,63 74,52 76,32"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <polyline
                  points="114,63 126,52 124,32"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <line x1="58" y1="32" x2="142" y2="32" stroke="#e2e8f0" strokeWidth="3.5" />
                <rect x="62" y="22" width="6" height="20" rx="2" fill="#0ea5e9" />
                <rect x="132" y="22" width="6" height="20" rx="2" fill="#0ea5e9" />
              </g>
            ) : (
              <g className="anim-lateral">
                <line x1="86" y1="64" x2="58" y2="82" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
                <line x1="114" y1="64" x2="142" y2="82" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
                <circle cx="55" cy="83" r="5" fill="#0ea5e9" />
                <circle cx="145" cy="83" r="5" fill="#0ea5e9" />
              </g>
            )}
          </g>
        )}

        {/* ============================================================
            7. ROSCA DIRETA / MARTELO (Biceps Curl)
           ============================================================ */}
        {pattern === "curl" && (
          <g>
            {/* Standing Athlete Side View */}
            <line x1="95" y1="98" x2="95" y2="140" stroke="#64748b" strokeWidth="8" strokeLinecap="round" />
            <line x1="95" y1="56" x2="95" y2="98" stroke="#94a3b8" strokeWidth="12" strokeLinecap="round" />
            <circle cx="95" cy="40" r="10" fill="#e2e8f0" />

            {/* Upper Arm + Glowing Bicep */}
            <line x1="95" y1="60" x2="95" y2="88" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" />
            <ellipse cx="101" cy="74" rx="5" ry="9" fill="#f43f5e" className="muscle-glow" />

            {/* Forearm + Dumbbell Curling */}
            <g className="anim-curl">
              <line x1="95" y1="88" x2="122" y2="96" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
              <circle cx="125" cy="96" r="7" fill="#0ea5e9" />
            </g>
          </g>
        )}

        {/* ============================================================
            8. TRÍCEPS PULLEY (Triceps Pushdown)
           ============================================================ */}
        {pattern === "pushdown" && (
          <g>
            {/* Cable Machine Frame */}
            <line x1="145" y1="20" x2="145" y2="142" stroke="#334155" strokeWidth="5" />
            <line x1="115" y1="22" x2="145" y2="22" stroke="#475569" strokeWidth="4" />
            <line x1="118" y1="22" x2="118" y2="75" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 2" />

            {/* Athlete */}
            <line x1="90" y1="98" x2="90" y2="140" stroke="#64748b" strokeWidth="8" strokeLinecap="round" />
            <line x1="90" y1="56" x2="90" y2="98" stroke="#94a3b8" strokeWidth="11" strokeLinecap="round" />
            <circle cx="92" cy="40" r="10" fill="#e2e8f0" />

            {/* Glowing Triceps on back of arm */}
            <ellipse cx="84" cy="73" rx="5" ry="9" fill="#f43f5e" className="muscle-glow" />
            <line x1="92" y1="60" x2="95" y2="86" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" />

            {/* Forearm pushing down */}
            <g className="anim-pushdown">
              <line x1="95" y1="86" x2="118" y2="72" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
              <circle cx="118" cy="72" r="4" fill="#0ea5e9" />
            </g>
          </g>
        )}

        {/* ============================================================
            9. LEG PRESS / EXTENSORA / PANTURRILHA
           ============================================================ */}
        {(pattern === "legpress" || pattern === "legext" || pattern === "calf") && (
          <g>
            {pattern === "calf" ? (
              <g className="anim-updown">
                <circle cx="100" cy="36" r="10" fill="#e2e8f0" />
                <line x1="100" y1="48" x2="100" y2="95" stroke="#94a3b8" strokeWidth="10" strokeLinecap="round" />
                <line x1="100" y1="95" x2="100" y2="138" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
                {/* Glowing Calves */}
                <ellipse cx="94" cy="115" rx="6" ry="11" fill="#f43f5e" className="muscle-glow" />
              </g>
            ) : (
              <g>
                {/* Seated Bench */}
                <polyline
                  points="55,75 75,115 105,115"
                  fill="none"
                  stroke="#475569"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <circle cx="62" cy="62" r="9" fill="#e2e8f0" />
                <line x1="66" y1="74" x2="80" y2="110" stroke="#94a3b8" strokeWidth="9" strokeLinecap="round" />
                {/* Glowing Quads */}
                <line
                  x1="80"
                  y1="110"
                  x2="112"
                  y2="92"
                  stroke="#f43f5e"
                  strokeWidth="10"
                  strokeLinecap="round"
                  className="muscle-glow"
                />
                <g className="anim-updown">
                  <line
                    x1="112"
                    y1="92"
                    x2="142"
                    y2="68"
                    stroke="#38bdf8"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                  <rect x="138" y="50" width="10" height="32" rx="3" fill="#0ea5e9" />
                </g>
              </g>
            )}
          </g>
        )}
      </svg>

      {size === "lg" && (
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] bg-slate-900/90 backdrop-blur px-3 py-1 rounded-lg border border-slate-800">
          <span className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            Músculo Principal Alvo
          </span>
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
            Trajetória da Carga
          </span>
        </div>
      )}
    </div>
  );
}
