'use client';

import React, { useState } from 'react';
import { Search, Settings, Trash2, ExternalLink, HelpCircle, AlertTriangle, ChevronDown, ArrowUpDown } from 'lucide-react';

interface GirlData {
  id: string;
  image: string;
  name: string;
}

interface SiteData {
  id: string;
  name: string;
  lastUpdated: string;
}

const GirlSiteDeletePage: React.FC = () => {
  const [girlSearchTerm, setGirlSearchTerm] = useState('');
  const [siteSearchTerm, setSiteSearchTerm] = useState('');
  const [selectedGirls, setSelectedGirls] = useState<string[]>([]);
  const [selectedSites, setSelectedSites] = useState<string[]>([]);
  const [selectAllGirls, setSelectAllGirls] = useState(false);
  const [selectAllSites, setSelectAllSites] = useState(false);

  const girlsData: GirlData[] = [
    { id: '1', image: '/placeholder.jpg', name: '瑠璃-ruri-' },
    { id: '2', image: '/placeholder.jpg', name: '彩羽-ayaha-' },
    { id: '3', image: '/placeholder.jpg', name: 'えれな' },
    { id: '4', image: '/placeholder.jpg', name: 'ミルク' },
    { id: '5', image: '/placeholder.jpg', name: 'ラブリ' },
  ];

  const sitesData: SiteData[] = [
    { id: '1', name: 'KFJ京都風俗情報', lastUpdated: '2025/11/30 19:04' },
    { id: '2', name: 'シティヘブンネット', lastUpdated: '2025/11/30 19:04' },
    { id: '3', name: 'デリヘルタウン', lastUpdated: '2025/11/30 19:04' },
    { id: '4', name: 'ぴゅあらば', lastUpdated: '2025/11/30 19:04' },
    { id: '5', name: 'マンゾクネット', lastUpdated: '2025/11/30 19:04' },
    { id: '6', name: '駅ちか人気！風俗ランキング', lastUpdated: '2025/11/30 19:03' },
    { id: '7', name: '口コミ風俗情報局(プランによる)', lastUpdated: '2025/11/30 19:04' },
  ];

  const toggleGirlSelection = (id: string) => {
    setSelectedGirls((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const toggleSiteSelection = (id: string) => {
    setSelectedSites((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSelectAllGirls = () => {
    if (selectAllGirls) {
      setSelectedGirls([]);
    } else {
      setSelectedGirls(girlsData.map((g) => g.id));
    }
    setSelectAllGirls(!selectAllGirls);
  };

  const handleSelectAllSites = () => {
    if (selectAllSites) {
      setSelectedSites([]);
    } else {
      setSelectedSites(sitesData.map((s) => s.id));
    }
    setSelectAllSites(!selectAllSites);
  };

  return (
    <div className="h-[calc(100vh-48px)] bg-[#f5f5f5] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 md:p-5 bg-[#f5f5f5]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-end gap-3">
          {/* Right: Action buttons */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 py-2 px-4 bg-white border border-[#e0e0e0] rounded text-sm text-[#333] cursor-pointer hover:bg-gray-50 transition-colors">
              <Settings size={16} className="text-[#666]" />
              更新結果を見る
            </button>
            <button className="flex items-center gap-2 py-2.5 px-5 bg-[#EF5350] text-white border-none rounded-full text-sm font-medium cursor-pointer hover:bg-[#E53935] transition-all">
              <Trash2 size={16} />
              一括削除
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 md:px-5 pb-5 overflow-hidden">
        <div className="bg-white border-2 border-[#EF5350] rounded overflow-hidden h-full flex flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-2 flex-1 overflow-hidden">
            {/* Left Panel - Girls List */}
            <div className="p-5 border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-col overflow-hidden">
              {/* Panel Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[15px] font-bold text-[#EF5350]">どの女性をサイトから削除しますか？</h2>
                <div className="flex items-center gap-2">
                  <AlertTriangle size={16} className="text-[#FFC107]" />
                  <span className="text-sm text-[#666]">Mr.venreyからは削除されません</span>
                  <HelpCircle size={14} className="text-[#2196F3] cursor-pointer" />
                </div>
              </div>

              {/* Search and Count */}
              <div className="flex items-center justify-between mb-4 gap-4">
                <div className="relative flex-1 max-w-[320px]">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]" />
                  <input
                    type="text"
                    placeholder="女性名で検索"
                    value={girlSearchTerm}
                    onChange={(e) => setGirlSearchTerm(e.target.value)}
                    className="w-full py-2.5 pl-10 pr-4 border border-[#e0e0e0] rounded-full text-sm outline-none focus:border-[#EF5350] bg-[#fafafa] text-[#333] placeholder-[#999]"
                  />
                </div>
                <span className="text-sm text-[#666] whitespace-nowrap">
                  選択中 {selectedGirls.length} / 300人中
                </span>
              </div>

              {/* Table Header */}
              <div className="flex items-center gap-3 py-2.5 px-1 border-b border-[#e0e0e0]">
                <input
                  type="checkbox"
                  checked={selectAllGirls}
                  onChange={handleSelectAllGirls}
                  className="w-4 h-4 rounded border-[#ccc]"
                />
                <button className="flex items-center text-[#666] hover:text-[#333]">
                  <ChevronDown size={16} />
                </button>
                <span className="text-sm text-[#666]">名前</span>
              </div>

              {/* Girls List */}
              <div className="flex-1 overflow-y-auto card-scroll">
                {girlsData.map((girl) => (
                  <div
                    key={girl.id}
                    className="flex items-center gap-4 py-3 px-1 border-b border-[#f0f0f0] hover:bg-[#fafafa] transition-colors cursor-pointer"
                    onClick={() => toggleGirlSelection(girl.id)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedGirls.includes(girl.id)}
                      onChange={() => toggleGirlSelection(girl.id)}
                      className="w-4 h-4 rounded border-[#ccc]"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="w-[50px] h-[65px] bg-[#f0f0f0] rounded overflow-hidden flex-shrink-0">
                      <div className="w-full h-full bg-gradient-to-b from-[#e57373] to-[#c62828] flex items-center justify-center">
                        <span className="text-white text-[8px]">No Image</span>
                      </div>
                    </div>
                    <span className="text-sm text-[#333]">{girl.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Panel - Sites List */}
            <div className="p-5 bg-[#ffebee] flex flex-col overflow-hidden">
              {/* Panel Header */}
              <div className="mb-4">
                <h2 className="text-[15px] font-bold text-[#EF5350]">どのサイトから削除しますか？</h2>
              </div>

              {/* Search and Count */}
              <div className="flex items-center justify-between mb-4 gap-4">
                <div className="relative flex-1 max-w-[320px]">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]" />
                  <input
                    type="text"
                    placeholder="サイト名で検索"
                    value={siteSearchTerm}
                    onChange={(e) => setSiteSearchTerm(e.target.value)}
                    className="w-full py-2.5 pl-10 pr-4 border border-[#e0e0e0] rounded-full text-sm outline-none focus:border-[#EF5350] bg-white text-[#333] placeholder-[#999]"
                  />
                </div>
                <span className="text-sm text-[#666] whitespace-nowrap">
                  選択中 {selectedSites.length} / 8件中
                </span>
              </div>

              {/* Table Header */}
              <div className="flex items-center justify-between py-2.5 px-1 border-b border-[#e0e0e0]">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectAllSites}
                    onChange={handleSelectAllSites}
                    className="w-4 h-4 rounded border-[#ccc]"
                  />
                  <button className="flex items-center text-[#666] hover:text-[#333]">
                    <ChevronDown size={16} />
                  </button>
                  <span className="text-sm text-[#666]">サイト名</span>
                  <ArrowUpDown size={14} className="text-[#999]" />
                </div>
                <div className="flex items-center gap-1.5 text-sm text-[#666]">
                  最終更新日
                  <ArrowUpDown size={14} className="text-[#999]" />
                </div>
              </div>

              {/* Sites List */}
              <div className="flex-1 overflow-y-auto card-scroll">
                {sitesData.map((site) => (
                  <div
                    key={site.id}
                    className="flex items-center justify-between py-3.5 px-1 border-b border-[#f5f5f5] hover:bg-[#fff5f5] transition-colors cursor-pointer"
                    onClick={() => toggleSiteSelection(site.id)}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={selectedSites.includes(site.id)}
                        onChange={() => toggleSiteSelection(site.id)}
                        className="w-4 h-4 rounded border-[#ccc]"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <span className="text-sm text-[#333]">{site.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#1976D2]">{site.lastUpdated}</span>
                      <ExternalLink size={14} className="text-[#1976D2]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GirlSiteDeletePage;
