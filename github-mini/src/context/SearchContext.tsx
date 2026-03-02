import React, { createContext, useContext, useState } from "react";

type SearchContextType = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const SearchContext = createContext<SearchContextType | null>(null);

export const SearchProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [search, setSearch] = useState("");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider> 
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("useSearch must be used within SearchProvider");
  }

  return context;
};