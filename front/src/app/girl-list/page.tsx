'use client';

import React, { useState } from 'react';
import { Search, Plus, Download, Users, Settings, Upload, List, Grid, Trash2, ChevronDown, ChevronLeft, ChevronRight, Edit, SlidersHorizontal, MessageSquare } from 'lucide-react';

interface GirlData {
  id: string;
  image: string;
  imageCount1: number;
  imageCount2: number;
  name: string;
  age: number;
  isNewcomer: boolean;
  height: number;
  bust: number;
  cup: string;
  waist: number;
  hip: number;
  joinDate: string;
  isPublic: boolean;
  hasMemo?: boolean;
}

const GirlListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const girlsData: GirlData[] = [
    { id: '1', image: '/placeholder.jpg', imageCount1: 2, imageCount2: 4, name: '瑠璃-ruri-', age: 24, isNewcomer: false, height: 165, bust: 86, cup: 'C', waist: 57, hip: 84, joinDate: '2020/9/9', isPublic: true },
    { id: '2', image: '/placeholder.jpg', imageCount1: 2, imageCount2: 7, name: '彩羽-ayaha-', age: 24, isNewcomer: false, height: 153, bust: 82, cup: 'C', waist: 56, hip: 81, joinDate: '2021/8/13', isPublic: true, hasMemo: true },
    { id: '3', image: '/placeholder.jpg', imageCount1: 2, imageCount2: 7, name: 'えれな', age: 22, isNewcomer: false, height: 160, bust: 85, cup: 'D', waist: 56, hip: 84, joinDate: '2019/7/12', isPublic: true },
    { id: '4', image: '/placeholder.jpg', imageCount1: 2, imageCount2: 6, name: 'ミルク', age: 22, isNewcomer: false, height: 153, bust: 82, cup: 'C', waist: 57, hip: 83, joinDate: '2017/3/14', isPublic: true },
    { id: '5', image: '/placeholder.jpg', imageCount1: 2, imageCount2: 2, name: 'ラブリ', age: 24, isNewcomer: false, height: 155, bust: 88, cup: 'E', waist: 57, hip: 84, joinDate: '2018/6/15', isPublic: true },
    { id: '6', image: '/placeholder.jpg', imageCount1: 2, imageCount2: 2, name: 'ひな', age: 24, isNewcomer: false, height: 157, bust: 83, cup: 'C', waist: 56, hip: 84, joinDate: '2023/11/1', isPublic: true },
  ];

  return (
    <div className="p-4 md:p-5 min-h-screen bg-gray-100">
      {/* Top Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          {/* Primary Buttons */}
          <button className="flex items-center gap-1.5 py-2 px-4 bg-green-600 text-white border-none rounded-full text-sm font-medium cursor-pointer hover:bg-green-700 transition-colors">
            <Plus size={16} />
            新規登録
          </button>
          <button className="flex items-center gap-1.5 py-2 px-4 bg-green-600 text-white border-none rounded-full text-sm font-medium cursor-pointer hover:bg-green-700 transition-colors">
            <Download size={16} />
            女性取り込み
          </button>

          {/* Secondary Buttons */}
          <button className="flex items-center gap-1.5 py-2 px-4 bg-white text-gray-700 border border-gray-300 rounded text-sm cursor-pointer hover:bg-gray-50 transition-colors">
            <Users size={16} />
            別名管理
          </button>
          <button className="flex items-center gap-1.5 py-2 px-4 bg-white text-gray-700 border border-gray-300 rounded text-sm cursor-pointer hover:bg-gray-50 transition-colors">
            <Settings size={16} />
            ツール
          </button>
          <button className="flex items-center gap-1.5 py-2 px-4 bg-white text-gray-700 border border-gray-300 rounded text-sm cursor-pointer hover:bg-gray-50 transition-colors">
            <Upload size={16} />
            サイトへ更新
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <List size={22} />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Grid size={22} />
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white border border-gray-200 rounded overflow-hidden">
        {/* Search and Filter Row */}
        <div className="p-4 flex flex-wrap items-center justify-between gap-3 border-b border-gray-100">
          {/* Search and Delete */}
          <div className="flex items-center gap-4">
            <div className="relative w-[280px]">
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
            <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-800 cursor-pointer bg-transparent border-none">
              <Trash2 size={14} />
              選択削除
            </button>
          </div>

          {/* Pagination Info */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="relative">
                <select className="appearance-none py-1.5 px-3 pr-8 border border-gray-200 rounded text-sm bg-white cursor-pointer outline-none">
                  <option>1-50人 / 286人中</option>
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <span className="text-sm text-gray-500">上限400人</span>
            </div>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <ChevronLeft size={18} />
              </button>
              {[1, 2, 3, 4].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-7 h-7 rounded-full text-sm font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div className="hidden lg:grid py-3 px-4 bg-white border-b border-gray-200 text-xs text-gray-500" style={{ gridTemplateColumns: '70px 70px 180px 60px 60px 160px 100px 100px 1fr' }}>
          <div></div>
          <div></div>
          <div className="flex items-center gap-1">
            名前
            <ChevronDown size={10} className="text-gray-400" />
          </div>
          <div className="flex items-center gap-1">
            年齢
            <ChevronDown size={10} className="text-gray-400" />
          </div>
          <div className="flex items-center gap-1">
            新人
            <ChevronDown size={10} className="text-gray-400" />
          </div>
          <div>サイズ</div>
          <div className="flex items-center gap-1">
            入店日
            <ChevronDown size={10} className="text-gray-400" />
          </div>
          <div className="flex items-center gap-1">
            公開状態
            <ChevronDown size={10} className="text-gray-400" />
          </div>
          <div className="flex items-center gap-1">
            メモ
            <ChevronDown size={10} className="text-gray-400" />
          </div>
        </div>

        {/* Table Rows */}
        {girlsData.map((girl) => (
          <div
            key={girl.id}
            onMouseEnter={() => setHoveredRow(girl.id)}
            onMouseLeave={() => setHoveredRow(null)}
          >
            {/* Desktop Layout */}
            <div className="hidden lg:grid py-3 px-4 border-b border-gray-100 items-center bg-white hover:bg-gray-50 transition-colors" style={{ gridTemplateColumns: '70px 70px 180px 60px 60px 160px 100px 100px 1fr' }}>
              {/* Edit Button */}
              <div className="flex items-center">
                {hoveredRow === girl.id || girl.hasMemo ? (
                  <button className="flex items-center gap-1 py-1.5 px-3 bg-blue-600 text-white border-none rounded text-xs cursor-pointer hover:bg-blue-700">
                    <Edit size={12} />
                    編集
                  </button>
                ) : (
                  <button className="flex items-center gap-1 text-blue-600 bg-transparent border-none text-xs cursor-pointer hover:underline">
                    <Edit size={12} />
                    編集
                  </button>
                )}
              </div>

              {/* Image */}
              <div className="flex items-center">
                <div className="relative w-12 h-16 bg-gray-200 rounded overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-b from-red-300 to-red-400 flex items-center justify-center">
                    <span className="text-white text-[8px]">No Image</span>
                  </div>
                  {/* Image count badges */}
                  <div className="absolute bottom-0 left-0 right-0 flex">
                    <div className="flex-1 bg-blue-600 text-white text-[9px] py-0.5 flex items-center justify-center gap-0.5">
                      <span className="opacity-70">回</span>{girl.imageCount1}
                    </div>
                    <div className="flex-1 bg-blue-800 text-white text-[9px] py-0.5 flex items-center justify-center gap-0.5">
                      <span className="opacity-70">回</span>{girl.imageCount2}
                    </div>
                  </div>
                </div>
              </div>

              {/* Name */}
              <div className="text-sm text-gray-800">{girl.name}</div>

              {/* Age */}
              <div className="text-sm text-gray-800 text-center">{girl.age}</div>

              {/* Newcomer Checkbox */}
              <div className="flex items-center justify-center gap-1">
                <input
                  type="checkbox"
                  checked={girl.isNewcomer}
                  readOnly
                  className="w-4 h-4 border-gray-300 rounded"
                />
                <span className="text-xs text-gray-600">新人</span>
              </div>

              {/* Size */}
              <div className="text-sm text-gray-800">
                <div>T.{girl.height}</div>
                <div>B.{girl.bust} ({girl.cup}) W.{girl.waist} H.{girl.hip}</div>
              </div>

              {/* Join Date */}
              <div className="text-sm text-gray-800">{girl.joinDate}</div>

              {/* Public Status */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-blue-600 bg-blue-50 py-0.5 px-2 rounded">公開中</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={girl.isPublic} className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>

              {/* Memo */}
              <div className="flex items-center gap-2">
                {hoveredRow === girl.id && (
                  <>
                    <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800 bg-transparent border-none cursor-pointer">
                      <MessageSquare size={12} />
                      メモ
                    </button>
                    <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800 bg-transparent border-none cursor-pointer">
                      <Trash2 size={12} />
                      削除
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Card Layout */}
            <div className="lg:hidden p-4 border-b border-gray-100 bg-white">
              <div className="flex items-start gap-3">
                {/* Image */}
                <div className="relative w-16 h-20 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                  <div className="w-full h-full bg-gradient-to-b from-red-300 to-red-400 flex items-center justify-center">
                    <span className="text-white text-[8px]">No Image</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 flex">
                    <div className="flex-1 bg-blue-600 text-white text-[8px] py-0.5 flex items-center justify-center">
                      回{girl.imageCount1}
                    </div>
                    <div className="flex-1 bg-blue-800 text-white text-[8px] py-0.5 flex items-center justify-center">
                      回{girl.imageCount2}
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-800">{girl.name}</span>
                    <button className="flex items-center gap-1 text-blue-600 text-xs">
                      <Edit size={12} />
                      編集
                    </button>
                  </div>
                  <div className="text-xs text-gray-600 mb-1">
                    {girl.age}歳 | T.{girl.height} B.{girl.bust}({girl.cup}) W.{girl.waist} H.{girl.hip}
                  </div>
                  <div className="text-xs text-gray-500 mb-2">入店: {girl.joinDate}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-blue-600 bg-blue-50 py-0.5 px-1.5 rounded">公開中</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={girl.isPublic} className="sr-only peer" />
                      <div className="w-8 h-4 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GirlListPage;
