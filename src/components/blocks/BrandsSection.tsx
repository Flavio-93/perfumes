import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

const brands = [
  {
    name: "LATTAFA",
    origin: "Emiratos Árabes Unidos",
    description: "La casa madre de la perfumería árabe moderna. Famosa por Yara, Khamrah, Asad y Bade'e Al Oud.",
    tag: "MÁS POPULAR"
  },
  {
    name: "AFNAN",
    origin: "Emiratos Árabes Unidos",
    description: "Elegancia y rendimiento bestial. Creadores de los icónicos 9 AM, 9 PM e Historic Doria.",
    tag: "BEST SELLER"
  },
  {
    name: "ARMAF",
    origin: "Dubái, EAU",
    description: "Reconocida mundialmente por la saga Club de Nuit y la exclusiva colección Odyssey.",
    tag: "TOP VENTAS"
  },
  {
    name: "AL HARAMAIN",
    origin: "Arabia Saudita",
    description: "Alta perfumería oriental desde 1970. Creadores de la aclamada línea Amber Oud.",
    tag: "NICHO & LUJO"
  },
  {
    name: "RASASI",
    origin: "Dubái, EAU",
    description: "Una de las casas más prestigiosas y longevas de Medio Oriente, famosa por la familia Hawas.",
    tag: "PREMIUM"
  },
  {
    name: "FRENCH AVENUE",
    origin: "París / Dubái",
    description: "La fusión perfecta entre perfumería francesa refinada y potencia oriental (Liquid Brun, Vulcan).",
    tag: "ALTA GAMA"
  },
  {
    name: "PARIS CORNER",
    origin: "Emiratos Árabes Unidos",
    description: "Innovación, presentaciones de impacto y aromas gourmand inolvidables como Emir y Voux.",
    tag: "TENDENCIA"
  },
  {
    name: "ZIMAYA",
    origin: "Dubái, EAU",
    description: "Composiciones envolventes de extractos puros de ámbar, oud y especias exóticas.",
    tag: "EXCLUSIVO"
  }
];

export default function BrandsSection() {
  return (
    <section id="marcas" className="py-24 bg-brand-surface border-t border-b border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#c48b57_1px,transparent_1px)] [background-size:32px_32px] opacity-5"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 pb-4 border-b border-white/10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-brand-gold text-xs font-bold uppercase tracking-widest mb-2">
              <Sparkles size={14} />
              <span>Casas de Perfumería</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-light text-brand-light uppercase tracking-widest">
              Nuestras Marcas Exclusivas
            </h2>
            <p className="text-brand-light/60 text-sm mt-2 max-w-xl">
              Distribuimos exclusivamente marcas 100% originales con sello de garantía directo de Dubái y Arabia Saudita.
            </p>
          </div>
          
          <Link 
            href="/muestras" 
            className="inline-flex items-center gap-2 text-xs font-bold text-brand-gold hover:text-white uppercase tracking-widest transition-colors"
          >
            Ver muestras por marca <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brands.map((brand, idx) => (
            <div 
              key={idx}
              className="bg-brand-dark/60 hover:bg-brand-dark p-6 rounded-lg border border-white/5 hover:border-brand-gold/40 transition-all duration-300 flex flex-col group relative"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-[9px] font-bold tracking-widest uppercase bg-brand-gold/10 text-brand-gold border border-brand-gold/20 px-2 py-0.5 rounded">
                  {brand.tag}
                </span>
                <span className="text-[10px] text-brand-light/40 uppercase tracking-wider">
                  {brand.origin}
                </span>
              </div>

              <h3 className="font-heading text-xl font-bold text-brand-light group-hover:text-brand-gold transition-colors tracking-wider mb-2">
                {brand.name}
              </h3>

              <p className="text-xs text-brand-light/70 leading-relaxed mb-6 flex-1">
                {brand.description}
              </p>

              <Link 
                href="/muestras"
                className="text-[10px] font-bold text-brand-gold uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-1 transition-transform"
              >
                Explorar catálogo &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
