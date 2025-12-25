'use client';

import React, { useMemo, useState } from 'react';
import {
  ArrowUpDown,
  Calendar,
  ClipboardPaste,
  Copy,
  Download,
  FileText,
  GripVertical,
  HelpCircle,
  Plus,
  Search,
  Settings,
  StopCircle,
  Trash2,
} from 'lucide-react';
import type { Template, TemplateFolder } from '@/app/template/actions/templates';
import DedicatedTemplateEditor from './DedicatedTemplateEditor';

type ScheduleItem = {
  id: number;
  time: string;
  templateId: string;
  templateName: string;
};

type Props = {
  isTimerRunning: boolean;
  setIsTimerRunning: (v: boolean) => void;
  showTimerOverlay: boolean;
  setShowTimerOverlay: (v: boolean) => void;

  scheduleItems: ScheduleItem[];
  setScheduleItems: (items: ScheduleItem[]) => void;
  timeOptions: string[];

  templates: Template[];
  templateFolders: TemplateFolder[];
  isLoadingTemplates: boolean;

  templateSearch: string;
  setTemplateSearch: (v: string) => void;
  selectedTemplateTab: 'normal' | 'regular';
  setSelectedTemplateTab: (v: 'normal' | 'regular') => void;
  selectedFolderId: string;
  setSelectedFolderId: (v: string) => void;

  filteredTemplates: Template[];

  dedicatedFolderLabel: string; // 専用テンプレ作成時のカテゴリ（フォルダ名）に使う
  dedicatedFlowType: string; // 専用テンプレ作成時のflow_type（例: blog）
  onTemplateCreated: (t: Template) => void;
};

