"use client";
import { useState, useEffect } from "react";
import { businessData } from "@/data/businessContent";
import { Sparkles, ArrowRight, ShieldCheck, Flame, MessageCircleQuestion } from "lucide-react";

const slides = [
  {
    id: 1,
    tag: "TENDENCIA VIRAL 2026",
    tagIcon: Flame,
    subtitle: "Lujo Árabe 100% Original de Dubái",
    title: "PERFUMES ÁRABES EXCLUSIVOS",
    description: "Estela bestial, fijación de más de 12 horas y fragancias que roban miradas en todo momento.",
    buttonText: "EXPLORAR CATÁLOGO",
    secondaryButtonText: "VER NOVEDADES",
    secondaryLink: "#catalogo",
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=2000&auto=format&fit=crop",
    link: "#catalogo"
  },
  {
    id: 2,
    tag: "ASESORÍA PERSONALIZADA",
    tagIcon: MessageCircleQuestion,
    subtitle: "¿No sabes qué aroma va mejor contigo?",
    title: "¿CUÁL ES TU PERFUME IDEAL?",
    description: "Escríbenos por WhatsApp y te recomendamos la fragancia perfecta según tu estilo, ocasión o clima.",
    buttonText: "ASESORARME POR WHATSAPP",
    secondaryButtonText: "VER MARCAS",
    secondaryLink: "#marcas",
    image: "https://images.unsplash.com/photo-1615486171448-4fc1ebfaad10?q=80&w=2000&auto=format&fit=crop",
    link: `https://wa.me/${businessData.whatsappNumber}?text=Hola,%20deseo%20asesor%C3%ADa%20para%20elegir%20mi%20perfume%20%C3%A1rabe%20ideal.`
  },
  {
    id: 3,
    tag: "ENVÍOS SEGUROS A TODO EL PERÚ",
    tagIcon: ShieldCheck,
    subtitle: "Garantía de Originalidad y Entrega Rápida",
    title: "FRASCOS SELLADOS DE DUBÁI",
    description: "Lattafa, Afnan, Armaf, Rasasi, French Avenue y Al Haramain con despacho express en 24 a 48h.",
    buttonText: "VER COLECCIÓN SELLADA",
    secondaryButtonText: "PEDIR AHORA",
    secondaryLink: "#catalogo",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=2000&auto=format&fit=crop",
    link: "#catalogo"
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play del slider cada 6 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[65vh] min-h-[460px] sm:h-[80vh] sm:min-h-[580px] mt-[68px] sm:mt-[80px] overflow-hidden bg-[#0A0A0A]">
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
            
            {/* Overlay multicapa para contraste y legibilidad impecable en texto blanco */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/35"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
            
            {/* Contenido del banner */}
            <div className="container mx-auto px-4 md:px-12 relative h-full flex flex-col justify-center items-start w-full">
              <div className={`max-w-3xl transform transition-all duration-1000 delay-200 ${isActive ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
                
                {/* Badge llamativo superior */}
                <div className="inline-flex items-center gap-2 bg-[#C5A059] text-black font-extrabold px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[9px] sm:text-[11px] uppercase tracking-widest mb-3 sm:mb-4 shadow-lg shadow-[#C5A059]/20">
                  <TagIcon size={13} className="text-black" />
                  <span>{slide.tag}</span>
                </div>

                {/* Subtítulo */}
                <h2 className="text-[#C5A059] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[11px] sm:text-xs md:text-sm font-bold mb-2 sm:mb-3">
                  {slide.subtitle}
                </h2>
                
                {/* Título Principal */}
                <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-3 sm:mb-4 leading-[1.05] tracking-tight drop-shadow-md">
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
