"use client";
import { perfumes } from "@/data/perfumes";
import { muestras } from "@/data/muestras";
import Navbar from "@/components/blocks/Navbar";
import Footer from "@/components/blocks/Footer";
import WhatsAppFloating from "@/components/blocks/WhatsAppFloating";
import { useState } from "react";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { useCart, ProductFormat } from "@/context/CartContext";

export default function ProductDetail({ id }: { id: string }) {
  const router = useRouter();
  const perfume = perfumes.find((p) => p.id === id);
  const sample = muestras.find((m) => m.perfumeId === perfume?.id || m.name.toLowerCase() === perfume?.name.toLowerCase());
  const [selectedImage, setSelectedImage] = useState(perfume?.image || "");
  const [selectedSize, setSelectedSize] = useState<"completo" | "muestra">("completo");
  const { addToCart, updateQuantity, getItemQuantity } = useCart();

  const currentFormat: ProductFormat = selectedSize === "completo" ? "frasco" : "3ml";
  const quantity = perfume ? getItemQuantity(perfume.id, currentFormat) : 0;

  const handleAddToCart = () => {
    if (!perfume) return;
    addToCart(
      {
        id: perfume.id,
        name: perfume.name,
        brand: perfume.brand,
        image: selectedSize === "completo" ? perfume.image : (sample?.image || perfume.image),
        price: selectedSize === "completo" ? perfume.price : "S/. 15.00",
      },
      currentFormat
    );
  };

  const handleIncrease = () => {
    if (!perfume) return;
    updateQuantity(perfume.id, currentFormat, 1);
  };

  const handleDecrease = () => {
    if (!perfume) return;
    updateQuantity(perfume.id, currentFormat, -1);
  };

  const handleGoBack = () => {
    document.documentElement.style.scrollBehavior = 'auto';
    router.back();
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = '';
    }, 100);
  };

  if (!perfume) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-brand-dark selection:bg-brand-gold/30 selection:text-brand-gold pt-28">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-[1200px]">
        
        {/* Breadcrumb / Regresar */}
        <div className="sticky top-28 z-40 bg-brand-dark/95 backdrop-blur-md py-2 mb-4 -mx-4 px-4 sm:mx-0 sm:px-0 border-b border-white/5 sm:border-none">
          <button onClick={handleGoBack} className="inline-flex items-center text-brand-light/80 hover:text-brand-gold text-[10px] font-bold uppercase tracking-widest transition-colors">
            <ArrowLeft size={12} className="mr-2" />
            Volver al catálogo
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          
          {/* Lado Izquierdo: Galería de Imágenes (60%) */}
          <div className="md:w-3/5 flex flex-col-reverse md:flex-row gap-4 lg:gap-8">
            
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto md:w-20 md:max-h-[700px] snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {perfume.gallery?.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setSelectedImage(img)}
                  className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-white rounded transition-all snap-center flex items-center justify-center overflow-hidden
                    ${selectedImage === img ? 'opacity-100 ring-1 ring-brand-gold scale-105' : 'opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt={`Thumbnail ${i}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
            
            {/* Imagen Principal */}
            <div className="flex-1 bg-white rounded-2xl aspect-square md:aspect-auto md:h-[450px] lg:h-[550px] flex items-center justify-center p-4 lg:p-8 relative overflow-hidden">
              {perfume.tag && (
                <span className={`absolute top-6 left-6 text-white text-[10px] font-bold px-4 py-1.5 rounded-full z-10 tracking-widest shadow-md ${perfume.tag === 'NOVEDAD' ? 'bg-[#C48B57]' : 'bg-[#1e7e34]'}`}>
                  {perfume.tag}
                </span>
              )}
              {/* Icono Corazón (Favoritos) */}
              <button className="absolute top-6 right-6 text-gray-400 hover:text-black z-10 p-2 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>

              <img 
                src={selectedImage} 
                alt={perfume.name} 
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </div>
          </div>

          {/* Lado Derecho: Detalles del Producto (40%) */}
          <div className="md:w-2/5 flex flex-col pt-4 lg:pt-8">
            <div className="mb-2 flex gap-2">
              <span className="text-brand-light/60 text-xs uppercase tracking-widest">INICIO</span>
              <span className="text-brand-light/60 text-xs">/</span>
              <span className="text-brand-light/60 text-xs uppercase tracking-widest">{perfume.notes[1]}</span>
              <span className="text-brand-light/60 text-xs">/</span>
              <span className="text-brand-light/60 text-xs uppercase tracking-widest">{perfume.brand}</span>
            </div>
            
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-brand-light uppercase tracking-tight leading-none mb-4">
              {perfume.name} {perfume.brand} {perfume.type}
            </h1>
            
            <div className="flex gap-2 mb-6">
              {perfume.notes.map((note, i) => (
                <span key={i} className="text-[10px] border border-white/20 text-brand-light/70 px-3 py-1 rounded-full uppercase tracking-wider">
                  {note}
                </span>
              ))}
            </div>
            
            {/* Estrellas simuladas */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-brand-gold">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                ))}
              </div>
              <span className="text-brand-light/60 text-xs">(8)</span>
            </div>
            
            <p className="text-2xl font-bold text-brand-light mb-8 flex items-end gap-2">
              {perfume.price}
              <span className="text-[10px] text-brand-light/50 font-normal uppercase tracking-widest mb-1">IVA incluido</span>
            </p>
            
            {/* Selector de Tamaño */}
            <div className="mb-8">
              <p className="text-sm text-brand-light mb-3">Tamaño:</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => {
                    setSelectedSize("completo");
                    setSelectedImage(perfume.image);
                  }}
                  className={`flex flex-col items-start p-4 border rounded relative transition-colors flex-1
                    ${selectedSize === "completo" ? "border-brand-light bg-white/5" : "border-white/20 hover:border-white/50"}
                  `}
                >
                  {selectedSize === "completo" && (
                    <span className="absolute -top-2.5 right-4 bg-brand-light text-brand-dark text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wider">SELECCIONADO</span>
                  )}
                  <span className="font-bold text-sm uppercase">100ML</span>
                  <span className="text-xs text-brand-light/60">Frasco completo</span>
                  <span className="font-bold text-sm mt-1">{perfume.price}</span>
                </button>
                
                <button 
                  onClick={() => {
                    setSelectedSize("muestra");
                    if (sample?.image) {
                      setSelectedImage(sample.image);
                    }
                  }}
                  className={`flex flex-col items-start p-4 border rounded relative transition-colors flex-1
                    ${selectedSize === "muestra" ? "border-brand-light bg-white/5" : "border-white/20 hover:border-white/50"}
                  `}
                >
                  {selectedSize === "muestra" && (
                    <span className="absolute -top-2.5 right-4 bg-[#C48B57] text-white text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wider">SELECCIONADO</span>
                  )}
                  <span className="font-bold text-sm uppercase">3ML (Muestra)</span>
                  <span className="text-xs text-[#C48B57]">Foto Muestra</span>
                  <span className="font-bold text-sm mt-1">S/. 15.00</span>
                </button>
              </div>
            </div>

            {/* Botón Añadir al Carrito / Contador */}
            <div className="mb-8">
              {quantity === 0 ? (
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-brand-gold hover:bg-[#b07b48] text-brand-dark text-sm font-black uppercase tracking-[0.2em] py-4 rounded transition-all shadow-lg hover:shadow-brand-gold/20 flex items-center justify-center gap-3 cursor-pointer active:scale-[0.99]"
                >
                  <Plus size={18} strokeWidth={2.5} />
                  <span>Añadir al carrito</span>
                </button>
              ) : (
                <div className="flex items-center justify-between bg-brand-dark border-2 border-brand-gold rounded-lg p-2 shadow-xl">
                  <button
                    type="button"
                    onClick={handleDecrease}
                    className="w-12 h-12 bg-white/5 hover:bg-brand-gold hover:text-brand-dark rounded-md text-brand-light flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
                    title="Restar 1"
                  >
                    <Minus size={18} />
                  </button>

                  <div className="flex flex-col items-center">
                    <span className="text-xl font-black text-brand-gold leading-none">{quantity}</span>
                    <span className="text-[10px] text-brand-light/60 uppercase tracking-widest mt-1">
                      en tu carrito
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleIncrease}
                    className="w-12 h-12 bg-brand-gold hover:bg-[#b07b48] text-brand-dark rounded-md flex items-center justify-center transition-colors active:scale-95 font-black cursor-pointer"
                    title="Sumar 1"
                  >
                    <Plus size={18} strokeWidth={3} />
                  </button>
                </div>
              )}
            </div>
            
            <div className="prose prose-invert prose-sm max-w-none text-brand-light/80 border-t border-white/10 pt-6">
              <p>{perfume.description}</p>
            </div>
            
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppFloating />
    </main>
  );
}
