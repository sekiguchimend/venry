'use client';

import React, { useState } from 'react';
import {
  Download,
  Settings,
  Upload,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Copy,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X
} from 'lucide-react';

interface DaySchedule {
  date: string;
  dayOfMonth: number;
  status: 'working' | 'off' | 'unset';
  startTime?: string;
  endTime?: string;
}

interface WomanData {
  id: string;
  name: string;
  image: string;
}

const MonthlySchedulePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('month');
  const [selectedWoman, setSelectedWoman] = useState('1');
  const [currentMonth, setCurrentMonth] = useState({ year: 2025, month: 11 });

  const women: WomanData[] = [
    { id: '1', name: '瑠璃-ruri-', image: '/placeholder.jpg' },
    { id: '2', name: '彩羽-ayaha-', image: '/placeholder.jpg' },
    { id: '3', name: 'えれな', image: '/placeholder.jpg' },
    { id: '4', name: 'ミルク', image: '/placeholder.jpg' },
    { id: '5', name: 'ラブリ', image: '/placeholder.jpg' },
    { id: '6', name: 'ひな', image: '/placeholder.jpg' },
  ];

  // Generate calendar days for November 2025
  const generateCalendarDays = (): DaySchedule[][] => {
    const weeks: DaySchedule[][] = [];

    // Week 1: Oct 26 - Nov 1
    weeks.push([
      { date: '10/26', dayOfMonth: 26, status: 'unset' },
      { date: '10/27', dayOfMonth: 27, status: 'unset' },
      { date: '10/28', dayOfMonth: 28, status: 'unset' },
      { date: '10/29', dayOfMonth: 29, status: 'off' },
      { date: '10/30', dayOfMonth: 30, status: 'working', startTime: '10:30', endTime: '13:00' },
      { date: '10/31', dayOfMonth: 31, status: 'working', startTime: '10:00', endTime: '18:00' },
      { date: '11/01', dayOfMonth: 1, status: 'off' },
    ]);

    // Week 2: Nov 2 - Nov 8
    weeks.push([
      { date: '11/02', dayOfMonth: 2, status: 'off' },
      { date: '11/03', dayOfMonth: 3, status: 'working', startTime: '10:00', endTime: '20:30' },
      { date: '11/04', dayOfMonth: 4, status: 'off' },
      { date: '11/05', dayOfMonth: 5, status: 'off' },
      { date: '11/06', dayOfMonth: 6, status: 'working', startTime: '13:00', endTime: '21:00' },
      { date: '11/07', dayOfMonth: 7, status: 'off' },
      { date: '11/08', dayOfMonth: 8, status: 'working', startTime: '10:00', endTime: '16:30' },
    ]);

    // Week 3: Nov 9 - Nov 15
    weeks.push([
      { date: '11/09', dayOfMonth: 9, status: 'working', startTime: '10:00', endTime: '21:00' },
      { date: '11/10', dayOfMonth: 10, status: 'off' },
      { date: '11/11', dayOfMonth: 11, status: 'off' },
      { date: '11/12', dayOfMonth: 12, status: 'off' },
      { date: '11/13', dayOfMonth: 13, status: 'working', startTime: '13:00', endTime: '21:00' },
      { date: '11/14', dayOfMonth: 14, status: 'working', startTime: '13:00', endTime: '21:00' },
      { date: '11/15', dayOfMonth: 15, status: 'working', startTime: '10:00', endTime: '16:30' },
    ]);

    // Week 4: Nov 16 - Nov 22
    weeks.push([
      { date: '11/16', dayOfMonth: 16, status: 'working', startTime: '10:00', endTime: '21:00' },
      { date: '11/17', dayOfMonth: 17, status: 'off' },
      { date: '11/18', dayOfMonth: 18, status: 'working', startTime: '10:00', endTime: '13:00' },
      { date: '11/19', dayOfMonth: 19, status: 'off' },
      { date: '11/20', dayOfMonth: 20, status: 'working', startTime: '13:00', endTime: '21:00' },
      { date: '11/21', dayOfMonth: 21, status: 'working', startTime: '10:00', endTime: '16:30' },
      { date: '11/22', dayOfMonth: 22, status: 'working', startTime: '10:00', endTime: '16:30' },
    ]);

    // Week 5: Nov 23 - Nov 29
    weeks.push([
      { date: '11/23', dayOfMonth: 23, status: 'working', startTime: '10:00', endTime: '21:00' },
      { date: '11/24', dayOfMonth: 24, status: 'working', startTime: '10:00', endTime: '21:00' },
      { date: '11/25', dayOfMonth: 25, status: 'working', startTime: '10:00', endTime: '21:00' },
      { date: '11/26', dayOfMonth: 26, status: 'off' },
      { date: '11/27', dayOfMonth: 27, status: 'working', startTime: '10:00', endTime: '21:00' },
      { date: '11/28', dayOfMonth: 28, status: 'off' },
      { date: '11/29', dayOfMonth: 29, status: 'working', startTime: '10:00', endTime: '21:00' },
    ]);

    return weeks;
  };

  const calendarWeeks = generateCalendarDays();
  const selectedWomanData = women.find(w => w.id === selectedWoman);

  const weekDays = [
    { label: '日', color: 'text-red-500' },
    { label: '月', color: 'text-gray-700', highlight: true },
    { label: '火', color: 'text-gray-700' },
    { label: '水', color: 'text-gray-700' },
    { label: '木', color: 'text-gray-700' },
    { label: '金', color: 'text-gray-700' },
    { label: '土', color: 'text-blue-500' },
  ];

  return (
    <div className="p-3 md:p-5 min-h-screen bg-gray-100">
      {/* Header Buttons */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <button className="py-2.5 px-5 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-2">
          <Download size={16} />
          出勤取り込み
        </button>
        <button className="py-2.5 px-5 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
          <Settings size={16} />
          ツール
        </button>
        <button className="py-2.5 px-5 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
          <Upload size={16} />
          サイトへ更新
        </button>
        <button className="py-2.5 px-5 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
          <RefreshCw size={16} />
          即姫・接客一括更新
        </button>
      </div>

      {/* Main Content Card */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Search and Controls Bar */}
        <div className="p-4 border-b border-gray-200 flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative min-w-[200px] max-w-[280px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="女性名で検索"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-10 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            />
            <SlidersHorizontal size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" />
          </div>

          {/* Action Links */}
          <button className="text-sm text-blue-500 hover:text-blue-700 flex items-center gap-1.5">
            <Copy size={15} />
            出勤のコピー
          </button>
        </div>

        {/* Date Navigation */}
        <div className="px-4 py-3 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button className="py-1.5 px-4 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">
              今月
            </button>
            <div className="flex items-center">
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <ChevronLeft size={18} />
              </button>
              <span className="text-sm text-gray-700 mx-2">
                {currentMonth.year}年{currentMonth.month}月
              </span>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* View Mode Tabs */}
          <div className="flex items-center">
            <button
              onClick={() => setViewMode('day')}
              className={`py-1.5 px-4 text-sm border ${
                viewMode === 'day'
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
              }`}
            >
              日表示
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`py-1.5 px-4 text-sm border-t border-b ${
                viewMode === 'week'
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
              }`}
            >
              週表示
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`py-1.5 px-4 text-sm border ${
                viewMode === 'month'
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
              }`}
            >
              月表示
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex">
          {/* Left Sidebar - Women List */}
          <div className="w-[200px] border-r border-gray-200 flex-shrink-0">
            {women.map((woman) => (
              <div
                key={woman.id}
                onClick={() => setSelectedWoman(woman.id)}
                className={`p-3 border-b border-gray-100 cursor-pointer transition-colors ${
                  selectedWoman === woman.id
                    ? 'bg-white border-l-2 border-l-blue-500 shadow-sm'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-14 bg-gradient-to-br from-red-200 to-red-300 rounded overflow-hidden flex-shrink-0">
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-red-400 text-[7px]">No Image</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-800 font-medium truncate">{woman.name}</div>
                    {selectedWoman === woman.id && (
                      <div className="flex items-center gap-2 mt-1 text-xs">
                        <span className="text-gray-500">基本出勤</span>
                        <span className="text-blue-500 cursor-pointer hover:underline">適用</span>
                        <span className="text-blue-500 cursor-pointer hover:underline">設定</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Calendar */}
          <div className="flex-1 overflow-x-auto">
            {/* Calendar Title */}
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg text-gray-800">
                <span className="text-2xl font-light">{currentMonth.month}</span>
                <span className="text-sm text-gray-500 ml-1">月</span>
                <span className="text-sm text-gray-700 ml-4">{selectedWomanData?.name}さんの出勤情報</span>
              </h2>
            </div>

            {/* Calendar Grid */}
            <div className="min-w-[900px]">
              {/* Week Day Headers */}
              <div className="grid grid-cols-7 border-b border-gray-200">
                {weekDays.map((day, index) => (
                  <div
                    key={day.label}
                    className={`py-3 text-center text-sm font-medium ${day.color} ${
                      index === 1 ? 'bg-blue-50' : ''
                    }`}
                  >
                    {day.label}
                  </div>
                ))}
              </div>

              {/* Calendar Weeks */}
              {calendarWeeks.map((week, weekIndex) => (
                <div key={weekIndex} className="grid grid-cols-7 border-b border-gray-100">
                  {week.map((day, dayIndex) => {
                    const isSunday = dayIndex === 0;
                    const isSaturday = dayIndex === 6;
                    const isMonday = dayIndex === 1;
                    const isToday = day.date === '11/29';

                    return (
                      <div
                        key={day.date}
                        className={`min-h-[110px] p-2 border-r border-gray-100 last:border-r-0 ${
                          isMonday ? 'bg-blue-50/50' : ''
                        } ${isSaturday ? 'bg-blue-50/30' : ''}`}
                      >
                        {/* Date */}
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-sm ${
                            isToday
                              ? 'bg-gray-800 text-white px-2 py-0.5 rounded'
                              : isSunday
                                ? 'text-red-500'
                                : isSaturday
                                  ? 'text-blue-500'
                                  : 'text-gray-700'
                          }`}>
                            {day.date}
                          </span>
                          {day.status === 'unset' && (
                            <div className="flex items-center gap-1">
                              <span className="text-gray-400">→</span>
                              <X size={12} className="text-gray-400" />
                            </div>
                          )}
                        </div>

                        {/* Status */}
                        {day.status === 'working' && (
                          <>
                            <div className="flex items-center gap-1 mb-1">
                              <span className="text-blue-500 text-sm">出勤</span>
                              <ChevronDown size={12} className="text-blue-300" />
                            </div>
                            <div className="text-xs text-gray-600 mb-1">
                              {day.startTime} <span className="text-gray-400">〜</span> {day.endTime}
                            </div>
                            <div className="text-xs text-blue-300 cursor-pointer hover:text-blue-500">
                              コメントを入力
                            </div>
                          </>
                        )}

                        {day.status === 'off' && (
                          <>
                            <div className="flex items-center gap-1 mb-1">
                              <span className="text-red-400 text-sm">休み</span>
                              <ChevronDown size={12} className="text-red-300" />
                            </div>
                            <div className="text-xs text-red-300 cursor-pointer hover:text-red-500 mt-6">
                              コメントを入力
                            </div>
                          </>
                        )}

                        {day.status === 'unset' && (
                          <>
                            <div className="flex items-center gap-1 mb-1">
                              <span className="text-gray-400 text-sm">未設定</span>
                              <ChevronDown size={12} className="text-gray-300" />
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlySchedulePage;
