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
    <section id="catalogo" className="py-24 bg-brand-dark scroll-mt-20">
      <div id="muestras" className="scroll-mt-24"></div>
      <div className="container mx-auto px-4 max-w-[1400px]">
        
        {/* Header & Catalog Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-white/10 pb-6 gap-6">
          <div>
            <h2 className="font-heading text-3xl font-light text-brand-light uppercase tracking-widest mb-2">
              {activeTab === "frascos" ? "Catálogo de Perfumes" : "Catálogo de Muestras (Decants)"}
            </h2>
            <p className="text-brand-light/60 text-sm tracking-wide">
              {activeTab === "frascos"
                ? "Frascos completos 100% sellados de las casas árabes más prestigiosas"
                : "Muestras de 3ml con atomizador de vidrio para probar en tu piel antes de comprar"}
            </p>
          </div>

          {/* Catalog Tab Selector */}
          <div className="flex items-center gap-2 bg-brand-surface p-1.5 rounded-full border border-white/10 self-stretch md:self-auto justify-center">
            <button
              onClick={() => setActiveTab("frascos")}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "frascos"
                  ? "bg-brand-gold text-brand-dark shadow-md"
                  : "text-brand-light/70 hover:text-white"
              }`}
            >
              <span>Frascos Completos</span>
            </button>
            <button
              onClick={() => setActiveTab("muestras")}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "muestras"
                  ? "bg-[#C48B57] text-white shadow-md shadow-[#C48B57]/30"
                  : "text-brand-light/70 hover:text-white"
              }`}
            >
              <Droplets size={13} />
              <span>Muestras (3ML)</span>
              <span className="bg-brand-dark/40 text-[9px] px-1.5 py-0.5 rounded">FOTOS MUESTRA</span>
            </button>
          </div>
        </div>

        {/* View All Muestras Banner / Link if in Muestras tab */}
        {activeTab === "muestras" && (
          <div className="mb-8 p-4 bg-brand-surface/80 border border-[#C48B57]/30 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-[#C48B57]/20 text-[#C48B57] rounded-full">
                <Sparkles size={18} />
              </span>
              <div>
                <p className="text-xs font-bold text-brand-light uppercase tracking-wider">
                  Catálogo con Fotos Oficiales de Muestras
                </p>
                <p className="text-[11px] text-brand-light/60">
                  Cada decant incluye 3ml o 5ml de perfume puro con atomizador de vidrio hermético.
                </p>
              </div>
            </div>
            <Link
              href="/muestras"
              className="inline-flex items-center gap-1.5 bg-[#C48B57] hover:bg-[#A67548] text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded transition-colors whitespace-nowrap cursor-pointer"
            >
              Ver Catálogo Exclusivo de Muestras <ArrowRight size={14} />
            </Link>
          </div>
        )}

        {/* FRASCOS COMPLETOS GRID */}
        {activeTab === "frascos" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {perfumes.map((perfume) => (
              <PerfumeCard key={perfume.id} perfume={perfume} />
            ))}
          </div>
        )}

        {/* MUESTRAS GRID (Con Fotos Que Dicen Muestra) */}
        {activeTab === "muestras" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {muestras.map((muestra) => (
              <MuestraCard key={muestra.id} muestra={muestra} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          {activeTab === "muestras" ? (
            <Link
              href="/muestras"
              className="inline-block bg-[#C48B57] hover:bg-[#A67548] text-white px-8 py-3 text-xs font-bold uppercase tracking-widest rounded transition-colors"
            >
              Explorar Catálogo Completo de Muestras &rarr;
            </Link>
          ) : (
            <button
              onClick={() => setActiveTab("muestras")}
              className="inline-block bg-brand-surface hover:bg-white/5 text-brand-gold border border-brand-gold/30 px-8 py-3 text-xs font-bold uppercase tracking-widest rounded transition-colors"
            >
              Ver Catálogo de Muestras (Decants 3ml) &rarr;
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
