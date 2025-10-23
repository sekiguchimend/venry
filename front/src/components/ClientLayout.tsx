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
      <main className="ml-0 min-h-[calc(100vh-48px)] bg-gray-100 transition-none">
        {children}
      </main>
    );
  }

  return (
    <div className="app-layout flex min-h-screen">
      <Sidebar />
      <main className="main-content flex-1 min-h-[calc(100vh-48px)] bg-gray-100 overflow-auto">
        {children}
      </main>

      <style jsx>{`
        @media (max-width: 768px) {
          .app-layout {
            flex-direction: column;
          }
          .main-content {
            min-height: calc(100vh - 48px);
          }
        }
      `}</style>
    </div>
  );
};

export default ClientLayout;
