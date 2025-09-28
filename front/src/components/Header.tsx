'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, HelpCircle, Bell } from 'lucide-react';
import { useUserStore } from '@/stores/userStore';

const Header: React.FC = () => {
  const { userInfo } = useUserStore();

  return (
    <header className="w-full bg-white border-b border-gray-300" style={{ height: '48px' }}>
      <div className="flex items-center justify-between h-full px-6">
        {/* Logo and Company Name */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center no-underline">
            <div className="flex items-center">
              {/* Logo Icon - Shield shape */}
              <div className="w-7 h-7 mr-2">
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
              <span className="text-xl font-medium" style={{ color: '#1a1a1a', letterSpacing: '0.5px' }}>
                Mr.Venrey
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation and Info */}
        <div className="flex items-center" style={{ gap: '24px' }}>
          {/* お知らせ link */}
          <Link
            href="/notices"
            className="flex items-center no-underline"
            style={{ fontSize: '14px', color: '#333' }}
          >
            お知らせ
            <span
              className="ml-1.5 inline-flex items-center justify-center"
              style={{
                backgroundColor: '#e3f2fd',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                color: '#1976d2'
              }}
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </span>
          </Link>

          {/* ID and Company Name */}
          <div style={{ fontSize: '14px', color: '#555' }}>
            ID:{userInfo.id} {userInfo.companyName}
          </div>

          {/* Phone number */}
          <a
            href={`tel:${userInfo.phoneNumber}`}
            className="flex items-center no-underline"
            style={{ fontSize: '14px', color: '#1976d2' }}
          >
            <Phone className="w-4 h-4 mr-1" />
            <span style={{ textDecoration: 'underline' }}>{userInfo.phoneNumber}</span>
          </a>

          {/* User ID */}
          <div style={{ fontSize: '14px', color: '#555' }}>
            ID: {userInfo.id}
          </div>

          {/* Alert/Notification Icon */}
          <button
            className="border-0 bg-transparent cursor-pointer p-0"
            style={{ color: '#ff9800' }}
          >
            <Bell className="w-5 h-5" fill="currentColor" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;