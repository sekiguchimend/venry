'use client';

import React from 'react';
import { TabKey } from '../../../types/content-update';
import { shouldShowSecondPage } from '../utils/tabContentFactory';

interface PaginationControlsProps {
  activeTab: TabKey;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  activeTab,
  currentPage,
  setCurrentPage
}) => {
  const pages = shouldShowSecondPage(activeTab) ? [1, 2] : [1];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    }}>
      {pages.map((pageNum) => {
        const isActive = pageNum === currentPage;
        return (
          <button
            key={pageNum}
            onClick={() => setCurrentPage(pageNum)}
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
          >
            {pageNum}
          </button>
        );
      })}
      {activeTab === 'content-list' && (
        <span style={{ color: '#1976d2', cursor: 'pointer', fontSize: '14px' }}>
          グループ配信設定
        </span>
      )}
    </div>
  );
};

export default PaginationControls;