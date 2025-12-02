'use client';

import React, { useState } from 'react';
import { HelpCircle, Settings, Pencil } from 'lucide-react';

const BasicSettingsTab: React.FC = () => {
  const [timeMode, setTimeMode] = useState<'24h' | 'custom'>('24h');
  const [startTime, setStartTime] = useState('06:00');
  const [endTime, setEndTime] = useState('翌05:59');
  const [dateChangeTime, setDateChangeTime] = useState('05:00');
  const [officialUrl, setOfficialUrl] = useState('https://www.gall.jp/schedule.html');
  const [officialEmail, setOfficialEmail] = useState('');
  const [contactEmail1, setContactEmail1] = useState('web.dcp.web@gmail.com');
  const [contactEmail2, setContactEmail2] = useState('');
  const [contactEmail3, setContactEmail3] = useState('');
  const [receiveNotification, setReceiveNotification] = useState(true);

  const timeOptions = [
    '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00',
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
  ];

  const endTimeOptions = [
    '翌00:59', '翌01:59', '翌02:59', '翌03:59', '翌04:59', '翌05:59', '翌06:59', '翌07:59',
    '翌08:59', '翌09:59', '翌10:59', '翌11:59', '翌12:59', '翌13:59', '翌14:59', '翌15:59',
    '翌16:59', '翌17:59', '翌18:59', '翌19:59', '翌20:59', '翌21:59', '翌22:59', '翌23:59'
  ];

  const handleSave = () => {
    console.log('Settings saved');
  };

  return (
    <div className="p-8">
      <h1 className="text-lg font-bold text-gray-800 mb-6">基本設定</h1>

      {/* 更新時間帯 */}
      <div className="pb-6 mb-6 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-sm font-bold text-gray-800">更新時間帯</h2>
          <span className="px-1.5 py-0.5 bg-[#FF5722] text-white text-[10px] rounded">必須</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
          <span>更新時間帯はコンテンツ更新画面にて個別に設定することもできます。</span>
          <HelpCircle size={14} className="text-[#2196F3] cursor-pointer" />
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="timeMode"
              checked={timeMode === '24h'}
              onChange={() => setTimeMode('24h')}
              className="w-4 h-4 accent-[#2196F3]"
            />
            <span className="text-sm text-gray-700">24時間</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="timeMode"
              checked={timeMode === 'custom'}
              onChange={() => setTimeMode('custom')}
              className="w-4 h-4 accent-[#2196F3]"
            />
            <span className="text-sm text-gray-700">時間指定</span>
          </label>

          <div className="flex items-center gap-2">
            <select
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              disabled={timeMode === '24h'}
              className={`px-3 py-1.5 border border-gray-300 rounded text-sm outline-none ${
                timeMode === '24h' ? 'bg-gray-50 text-gray-400' : 'bg-white text-gray-700'
              }`}
            >
              {timeOptions.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
            <span className="text-gray-400">〜</span>
            <select
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              disabled={timeMode === '24h'}
              className={`px-3 py-1.5 border border-gray-300 rounded text-sm outline-none ${
                timeMode === '24h' ? 'bg-gray-50 text-gray-400' : 'bg-white text-gray-700'
              }`}
            >
              {endTimeOptions.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 日付変更時間 */}
      <div className="pb-6 mb-6 border-b border-gray-100">
        <h2 className="text-sm font-bold text-gray-800 mb-4">日付変更時間</h2>
        <select
          value={dateChangeTime}
          onChange={(e) => setDateChangeTime(e.target.value)}
          className="px-3 py-1.5 border border-gray-300 rounded text-sm bg-white text-gray-700 outline-none"
        >
          {timeOptions.map((time) => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
      </div>

      {/* オフィシャルURL */}
      <div className="pb-6 mb-6 border-b border-gray-100">
        <h2 className="text-sm font-bold text-gray-800 mb-4">オフィシャルURL</h2>
        <div className="relative">
          <input
            type="text"
            value={officialUrl}
            onChange={(e) => setOfficialUrl(e.target.value)}
            maxLength={200}
            className="w-full px-3 py-2.5 border border-gray-300 rounded text-sm text-gray-700 outline-none focus:border-[#2196F3] pr-16"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
            {officialUrl.length}/200
          </span>
        </div>
      </div>

      {/* オフィシャルメールアドレス */}
      <div className="pb-6 mb-6 border-b border-gray-100">
        <h2 className="text-sm font-bold text-gray-800 mb-4">オフィシャルメールアドレス</h2>
        <div className="relative">
          <input
            type="email"
            value={officialEmail}
            onChange={(e) => setOfficialEmail(e.target.value)}
            placeholder="例：mr-support@venrey.jp"
            maxLength={100}
            className="w-full px-3 py-2.5 border border-gray-300 rounded text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-[#2196F3] pr-16"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
            {officialEmail.length}/100
          </span>
        </div>
      </div>

      {/* ご連絡用メールアドレス */}
      <div className="pb-6 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-sm font-bold text-gray-800">ご連絡用メールアドレス</h2>
          <HelpCircle size={14} className="text-[#2196F3] cursor-pointer" />
          <span className="px-1.5 py-0.5 bg-[#FF5722] text-white text-[10px] rounded">必須</span>
        </div>

        <div className="flex gap-3 mb-4">
          {/* Email 1 */}
          <div className="flex-1">
            <div className="flex items-center border border-gray-300 rounded overflow-hidden bg-white">
              <span className="px-2.5 flex items-center border-r border-gray-200">
                <Pencil size={14} className="text-[#2196F3]" />
              </span>
              <input
                type="email"
                value={contactEmail1}
                onChange={(e) => setContactEmail1(e.target.value)}
                maxLength={100}
                className="flex-1 px-3 py-2 text-sm text-gray-700 outline-none border-none bg-transparent"
              />
              <span className="px-3 text-xs text-gray-400">
                {contactEmail1.length}/100
              </span>
            </div>
          </div>

          {/* Email 2 */}
          <div className="flex-1">
            <div className="flex items-center border border-gray-300 rounded overflow-hidden bg-white">
              <input
                type="email"
                value={contactEmail2}
                onChange={(e) => setContactEmail2(e.target.value)}
                placeholder="例：mail@example.com"
                maxLength={100}
                className="flex-1 px-3 py-2 text-sm text-gray-700 placeholder-gray-400 outline-none border-none bg-transparent"
              />
              <span className="px-3 text-xs text-gray-400">
                {contactEmail2.length}/100
              </span>
            </div>
          </div>

          {/* Email 3 */}
          <div className="flex-1">
            <div className="flex items-center border border-gray-300 rounded overflow-hidden bg-white">
              <input
                type="email"
                value={contactEmail3}
                onChange={(e) => setContactEmail3(e.target.value)}
                placeholder="例：mail@example.com"
                maxLength={100}
                className="flex-1 px-3 py-2 text-sm text-gray-700 placeholder-gray-400 outline-none border-none bg-transparent"
              />
              <span className="px-3 text-xs text-gray-400">
                {contactEmail3.length}/100
              </span>
            </div>
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={receiveNotification}
            onChange={(e) => setReceiveNotification(e.target.checked)}
            className="w-4 h-4 accent-[#2196F3]"
          />
          <span className="text-sm text-gray-600">
            お知らせメールを受信する(※メンテナンス等のお知らせはチェック状態にかかわらずメールを送信いたします)
          </span>
        </label>
      </div>
    </div>
  );
};

export default BasicSettingsTab;
