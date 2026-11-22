"use client";
import React, { createContext, useContext, useState, useMemo } from "react";

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  openSearch: () => void;
  closeSearch: () => void;
  clearFilters: () => void;
}

const SearchContext = createContext<SearchContextType>({
  searchQuery: "",
  setSearchQuery: () => {},
  selectedBrand: "ALL",
  setSelectedBrand: () => {},
  isSearchModalOpen: false,
  setIsSearchModalOpen: () => {},
  openSearch: () => {},
  closeSearch: () => {},
  clearFilters: () => {},
});

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("ALL");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const openSearch = () => setIsSearchModalOpen(true);
  const closeSearch = () => setIsSearchModalOpen(false);
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedBrand("ALL");
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        selectedBrand,
        setSelectedBrand,
        isSearchModalOpen,
        setIsSearchModalOpen,
        openSearch,
        closeSearch,
        clearFilters,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
