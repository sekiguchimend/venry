'use client';

import React, { useState } from 'react';
import { Search, Edit, Plus } from 'lucide-react';

const TemplatePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('template-list');
  const [searchTerm, setSearchTerm] = useState('');

  const templates = [
    {
      no: 1,
      image: '/images/template1.png',
      name: '5月くじイベント',
      hasWoman: false,
      hasNotice: false,
      hasMemo: false
    },
    {
      no: 2,
      image: '/images/template2.png',
      name: '【SUPER RALLY】※使用不可！使用時は要確集！',
      hasWoman: false,
      hasNotice: false,
      hasMemo: false
    },
    {
      no: 3,
      image: '/images/template3.png',
      name: 'スーパータイム割！※使用不可！使用時は要確集！',
      hasWoman: false,
      hasNotice: false,
      hasMemo: false
    }
  ];

  return (
    <div className="p-3 md:p-5 min-h-screen bg-gray-100">
      {/* Header Button Section */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between mb-5 gap-3">
        <button className="py-2 px-3 md:px-4 bg-green-500 border-none rounded-full text-xs md:text-sm text-white cursor-pointer flex items-center gap-1 transition-colors hover:bg-green-600 self-start">
          <Plus size={14} className="md:w-4 md:h-4" />
          新規登録
        </button>

        <div className="text-xs md:text-sm text-gray-600 text-center md:text-right">
          <a href="#" className="text-blue-700 underline">グループ型配信</a>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('template-list')}
            className={`py-3 px-3 md:px-6 border-none bg-white text-xs md:text-sm font-medium cursor-pointer transition-all whitespace-nowrap ${
              activeTab === 'template-list'
                ? 'text-blue-700 border-b-[3px] border-b-blue-700 font-medium'
                : 'text-gray-600 border-b-[3px] border-b-transparent font-normal'
            }`}
          >
            <span className="hidden md:inline">テンプレート一覧</span>
            <span className="md:hidden">テンプレート</span>
          </button>
          <button
            onClick={() => setActiveTab('regularly-used-folder')}
            className={`py-3 px-3 md:px-6 border-none bg-white text-xs md:text-sm cursor-pointer transition-all whitespace-nowrap ${
              activeTab === 'regularly-used-folder'
                ? 'text-blue-700 border-b-[3px] border-b-blue-700 font-medium'
                : 'text-gray-600 border-b-[3px] border-b-transparent font-normal'
            }`}
          >
            <span className="hidden md:inline">定期用中フォルダ</span>
            <span className="md:hidden">定期用</span>
          </button>
          <button
            onClick={() => setActiveTab('usage-disabled')}
            className={`py-3 px-3 md:px-6 border-none bg-white text-xs md:text-sm cursor-pointer transition-all whitespace-nowrap ${
              activeTab === 'usage-disabled'
                ? 'text-blue-700 border-b-[3px] border-b-blue-700 font-medium'
                : 'text-gray-600 border-b-[3px] border-b-transparent font-normal'
            }`}
          >
            <span className="hidden md:inline">の要確集・使用不可</span>
            <span className="md:hidden">使用不可</span>
          </button>
          <button className="py-3 px-3 md:px-4 border-none bg-white text-gray-600 cursor-pointer text-sm transition-colors hover:bg-gray-50">
            <Plus size={14} className="md:w-4 md:h-4" />
          </button>
        </div>

        {/* Search Bar and Actions Row */}
        <div className="p-3 md:p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between border-b border-gray-100 gap-3">
          {/* Search Bar */}
          <div className="relative w-full md:w-[350px]">
            <Search
              size={16}
              className="md:w-[18px] md:h-[18px] absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
            />
            <input
              type="text"
              placeholder="テンプレート名で検索"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pr-10 pl-10 border border-gray-200 rounded-full text-xs md:text-sm outline-none transition-colors focus:border-blue-700"
            />
          </div>

          {/* Action Links */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 md:gap-4">
            <a href="#" className="text-xs md:text-sm text-blue-700 no-underline flex items-center gap-1">
              🔄 <span className="hidden sm:inline">テンプレート並び替え</span><span className="sm:hidden">並び替え</span>
            </a>
            <a href="#" className="text-xs md:text-sm text-blue-700 no-underline flex items-center gap-1">
              📁 選択削除
            </a>
            <div className="text-xs md:text-sm text-gray-600 text-center sm:text-left">
              登録件数29/上限400件
            </div>
          </div>
        </div>

        {/* Table Header - Hidden on mobile */}
        <div className="hidden md:grid grid-cols-[50px_40px_80px_1fr_100px_100px_80px] py-3 px-4 bg-gray-50 border-b border-gray-200 text-xs font-normal text-gray-600 items-center">
          <div></div>
          <div className="text-center">No.</div>
          <div className="text-center">画像</div>
          <div className="pl-2">テンプレート名</div>
          <div className="text-center flex items-center justify-center gap-1">
            女性
            <div className="w-3.5 h-3.5 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center font-bold">
              ?
            </div>
          </div>
          <div className="text-center flex items-center justify-center gap-1">
            ラベル
            <div className="w-3.5 h-3.5 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center font-bold">
              ?
            </div>
          </div>
          <div className="text-center">メモ</div>
        </div>

        {/* Content Rows */}
        {templates.map((template) => (
          <div key={template.no}>
            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-[50px_40px_80px_1fr_100px_100px_80px] py-2 px-4 border-b border-gray-100 items-center min-h-[60px]">
              {/* Edit Button */}
              <div className="flex items-center justify-center">
                <button className="flex items-center gap-0.5 py-0.5 px-1.5 bg-transparent text-blue-700 border-none rounded-sm text-[11px] cursor-pointer font-normal">
                  <Edit size={11} />
                  編集
                </button>
              </div>

              {/* Number */}
              <div className="text-center text-[13px] text-gray-800">
                {template.no}
              </div>

              {/* Image */}
              <div className="flex justify-center items-center">
                <div className="w-[60px] h-10 bg-gray-200 rounded-sm flex items-center justify-center">
                  {template.no === 1 && (
                    <div className="bg-gray-600 text-white py-0.5 px-1 rounded-sm text-[9px]">
                      画像
                    </div>
                  )}
                  {template.no === 2 && (
                    <div className="bg-yellow-400 text-gray-800 py-0.5 px-1 rounded-sm text-[8px] font-bold">
                      SUPER
                    </div>
                  )}
                  {template.no === 3 && (
                    <div className="bg-red-400 text-white py-0.5 px-1 rounded-sm text-[9px]">
                      タイム
                    </div>
                  )}
                </div>
              </div>

              {/* Template Name */}
              <div className="text-[13px] text-gray-800 pl-2 font-normal">
                {template.name}
              </div>

              {/* Woman Column */}
              <div className="text-center">
                {/* Empty for now */}
              </div>

              {/* Label Column */}
              <div className="flex items-center justify-center">
                {template.no === 1 && (
                  <button className="py-0.5 px-2 bg-transparent border border-gray-200 rounded-sm text-[11px] text-gray-600 cursor-pointer">
                    イベント
                  </button>
                )}
              </div>

              {/* Memo Column */}
              <div className="text-center">
                {/* Empty */}
              </div>
            </div>

            {/* Mobile Card Layout */}
            <div className="md:hidden p-4 border-b border-gray-100">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-12 h-8 bg-gray-200 rounded-sm flex items-center justify-center mb-2">
                    {template.no === 1 && (
                      <div className="bg-gray-600 text-white py-0.5 px-1 rounded-sm text-[8px]">
                        画像
                      </div>
                    )}
                    {template.no === 2 && (
                      <div className="bg-yellow-400 text-gray-800 py-0.5 px-1 rounded-sm text-[7px] font-bold">
                        SUPER
                      </div>
                    )}
                    {template.no === 3 && (
                      <div className="bg-red-400 text-white py-0.5 px-1 rounded-sm text-[8px]">
                        タイム
                      </div>
                    )}
                  </div>
                  <div className="text-center text-xs text-gray-600">
                    No.{template.no}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-sm text-gray-800 font-normal">
                      {template.name}
                    </div>
                    <button className="flex items-center gap-0.5 py-1 px-2 bg-transparent text-blue-700 border-none rounded-sm text-xs cursor-pointer font-normal ml-2">
                      <Edit size={12} />
                      編集
                    </button>
                  </div>
                  {template.no === 1 && (
                    <div className="flex items-center gap-2">
                      <button className="py-0.5 px-2 bg-transparent border border-gray-200 rounded-sm text-xs text-gray-600 cursor-pointer">
                        イベント
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatePage;
