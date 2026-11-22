"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { businessData } from "@/data/businessContent";
import { ArrowRight, ShieldCheck, Flame, MessageCircleQuestion } from "lucide-react";

// Perfumes árabes icónicos y virales a nivel mundial para el slide 1
const featuredArabianBottles = [
  { name: "Khamrah", house: "Lattafa", img: "/fotos_perfumes/khamrah_dukhan_lattafa_eau_de_parfum_para_hombre_1.webp" },
  { name: "Club de Nuit", house: "Armaf", img: "/fotos_perfumes/club_de_nuit_bling_armaf_eau_de_parfum_1.webp" },
  { name: "9 PM", house: "Afnan", img: "/fotos_perfumes/9pm_afnan_eau_de_parfum_para_hombre_1.webp" },
  { name: "Liquid Brun", house: "French Avenue", img: "/fotos_perfumes/liquid_brun_french_avenue_eau_de_parfum_para_hombre_1.webp" },
  { name: "Amber Oud Aqua", house: "Al Haramain", img: "/fotos_perfumes/amber_oud_aqua_dubai_al_haramain_extrait_de_parfum_unisex_1.webp" },
  { name: "Asad", house: "Lattafa", img: "/fotos_perfumes/asad_bourbon_lattafa_eau_de_parfum_para_hombre_1.webp" }
];

