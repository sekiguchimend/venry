import React from 'react';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className = '',
  style = {}
}) => {
  return (
    <div
      className={`responsive-container p-5 max-w-full mx-auto ${className}`}
      style={style}
    >
      {children}
      <style jsx>{`
        @media (max-width: 640px) {
          .responsive-container {
            padding: 12px !important;
          }
        }

        @media (min-width: 641px) and (max-width: 768px) {
          .responsive-container {
            padding: 16px !important;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .responsive-container {
            padding: 20px !important;
            max-width: 900px;
          }
        }

        @media (min-width: 1025px) {
          .responsive-container {
            padding: 24px !important;
            max-width: 1200px;
          }
        }
      `}</style>
    </div>
  );
};

export default ResponsiveContainer;
