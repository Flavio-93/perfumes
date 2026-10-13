import { businessData } from "@/data/businessContent";
import { Star } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-brand-dark">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-brand-gold mb-4">Lo Que Dicen Nuestros Clientes</h2>
          <p className="text-brand-light/80 max-w-2xl mx-auto">Reseñas reales de personas que ya disfrutan de la exclusividad árabe.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {businessData.testimonials.map((testimonio) => (
            <div key={testimonio.id} className="glass p-8 rounded-2xl relative border-t-[3px] border-t-brand-gold/50 hover:-translate-y-2 transition-transform duration-300">
              <div className="flex text-brand-gold mb-6">
                {[...Array(testimonio.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-brand-gold" />
                ))}
              </div>
              <p className="text-brand-light/80 mb-8 italic leading-relaxed">"{testimonio.text}"</p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-brand-surface border border-brand-gold flex items-center justify-center text-brand-gold font-bold">
                  {testimonio.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-brand-light">{testimonio.name}</p>
                  <p className="text-xs text-brand-gold">Cliente Verificado</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
