'use client';

import React from 'react';
import { HelpCircle } from 'lucide-react';

export interface CategoryMappingRow {
  site_automation_id: string;
  type_label: string;
  flow_code: string;
  flow_name: string;
  is_enabled: boolean;
  category_path: unknown;
}

interface Props {
  rows: CategoryMappingRow[];
  setRows: (rows: CategoryMappingRow[]) => void;
  onReload: () => void;
  isLoading: boolean;
}

const TemplateCategoryTab: React.FC<Props> = ({ rows, setRows, onReload, isLoading }) => {
  const updateRow = (key: string, patch: Partial<CategoryMappingRow>) => {
    setRows(rows.map((r) => `${r.site_automation_id}:${r.flow_code}` === key ? { ...r, ...patch } : r));
  };

  const getFirstCategory = (val: unknown): string => {
    if (Array.isArray(val) && typeof val[0] === 'string') return val[0];
    return '';
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-[13px] text-[#323232]">利用可能フロー数{rows.length}件</p>
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
        <button
          onClick={onReload}
          disabled={isLoading}
          className="flex items-center gap-1 text-[13px] text-[#2196F3] hover:underline cursor-pointer bg-transparent border-none disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          <span>↻</span>
          すべて再取得
        </button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[80px_1fr_90px_1fr] gap-2 py-2 border-b border-gray-200 text-sm text-gray-500">
        <div></div>
        <div>フロー名</div>
        <div>種別</div>
        <div>カテゴリ</div>
      </div>

      {/* Table Content */}
      <div className="divide-y divide-gray-100">
        {rows.map((r) => {
          const category = getFirstCategory(r.category_path);
          const key = `${r.site_automation_id}:${r.flow_code}`;
          return (
            <div key={key} className="grid grid-cols-[80px_1fr_90px_1fr] gap-2 py-3 items-center">
              <div className="text-sm text-gray-600">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={r.is_enabled}
                    onChange={(e) => updateRow(key, { is_enabled: e.target.checked })}
                    className="w-4 h-4"
                  />
                  利用
                </label>
              </div>
              <div className="text-sm text-[#323232]">
                <div>{r.flow_name}</div>
                <div className="text-[11px] text-gray-500 mt-0.5">{r.flow_code}</div>
              </div>
              <div>
                <span className="px-2 py-0.5 bg-[#E3F2FD] text-[#1976D2] text-xs rounded">
                  {r.type_label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={category}
                  onChange={(e) => updateRow(key, { category_path: [e.target.value] })}
                  placeholder="カテゴリ名（例: イベント）"
                  className="py-1.5 px-3 border border-gray-300 rounded text-sm bg-white w-full"
                  disabled={!r.is_enabled}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateCategoryTab;


