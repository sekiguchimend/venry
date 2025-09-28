'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/userStore';

const LoginPage: React.FC = () => {
  const [companyName, setCompanyName] = useState('京都ホテル協会邸 様');
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
    <div
      className="min-h-full flex items-center justify-center"
      style={{
        padding: '60px 20px'
      }}
    >
      {/* Login Card */}
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          width: '320px',
          padding: '0'
        }}
      >
        {/* Top Section with Logo and Title */}
        <div
          style={{
            background: 'linear-gradient(135deg, #f8f8f8 0%, #e0e0e0 100%)',
            padding: '32px 32px 24px 32px',
            borderRadius: '8px 8px 0 0',
            textAlign: 'center'
          }}
        >
          {/* Logo */}
          <div style={{ marginBottom: '16px' }}>
            <svg
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: '64px', height: '64px', margin: '0 auto' }}
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
          <h1
            style={{
              fontSize: '18px',
              fontWeight: '500',
              color: '#333',
              margin: '0',
              letterSpacing: '0.5px'
            }}
          >
            ログイン
          </h1>
        </div>

        {/* Bottom Section with Form */}
        <div style={{ padding: '24px 32px 32px 32px' }}>
          {/* Company Group Label */}
          <div
            style={{
              textAlign: 'center',
              fontSize: '12px',
              color: '#666',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span style={{
              display: 'inline-block',
              width: '6px',
              height: '6px',
              backgroundColor: '#ccc',
              borderRadius: '50%',
              marginRight: '6px'
            }}></span>
            DCグループ 様
          </div>

          {/* Company Name */}
          <div
            style={{
              textAlign: 'center',
              fontSize: '18px',
              fontWeight: '600',
              color: '#333',
              marginBottom: '32px',
              lineHeight: '1.4'
            }}
          >
            {companyName}
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            style={{
              width: '100%',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '24px',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              marginBottom: '16px',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor = '#1565c0';
            }}
            onMouseOut={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor = '#1976d2';
            }}
          >
            ログイン
          </button>

          {/* New Account Link */}
          <div style={{ textAlign: 'center' }}>
            <a
              href="#"
              style={{
                fontSize: '14px',
                color: '#666',
                textDecoration: 'underline'
              }}
            >
              新規アカウントでログイン
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          position: 'fixed',
          bottom: '0',
          left: '0',
          right: '0',
          backgroundColor: 'transparent',
          padding: '20px',
          textAlign: 'center'
        }}
      >
        <div style={{ marginBottom: '8px' }}>
          {['運営会社', '利用規約', 'プライバシーポリシー', 'オフィシャルサイト'].map((link, index) => (
            <span key={link}>
              <a
                href="#"
                style={{
                  fontSize: '12px',
                  color: '#666',
                  textDecoration: 'underline',
                  margin: '0 8px'
                }}
              >
                {link}
              </a>
              {index < 3 && <span style={{ color: '#ccc', margin: '0 4px' }}>|</span>}
            </span>
          ))}
        </div>
        <div style={{ fontSize: '12px', color: '#999' }}>
          © 2024 Mr.Venrey. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default LoginPage;