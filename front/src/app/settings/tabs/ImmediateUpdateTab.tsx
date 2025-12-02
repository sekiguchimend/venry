'use client';

import React, { useState } from 'react';

const ImmediateUpdateTab: React.FC = () => {
  // リセット時間の設定
  const [resetTime, setResetTime] = useState('--:--');

  // デリヘルタウン 更新設定
  const [deliveryHours, setDeliveryHours] = useState('3時間');

  const timeOptions = [
    '--:--',
    '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
  ];

  const hourOptions = [
    '1時間', '2時間', '3時間', '4時間', '5時間', '6時間'
  ];

  return (
    <div className="p-8">
      <h1 className="text-lg font-bold text-gray-800 mb-6">即姫・接客一括更新設定</h1>

      {/* リセット時間の設定 */}
      <div className="pb-6 mb-6 border-b border-gray-100">
        <h2 className="text-base font-bold text-[#E53935] mb-2">リセット時間の設定</h2>
        <p className="text-sm text-gray-500 mb-4">
          指定時刻になると、自動更新設定中のサイトのタイマーを再スタートします。
        </p>
        <div className="flex items-center gap-4">
          <select
            value={resetTime}
            onChange={(e) => setResetTime(e.target.value)}
            className="w-40 px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700 outline-none"
          >
            {timeOptions.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
          <a href="#" className="text-sm text-gray-400 hover:text-gray-600">指定解除</a>
        </div>
      </div>

      {/* デリヘルタウン 更新設定 */}
      <div className="pb-6">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-base font-bold text-gray-800">デリヘルタウン　更新設定</h2>
          <span className="px-2 py-1 bg-[#FFA726] text-white text-[11px] rounded">
            デリヘルタウンご利用の場合のみ有効
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          退勤時間の何時間前から「あと1枠」を付与するか選択します。
        </p>
        <select
          value={deliveryHours}
          onChange={(e) => setDeliveryHours(e.target.value)}
          className="w-40 px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700 outline-none"
        >
          {hourOptions.map((hour) => (
            <option key={hour} value={hour}>{hour}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ImmediateUpdateTab;
