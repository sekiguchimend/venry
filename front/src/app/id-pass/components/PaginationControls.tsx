import React from 'react';
import { ChevronRight } from 'lucide-react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    }}>
      <div style={{
        fontSize: '14px',
        color: '#666'
      }}>
        {startItem}-{endItem}件 / {totalItems}件中
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
      }}>
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const pageNum = i + 1;
          const isActive = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              style={{
                width: '28px',
                height: '28px',
                border: 'none',
                borderRadius: '50%',
                backgroundColor: isActive ? '#1976d2' : 'transparent',
                color: isActive ? '#ffffff' : '#666',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: isActive ? '500' : '400',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = '#f0f0f0';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {pageNum}
            </button>
          );
        })}
        <ChevronRight size={16} style={{ color: '#666', cursor: 'pointer' }} />
      </div>
    </div>
  );
};

export default PaginationControls;