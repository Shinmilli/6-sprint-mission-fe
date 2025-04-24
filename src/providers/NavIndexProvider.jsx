"use client";

import { createContext, useContext, useState } from "react";

const NavContext = createContext();

const NavIndexProvider = ({ children }) => {
  const [activePage, setActivePage] = useState("/post");

  return (
    <NavContext.Provider value={{ activePage, setActivePage }}>
      {children}
    </NavContext.Provider>
  );
};

export function useNav() {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error("컨텍스트가 존재하지 않습니다.");
  }
  return context;
}

export default NavIndexProvider;
