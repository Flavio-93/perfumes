"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { perfumes } from "@/data/perfumes";

// Fallback stock y precios basados en perfumes.ts
const initialStockMap: Record<string, number> = {};
const initialPriceMap: Record<string, string> = {};

perfumes.forEach((p) => {
  initialStockMap[p.id] = typeof p.stock === "number" ? p.stock : 0;
  initialPriceMap[p.id] = p.price || "S/. 0.00";
});

interface StockContextType {
  stockMap: Record<string, number>;
  priceMap: Record<string, string>;
  isLoading: boolean;
  getStock: (id: string) => number;
  getPrice: (id: string, fallbackPrice?: string) => string;
  isOutOfStock: (id: string) => boolean;
}

const StockContext = createContext<StockContextType>({
  stockMap: initialStockMap,
  priceMap: initialPriceMap,
  isLoading: false,
  getStock: (id: string) => initialStockMap[id] ?? 0,
  getPrice: (id: string, fallbackPrice?: string) => initialPriceMap[id] ?? fallbackPrice ?? "S/. 0.00",
  isOutOfStock: (id: string) => (initialStockMap[id] ?? 0) <= 0,
});

// ID del documento de Google Sheets
const SPREADSHEET_ID = "18wePIjzY1T254kaGHgDzGwvvItIvNemFgry4pIY6vAE";
const GVIZ_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=Productos`;

export function StockProvider({ children }: { children: React.ReactNode }) {
  const [stockMap, setStockMap] = useState<Record<string, number>>(initialStockMap);
  const [priceMap, setPriceMap] = useState<Record<string, string>>(initialPriceMap);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchLiveStockAndPrices() {
      try {
        const response = await fetch(GVIZ_URL, { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const text = await response.text();
        
        // Parsear filas del CSV
        const rows = text.split("\n").filter(Boolean);
        const newStockMap: Record<string, number> = { ...initialStockMap };
        const newPriceMap: Record<string, string> = { ...initialPriceMap };

        // Fila 0 es encabezado: ID_Producto, Marca, Nombre, Precio, Stock_Actual
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          const parts = row.split(",").map((col) => col.replace(/^"(.*)"$/, "$1").trim());
          if (parts.length >= 4) {
            const code = parts[0]; // e.g. "P01", "P02", ...
            const idNum = parseInt(code.replace(/^P/i, ""), 10).toString();
            
            // 1. Extraer y formatear precio en tiempo real
            const rawPrice = parts[3]; // e.g. "105", "105.00", "S/. 105.00"
            if (rawPrice && idNum) {
              const cleanedNum = parseFloat(rawPrice.replace(/[^0-9.]/g, ""));
              if (!isNaN(cleanedNum)) {
                newPriceMap[idNum] = `S/. ${cleanedNum.toFixed(2)}`;
              }
            }

            // 2. Extraer stock en tiempo real
            if (parts.length >= 5) {
              const stockVal = parseInt(parts[4], 10);
              if (!isNaN(stockVal) && idNum) {
                newStockMap[idNum] = stockVal;
              }
            }
          }
        }

        if (isMounted) {
          setStockMap(newStockMap);
          setPriceMap(newPriceMap);
          setIsLoading(false);
        }
      } catch (err) {
        // En caso de error de red o permisos, se mantienen los valores locales
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchLiveStockAndPrices();

    // Auto-refrescar cada 30 segundos si el usuario tiene la pestaña abierta
    const interval = setInterval(fetchLiveStockAndPrices, 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const getStock = (id: string): number => {
    return stockMap[id] ?? 0;
  };

  const getPrice = (id: string, fallbackPrice?: string): string => {
    return priceMap[id] || fallbackPrice || "S/. 0.00";
  };

  const isOutOfStock = (id: string): boolean => {
    return (stockMap[id] ?? 0) <= 0;
  };

  return (
    <StockContext.Provider value={{ stockMap, priceMap, isLoading, getStock, getPrice, isOutOfStock }}>
      {children}
    </StockContext.Provider>
  );
}

export function useStock() {
  return useContext(StockContext);
}
