'use client';

import React from 'react';

const TableHeader: React.FC = () => {
  return (
    <div className="hidden md:grid grid-cols-[60px_100px_20px_1fr_140px_100px_60px_60px] py-3 px-4 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-600 items-center">
      <div></div>
      <div className="flex items-center gap-1">
        タイマー
        <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-600" />
      </div>
      <div></div>
      <div className="flex items-center gap-1">
        コンテンツ名
        <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-600" />
      </div>
      <div className="flex items-center gap-1 justify-center">
        最終更新日
        <div className="w-2 h-2 rounded-full bg-blue-500" />
      </div>
      <div className="flex items-center gap-1 justify-center">
        種別
        <div className="w-2 h-2 rounded-full bg-blue-500" />
      </div>
      <div className="flex items-center gap-1 justify-center">
        上位
        <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-600" />
      </div>
      <div className="flex items-center gap-1 justify-center">
        メモ
        <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-600" />
      </div>
    </div>
  );
};

export default TableHeader;
