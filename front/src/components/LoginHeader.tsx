'use client';

import React from 'react';
import Link from 'next/link';

const LoginHeader: React.FC = () => {
  return (
    <header className="w-full bg-white border-b border-gray-300" style={{ height: '48px' }}>
      <div className="flex items-center justify-start h-full px-6">
        {/* Logo and Company Name Only */}
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
      </div>
    </header>
  );
};

export default LoginHeader;