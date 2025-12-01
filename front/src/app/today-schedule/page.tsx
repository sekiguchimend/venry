'use client';

import React, { useState } from 'react';
import {
  Download,
  Settings,
  Upload,
  RefreshCw,
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Calendar
} from 'lucide-react';

interface WomanSchedule {
  id: string;
  name: string;
  status: 'working' | 'off';
  startTime: string;
  endTime: string;
  startHour: number;
  endHour: number;
}

const TodaySchedulePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');

  const womenSchedules: WomanSchedule[] = [
    { id: '1', name: '瑠璃-ruri-', status: 'working', startTime: '10:00', endTime: '16:30', startHour: 10, endHour: 17 },
    { id: '2', name: '彩羽-ayaha-', status: 'working', startTime: '16:30', endTime: '17:30', startHour: 17, endHour: 18 },
    { id: '3', name: 'えれな', status: 'working', startTime: '17:00', endTime: '23:00', startHour: 17, endHour: 23 },
    { id: '4', name: 'ミルク', status: 'working', startTime: '13:30', endTime: '18:00', startHour: 14, endHour: 18 },
    { id: '5', name: 'ラブリ', status: 'working', startTime: '14:00', endTime: '21:00', startHour: 14, endHour: 21 },
    { id: '6', name: 'ひな', status: 'working', startTime: '10:30', endTime: '14:00', startHour: 10, endHour: 14 },
  ];

  // 0-23 + 翌日0-12
  const hours1 = Array.from({ length: 24 }, (_, i) => i);
  const hours2 = Array.from({ length: 13 }, (_, i) => i);

  return (
    <div className="p-4 min-h-screen bg-gray-100">
      {/* Header Buttons */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <button className="py-2 px-5 text-white text-sm rounded-full flex items-center gap-2" style={{ backgroundColor: '#4CAF50' }}>
          <Download size={16} />
          出勤取り込み
        </button>
        <button className="py-2 px-5 bg-white border border-gray-300 rounded text-sm text-gray-700 flex items-center gap-2">
          <Settings size={16} />
          ツール
        </button>
        <button className="py-2 px-5 bg-white border border-gray-300 rounded text-sm text-gray-700 flex items-center gap-2">
          <Upload size={16} />
          サイトへ更新
        </button>
        <button className="py-2 px-5 bg-white border border-gray-300 rounded text-sm text-gray-700 flex items-center gap-2">
          <RefreshCw size={16} />
          即姫・接客一括更新
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-white border border-gray-200 rounded-lg">
        {/* Search Bar */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="relative w-[280px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="女性名で検索"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-10 pr-10 border border-gray-300 rounded-lg text-sm"
            />
            <SlidersHorizontal size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">1-50人 / 286人中</span>
            <ChevronDown size={14} className="text-gray-400" />
            <div className="flex items-center gap-1">
              <ChevronLeft size={18} className="text-gray-400" />
              {[1, 2, 3, 4].map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-7 h-7 rounded-full text-sm ${currentPage === p ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                >
                  {p}
                </button>
              ))}
              <ChevronRight size={18} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Date Navigation */}
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="py-1.5 px-4 border border-gray-300 rounded text-sm text-gray-700">今日</button>
            <ChevronLeft size={18} className="text-blue-500" />
            <span className="text-sm">2025年11月29日</span>
            <ChevronRight size={18} className="text-blue-500" />
          </div>
          <div className="flex">
            <button onClick={() => setViewMode('day')} className={`py-1.5 px-4 text-sm border rounded-l ${viewMode === 'day' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-600 border-gray-300'}`}>日表示</button>
            <button onClick={() => setViewMode('week')} className={`py-1.5 px-4 text-sm border-t border-b ${viewMode === 'week' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-600 border-gray-300'}`}>週表示</button>
            <button onClick={() => setViewMode('month')} className={`py-1.5 px-4 text-sm border rounded-r ${viewMode === 'month' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-600 border-gray-300'}`}>月表示</button>
          </div>
        </div>

        {/* Date Header */}
        <div className="px-4 py-2 border-b border-gray-200 flex items-center gap-2">
          <span className="text-blue-500 font-medium">11/29(土)</span>
          <ChevronDown size={14} className="text-gray-400" />
          <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">100名</span>
        </div>

        {/* Schedule List */}
        <div className="overflow-x-auto">
          <div style={{ minWidth: '1150px' }}>
            {womenSchedules.map((woman) => (
              <div key={woman.id} className="flex border-b border-gray-200">
                {/* Name */}
                <div className="w-[160px] flex-shrink-0 p-3 border-r border-gray-200 flex items-center gap-3 bg-white">
                  <div className="w-12 h-16 rounded overflow-hidden flex-shrink-0" style={{ background: 'linear-gradient(135deg, #f8bbd9 0%, #f48fb1 100%)' }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <span style={{ fontSize: '7px', color: '#ec407a' }}>No Image</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-800">{woman.name}</span>
                </div>

                {/* Schedule Cell - 縦長 */}
                <div style={{ flex: 1, padding: '15px 15px 12px 15px' }}>
                  {/* 上部: 出勤 + 時間 + コメント + アイコン */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    {/* 左: 出勤 ▼ */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#2980B9', fontSize: '18px', fontWeight: 'bold' }}>出勤</span>
                      <ChevronDown size={18} style={{ color: '#85C1E9', marginLeft: '12px' }} />
                    </div>
                    {/* 右: 時間 + コメント + アイコン */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ color: '#2980B9', fontSize: '15px', fontWeight: 'bold' }}>{woman.startTime}</span>
                      <span style={{ color: '#999', fontSize: '15px' }}>〜</span>
                      <span style={{ color: '#2980B9', fontSize: '15px', fontWeight: 'bold' }}>{woman.endTime}</span>
                      <input type="text" placeholder="コメントを入力" style={{ width: '120px', height: '26px', fontSize: '12px', color: '#aaa', border: '1px solid #ccc', borderRadius: '3px', paddingLeft: '10px', backgroundColor: '#fff' }} />
                      <div style={{ width: '26px', height: '26px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Calendar size={15} color="#888" />
                      </div>
                    </div>
                  </div>
                  {/* 数字 */}
                  <div style={{ display: 'flex' }}>
                    {hours1.map((h) => (
                      <div key={`n1-${h}`} style={{ width: '25px', textAlign: 'center', fontSize: '13px', color: '#5D6D7E' }}>{h}</div>
                    ))}
                    {hours2.map((h) => (
                      <div key={`n2-${h}`} style={{ width: '25px', textAlign: 'center', fontSize: '13px', color: '#5D6D7E' }}>{h}</div>
                    ))}
                  </div>
                  {/* バー（点線付き） */}
                  <div style={{ display: 'flex', marginTop: '4px' }}>
                    {hours1.map((h) => (
                      <div
                        key={`b1-${h}`}
                        style={{
                          width: '25px',
                          height: '28px',
                          backgroundColor: h >= woman.startHour && h < woman.endHour ? '#3498DB' : '#E8E4DA',
                          borderRight: '1px dashed #C5CAD0'
                        }}
                      />
                    ))}
                    {hours2.map((h) => (
                      <div
                        key={`b2-${h}`}
                        style={{
                          width: '25px',
                          height: '28px',
                          backgroundColor: '#D5D8DC',
                          borderRight: '1px dashed #B8BCC2'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodaySchedulePage;
