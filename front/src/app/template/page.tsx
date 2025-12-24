'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Edit, Plus, HelpCircle, RefreshCw, Trash2, X } from 'lucide-react';
import { getTemplates, type Template, type TemplateFolderType } from './actions/templates';

const TemplatePage: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('template-list');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('');
  const [selectedGirl, setSelectedGirl] = useState('');
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const labels = ['新着', 'イベント', '割引', '新人', '出勤', '待機', '写メ', 'その他'];

  const folderType: TemplateFolderType = useMemo(() => {
    if (activeTab === 'regularly-used-folder') return 'regular';
    if (activeTab === 'usage-disabled') return 'disabled';
    return 'normal';
  }, [activeTab]);

  const visibleTemplates = useMemo(() => {
    const q = searchTerm.trim();
    if (!q) return templates;
    return templates.filter((t) => t.name.toLowerCase().includes(q.toLowerCase()));
  }, [templates, searchTerm]);

  const reload = async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const templateRes = await getTemplates({ folder_type: folderType });
      setTemplates(templateRes);
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : '取得に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void reload();
  }, [folderType]);

  const handleOpenModal = () => setIsModalOpen(true);

  const handleConfirmNew = () => {
    if (!selectedLabel) {
      alert('ラベル（カテゴリー）を選択してください');
      return;
    }
    const params = new URLSearchParams();
    params.set('folderType', folderType);
    params.set('label', selectedLabel);
    if (selectedGirl) params.set('girlId', selectedGirl);
    router.push(`/template/edit?${params.toString()}`);
    setIsModalOpen(false);
  };

  return (
    <div className="p-3 md:p-5 min-h-screen bg-gray-100">
      {/* Header Button Section */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between mb-5 gap-3">
        <button
          onClick={handleOpenModal}
          className="py-2 px-3 md:px-4 bg-green-700 border-none rounded-full text-xs md:text-sm text-white cursor-pointer flex items-center gap-1 transition-colors hover:bg-green-800 self-start"
        >
          <Plus size={14} className="md:w-4 md:h-4" />
          新規登録
        </button>

        <div className="text-xs md:text-sm text-gray-600 text-center md:text-right">
          <a href="#" className="text-blue-700 underline">グループ型配信</a>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white border border-gray-200 rounded overflow-hidden">
        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('template-list')}
            className={`py-4 px-4 md:px-6 border-0 bg-white text-xs md:text-sm cursor-pointer transition-all whitespace-nowrap flex-shrink-0 relative ${
              activeTab === 'template-list'
                ? 'text-blue-700 font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-blue-700'
                : 'text-gray-600 font-normal'
            }`}
          >
            <span className="hidden md:inline">テンプレート一覧</span>
            <span className="md:hidden">テンプレート</span>
          </button>
          <button
            onClick={() => setActiveTab('regularly-used-folder')}
            className={`py-4 px-4 md:px-6 border-0 bg-white text-xs md:text-sm cursor-pointer transition-all whitespace-nowrap flex-shrink-0 relative ${
              activeTab === 'regularly-used-folder'
                ? 'text-blue-700 font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-blue-700'
                : 'text-gray-600 font-normal'
            }`}
          >
            <span className="hidden md:inline">定期用中フォルダ</span>
            <span className="md:hidden">定期用</span>
          </button>
          <button
            onClick={() => setActiveTab('usage-disabled')}
            className={`py-4 px-4 md:px-6 border-0 bg-white text-xs md:text-sm cursor-pointer transition-all whitespace-nowrap flex-shrink-0 relative ${
              activeTab === 'usage-disabled'
                ? 'text-blue-700 font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-blue-700'
                : 'text-gray-600 font-normal'
            }`}
          >
            <span className="hidden md:inline">の要確集・使用不可</span>
            <span className="md:hidden">使用不可</span>
          </button>
          <button className="py-4 px-4 md:px-4 border-0 bg-white text-gray-600 cursor-pointer text-sm transition-colors hover:bg-gray-50 flex-shrink-0">
            <Plus size={14} className="md:w-4 md:h-4" />
          </button>
        </div>

        {/* Search Bar and Actions Row */}
        <div className="p-3 md:p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between border-b border-gray-100 gap-3">
          {/* Search Bar and Action Links */}
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <div className="relative w-full sm:w-[280px] md:w-[350px]">
              <Search
                size={16}
                className="md:w-[18px] md:h-[18px] absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
              />
              <input
                type="text"
                placeholder="テンプレート名で検索"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 pr-10 pl-10 border border-gray-200 rounded-full text-xs md:text-sm outline-none transition-colors focus:border-blue-700"
              />
            </div>
            <a href="#" className="text-xs md:text-sm text-blue-700 no-underline flex items-center gap-1">
              <RefreshCw size={14} className="text-blue-500" />
              <span className="hidden sm:inline">テンプレート並び替え</span><span className="sm:hidden">並び替え</span>
            </a>
            <a href="#" className="text-xs md:text-sm text-blue-700 no-underline flex items-center gap-1">
              <Trash2 size={14} className="text-blue-500" />
              選択削除
            </a>
          </div>

          {/* Count */}
          <div className="text-xs md:text-sm text-gray-600 text-center sm:text-left">
            登録件数29/上限400件
          </div>
        </div>

        {/* Table Header - Hidden on mobile */}
        <div className="hidden md:grid py-3 px-4 bg-gray-50 border-b border-gray-200 text-xs font-normal text-gray-600 items-center" style={{ gridTemplateColumns: '50px 40px 80px 1fr 100px 100px 80px 100px 1fr' }}>
          <div></div>
          <div className="text-center">No.</div>
          <div className="text-center">画像</div>
          <div className="pl-2">テンプレート名</div>
          <div className="flex items-center justify-center gap-1">
            <span>女性</span>
            <HelpCircle size={14} className="text-blue-500" />
          </div>
          <div className="flex items-center justify-center gap-1">
            <span>ラベル</span>
            <HelpCircle size={14} className="text-blue-500" />
          </div>
          <div className="flex items-center justify-center gap-1">
            <span>設定数</span>
            <HelpCircle size={14} className="text-blue-500" />
          </div>
          <div className="flex items-center justify-center">メモ</div>
          <div></div>
        </div>

        {/* Content Rows */}
        {loadError && (
          <div className="p-4 text-sm text-red-600">
            {loadError}
          </div>
        )}
        {isLoading && (
          <div className="p-4 text-sm text-gray-600">
            読み込み中...
          </div>
        )}
        {!isLoading && visibleTemplates.map((template, idx) => (
          <div key={template.id}>
            {/* Desktop Layout */}
            <div className="hidden md:grid py-2 px-4 border-b border-gray-100 items-center min-h-[60px]" style={{ gridTemplateColumns: '50px 40px 80px 1fr 100px 100px 80px 100px 1fr' }}>
              {/* Edit Button */}
              <div className="flex items-center justify-center">
                <button
                  onClick={() => router.push(`/template/edit?id=${encodeURIComponent(template.id)}&folderType=${encodeURIComponent(folderType)}`)}
                  className="flex items-center gap-0.5 py-0.5 px-1.5 bg-transparent text-blue-700 border-none rounded-sm text-[11px] cursor-pointer font-normal"
                >
                  <Edit size={11} />
                  編集
                </button>
              </div>

              {/* Number */}
              <div className="text-center text-[13px] text-gray-800">
                {idx + 1}
              </div>

              {/* Image */}
              <div className="flex justify-center items-center">
                <div className="w-[60px] h-10 bg-gray-200 rounded-sm flex items-center justify-center">
                  <div className="bg-gray-600 text-white py-0.5 px-1 rounded-sm text-[9px]">
                    画像
                  </div>
                </div>
              </div>

              {/* Template Name */}
              <div className="text-[13px] text-gray-800 pl-2 font-normal">
                {template.name}
              </div>

              {/* Woman Column */}
              <div className="flex items-center justify-center text-[13px] text-gray-800">
                {/* Empty for now */}
              </div>

              {/* Label Column */}
              <div className="flex items-center justify-center">
                {template.label && (
                  <span className="py-0.5 px-2 bg-transparent border border-green-500 rounded-sm text-[11px] text-green-600">
                    {template.label}
                  </span>
                )}
              </div>

              {/* Setting Count Column */}
              <div className="flex items-center justify-center text-[13px] text-blue-600 underline cursor-pointer">
                0
              </div>

              {/* Memo Column */}
              <div className="flex items-center justify-center text-[13px] text-gray-800">
                {/* Empty */}
              </div>

              {/* Empty spacer */}
              <div></div>
            </div>

            {/* Mobile Card Layout */}
            <div className="md:hidden p-4 border-b border-gray-100">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-12 h-8 bg-gray-200 rounded-sm flex items-center justify-center mb-2">
                    <div className="bg-gray-600 text-white py-0.5 px-1 rounded-sm text-[8px]">
                      画像
                    </div>
                  </div>
                  <div className="text-center text-xs text-gray-600">
                    No.{idx + 1}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-sm text-gray-800 font-normal">
                      {template.name}
                    </div>
                    <button
                      onClick={() => router.push(`/template/edit?id=${encodeURIComponent(template.id)}&folderType=${encodeURIComponent(folderType)}`)}
                      className="flex items-center gap-0.5 py-1 px-2 bg-transparent text-blue-700 border-none rounded-sm text-xs cursor-pointer font-normal ml-2"
                    >
                      <Edit size={12} />
                      編集
                    </button>
                  </div>
                  {template.label && (
                    <div className="flex items-center gap-2">
                      <button className="py-0.5 px-2 bg-transparent border border-gray-200 rounded-sm text-xs text-gray-600 cursor-pointer">
                        {template.label}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Template Settings Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-[600px] max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-[#323232]">テンプレート設定</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer border-none bg-transparent"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Label Selection */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-base font-medium text-[#323232]">ラベル（カテゴリー）を選択してください</h3>
                  <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded">必須</span>
                </div>
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {labels.map((label) => (
                    <label key={label} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="label"
                        value={label}
                        checked={selectedLabel === label}
                        onChange={(e) => setSelectedLabel(e.target.value)}
                        className="w-4 h-4 accent-[#323232]"
                      />
                      <span className="text-sm text-[#323232]">{label}</span>
                    </label>
                  ))}
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  テンプレートにラベルを付与します。管理する際の目安としてご活用ください。<br />
                  設定したラベルは後から変更可能です。
                </p>
              </div>

              {/* Girl Selection */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-base font-medium text-[#323232]">情報を連動させる女性を選択してください</h3>
                  <span className="px-2 py-0.5 bg-white border border-orange-400 text-orange-400 text-xs rounded">任意</span>
                </div>
                <select
                  value={selectedGirl}
                  onChange={(e) => setSelectedGirl(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded text-sm text-[#323232] bg-white outline-none focus:border-gray-400"
                >
                  <option value="">未選択</option>
                  <option value="girl1">女性1</option>
                  <option value="girl2">女性2</option>
                  <option value="girl3">女性3</option>
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-center gap-3 p-4 border-t border-gray-200">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-8 py-2 border border-gray-300 rounded text-sm text-[#323232] bg-white hover:bg-gray-50 cursor-pointer transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={handleConfirmNew}
                className={`px-8 py-2 border-none rounded text-sm text-white transition-colors ${
                  selectedLabel ? 'bg-green-700 hover:bg-green-800 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'
                }`}
                disabled={!selectedLabel}
              >
                決定
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplatePage;
