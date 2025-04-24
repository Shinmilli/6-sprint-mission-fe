"use client";

import React, { createContext, useContext, useState } from "react";

const ArticlesContext = createContext();

export const ArticlesProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [order, setOrder] = useState("recent");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <ArticlesContext.Provider
      value={{
        articles,
        setArticles,
        order,
        setOrder,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = () => useContext(ArticlesContext);
