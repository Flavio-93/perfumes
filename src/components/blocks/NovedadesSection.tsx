"use client";
import { useState, useMemo } from "react";
import { perfumes } from "@/data/perfumes";
import { Search, X, Filter, Sparkles } from "lucide-react";
import PerfumeCard from "@/components/blocks/PerfumeCard";
import { useSearch } from "@/context/SearchContext";

export default function NovedadesSection() {
  const { searchQuery, setSearchQuery, selectedBrand, setSelectedBrand, clearFilters } = useSearch();

  // Extract all unique brands alphabetically
  const brands = useMemo(() => {
    const set = new Set(perfumes.map((p) => p.brand.trim().toUpperCase()));
    return ["ALL", ...Array.from(set).sort()];
  }, []);

  // Filter perfumes based on search query and selected brand
  const filteredPerfumes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return perfumes.filter((p) => {
      // Filter by Brand
      const matchesBrand =
        selectedBrand === "ALL" || p.brand.trim().toUpperCase() === selectedBrand;

      if (!matchesBrand) return false;

      // Filter by Search Query
      if (!q) return true;

      const nameMatch = p.name.toLowerCase().includes(q);
      const brandMatch = p.brand.toLowerCase().includes(q);
      const descMatch = p.description ? p.description.toLowerCase().includes(q) : false;
      const notesMatch = p.notes ? p.notes.some((n) => n.toLowerCase().includes(q)) : false;

      return nameMatch || brandMatch || descMatch || notesMatch;
    });
  }, [searchQuery, selectedBrand]);

  return (
    <section id="catalogo" className="py-10 sm:py-24 bg-brand-dark scroll-mt-24">
      <div className="container mx-auto px-2 sm:px-4 max-w-[1400px]">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 sm:mb-8 border-b border-white/10 pb-4 sm:pb-6 gap-4 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-brand-gold text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1.5">
              <Sparkles size={13} />
              <span>Colección Oficial</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl font-light text-brand-light uppercase tracking-widest mb-1 sm:mb-2">
              Catálogo de Perfumes
            </h2>
            <p className="text-brand-light/60 text-xs sm:text-sm tracking-wide">
              Frascos completos 100% sellados de las casas árabes más prestigiosas
            </p>
          </div>

          <div className="text-right self-end md:self-auto">
            <span className="text-[11px] sm:text-xs text-brand-light/50 uppercase tracking-widest">
              Mostrando <strong className="text-brand-gold">{filteredPerfumes.length}</strong> de{" "}
              {perfumes.length} perfumes
            </span>
          </div>
        </div>

        {/* Search Bar & Brand Filter Controls */}
        <div className="bg-brand-surface/90 border border-white/10 rounded-xl p-3 sm:p-5 mb-6 sm:mb-8 shadow-xl backdrop-blur-sm">
          {/* Main Search Input */}
          <div className="relative mb-3 sm:mb-4">
            <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none text-brand-gold">
              <Search size={18} className="sm:w-5 sm:h-5" />
            </div>
            <input
              id="catalog-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre, casa (ej. Hawas, Yara, 9PM, Lattafa, Asad)..."
              className="w-full pl-10 sm:pl-12 pr-10 py-3 sm:py-3.5 bg-brand-dark/90 border border-white/15 focus:border-brand-gold rounded-lg text-brand-light placeholder-brand-light/40 text-xs sm:text-sm transition-all focus:outline-none focus:ring-1 focus:ring-brand-gold/50"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-brand-light/50 hover:text-brand-gold transition-colors"
                title="Limpiar búsqueda"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Brands Filter Badges / Chips */}
          <div>
            <div className="flex items-center justify-between mb-2 sm:mb-2.5">
              <span className="text-[10px] sm:text-[11px] text-brand-light/60 uppercase font-bold tracking-widest flex items-center gap-1.5">
                <Filter size={12} className="text-brand-gold" />
                Filtrar por Casa / Marca:
              </span>
              {(selectedBrand !== "ALL" || searchQuery) && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-[9px] sm:text-[10px] text-brand-gold hover:text-white uppercase font-bold tracking-widest transition-colors flex items-center gap-1"
                >
                  <X size={11} />
                  Limpiar filtros
                </button>
              )}
            </div>

            <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1.5 pt-0.5 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {brands.map((b) => {
                const isSelected = selectedBrand === b;
                const label = b === "ALL" ? "Todas las marcas" : b;
                const count =
                  b === "ALL"
                    ? perfumes.length
                    : perfumes.filter((p) => p.brand.trim().toUpperCase() === b).length;

                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setSelectedBrand(b)}
                    className={`flex-shrink-0 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-brand-gold text-brand-dark shadow-md shadow-brand-gold/20 scale-[1.02]"
                        : "bg-brand-dark/80 text-brand-light/70 hover:text-brand-light hover:bg-white/10 border border-white/5"
                    }`}
                  >
                    <span>{label}</span>
                    <span
                      className={`text-[8px] sm:text-[9px] px-1.5 py-0.2 rounded-full ${
                        isSelected ? "bg-brand-dark/20 text-brand-dark" : "bg-white/10 text-brand-light/50"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* FRASCOS COMPLETOS GRID (2 COLUMNAS EN CELULAR) */}
        {filteredPerfumes.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
            {filteredPerfumes.map((perfume) => (
              <PerfumeCard key={perfume.id} perfume={perfume} />
            ))}
          </div>
        ) : (
          <div className="bg-brand-surface/40 border border-white/10 rounded-xl p-8 sm:p-16 text-center max-w-lg mx-auto">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="sm:w-7 sm:h-7" />
            </div>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-brand-light uppercase tracking-wide mb-2">
              No se encontraron perfumes
            </h3>
            <p className="text-xs sm:text-sm text-brand-light/60 mb-6 leading-relaxed">
              No hay coincidencias para &quot;
              <span className="text-brand-gold">{searchQuery || selectedBrand}</span>
              &quot;. Intenta con otra palabra clave o restablece los filtros.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="bg-brand-gold hover:bg-[#b07b48] text-brand-dark text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-lg transition-all shadow-md cursor-pointer"
            >
              Ver todos los perfumes ({perfumes.length})
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
