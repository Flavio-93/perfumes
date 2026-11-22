import { businessData } from "@/data/businessContent";

export default function WhatsAppFloating() {
  const waUrl = `https://wa.me/${businessData.whatsappNumber}?text=${encodeURIComponent(businessData.whatsappDefaultMessage)}`;
  
  return (
    <a 
      href={waUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center group cursor-pointer"
      aria-label="Chat con nosotros en WhatsApp"
    >
      <div className="mr-3 px-3.5 py-2 bg-[#1A1A1A] border border-[#25D366]/40 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none hidden md:block">
        <p className="text-xs font-bold text-white whitespace-nowrap flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-[#25D366] rounded-full animate-ping"></span>
          ¡Escríbenos a WhatsApp!
        </p>
      </div>
      
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-[0_4px_25px_rgba(37,211,102,0.55)] hover:scale-110 active:scale-95 transition-all overflow-hidden">
        {/* Ícono oficial exacto de WhatsApp con círculo verde, anillo de bocadillo y teléfono blanco */}
        <svg 
          viewBox="0 0 175.216 175.552" 
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Círculo verde de fondo */}
          <circle cx="87.6" cy="87.8" r="87.6" fill="#25D366" />
          
          {/* Contorno del globo de diálogo en blanco */}
          <path 
            fill="#FFFFFF" 
            d="M87.6 27.5c-33.3 0-60.3 27-60.3 60.3 0 10.6 2.8 21 8.1 30.2L27 148.6l31.8-8.3c8.8 4.8 18.8 7.4 28.9 7.4h0c33.3 0 60.3-27 60.3-60.3-.1-33.2-27.1-60-60.4-59.9zm0 109.8c-9 0-17.8-2.4-25.5-7l-1.8-1.1-18.9 5 5.1-18.4-1.2-1.9c-5-8-7.7-17.3-7.7-26.9 0-27.9 22.7-50.6 50.7-50.6 13.5 0 26.2 5.3 35.8 14.8s14.8 22.3 14.8 35.8c-.1 28-22.8 50.3-51.3 50.3z"
          />

          {/* Teléfono blanco en el centro */}
          <path 
            fill="#FFFFFF" 
            d="M123.6 102.8c-1.5-.7-8.9-4.4-10.2-4.9-1.4-.5-2.4-.7-3.4.7-1 1.5-3.9 4.9-4.8 5.9-.9 1-1.8 1.1-3.3.4-1.5-.7-6.3-2.3-12-7.4-4.4-3.9-7.4-8.8-8.3-10.3-.9-1.5-.1-2.3.6-3.1.7-.7 1.5-1.8 2.2-2.6.7-.9 1-1.5 1.5-2.5.5-1 .2-1.9-.1-2.6-.4-.7-3.4-8.1-4.6-11.2-1.2-2.9-2.5-2.5-3.4-2.5h-2.9c-1 0-2.6.4-4 1.9-1.4 1.5-5.3 5.2-5.3 12.7s5.5 14.7 6.2 15.7c.8 1 10.7 16.4 26 23 3.6 1.6 6.5 2.5 8.7 3.2 3.7 1.2 7 1 9.6.6 2.9-.4 8.9-3.6 10.1-7.1 1.2-3.5 1.2-6.5.9-7.1-.4-.6-1.5-.9-3-.7z"
          />
        </svg>
      </div>
    </a>
  );
}
