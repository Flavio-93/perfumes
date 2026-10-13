"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/blocks/Navbar";
import Footer from "@/components/blocks/Footer";
import WhatsAppFloating from "@/components/blocks/WhatsAppFloating";
import { muestras, MuestraItem } from "@/data/muestras";
import { businessData } from "@/data/businessContent";
import { Search, Sparkles, Droplets, ShieldCheck, ArrowRight, Check } from "lucide-react";

import MuestraCard from "@/components/blocks/MuestraCard";

export default function MuestrasPage() {
  const [selectedBrand, setSelectedBrand] = useState("TODAS");
  const [searchQuery, setSearchQuery] = useState("");

  // List of unique brands
  const brands = useMemo(() => {
    const list = Array.from(new Set(muestras.map((m) => m.brand))).filter(Boolean);
    return ["TODAS", ...list];
  }, []);

  // Filtered samples
  const filteredMuestras = useMemo(() => {
    return muestras.filter((m) => {
      const matchBrand = selectedBrand === "TODAS" || m.brand.toUpperCase() === selectedBrand.toUpperCase();
      const matchSearch =
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchBrand && matchSearch;
    });
  }, [selectedBrand, searchQuery]);

  return (
    <main className="min-h-screen bg-brand-dark selection:bg-brand-gold/30 selection:text-brand-gold pt-28">
      <Navbar />

      {/* Hero Banner for Samples */}
      <section className="relative py-12 md:py-16 bg-gradient-to-b from-brand-surface to-brand-dark border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#c48b57_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 px-4 py-1.5 rounded-full text-brand-gold text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles size={14} />
            <span>Colección Oficial de Muestras y Decants 3ML y 5ML</span>
          </div>
          
          <h1 className="font-heading text-4xl md:text-6xl text-brand-light font-bold mb-4 tracking-tight">
            Catálogo de Muestras
          </h1>
          <p className="text-brand-light/70 text-sm md:text-base max-w-2xl mx-auto mb-8 font-light">
            Prueba las fragancias más codiciadas en atomizadores originales de 3ml y 5ml antes de invertir en el frasco completo.
          </p>

          {/* Value Props Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-4 border-t border-white/10 text-xs text-brand-light/80">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck size={18} className="text-brand-gold flex-shrink-0" />
              <span>100% Perfume Original Extraído del Frasco</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Droplets size={18} className="text-brand-gold flex-shrink-0" />
              <span>Atomizador de Vidrio Hermético (3ML y 5ML)</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Sparkles size={18} className="text-brand-gold flex-shrink-0" />
              <span>3ML a S/. 15.00 • 5ML a S/. 22.00</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Catalog Section */}
      <section className="py-12 bg-brand-dark">
        <div className="container mx-auto px-4 max-w-[1400px]">
          
          {/* Controls: Search and Brands */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 pb-6 border-b border-white/10">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-light/40" />
              <input
                type="text"
                placeholder="Buscar perfume por nombre o marca..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-brand-surface border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-xs text-brand-light placeholder:text-brand-light/40 focus:outline-none focus:border-brand-gold transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-brand-light/40 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Results Counter */}
            <div className="text-xs text-brand-light/60 tracking-wider">
              Mostrando <span className="text-brand-gold font-bold">{filteredMuestras.length}</span> perfumes en muestra
            </div>
          </div>

          {/* Brand Pills */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedBrand === brand
                    ? "bg-brand-gold text-brand-dark shadow-lg shadow-brand-gold/20"
                    : "bg-brand-surface text-brand-light/70 hover:text-white border border-white/5 hover:border-white/20"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>

          {/* Grid of Muestras */}
          {filteredMuestras.length === 0 ? (
            <div className="text-center py-20 bg-brand-surface rounded-lg border border-white/5 p-8">
              <p className="text-brand-light/60 text-sm mb-4">No se encontraron muestras que coincidan con tu búsqueda.</p>
              <button
                onClick={() => {
                  setSelectedBrand("TODAS");
                  setSearchQuery("");
                }}
                className="text-xs text-brand-gold underline uppercase font-bold tracking-wider"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {filteredMuestras.map((muestra) => (
                <MuestraCard key={muestra.id} muestra={muestra} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppFloating />
    </main>
  );
}
