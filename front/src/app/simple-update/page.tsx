'use client';

import React, { useState } from 'react';
import { Search, Trash2, Eye, Plus } from 'lucide-react';

interface UpdateHistoryItem {
  id: number;
  date: string;
  time: string;
  title: string;
  gender: string;
  label: string;
}

const UPDATE_HISTORY_DATA: UpdateHistoryItem[] = [
  {
    id: 1,
    date: '2024/01/23',
    time: '17:44',
    title: '※テンプレートが削除されました',
    gender: 'まよ',
    label: '新人'
  },
  {
    id: 2,
    date: '2024/01/22',
    time: '19:44',
    title: '◆新人出勤情報◆急遽招集トミ人気！！',
    gender: '',
    label: '新人'
  }
];

const SimpleUpdatePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = UPDATE_HISTORY_DATA.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-3 md:p-5 min-h-screen bg-gray-100">
      {/* New Post Button */}
      <div className="mb-4">
        <button className="inline-flex items-center gap-1.5 py-2.5 px-4 md:px-5 bg-green-500 text-white border-none rounded-full text-xs md:text-sm font-medium cursor-pointer transition-colors hover:bg-green-600">
          <Plus size={16} className="md:w-[18px] md:h-[18px]" />
          新規投稿
        </button>
      </div>

      {/* Main Card Container */}
      <div className="bg-white border border-gray-200 rounded overflow-hidden">
        {/* Title Section */}
        <div className="py-4 px-5 border-b border-gray-200">
          <h2 className="m-0 text-lg font-semibold text-gray-800">
            過去の更新履歴
          </h2>
        </div>

        {/* Search Bar and Button Section */}
        <div className="p-3 md:p-4 px-4 md:px-5 bg-white flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="relative flex-1 max-w-full md:max-w-md">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-700"
            />
            <input
              type="text"
              placeholder="タイトル・テンプレート名で検索"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2.5 pr-3 pl-9 border border-gray-200 rounded-full text-xs md:text-sm outline-none bg-white text-gray-800 transition-colors focus:border-blue-700"
            />
          </div>

          <button className="py-2 px-4 bg-transparent text-blue-700 border-none rounded text-xs md:text-sm font-normal cursor-pointer flex items-center gap-1.5 transition-colors hover:bg-blue-50 self-end md:self-auto">
            <Trash2 size={14} className="md:w-4 md:h-4" />
            選択削除
          </button>
        </div>

        {/* Table Header - Hidden on mobile, use card layout instead */}
        <div className="hidden md:grid grid-cols-[40px_140px_1fr_120px_120px] py-3 px-5 bg-white border-b border-gray-200 text-sm font-normal text-gray-600">
          <div></div>
          <div className="flex items-center gap-1">
            更新日時
            <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4px] border-t-gray-600" />
          </div>
          <div>タイトル/テンプレート名</div>
          <div className="text-center">女性</div>
          <div className="text-center flex items-center justify-center gap-1">
            ラベル
            <div className="w-2 h-2 rounded-full bg-blue-500" />
          </div>
        </div>

        {/* History Rows */}
        {filteredHistory.map((item, index) => (
          <div key={item.id}>
            {/* Desktop Layout */}
            <div
              className={`hidden md:grid grid-cols-[40px_140px_1fr_120px_120px] py-3 px-5 items-center bg-white ${
                index === filteredHistory.length - 1 ? '' : 'border-b border-gray-200'
              }`}
            >
              {/* Eye Icon Column */}
              <div className="text-center">
                {index === 1 && (
                  <Eye
                    size={16}
                    className="text-blue-700 cursor-pointer"
                  />
                )}
              </div>

              {/* Date and Time */}
              <div className="text-sm text-gray-800 font-normal">
                {item.date} {item.time}
              </div>

              {/* Title with colored text */}
              <div className={`text-sm font-normal ${
                item.title.includes('削除されました') ? 'text-red-700' : 'text-gray-800'
              }`}>
                {item.title}
              </div>

              {/* Gender */}
              <div className="text-sm text-gray-800 text-center">
                {item.gender}
              </div>

              {/* Label */}
              <div className="text-center">
                <span className="py-1 px-3 bg-white text-blue-700 border border-blue-700 rounded-xl text-xs font-normal inline-block">
                  {item.label}
                </span>
              </div>
            </div>

            {/* Mobile Card Layout */}
            <div className={`md:hidden p-4 bg-white ${
              index === filteredHistory.length - 1 ? '' : 'border-b border-gray-200'
            }`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {index === 1 && (
                    <Eye size={16} className="text-blue-700 cursor-pointer" />
                  )}
                  <div className="text-xs text-gray-600">
                    {item.date} {item.time}
                  </div>
                </div>
                <span className="py-1 px-2 bg-white text-blue-700 border border-blue-700 rounded-xl text-xs font-normal">
                  {item.label}
                </span>
              </div>
              <div className={`text-sm font-normal mb-1 ${
                item.title.includes('削除されました') ? 'text-red-700' : 'text-gray-800'
              }`}>
                {item.title}
              </div>
              {item.gender && (
                <div className="text-xs text-gray-600">
                  女性: {item.gender}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleUpdatePage;
