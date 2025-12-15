'use client';

import React from 'react';
import type { BasicFormData } from './BasicTab';

export default function BasicLeftColumn({
  ImageIcon,
  Calendar,
  QuestionIcon,
  isPublic,
  setIsPublic,
  isNewcomer,
  setIsNewcomer,
  linkBirthday,
  setLinkBirthday,
  formData,
  handleInputChange,
}: {
  ImageIcon: React.ComponentType<{ size?: number; className?: string }>;
  Calendar: React.ComponentType<{ size?: number; className?: string }>;
  QuestionIcon: React.ComponentType<{ size?: number; className?: string }>;
  isPublic: boolean;
  setIsPublic: (v: boolean) => void;
  isNewcomer: boolean;
  setIsNewcomer: (v: boolean) => void;
  linkBirthday: boolean;
  setLinkBirthday: (v: boolean) => void;
  formData: BasicFormData;
  handleInputChange: (field: keyof BasicFormData, value: string) => void;
}) {
  return (
    <div className="flex-1 space-y-6">
      {/* Public Status */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">公開状態</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
        </label>
        <span className="text-sm text-gray-500">非公開</span>
      </div>

      {/* Profile Section */}
      <div className="flex gap-6">
        {/* Photo Area */}
        <div className="flex-shrink-0">
          <div className="w-28 h-36 bg-gray-100 border border-gray-200 rounded flex flex-col items-center justify-center text-gray-400">
            <ImageIcon size={28} className="mb-2" />
            <span className="text-xs">未登録</span>
          </div>
        </div>

        {/* Name Fields */}
        <div className="space-y-3">
          {/* Female Name */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 w-36 flex-shrink-0">
              <span className="px-2 py-0.5 bg-red-100 text-red-500 text-xs rounded flex-shrink-0">必須</span>
              <span className="text-sm text-gray-700 flex-shrink-0">女性名</span>
              <span className="text-gray-400 cursor-pointer text-xs flex-shrink-0">🔗</span>
            </div>
            <div className="relative w-60">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 bg-yellow-50"
                maxLength={15}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                {formData.name.length}/15
              </span>
            </div>
            <button className="text-gray-400 hover:text-gray-600 flex-shrink-0">
              <QuestionIcon size={16} />
            </button>
          </div>

          {/* Katakana */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 w-36 flex-shrink-0">
              <span className="px-2 py-0.5 bg-red-100 text-red-500 text-xs rounded flex-shrink-0">必須</span>
              <span className="text-sm text-red-500 flex-shrink-0">カタカナ</span>
            </div>
            <div className="relative w-60">
              <input
                type="text"
                value={formData.katakana}
                onChange={(e) => handleInputChange('katakana', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 bg-yellow-50"
                maxLength={50}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                {formData.katakana.length}/50
              </span>
            </div>
          </div>

          {/* Hiragana */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 w-36 flex-shrink-0">
              <span className="px-2 py-0.5 bg-red-100 text-red-500 text-xs rounded flex-shrink-0">必須</span>
              <span className="text-sm text-red-500 flex-shrink-0">ひらがな</span>
            </div>
            <div className="relative w-60">
              <input
                type="text"
                value={formData.hiragana}
                onChange={(e) => handleInputChange('hiragana', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 bg-yellow-50"
                maxLength={50}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                {formData.hiragana.length}/50
              </span>
            </div>
          </div>

          {/* Romaji */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 w-36 flex-shrink-0">
              <span className="text-sm text-gray-700 ml-10 flex-shrink-0">ローマ字</span>
              <QuestionIcon size={14} className="text-blue-500 flex-shrink-0" />
            </div>
            <div className="relative w-60">
              <input
                type="text"
                value={formData.romaji}
                onChange={(e) => handleInputChange('romaji', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                {formData.romaji.length}/∞
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Join Date & Newcomer */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="px-2 py-0.5 bg-red-100 text-red-500 text-xs rounded">必須</span>
          <span className="text-sm text-red-500">入店日</span>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="例：2018-1-1"
            value={formData.joinDate}
            onChange={(e) => handleInputChange('joinDate', e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 w-36 bg-yellow-50"
          />
          <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isNewcomer}
            onChange={(e) => setIsNewcomer(e.target.checked)}
            className="w-4 h-4 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">新人に設定する</span>
        </label>
      </div>

      {/* Age & Birthday */}
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="px-2 py-0.5 bg-red-100 text-red-500 text-xs rounded">必須</span>
            <span className="text-sm text-red-500">年齢</span>
          </div>
          <input
            type="text"
            value={formData.age}
            onChange={(e) => handleInputChange('age', e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 w-16 bg-yellow-50"
          />
          <span className="text-sm text-gray-600">歳</span>
          <label className="flex items-center gap-2 cursor-pointer ml-2">
            <input
              type="checkbox"
              checked={linkBirthday}
              onChange={(e) => setLinkBirthday(e.target.checked)}
              className="w-4 h-4 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-500">生年月日と連動させる</span>
          </label>
          <QuestionIcon size={14} className="text-blue-500" />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="px-2 py-0.5 bg-orange-100 text-orange-500 text-xs rounded">推奨</span>
            <span className="text-sm text-gray-700">生年月日</span>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="例：2018-1-1"
              value={formData.birthday}
              onChange={(e) => handleInputChange('birthday', e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 w-36"
            />
            <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Body Size */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">3サイズなど</span>
        </div>
        {/* Row 1: Labels for Bust, Cup, Waist, Hip */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 w-20">
            <span className="px-1.5 py-0.5 bg-red-100 text-red-500 text-[10px] rounded">必須</span>
            <span className="text-xs text-red-500">バスト</span>
          </div>
          <div className="flex items-center gap-1 w-20">
            <span className="px-1.5 py-0.5 bg-red-100 text-red-500 text-[10px] rounded">必須</span>
            <span className="text-xs text-gray-700">カップ</span>
          </div>
          <div className="flex items-center gap-1 w-22">
            <span className="px-1.5 py-0.5 bg-red-100 text-red-500 text-[10px] rounded">必須</span>
            <span className="text-xs text-red-500">ウェスト</span>
          </div>
          <div className="flex items-center gap-1 w-20">
            <span className="px-1.5 py-0.5 bg-red-100 text-red-500 text-[10px] rounded">必須</span>
            <span className="text-xs text-red-500">ヒップ</span>
          </div>
        </div>
        {/* Row 2: Inputs for Bust, Cup, Waist, Hip */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={formData.bust}
            onChange={(e) => handleInputChange('bust', e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 w-20 bg-yellow-50"
            placeholder="0"
          />
          <select
            value={formData.cup}
            onChange={(e) => handleInputChange('cup', e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 w-20 bg-yellow-50"
          >
            {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'].map((cup) => (
              <option key={cup} value={cup}>
                {cup}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={formData.waist}
            onChange={(e) => handleInputChange('waist', e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 w-20 bg-yellow-50"
            placeholder="0"
          />
          <input
            type="text"
            value={formData.hip}
            onChange={(e) => handleInputChange('hip', e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 w-20 bg-yellow-50"
            placeholder="0"
          />
        </div>
        {/* Row 3: Labels for Height, Weight */}
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1 w-20">
            <span className="px-1.5 py-0.5 bg-red-100 text-red-500 text-[10px] rounded">必須</span>
            <span className="text-xs text-red-500">身長</span>
          </div>
          <div className="flex items-center gap-1 w-20">
            <span className="text-xs text-gray-700">体重</span>
          </div>
        </div>
        {/* Row 4: Inputs for Height, Weight */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={formData.height}
            onChange={(e) => handleInputChange('height', e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 w-20 bg-yellow-50"
            placeholder="0"
          />
          <input
            type="text"
            value={formData.weight}
            onChange={(e) => handleInputChange('weight', e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 w-20"
            placeholder="0"
          />
        </div>
      </div>

      {/* Blood Type */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 w-28 flex-shrink-0">
          <span className="px-2 py-0.5 bg-orange-100 text-orange-500 text-xs rounded">推奨</span>
          <span className="text-sm text-gray-700">血液型</span>
        </div>
        <select
          value={formData.bloodType}
          onChange={(e) => handleInputChange('bloodType', e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
        >
          <option value="未選択">未選択</option>
          <option value="A">A型</option>
          <option value="B">B型</option>
          <option value="O">O型</option>
          <option value="AB">AB型</option>
        </select>
        <QuestionIcon size={14} className="text-blue-500" />
      </div>

      {/* Style & Type */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-700 w-28">スタイル</span>
          <select
            value={formData.style}
            onChange={(e) => handleInputChange('style', e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="スタンダード">スタンダード</option>
            <option value="スレンダー">スレンダー</option>
            <option value="グラマー">グラマー</option>
            <option value="ぽっちゃり">ぽっちゃり</option>
          </select>
          <a href="#" className="text-sm text-blue-500 hover:underline">
            サイトごとに設定する
          </a>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-700 w-28">タイプ</span>
          <select
            value={formData.type}
            onChange={(e) => handleInputChange('type', e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="かわいい系">かわいい系</option>
            <option value="綺麗系">綺麗系</option>
            <option value="ギャル系">ギャル系</option>
            <option value="お姉さん系">お姉さん系</option>
          </select>
          <a href="#" className="text-sm text-blue-500 hover:underline">
            サイトごとに設定する
          </a>
        </div>
      </div>
    </div>
  );
}


