import { businessData } from "@/data/businessContent";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFloating() {
  const waUrl = `https://wa.me/${businessData.whatsappNumber}?text=${encodeURIComponent(businessData.whatsappDefaultMessage)}`;
  
  return (
    <a 
      href={waUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center group"
      aria-label="Chat con nosotros en WhatsApp"
    >
      <div className="mr-4 px-4 py-2 bg-brand-surface border border-brand-gold/30 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block">
        <p className="text-sm font-medium text-brand-light whitespace-nowrap flex items-center">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
          Asesoría en línea
        </p>
      </div>
      
      <div className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center text-brand-dark shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:scale-110 transition-transform animate-pulse-gold relative">
        <MessageCircle size={32} />
      </div>
    </a>
  );
}
