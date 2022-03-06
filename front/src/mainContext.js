import React, { createContext, useState } from 'react';

const MainContext = createContext();

function MainContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  return <MainContext.Provider value={{ loading, setLoading }}>{children}</MainContext.Provider>;
}

export { MainContextProvider, MainContext };
