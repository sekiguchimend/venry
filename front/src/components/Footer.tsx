import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer
      className="py-6"
      style={{
        backgroundColor: 'transparent',
        borderTop: 'none'
      }}
    >
      <div className="flex justify-center items-center gap-6 mb-3">
        <a
          href="#"
          className="text-sm"
          style={{
            color: '#666666',
            textDecoration: 'underline'
          }}
        >
          運営会社
        </a>
        <a
          href="#"
          className="text-sm"
          style={{
            color: '#666666',
            textDecoration: 'underline'
          }}
        >
          利用規約
        </a>
        <a
          href="#"
          className="text-sm"
          style={{
            color: '#666666',
            textDecoration: 'underline'
          }}
        >
          プライバシーポリシー
        </a>
        <a
          href="#"
          className="text-sm"
          style={{
            color: '#666666',
            textDecoration: 'underline'
          }}
        >
          オフィシャルサイト
        </a>
      </div>
      <div
        className="text-center text-sm"
        style={{
          color: '#999999'
        }}
      >
        © 2024 Mr.Venrey. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;