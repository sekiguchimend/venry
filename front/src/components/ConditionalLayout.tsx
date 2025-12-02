'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import ClientLayout from './ClientLayout';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

const ConditionalLayout: React.FC<ConditionalLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  // ログイン/サインアップページではヘッダーを非表示
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  if (isAuthPage) {
    return <ClientLayout>{children}</ClientLayout>;
  }

  return (
    <>
      <Header />
      <ClientLayout>{children}</ClientLayout>
    </>
  );
};

export default ConditionalLayout;

