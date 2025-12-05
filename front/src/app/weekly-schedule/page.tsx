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
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowRight,
  FileText,
  ChevronDown
} from 'lucide-react';

interface ScheduleEntry {
  status: 'working' | 'off';
  startTime?: string;
  endTime?: string;
}

interface WomanSchedule {
  id: string;
  name: string;
  image: string;
  schedule: {
    [key: string]: ScheduleEntry;
  };
}

const WeeklySchedulePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');

  const days = [
    { date: '24', day: '月', count: 79, isWeekend: false },
    { date: '25', day: '火', count: 86, isWeekend: false },
    { date: '26', day: '水', count: 88, isWeekend: false },
    { date: '27', day: '木', count: 80, isWeekend: false },
    { date: '28', day: '金', count: 88, isWeekend: false },
    { date: '29', day: '土', count: 99, isWeekend: true },
    { date: '30', day: '日', count: 72, isWeekend: true },
  ];

  const womenSchedules: WomanSchedule[] = [
    {
      id: '1',
      name: '瑠璃-ruri-',
      image: '/women/1.jpg',
      schedule: {
        '24': { status: 'working', startTime: '10:00', endTime: '21:00' },
        '25': { status: 'working', startTime: '10:00', endTime: '16:30' },
        '26': { status: 'off' },
        '27': { status: 'working', startTime: '19:00', endTime: '22:00' },
        '28': { status: 'off' },
        '29': { status: 'working', startTime: '10:00', endTime: '16:30' },
        '30': { status: 'working', startTime: '10:00', endTime: '21:00' },
      }
    },
    {
      id: '2',
      name: '彩羽-ayaha-',
      image: '/women/2.jpg',
      schedule: {
        '24': { status: 'off' },
        '25': { status: 'working', startTime: '15:30', endTime: '16:30' },
        '26': { status: 'off' },
        '27': { status: 'working', startTime: '20:30', endTime: '22:30' },
        '28': { status: 'working', startTime: '17:00', endTime: '18:00' },
        '29': { status: 'working', startTime: '16:30', endTime: '17:30' },
        '30': { status: 'off' },
      }
    },
    {
      id: '3',
      name: 'えれな',
      image: '/women/3.jpg',
      schedule: {
        '24': { status: 'working', startTime: '13:00', endTime: '19:00' },
        '25': { status: 'working', startTime: '17:00', endTime: '23:00' },
        '26': { status: 'working', startTime: '17:00', endTime: '翌00:00' },
        '27': { status: 'off' },
        '28': { status: 'off' },
        '29': { status: 'working', startTime: '17:00', endTime: '23:00' },
        '30': { status: 'working', startTime: '15:00', endTime: '21:00' },
      }
    },
    {
      id: '4',
      name: 'ミルク',
      image: '/women/4.jpg',
      schedule: {
        '24': { status: 'working', startTime: '18:30', endTime: '20:30' },
        '25': { status: 'working', startTime: '10:00', endTime: '15:00' },
        '26': { status: 'off' },
        '27': { status: 'working', startTime: '13:00', endTime: '14:30' },
        '28': { status: 'working', startTime: '16:00', endTime: '21:00' },
        '29': { status: 'working', startTime: '13:30', endTime: '18:00' },
        '30': { status: 'working', startTime: '15:00', endTime: '20:00' },
      }
    },
    {
      id: '5',
      name: 'ラブリ',
      image: '/women/5.jpg',
      schedule: {
        '24': { status: 'working', startTime: '17:00', endTime: '21:00' },
        '25': { status: 'working', startTime: '17:00', endTime: '翌02:00' },
        '26': { status: 'working', startTime: '12:30', endTime: '翌02:00' },
        '27': { status: 'working', startTime: '18:00', endTime: '翌02:00' },
        '28': { status: 'off' },
        '29': { status: 'working', startTime: '14:00', endTime: '21:00' },
        '30': { status: 'off' },
      }
    },
    {
      id: '6',
      name: 'ひな',
      image: '/women/6.jpg',
      schedule: {
        '24': { status: 'off' },
        '25': { status: 'off' },
        '26': { status: 'off' },
        '27': { status: 'off' },
        '28': { status: 'off' },
        '29': { status: 'working', startTime: '10:30', endTime: '14:00' },
        '30': { status: 'off' },
      }
    },
  ];

  return (
    <div className="p-3 md:p-5 min-h-screen bg-gray-100">
      {/* Header Buttons */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <button className="py-2.5 px-5 bg-green-500 text-white rounded-full text-sm font-medium hover:bg-green-600 transition-colors flex items-center gap-2">
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
          <div className="flex items-center gap-6">
            <button className="text-sm text-blue-500 hover:text-blue-700 flex items-center gap-1.5">
              <Copy size={15} />
              出勤のコピー
            </button>
            <button className="text-sm text-blue-500 hover:text-blue-700 flex items-center gap-1.5">
              <Trash2 size={15} />
              選択削除
            </button>
          </div>

          {/* Pagination Info */}
          <div className="flex items-center gap-3 ml-auto">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <span>1-50人 / 286人中</span>
              <ChevronDown size={14} className="text-gray-400" />
            </div>
            <div className="flex items-center">
              <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600">
                <ChevronLeft size={18} />
              </button>
              {[1, 2, 3, 4].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${
                    currentPage === page
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Date Navigation */}
        <div className="px-4 py-3 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button className="py-1.5 px-4 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">
              今週
            </button>
            <div className="flex items-center">
              <button className="p-1 text-blue-500 hover:text-blue-700">
                <ChevronsLeft size={18} />
              </button>
              <button className="p-1 text-blue-500 hover:text-blue-700">
                <ChevronLeft size={18} />
              </button>
              <span className="text-sm text-gray-700 mx-2">
                2025年11月24日〜2025年11月30日
              </span>
              <button className="p-1 text-blue-500 hover:text-blue-700">
                <ChevronRight size={18} />
              </button>
              <button className="p-1 text-blue-500 hover:text-blue-700">
                <ChevronsRight size={18} />
              </button>
            </div>
          </div>

          {/* View Mode Tabs */}
          <div className="flex items-center">
            <button
              onClick={() => setViewMode('day')}
              className={`py-1.5 px-4 text-sm border border-gray-300 rounded-l ${
                viewMode === 'day'
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              日表示
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`py-1.5 px-4 text-sm border-t border-b border-gray-300 ${
                viewMode === 'week'
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              週表示
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`py-1.5 px-4 text-sm border border-gray-300 rounded-r ${
                viewMode === 'month'
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              月表示
            </button>
          </div>
        </div>

        {/* Schedule Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px] border-collapse">
            {/* Table Header */}
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 w-[160px] border-r border-gray-200">
                  <div className="flex items-center gap-1">
                    名前
                    <ArrowUpDown size={14} className="text-gray-400" />
                  </div>
                </th>
                <th className="py-3 px-3 text-center text-sm font-medium text-gray-600 w-[70px] border-r border-gray-200">
                  <div className="flex items-center justify-center gap-1">
                    11月
                    <ArrowRight size={14} className="text-gray-400" />
                  </div>
                </th>
                {days.map((day) => (
                  <th
                    key={day.date}
                    className={`py-3 px-2 text-center text-sm font-medium w-[140px] border-r border-gray-200 last:border-r-0 ${
                      day.isWeekend ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className={`flex items-center justify-center gap-1 ${day.isWeekend ? 'text-blue-600' : 'text-gray-700'}`}>
                      {day.date}({day.day})
                      <ArrowUpDown size={14} className="text-gray-400" />
                      <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full ml-1">
                        {day.count}名
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {womenSchedules.map((woman) => (
                <tr key={woman.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                  {/* Name Cell */}
                  <td className="py-3 px-4 border-r border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-14 bg-gradient-to-br from-pink-200 to-pink-300 rounded overflow-hidden flex-shrink-0">
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-pink-400 text-[8px]">No Image</span>
                        </div>
                      </div>
                      <span className="text-sm text-gray-800 flex-1">{woman.name}</span>
                      <FileText size={16} className="text-gray-300 cursor-pointer hover:text-gray-500 flex-shrink-0" />
                    </div>
                  </td>

                  {/* Empty month column */}
                  <td className="py-3 px-3 border-r border-gray-200"></td>

                  {/* Schedule Cells */}
                  {days.map((day) => {
                    const schedule = woman.schedule[day.date];
                    const isWorking = schedule?.status === 'working';
                    return (
                      <td
                        key={day.date}
                        className="p-0 border-r border-gray-200 last:border-r-0 align-top"
                      >
                        <div className={`p-3 min-h-[110px] ${isWorking ? 'bg-sky-50' : 'bg-red-50'}`}>
                          {isWorking ? (
                            <>
                              {/* Status dropdown */}
                              <div className="flex items-center gap-1 mb-2">
                                <span className="text-blue-500 text-sm">出勤</span>
                                <ChevronDown size={14} className="text-blue-300" />
                              </div>
                              {/* Time box - WHITE background */}
                              <div className="bg-white rounded px-3 py-2 mb-2">
                                <div className="flex items-center text-sm text-gray-600">
                                  <span>{schedule.startTime}</span>
                                  <span className="mx-2 text-gray-400">〜</span>
                                  <span>{schedule.endTime}</span>
                                </div>
                              </div>
                              {/* Comment */}
                              <div className="text-xs text-blue-300 cursor-pointer hover:text-blue-500">
                                コメントを入力
                              </div>
                            </>
                          ) : (
                            <>
                              {/* Status dropdown */}
                              <div className="flex items-center gap-1 mb-2">
                                <span className="text-red-400 text-sm">休み</span>
                                <ChevronDown size={14} className="text-red-300" />
                              </div>
                              {/* Empty space */}
                              <div className="h-[42px]"></div>
                              {/* Comment */}
                              <div className="text-xs text-red-300 cursor-pointer hover:text-red-500">
                                コメントを入力
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WeeklySchedulePage;
