'use client';

import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical } from 'lucide-react';
import WomenListRow from './WomenListRow';
import { WomenListProps } from '../types/women-list';

const WomenListResponsive: React.FC<WomenListProps> = ({
  items,
  searchTerm: initialSearchTerm = '',
  onSearch,
  totalCount = 282,
  currentPage = 1,
  totalPages = 4,
  onPageChange
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  const handlePageClick = (page: number) => {
    onPageChange?.(page);
  };

  return (
    <div className="women-list-container bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header Section */}
      <div className="header-section flex items-center justify-between py-4 px-4 border-b border-gray-100 flex-wrap gap-3">
        {/* Left side - Action buttons */}
        <div className="action-buttons flex items-center gap-3 flex-wrap">
          <button className="btn-primary mobile-btn py-2 px-4 bg-green-700 border-none rounded-full text-sm text-white cursor-pointer flex items-center gap-1">
            <Plus size={16} />
            <span className="btn-text">新規登録</span>
          </button>

          <button className="btn-primary mobile-btn desktop-only py-2 px-4 bg-green-700 border-none rounded-full text-sm text-white cursor-pointer flex items-center gap-1">
            <Plus size={16} />
            <span className="btn-text">女性取り込み</span>
          </button>

          <button className="btn-secondary mobile-btn desktop-only py-2 px-4 bg-transparent border border-gray-200 rounded-full text-sm text-gray-600 cursor-pointer flex items-center gap-1">
            <Filter size={16} />
            <span className="btn-text">詳細設定</span>
          </button>

          {/* Mobile menu button */}
          <button className="mobile-only mobile-menu-btn p-2 bg-transparent border border-gray-200 rounded-full text-gray-600 cursor-pointer hidden">
            <MoreVertical size={20} />
          </button>
        </div>

        {/* Right side - Search and count */}
        <div className="search-section flex items-center gap-4 flex-wrap">
          <span className="count-text desktop-only text-sm text-gray-600">
            全{totalCount}件
          </span>

          <div className="search-box relative min-w-[200px]">
            <input
              type="text"
              placeholder="女性名で検索"
              value={searchTerm}
              onChange={handleSearchChange}
              className="py-2 pr-3 pl-9 border border-gray-200 rounded-full text-sm w-full outline-none"
            />
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Table Section - Scrollable on mobile */}
      <div className="table-wrapper overflow-x-auto">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="py-3 px-4 text-left text-xs text-gray-600 font-semibold">
                <input type="checkbox" className="mr-2" />
              </th>
              <th className="py-3 px-2 text-left text-xs text-gray-600 font-semibold">写真</th>
              <th className="py-3 px-2 text-left text-xs text-gray-600 font-semibold">女性名</th>
              <th className="py-3 px-2 text-left text-xs text-gray-600 font-semibold">年齢</th>
              <th className="desktop-only py-3 px-2 text-left text-xs text-gray-600 font-semibold">身長</th>
              <th className="desktop-only py-3 px-2 text-left text-xs text-gray-600 font-semibold">B</th>
              <th className="desktop-only py-3 px-2 text-left text-xs text-gray-600 font-semibold">W</th>
              <th className="desktop-only py-3 px-2 text-left text-xs text-gray-600 font-semibold">H</th>
              <th className="py-3 px-2 text-left text-xs text-gray-600 font-semibold">登録日</th>
              <th className="py-3 px-2 text-center text-xs text-gray-600 font-semibold">公開</th>
              <th className="py-3 px-2 text-center text-xs text-gray-600 font-semibold">操作</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <WomenListRow key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination-section flex justify-center items-center py-4 px-4 border-t border-gray-100 gap-2 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`py-1.5 px-3 border rounded text-sm cursor-pointer min-w-8 ${
              currentPage === page
                ? 'border-blue-700 bg-blue-700 text-white'
                : 'border-gray-200 bg-white text-gray-600'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-only {
            display: flex !important;
          }

          .desktop-only {
            display: none !important;
          }

          .header-section {
            flex-direction: column;
            align-items: stretch !important;
          }

          .action-buttons {
            justify-content: space-between;
          }

          .search-section {
            width: 100%;
            justify-content: space-between;
          }

          .search-box {
            flex: 1;
          }

          .mobile-btn {
            padding: 6px 12px !important;
            font-size: 12px !important;
          }

          .btn-text {
            display: inline;
          }

          .table-wrapper {
            margin: 0 -16px;
            padding: 0 16px;
          }

          th, td {
            font-size: 11px !important;
            padding: 8px 4px !important;
          }
        }

        @media (max-width: 480px) {
          .btn-text {
            display: none;
          }

          .mobile-btn {
            padding: 8px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default WomenListResponsive;
