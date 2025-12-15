'use client';

import React from 'react';

export interface CheckboxItem {
  id: string;
  label: string;
}

export function CheckboxGrid({
  items,
  selectedIds,
  onToggle,
  onSelectAll,
  onClear,
  columnsClassName = 'grid-cols-6',
  maxSelected,
}: {
  items: CheckboxItem[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  onSelectAll: () => void;
  onClear: () => void;
  columnsClassName?: string;
  maxSelected?: number;
}) {
  const selectedCount = selectedIds.size;

  return (
    <div className="w-full">
      <div className="flex items-center justify-end gap-4 mb-3">
        <button onClick={onSelectAll} className="text-sm text-blue-500 hover:underline">
          すべて選択
        </button>
        <button onClick={onClear} className="text-sm text-blue-500 hover:underline">
          解除
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded text-sm cursor-default"
        >
          {selectedCount}件選択中
        </button>
      </div>

      {maxSelected != null && (
        <div className="text-xs text-gray-500 mb-2">
          {maxSelected}個まで
        </div>
      )}

      <div className={`grid ${columnsClassName} gap-x-10 gap-y-4`}>
        {items.map((item) => {
          const checked = selectedIds.has(item.id);
          const disabled = !checked && maxSelected != null && selectedCount >= maxSelected;
          return (
            <label key={item.id} className={`flex items-center gap-2 ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}>
              <input
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={() => onToggle(item.id)}
                className="w-4 h-4 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-800">{item.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}


