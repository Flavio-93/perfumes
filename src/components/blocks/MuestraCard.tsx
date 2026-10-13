"use client";
import React, { useState } from "react";
import Link from "next/link";
import { MuestraItem } from "@/data/muestras";
import { useCart, SampleSize } from "@/context/CartContext";
import { Plus, Minus, Check, ArrowRight, Droplets } from "lucide-react";

interface MuestraCardProps {
  muestra: MuestraItem;
}

export default function MuestraCard({ muestra }: MuestraCardProps) {
  const [selectedSize, setSelectedSize] = useState<SampleSize>("3ml");
  const { addToCart, updateQuantity, getItemQuantity } = useCart();

  // Current quantity for this item with the currently selected size
  const quantity = getItemQuantity(muestra.id, selectedSize);

  // Price calculation
  const price = selectedSize === "3ml" ? "S/. 15.00" : "S/. 22.00";

  const handleAdd = () => {
    addToCart(
      {
        id: muestra.id,
        name: muestra.name,
        brand: muestra.brand,
        image: muestra.image,
      },
      selectedSize
    );
  };

  const handleIncrease = () => {
    updateQuantity(muestra.id, selectedSize, 1);
  };

  const handleDecrease = () => {
    updateQuantity(muestra.id, selectedSize, -1);
  };

  return (
    <div className="bg-brand-surface rounded-lg overflow-hidden flex flex-col group border border-white/10 hover:border-brand-gold/50 transition-all duration-300 relative hover:shadow-xl hover:shadow-brand-gold/5">
      {/* Badge Muestra */}
      <div className="absolute top-3 left-3 bg-[#C48B57] text-white text-[9px] font-extrabold px-2.5 py-1 rounded shadow-md z-10 tracking-wider uppercase flex items-center gap-1">
        <Droplets size={10} />
        <span>MUESTRA</span>
      </div>

      {muestra.badge && (
        <div className="absolute top-3 right-3 bg-brand-dark/80 backdrop-blur-sm text-brand-light text-[8px] font-bold px-2 py-0.5 rounded border border-white/10 z-10 tracking-widest uppercase">
          {muestra.badge}
        </div>
      )}

      {/* Image Area with sample vial and bottle */}
      <div className="block aspect-square overflow-hidden bg-white relative p-4 cursor-pointer">
        <div className="w-full h-full relative flex items-center justify-center">
          <img
            src={muestra.image}
            alt={muestra.name}
            className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 ${
              muestra.gallery && muestra.gallery.length > 1 ? "group-hover:opacity-0" : "group-hover:scale-105"
            }`}
          />
          {muestra.gallery && muestra.gallery.length > 1 && (
            <img
              src={muestra.gallery[1]}
              alt={`${muestra.name} detalle`}
              className="absolute inset-0 w-full h-full object-contain transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-105"
            />
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-1 text-center bg-brand-surface">
        {/* Brand */}
        <p className="text-[10px] text-brand-light/60 tracking-widest uppercase mb-1 font-bold">
          {muestra.brand}
        </p>

        {/* Perfume Name ONLY (no "Muestra 3ml -") */}
        <h3 className="text-sm font-bold text-brand-light uppercase tracking-wide leading-snug mb-3 h-10 flex items-center justify-center overflow-hidden group-hover:text-brand-gold transition-colors">
          {muestra.name}
        </h3>

        {/* Size Selector: 3 ML vs 5 ML */}
        <div className="mb-3">
          <p className="text-[10px] text-brand-light/50 uppercase tracking-widest mb-1.5 font-semibold">
            Selecciona el tamaño:
          </p>
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-brand-dark rounded-md border border-white/10">
            <button
              type="button"
              onClick={() => setSelectedSize("3ml")}
              className={`py-1.5 px-2 rounded text-[11px] font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-1 ${
                selectedSize === "3ml"
                  ? "bg-brand-gold text-brand-dark shadow-sm"
                  : "text-brand-light/60 hover:text-white"
              }`}
            >
              <span>3 ML</span>
              {selectedSize === "3ml" && <Check size={11} strokeWidth={3} />}
            </button>
            <button
              type="button"
              onClick={() => setSelectedSize("5ml")}
              className={`py-1.5 px-2 rounded text-[11px] font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-1 ${
                selectedSize === "5ml"
                  ? "bg-brand-gold text-brand-dark shadow-sm"
                  : "text-brand-light/60 hover:text-white"
              }`}
            >
              <span>5 ML</span>
              {selectedSize === "5ml" && <Check size={11} strokeWidth={3} />}
            </button>
          </div>
        </div>

        {/* Price Display */}
        <div className="bg-brand-dark/60 rounded py-2 px-3 mb-3 border border-white/5 flex items-center justify-between mt-auto">
          <span className="text-[10px] text-brand-light/60 uppercase font-semibold">
            Formato {selectedSize.toUpperCase()}
          </span>
          <span className="text-sm font-black text-brand-gold">{price}</span>
        </div>

        {/* Action Button: Add to Cart OR Quantity Controls */}
        <div className="mt-1">
          {quantity === 0 ? (
            <button
              type="button"
              onClick={handleAdd}
              className="w-full bg-brand-dark hover:bg-brand-gold hover:text-brand-dark border border-brand-gold/40 hover:border-brand-gold text-brand-light font-bold text-xs uppercase tracking-widest py-3 px-3 rounded transition-all flex items-center justify-center gap-2 group/btn shadow-md active:scale-[0.98]"
            >
              <Plus size={14} className="text-brand-gold group-hover/btn:text-brand-dark" />
              <span>Agregar al carrito</span>
            </button>
          ) : (
            <div className="flex items-center justify-between bg-brand-dark border-2 border-brand-gold rounded p-1 shadow-md">
              <button
                type="button"
                onClick={handleDecrease}
                className="w-9 h-9 bg-white/5 hover:bg-brand-gold hover:text-brand-dark rounded text-brand-light flex items-center justify-center transition-colors active:scale-95"
                title="Restar 1"
              >
                <Minus size={14} />
              </button>

              <div className="flex flex-col items-center">
                <span className="text-sm font-black text-brand-gold leading-none">{quantity}</span>
                <span className="text-[8px] text-brand-light/50 uppercase tracking-widest mt-0.5">
                  en carrito
                </span>
              </div>

              <button
                type="button"
                onClick={handleIncrease}
                className="w-9 h-9 bg-brand-gold hover:bg-[#b07b48] text-brand-dark rounded flex items-center justify-center transition-colors active:scale-95 font-black"
                title="Sumar 1"
              >
                <Plus size={14} strokeWidth={3} />
              </button>
            </div>
          )}
        </div>

        {/* Link to view full bottle product if available */}
        {muestra.perfumeId && (
          <div className="mt-2 text-right">
            <Link
              href={`/producto/${muestra.perfumeId}`}
              className="text-[10px] text-brand-light/40 hover:text-brand-gold inline-flex items-center gap-1 transition-colors"
            >
              <span>Ver frasco grande</span>
              <ArrowRight size={10} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
