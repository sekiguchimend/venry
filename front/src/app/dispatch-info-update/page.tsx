'use client';

import React, { useState, useEffect } from 'react';
import { Search, Settings, Upload, ExternalLink, HelpCircle, AlertTriangle, RefreshCw, ChevronDown, ChevronUp, ArrowUpDown } from 'lucide-react';
import { useSidebar } from '@/contexts/SidebarContext';

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

const DispatchInfoUpdatePage: React.FC = () => {
  const { isCollapsed } = useSidebar();
  const [girlSearchTerm, setGirlSearchTerm] = useState('');
  const [siteSearchTerm, setSiteSearchTerm] = useState('');
  const [selectedGirls, setSelectedGirls] = useState<string[]>([]);
  const [selectedSites, setSelectedSites] = useState<string[]>([]);
  const [sortByEdit, setSortByEdit] = useState(false);
  const [selectAllGirls, setSelectAllGirls] = useState(false);
  const [selectAllSites, setSelectAllSites] = useState(false);
  const [syncTime, setSyncTime] = useState(26 * 60 + 30);

  useEffect(() => {
    const timer = setInterval(() => {
      setSyncTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const girlsData: GirlData[] = [
    { id: '1', image: '/placeholder.jpg', name: '瑠璃-ruri-' },
    { id: '2', image: '/placeholder.jpg', name: '彩羽-ayaha-' },
    { id: '3', image: '/placeholder.jpg', name: 'えれな' },
    { id: '4', image: '/placeholder.jpg', name: 'ミルク' },
    { id: '5', image: '/placeholder.jpg', name: 'ラブリ' },
    { id: '6', image: '/placeholder.jpg', name: 'ひな' },
  ];

  const sitesData: SiteData[] = [
    { id: '1', name: 'シティヘブンネット', lastUpdated: '2025/12/01 12:05' },
    { id: '2', name: 'デリヘルタウン', lastUpdated: '2025/12/01 12:05' },
    { id: '3', name: 'ぴゅあらば', lastUpdated: '2025/12/01 12:06' },
    { id: '4', name: 'マンゾクネット', lastUpdated: '2025/12/01 12:05' },
    { id: '5', name: '駅ちか人気！風俗ランキング', lastUpdated: '2025/12/01 12:05' },
    { id: '6', name: '口コミ風俗情報局', lastUpdated: '2025/12/01 12:05' },
    { id: '7', name: '風俗じゃぱん！', lastUpdated: '2025/12/01 12:05' },
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
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          {/* Left: Warning message */}
          <div className="flex items-center gap-2">
            <AlertTriangle size={18} className="text-[#E67E22]" />
            <span className="text-sm font-medium text-[#E67E22]">一覧に表示される女性について</span>
            <HelpCircle size={16} className="text-[#3B82F6] cursor-pointer" />
          </div>

          {/* Right: Action buttons */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 py-2 px-4 bg-white border border-[#e0e0e0] rounded text-sm text-[#333] cursor-pointer hover:bg-gray-50 transition-colors">
              <Settings size={16} className="text-[#666]" />
              更新結果を見る<span className="text-[#E53935] font-bold">！</span>
            </button>
            <button className="flex items-center gap-2 py-2.5 px-5 bg-[#EF5350] text-white border-none rounded-full text-sm font-medium cursor-pointer hover:bg-[#E53935] transition-all">
              <Upload size={16} />
              出勤情報を更新
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 md:px-5 pb-16 overflow-hidden">
        <div className="bg-white border border-gray-200 rounded overflow-hidden h-full flex flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-2 flex-1 overflow-hidden">
            {/* Left Panel - Girls List */}
            <div className="p-5 border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-col overflow-hidden">
              {/* Panel Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[15px] font-bold text-[#43A047]">どの女性の出勤情報を更新しますか？</h2>
                <label className="flex items-center gap-2 text-sm text-[#666] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sortByEdit}
                    onChange={() => setSortByEdit(!sortByEdit)}
                    className="w-4 h-4 rounded border-[#ccc] accent-[#43A047]"
                  />
                  編集順に並び替え
                </label>
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
                    className="w-full py-2.5 pl-10 pr-4 border border-[#e0e0e0] rounded-full text-sm outline-none focus:border-[#43A047] bg-[#fafafa] text-[#333] placeholder-[#999]"
                  />
                </div>
                <span className="text-sm text-[#666] whitespace-nowrap">
                  選択中 {selectedGirls.length} / 280人中
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
            <div className="p-5 bg-[#e8f5e9] flex flex-col overflow-hidden">
              {/* Panel Header */}
              <div className="mb-4">
                <h2 className="text-[15px] font-bold text-[#43A047]">どのサイトに更新しますか？</h2>
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
                    className="w-full py-2.5 pl-10 pr-4 border border-[#e0e0e0] rounded-full text-sm outline-none focus:border-[#43A047] bg-[#e8f5e9] text-[#333] placeholder-[#999]"
                  />
                </div>
                <span className="text-sm text-[#666] whitespace-nowrap">
                  選択中 {selectedSites.length} / 9件中
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
                  <HelpCircle size={14} className="text-[#3B82F6] cursor-pointer" />
                </div>
              </div>

              {/* Sites List */}
              <div className="flex-1 overflow-y-auto card-scroll">
                {sitesData.map((site) => (
                  <div
                    key={site.id}
                    className="flex items-center justify-between py-3.5 px-1 border-b border-[#f0f0f0] hover:bg-[#fafafa] transition-colors cursor-pointer"
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

      {/* Footer Status Bar */}
      <div
        className={`fixed bottom-0 right-0 bg-[#2196F3] text-white py-3 px-4 md:px-6 flex items-center justify-between z-40 transition-all duration-200 left-0 ${
          isCollapsed ? 'md:left-[60px]' : 'md:left-[220px]'
        }`}
      >
        <div className="flex items-center gap-2">
          <RefreshCw size={18} className="text-[#66BB6A]" />
          <span className="text-sm text-white">オートシンクロ稼働中：設定あり</span>
          <HelpCircle size={14} className="text-[#64B5F6] cursor-pointer" />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#9e9e9e]">次回シンクロまで</span>
            <span className="text-2xl font-mono font-bold tracking-wider text-white">{formatTime(syncTime)}</span>
          </div>
          <button className="hidden md:block text-[#9e9e9e] hover:text-white transition-colors">
            <ChevronUp size={20} />
          </button>
        </div>

        <button className="flex items-center gap-2 text-sm text-[#64B5F6] hover:text-[#90CAF9] transition-colors cursor-pointer bg-transparent border-none">
          <RefreshCw size={16} />
          タイマー停止
        </button>
      </div>
    </div>
  );
};

export default DispatchInfoUpdatePage;
