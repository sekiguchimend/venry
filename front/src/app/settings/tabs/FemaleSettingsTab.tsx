'use client';

import React, { useState } from 'react';
import { HelpCircle, Settings, Plus, User } from 'lucide-react';

const FemaleSettingsTab: React.FC = () => {
  // 画像パターン設定
  const [enableImagePattern, setEnableImagePattern] = useState(false);

  // 女性画像更新設定
  const [deleteExtraImages, setDeleteExtraImages] = useState(true);

  // 削除推奨女性の警告
  const [disableDeleteWarning, setDisableDeleteWarning] = useState(false);

  // 共通Q&A設定 - 取り込み設定
  const [importToCommonQA, setImportToCommonQA] = useState(true);

  return (
    <div className="p-8">
      <h1 className="text-lg font-bold text-gray-800 mb-6">女性設定</h1>

      {/* 画像パターン設定 */}
      <div className="pb-6 mb-6 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-base font-bold text-[#E53935]">画像パターン設定</h2>
          <HelpCircle size={16} className="text-[#2196F3] cursor-pointer" />
        </div>
        <p className="text-sm text-gray-500 mb-4">
          サイトごとに女性画像を変更したい場合は「画像パターンを有効にする」にチェックを入れて保存してください。
        </p>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-700">画像パターンを有効にする</span>
          <button
            onClick={() => setEnableImagePattern(!enableImagePattern)}
            className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
              enableImagePattern ? 'bg-[#2196F3]' : 'bg-gray-300'
            }`}
          >
            <span
              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                enableImagePattern ? 'left-7' : 'left-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* 女性画像更新設定 */}
      <div className="pb-6 mb-6 border-b border-gray-100">
        <h2 className="text-base font-bold text-gray-800 mb-4">女性画像更新設定</h2>

        <div className="flex items-center gap-3 mb-4 pl-4">
          <span className="text-sm font-bold text-gray-700">サイト側の画像枚数の方が多い場合は削除する</span>
          <button
            onClick={() => setDeleteExtraImages(!deleteExtraImages)}
            className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
              deleteExtraImages ? 'bg-[#2196F3]' : 'bg-gray-300'
            }`}
          >
            <span
              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                deleteExtraImages ? 'left-7' : 'left-1'
              }`}
            />
          </button>
        </div>

        <div className="pl-4 border-l-2 border-gray-200 ml-4">
          <p className="text-sm text-gray-500 mb-4">
            画像が削除できない場合は以下のNoImage画像を登録します。
          </p>

          {/* 画像アップロードエリア */}
          <div className="flex items-start gap-6 p-4 border border-gray-200 rounded bg-white max-w-md">
            <div className="w-20 h-24 bg-gray-100 border border-gray-200 rounded flex flex-col items-center justify-center">
              <User size={32} className="text-gray-400 mb-1" />
              <span className="text-[10px] text-gray-400">NO IMAGE</span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-3">
                画像を<span className="text-[#2196F3]">ドロップ</span>して変更
              </p>
              <button className="flex items-center gap-1 text-sm text-[#2196F3] hover:underline cursor-pointer bg-transparent border-none">
                <Plus size={14} />
                画像を参照
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 削除推奨女性の警告 */}
      <div className="pb-6 mb-6 border-b border-gray-100">
        <h2 className="text-base font-bold text-gray-800 mb-4">削除推奨女性の警告</h2>
        <div className="pl-4">
          <label className="flex items-center gap-2 cursor-pointer mb-3">
            <input
              type="checkbox"
              checked={disableDeleteWarning}
              onChange={(e) => setDisableDeleteWarning(e.target.checked)}
              className="w-4 h-4 accent-[#2196F3]"
            />
            <span className="text-sm text-gray-600">削除推奨女性の警告ポップアップを無効化する</span>
          </label>
          <a href="#" className="text-sm text-[#2196F3] hover:underline pl-6">削除推奨の表示を解除する</a>
        </div>
      </div>

      {/* 共通Q&A設定 */}
      <div className="pb-6">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-base font-bold text-gray-800">共通Q&A設定</h2>
          <HelpCircle size={16} className="text-[#2196F3] cursor-pointer" />
        </div>

        {/* 更新対象サイト設定 */}
        <div className="pl-4 border-l-2 border-gray-200 ml-4 mb-6">
          <h3 className="text-sm font-bold text-gray-700 mb-2">更新対象サイト設定</h3>
          <p className="text-sm text-gray-500 mb-3">
            各サイトのQ&A項目を同一内容で更新したい場合は<span className="text-[#E53935]">対象サイトを選択</span>してください。
          </p>
          <button className="flex items-center gap-2 text-sm text-[#2196F3] hover:underline cursor-pointer bg-transparent border-none">
            <Settings size={14} />
            更新サイト設定
          </button>
        </div>

        {/* 取り込み設定 */}
        <div className="pl-4 border-l-2 border-gray-200 ml-4">
          <h3 className="text-sm font-bold text-gray-700 mb-3">取り込み設定</h3>
          <label className="flex items-center gap-2 cursor-pointer mb-2">
            <input
              type="checkbox"
              checked={importToCommonQA}
              onChange={(e) => setImportToCommonQA(e.target.checked)}
              className="w-4 h-4 accent-[#2196F3]"
            />
            <span className="text-sm text-gray-600">女性取り込み時、共通Q&Aタブへ取り込む</span>
          </label>
          <p className="text-xs text-gray-400 pl-6">※オートシンクロ(女性)を含む</p>
        </div>
      </div>
    </div>
  );
};

export default FemaleSettingsTab;
