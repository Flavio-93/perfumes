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
    <section id="catalogo" className="py-10 sm:py-20 bg-brand-dark scroll-mt-24">
      <div className="container mx-auto px-4 max-w-[1400px]">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 sm:mb-8 border-b border-black/10 pb-4 sm:pb-6 gap-4 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-brand-gold text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1.5">
              <Sparkles size={13} />
              <span>Colección Oficial</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl font-light text-brand-light uppercase tracking-widest mb-1 sm:mb-2">
              Catálogo de Perfumes
            </h2>
            <p className="text-brand-light/70 text-xs sm:text-sm tracking-wide">
              Frascos completos 100% sellados de las casas árabes más prestigiosas
            </p>
          </div>

          <div className="text-right self-end md:self-auto">
            <span className="text-[11px] sm:text-xs text-brand-light/60 uppercase tracking-widest font-semibold">
              Mostrando <strong className="text-brand-gold font-black">{filteredPerfumes.length}</strong> de{" "}
              {perfumes.length} perfumes
            </span>
          </div>
        </div>

        {/* Search Bar & Brand Filter Controls */}
        <div className="bg-white border border-black/10 rounded-2xl p-4 sm:p-6 mb-8 shadow-sm">
          {/* Main Search Input */}
          <div className="relative mb-5">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-gold">
              <Search size={20} />
            </div>
            <input
              id="catalog-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre, casa (ej. Hawas, Yara, 9 PM, Lattafa, Asad)..."
              className="w-full pl-12 pr-10 py-3.5 bg-brand-dark/50 border border-black/15 focus:border-brand-gold rounded-xl text-brand-light placeholder-brand-light/45 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:bg-white"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-brand-light/40 hover:text-brand-gold transition-colors"
                title="Limpiar búsqueda"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Brands Filter Badges / Chips */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] text-brand-light/70 uppercase font-bold tracking-wider flex items-center gap-1.5">
                <Filter size={13} className="text-brand-gold" />
                Filtrar por Casa / Marca:
              </span>
              {(selectedBrand !== "ALL" || searchQuery) && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-[11px] text-brand-gold hover:text-black uppercase font-bold tracking-wider transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <X size={13} />
                  Limpiar filtros
                </button>
              )}
            </div>

            {/* Chips con estilo acorde al tema claro/dorado */}
            <div className="flex flex-wrap gap-2 pt-1">
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
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 border ${
                      isSelected
                        ? "bg-[#C5A059] text-white border-[#C5A059] shadow-md shadow-[#C5A059]/30 scale-[1.02]"
                        : "bg-[#FAF8F5] text-[#2C2C2C] hover:text-black hover:bg-white hover:border-[#C5A059]/60 border-black/10"
                    }`}
                  >
                    <span>{label}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isSelected ? "bg-black/20 text-white" : "bg-black/5 text-[#2C2C2C]/70"
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
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredPerfumes.map((perfume) => (
              <PerfumeCard key={perfume.id} perfume={perfume} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-black/10 rounded-2xl p-10 sm:p-16 text-center max-w-lg mx-auto shadow-sm">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center mx-auto mb-4">
              <Search size={26} />
            </div>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-brand-light uppercase tracking-wide mb-2">
              No se encontraron perfumes
            </h3>
            <p className="text-xs sm:text-sm text-brand-light/70 mb-6 leading-relaxed">
              No hay coincidencias para &quot;
              <strong className="text-brand-gold">{searchQuery || selectedBrand}</strong>
              &quot;. Intenta con otra palabra clave o restablece los filtros.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="bg-brand-gold hover:bg-[#b07b48] text-white text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all shadow-md cursor-pointer"
            >
              Ver todos los perfumes ({perfumes.length})
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
