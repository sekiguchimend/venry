'use client';

import React, { useState } from 'react';
import { Plus, Image } from 'lucide-react';

const OtherSettingsTab: React.FC = () => {
  const [accountText, setAccountText] = useState('');

  return (
    <div className="p-8">
      <h1 className="text-lg font-bold text-gray-800 mb-6">その他</h1>

      {/* アカウントアイコン変更 */}
      <div className="pb-6">
        <h2 className="text-base font-bold text-[#E53935] mb-4">アカウントアイコン変更</h2>

        {/* 文字入力 */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-sm text-gray-600">文字:</span>
          <div className="relative">
            <input
              type="text"
              value={accountText}
              onChange={(e) => setAccountText(e.target.value.slice(0, 10))}
              placeholder="文字を入力"
              maxLength={10}
              className="w-48 px-3 py-2 border border-gray-300 rounded text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-[#2196F3] pr-12"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
              {accountText.length}/10
            </span>
          </div>
        </div>

        {/* 画像アップロード */}
        <div className="flex items-start gap-4">
          <span className="text-sm text-gray-600 pt-2">画像:</span>
          <div className="flex items-start gap-4 p-4 border border-gray-200 rounded bg-white">
            <div className="w-20 h-20 bg-[#333] rounded flex items-center justify-center">
              <Image size={32} className="text-gray-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-3">
                画像をドロップしてください
              </p>
              <button className="flex items-center gap-1 text-sm text-[#2196F3] hover:underline cursor-pointer bg-transparent border-none">
                <Plus size={14} />
                画像を参照
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherSettingsTab;
