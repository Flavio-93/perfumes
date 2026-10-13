import { businessData } from "@/data/businessContent";
import { CheckCircle2 } from "lucide-react";

export default function BenefitsSection() {
  return (
    <section id="beneficios" className="py-24 bg-brand-dark">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-brand-gold mb-6">Por qué elegirnos</h2>
            <p className="text-brand-light/80 text-lg mb-10 leading-relaxed">
              No solo vendemos perfumes, entregamos seguridad, autenticidad y una experiencia de lujo en cada frasco, respaldada por la confianza de nuestros clientes.
            </p>
            <div className="space-y-8">
              {businessData.benefits.map((benefit, idx) => (
                <div key={idx} className="flex gap-4 items-start group">
                  <CheckCircle2 className="text-brand-gold shrink-0 mt-1 group-hover:scale-110 transition-transform" size={28} />
                  <div>
                    <h4 className="font-bold text-xl mb-1 text-brand-light">{benefit.title}</h4>
                    <p className="text-brand-light/60">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden glass border-brand-gold/20 flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center shadow-2xl">
             <div className="absolute inset-0 bg-brand-dark/70 backdrop-blur-[2px]"></div>
             <div className="relative z-10 text-center p-8 max-w-sm glass rounded-xl border border-brand-gold/30 shadow-[0_0_40px_rgba(212,175,55,0.15)]">
               <h3 className="font-heading text-4xl text-brand-gold mb-3 leading-tight">Garantía Absoluta</h3>
               <p className="text-brand-light/90">Calidad e importación directa sin intermediarios, para tu total tranquilidad.</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
