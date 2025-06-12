"use client"
import { createContext, useContext, useState, ReactNode } from 'react';

interface IAppContext {
  
}

const AppContext = createContext<IAppContext>({});

export function AppWrapper({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);

  return (
    <AppContext.Provider value={{ }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  return context;
}
