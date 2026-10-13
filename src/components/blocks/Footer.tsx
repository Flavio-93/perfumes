"use client";
import { businessData } from "@/data/businessContent";

export default function Footer() {
  return (
    <footer className="bg-brand-dark py-16 border-t border-brand-gold/20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div className="flex flex-col items-start">
            <div className="flex flex-col items-start justify-center mb-6">
              <span className="font-heading text-4xl text-brand-gold tracking-widest leading-none font-bold drop-shadow-sm">ISF</span>
              <span className="text-[10px] text-[#2C2C2C] tracking-[0.3em] uppercase mt-1.5 font-bold">Fragrance Oud & Beauty</span>
            </div>
            <p className="text-[#2C2C2C]/80 text-sm leading-relaxed max-w-sm">
              Somos especialistas en perfumería árabe exclusiva. Garantizamos autenticidad y excelencia en cada entrega y asesoría personalizada.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-brand-light mb-4">Navegación</h4>
            <ul className="space-y-2 text-sm text-brand-light/60">
              <li><a href="#servicios" className="hover:text-brand-gold transition-colors">Servicios Estrella</a></li>
              <li><a href="#beneficios" className="hover:text-brand-gold transition-colors">Por Qué Elegirnos</a></li>
              <li><a href="#nosotros" className="hover:text-brand-gold transition-colors">Nuestra Historia</a></li>
              <li><a href="#faqs" className="hover:text-brand-gold transition-colors">Preguntas Frecuentes</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-brand-light mb-4">Contacto Directo</h4>
            <ul className="space-y-3 text-sm text-brand-light/60">
              <li className="flex items-center gap-2">
                 <span className="text-brand-gold">WhatsApp:</span> 
                 <a href={`https://wa.me/${businessData.whatsappNumber}`} className="hover:text-brand-light transition-colors">
                   +51 {businessData.whatsappNumber}
                 </a>
              </li>
              <li className="flex items-center gap-2">
                 <span className="text-brand-gold">Email:</span> 
                 <a href={`mailto:${businessData.email}`} className="hover:text-brand-light transition-colors">
                   {businessData.email}
                 </a>
              </li>
              <li className="flex items-center gap-2 text-green-400">
                 <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                 Atención Online 24/7
              </li>
            </ul>
          </div>
          
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-light/40">
          <p>&copy; 2026 {businessData.name}. Todos los derechos reservados.</p>
          <p>Diseñado con exclusividad para amantes del lujo.</p>
        </div>
      </div>
    </footer>
  );
}
