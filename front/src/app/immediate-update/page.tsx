'use client';

import React, { useState } from 'react';
import { Search, Filter, MessageCircle, Eye, Upload } from 'lucide-react';

const ImmediateUpdatePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWomen, setSelectedWomen] = useState<string[]>([]);

  const womenData = [
    { id: '1', name: '瑞穂-ruri-', status: '出勤中', time: '17:00~' },
    { id: '2', name: '彩羽-ayaha-', status: '待機中', time: '18:00~' },
  ];

  return (
    <div className="p-3 md:p-5 min-h-screen bg-gray-100">
      {/* Header Buttons */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between mb-5 gap-3">
        <div className="flex gap-2 md:gap-3 flex-wrap">
          <button className="py-2 px-3 md:px-4 bg-green-500 text-white border-none rounded text-xs md:text-sm font-medium cursor-pointer flex items-center gap-2">
            <Upload size={14} className="md:w-4 md:h-4" />
            一括更新
          </button>
          <button className="py-2 px-3 md:px-4 bg-white border border-gray-200 rounded text-xs md:text-sm text-gray-700 cursor-pointer flex items-center gap-2">
            <Filter size={14} className="md:w-4 md:h-4" />
            詳細設定
          </button>
        </div>
        <div className="text-xs md:text-sm text-gray-600 text-center md:text-right">
          全{womenData.length}件
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Search Bar */}
        <div className="p-3 md:p-4 border-b border-gray-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-full md:max-w-md">
            <Search size={16} className="md:w-[18px] md:h-[18px] absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="女性名で検索"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-10 pr-4 border border-gray-200 rounded-full text-xs md:text-sm outline-none"
            />
          </div>
          <button className="py-2 px-4 bg-transparent border-none text-xs md:text-sm text-blue-700 cursor-pointer underline self-end md:self-auto">
            フィルター設定
          </button>
        </div>

        {/* Table Header - Hidden on mobile */}
        <div className="hidden md:grid grid-cols-[60px_80px_1fr_120px_120px_100px] px-4 py-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-600 items-center">
          <div className="text-center">
            <input type="checkbox" />
          </div>
          <div className="text-center">写真</div>
          <div className="pl-2">女性名</div>
          <div className="text-center">状態</div>
          <div className="text-center">出勤時間</div>
          <div className="text-center">操作</div>
        </div>

        {/* Table Rows */}
        {womenData.map((woman) => (
          <div key={woman.id}>
            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-[60px_80px_1fr_120px_120px_100px] px-4 py-3 border-b border-gray-100 items-center hover:bg-gray-50">
              <div className="flex justify-center">
                <input
                  type="checkbox"
                  checked={selectedWomen.includes(woman.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedWomen([...selectedWomen, woman.id]);
                    } else {
                      setSelectedWomen(selectedWomen.filter(id => id !== woman.id));
                    }
                  }}
                />
              </div>
              <div className="flex justify-center">
                <div className="w-14 h-14 bg-gray-200 rounded"></div>
              </div>
              <div className="pl-2">
                <div className="text-sm font-medium text-gray-800">{woman.name}</div>
              </div>
              <div className="text-center">
                <span className={`inline-block py-1 px-3 rounded-full text-xs font-medium ${
                  woman.status === '出勤中'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {woman.status}
                </span>
              </div>
              <div className="text-center text-sm text-gray-600">
                {woman.time}
              </div>
              <div className="flex justify-center gap-2">
                <button className="p-1.5 bg-transparent border-none text-blue-700 cursor-pointer">
                  <MessageCircle size={16} />
                </button>
                <button className="p-1.5 bg-transparent border-none text-gray-600 cursor-pointer">
                  <Eye size={16} />
                </button>
              </div>
            </div>

            {/* Mobile Card Layout */}
            <div className="md:hidden p-4 border-b border-gray-100 hover:bg-gray-50">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={selectedWomen.includes(woman.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedWomen([...selectedWomen, woman.id]);
                    } else {
                      setSelectedWomen(selectedWomen.filter(id => id !== woman.id));
                    }
                  }}
                  className="mt-1"
                />
                <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <div className="text-sm font-medium text-gray-800">{woman.name}</div>
                    <div className="flex gap-2 ml-2">
                      <button className="p-1 bg-transparent border-none text-blue-700 cursor-pointer">
                        <MessageCircle size={14} />
                      </button>
                      <button className="p-1 bg-transparent border-none text-gray-600 cursor-pointer">
                        <Eye size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <span className={`inline-block py-1 px-2 rounded-full font-medium ${
                      woman.status === '出勤中'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {woman.status}
                    </span>
                    <span>{woman.time}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-5">
        {[1, 2, 3, 4].map(page => (
          <button
            key={page}
            className="py-1.5 px-3 border border-gray-200 rounded bg-white text-sm text-gray-600 cursor-pointer hover:bg-gray-50"
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImmediateUpdatePage;
