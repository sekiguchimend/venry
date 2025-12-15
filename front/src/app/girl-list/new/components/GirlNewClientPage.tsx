'use client';

import React, { useMemo, useState } from 'react';
import {
  FileText,
  MessageSquare,
  Home,
  HelpCircle,
  Image as ImageIcon,
  Search,
  HelpCircle as QuestionIcon,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

import type { GirlNewTabId, SiteOption } from './types';
import SiteTab from './tabs/SiteTab';
import CommentTab from './tabs/CommentTab';
import BasicTab from './tabs/basic/BasicTab';
import QATab from './tabs/qa/QATab';

export default function GirlNewClientPage() {
  const [activeTab, setActiveTab] = useState<GirlNewTabId>('basic');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Site options（右サイドバー）
  const [siteOptions, setSiteOptions] = useState<SiteOption[]>([
    { id: '1', name: 'KFJ京都風俗情報', checked: true },
    { id: '2', name: 'シティヘブンネット', checked: true },
    { id: '3', name: 'デリヘルタウン', checked: true },
    { id: '4', name: 'ぴゅあらば', checked: true },
    { id: '5', name: 'マンゾクネット', checked: true, badge: '対応' },
    { id: '6', name: '駅ちか人気！風俗ランキング', checked: false },
    { id: '7', name: '口コミ風俗情報局(プランによる)', checked: true },
    { id: '8', name: '風俗じゃぱん！', checked: true },
  ]);

  const [siteSearch, setSiteSearch] = useState('');

  const handleSiteToggle = (id: string) => {
    setSiteOptions((prev) => prev.map((site) => (site.id === id ? { ...site, checked: !site.checked } : site)));
  };

  const handleAllSitesToggle = (checked: boolean) => {
    setSiteOptions((prev) => prev.map((site) => ({ ...site, checked })));
  };

  const selectedCount = useMemo(() => siteOptions.filter((s) => s.checked).length, [siteOptions]);

  const tabs = useMemo(
    () => [
      { id: 'basic' as const, label: '基本情報', icon: FileText },
      { id: 'comment' as const, label: 'コメント', icon: MessageSquare },
      { id: 'site' as const, label: '各サイト項目', icon: Home },
      { id: 'qa' as const, label: 'Q&A項目', icon: HelpCircle },
      { id: 'image' as const, label: '画像', icon: ImageIcon },
    ],
    [],
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Warning Banner */}
      <div className="bg-orange-50 border-b border-orange-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-orange-500">▲</span>
          <span className="text-orange-600 text-sm">更新する際に必要な項目を埋めてください</span>
          <span className="text-orange-500 text-sm font-medium">必須項目未入力 9件</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-6 py-2 bg-gray-300 text-gray-500 rounded text-sm cursor-not-allowed" disabled>
            保存
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded flex items-center justify-center"
          >
            {sidebarOpen ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-4 overflow-auto">
          {/* Tabs */}
          <div className="bg-white border-b border-gray-200">
            <div className="flex">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-orange-500 text-gray-700'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white border border-t-0 border-gray-200 p-6">
            {activeTab === 'basic' && <BasicTab />}

            {activeTab === 'comment' && <CommentTab />}

            {activeTab === 'site' && <SiteTab />}

            {activeTab === 'qa' && <QATab siteOptions={siteOptions} />}

            {activeTab === 'image' && <div className="text-center text-gray-500 py-12">画像タブの内容</div>}
          </div>

          {/* Save Button at bottom */}
          <div className="flex justify-center py-6">
            <button className="px-8 py-2 bg-gray-300 text-gray-500 rounded text-sm cursor-not-allowed">保存</button>
          </div>
        </div>

        {/* Right Sidebar - Site Checker */}
        {sidebarOpen && (
          <div className="w-72 bg-white border-l border-gray-200 p-4 min-h-screen flex-shrink-0">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-gray-600">⋮≡ 必須項目チェッカー</span>
              <QuestionIcon size={14} className="text-blue-500" />
            </div>

            {/* Site Search */}
            <div className="relative mb-4">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="サイト名・URLで検索"
                value={siteSearch}
                onChange={(e) => setSiteSearch(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Selected Count */}
            <div className="text-sm text-gray-600 mb-4">
              選択中 {selectedCount} / {siteOptions.length}件中
            </div>

            {/* Site List */}
            <div className="space-y-3">
              {/* Select All */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCount === siteOptions.length}
                  onChange={(e) => handleAllSitesToggle(e.target.checked)}
                  className="w-4 h-4 border-gray-300 rounded text-blue-600"
                />
                <span className="text-sm text-gray-700">サイト名</span>
              </label>

              {/* Site Options */}
              {siteOptions.map((site) => (
                <label key={site.id} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={site.checked}
                    onChange={() => handleSiteToggle(site.id)}
                    className="w-4 h-4 border-gray-300 rounded text-blue-600"
                  />
                  <span className="text-sm text-gray-700">{site.name}</span>
                  {site.badge && (
                    <span className="text-xs text-orange-500 border border-orange-500 px-1.5 py-0.5 rounded">
                      {site.badge}
                    </span>
                  )}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


