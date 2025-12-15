'use client';

import React from 'react';
import type { BasicFormData } from './BasicTab';

export default function BasicRightColumn({
  formData,
  handleInputChange,
}: {
  formData: BasicFormData;
  handleInputChange: (field: keyof BasicFormData, value: string) => void;
}) {
  return (
    <div className="flex-1 space-y-4 border-l border-gray-100 pl-6">
      {/* Catch Copy / Short Comment */}
      <div className="flex items-start gap-4">
        <div className="flex flex-col flex-shrink-0 w-32 pt-8">
          <span className="text-sm text-gray-700">キャッチコピー・</span>
          <span className="text-sm text-gray-700">ショートコメント</span>
        </div>
        <div className="flex-1 space-y-2">
          {/* 10文字まで */}
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-orange-100 text-orange-500 text-xs rounded">推奨</span>
            <span className="text-xs text-gray-500">10文字まで</span>
          </div>
          <div className="relative">
            <input
              type="text"
              value={formData.catchCopy10}
              onChange={(e) => handleInputChange('catchCopy10', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
              maxLength={10}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
              {formData.catchCopy10.length}/10
            </span>
          </div>
          {/* 20文字まで */}
          <div className="flex items-center gap-2 mt-3">
            <span className="px-2 py-0.5 bg-orange-100 text-orange-500 text-xs rounded">推奨</span>
            <span className="text-xs text-gray-500">20文字まで</span>
          </div>
          <div className="relative">
            <input
              type="text"
              value={formData.catchCopy20}
              onChange={(e) => handleInputChange('catchCopy20', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
              maxLength={20}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
              {formData.catchCopy20.length}/20
            </span>
          </div>
        </div>
      </div>

      {/* Other Fields */}
      <div className="space-y-3 pt-4">
        {/* Sensitive Zone */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-700 w-24 flex-shrink-0">性感帯</span>
          <div className="flex-1 relative">
            <input
              type="text"
              value={formData.sensitiveZone}
              onChange={(e) => handleInputChange('sensitiveZone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">0/∞</span>
          </div>
        </div>

        {/* Hobby */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-700 w-24 flex-shrink-0">趣味</span>
          <div className="flex-1 relative">
            <input
              type="text"
              value={formData.hobby}
              onChange={(e) => handleInputChange('hobby', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">0/∞</span>
          </div>
        </div>

        {/* Specialty */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-700 w-24 flex-shrink-0">得意プレイ</span>
          <div className="flex-1 relative">
            <input
              type="text"
              value={formData.specialty}
              onChange={(e) => handleInputChange('specialty', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">0/∞</span>
          </div>
        </div>

        {/* Charm Point */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-700 w-24 flex-shrink-0">チャームポイント</span>
          <div className="flex-1 relative">
            <input
              type="text"
              value={formData.charmPoint}
              onChange={(e) => handleInputChange('charmPoint', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">0/∞</span>
          </div>
        </div>

        {/* Favorite Type */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-700 w-24 flex-shrink-0">好きなタイプ</span>
          <div className="flex-1 relative">
            <input
              type="text"
              value={formData.favoriteType}
              onChange={(e) => handleInputChange('favoriteType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">0/∞</span>
          </div>
        </div>

        {/* First Experience */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-700 w-24 flex-shrink-0">初体験</span>
          <div className="flex-1 relative">
            <input
              type="text"
              value={formData.firstExperience}
              onChange={(e) => handleInputChange('firstExperience', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">0/∞</span>
          </div>
        </div>

        {/* Birthplace */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-700 w-24 flex-shrink-0">出身地</span>
          <div className="flex-1 relative">
            <input
              type="text"
              value={formData.birthplace}
              onChange={(e) => handleInputChange('birthplace', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">0/∞</span>
          </div>
        </div>

        {/* Zodiac */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 w-24 flex-shrink-0">
            <span className="px-1.5 py-0.5 bg-orange-100 text-orange-500 text-[10px] rounded">推奨</span>
            <span className="text-sm text-gray-700">星座</span>
          </div>
          <div className="flex-1 relative">
            <input
              type="text"
              value={formData.zodiac}
              onChange={(e) => handleInputChange('zodiac', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
              maxLength={7}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
              {formData.zodiac.length}/7
            </span>
          </div>
        </div>

        {/* Alcohol */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-700 w-24 flex-shrink-0">お酒</span>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="alcohol"
                checked={formData.alcohol === '飲む'}
                onChange={() => handleInputChange('alcohol', '飲む')}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">飲む</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="alcohol"
                checked={formData.alcohol === '飲まない'}
                onChange={() => handleInputChange('alcohol', '飲まない')}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">飲まない</span>
            </label>
          </div>
        </div>

        {/* Tobacco */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-700 w-24 flex-shrink-0">タバコ</span>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tobacco"
                checked={formData.tobacco === '吸う'}
                onChange={() => handleInputChange('tobacco', '吸う')}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">吸う</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tobacco"
                checked={formData.tobacco === '吸わない'}
                onChange={() => handleInputChange('tobacco', '吸わない')}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">吸わない</span>
            </label>
          </div>
        </div>

        {/* Face Out */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-700 w-24 flex-shrink-0">顔出し</span>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="faceOut"
                checked={formData.faceOut === '設定する'}
                onChange={() => handleInputChange('faceOut', '設定する')}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">設定する</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="faceOut"
                checked={formData.faceOut === '設定しない'}
                onChange={() => handleInputChange('faceOut', '設定しない')}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">設定しない</span>
            </label>
          </div>
        </div>

        {/* Mobile Email */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 flex-shrink-0">
            <span className="px-1.5 py-0.5 bg-orange-100 text-orange-500 text-[10px] rounded">推奨</span>
            <span className="text-sm text-gray-700">携帯メールアドレス</span>
          </div>
          <div className="w-96 relative">
            <input
              type="text"
              value={formData.mobileEmail}
              onChange={(e) => handleInputChange('mobileEmail', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
              maxLength={255}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
              {formData.mobileEmail.length}/255
            </span>
          </div>
        </div>

        {/* PC Email */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-700 w-40 flex-shrink-0">PCメールアドレス</span>
          <div className="flex-1 relative">
            <input
              type="text"
              value={formData.pcEmail}
              onChange={(e) => handleInputChange('pcEmail', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">0/∞</span>
          </div>
        </div>
      </div>
    </div>
  );
}


