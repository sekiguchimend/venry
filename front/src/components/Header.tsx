'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, HelpCircle, Bell, Menu } from 'lucide-react';
import { useUserStore } from '@/stores/userStore';
import { useSidebar } from '@/contexts/SidebarContext';

const Header: React.FC = () => {
  const { userInfo } = useUserStore();
  const { setIsMobileMenuOpen } = useSidebar();

  return (
    <header className="header w-full h-12 bg-white border-b border-gray-300">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        {/* Mobile Menu Button and Logo */}
        <div className="flex items-center">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="mobile-menu-btn md:hidden mr-3 p-1 border-0 bg-transparent cursor-pointer text-gray-600"
          >
            <Menu size={24} />
          </button>

          {/* Logo and Company Name */}
          <Link href="/" className="flex items-center no-underline">
            <div className="flex items-center">
              {/* Logo Icon - Shield shape */}
              <div className="logo-icon w-6 h-6 md:w-7 md:h-7 mr-2">
                <svg
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <path
                    d="M14 2L4 7V14C4 19.5 8.5 24.5 14 25C19.5 24.5 24 19.5 24 14V7L14 2Z"
                    fill="#1e40af"
                    stroke="#1e40af"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M14 8L10 12L12 14L14 12L16 14L18 12L14 8Z"
                    fill="white"
                  />
                  <circle cx="14" cy="17" r="1.5" fill="white" />
                </svg>
              </div>
              <span className="logo-text text-lg md:text-xl font-medium text-gray-900 tracking-wide">
                Mr.Venrey
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation and Info */}
        <div className="desktop-nav hidden md:flex items-center gap-6">
          {/* お知らせ link */}
          <Link
            href="/notices"
            className="flex items-center no-underline text-sm text-gray-800"
          >
            お知らせ
            <span className="ml-1.5 inline-flex items-center justify-center bg-blue-50 rounded-full w-5 h-5 text-blue-700">
              <HelpCircle className="w-3.5 h-3.5" />
            </span>
          </Link>

          {/* ID and Company Name */}
          <div className="text-sm text-gray-600">
            ID:{userInfo.id} {userInfo.companyName}
          </div>

          {/* Phone number */}
          <a
            href={`tel:${userInfo.phoneNumber}`}
            className="flex items-center no-underline text-sm text-blue-700"
          >
            <Phone className="w-4 h-4 mr-1" />
            <span className="underline">{userInfo.phoneNumber}</span>
          </a>

          {/* User ID */}
          <div className="text-sm text-gray-600">
            ID: {userInfo.id}
          </div>

          {/* Alert/Notification Icon */}
          <button className="border-0 bg-transparent cursor-pointer p-0 text-orange-500">
            <Bell className="w-5 h-5" fill="currentColor" />
          </button>
        </div>

        {/* Mobile Navigation - Simplified */}
        <div className="mobile-nav flex md:hidden items-center gap-3">
          {/* Notification Icon */}
          <button className="border-0 bg-transparent cursor-pointer p-0 text-orange-500">
            <Bell className="w-5 h-5" fill="currentColor" />
          </button>

          {/* User ID - Mobile */}
          <div className="text-xs text-gray-600">
            ID: {userInfo.id}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .header {
            position: sticky;
            top: 0;
            z-index: 100;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
