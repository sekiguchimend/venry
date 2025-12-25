"use client";

import React, { useMemo, useState } from 'react';
import { ArrowUpDown, Copy, Download, FileText, GripVertical, Plus, Search, Trash2, X } from 'lucide-react';
import { saveTemplate, type Template } from '@/app/template/actions/templates';
import RichTextEditor from './RichTextEditor';

type Props = {
  templateIndexById: Map<string, number>;
  filteredTemplates: Template[];
  isLoadingTemplates: boolean;
  templateSearch: string;
  setTemplateSearch: (v: string) => void;

  selectedTemplateTab: 'normal' | 'regular';
  setSelectedTemplateTab: (v: 'normal' | 'regular') => void;
  setSelectedFolderId: (v: string) => void;

  dedicatedFolderLabel: string;
  dedicatedFlowType: string;
  onTemplateCreated: (t: Template) => void;
  onClose: () => void;
};

const DedicatedTemplateEditor: React.FC<Props> = ({
  templateIndexById,
  filteredTemplates,
  isLoadingTemplates,
  templateSearch,
  setTemplateSearch,
  selectedTemplateTab,
  setSelectedTemplateTab,
  setSelectedFolderId,
  dedicatedFolderLabel,
  dedicatedFlowType,
  onTemplateCreated,
  onClose,
}) => {
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const canCreate = useMemo(() => newTemplateName.trim().length > 0, [newTemplateName]);

  const handleCreateDedicatedTemplate = async () => {
    if (!canCreate) return;
    setIsCreating(true);
    try {
      const payload = JSON.stringify({
        titleText: newTitle,
        contentText: newBody,
        titleTab: '基本',
        contentTab: '基本',
      });

      const saved = await saveTemplate({
        folder_type: 'regular',
        // folder_id を渡さない場合、backendが label をフォルダ名として解決/作成する
        label: dedicatedFolderLabel || '専用',
        flow_type: dedicatedFlowType || '',
        name: newTemplateName.trim(),
        content: payload,
      });

      onTemplateCreated(saved);
      setNewTemplateName('');
      setNewTitle('');
      setNewBody('');
      onClose();
    } catch (e) {
      alert(`専用テンプレートの作成に失敗しました\n${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <>
      {/* 左：テンプレートリスト */}
      <div className="w-80 bg-[#eef4ff] border-r border-gray-200">
        {/* タブ */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => {
              setSelectedTemplateTab('normal');
              setSelectedFolderId('');
              onClose();
            }}
            className={`flex-1 px-3 py-2 text-sm font-medium ${
              selectedTemplateTab === 'normal'
                ? 'bg-[#eef4ff] text-[#323232] border-t-2 border-t-[#2196F3]'
                : 'bg-[#dfe6ef] text-gray-700 hover:bg-gray-200'
            }`}
            type="button"
          >
            <FileText size={14} className="inline mr-1" />
            テンプレート
          </button>
          <button
            onClick={() => {
              setSelectedTemplateTab('regular');
              setSelectedFolderId('');
            }}
            className={`flex-1 px-3 py-2 text-sm font-medium ${
              selectedTemplateTab === 'regular'
                ? 'bg-[#eef4ff] text-[#323232] border-t-2 border-t-[#2196F3]'
                : 'bg-[#dfe6ef] text-gray-700 hover:bg-gray-200'
            }`}
            type="button"
          >
            <FileText size={14} className="inline mr-1" />
            専用テンプレート
          </button>
        </div>

        {/* 検索 */}
        <div className="px-4 pt-3 pb-2 bg-[#eef4ff]">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="テンプレート名で検索"
              value={templateSearch}
              onChange={(e) => setTemplateSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#2196F3] rounded-full text-sm focus:outline-none bg-white"
            />
          </div>
          <div className="flex items-center justify-between mt-3 px-1">
            <div className="flex items-center gap-4 text-[#1976D2]">
              <button className="p-1 bg-transparent border-none cursor-pointer" title="並び替え" type="button">
                <ArrowUpDown size={18} />
              </button>
              <button className="p-1 bg-transparent border-none cursor-pointer" title="コピー" type="button">
                <Copy size={18} />
              </button>
              <button className="p-1 bg-transparent border-none cursor-pointer" title="削除" type="button">
                <Trash2 size={18} />
              </button>
            </div>
            <button className="p-1 bg-transparent border-none cursor-pointer text-[#1976D2]" title="ダウンロード" type="button">
              <Download size={18} />
            </button>
          </div>
        </div>

        <div className="px-4 py-2 bg-white border-t border-gray-200 flex items-center justify-between">
          <p className="text-xs text-gray-600">ドラッグでセットできます</p>
          <p className="text-xs text-gray-600">上限100件</p>
        </div>

        <div className="overflow-y-auto max-h-[calc(100vh-240px)] bg-white">
          {isLoadingTemplates ? (
            <div className="p-4 text-center text-gray-500 text-sm">読み込み中...</div>
          ) : filteredTemplates.length === 0 ? (
            <div className="p-4 text-center text-gray-500 text-sm">テンプレートがありません</div>
          ) : (
            filteredTemplates.map((template) => {
              const overallIndex = templateIndexById.get(template.id);
              const displayIndex = overallIndex != null ? overallIndex + 1 : 0;
              return (
                <div
                  key={template.id}
                  className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 hover:bg-blue-50 cursor-grab"
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('templateId', template.id);
                    e.dataTransfer.setData('templateName', template.name);
                  }}
                >
                  <GripVertical size={14} className="text-gray-300" />
                  <span className="text-sm text-[#323232]">
                    {displayIndex}. {template.name}
                  </span>
                </div>
              );
            })
          )}
        </div>

        <div className="p-4 bg-[#eef4ff] border-t border-gray-200">
          <button
            className="w-full flex items-center justify-center gap-2 py-3 rounded bg-[#e8f0ff] border border-[#b7c9ff] text-[#1f4fbf] text-sm font-medium hover:bg-[#dbe8ff]"
            type="button"
          >
            <Plus size={18} />
            専用テンプレート追加
          </button>
        </div>
      </div>

      {/* 右：編集パネル */}
      <div className="flex-1 bg-white">
        {/* ヘッダー */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <select className="px-4 py-2 border border-gray-300 rounded bg-white text-sm min-w-[220px]">
            <option>テンプレート挿入</option>
          </select>
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 bg-transparent border-none cursor-pointer"
            type="button"
          >
            <X size={18} />
            閉じる
          </button>
        </div>

        <div className="p-6">
          {/* テンプレート名 */}
          <div className="flex items-center gap-6 mb-6">
            <div className="w-40 flex items-center gap-2">
              <span className="text-sm text-gray-700">テンプレート名</span>
              <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded">必須</span>
            </div>
            <div className="flex-1">
              <div className="relative">
                <input
                  value={newTemplateName}
                  onChange={(e) => setNewTemplateName(e.target.value)}
                  maxLength={300}
                  className="w-full px-4 py-3 border border-blue-200 rounded bg-[#fff7d6] text-sm outline-none"
                  placeholder=""
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                  {newTemplateName.length}/300
                </span>
              </div>
            </div>
          </div>

          {/* タイトル */}
          <div className="flex items-center gap-6 mb-6">
            <div className="w-40 text-sm text-gray-700">タイトル</div>
            <div className="flex-1">
              <div className="relative">
                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  maxLength={150}
                  className="w-full px-4 py-3 border border-gray-200 rounded bg-white text-sm outline-none"
                  placeholder=""
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                  {newTitle.length}/150
                </span>
              </div>
            </div>
          </div>

          {/* 本文 */}
          <div className="flex items-start gap-6">
            <div className="w-40 text-sm text-gray-700 pt-3">本文</div>
            <div className="flex-1">
              <RichTextEditor value={newBody} onChange={setNewBody} placeholder="" minHeightPx={320} />
            </div>
          </div>
        </div>

        {/* フッター */}
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 flex items-center justify-center">
          <button
            onClick={handleCreateDedicatedTemplate}
            disabled={!canCreate || isCreating}
            className="px-10 py-3 rounded bg-gray-300 text-gray-600 text-sm font-medium disabled:opacity-70"
            type="button"
          >
            {isCreating ? '保存中...' : '編集を保存'}
          </button>
        </div>
      </div>
    </>
  );
};

export default DedicatedTemplateEditor;


