'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import { useSidebar } from '@/contexts/SidebarContext';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const { isCollapsed } = useSidebar();
  const pathname = usePathname();

  const isLoginPage = pathname === '/login';

  if (isLoginPage) {
    return (
      <main style={{
        minHeight: 'calc(100vh - 48px)',
        backgroundColor: '#e0e0e0',
        margin: 0,
        padding: 0
      }}>
        {children}
      </main>
    );
  }

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main
        style={{
          flex: 1,
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
          padding: '20px'
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default ClientLayout;