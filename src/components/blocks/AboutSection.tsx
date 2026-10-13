import { businessData } from "@/data/businessContent";

export default function AboutSection() {
  return (
    <section id="nosotros" className="py-24 bg-brand-surface relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent"></div>
      
      <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-brand-gold mb-8">Nuestra Historia de Autoridad</h2>
        <p className="text-brand-light/80 text-lg md:text-xl leading-relaxed mb-16 font-light">
          En {businessData.name}, nacimos de una pasión inquebrantable por las joyas olfativas del Medio Oriente. 
          Entendimos el miedo constante a las falsificaciones en el mercado y decidimos crear un santuario de confianza 
          donde la autenticidad es innegociable y el lujo es accesible.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-y border-brand-gold/20 py-12">
          <div className="hover:scale-105 transition-transform">
            <p className="text-5xl font-heading font-bold text-brand-gold mb-2">+500</p>
            <p className="text-brand-light/70 uppercase tracking-widest text-xs font-bold">Clientes Felices</p>
          </div>
          <div className="hover:scale-105 transition-transform">
            <p className="text-5xl font-heading font-bold text-brand-gold mb-2">100%</p>
            <p className="text-brand-light/70 uppercase tracking-widest text-xs font-bold">Originalidad Garantizada</p>
          </div>
          <div className="hover:scale-105 transition-transform">
            <p className="text-5xl font-heading font-bold text-brand-gold mb-2">24/7</p>
            <p className="text-brand-light/70 uppercase tracking-widest text-xs font-bold">Asesoría Olfativa</p>
          </div>
        </div>
      </div>
    </section>
  );
}
