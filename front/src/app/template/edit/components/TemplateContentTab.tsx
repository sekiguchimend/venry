'use client';

import React, { useEffect, useMemo } from 'react';
import { Copy, FileText, Plus, Trash2 } from 'lucide-react';

interface Props {
  templateName: string;
  setTemplateName: (v: string) => void;
  imageFile: File | null;
  setImageFile: (f: File | null) => void;
  titleTabs: string[];
  contentTabs: string[];
  titleTab: string;
  setTitleTab: (v: string) => void;
  contentTab: string;
  setContentTab: (v: string) => void;
  titleText: string;
  setTitleText: (v: string) => void;
  contentText: string;
  setContentText: (v: string) => void;
}

const TemplateContentTab: React.FC<Props> = ({
  templateName,
  setTemplateName,
  imageFile,
  setImageFile,
  titleTabs,
  contentTabs,
  titleTab,
  setTitleTab,
  contentTab,
  setContentTab,
  titleText,
  setTitleText,
  contentText,
  setContentText,
}) => {
  const previewUrl = useMemo(() => {
    if (!imageFile) return null;
    return URL.createObjectURL(imageFile);
  }, [imageFile]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className="p-6">
      {/* Template Name */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-medium text-[#323232]">テンプレート名</span>
          <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded">必須</span>
        </div>
        <div className="relative">
          <input
            type="text"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            maxLength={300}
            className="w-full p-3 border border-gray-300 rounded text-sm text-[#323232] outline-none focus:border-blue-500"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
            {templateName.length}/300
          </span>
        </div>
      </div>

      {/* Image Section */}
      <div className="mb-8 pb-8 border-b border-gray-200">
        <div className="flex items-start gap-8">
          <div className="w-32">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-[#323232]">画像</span>
              <FileText size={14} className="text-blue-500" />
              <Trash2 size={14} className="text-blue-500" />
            </div>
            <p className="text-xs text-blue-500 mb-1">登録枚数 1 / 10枚</p>
            <p className="text-xs text-gray-500">JPGのみ自動でリサイズされた画像が更新されます</p>
          </div>
          <div className="flex gap-4">
            {/* No.1 Image */}
            <div>
              <span className="text-xs text-gray-600 mb-1 block">No.1</span>
              <div className="w-32 h-44 bg-gray-800 rounded overflow-hidden flex items-center justify-center">
                <div className="text-center text-white p-2">
                  <div className="text-lg font-bold">POINT</div>
                  <div className="text-[10px] mt-1">event</div>
                  <div className="text-[8px] mt-2 text-gray-300">DCPポイントを貯めてお得な景品と交換しよう</div>
                  <div className="text-[10px] mt-2">MAX 5000pt 交換はこちら!</div>
                  <div className="text-[8px] mt-1">DCP GROUP</div>
                </div>
              </div>
            </div>
            {/* No.2 Upload Area */}
            <div>
              <span className="text-xs text-gray-600 mb-1 block">No.2</span>
              <div className="w-32 h-44 border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center bg-gray-50">
                {previewUrl ? (
                  <div className="w-full h-full relative">
                    <img
                      src={previewUrl}
                      alt="選択画像プレビュー"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setImageFile(null)}
                      className="absolute top-1 right-1 text-xs bg-black/60 text-white px-2 py-1 rounded"
                    >
                      取消
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-gray-600 text-center mb-2">画像を<br />ドロップ</p>
                    <p className="text-xs text-gray-400 mb-2">または</p>
                    <label className="flex items-center gap-1 text-sm text-blue-500 hover:underline cursor-pointer bg-transparent border-none">
                      <Plus size={14} />
                      画像を選択
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0] || null;
                          setImageFile(f);
                        }}
                      />
                    </label>
                    <p className="text-xs text-gray-400 mt-2">残9枚</p>
                  </>
                )}
              </div>
              {imageFile && (
                <div className="mt-2 text-[11px] text-gray-600 break-all">
                  選択中: {imageFile.name}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-3 ml-32">
          <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer">
            <input type="checkbox" className="w-4 h-4" />
            更新ごとに投稿画像を変更する
          </label>
        </div>
      </div>

      {/* Title Section */}
      <div className="mb-8 pb-8 border-b border-gray-200">
        <div className="flex items-start gap-8">
          <div className="w-32">
            <span className="text-sm font-medium text-[#323232]">タイトル</span>
          </div>
          <div className="flex-1">
            {/* Title Tabs */}
            <div className="flex border-b border-gray-200 mb-4">
              {titleTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setTitleTab(tab)}
                  className={`px-4 py-2 text-sm border-none cursor-pointer transition-all ${
                    titleTab === tab
                      ? 'bg-gray-700 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mb-3">
              文字数別の入力がない場合はこの内容が反映されます。
            </p>
            <div className="flex justify-end mb-2">
              <button className="flex items-center gap-1 text-sm text-blue-500 hover:underline cursor-pointer bg-transparent border-none">
                <Copy size={14} />
                この文章をすべてのタブにコピー
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                value={titleText}
                onChange={(e) => setTitleText(e.target.value)}
                maxLength={1000}
                className="w-full p-3 border border-gray-300 rounded text-sm text-[#323232] outline-none focus:border-blue-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                {titleText.length}/1000
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mb-8">
        <div className="flex items-start gap-8">
          <div className="w-32">
            <span className="text-sm font-medium text-[#323232]">内容</span>
          </div>
          <div className="flex-1">
            {/* Content Tabs */}
            <div className="flex border-b border-gray-200 mb-4">
              {contentTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setContentTab(tab)}
                  className={`px-4 py-2 text-sm border-none cursor-pointer transition-all ${
                    contentTab === tab
                      ? 'bg-gray-700 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mb-3">
              文字数別の入力がない場合はこの内容が反映されます。
            </p>
            <div className="flex justify-end mb-2">
              <button className="flex items-center gap-1 text-sm text-blue-500 hover:underline cursor-pointer bg-transparent border-none">
                <Copy size={14} />
                この文章をすべてのタブにコピー
              </button>
            </div>
            <div className="relative">
              <textarea
                value={contentText}
                onChange={(e) => setContentText(e.target.value)}
                rows={6}
                className="w-full p-3 border border-gray-300 rounded text-sm text-[#323232] outline-none focus:border-blue-500 resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateContentTab;


