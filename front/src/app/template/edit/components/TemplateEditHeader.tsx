'use client';

import React from 'react';
import { FileText, Pencil } from 'lucide-react';

interface Props {
  labelText: string;
  girlText: string;
  onSave: () => void;
  isSaving: boolean;
  canSave: boolean;
}

const TemplateEditHeader: React.FC<Props> = ({ labelText, girlText, onSave, isSaving, canSave }) => {
  return (
    <div className="bg-gray-100 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 border border-[#4CAF50] text-[#4CAF50] text-[13px] rounded bg-white">
            {labelText || '未設定'}
          </span>
          <span className="text-[13px] text-gray-500">女性</span>
          <span className="text-[13px] text-[#323232]">{girlText || '未選択'}</span>
          <Pencil size={16} className="text-[#2196F3] cursor-pointer" />
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-[13px] text-[#2196F3] hover:underline cursor-pointer bg-transparent border-none">
            <FileText size={14} />
            メモを登録
          </button>
          <button
            onClick={onSave}
            disabled={!canSave || isSaving}
            className={`px-5 py-2 text-white text-[13px] rounded border-none transition-colors ${
              !canSave || isSaving ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#4CAF50] cursor-pointer hover:bg-[#43A047]'
            }`}
          >
            {isSaving ? '保存中...' : '保存'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateEditHeader;


