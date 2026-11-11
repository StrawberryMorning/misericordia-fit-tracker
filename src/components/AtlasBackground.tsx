"use client";

import React, { useEffect, useState } from "react";

export function AtlasBackground() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      // Conecta completamente ao rolar ~170px (ou 65% do scroll disponível)
      const targetDistance = Math.min(170, Math.max(80, maxScroll * 0.65));
      const progress = Math.min(1, Math.max(0, scrollY / targetDistance));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll, { passive: true });
    updateScroll();
    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  // No topo da página (scrollProgress = 0):
  // - A Abóbada Celeste fica separada mais ao alto (-48px)
  // - O Titã Atlas fica mais abaixo com as mãos erguidas (+22px)
  // Ao rolar para baixo (scrollProgress = 1):
  // - Ambos convergem para 0px e a arte fica 100% inteira!
  const globeTranslateY = -((1 - scrollProgress) * 48);
  const titanTranslateY = (1 - scrollProgress) * 22;
  const isUnited = scrollProgress > 0.88;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-y-0 left-0 right-0 md:left-64 md:right-auto md:w-[270px] lg:w-[320px] xl:w-[360px] 2xl:w-[400px] z-0 overflow-hidden flex flex-col items-center justify-center select-none"
    >
      {/* Nicho / Halo Arquitetônico que garante contraste máximo do Atlas no Tema Escuro e no Tema Claro */}
      <div className="atlas-showcase-pedestal absolute inset-0" />

      {/* Brilho Ambiental Dinâmico que reage à união da Abóbada com o Titã */}
      <div
        className="absolute w-[260px] sm:w-[310px] h-[480px] sm:h-[540px] rounded-full blur-3xl transition-all duration-300 bg-amber-500/20"
        style={{
          opacity: 0.45 + scrollProgress * 0.45,
          transform: `scale(${0.92 + scrollProgress * 0.12})`,
        }}
      />

      {/* Container Proporcional (399:769) das Duas Camadas da Escultura */}
      <div className="relative w-[245px] sm:w-[275px] lg:w-[295px] xl:w-[330px] 2xl:w-[360px] aspect-[399/769] max-h-[88vh] transition-opacity duration-300 opacity-25 md:opacity-100">
        {/* Camada 1 (z-10): Abóbada Celeste (Esfera Superior) */}
        <div
          className="absolute inset-0 z-10 will-change-transform transition-transform duration-75 ease-out"
          style={{
            transform: `translateY(${globeTranslateY}px)`,
          }}
        >
          <img
            src="/atlas-bg-globe.png"
            alt=""
            className="atlas-sculpture-img w-full h-full object-contain"
          />
        </div>

        {/* Camada 2 (z-20): O Titã Atlas (Corpo e Mãos Erguidas) */}
        <div
          className="absolute inset-0 z-20 will-change-transform transition-transform duration-75 ease-out"
          style={{
            transform: `translateY(${titanTranslateY}px)`,
          }}
        >
          <img
            src="/atlas-bg-titan.png"
            alt=""
            className="atlas-sculpture-img w-full h-full object-contain"
          />
        </div>

        {/* Aura Dourada quando a Abóbada se encaixa nos ombros do Titã */}
        <div
          className="absolute inset-x-6 top-[14%] h-[30%] rounded-full bg-amber-400/25 blur-2xl z-0 transition-opacity duration-500"
          style={{
            opacity: isUnited ? 0.9 : 0,
          }}
        />
      </div>
    </div>
  );
}
