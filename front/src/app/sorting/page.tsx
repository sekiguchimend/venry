'use client';

import React, { useState } from 'react';
import { Settings, List, Grid, Upload, ChevronDown, RotateCcw, X } from 'lucide-react';

interface WomanCard {
  id: string;
  name: string;
  image: string;
  status?: 'working' | 'newcomer' | 'working-newcomer';
}

const SortingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'basic' | 'group'>('basic');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const [sortOrder, setSortOrder] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patternName, setPatternName] = useState('');

  const handleGroupTabClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPatternName('');
  };

  const handleSave = () => {
    if (patternName.trim()) {
      // 保存処理
      console.log('Pattern saved:', patternName);
      handleCloseModal();
    }
  };

  // サンプルデータ
  const womenData: WomanCard[] = [
    { id: '1', name: '瑠璃-ruri-', image: '/women/1.jpg', status: 'working' },
    { id: '2', name: '彩羽-ayaha-', image: '/women/2.jpg', status: 'working' },
    { id: '3', name: 'えれな', image: '/women/3.jpg', status: 'working' },
    { id: '4', name: 'ミルク', image: '/women/4.jpg', status: 'working-newcomer' },
    { id: '5', name: 'ラブリ', image: '/women/5.jpg', status: 'working-newcomer' },
    { id: '6', name: 'ひな', image: '/women/6.jpg', status: 'working' },
    { id: '7', name: 'のあ', image: '/women/7.jpg', status: 'working-newcomer' },
    { id: '8', name: 'そよかぜ', image: '/women/8.jpg', status: 'working' },
    { id: '9', name: 'ゆゆ', image: '/women/9.jpg', status: 'working' },
    { id: '10', name: 'あかり', image: '/women/10.jpg', status: 'working' },
    { id: '11', name: 'ななせ', image: '/women/11.jpg', status: 'working' },
    { id: '12', name: 'もね', image: '/women/12.jpg', status: 'working' },
    { id: '13', name: 'なお', image: '/women/13.jpg', status: 'working' },
    { id: '14', name: 'ねね', image: '/women/14.jpg', status: 'working-newcomer' },
    { id: '15', name: 'あんず', image: '/women/15.jpg' },
    { id: '16', name: 'かんな', image: '/women/16.jpg' },
    { id: '17', name: 'ちょこ', image: '/women/17.jpg' },
    { id: '18', name: 'つかさ', image: '/women/18.jpg' },
    { id: '19', name: 'かなえ', image: '/women/19.jpg', status: 'newcomer' },
    { id: '20', name: 'るか', image: '/women/20.jpg' },
    { id: '21', name: 'りか', image: '/women/21.jpg', status: 'working-newcomer' },
    { id: '22', name: 'のの', image: '/women/22.jpg' },
    { id: '23', name: 'うに', image: '/women/23.jpg' },
    { id: '24', name: 'みさ', image: '/women/24.jpg' },
    { id: '25', name: 'サリナ', image: '/women/25.jpg' },
    { id: '26', name: 'もか', image: '/women/26.jpg' },
    { id: '27', name: 'えみる', image: '/women/27.jpg' },
    { id: '28', name: 'おとは', image: '/women/28.jpg' },
    { id: '29', name: 'すずな', image: '/women/29.jpg', status: 'newcomer' },
    { id: '30', name: 'しずく', image: '/women/30.jpg' },
    { id: '31', name: 'りるは', image: '/women/31.jpg' },
    { id: '32', name: 'れいは', image: '/women/32.jpg', status: 'working-newcomer' },
    { id: '33', name: 'きい', image: '/women/33.jpg' },
    { id: '34', name: 'ゆら', image: '/women/34.jpg', status: 'working-newcomer' },
    { id: '35', name: 'みく', image: '/women/35.jpg', status: 'newcomer' },
    { id: '36', name: 'ささら', image: '/women/36.jpg' },
    { id: '37', name: 'のどか', image: '/women/37.jpg', status: 'newcomer' },
    { id: '38', name: '未夢-raimu-', image: '/women/38.jpg' },
    { id: '39', name: 'みな', image: '/women/39.jpg', status: 'newcomer' },
    { id: '40', name: 'りみか', image: '/women/40.jpg' },
    { id: '41', name: 'あお', image: '/women/41.jpg', status: 'newcomer' },
    { id: '42', name: 'あいみ', image: '/women/42.jpg', status: 'newcomer' },
  ];

  const getStatusBadge = (status?: string) => {
    if (!status) return null;

    if (status === 'working' || status === 'working-newcomer') {
      return (
        <span className="absolute top-1 left-1 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded">
          出勤中
        </span>
      );
    }
    return null;
  };

  const getNewcomerBadge = (status?: string) => {
    if (status === 'newcomer' || status === 'working-newcomer') {
      return (
        <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded">
          新人
        </span>
      );
    }
    return null;
  };

  return (
    <div className="p-3 md:p-5 min-h-screen bg-gray-100">
      {/* Header Buttons */}
      <div className="flex items-center justify-between mb-4">
        <button className="py-2 px-4 bg-white border border-gray-200 rounded text-sm text-gray-800 cursor-pointer flex items-center gap-2 transition-colors hover:bg-gray-50">
          <Settings size={16} />
          更新結果を見る
        </button>

        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded p-1">
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <List size={18} />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <Grid size={18} />
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white border border-gray-200 rounded overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('basic')}
            className={`py-3 px-6 text-sm cursor-pointer transition-all relative border-0 bg-white ${
              activeTab === 'basic'
                ? 'text-blue-700 font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-blue-700'
                : 'text-gray-600'
            }`}
          >
            基本の並び順
          </button>
          <button
            onClick={handleGroupTabClick}
            className={`py-3 px-6 text-sm cursor-pointer transition-all relative border-0 bg-white ${
              activeTab === 'group'
                ? 'text-blue-700 font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-blue-700'
                : 'text-gray-600'
            }`}
          >
            ★税タブでグループ分け
          </button>
        </div>

        {/* Description and Controls */}
        <div className="p-4 border-b border-gray-100">
          <p className="text-sm text-gray-700 mb-4">
            基本は女性一覧の並び順と連動しています。
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {/* Sort Order Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">並び順：</span>
              <div className="relative">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded py-2 pl-3 pr-8 text-sm text-gray-700 cursor-pointer focus:outline-none focus:border-blue-500"
                >
                  <option value="">未選択</option>
                  <option value="name">名前順</option>
                  <option value="newest">新しい順</option>
                  <option value="oldest">古い順</option>
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <button className="py-2 px-4 bg-white border border-gray-200 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              並び順を適用
            </button>

            <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
              ↓ 新人を先頭へ
            </button>

            <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
              ↑ 前公開を最後尾へ
            </button>

            <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
              <RotateCcw size={14} />
              初期配置に戻す
            </button>

            <div className="ml-auto">
              <button className="py-2 px-4 bg-red-500 text-white rounded-full text-sm font-medium hover:bg-red-600 transition-colors flex items-center gap-2">
                <Upload size={16} />
                サイトへ更新
              </button>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="text-sm font-medium text-blue-600">並び替え固定枠</h3>
        </div>

        {/* Women Grid */}
        <div className="p-4">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-14 gap-3">
            {womenData.map((woman) => (
              <div
                key={woman.id}
                className="flex flex-col items-center cursor-pointer group"
              >
                <div className="relative w-full aspect-[3/4] bg-gray-100 rounded overflow-hidden mb-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center">
                    <span className="text-pink-500 text-xs">No Image</span>
                  </div>
                  {getStatusBadge(woman.status)}
                  {getNewcomerBadge(woman.status)}
                </div>
                <span className="text-xs text-gray-700 text-center truncate w-full">
                  {woman.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={handleCloseModal}
          />

          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                並び順パターンを作成
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <div className="relative">
                <input
                  type="text"
                  value={patternName}
                  onChange={(e) => setPatternName(e.target.value.slice(0, 20))}
                  placeholder="パターン名を入力してください"
                  className="w-full py-3 px-4 border border-gray-200 rounded text-sm text-gray-700 focus:outline-none focus:border-blue-500"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                  {patternName.length}/20
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-center gap-3 p-4 border-t border-gray-200">
              <button
                onClick={handleCloseModal}
                className="py-2 px-6 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={handleSave}
                disabled={!patternName.trim()}
                className={`py-2 px-6 rounded text-sm transition-colors ${
                  patternName.trim()
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortingPage;
