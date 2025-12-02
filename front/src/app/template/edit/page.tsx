'use client';

import React, { useState } from 'react';
import { HelpCircle, Pencil, Plus, FileText, Trash2, Copy } from 'lucide-react';

const TemplateEditPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('content');
  const [templateName, setTemplateName] = useState('5月くじイベント');
  const [titleTab, setTitleTab] = useState('基本');
  const [contentTab, setContentTab] = useState('基本');
  const [titleText, setTitleText] = useState('店頭限定！くじイベント開催！');
  const [contentText, setContentText] = useState(`店頭限定！くじイベント開催！

今月はいつもと違い店頭受付のお客様限定のイベントを開催します！
店頭に来て頂いたお客様ならどなたでも利用出来るイベント回数制限等もないので`);

  const titleTabs = ['基本', '10文字', '15文字', '20文字', '25文字', '30文字', '40文字', '50文字', '100文字'];
  const contentTabs = ['基本', '100文字', '200文字', '300文字', '400文字', '500文字', '1000文字', 'HTMLタグ'];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Notice Bar - グレー背景 */}
      <div className="bg-[#f5f5f5] px-4 py-2 border-b border-gray-200">
        <p className="text-[13px] text-[#323232] leading-relaxed">
          作成した「テンプレート」は利用可能なコンテンツのみに使用できます。
          <HelpCircle size={14} className="inline ml-1 text-[#2196F3] cursor-pointer" />
        </p>
        <p className="text-[13px] text-[#323232] leading-relaxed">
          次の文字列を入力すると更新時に変換します。$${'{{'}sitename{'}}'}⇒更新サイト名、$${'{{'}month{'}}'}⇒月、$${'{{'}day{'}}'}⇒日、$${'{{'}youbi{'}}'}⇒曜日
        </p>
      </div>

      {/* Header Section - ラベル・女性・保存ボタン */}
      <div className="bg-gray-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 border border-[#4CAF50] text-[#4CAF50] text-[13px] rounded bg-white">イベント</span>
            <span className="text-[13px] text-gray-500">女性</span>
            <span className="text-[13px] text-[#323232]">未選択</span>
            <Pencil size={16} className="text-[#2196F3] cursor-pointer" />
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-[13px] text-[#2196F3] hover:underline cursor-pointer bg-transparent border-none">
              <FileText size={14} />
              メモを登録
            </button>
            <button className="px-5 py-2 bg-[#4CAF50] text-white text-[13px] rounded border-none cursor-pointer hover:bg-[#43A047]">
              保存
            </button>
          </div>
        </div>
      </div>

      {/* White Card with Tabs */}
      <div className="bg-white border border-gray-200 rounded mx-4 mb-4">
        {/* Tabs - 内容 / カテゴリ設定 */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('content')}
            className={`px-6 py-3 text-[13px] cursor-pointer transition-all bg-white border-0 ${
              activeTab === 'content'
                ? 'text-[#323232] border-b-2 border-b-[#2196F3]'
                : 'text-gray-500'
            }`}
          >
            内容
          </button>
          <button
            onClick={() => setActiveTab('category')}
            className={`px-6 py-3 text-[13px] cursor-pointer transition-all bg-white border-0 flex items-center gap-1 ${
              activeTab === 'category'
                ? 'text-[#323232] border-b-2 border-b-[#2196F3]'
                : 'text-gray-500'
            }`}
          >
            カテゴリ設定
            <HelpCircle size={14} className="text-[#2196F3]" />
          </button>
        </div>

        {/* Main Content Area */}
        <div className="bg-white">

        {/* Content Tab */}
        {activeTab === 'content' && (
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
                      <p className="text-sm text-gray-600 text-center mb-2">画像を<br />ドロップ</p>
                      <p className="text-xs text-gray-400 mb-2">または</p>
                      <button className="flex items-center gap-1 text-sm text-blue-500 hover:underline cursor-pointer bg-transparent border-none">
                        <Plus size={14} />
                        画像を選択
                      </button>
                      <p className="text-xs text-gray-400 mt-2">残9枚</p>
                    </div>
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
        )}

        {/* Category Tab */}
        {activeTab === 'category' && (
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-[13px] text-[#323232]">利用可能コンテンツ数19件</p>
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-[#323232]">カテゴリ内容がサイトと異なる場合</span>
                <HelpCircle size={14} className="text-[#2196F3] cursor-pointer" />
              </div>
            </div>

            {/* Search and Reload */}
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1 max-w-[400px]">
                <input
                  type="text"
                  placeholder="コンテンツ名で検索"
                  className="w-full py-2 pl-10 pr-10 border border-gray-300 rounded text-[13px] outline-none focus:border-[#2196F3]"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">Q</span>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">≡</span>
              </div>
              <button className="flex items-center gap-1 text-[13px] text-[#2196F3] hover:underline cursor-pointer bg-transparent border-none">
                <span>↻</span>
                すべて再取得
              </button>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-[40px_1fr_80px_1fr] gap-2 py-2 border-b border-gray-200 text-sm text-gray-500">
              <div></div>
              <div>コンテンツ名</div>
              <div>種別</div>
              <div>カテゴリ</div>
            </div>

            {/* Table Content */}
            <div className="divide-y divide-gray-100">
              {/* Row 1 */}
              <div className="grid grid-cols-[40px_1fr_80px_1fr] gap-2 py-3 items-center">
                <div className="text-[#2196F3] cursor-pointer text-sm">↻</div>
                <div className="text-sm text-[#323232]">ぴゅあらば(投稿！生動画-上位化)</div>
                <div><span className="px-2 py-0.5 bg-[#E3F2FD] text-[#1976D2] text-xs rounded">上位化</span></div>
                <div>
                  <select className="py-1.5 px-3 border border-gray-300 rounded text-sm bg-white min-w-[120px]">
                    <option>未選択</option>
                  </select>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-[40px_1fr_80px_1fr] gap-2 py-3 items-center">
                <div className="text-[#2196F3] cursor-pointer text-sm">↻</div>
                <div className="text-sm text-[#323232]">シティヘブンネット(直送便/プラチナメール)</div>
                <div><span className="px-2 py-0.5 bg-[#E3F2FD] text-[#1976D2] text-xs rounded">速報</span></div>
                <div className="flex gap-2 flex-wrap">
                  <select className="py-1.5 px-3 border border-gray-300 rounded text-sm bg-white min-w-[140px]">
                    <option>ご利用できません</option>
                  </select>
                  <select className="py-1.5 px-3 border border-gray-300 rounded text-sm bg-white min-w-[140px]">
                    <option>ご利用できません</option>
                  </select>
                  <select className="py-1.5 px-3 border border-gray-300 rounded text-sm bg-white min-w-[120px]">
                    <option>直送便カテゴリ</option>
                  </select>
                  <select className="py-1.5 px-3 border border-gray-300 rounded text-sm bg-white min-w-[80px]">
                    <option>直送便</option>
                  </select>
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-[40px_1fr_80px_1fr] gap-2 py-3 items-center">
                <div className="text-[#2196F3] cursor-pointer text-sm">↻</div>
                <div className="text-sm text-[#323232]">デリヘルタウン(お知らせ)</div>
                <div><span className="px-2 py-0.5 bg-[#E3F2FD] text-[#1976D2] text-xs rounded">速報</span></div>
                <div>
                  <select className="py-1.5 px-3 border border-gray-300 rounded text-sm bg-white min-w-[120px]">
                    <option>割引イベント</option>
                  </select>
                </div>
              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-[40px_1fr_80px_1fr] gap-2 py-3 items-center">
                <div className="text-[#2196F3] cursor-pointer text-sm">↻</div>
                <div className="text-sm text-[#323232]">デリヘルタウン(特設コンテンツ)</div>
                <div><span className="px-2 py-0.5 bg-[#E3F2FD] text-[#1976D2] text-xs rounded">速報</span></div>
                <div>
                  <select className="py-1.5 px-3 border border-gray-300 rounded text-sm bg-white min-w-[120px]">
                    <option>店舗トップページ</option>
                  </select>
                </div>
              </div>

              {/* Row 5 */}
              <div className="grid grid-cols-[40px_1fr_80px_1fr] gap-2 py-3 items-center">
                <div className="text-[#2196F3] cursor-pointer text-sm">↻</div>
                <div className="text-sm text-[#323232]">ぴゅあらば(速報)</div>
                <div><span className="px-2 py-0.5 bg-[#E3F2FD] text-[#1976D2] text-xs rounded">速報</span></div>
                <div className="flex gap-2">
                  <select className="py-1.5 px-3 border border-gray-300 rounded text-sm bg-white min-w-[100px]">
                    <option>イベント</option>
                  </select>
                  <select className="py-1.5 px-3 border border-gray-300 rounded text-sm bg-white min-w-[100px]">
                    <option>未選択</option>
                  </select>
                </div>
              </div>

              {/* Row 6 */}
              <div className="grid grid-cols-[40px_1fr_80px_1fr] gap-2 py-3 items-center">
                <div className="text-[#2196F3] cursor-pointer text-sm">↻</div>
                <div className="text-sm text-[#323232]">マンゾクネット(最新情報)【有料】</div>
                <div><span className="px-2 py-0.5 bg-[#E3F2FD] text-[#1976D2] text-xs rounded">速報</span></div>
                <div>
                  <select className="py-1.5 px-3 border border-gray-300 rounded text-sm bg-white min-w-[100px]">
                    <option>イベント</option>
                  </select>
                </div>
              </div>

              {/* Row 7 */}
              <div className="grid grid-cols-[40px_1fr_80px_1fr] gap-2 py-3 items-center">
                <div className="text-[#2196F3] cursor-pointer text-sm">↻</div>
                <div className="text-sm text-[#323232]">風俗じゃぱん！(店舗速報)</div>
                <div><span className="px-2 py-0.5 bg-[#E3F2FD] text-[#1976D2] text-xs rounded">速報</span></div>
                <div>
                  <select className="py-1.5 px-3 border border-gray-300 rounded text-sm bg-white min-w-[100px]">
                    <option>最新情報</option>
                  </select>
                </div>
              </div>

              {/* Row 8 */}
              <div className="grid grid-cols-[40px_1fr_80px_1fr] gap-2 py-3 items-center">
                <div className="text-[#2196F3] cursor-pointer text-sm">↻</div>
                <div className="text-sm text-[#323232]">駅ちか人気！風俗ランキング(ニュース)</div>
                <div><span className="px-2 py-0.5 bg-[#E3F2FD] text-[#1976D2] text-xs rounded">速報</span></div>
                <div className="flex gap-2">
                  <select className="py-1.5 px-3 border border-gray-300 rounded text-sm bg-white min-w-[100px]">
                    <option>イベント速報</option>
                  </select>
                  <select className="py-1.5 px-3 border border-gray-300 rounded text-sm bg-white min-w-[100px]">
                    <option>未選択</option>
                  </select>
                </div>
              </div>

              {/* Row 9 */}
              <div className="grid grid-cols-[40px_1fr_80px_1fr] gap-2 py-3 items-center">
                <div className="text-[#2196F3] cursor-pointer text-sm">↻</div>
                <div className="text-sm text-[#323232]">風俗じゃぱん！(イベント(フリーテキスト))-1枚目を更新</div>
                <div><span className="px-2 py-0.5 bg-[#FFEBEE] text-[#E53935] text-xs rounded">イベント</span></div>
                <div className="flex gap-2">
                  <select className="py-1.5 px-3 border border-gray-300 rounded text-sm bg-white min-w-[100px]">
                    <option>じゃぱん限定</option>
                  </select>
                  <select className="py-1.5 px-3 border border-gray-300 rounded text-sm bg-white min-w-[100px]">
                    <option>未選択</option>
                  </select>
                </div>
              </div>

              {/* Row 10 */}
              <div className="grid grid-cols-[40px_1fr_80px_1fr] gap-2 py-3 items-center">
                <div className="text-[#2196F3] cursor-pointer text-sm">↻</div>
                <div className="text-sm text-[#323232]">口コミ風俗情報局(割引・イベント)</div>
                <div><span className="px-2 py-0.5 bg-[#FFF3E0] text-[#F57C00] text-xs rounded">割引</span></div>
                <div>
                  <select className="py-1.5 px-3 border border-gray-300 rounded text-sm bg-white min-w-[140px]">
                    <option>更新対象記事があ...</option>
                  </select>
                </div>
              </div>

              {/* Row 11 */}
              <div className="grid grid-cols-[40px_1fr_80px_1fr] gap-2 py-3 items-center">
                <div className="text-[#2196F3] cursor-pointer text-sm">↻</div>
                <div className="text-sm text-[#323232]">シティヘブンネット(写メ日記)</div>
                <div><span className="px-2 py-0.5 bg-[#FCE4EC] text-[#E91E63] text-xs rounded">写メ</span></div>
                <div>
                  <select className="py-1.5 px-3 border border-gray-300 rounded text-sm bg-white min-w-[100px]">
                    <option>未選択</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default TemplateEditPage;
