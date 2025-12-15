'use client';

import React, { useMemo, useState } from 'react';
import { Copy, HelpCircle as QuestionIcon } from 'lucide-react';

export default function CommentTab() {
  const [shopCommentTab, setShopCommentTab] = useState('基本');
  const [girlCommentTab, setGirlCommentTab] = useState('基本');
  const [commentTab, setCommentTab] = useState('基本');

  const [shopComment, setShopComment] = useState('');
  const [girlComment, setGirlComment] = useState('');
  const [comment, setComment] = useState('');

  const commentTabs = useMemo(
    () => ['基本', '50文字', '100文字', '150文字', '200文字', '300文字', '500文字', '1000文字', 'HTMLタグ'],
    [],
  );

  return (
    <div className="space-y-8 py-4">
      {/* お店コメント */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-1.5 py-0.5 bg-orange-100 text-orange-500 text-[10px] rounded">推奨</span>
          <span className="text-sm text-gray-700">お店コメント</span>
          <QuestionIcon size={14} className="text-blue-500" />
        </div>
        {/* Tabs */}
        <div className="bg-white flex border-b border-gray-200">
          {commentTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setShopCommentTab(tab)}
              className={`px-4 py-2 text-sm transition-colors ${
                shopCommentTab === tab
                  ? 'bg-gray-100 text-gray-700 border-t-2 border-l border-r border-t-blue-500 border-l-gray-200 border-r-gray-200 border-b-0 -mb-px'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Content Area */}
        <div className="border border-gray-200 border-t-0 bg-gray-100 p-4">
          {/* Description and Copy Link */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">文字数別の入力がない場合はこの内容が反映されます。</span>
            <button className="flex items-center gap-1 text-sm text-blue-500 hover:underline">
              <Copy size={14} />
              この文章をすべてのタブにコピー
            </button>
          </div>
          {/* Textarea */}
          <div className="relative">
            <textarea
              value={shopComment}
              onChange={(e) => setShopComment(e.target.value)}
              className="w-full h-48 px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 resize-none bg-white"
              maxLength={10000}
            />
            <span className="absolute right-3 bottom-3 text-xs text-gray-400">{shopComment.length}/10000</span>
          </div>
        </div>
      </div>

      {/* 女の子コメント */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-1.5 py-0.5 bg-orange-100 text-orange-500 text-[10px] rounded">推奨</span>
          <span className="text-sm text-gray-700">女の子コメント</span>
          <QuestionIcon size={14} className="text-blue-500" />
        </div>
        {/* Tabs */}
        <div className="bg-white flex border-b border-gray-200">
          {commentTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setGirlCommentTab(tab)}
              className={`px-4 py-2 text-sm transition-colors ${
                girlCommentTab === tab
                  ? 'bg-gray-100 text-gray-700 border-t-2 border-l border-r border-t-blue-500 border-l-gray-200 border-r-gray-200 border-b-0 -mb-px'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Content Area */}
        <div className="border border-gray-200 border-t-0 bg-gray-100 p-4">
          {/* Description and Copy Link */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">文字数別の入力がない場合はこの内容が反映されます。</span>
            <button className="flex items-center gap-1 text-sm text-blue-500 hover:underline">
              <Copy size={14} />
              この文章をすべてのタブにコピー
            </button>
          </div>
          {/* Textarea */}
          <div className="relative">
            <textarea
              value={girlComment}
              onChange={(e) => setGirlComment(e.target.value)}
              className="w-full h-48 px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 resize-none bg-white"
              maxLength={10000}
            />
            <span className="absolute right-3 bottom-3 text-xs text-gray-400">{girlComment.length}/10000</span>
          </div>
        </div>
      </div>

      {/* コメント */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-1.5 py-0.5 bg-orange-100 text-orange-500 text-[10px] rounded">推奨</span>
          <span className="text-sm text-gray-700">コメント</span>
          <QuestionIcon size={14} className="text-blue-500" />
        </div>
        {/* Tabs */}
        <div className="bg-white flex border-b border-gray-200">
          {commentTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setCommentTab(tab)}
              className={`px-4 py-2 text-sm transition-colors ${
                commentTab === tab
                  ? 'bg-gray-100 text-gray-700 border-t-2 border-l border-r border-t-blue-500 border-l-gray-200 border-r-gray-200 border-b-0 -mb-px'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Content Area */}
        <div className="border border-gray-200 border-t-0 bg-gray-100 p-4">
          {/* Description and Copy Link */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">文字数別の入力がない場合はこの内容が反映されます。</span>
            <button className="flex items-center gap-1 text-sm text-blue-500 hover:underline">
              <Copy size={14} />
              この文章をすべてのタブにコピー
            </button>
          </div>
          {/* Textarea */}
          <div className="relative">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full h-48 px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 resize-none bg-white"
              maxLength={10000}
            />
            <span className="absolute right-3 bottom-3 text-xs text-gray-400">{comment.length}/10000</span>
          </div>
        </div>
      </div>
    </div>
  );
}


