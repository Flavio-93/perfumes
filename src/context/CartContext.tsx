"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { businessData } from "@/data/businessContent";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Send } from "lucide-react";

export type ProductFormat = "3ml" | "5ml" | "frasco";
// Alias for backward compatibility
export type SampleSize = ProductFormat;

export interface CartItem {
  id: string; // Composite key: `${item.id}-${size}`
  baseId: string;
  name: string;
  brand: string;
  size: ProductFormat;
  price: number;
  image: string;
  quantity: number;
}

interface AddToCartParams {
  id: string;
  name: string;
  brand: string;
  image: string;
  price?: number | string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: AddToCartParams, size?: ProductFormat) => void;
  updateQuantity: (baseId: string, size: ProductFormat, delta: number) => void;
  removeFromCart: (baseId: string, size: ProductFormat) => void;
  getItemQuantity: (baseId: string, size?: ProductFormat) => number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  totalCount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

import { perfumes } from "@/data/perfumes";

// Helper to safely extract numeric price from strings like "S/. 105.00"
function parseItemPrice(priceVal?: number | string): number {
  if (typeof priceVal === "number") return priceVal;
  if (!priceVal) return 120.0;
  const match = String(priceVal).match(/\d+(?:\.\d+)?/);
  return match ? parseFloat(match[0]) : 120.0;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount and sanitize any previously corrupted prices
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("isf_cart");
        if (saved) {
          const parsed: CartItem[] = JSON.parse(saved);
          const sanitized = parsed.map((item) => {
            if (item.size === "frasco") {
              const matchedPerfume = perfumes.find((p) => p.id === item.baseId);
              const realPrice = matchedPerfume ? parseItemPrice(matchedPerfume.price) : (item.price > 1 ? item.price : 120.0);
              return { ...item, price: realPrice };
            } else if (item.size === "3ml") {
              return { ...item, price: 15.0 };
            } else if (item.size === "5ml") {
              return { ...item, price: 22.0 };
            }
            return item;
          });
          setCart(sanitized);
        }
      } catch (e) {
        console.error("Error reading cart from localStorage", e);
      }
      setIsInitialized(true);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isInitialized && typeof window !== "undefined") {
      try {
        localStorage.setItem("isf_cart", JSON.stringify(cart));
      } catch (e) {
        console.error("Error saving cart to localStorage", e);
      }
    }
  }, [cart, isInitialized]);

  const addToCart = (item: AddToCartParams, size: ProductFormat = "frasco") => {
    const compositeId = `${item.id}-${size}`;
    let itemPrice: number;

    if (size === "3ml") {
      itemPrice = 15.0;
    } else if (size === "5ml") {
      itemPrice = 22.0;
    } else {
      if (typeof item.price === "number") {
        itemPrice = item.price;
      } else if (typeof item.price === "string") {
        itemPrice = parseItemPrice(item.price);
      } else {
        const matched = perfumes.find((p) => p.id === item.id);
        itemPrice = matched ? parseItemPrice(matched.price) : 120.0;
      }
    }

    setCart((prev) => {
      const existing = prev.find((i) => i.id === compositeId);
      if (existing) {
        return prev.map((i) => (i.id === compositeId ? { ...i, quantity: i.quantity + 1, price: itemPrice } : i));
      } else {
        return [
          ...prev,
          {
            id: compositeId,
            baseId: item.id,
            name: item.name,
            brand: item.brand,
            size,
            price: itemPrice,
            image: item.image,
            quantity: 1,
          },
        ];
      }
    });
    // Open the cart drawer automatically as requested
    setIsCartOpen(true);
  };

  const updateQuantity = (baseId: string, size: ProductFormat = "frasco", delta: number) => {
    const compositeId = `${baseId}-${size}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.id === compositeId);
      if (!existing) return prev;

      const newQty = existing.quantity + delta;
      if (newQty <= 0) {
        return prev.filter((i) => i.id !== compositeId);
      }
      return prev.map((i) => (i.id === compositeId ? { ...i, quantity: newQty } : i));
    });
  };

  const removeFromCart = (baseId: string, size: ProductFormat = "frasco") => {
    const compositeId = `${baseId}-${size}`;
    setCart((prev) => prev.filter((i) => i.id !== compositeId));
  };

  const getItemQuantity = (baseId: string, size: ProductFormat = "frasco"): number => {
    const compositeId = `${baseId}-${size}`;
    const found = cart.find((i) => i.id === compositeId);
    return found ? found.quantity : 0;
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        getItemQuantity,
        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,
        totalCount,
        totalPrice,
      }}
    >
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

// Side-drawer Component
function CartDrawer() {
  const { cart, isCartOpen, closeCart, updateQuantity, removeFromCart, totalCount, totalPrice } = useCart();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    if (isCartOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isCartOpen, closeCart]);

  // Formatted WhatsApp message with order details
  const generateWhatsAppUrl = () => {
    if (cart.length === 0) return `https://wa.me/${businessData.whatsappNumber}`;

    let msg = `Hola! Quiero pedir los siguientes productos de mi carrito:\n\n`;
    cart.forEach((item) => {
      const sizeLabel = item.size === "frasco" ? "Frasco Completo" : item.size.toUpperCase();
      msg += `• ${item.quantity}x ${item.name} (${item.brand}) [${sizeLabel}] - S/. ${(
        item.price * item.quantity
      ).toFixed(2)}\n`;
    });
    msg += `\n*Total a pagar: S/. ${totalPrice.toFixed(2)}*`;
    msg += `\n\nPor favor, indíquenme los métodos de pago y datos para el envío. Gracias!`;

    return `https://wa.me/${businessData.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[998] transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[440px] bg-brand-surface border-l border-white/10 z-[999] shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Carrito de compras"
      >
        {/* Top Noticeable Button to Hide/Continue Browsing */}
        <div className="bg-brand-dark px-4 py-3 border-b border-white/10 flex items-center justify-between gap-3">
          <button
            onClick={closeCart}
            className="flex-1 bg-brand-gold/15 hover:bg-brand-gold/25 border border-brand-gold/40 text-brand-gold font-bold text-xs uppercase tracking-widest py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Seguir buscando productos</span>
          </button>
          
          <button
            onClick={closeCart}
            className="p-2 text-brand-light/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
            title="Cerrar carrito"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={20} className="text-brand-gold" />
            <h2 className="font-heading text-xl text-brand-light font-bold">Tu Carrito</h2>
            <span className="bg-brand-gold text-brand-dark text-xs font-black px-2 py-0.5 rounded-full">
              {totalCount}
            </span>
          </div>
          <span className="text-[11px] text-brand-light/50 uppercase tracking-widest font-semibold">
            Perfumes & Muestras
          </span>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-white/5">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-brand-light/60">
              <ShoppingBag size={48} className="text-brand-gold/30 mb-4 stroke-1" />
              <p className="text-base font-semibold text-brand-light mb-1">Tu carrito está vacío</p>
              <p className="text-xs text-brand-light/50 max-w-xs mb-6">
                Agrega perfumes completos o muestras a tu carrito para comenzar tu pedido.
              </p>
              <button
                onClick={closeCart}
                className="bg-brand-gold hover:bg-[#b07b48] text-brand-dark font-bold text-xs uppercase tracking-widest px-6 py-3 rounded transition-colors cursor-pointer"
              >
                Explorar catálogo
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="pt-3 first:pt-0 flex gap-3 items-center group">
                {/* Thumbnail */}
                <div className="w-16 h-16 bg-white rounded p-1 flex-shrink-0 flex items-center justify-center overflow-hidden border border-white/10">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-brand-light/50 uppercase font-semibold truncate">{item.brand}</p>
                  <h4 className="text-xs font-bold text-brand-light uppercase truncate mb-1">{item.name}</h4>
                  
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase ${
                      item.size === "frasco"
                        ? "bg-brand-gold/20 border border-brand-gold/40 text-brand-gold"
                        : "bg-[#C48B57]/20 border border-[#C48B57]/40 text-[#C48B57]"
                    }`}>
                      {item.size === "frasco" ? "Frasco 100ml" : item.size.toUpperCase()}
                    </span>
                    <span className="text-xs font-bold text-brand-gold">
                      S/. {(item.price * item.quantity).toFixed(2)}
                    </span>
                    <span className="text-[10px] text-brand-light/40">
                      (S/. {item.price.toFixed(2)} c/u)
                    </span>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-1 bg-brand-dark border border-white/10 rounded px-1 py-0.5">
                  <button
                    onClick={() => updateQuantity(item.baseId, item.size, -1)}
                    className="w-6 h-6 flex items-center justify-center text-brand-light hover:text-brand-gold hover:bg-white/5 rounded transition-colors"
                    title="Restar 1"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-6 text-center text-xs font-black text-brand-gold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.baseId, item.size, 1)}
                    className="w-6 h-6 flex items-center justify-center text-brand-light hover:text-brand-gold hover:bg-white/5 rounded transition-colors"
                    title="Sumar 1"
                  >
                    <Plus size={12} />
                  </button>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.baseId, item.size)}
                  className="p-1.5 text-brand-light/40 hover:text-red-400 transition-colors rounded"
                  title="Eliminar del carrito"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="p-5 bg-brand-dark border-t border-white/10 space-y-4">
            <div className="space-y-1.5 text-xs text-brand-light/70">
              <div className="flex justify-between">
                <span>Subtotal ({totalCount} productos)</span>
                <span className="font-bold text-brand-light">S/. {totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <span className="text-brand-gold font-bold">Por coordinar (WhatsApp)</span>
              </div>
              <div className="flex justify-between text-base font-black text-brand-light pt-2 border-t border-white/10">
                <span>Total Estimado:</span>
                <span className="text-brand-gold text-lg font-black">S/. {totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Direct WhatsApp Checkout Button */}
            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-widest py-3.5 px-4 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-green-900/20 transition-all hover:scale-[1.01] active:scale-[0.98]"
            >
              <Send size={16} />
              <span>Pedir Carrito por WhatsApp</span>
            </a>

            {/* Noticeable Continue Browsing link at the bottom */}
            <button
              onClick={closeCart}
              className="w-full text-center text-[11px] text-brand-light/60 hover:text-brand-gold uppercase tracking-widest font-bold py-1.5 transition-colors flex items-center justify-center gap-1.5"
            >
              <ArrowLeft size={12} />
              <span>Ocultar carrito y seguir agregando más</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
