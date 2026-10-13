"use client";
import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Plus, Minus, ArrowRight, Sparkles } from "lucide-react";

export interface PerfumeItem {
  id: string;
  name: string;
  brand: string;
  price: string;
  image: string;
  gallery?: string[];
  tag?: string;
  description?: string;
}

interface PerfumeCardProps {
  perfume: PerfumeItem;
}

export default function PerfumeCard({ perfume }: PerfumeCardProps) {
  const { addToCart, updateQuantity, getItemQuantity } = useCart();

  // Full bottle quantity in cart
  const quantity = getItemQuantity(perfume.id, "frasco");

  const handleAdd = () => {
    addToCart(
      {
        id: perfume.id,
        name: perfume.name,
        brand: perfume.brand,
        image: perfume.image,
        price: perfume.price,
      },
      "frasco"
    );
  };

  const handleIncrease = () => {
    updateQuantity(perfume.id, "frasco", 1);
  };

  const handleDecrease = () => {
    updateQuantity(perfume.id, "frasco", -1);
  };

  return (
    <div className="bg-brand-surface rounded-lg overflow-hidden flex flex-col group border border-white/10 hover:border-brand-gold/50 transition-all duration-300 relative hover:shadow-xl hover:shadow-brand-gold/5">
      {/* Badge Top Left */}
      {perfume.tag && (
        <div
          className={`absolute top-2 left-2 sm:top-3 sm:left-3 text-[8px] sm:text-[9px] font-extrabold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded shadow-md z-10 tracking-wider uppercase flex items-center gap-1 ${
            perfume.tag === "NOVEDAD" ? "bg-[#C48B57] text-white" : "bg-brand-gold text-brand-dark"
          }`}
        >
          <Sparkles size={9} className="sm:w-[10px] sm:h-[10px]" />
          <span>{perfume.tag}</span>
        </div>
      )}

      {/* Frasco Completo Badge Top Right */}
      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-brand-dark/80 backdrop-blur-sm text-brand-light text-[7px] sm:text-[8px] font-bold px-1.5 sm:px-2 py-0.5 rounded border border-white/10 z-10 tracking-widest uppercase">
        100 ML
      </div>

      {/* Image Area with hover transition */}
      <Link href={`/producto/${perfume.id}`} className="block aspect-square overflow-hidden bg-white relative p-2.5 sm:p-4 cursor-pointer">
        <div className="w-full h-full relative flex items-center justify-center">
          <img
            src={perfume.image}
            alt={perfume.name}
            className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 ${
              perfume.gallery && perfume.gallery.length > 1 ? "group-hover:opacity-0" : "group-hover:scale-105"
            }`}
          />
          {perfume.gallery && perfume.gallery.length > 1 && (
            <img
              src={perfume.gallery[1]}
              alt={`${perfume.name} detalle`}
              className="absolute inset-0 w-full h-full object-contain transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-105"
            />
          )}
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-2.5 sm:p-4 flex flex-col flex-1 text-center bg-brand-surface">
        {/* Brand */}
        <p className="text-[8px] sm:text-[10px] text-brand-light/60 tracking-widest uppercase mb-0.5 sm:mb-1 font-bold truncate">
          {perfume.brand}
        </p>

        {/* Perfume Name */}
        <Link href={`/producto/${perfume.id}`} className="block">
          <h3 className="text-xs sm:text-sm font-bold text-brand-light uppercase tracking-wide leading-tight sm:leading-snug mb-1.5 sm:mb-3 h-8 sm:h-10 flex items-center justify-center overflow-hidden hover:text-brand-gold transition-colors line-clamp-2">
            {perfume.name}
          </h3>
        </Link>

        {/* Presentation info */}
        <div className="mb-1.5 sm:mb-3">
          <div className="py-1 sm:py-1.5 px-1.5 sm:px-3 bg-brand-dark rounded border border-white/10 flex items-center justify-center">
            <span className="text-[9px] sm:text-[11px] font-extrabold uppercase tracking-wider text-brand-gold truncate">
              Frasco 100 ML
            </span>
          </div>
        </div>

        {/* Price Display */}
        <div className="bg-brand-dark/60 rounded py-1.5 sm:py-2 px-2 sm:px-3 mb-2 sm:mb-3 border border-white/5 flex items-center justify-between mt-auto">
          <span className="text-[8px] sm:text-[10px] text-brand-light/60 uppercase font-semibold">
            Precio
          </span>
          <span className="text-xs sm:text-sm font-black text-brand-gold">{perfume.price}</span>
        </div>

        {/* Action Button: Add to Cart OR Quantity Controls */}
        <div className="mt-0.5 sm:mt-1">
          {quantity === 0 ? (
            <button
              type="button"
              onClick={handleAdd}
              className="w-full bg-brand-dark hover:bg-brand-gold hover:text-brand-dark border border-brand-gold/40 hover:border-brand-gold text-brand-light font-bold text-[10px] sm:text-xs uppercase tracking-normal sm:tracking-widest py-2 sm:py-3 px-1 sm:px-3 rounded transition-all flex items-center justify-center gap-1 sm:gap-2 group/btn shadow-md active:scale-[0.98] cursor-pointer"
            >
              <Plus size={13} className="text-brand-gold group-hover/btn:text-brand-dark flex-shrink-0" />
              <span className="truncate">Agregar al carrito</span>
            </button>
          ) : (
            <div className="flex items-center justify-between bg-brand-dark border sm:border-2 border-brand-gold rounded p-0.5 sm:p-1 shadow-md">
              <button
                type="button"
                onClick={handleDecrease}
                className="w-7 h-7 sm:w-9 sm:h-9 bg-white/5 hover:bg-brand-gold hover:text-brand-dark rounded text-brand-light flex items-center justify-center transition-colors active:scale-95 cursor-pointer flex-shrink-0"
                title="Restar 1"
              >
                <Minus size={12} />
              </button>

              <div className="flex flex-col items-center">
                <span className="text-xs sm:text-sm font-black text-brand-gold leading-none">{quantity}</span>
                <span className="text-[7px] sm:text-[8px] text-brand-light/50 uppercase tracking-widest mt-0.5">
                  en carrito
                </span>
              </div>

              <button
                type="button"
                onClick={handleIncrease}
                className="w-7 h-7 sm:w-9 sm:h-9 bg-brand-gold hover:bg-[#b07b48] text-brand-dark rounded flex items-center justify-center transition-colors active:scale-95 font-black cursor-pointer flex-shrink-0"
                title="Sumar 1"
              >
                <Plus size={12} strokeWidth={3} />
              </button>
            </div>
          )}
        </div>

        {/* Link to view product page */}
        <div className="mt-1.5 sm:mt-2 text-right">
          <Link
            href={`/producto/${perfume.id}`}
            className="text-[9px] sm:text-[10px] text-brand-light/40 hover:text-brand-gold inline-flex items-center gap-1 transition-colors"
          >
            <span>Detalles</span>
            <ArrowRight size={9} className="sm:w-[10px] sm:h-[10px]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
