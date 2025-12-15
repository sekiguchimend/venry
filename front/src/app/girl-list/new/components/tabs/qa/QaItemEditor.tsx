'use client';

import React from 'react';
import { TextInput, Textarea } from '../../ui/Inputs';

export function QaItemEditor({
  index,
  item,
  onChange,
  onMenuClick,
}: {
  index: number;
  item: { question: string; answer: string };
  onChange: (next: { question: string; answer: string }) => void;
  onMenuClick?: () => void;
}) {
  const no = index + 1;

  return (
    <div className="py-6 border-b border-gray-200">
      {/* 質問 */}
      <div className="flex items-start gap-6">
        <div className="w-16 pt-2 text-sm text-gray-700">質問{no}</div>
        <div className="flex-1">
          <TextInput
            value={item.question}
            onChange={(v) => onChange({ ...item, question: v })}
            placeholder={`質問${no}を入力してください`}
            maxLength={20}
            showCount
          />
        </div>
        <button
          type="button"
          onClick={onMenuClick}
          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
          aria-label={`質問${no}のメニュー`}
        >
          ⋮
        </button>
      </div>

      {/* 回答 */}
      <div className="flex items-start gap-6 mt-4">
        <div className="w-16 pt-2 text-sm text-gray-700">回答{no}</div>
        <div className="flex-1">
          <Textarea
            value={item.answer}
            onChange={(v) => onChange({ ...item, answer: v })}
            placeholder={`回答${no}を入力してください`}
            maxLength={50}
            heightClassName="h-24"
          />
        </div>
        <div className="w-8" />
      </div>
    </div>
  );
}


