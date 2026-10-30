"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, User, Heart, ShoppingBag, Menu, X, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalCount, openCart } = useCart();

  return (
    <header className="fixed w-full z-50 top-0 left-0">
      {/* Top Announcement Bar */}
      <div className="bg-brand-gold text-brand-dark text-[10px] sm:text-xs font-bold tracking-widest text-center py-2.5 px-4 flex justify-center items-center gap-2">
        <Star size={14} className="text-brand-dark fill-brand-dark" />
        <span>Entregas en todo el Perú - 24 a 48 horas</span>
        <Star size={14} className="text-brand-dark fill-brand-dark" />
      </div>

      {/* Main Navbar */}
      <nav className="bg-brand-dark/95 backdrop-blur-lg border-b border-white/5 transition-all">
        <div className="container mx-auto px-4 lg:px-8 h-20 flex justify-between items-center relative">

          {/* Left: Menu Links (Desktop) & Hamburger (Mobile) */}
          <div className="flex-1 flex items-center justify-start">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="lg:hidden text-brand-light hover:text-brand-gold transition-colors p-2 -ml-2"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
            <div className="hidden lg:flex gap-6 text-[10px] xl:text-[11px] uppercase tracking-[0.15em] text-brand-light/80 font-bold">
              <Link href="/#catalogo" className="hover:text-brand-gold transition-colors py-2">Catálogo</Link>
              {/* <Link href="/muestras" className="hover:text-brand-gold text-brand-gold transition-colors py-2 flex items-center gap-1.5">
                Muestras
                <span className="bg-brand-gold/20 text-brand-gold text-[8px] px-1.5 py-0.5 rounded tracking-normal">3ML</span>
              </Link> */}
              <Link href="/#marcas" className="hover:text-brand-gold transition-colors py-2">Marcas</Link>
              <Link href="/#novedades" className="hover:text-brand-gold transition-colors py-2">Novedades</Link>
            </div>
          </div>

          {/* Center: Logo */}
          <div className="flex-shrink-0 flex items-center justify-center flex-1 py-2">
            <Link href="/" className="flex flex-col items-center justify-center cursor-pointer group hover:scale-105 transition-transform duration-300">
              <span className="font-heading text-4xl md:text-5xl text-brand-gold tracking-widest leading-none font-bold drop-shadow-sm">ISF</span>
              <span className="text-[9px] md:text-[11px] text-brand-light/70 tracking-[0.3em] uppercase mt-1.5 font-bold">Fragrance Oud & Beauty</span>
            </Link>
          </div>

          {/* Right: Icons */}
          <div className="flex-1 flex items-center justify-end gap-4 lg:gap-6 text-brand-light">
            <button className="hover:text-brand-gold transition-colors hidden sm:block" aria-label="Buscar">
              <Search size={22} strokeWidth={1.5} />
            </button>
            <button className="hover:text-brand-gold transition-colors hidden sm:block" aria-label="Mi Cuenta">
              <User size={22} strokeWidth={1.5} />
            </button>
            <button className="hover:text-brand-gold transition-colors hidden sm:block" aria-label="Favoritos">
              <Heart size={22} strokeWidth={1.5} />
            </button>
            <button 
              onClick={openCart}
              className="hover:text-brand-gold transition-colors relative flex items-center gap-2 cursor-pointer" 
              aria-label="Abrir Carrito"
            >
              <ShoppingBag size={22} strokeWidth={1.5} />
              <span className="bg-brand-gold text-brand-dark text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center absolute -top-1.5 -right-1.5">
                {totalCount}
              </span>
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-brand-surface border-t border-white/10 px-6 py-6 animate-fadeIn">
            <div className="flex flex-col gap-4 text-xs uppercase tracking-[0.15em] font-bold">
              <Link 
                href="/#catalogo" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-brand-light/90 hover:text-brand-gold py-2 border-b border-white/5"
              >
                Catálogo
              </Link>
              {/* <Link 
                href="/muestras" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-brand-gold hover:text-white py-2 border-b border-white/5 flex items-center justify-between"
              >
                <span>Muestras</span>
                <span className="bg-brand-gold text-brand-dark text-[9px] px-2 py-0.5 rounded font-extrabold">3ML / DECANTS</span>
              </Link> */}
              <Link 
                href="/#marcas" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-brand-light/90 hover:text-brand-gold py-2 border-b border-white/5"
              >
                Marcas
              </Link>
              <Link 
                href="/#novedades" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-brand-light/90 hover:text-brand-gold py-2"
              >
                Novedades
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
