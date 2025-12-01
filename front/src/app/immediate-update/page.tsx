'use client';

import React, { useState } from 'react';
import { Search, Star, ChevronDown, Edit2, Ban, Plus, ExternalLink, HelpCircle, BellOff } from 'lucide-react';

interface WomanData {
  id: string;
  priority: number | '未出勤';
  status: '接客中' | '待機中';
  statusTime?: string;
  startTime: string;
  endTime: string;
  name: string;
  comment: string;
  commentCount: string;
  isHighlighted?: boolean;
}

interface SiteData {
  id: string;
  enabled: boolean;
  nextTime?: string;
  nextDate?: string;
  countdown?: string;
  countdownSub?: string;
  hasWarning: boolean;
  siteName: string;
  noSokuhime?: boolean;
  updateInterval: string;
  sokuhimeChecked: boolean;
  waitingChecked: boolean;
  waitingButton?: boolean;
  lastUpdated: string;
}

const ImmediateUpdatePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('women');
  const [searchTerm, setSearchTerm] = useState('');
  const [siteSearchTerm, setSiteSearchTerm] = useState('');
  const [priorityOrder, setPriorityOrder] = useState('優先順');
  const [updateMode, setUpdateMode] = useState('全員同時');
  const [priorityFilter, setPriorityFilter] = useState('先に出勤している人優先');

  const siteData: SiteData[] = [
    { id: '1', enabled: true, nextTime: '20:38', nextDate: '11月29日', hasWarning: true, siteName: 'HIME CHANNEL', updateInterval: '60分', sokuhimeChecked: true, waitingChecked: true, lastUpdated: '11月29日20:02' },
    { id: '2', enabled: false, hasWarning: false, siteName: 'オフィシャル(京都ホテヘル倶楽部様)', noSokuhime: true, updateInterval: '', sokuhimeChecked: false, waitingChecked: true, waitingButton: true, lastUpdated: '11月29日20:02' },
    { id: '3', enabled: true, nextTime: '20:13', nextDate: '11月29日', hasWarning: true, siteName: 'シティヘブンネット', updateInterval: '7分', sokuhimeChecked: true, waitingChecked: true, lastUpdated: '11月29日20:03' },
    { id: '4', enabled: true, nextTime: '20:10', nextDate: '11月29日', hasWarning: true, siteName: 'デリヘルタウン(ピックアップ)', updateInterval: '8分', sokuhimeChecked: true, waitingChecked: false, lastUpdated: '11月29日20:02' },
    { id: '5', enabled: true, nextTime: '20:38', nextDate: '11月29日', hasWarning: true, siteName: 'デリヘルタウン(待機情報)', updateInterval: '60分', sokuhimeChecked: true, waitingChecked: true, lastUpdated: '11月29日20:02' },
    { id: '6', enabled: true, countdown: '00:00:30', countdownSub: '20:08更新', hasWarning: true, siteName: 'ぴゅあらば', updateInterval: '6分', sokuhimeChecked: true, waitingChecked: true, lastUpdated: '11月29日20:03' },
    { id: '7', enabled: true, countdown: '00:00:30', countdownSub: '20:08更新', hasWarning: true, siteName: 'マンゾクネット', updateInterval: '15分', sokuhimeChecked: true, waitingChecked: false, lastUpdated: '11月29日20:02' },
    { id: '8', enabled: true, nextTime: '20:46', nextDate: '11月29日', hasWarning: true, siteName: '駅ちか人気！風俗ランキング(今すぐ遊べる女の子)', updateInterval: '1時間1分', sokuhimeChecked: true, waitingChecked: true, lastUpdated: '11月29日20:02' },
    { id: '9', enabled: true, countdown: '00:00:30', countdownSub: '20:08更新', hasWarning: true, siteName: '駅ちか人気！風俗ランキング(即ヒメ)', updateInterval: '5分', sokuhimeChecked: true, waitingChecked: false, lastUpdated: '11月29日20:03' },
    { id: '10', enabled: true, countdown: '00:00:30', countdownSub: '20:08更新', hasWarning: true, siteName: '口コミ風俗情報局', updateInterval: '5分', sokuhimeChecked: true, waitingChecked: true, lastUpdated: '11月29日20:03' },
  ];

  const womenData: WomanData[] = [
    { id: '1', priority: 1, status: '接客中', statusTime: '~16:50', startTime: '12:00', endTime: '21:00', name: 'さく', comment: 'Eカップ、モデル級神スタイル清楚系レディ『さく』ちゃん', commentCount: '27/1000' },
    { id: '2', priority: 2, status: '待機中', startTime: '12:00', endTime: '18:00', name: 'りず', comment: '柔らかくホンワカとした性格で、笑顔が印象的な美人人妻', commentCount: '26/1000' },
    { id: '3', priority: 3, status: '待機中', startTime: '13:00', endTime: '翌03:00', name: 'みく', comment: '21歳Fカップ・ロリ巨乳', commentCount: '12/1000' },
    { id: '4', priority: 4, status: '待機中', startTime: '15:00', endTime: '翌04:00', name: 'ともか', comment: 'Eカップスレンダー美女', commentCount: '11/1000' },
    { id: '5', priority: 5, status: '接客中', statusTime: '~17:10', startTime: '15:00', endTime: '翌04:00', name: 'ナツキ', comment: 'ショートが似合う抜群カップ妻『ナツキ』さん', commentCount: '22/1000', isHighlighted: true },
    { id: '6', priority: '未出勤', status: '接客中', statusTime: '~18:00', startTime: '18:00', endTime: '翌00:00', name: 'すあん', comment: '現役女子大生Gカップ美少女！', commentCount: '14/1000' },
    { id: '7', priority: '未出勤', status: '接客中', statusTime: '~19:00', startTime: '19:00', endTime: '翌00:00', name: 'えみな', comment: '小柄で可愛いのに、ふとした瞬間に"大人の色気"が香る', commentCount: '26/1000' },
    { id: '8', priority: '未出勤', status: '接客中', statusTime: '~22:10', startTime: '20:00', endTime: '翌00:00', name: 'ありす', comment: '黒髪に幼顔の奥底から滲み出る妖艶な「エロさ」', commentCount: '22/1000' },
    { id: '9', priority: '未出勤', status: '接客中', statusTime: '~20:00', startTime: '20:00', endTime: '22:00', name: 'りら', comment: '黒髪清楚系Eカップ現役看護師『りらさん』♪', commentCount: '21/1000' },
    { id: '10', priority: '未出勤', status: '接客中', statusTime: '~翌03:30', startTime: '翌00:00', endTime: '翌04:00', name: 'まりあ', comment: '黒髪のお姉さん、未経験の女神『まりあ』さん', commentCount: '21/1000' },
    { id: '11', priority: 11, status: '待機中', startTime: '09:00', endTime: '16:00', name: 'サナ', comment: '身体も即座に反応し、小柄ながらメリハリのある美しいスタイル', commentCount: '29/1000' },
  ];

  return (
    <div className="p-3 md:p-5 min-h-screen bg-gray-100">
      {/* Header Controls */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4 gap-3">
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          {/* Stop Button */}
          <button className="py-2 px-4 bg-red-500 text-white border-none rounded-full text-xs md:text-sm font-medium cursor-pointer flex items-center gap-1.5 hover:bg-red-600 transition-colors">
            <Ban size={14} className="md:w-4 md:h-4" />
            止める
          </button>

          {/* Auto Update Status */}
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-700">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span>自動更新中</span>
          </div>

          {/* Priority Order Dropdown */}
          <div className="relative">
            <select
              value={priorityOrder}
              onChange={(e) => setPriorityOrder(e.target.value)}
              className="appearance-none py-1.5 px-3 pr-8 border border-gray-300 rounded text-xs md:text-sm bg-white cursor-pointer outline-none"
            >
              <option value="優先順">優先順</option>
              <option value="名前順">名前順</option>
              <option value="出勤順">出勤順</option>
            </select>
            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>

          <span className="text-xs md:text-sm text-gray-600">で</span>

          {/* Update Mode Dropdown */}
          <div className="relative">
            <select
              value={updateMode}
              onChange={(e) => setUpdateMode(e.target.value)}
              className="appearance-none py-1.5 px-3 pr-8 border border-gray-300 rounded text-xs md:text-sm bg-white cursor-pointer outline-none"
            >
              <option value="全員同時">全員同時</option>
              <option value="1人ずつ">1人ずつ</option>
            </select>
            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>

          {/* Update Priority Link */}
          <button className="py-1.5 px-3 bg-white border border-gray-300 rounded text-xs md:text-sm text-gray-700 cursor-pointer hover:bg-gray-50">
            更新 <span className="text-blue-700 font-medium">優先順位</span>
          </button>

          {/* Priority Filter Dropdown */}
          <div className="relative">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="appearance-none py-1.5 px-3 pr-8 border border-gray-300 rounded text-xs md:text-sm bg-white cursor-pointer outline-none"
            >
              <option value="先に出勤している人優先">先に出勤している人優先</option>
              <option value="後に出勤している人優先">後に出勤している人優先</option>
            </select>
            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white border border-gray-200 rounded overflow-hidden">
        {/* Tabs and Count */}
        <div className="flex items-center justify-between border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('women')}
              className={`py-4 px-6 border-0 bg-white text-sm cursor-pointer transition-all relative ${
                activeTab === 'women'
                  ? 'text-gray-800 font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-blue-700'
                  : 'text-gray-500 font-normal hover:text-gray-700'
              }`}
            >
              女性
            </button>
            <button
              onClick={() => setActiveTab('site-settings')}
              className={`py-4 px-6 border-0 bg-white text-sm cursor-pointer transition-all relative ${
                activeTab === 'site-settings'
                  ? 'text-gray-800 font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-blue-700'
                  : 'text-gray-500 font-normal hover:text-gray-700'
              }`}
            >
              サイト設定
            </button>
          </div>
          <div className="pr-4 text-sm text-gray-600">
            女性<span className="font-bold text-gray-800 mx-1">99</span>人
            更新対象<span className="font-bold text-gray-800 mx-1">10</span>コンテンツ
          </div>
        </div>

        {/* Women Tab Content */}
        {activeTab === 'women' && (
          <>
            {/* Search and Status Controls */}
            <div className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-gray-100">
              {/* Search */}
              <div className="relative w-full md:w-[300px]">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="女性名で検索"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 border border-gray-200 rounded text-sm outline-none focus:border-blue-500"
                />
              </div>

              {/* Status Batch Setting */}
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 py-1.5 px-3 bg-white border border-gray-300 rounded text-sm text-blue-700 cursor-pointer hover:bg-gray-50">
                  <Plus size={14} />
                  ステータス一括設定
                </button>
                <span className="bg-red-500 text-white text-[10px] py-0.5 px-1.5 rounded font-medium">NEW</span>
                <button className="p-1.5 bg-transparent border-none text-gray-400 cursor-pointer hover:text-gray-600">
                  <Edit2 size={14} />
                </button>
              </div>
            </div>

            {/* Target Women Header */}
            <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
              <span className="text-sm font-medium text-gray-700">対象女性</span>
              <span className="text-xs text-gray-500 ml-2">自動更新対象の女性が並びます。</span>
            </div>

            {/* Table Header - Desktop */}
            <div className="hidden lg:grid grid-cols-[70px_70px_100px_80px_80px_120px_1fr_80px] py-3 px-4 bg-white border-b border-gray-200 text-xs text-gray-500">
              <div className="text-center">優先設定</div>
              <div className="text-center">優先順</div>
              <div className="text-center">ステータス</div>
              <div className="text-center">出勤</div>
              <div className="text-center">退勤</div>
              <div>名前</div>
              <div>コメント</div>
              <div className="text-center">除外設定</div>
            </div>

            {/* Table Rows */}
            {womenData.map((woman) => (
              <div key={woman.id}>
                {/* Desktop Layout */}
                <div className={`hidden lg:grid grid-cols-[70px_70px_100px_80px_80px_120px_1fr_80px] py-3 px-4 border-b border-gray-100 items-center ${woman.isHighlighted ? 'bg-blue-50' : 'bg-white'}`}>
                  {/* Priority Star */}
                  <div className="flex justify-center">
                    <Star size={18} className="text-orange-400 fill-orange-400 cursor-pointer" />
                  </div>

                  {/* Priority Order */}
                  <div className="text-center text-sm text-gray-800">
                    {woman.priority === '未出勤' ? (
                      <span className="text-gray-500">未出勤</span>
                    ) : (
                      woman.priority
                    )}
                  </div>

                  {/* Status */}
                  <div className="flex justify-center">
                    <div className="relative">
                      <select
                        defaultValue={woman.status}
                        className={`appearance-none py-1 px-2 pr-6 border rounded text-xs cursor-pointer outline-none ${
                          woman.status === '接客中'
                            ? 'border-blue-300 bg-blue-50 text-blue-700'
                            : 'border-gray-300 bg-white text-gray-700'
                        }`}
                      >
                        <option value="接客中">接客中</option>
                        <option value="待機中">待機中</option>
                      </select>
                      <ChevronDown size={12} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      {woman.statusTime && (
                        <div className="text-[10px] text-blue-600 mt-0.5 text-center">({woman.statusTime})</div>
                      )}
                    </div>
                  </div>

                  {/* Start Time */}
                  <div className="text-center text-sm text-gray-800">{woman.startTime}</div>

                  {/* Separator */}
                  <div className="text-center text-sm text-gray-400">～　{woman.endTime}</div>

                  {/* Name */}
                  <div className="text-sm text-gray-800 font-medium">{woman.name}</div>

                  {/* Comment */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      defaultValue={woman.comment}
                      className="flex-1 py-1.5 px-3 border border-gray-200 rounded text-sm outline-none focus:border-blue-500 bg-yellow-50"
                    />
                    <span className="text-xs text-gray-400 whitespace-nowrap">{woman.commentCount}</span>
                  </div>

                  {/* Exclude Setting */}
                  <div className="flex justify-center">
                    <button className="p-1.5 bg-transparent border border-gray-200 rounded text-gray-400 cursor-pointer hover:text-gray-600 hover:border-gray-300">
                      <Edit2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Mobile Card Layout */}
                <div className={`lg:hidden p-4 border-b border-gray-100 ${woman.isHighlighted ? 'bg-blue-50' : 'bg-white'}`}>
                  <div className="flex items-start gap-3">
                    <Star size={18} className="text-orange-400 fill-orange-400 cursor-pointer flex-shrink-0 mt-1" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-800">{woman.name}</span>
                          <span className={`text-xs py-0.5 px-2 rounded ${
                            woman.status === '接客中'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {woman.status}
                            {woman.statusTime && <span className="ml-1">({woman.statusTime})</span>}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {woman.priority === '未出勤' ? '未出勤' : `#${woman.priority}`}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 mb-2">
                        {woman.startTime} ～ {woman.endTime}
                      </div>
                      <input
                        type="text"
                        defaultValue={woman.comment}
                        className="w-full py-1.5 px-3 border border-gray-200 rounded text-xs outline-none focus:border-blue-500 bg-yellow-50"
                      />
                      <div className="text-right text-[10px] text-gray-400 mt-1">{woman.commentCount}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Site Settings Tab Content */}
        {activeTab === 'site-settings' && (
          <>
            {/* Search Bar */}
            <div className="p-4 border-b border-gray-100">
              <div className="relative w-full md:w-[300px]">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="サイト名で検索"
                  value={siteSearchTerm}
                  onChange={(e) => setSiteSearchTerm(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 border border-gray-200 rounded text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Table Header - Desktop */}
            <div className="hidden lg:grid py-3 px-4 bg-white border-b border-gray-200 text-xs text-gray-500" style={{ gridTemplateColumns: '30px 50px 120px 1fr 100px 60px 80px 120px' }}>
              <div></div>
              <div className="flex items-center gap-1">
                更新
                <ChevronDown size={10} className="text-gray-400" />
              </div>
              <div className="flex items-center gap-1">
                即姫タイマー
                <ChevronDown size={10} className="text-gray-400" />
              </div>
              <div className="flex items-center gap-1">
                サイト名
                <ChevronDown size={10} className="text-gray-400" />
              </div>
              <div className="text-center">更新間隔</div>
              <div className="text-center">即姫</div>
              <div className="flex items-center justify-center gap-1">
                自動待機
                <HelpCircle size={12} className="text-blue-500" />
              </div>
              <div className="flex items-center gap-1">
                最終更新日
                <ChevronDown size={10} className="text-gray-400" />
              </div>
            </div>

            {/* Site Rows */}
            {siteData.map((site, index) => (
              <div key={site.id}>
                {/* Desktop Layout */}
                <div className="hidden lg:grid py-3 px-4 border-b border-gray-100 items-center bg-white hover:bg-gray-50" style={{ gridTemplateColumns: '30px 50px 120px 1fr 100px 60px 80px 120px' }}>
                  {/* Row Number */}
                  <div className="text-sm text-gray-500">{index + 1}.</div>

                  {/* Toggle Switch */}
                  <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={site.enabled} className="sr-only peer" />
                      <div className="w-10 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>

                  {/* Timer */}
                  <div className="text-sm">
                    {site.nextTime ? (
                      <div>
                        <span className="text-gray-400 text-xs">次回</span>
                        <span className="font-bold text-gray-800 ml-1">{site.nextTime}</span>
                        <div className="text-xs text-gray-400">({site.nextDate})</div>
                      </div>
                    ) : site.countdown ? (
                      <div>
                        <span className="font-bold text-gray-800">{site.countdown}</span>
                        <div className="text-xs text-gray-400">({site.countdownSub})</div>
                      </div>
                    ) : null}
                  </div>

                  {/* Site Name */}
                  <div className="flex items-center gap-2">
                    {site.hasWarning && (
                      <BellOff size={16} className="text-red-500 flex-shrink-0" />
                    )}
                    <span className="text-sm text-gray-800">{site.siteName}</span>
                    {site.noSokuhime && (
                      <span className="text-xs bg-orange-500 text-white py-0.5 px-2 rounded">即姫なし</span>
                    )}
                  </div>

                  {/* Update Interval */}
                  <div className="flex justify-center">
                    {site.updateInterval && (
                      <div className="relative">
                        <select
                          defaultValue={site.updateInterval}
                          className="appearance-none py-1 px-3 pr-6 border border-gray-200 rounded text-sm bg-white cursor-pointer outline-none"
                        >
                          <option value={site.updateInterval}>{site.updateInterval}</option>
                        </select>
                        <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    )}
                  </div>

                  {/* Sokuhime Checkbox */}
                  <div className="flex justify-center">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={site.sokuhimeChecked}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-xs text-gray-600">即姫</span>
                    </label>
                  </div>

                  {/* Waiting Checkbox */}
                  <div className="flex justify-center">
                    {site.waitingButton ? (
                      <button className="flex items-center gap-1 py-1 px-2 bg-white border border-blue-500 rounded text-xs text-blue-600 cursor-pointer">
                        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="currentColor">
                          <path d="M10 3L4.5 8.5 2 6" stroke="currentColor" strokeWidth="2" fill="none" />
                        </svg>
                        待機
                      </button>
                    ) : (
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={site.waitingChecked}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-xs text-gray-600">待機</span>
                      </label>
                    )}
                  </div>

                  {/* Last Updated */}
                  <div className="flex items-center gap-1">
                    <a href="#" className="text-sm text-blue-600 hover:underline">{site.lastUpdated}</a>
                    <ExternalLink size={14} className="text-blue-600" />
                  </div>
                </div>

                {/* Mobile Card Layout */}
                <div className="lg:hidden p-4 border-b border-gray-100 bg-white">
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-sm text-gray-500">{index + 1}.</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={site.enabled} className="sr-only peer" />
                        <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                      </label>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        {site.hasWarning && <BellOff size={14} className="text-red-500" />}
                        <span className="text-sm font-medium text-gray-800">{site.siteName}</span>
                        {site.noSokuhime && (
                          <span className="text-[10px] bg-orange-500 text-white py-0.5 px-1.5 rounded">即姫なし</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-600 mb-2">
                        {site.nextTime ? (
                          <span>次回 {site.nextTime} ({site.nextDate})</span>
                        ) : site.countdown ? (
                          <span>{site.countdown} ({site.countdownSub})</span>
                        ) : null}
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        {site.updateInterval && <span className="text-gray-600">間隔: {site.updateInterval}</span>}
                        <a href="#" className="text-blue-600">{site.lastUpdated}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ImmediateUpdatePage;
