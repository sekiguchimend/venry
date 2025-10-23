'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/userStore';

const LoginPage: React.FC = () => {
  const [companyName] = useState('京都ホテル協会邸 様');
  const { login } = useUserStore();
  const router = useRouter();

  const handleLogin = () => {
    login({
      id: '4910',
      companyName: companyName,
      phoneNumber: '06-6526-7766',
    });
    router.push('/');
  };

  return (
    <div className="min-h-full flex items-center justify-center py-8 md:py-15 px-4 md:px-5">
      {/* Login Card */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm md:w-80 p-0">
        {/* Top Section with Logo and Title */}
        <div className="bg-gradient-to-br from-gray-100 to-gray-300 py-8 px-8 pb-6 rounded-t-lg text-center">
          {/* Logo */}
          <div className="mb-4">
            <svg
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 mx-auto"
            >
              {/* Diamond shape logo */}
              <path
                d="M32 8L16 24L32 40L48 24L32 8Z"
                fill="#0099cc"
              />
              <path
                d="M32 24L24 32L32 40L40 32L32 24Z"
                fill="#006699"
              />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-lg font-medium text-gray-800 m-0 tracking-wide">
            ログイン
          </h1>
        </div>

        {/* Bottom Section with Form */}
        <div className="py-6 px-8 pb-8">
          {/* Company Group Label */}
          <div className="text-center text-xs text-gray-600 mb-4 flex items-center justify-center">
            <span className="inline-block w-1.5 h-1.5 bg-gray-400 rounded-full mr-1.5"></span>
            DCグループ 様
          </div>

          {/* Company Name */}
          <div className="text-center text-lg font-semibold text-gray-800 mb-8 leading-snug">
            {companyName}
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-700 text-white border-none rounded-3xl py-3 px-6 text-base font-medium cursor-pointer mb-4 transition-colors hover:bg-blue-800"
          >
            ログイン
          </button>

          {/* New Account Link */}
          <div className="text-center">
            <a href="#" className="text-sm text-gray-600 underline">
              新規アカウントでログイン
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-transparent p-3 md:p-5 text-center">
        <div className="mb-2 flex flex-wrap justify-center items-center gap-1 md:gap-2">
          {['運営会社', '利用規約', 'プライバシーポリシー', 'オフィシャルサイト'].map((link, index) => (
            <span key={link} className="flex items-center">
              <a href="#" className="text-xs text-gray-600 underline">
                {link}
              </a>
              {index < 3 && <span className="text-gray-400 mx-1 hidden md:inline">|</span>}
            </span>
          ))}
        </div>
        <div className="text-xs text-gray-500">
          © 2024 Mr.Venrey. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
