'use client';

import React, { useState } from 'react';
import { Search, Settings, Plus } from 'lucide-react';
import { TabKey, TabItem } from '../../types/content-update';
import { getTabContent, getItemCount, shouldShowGroupButtons } from './utils/tabContentFactory';
import TableHeader from './components/TableHeader';
import GroupButtons from './components/GroupButtons';
import PaginationControls from './components/PaginationControls';

const ContentUpdatePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('content-list');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const tabs: TabItem[] = [
    { key: 'content-list', label: 'コンテンツ一覧' },
    { key: 'monthly-site', label: '月末通り貫通サイト運営' },
    { key: 'female-recruitment', label: '女性求人' },
    { key: 'male-recruitment', label: '男性求人' }
  ];

  return (
    <div className="p-3 md:p-5 min-h-screen bg-gray-100">
      {/* Header Buttons Section */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between mb-5 gap-3">
        <div className="flex flex-wrap gap-2 md:gap-3 items-center">
          <button className="py-2 px-3 md:px-4 bg-white border border-gray-200 rounded text-xs md:text-sm text-gray-800 cursor-pointer flex items-center gap-1 transition-colors hover:bg-gray-50">
            <Settings size={14} className="md:w-4 md:h-4" />
            <span className="hidden sm:inline">まとめて更新設定</span>
            <span className="sm:hidden">更新設定</span>
          </button>

          <button className="py-2 px-3 md:px-4 bg-white border border-gray-200 rounded text-xs md:text-sm text-gray-800 cursor-pointer flex items-center gap-1 transition-colors hover:bg-gray-50">
            <Settings size={14} className="md:w-4 md:h-4" />
            ツール
          </button>

          <button className="py-2 px-3 md:px-4 bg-white border border-gray-200 rounded text-xs md:text-sm text-gray-800 cursor-pointer flex items-center gap-1 transition-colors hover:bg-gray-50">
            <Settings size={14} className="md:w-4 md:h-4" />
            <span className="hidden sm:inline">更新情報を見る!</span>
            <span className="sm:hidden">更新情報</span>
          </button>
        </div>

        <div className="flex items-center gap-2 bg-white py-2 px-3 rounded border border-gray-200 self-end md:self-auto">
          <span className="text-xs md:text-sm text-gray-800 font-medium">
            24時間更新
          </span>
          <Settings size={14} className="md:w-4 md:h-4 text-gray-600" />
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white border border-gray-200 rounded overflow-hidden">
        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-4 px-4 md:px-6 border-0 bg-white text-xs md:text-sm cursor-pointer transition-all whitespace-nowrap flex-shrink-0 relative ${
                activeTab === tab.key
                  ? 'text-blue-700 font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-blue-700'
                  : 'text-gray-600 font-normal'
              }`}
            >
              <span className="hidden md:inline">{tab.label}</span>
              <span className="md:hidden">
                {tab.key === 'content-list' && 'コンテンツ'}
                {tab.key === 'monthly-site' && '月末サイト'}
                {tab.key === 'female-recruitment' && '女性求人'}
                {tab.key === 'male-recruitment' && '男性求人'}
              </span>
            </button>
          ))}
          <button
            onClick={() => setActiveTab('group-create')}
            className={`py-3 px-4 md:px-4 border-none bg-white cursor-pointer text-sm transition-colors hover:bg-gray-50 flex-shrink-0 relative ${
              activeTab === 'group-create'
                ? 'text-blue-700 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-blue-700'
                : 'text-gray-600'
            }`}
          >
            <Plus size={14} className="md:w-4 md:h-4" />
          </button>
        </div>

        {/* Search Bar and Pagination Row - Hide for group-create */}
        {activeTab !== 'group-create' && (
          <div className="p-3 md:p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between border-b border-gray-100 gap-3">
            {/* Search Bar */}
            <div className="relative w-full md:w-[350px]">
              <Search
                size={16}
                className="md:w-[18px] md:h-[18px] absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
              />
              <input
                type="text"
                placeholder="コンテンツ名で検索"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 pr-10 pl-10 border border-gray-200 rounded-full text-xs md:text-sm outline-none transition-colors focus:border-blue-700"
              />
            </div>

            {/* Pagination and Count */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4">
              <div className="flex items-center justify-between sm:justify-start gap-3">
                {shouldShowGroupButtons(activeTab) && <GroupButtons />}

                <div className="text-xs md:text-sm text-gray-600">
                  {getItemCount(activeTab)}
                </div>
              </div>

              <div className="flex justify-center sm:justify-end">
                <PaginationControls
                  activeTab={activeTab}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
          </div>
        )}

        {/* Table Header - Hide for group-create */}
        {activeTab !== 'group-create' && <TableHeader />}

        {/* Tab Content */}
        {getTabContent(activeTab)}
      </div>
    </div>
  );
};

export default ContentUpdatePage;
