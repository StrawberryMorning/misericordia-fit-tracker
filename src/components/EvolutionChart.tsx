"use client";

import React from "react";

interface LineSeries {
  label: string;
  color: string;
  data: number[];
  fill?: boolean;
}

interface EvolutionChartProps {
  labels: string[];
  series: LineSeries[];
  unit?: string;
}

export function EvolutionChart({
  labels,
  series,
  unit = "",
}: EvolutionChartProps) {
  if (!labels.length || !series.length || series[0].data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-slate-900/60 rounded-xl border border-slate-800 text-slate-500 text-sm">
        Adicione pelo menos 1 registro para visualizar o gráfico de evolução.
      </div>
    );
  }

  const allValues = series.flatMap((s) => s.data.filter((v) => !isNaN(v)));
  const minVal = Math.min(...allValues);
  const maxVal = Math.max(...allValues);
  const padding = Math.max(1, (maxVal - minVal) * 0.18);
  const yMin = Math.max(0, Math.floor((minVal - padding) * 10) / 10);
  const yMax = Math.ceil((maxVal + padding) * 10) / 10;
  const yRange = yMax - yMin || 1;

  const width = 640;
  const height = 240;
  const padLeft = 46;
  const padRight = 20;
  const padTop = 20;
  const padBottom = 34;

  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const getX = (index: number, count: number) => {
    if (count <= 1) return padLeft + chartW / 2;
    return padLeft + (index / (count - 1)) * chartW;
  };

  const getY = (val: number) => {
    return padTop + chartH - ((val - yMin) / yRange) * chartH;
  };

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) =>
    Number((yMin + t * yRange).toFixed(1))
  );

  return (
    <div className="w-full space-y-3">
      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
        {series.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full inline-block"
              style={{ backgroundColor: s.color }}
            />
            <span className="text-slate-300 font-medium">{s.label}</span>
          </div>
        ))}
      </div>

      {/* SVG Canvas */}
      <div className="w-full overflow-hidden rounded-xl bg-slate-950/70 border border-slate-800/80 p-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-56 select-none overflow-visible"
        >
          {/* Horizontal Grid Lines & Y-Axis Labels */}
          {yTicks.map((tick, idx) => {
            const y = getY(tick);
            return (
              <g key={idx}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  stroke="#1e293b"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={padLeft - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-slate-500 text-[10px] font-mono"
                >
                  {tick}
                  {unit}
                </text>
              </g>
            );
          })}

          {/* X-Axis Labels */}
          {labels.map((label, i) => {
            const x = getX(i, labels.length);
            return (
              <text
                key={i}
                x={x}
                y={height - 8}
                textAnchor="middle"
                className="fill-slate-400 text-[10px] font-mono"
              >
                {label}
              </text>
            );
          })}

          {/* Series Paths and Points */}
          {series.map((s) => {
            const points = s.data.map((val, i) => ({
              x: getX(i, labels.length),
              y: getY(val),
              val,
            }));

            const pathD = points
              .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
              .join(" ");

            const areaD =
              points.length > 1
                ? `${pathD} L ${points[points.length - 1].x} ${
                    padTop + chartH
                  } L ${points[0].x} ${padTop + chartH} Z`
                : "";

            return (
              <g key={s.label}>
                {s.fill && areaD && (
                  <path d={areaD} fill={s.color} fillOpacity={0.12} />
                )}
                {points.length > 1 && (
                  <path
                    d={pathD}
                    fill="none"
                    stroke={s.color}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
                {points.map((p, idx) => (
                  <g key={idx} className="group cursor-pointer">
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={4.5}
                      fill="#0f172a"
                      stroke={s.color}
                      strokeWidth="2.5"
                    />
                    <text
                      x={p.x}
                      y={p.y - 10}
                      textAnchor="middle"
                      className="fill-slate-200 text-[10px] font-bold opacity-85"
                    >
                      {p.val}
                    </text>
                  </g>
                ))}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
