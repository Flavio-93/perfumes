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
      
      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] hover:bg-[#20bd5a] rounded-full flex items-center justify-center text-white shadow-[0_4px_25px_rgba(37,211,102,0.55)] hover:scale-110 active:scale-95 transition-all">
        {/* Ícono oficial de WhatsApp con teléfono sólido relleno */}
        <svg 
          viewBox="0 0 32 32" 
          className="w-8 h-8 sm:w-9 sm:h-9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            fillRule="evenodd" 
            clipRule="evenodd" 
            d="M16 3C8.82 3 3 8.82 3 16C3 18.57 3.75 20.98 5.06 23.01L3.38 28.62L9.2 27.02C11.18 28.26 13.51 29 16 29C23.18 29 29 23.18 29 16C29 8.82 23.18 3 16 3ZM22.5 19.82C22.23 19.69 20.91 19.04 20.67 18.95C20.43 18.86 20.25 18.82 20.08 19.08C19.9 19.35 19.39 19.96 19.23 20.14C19.08 20.31 18.92 20.33 18.66 20.2C18.4 20.07 17.54 19.79 16.53 18.89C15.74 18.19 15.21 17.32 15.05 17.06C14.9 16.79 15.03 16.66 15.17 16.52C15.29 16.4 15.43 16.21 15.57 16.05C15.7 15.89 15.75 15.78 15.84 15.61C15.93 15.43 15.88 15.28 15.82 15.15C15.75 15.02 15.23 13.73 15 13.21C14.79 12.69 14.57 12.76 14.41 12.75C14.26 12.75 14.08 12.75 13.9 12.75C13.73 12.75 13.43 12.82 13.19 13.08C12.95 13.35 12.27 13.99 12.27 15.31C12.27 16.63 13.23 17.9 13.36 18.08C13.5 18.26 15.24 20.94 17.91 22.09C18.55 22.37 19.04 22.53 19.43 22.65C20.07 22.85 20.65 22.82 21.11 22.75C21.62 22.68 22.68 22.11 22.9 21.49C23.12 20.87 23.12 20.35 23.05 20.24C22.99 20.13 22.77 20.05 22.5 19.82Z" 
            fill="white"
          />
        </svg>
      </div>
    </a>
  );
}
