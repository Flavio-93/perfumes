"use client";
import { useState, useEffect } from "react";
import { businessData } from "@/data/businessContent";

const slides = [
  {
    id: 1,
    subtitle: "Aromas envolventes para los días de otoño",
    title: "OTOÑO",
    buttonText: "VER TODOS LOS PERFUMES",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=2000&auto=format&fit=crop",
    link: "#catalogo"
  },
  {
    id: 2,
    subtitle: "Descubre tu fragancia ideal",
    title: "¿NO SABES QUÉ ELEGIR?",
    buttonText: "HACER QUIZ",
    image: "https://images.unsplash.com/photo-1615486171448-4fc1ebfaad10?q=80&w=2000&auto=format&fit=crop",
    link: `https://wa.me/${businessData.whatsappNumber}?text=Hola,%20quiero%20hacer%20el%20quiz%20para%20encontrar%20mi%20perfume%20ideal.`
  },
  {
    id: 3,
    subtitle: "El lujo del Medio Oriente en tu piel",
    title: "EXCLUSIVIDAD",
    buttonText: "EXPLORAR COLECCIÓN",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=2000&auto=format&fit=crop",
    link: "#marcas"
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play del slider cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[46vh] min-h-[320px] sm:h-[80vh] sm:min-h-[580px] mt-[68px] sm:mt-[80px] overflow-hidden bg-brand-dark">
      {/* Contenedor de los slides */}
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] ease-linear scale-100"
            style={{ 
              backgroundImage: `url('${slide.image}')`,
              transform: index === currentSlide ? 'scale(1.05)' : 'scale(1)' 
            }}
          ></div>
          
          {/* Overlay oscuro para legibilidad (gradiente lateral y fondo) */}
          <div className="absolute inset-0 bg-black/40 bg-gradient-to-r from-black/75 via-black/45 to-transparent"></div>
          
          {/* Contenido del texto */}
          <div className="container mx-auto px-4 md:px-12 relative h-full flex flex-col justify-center items-start w-full">
            <div className={`max-w-2xl transform transition-all duration-1000 delay-300 ${index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
              <h2 className="text-brand-light/90 uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] text-[10px] sm:text-xs md:text-sm font-bold mb-1.5 sm:mb-4 ml-0.5 sm:ml-1">
                {slide.subtitle}
              </h2>
              
              <h1 className="font-heading text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-brand-light mb-3.5 sm:mb-8 leading-none tracking-tight">
                {slide.title}
              </h1>
              
              <a 
                href={slide.link}
                className="inline-block bg-[#C48B57] hover:bg-[#A67548] text-white font-bold px-5 sm:px-8 md:px-10 py-2.5 sm:py-4 uppercase tracking-[0.15em] text-[10px] sm:text-xs md:text-sm transition-colors rounded-sm"
                target={slide.link.startsWith('http') ? "_blank" : "_self"}
                rel={slide.link.startsWith('http') ? "noopener noreferrer" : ""}
              >
                {slide.buttonText}
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Indicadores del Slider (Puntos) */}
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 z-20 flex gap-2 sm:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentSlide 
                ? "bg-white w-6 sm:w-8" 
                : "bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Ir a la diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
