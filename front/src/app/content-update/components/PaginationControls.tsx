'use client';

import React from 'react';
import { TabKey } from '../../../types/content-update';

interface PaginationControlsProps {
  activeTab: TabKey;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  setCurrentPage
}) => {
  const totalPages = 3;

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
