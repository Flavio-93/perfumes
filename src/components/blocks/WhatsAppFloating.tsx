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
        {/* Ícono oficial de WhatsApp */}
        <svg 
          viewBox="0 0 24 24" 
          width="32" 
          height="32" 
          stroke="currentColor" 
          strokeWidth="0" 
          fill="currentColor"
          className="w-7 h-7 sm:w-8 sm:h-8 fill-white"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.35C9.32 7.35 8.97 7.43 8.69 7.74C8.4 8.05 7.6 8.81 7.6 10.35C7.6 11.89 8.72 13.38 8.88 13.6C9.04 13.81 11.08 16.96 14.2 18.31C14.94 18.63 15.52 18.82 15.97 18.96C16.71 19.2 17.38 19.16 17.91 19.08C18.5 19 19.72 18.34 19.98 17.62C20.24 16.9 20.24 16.28 20.16 16.16C20.08 16.03 19.87 15.96 19.55 15.8C19.24 15.65 17.7 14.89 17.41 14.78C17.13 14.68 16.92 14.63 16.72 14.94C16.51 15.25 15.92 15.96 15.74 16.16C15.56 16.37 15.38 16.39 15.07 16.24C14.76 16.08 13.76 15.75 12.58 14.7C11.66 13.88 11.04 12.87 10.86 12.56C10.68 12.25 10.84 12.09 11 11.93C11.14 11.79 11.31 11.57 11.47 11.39C11.63 11.21 11.68 11.08 11.78 10.87C11.89 10.67 11.84 10.49 11.76 10.33C11.68 10.18 11.07 8.68 10.81 8.07C10.56 7.47 10.31 7.55 10.12 7.54C9.94 7.54 9.73 7.35 9.53 7.35Z" />
        </svg>
      </div>
    </a>
  );
}
