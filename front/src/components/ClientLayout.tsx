'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import { useSidebar } from '@/contexts/SidebarContext';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const { isCollapsed } = useSidebar();

  const isLoginPage = pathname === '/login';

  if (isLoginPage) {
    return (
      <main className="mt-12 ml-0 min-h-[calc(100vh-48px)] bg-gray-100 transition-none">
        {children}
      </main>
    );
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <main
        className={`min-h-[calc(100vh-48px)] bg-gray-100 overflow-auto mt-12 transition-all duration-200 max-md:ml-0 ${
          isCollapsed ? 'md:ml-[60px]' : 'md:ml-[220px]'
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default ClientLayout;
