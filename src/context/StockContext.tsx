"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { perfumes } from "@/data/perfumes";

// Fallback stock map based on initial perfumes.ts data
const initialStockMap: Record<string, number> = {};
perfumes.forEach((p) => {
  initialStockMap[p.id] = typeof p.stock === "number" ? p.stock : 0;
});

interface StockContextType {
  stockMap: Record<string, number>;
  isLoading: boolean;
  getStock: (id: string) => number;
  isOutOfStock: (id: string) => boolean;
}

const StockContext = createContext<StockContextType>({
  stockMap: initialStockMap,
  isLoading: false,
  getStock: (id: string) => initialStockMap[id] ?? 0,
  isOutOfStock: (id: string) => (initialStockMap[id] ?? 0) <= 0,
});

// ID del documento de Google Sheets
const SPREADSHEET_ID = "18wePIjzY1T254kaGHgDzGwvvItIvNemFgry4pIY6vAE";
const GVIZ_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=Productos`;

export function StockProvider({ children }: { children: React.ReactNode }) {
  const [stockMap, setStockMap] = useState<Record<string, number>>(initialStockMap);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchLiveStock() {
      try {
        const response = await fetch(GVIZ_URL, { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const text = await response.text();
        
        // Parse CSV text
        const rows = text.split("\n").filter(Boolean);
        const newMap: Record<string, number> = { ...initialStockMap };

        // Start from row 1 (skip headers: ID_Producto, Marca, Nombre, Precio, Stock_Actual)
        for (let i = 1; i < rows.length; i++) {
          // Handle standard CSV quotes or commas
          const row = rows[i];
          const parts = row.split(",").map((col) => col.replace(/^"(.*)"$/, "$1").trim());
          if (parts.length >= 5) {
            const code = parts[0]; // e.g. "P01"
            const idNum = parseInt(code.replace(/^P/i, ""), 10).toString();
            const stockVal = parseInt(parts[4], 10);
            if (!isNaN(stockVal) && idNum) {
              newMap[idNum] = stockVal;
            }
          }
        }

        if (isMounted) {
          setStockMap(newMap);
          setIsLoading(false);
        }
      } catch (err) {
        // En caso de error de red o permisos, mantenemos el fallback local sin interrumpir la web
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchLiveStock();

    // Opcional: auto-refrescar cada 60 segundos si el usuario tiene la pestaña abierta
    const interval = setInterval(fetchLiveStock, 60000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const getStock = (id: string): number => {
    return stockMap[id] ?? 0;
  };

  const isOutOfStock = (id: string): boolean => {
    return (stockMap[id] ?? 0) <= 0;
  };

  return (
    <StockContext.Provider value={{ stockMap, isLoading, getStock, isOutOfStock }}>
      {children}
    </StockContext.Provider>
  );
}

export function useStock() {
  return useContext(StockContext);
}
