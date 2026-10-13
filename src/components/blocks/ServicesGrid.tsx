import { businessData } from "@/data/businessContent";
import { Crown, Droplet, MessageCircle } from "lucide-react";

const icons = {
  Crown: <Crown size={32} className="text-brand-gold mb-4" />,
  Droplet: <Droplet size={32} className="text-brand-gold mb-4" />,
  MessageCircle: <MessageCircle size={32} className="text-brand-gold mb-4" />
};

export default function ServicesGrid() {
  return (
    <section id="servicios" className="py-24 bg-brand-surface">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-brand-gold mb-4">Nuestros Servicios Estrella</h2>
          <p className="text-brand-light/80 max-w-2xl mx-auto">Experiencias olfativas diseñadas para resaltar tu exclusividad.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {businessData.services.map((service, index) => (
            <div key={index} className="glass p-8 rounded-2xl hover-lift flex flex-col h-full border border-brand-gold/10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                {icons[service.icon as keyof typeof icons]}
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-brand-light/70 mb-8">{service.description}</p>
              </div>
              <a 
                href={`https://wa.me/${businessData.whatsappNumber}?text=Hola,%20me%20interesa%20saber%20más%20sobre%20${encodeURIComponent(service.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-gold font-semibold flex items-center gap-2 hover:text-yellow-400 transition-colors mt-auto relative z-10 w-fit"
              >
                Cotizar por WhatsApp →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
