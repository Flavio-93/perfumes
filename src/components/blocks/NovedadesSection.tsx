"use client";
import { useState, useMemo } from "react";
import { perfumes } from "@/data/perfumes";
import { Search, X, Filter, Sparkles, ChevronDown, Check } from "lucide-react";
import PerfumeCard from "@/components/blocks/PerfumeCard";
import { useSearch } from "@/context/SearchContext";

type GenderFilter = "ALL" | "HOMBRE" | "MUJER";

export default function NovedadesSection() {
  const { searchQuery, setSearchQuery, selectedBrand, setSelectedBrand, clearFilters } = useSearch();

  // Estado para abrir/cerrar el panel general de filtros
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // Estado para el filtro de género: "ALL" | "HOMBRE" | "MUJER" | "UNISEX"
  const [selectedGender, setSelectedGender] = useState<GenderFilter>("ALL");

  // Estado para expandir la lista de marcas
  const [isBrandsExpanded, setIsBrandsExpanded] = useState(false);

  // Extraer todas las marcas únicas
  const brands = useMemo(() => {
    const set = new Set(perfumes.map((p) => p.brand.trim().toUpperCase()));
    return ["ALL", ...Array.from(set).sort()];
  }, []);

  // Listas curadas de exclusividad de género para el catálogo de ISF Fragrance
  // Perfumes estrictamente femeninos (no aptos para varón tradicional)
  const strictlyWomenIds = useMemo(() => new Set([
    "1",  // 9 AM Pour Femme (mujer)
    "3",  // Yara Pink
    "5",  // Yum Yum (floral frutal gourmand femenino)
    "11", // Dúo Eclaire
    "16", // Atheeri (floral femenino)
    "19", // Yara Elixir
    "20", // Eclaire Banoffi
    "21", // Island Bliss
    "22", // Island Breeze
    "24", // Nebras (vainilla chocolate gourmand)
    "25", // Hawas Diva
    "27", // Club de Nuit Maleka
    "34", // Her Confession
    "35", // Club de Nuit Woman
    "37", // Odyssey Candee
    "43", // Angham (Burberry Goddess dupe)
    "49"  // Dúo Yara Pink
  ]), []);

  // Perfumes estrictamente masculinos (no aptos para dama tradicional)
  const strictlyMenIds = useMemo(() => new Set([
    "2",  // 9 PM
    "6",  // Khamrah Dukhan
    "8",  // Nitro Red
    "9",  // Nautica Voyage
    "10", // Asad Elixir
    "13", // Hawas Fire
    "17", // Rome Imagine
    "18", // Odyssey Aqua Edition
    "26", // Asad Bourbon
    "28", // Hawas Ice
    "29", // Hawas Tropical
    "32", // Liquid Brun
    "33", // Veneno Black
    "40", // Hayaati
    "41", // The Kingdom
    "42", // Odyssey Mega
    "45", // Your Touch Intense
    "46", // Club de Nuit Urban Man Elixir
    "48", // Odyssey Mandarin Sky
    "50", // 9 AM Dive
    "51", // Odyssey Homme White
    "53"  // Rayhaan Lion
  ]), []);

  // Función para determinar si un perfume corresponde a la categoría "Para Él" o "Para Ella"
  // Al no existir la opción "Unisex", los perfumes orientales versátiles (Khamrah, Amber Oud Gold, etc.)
  // se muestran tanto en "Para Él" como en "Para Ella" para que el cliente no se pierda ninguna opción.
  const matchesGenderCategory = (perfumeId: string, category: GenderFilter): boolean => {
    if (category === "ALL") return true;

    if (category === "HOMBRE") {
      // Para Él: se muestran todos los perfumes masculinos y los perfumes árabes unisex (excluyendo solo los estrictamente de mujer)
      return !strictlyWomenIds.has(perfumeId);
    }

    if (category === "MUJER") {
      // Para Ella: se muestran todos los perfumes femeninos y los perfumes árabes unisex (excluyendo solo los estrictamente de hombre)
      return !strictlyMenIds.has(perfumeId);
    }

    return true;
  };

  // Conteo exacto de perfumes disponibles en cada categoría
  const genderCounts = useMemo(() => {
    let hombre = 0;
    let mujer = 0;

    perfumes.forEach((p) => {
      if (!strictlyWomenIds.has(p.id)) hombre++;
      if (!strictlyMenIds.has(p.id)) mujer++;
    });

    return { hombre, mujer, total: perfumes.length };
  }, [strictlyWomenIds, strictlyMenIds]);

  // Filtrado reactivo por Búsqueda, Género y Marca
  const filteredPerfumes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return perfumes.filter((p) => {
      // 1. Filtro por Género (Para Él / Para Ella)
      if (selectedGender !== "ALL" && !matchesGenderCategory(p.id, selectedGender)) {
        return false;
      }

      // 2. Filtro por Marca
      const matchesBrand =
        selectedBrand === "ALL" || p.brand.trim().toUpperCase() === selectedBrand;
      if (!matchesBrand) return false;

      // 3. Filtro por Búsqueda de texto
      if (!q) return true;
      const nameMatch = p.name.toLowerCase().includes(q);
      const brandMatch = p.brand.toLowerCase().includes(q);
      const descMatch = p.description ? p.description.toLowerCase().includes(q) : false;
      const notesMatch = p.notes ? p.notes.some((n) => n.toLowerCase().includes(q)) : false;

      return nameMatch || brandMatch || descMatch || notesMatch;
    });
  }, [searchQuery, selectedGender, selectedBrand]);

  const hasActiveFilters = searchQuery !== "" || selectedGender !== "ALL" || selectedBrand !== "ALL";

  const handleClearAll = () => {
    clearFilters();
    setSelectedGender("ALL");
  };

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

          <div className="text-right self-end md:self-auto flex items-center gap-3">
            <span className="text-[11px] sm:text-xs text-brand-light/60 uppercase tracking-widest font-semibold">
              Mostrando <strong className="text-brand-gold font-black">{filteredPerfumes.length}</strong> de{" "}
              {perfumes.length} perfumes
            </span>
          </div>
        </div>

        {/* Buscador & Barra de Botón Filtrar */}
        <div className="bg-white border border-black/10 rounded-2xl p-4 sm:p-6 mb-8 shadow-sm">
          {/* Fila del Buscador y Botón Filtrar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-2">
            {/* Input de Búsqueda */}
            <div className="relative flex-1">
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
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-brand-light/40 hover:text-brand-gold transition-colors cursor-pointer"
                  title="Limpiar búsqueda"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Botón Principal: FILTRAR */}
            <button
              type="button"
              onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
              className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all cursor-pointer shadow-sm border ${
                isFilterPanelOpen || selectedGender !== "ALL" || selectedBrand !== "ALL"
                  ? "bg-[#C5A059] text-white border-[#C5A059] shadow-md shadow-[#C5A059]/25"
                  : "bg-[#FAF8F5] text-[#2C2C2C] hover:bg-white hover:border-[#C5A059] border-black/15"
              }`}
            >
              <Filter size={16} className={isFilterPanelOpen ? "rotate-180 transition-transform" : ""} />
              <span>Filtrar</span>
              {(selectedGender !== "ALL" || selectedBrand !== "ALL") && (
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              )}
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${isFilterPanelOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {/* Chips de filtros activos rápidos */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pt-3 mt-3 border-t border-black/5">
              <span className="text-[11px] font-bold text-brand-light/60 uppercase tracking-wider">Filtros activos:</span>
              
              {selectedGender !== "ALL" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C5A059]/15 text-[#8C6D23] border border-[#C5A059]/30 rounded-lg text-xs font-bold">
                  {selectedGender === "HOMBRE" && "👨 Para Él"}
                  {selectedGender === "MUJER" && "👩 Para Ella"}
                  <button 
                    type="button" 
                    onClick={() => setSelectedGender("ALL")}
                    className="hover:text-black cursor-pointer"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}

              {selectedBrand !== "ALL" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C5A059]/15 text-[#8C6D23] border border-[#C5A059]/30 rounded-lg text-xs font-bold">
                  Casa: {selectedBrand}
                  <button 
                    type="button" 
                    onClick={() => setSelectedBrand("ALL")}
                    className="hover:text-black cursor-pointer"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/5 text-black border border-black/10 rounded-lg text-xs font-bold">
                  &quot;{searchQuery}&quot;
                  <button 
                    type="button" 
                    onClick={() => setSearchQuery("")}
                    className="hover:text-brand-gold cursor-pointer"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}

              <button
                type="button"
                onClick={handleClearAll}
                className="text-xs text-brand-gold hover:text-black font-bold uppercase tracking-wider ml-auto cursor-pointer"
              >
                Limpiar todo
              </button>
            </div>
          )}

          {/* PANEL DE FILTROS DESPLEGABLE */}
          {isFilterPanelOpen && (
            <div className="mt-5 pt-5 border-t border-black/10 animate-fade-in-up">
              
              {/* 1. Categoría de Género */}
              <div className="mb-6">
                <span className="block text-[11px] text-brand-light/70 uppercase font-black tracking-widest mb-3">
                  1. Seleccionar por Género:
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
                  {/* Para Él (Varón) */}
                  <button
                    type="button"
                    onClick={() => setSelectedGender(selectedGender === "HOMBRE" ? "ALL" : "HOMBRE")}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      selectedGender === "HOMBRE"
                        ? "bg-[#C5A059] text-white border-[#C5A059] shadow-md shadow-[#C5A059]/25 scale-[1.02]"
                        : "bg-[#FAF8F5] text-[#2C2C2C] hover:bg-white hover:border-[#C5A059]/60 border-black/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">👨</span>
                      <div>
                        <p className="text-sm font-extrabold uppercase tracking-wider">Para Él</p>
                        <p className={`text-xs ${selectedGender === "HOMBRE" ? "text-white/80" : "text-black/50"}`}>
                          Perfumes para Caballero
                        </p>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      selectedGender === "HOMBRE" ? "bg-black/20 text-white" : "bg-black/5 text-[#2C2C2C]/70"
                    }`}>
                      {genderCounts.hombre}
                    </span>
                  </button>

                  {/* Para Ella (Mujer) */}
                  <button
                    type="button"
                    onClick={() => setSelectedGender(selectedGender === "MUJER" ? "ALL" : "MUJER")}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      selectedGender === "MUJER"
                        ? "bg-[#C5A059] text-white border-[#C5A059] shadow-md shadow-[#C5A059]/25 scale-[1.02]"
                        : "bg-[#FAF8F5] text-[#2C2C2C] hover:bg-white hover:border-[#C5A059]/60 border-black/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">👩</span>
                      <div>
                        <p className="text-sm font-extrabold uppercase tracking-wider">Para Ella</p>
                        <p className={`text-xs ${selectedGender === "MUJER" ? "text-white/80" : "text-black/50"}`}>
                          Perfumes para Dama
                        </p>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      selectedGender === "MUJER" ? "bg-black/20 text-white" : "bg-black/5 text-[#2C2C2C]/70"
                    }`}>
                      {genderCounts.mujer}
                    </span>
                  </button>
                </div>
              </div>

              {/* 2. Filtro de Marcas / Casas (Desplegable) */}
              <div className="pt-4 border-t border-black/10">
                <button
                  type="button"
                  onClick={() => setIsBrandsExpanded(!isBrandsExpanded)}
                  className="w-full flex items-center justify-between p-3.5 bg-[#FAF8F5] hover:bg-[#F2EFE9] border border-black/10 rounded-xl transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2 text-left">
                    <span className="text-base">🏷️</span>
                    <div>
                      <span className="text-xs font-black uppercase tracking-wider text-[#2C2C2C] block">
                        Filtrar por Marcas / Casas Árabes
                      </span>
                      <span className="text-[10px] text-brand-light/60">
                        {selectedBrand === "ALL" ? "Haz clic para ver todas las marcas" : `Marca seleccionada: ${selectedBrand}`}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {selectedBrand !== "ALL" && (
                      <span className="text-[10px] bg-[#C5A059] text-white px-2 py-0.5 rounded-full font-bold">
                        {selectedBrand}
                      </span>
                    )}
                    <ChevronDown
                      size={18}
                      className={`text-[#C5A059] transition-transform duration-300 ${isBrandsExpanded ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>

                {/* Subpanel con los chips de marcas (solo cuando se presiona marcas) */}
                {isBrandsExpanded && (
                  <div className="mt-3 p-4 bg-[#FAF8F5]/60 rounded-xl border border-black/5 animate-fade-in-up">
                    <div className="flex flex-wrap gap-2">
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
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 border ${
                              isSelected
                                ? "bg-[#C5A059] text-white border-[#C5A059] shadow-sm scale-[1.02]"
                                : "bg-white text-[#2C2C2C] hover:border-[#C5A059] border-black/10"
                            }`}
                          >
                            <span>{label}</span>
                            <span
                              className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
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
                )}
              </div>

            </div>
          )}
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
              No hay coincidencias con los filtros aplicados. Intenta restablecer los filtros para ver la colección.
            </p>
            <button
              type="button"
              onClick={handleClearAll}
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
