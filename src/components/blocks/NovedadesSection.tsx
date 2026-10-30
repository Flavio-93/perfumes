"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { perfumes } from "@/data/perfumes";
import { muestras } from "@/data/muestras";
import { Droplets, Sparkles, ArrowRight, Check } from "lucide-react";
import { businessData } from "@/data/businessContent";
import PerfumeCard from "@/components/blocks/PerfumeCard";
import MuestraCard from "@/components/blocks/MuestraCard";

export default function NovedadesSection() {
  const [activeTab, setActiveTab] = useState<"frascos" | "muestras">("frascos");

  // Check URL hash on mount or change
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.hash === "#muestras") {
        setActiveTab("muestras");
      }
    }
  }, []);

  return (
    <section id="catalogo" className="py-10 sm:py-24 bg-brand-dark scroll-mt-20">
      <div id="muestras" className="scroll-mt-24"></div>
      <div className="container mx-auto px-2 sm:px-4 max-w-[1400px]">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 sm:mb-10 border-b border-white/10 pb-4 sm:pb-6 gap-4 sm:gap-6">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-light text-brand-light uppercase tracking-widest mb-1 sm:mb-2">
              Catálogo de Perfumes
            </h2>
            <p className="text-brand-light/60 text-xs sm:text-sm tracking-wide">
              Frascos completos 100% sellados de las casas árabes más prestigiosas
            </p>
          </div>
        </div>

        {/* FRASCOS COMPLETOS GRID (2 COLUMNAS EN CELULAR) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
          {perfumes.map((perfume) => (
            <PerfumeCard key={perfume.id} perfume={perfume} />
          ))}
        </div>
      </div>
    </section>
  );
}
