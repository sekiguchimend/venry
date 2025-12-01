'use client';

import React, { createContext, useContext, useState, useRef, useCallback, ReactNode } from 'react';

interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  getScrollPosition: () => number;
  setScrollPosition: (position: number) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollPositionRef = useRef<number>(0);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const getScrollPosition = useCallback(() => {
    return scrollPositionRef.current;
  }, []);

  const setScrollPosition = useCallback((position: number) => {
    scrollPositionRef.current = position;
  }, []);

  return (
    <SidebarContext.Provider value={{
      isCollapsed,
      toggleSidebar,
      isMobileMenuOpen,
      setIsMobileMenuOpen,
      getScrollPosition,
      setScrollPosition
    }}>
      {children}
    </SidebarContext.Provider>
  );
};