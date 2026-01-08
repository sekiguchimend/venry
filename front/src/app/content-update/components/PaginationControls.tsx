'use client';

import React from 'react';
import { ContentTabKey } from '../../../types/content-update';
import { getTotalPages } from '../utils/tabContentFactory';

interface PaginationControlsProps {
  activeTab: ContentTabKey;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  activeTab,
  currentPage,
  setCurrentPage
}) => {
  const totalPages = getTotalPages(activeTab);

  // 1ページ以下の場合はページネーションを表示しない
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center gap-1 md:gap-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`py-1 px-2 md:px-2.5 border rounded text-xs cursor-pointer min-w-5 md:min-w-6 ${
            currentPage === page
              ? 'border-blue-700 bg-blue-700 text-white'
              : 'border-gray-200 bg-white text-gray-600'
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default PaginationControls;
