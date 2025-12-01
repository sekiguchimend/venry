'use client';

import React, { useState } from 'react';
import { Search, Download, Settings, RefreshCw, Upload, Trash2, SlidersHorizontal, HelpCircle } from 'lucide-react';

interface SiteStatus {
  status: 'registered' | 'unregistered' | 'add-planned' | 'delete-planned' | 'site-only' | 'error';
}

interface GirlData {
  id: string;
  image: string;
  name: string;
  isPublic: boolean;
  sites: SiteStatus[];
}

interface SiteInfo {
  name: string;
  lastUpdated: string;
  totalCount: number;
  unregisteredCount: number;
  siteOnlyCount: number;
}

const GirlStatusPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDifferenceOnly, setShowDifferenceOnly] = useState(false);

  const sites: SiteInfo[] = [
    { name: 'KFJ京都風俗情報', lastUpdated: '18日前', totalCount: 120, unregisteredCount: 166, siteOnlyCount: 0 },
    { name: 'ぴゅあらば', lastUpdated: '18日前', totalCount: 276, unregisteredCount: 13, siteOnlyCount: 3 },
    { name: 'シティヘブンネット', lastUpdated: '18日前', totalCount: 271, unregisteredCount: 18, siteOnlyCount: 3 },
    { name: 'デリヘルタウン', lastUpdated: '18日前', totalCount: 276, unregisteredCount: 13, siteOnlyCount: 3 },
    { name: 'マンゾクネット', lastUpdated: '18日前', totalCount: 276, unregisteredCount: 13, siteOnlyCount: 3 },
    { name: '口コミ風俗情報局(プランによる)', lastUpdated: '18日前', totalCount: 271, unregisteredCount: 18, siteOnlyCount: 3 },
    { name: '風俗じゃぱん！', lastUpdated: '18日前', totalCount: 10, unregisteredCount: 276, siteOnlyCount: 0 },
    { name: '駅ちか人気！風俗ランキング', lastUpdated: '18日前', totalCount: 200, unregisteredCount: 88, siteOnlyCount: 2 },
  ];

  const girlsData: GirlData[] = [
    { id: '1', image: '/placeholder.jpg', name: '瑠璃-ruri-', isPublic: true, sites: [
      { status: 'registered' }, { status: 'registered' }, { status: 'registered' }, { status: 'registered' }, { status: 'registered' }, { status: 'registered' }, { status: 'registered' }, { status: 'registered' }
    ]},
    { id: '2', image: '/placeholder.jpg', name: '彩羽-ayaha-', isPublic: true, sites: [
      { status: 'registered' }, { status: 'registered' }, { status: 'registered' }, { status: 'registered' }, { status: 'registered' }, { status: 'registered' }, { status: 'unregistered' }, { status: 'registered' }
    ]},
    { id: '3', image: '/placeholder.jpg', name: 'えれな', isPublic: true, sites: [
      { status: 'unregistered' }, { status: 'registered' }, { status: 'registered' }, { status: 'registered' }, { status: 'registered' }, { status: 'registered' }, { status: 'unregistered' }, { status: 'registered' }
    ]},
    { id: '4', image: '/placeholder.jpg', name: 'ミルク', isPublic: true, sites: [
      { status: 'registered' }, { status: 'registered' }, { status: 'registered' }, { status: 'registered' }, { status: 'registered' }, { status: 'registered' }, { status: 'unregistered' }, { status: 'registered' }
    ]},
    { id: '5', image: '/placeholder.jpg', name: 'ラブリ', isPublic: true, sites: [
      { status: 'registered' }, { status: 'registered' }, { status: 'registered' }, { status: 'registered' }, { status: 'registered' }, { status: 'registered' }, { status: 'unregistered' }, { status: 'registered' }
    ]},
    { id: '6', image: '/placeholder.jpg', name: 'ひな', isPublic: true, sites: [
      { status: 'registered' }, { status: 'registered' }, { status: 'registered' }, { status: 'registered' }, { status: 'registered' }, { status: 'registered' }, { status: 'unregistered' }, { status: 'registered' }
    ]},
    { id: '7', image: '/placeholder.jpg', name: 'のあ', isPublic: true, sites: [
      { status: 'registered' }, { status: 'registered' }, { status: 'registered' }, { status: 'registered' }, { status: 'registered' }, { status: 'registered' }, { status: 'unregistered' }, { status: 'registered' }
    ]},
  ];

  const renderStatusIcon = (status: SiteStatus['status']) => {
    switch (status) {
      case 'registered':
        return (
          <div className="w-6 h-6 rounded-full border-2 border-blue-500 flex items-center justify-center">
          </div>
        );
      case 'unregistered':
        return (
          <span className="text-red-500 text-lg font-bold">×</span>
        );
      case 'add-planned':
        return (
          <div className="w-6 h-6 rounded-full border-2 border-blue-500 border-dashed flex items-center justify-center">
          </div>
        );
      case 'delete-planned':
        return (
          <span className="text-red-500 text-lg font-bold">×</span>
        );
      case 'site-only':
        return (
          <span className="text-orange-500 text-lg font-bold">▲</span>
        );
      case 'error':
        return (
          <span className="text-gray-500 text-lg font-bold">⑦</span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 md:p-5 min-h-screen bg-gray-100">
      {/* Top Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center gap-1.5 py-2 px-4 bg-green-600 text-white border-none rounded-full text-sm font-medium cursor-pointer hover:bg-green-700 transition-colors">
            <Download size={16} />
            全読み込み
          </button>
          <button className="flex items-center gap-1.5 py-2 px-4 bg-white text-gray-700 border border-gray-300 rounded text-sm cursor-pointer hover:bg-gray-50 transition-colors">
            <Settings size={16} />
            ツール
          </button>
        </div>

        <button className="flex items-center gap-1.5 py-2 px-4 bg-gray-300 text-gray-500 border-none rounded text-sm cursor-not-allowed" disabled>
          変更を反映
        </button>
      </div>

      {/* Main Content Card */}
      <div className="bg-white border border-gray-200 rounded overflow-hidden">
        {/* Search Row */}
        <div className="p-4 border-b border-gray-100">
          <div className="relative w-full md:w-[300px] mb-3">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="女性名で検索"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-10 pr-10 border border-gray-200 rounded text-sm outline-none focus:border-blue-500"
            />
            <SlidersHorizontal size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" />
          </div>

          {/* Checkbox */}
          <label className="flex items-center gap-2 cursor-pointer mb-4">
            <input
              type="checkbox"
              checked={showDifferenceOnly}
              onChange={(e) => setShowDifferenceOnly(e.target.checked)}
              className="w-4 h-4 border-gray-300 rounded"
            />
            <span className="text-sm text-blue-600">差異があるサイトのみ表示</span>
          </label>

          {/* Legend */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-full border-2 border-blue-500"></div>
              <span>...登録済</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-full border-2 border-blue-500 border-dashed"></div>
              <span>...追加予定</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-blue-500 font-bold">+</span>
              <span>...追加</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-red-500 font-bold">×</span>
              <span>...未登録</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-red-400 font-bold">×</span>
              <span>...削除予定</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-red-600">■</span>
              <span>...削除</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-orange-500 font-bold">▲</span>
              <span>...サイトのみ存在</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-500">⑦</span>
              <span>...読み込みエラー</span>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px] border-collapse" style={{ tableLayout: 'fixed' }}>
            <colgroup>
              <col style={{ width: '220px' }} />
              {sites.map((_, index) => (
                <col key={index} style={{ width: '110px' }} />
              ))}
            </colgroup>
            {/* Site Headers */}
            <thead>
              <tr>
                <th className="sticky left-0 bg-white z-10 p-3 text-left text-xs font-normal text-gray-600 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <span>名前</span>
                    <span className="text-blue-600 flex items-center gap-1">
                      一括操作
                      <HelpCircle size={14} className="text-blue-500" />
                    </span>
                  </div>
                </th>
                {sites.map((site, index) => (
                  <th key={index} className="p-2 text-center border-b border-gray-200 align-bottom">
                    <div className="flex flex-col items-center">
                      <button className="flex items-center gap-1 text-xs text-blue-600 hover:underline mb-1">
                        <RefreshCw size={12} />
                        再読み込み
                      </button>
                      <span className="text-xs text-gray-500 mb-1">{site.lastUpdated}</span>
                      <span className="text-xs text-gray-800 font-normal leading-tight">{site.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
              {/* Count Row */}
              <tr className="bg-gray-800 text-white">
                <td className="sticky left-0 bg-gray-800 z-10"></td>
                {sites.map((site, index) => (
                  <td key={index} className="p-2 text-center text-sm font-medium">
                    {site.totalCount}人
                  </td>
                ))}
              </tr>
              {/* Unregistered Count Row */}
              <tr className="bg-white border-b border-gray-200">
                <td className="sticky left-0 bg-white z-10"></td>
                {sites.map((site, index) => (
                  <td key={index} className="p-2 text-center">
                    <div className="flex items-center justify-center gap-2 text-xs">
                      <span className="text-red-500 flex items-center gap-0.5">
                        <span className="font-bold">×</span>
                        {site.unregisteredCount}人
                      </span>
                      <span className="text-orange-500 flex items-center gap-0.5">
                        <span className="font-bold">▲</span>
                        {site.siteOnlyCount}人
                      </span>
                    </div>
                  </td>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {girlsData.map((girl) => (
                <tr key={girl.id} className="border-b border-gray-100 hover:bg-gray-50">
                  {/* Name Column - Sticky */}
                  <td className="sticky left-0 bg-white z-10 p-3 border-r border-gray-100">
                    <div className="flex items-center gap-3">
                      {/* Image */}
                      <div className="w-10 h-12 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                        <div className="w-full h-full bg-gradient-to-b from-red-300 to-red-400 flex items-center justify-center">
                          <span className="text-white text-[6px]">No Image</span>
                        </div>
                      </div>

                      {/* Name and Status */}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-gray-800 font-medium">{girl.name}</div>
                        <div className="text-xs text-gray-500">公開中</div>
                      </div>

                      {/* Action Icons */}
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-700">
                          <Upload size={16} />
                        </button>
                        <button className="text-red-500 hover:text-red-600">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </td>

                  {/* Site Status Columns */}
                  {girl.sites.map((site, index) => (
                    <td key={index} className="p-3">
                      <div className="flex items-center justify-center">
                        {renderStatusIcon(site.status)}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GirlStatusPage;
