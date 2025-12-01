'use client';

import React, { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import WomenListRow from './WomenListRow';
import { WomenListProps } from '../types/women-list';

const WomenList: React.FC<WomenListProps> = ({
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
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header Section */}
      <div className="flex items-center justify-between py-4 px-4 border-b border-gray-100">
        {/* Left side - Action buttons */}
        <div className="flex items-center gap-3">
          <button className="py-2 px-4 bg-green-700 border-none rounded-full text-sm text-white cursor-pointer flex items-center gap-1">
            <Plus size={16} />
            新規登録
          </button>

          <button className="py-2 px-4 bg-green-700 border-none rounded-full text-sm text-white cursor-pointer flex items-center gap-1">
            <Plus size={16} />
            女性取り込み
          </button>

          <button className="py-2 px-4 bg-transparent border border-gray-200 rounded-full text-sm text-gray-600 cursor-pointer flex items-center gap-1">
            <Filter size={16} />
            詳細設定
          </button>
        </div>

        {/* Right side - Search and count */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            全{totalCount}件
          </span>

          <div className="relative min-w-[200px]">
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

      {/* Table Header */}
      <div className="grid grid-cols-[60px_100px_60px_1fr_80px_120px_80px] py-3 px-4 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 items-center">
        <div className="py-3 px-4 text-left">
          <input type="checkbox" className="mr-2" />
        </div>
        <div className="py-3 px-2 text-left">写真</div>
        <div className="py-3 px-2 text-left">年齢</div>
        <div className="py-3 px-2 text-left">女性名</div>
        <div className="py-3 px-2 text-left">登録日</div>
        <div className="py-3 px-2 text-center">公開</div>
        <div className="py-3 px-2 text-center">操作</div>
      </div>

      {/* Women Rows */}
      {items.map(item => (
        <WomenListRow key={item.id} item={item} />
      ))}

      {/* Pagination */}
      <div className="flex justify-center items-center py-4 px-4 border-t border-gray-100 gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`py-1.5 px-3 border rounded ${
              currentPage === page
                ? 'border-blue-700 bg-blue-700 text-white'
                : 'border-gray-200 bg-white text-gray-600'
            } text-sm cursor-pointer min-w-8`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WomenList;