const ScheduleTab: React.FC<Props> = ({
  isTimerRunning,
  setIsTimerRunning,
  showTimerOverlay,
  setShowTimerOverlay,
  scheduleItems,
  setScheduleItems,
  timeOptions,
  templates,
  templateFolders,
  isLoadingTemplates,
  templateSearch,
  setTemplateSearch,
  selectedTemplateTab,
  setSelectedTemplateTab,
  selectedFolderId,
  setSelectedFolderId,
  filteredTemplates,
  dedicatedFolderLabel,
  dedicatedFlowType,
  onTemplateCreated,
}) => {
  const templateIndexById = useMemo(() => {
    const map = new Map<string, number>();
    templates.forEach((t, idx) => map.set(t.id, idx));
    return map;
  }, [templates]);

  const normalFolders = useMemo(() => {
    return templateFolders.filter((f) => f.folder_type === 'normal');
  }, [templateFolders]);

  const [isDedicatedEditorOpen, setIsDedicatedEditorOpen] = useState(false);

  const handleOpenDedicatedEditor = () => {
    setSelectedTemplateTab('regular');
    setIsDedicatedEditorOpen(true);
  };

  const handleCloseDedicatedEditor = () => setIsDedicatedEditorOpen(false);

  return (
    <div className="flex">
      {/* 専用テンプレート追加（編集パネル） */}
      {isDedicatedEditorOpen ? (
        <DedicatedTemplateEditor
          templateIndexById={templateIndexById}
          filteredTemplates={filteredTemplates}
          isLoadingTemplates={isLoadingTemplates}
          templateSearch={templateSearch}
          setTemplateSearch={setTemplateSearch}
          selectedTemplateTab={selectedTemplateTab}
          setSelectedTemplateTab={setSelectedTemplateTab}
          setSelectedFolderId={setSelectedFolderId}
          dedicatedFolderLabel={dedicatedFolderLabel}
          dedicatedFlowType={dedicatedFlowType}
          onTemplateCreated={onTemplateCreated}
          onClose={handleCloseDedicatedEditor}
        />
      ) : null}

      {/* メインコンテンツエリア */}
      <div className={`flex-1 border-r border-gray-200 ${isDedicatedEditorOpen ? 'hidden' : ''}`}>
        {/* ヘッダー部分 */}
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const newState = !isTimerRunning;
                  setIsTimerRunning(newState);
                  if (newState) {
                    setShowTimerOverlay(true);
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium ${
                  isTimerRunning ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                <StopCircle size={16} />
                {isTimerRunning ? '止める' : '開始'}
              </button>
              <button className="p-2 bg-[#2196F3] text-white rounded hover:bg-[#1976D2]">
                <Settings size={16} />
              </button>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>次回</span>
                <span className="font-medium text-[#323232]">13:14.</span>
                <span className="text-gray-500">(12月24日)</span>
              </div>
            </div>
          </div>
        </div>

        {/* サブヘッダー */}
        <div className="px-4 py-3 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded" title="コピー">
                <Copy size={16} />
              </button>
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded" title="貼り付け">
                <ClipboardPaste size={16} />
              </button>
            </div>
            <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded text-sm hover:bg-gray-300">
              設定を保存
            </button>
          </div>
          <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
            <Calendar size={14} />
            <span>曜日・日別設定</span>
            <HelpCircle size={14} className="text-[#2196F3]" />
          </div>
        </div>

        {/* アクションボタン */}
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#2196F3]">
              <Search size={14} />
              一括登録
            </button>
            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#2196F3]">
              <ArrowUpDown size={14} />
              並び替え
            </button>
            <button className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600">
              <Trash2 size={14} />
              すべて削除
            </button>
          </div>
        </div>

        {/* スケジュールリスト */}
        <div className="p-4 relative">
          {/* タイマー稼働中オーバーレイ */}
          {isTimerRunning && showTimerOverlay && (
            <>
              {/* 暗いマスク */}
              <div className="absolute inset-0 bg-black/40 z-10 rounded" />
              {/* メッセージカード */}
              <div className="absolute left-0 right-0 top-16 z-20 mx-4 p-4 bg-white border border-blue-200 rounded-lg shadow-lg">
                <p className="text-[#2196F3] font-medium text-center text-lg">現在タイマー稼働中</p>
                <p className="text-[#2196F3] text-center text-sm mt-1">
                  タイマーをスタートしたまま編集できるようになりました
                </p>
                <div className="flex justify-center mt-3">
                  <button
                    onClick={() => setShowTimerOverlay(false)}
                    className="px-4 py-2 bg-[#2196F3] text-white rounded text-sm hover:bg-[#1976D2]"
                  >
                    内容を編集
                  </button>
                </div>
              </div>
            </>
          )}

          <div className="space-y-2">
            {scheduleItems.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded hover:border-[#2196F3] transition-colors"
              >
                <span className="w-6 text-center text-sm text-gray-500">{index + 1}</span>
                <div className="text-gray-300 cursor-grab">
                  <GripVertical size={16} />
                </div>
                <select
                  value={item.time}
                  onChange={(e) => {
                    const newItems = [...scheduleItems];
                    newItems[index].time = e.target.value;
                    setScheduleItems(newItems);
                  }}
                  className="px-3 py-2 border border-gray-300 rounded text-sm bg-white min-w-[100px]"
                >
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <select
                  value={item.templateId}
                  onChange={(e) => {
                    const newItems = [...scheduleItems];
                    const template = templates.find((t) => t.id === e.target.value);
                    newItems[index].templateId = e.target.value;
                    newItems[index].templateName = template?.name || '';
                    setScheduleItems(newItems);
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm bg-white"
                >
                  <option value="">テンプレートを選択</option>
                  {templates.map((template, tIdx) => (
                    <option key={template.id} value={template.id}>
                      {tIdx + 1}. {template.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    setScheduleItems(scheduleItems.filter((_, i) => i !== index));
                  }}
                  className="p-1 text-gray-400 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* 追加ボタン */}
          <button
            onClick={() => {
              const newId = Math.max(...scheduleItems.map((i) => i.id), 0) + 1;
              setScheduleItems([...scheduleItems, { id: newId, time: '12:00', templateId: '', templateName: '' }]);
            }}
            className="flex items-center gap-2 mt-4 px-4 py-2 border-2 border-dashed border-gray-300 rounded text-sm text-gray-500 hover:border-[#2196F3] hover:text-[#2196F3] w-full justify-center"
          >
            <Plus size={16} />
            スケジュールを追加
          </button>
        </div>
      </div>

      {/* 右側テンプレートパネル */}
      <div className={`w-80 bg-[#eef4ff] ${isDedicatedEditorOpen ? 'hidden' : ''}`}>
        {/* タブ */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => {
              setSelectedTemplateTab('normal');
              setSelectedFolderId('');
            }}
            className={`flex-1 px-3 py-2 text-sm font-medium ${
              selectedTemplateTab === 'normal'
                ? 'bg-[#eef4ff] text-[#323232] border-t-2 border-t-[#2196F3]'
                : 'bg-[#dfe6ef] text-gray-700 hover:bg-gray-200'
            }`}
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
          >
            <FileText size={14} className="inline mr-1" />
            専用テンプレート
          </button>
        </div>

        {/* グループ選択 */}
        {selectedTemplateTab === 'normal' && (
          <div className="p-4 border-b border-gray-200 bg-[#eef4ff]">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600 whitespace-nowrap">グループ選択:</label>
              <select
                value={selectedFolderId}
                onChange={(e) => setSelectedFolderId(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm bg-white"
              >
                <option value="">すべて</option>
                {normalFolders.map((folder) => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

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

          {/* アイコン行（スクショ寄せ） */}
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

        {/* 補足行 */}
        <div className="px-4 py-2 bg-white border-t border-gray-200 flex items-center justify-between">
          <p className="text-xs text-gray-600">ドラッグでセットできます</p>
          <p className="text-xs text-gray-600">上限100件</p>
        </div>

        {/* テンプレートリスト */}
        <div className="overflow-y-auto max-h-[400px] bg-white">
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

        {/* 追加ボタン（専用テンプレートのみ） */}
        {selectedTemplateTab === 'regular' && (
          <div className="p-4 bg-[#eef4ff] border-t border-gray-200">
            <button
              className="w-full flex items-center justify-center gap-2 py-3 rounded bg-[#e8f0ff] border border-[#b7c9ff] text-[#1f4fbf] text-sm font-medium hover:bg-[#dbe8ff]"
              type="button"
              onClick={handleOpenDedicatedEditor}
            >
              <Plus size={18} />
              専用テンプレート追加
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleTab;


