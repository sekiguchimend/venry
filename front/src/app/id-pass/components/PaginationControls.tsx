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
    <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-4">
      <div className="text-xs md:text-sm text-gray-600 text-center sm:text-left">
        {startItem}-{endItem}件 / {totalItems}件中
      </div>

      <div className="flex items-center gap-1">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const pageNum = i + 1;
          const isActive = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`w-6 h-6 md:w-7 md:h-7 border-none rounded-full cursor-pointer text-xs md:text-sm transition-all ${
                isActive
                  ? 'bg-blue-700 text-white font-medium'
                  : 'bg-transparent text-gray-600 font-normal hover:bg-gray-100'
              }`}
            >
              {pageNum}
            </button>
          );
        })}
        <ChevronRight size={14} className="md:w-4 md:h-4 text-gray-600 cursor-pointer ml-1" />
      </div>
    </div>
  );
};

export default PaginationControls;