const slides = [
  {
    id: 1,
    tag: "TENDENCIA VIRAL 2026",
    tagIcon: Flame,
    subtitle: "Lujo Árabe 100% Original de Dubái",
    title: "PERFUMES ÁRABES EXCLUSIVOS",
    description: "Khamrah, 9PM, Club de Nuit, Asad y Liquid Brun: los aromas más premiados del mundo con estela imponente y fijación de más de 12 horas.",
    buttonText: "EXPLORAR CATÁLOGO",
    secondaryButtonText: "VER NOVEDADES",
    secondaryLink: "#catalogo",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000&auto=format&fit=crop", // Dubai skyline dorado nocturno
    showPerfumeShowcase: true,
    link: "#catalogo"
  },
  {
    id: 2,
    tag: "ASESORÍA PERSONALIZADA",
    tagIcon: MessageCircleQuestion,
    subtitle: "¿No sabes qué aroma va mejor contigo?",
    title: "¿CUÁL ES TU PERFUME IDEAL?",
    description: "Escríbenos por WhatsApp y te guiamos para elegir la joya árabe perfecta según tu estilo personal, ocasión especial o estación.",
    buttonText: "ASESORARME POR WHATSAPP",
    secondaryButtonText: "VER MARCAS",
    secondaryLink: "#marcas",
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=2000&auto=format&fit=crop", // Botella ámbar/dorada lujosa
    showPerfumeShowcase: false,
    link: `https://wa.me/${businessData.whatsappNumber}?text=Hola,%20deseo%20asesor%C3%ADa%20para%20elegir%20mi%20perfume%20%C3%A1rabe%20ideal.`
  },
  {
    id: 3,
    tag: "ENVÍOS SEGUROS A TODO EL PERÚ",
    tagIcon: ShieldCheck,
    subtitle: "Garantía de Originalidad y Entrega Rápida",
    title: "FRASCOS SELLADOS DE DUBÁI",
    description: "Casas exclusivas: Lattafa, Afnan, Armaf, French Avenue, Al Haramain y Dumont. Garantía de caja y celofán sellado directo a tu puerta.",
    buttonText: "VER COLECCIÓN SELLADA",
    secondaryButtonText: "PEDIR AHORA",
    secondaryLink: "#catalogo",
    image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=2000&auto=format&fit=crop", // Múltiples frascos de lujo con oro y cristal
    showPerfumeShowcase: false,
    link: "#catalogo"
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play del slider cada 7 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[72vh] min-h-[520px] sm:h-[82vh] sm:min-h-[600px] mt-[68px] sm:mt-[80px] overflow-hidden bg-[#0A0A0A]">
      {/* Contenedor de los slides */}
      {slides.map((slide, index) => {
        const TagIcon = slide.tagIcon;
        const isActive = index === currentSlide;

        return (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Background Image con zoom sutil */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[8000ms] ease-out"
              style={{ 
                backgroundImage: `url('${slide.image}')`,
                transform: isActive ? 'scale(1.06)' : 'scale(1)' 
              }}
            ></div>
            
            {/* Overlay multicapa para contraste de lujo y máxima legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/45"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40"></div>
            
            {/* Contenido del banner */}
            <div className="container mx-auto px-4 md:px-12 relative h-full flex items-center w-full">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
                
                {/* Columna de Texto Persuasivo */}
                <div className={`lg:col-span-7 transform transition-all duration-1000 delay-200 ${isActive ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
                  
                  {/* Badge llamativo superior */}
                  <div className="inline-flex items-center gap-2 bg-[#C5A059] text-black font-extrabold px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[9px] sm:text-[11px] uppercase tracking-widest mb-3 sm:mb-4 shadow-lg shadow-[#C5A059]/30">
                    <TagIcon size={13} className="text-black" />
                    <span>{slide.tag}</span>
                  </div>

                  {/* Subtítulo */}
                  <h2 className="text-[#C5A059] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[11px] sm:text-xs md:text-sm font-bold mb-2 sm:mb-3">
                    {slide.subtitle}
                  </h2>
                  
                  {/* Título Principal */}
                  <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl font-black text-white mb-3 sm:mb-4 leading-[1.05] tracking-tight drop-shadow-md">
                    {slide.title}
                  </h1>

                  {/* Descripción atractiva para impulsar la compra */}
                  <p className="text-white/85 text-xs sm:text-base md:text-lg mb-6 sm:mb-8 max-w-xl leading-relaxed drop-shadow">
                    {slide.description}
                  </p>
                  
                  {/* Botones de Acción (CTA) */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    <a 
                      href={slide.link}
                      className="inline-flex items-center gap-2 bg-[#C5A059] hover:bg-[#B38C45] text-black font-black px-6 sm:px-9 py-3 sm:py-4 uppercase tracking-[0.15em] text-xs sm:text-sm transition-all rounded-xl shadow-xl shadow-[#C5A059]/25 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                      target={slide.link.startsWith('http') ? "_blank" : "_self"}
                      rel={slide.link.startsWith('http') ? "noopener noreferrer" : ""}
                    >
                      <span>{slide.buttonText}</span>
                      <ArrowRight size={16} />
                    </a>

                    {slide.secondaryButtonText && (
                      <a
                        href={slide.secondaryLink}
                        className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-5 sm:px-7 py-3 sm:py-4 uppercase tracking-[0.15em] text-xs sm:text-sm transition-all rounded-xl backdrop-blur-md border border-white/20 hover:border-white/40 cursor-pointer"
                      >
                        <span>{slide.secondaryButtonText}</span>
                      </a>
                    )}
                  </div>

                </div>

                {/* Columna Derecha: Showcase de los perfumes árabes más virales y cotizados en el Slide 1 */}
                {slide.showPerfumeShowcase && (
                  <div className={`hidden lg:flex lg:col-span-5 justify-center items-center transition-all duration-1000 delay-300 ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
                    <div className="bg-black/50 backdrop-blur-md p-5 rounded-2xl border border-[#C5A059]/30 shadow-2xl max-w-md w-full">
                      <div className="text-center mb-3 pb-2 border-b border-[#C5A059]/20">
                        <span className="text-[10px] tracking-widest uppercase font-extrabold text-[#C5A059]">TOP VIRALES DEL MUNDO</span>
                        <h3 className="text-white font-bold text-sm">Disponibles en ISF Fragrance</h3>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3">
                        {featuredArabianBottles.map((perfume, pIdx) => (
                          <div 
                            key={pIdx} 
                            className="group relative bg-[#1A1A1A]/90 p-2 rounded-xl border border-white/10 hover:border-[#C5A059] transition-all flex flex-col items-center text-center shadow-lg hover:-translate-y-1"
                          >
                            <div className="relative w-16 h-20 mb-1 overflow-hidden rounded">
                              <Image 
                                src={perfume.img} 
                                alt={perfume.name}
                                fill
                                sizes="80px"
                                className="object-contain group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            <span className="text-[11px] font-bold text-white leading-tight truncate w-full">{perfume.name}</span>
                            <span className="text-[9px] text-[#C5A059] font-semibold">{perfume.house}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 pt-2 text-center">
                        <a 
                          href="#catalogo" 
                          className="text-[11px] text-white/80 hover:text-[#C5A059] font-semibold tracking-wider uppercase transition-colors inline-flex items-center gap-1"
                        >
                          Ver todos los perfumes árabes <ArrowRight size={12} />
                        </a>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        );
      })}

      {/* Indicadores del Slider (Puntos) */}
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 z-20 flex gap-2 sm:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentSlide 
                ? "bg-[#C5A059] w-7 sm:w-10 shadow-md shadow-[#C5A059]/50" 
                : "bg-white/40 hover:bg-white/70 w-2 sm:w-2.5"
            }`}
            aria-label={`Ir a la diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
