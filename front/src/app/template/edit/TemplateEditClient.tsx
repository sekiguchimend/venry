'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { HelpCircle } from 'lucide-react';
import TemplateEditHeader from './components/TemplateEditHeader';
import TemplateContentTab from './components/TemplateContentTab';
import TemplateCategoryTab, { type CategoryMappingRow } from './components/TemplateCategoryTab';
import { getTemplates, saveTemplate, type TemplateFolderType } from '../actions/templates';
import { getTemplateFlowMappings, saveTemplateFlowMappings } from '../actions/templates';
import { getFlowsByPage, getTypeName } from '@/config';

const TemplateEditClient: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('content');
  const [templateId, setTemplateId] = useState<string>('');
  const [label, setLabel] = useState<string>('');
  const [girlId, setGirlId] = useState<string>('');
  const [folderType, setFolderType] = useState<TemplateFolderType>('normal');
  const [templateName, setTemplateName] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [mappingRows, setMappingRows] = useState<CategoryMappingRow[]>([]);
  const [mappingLoading, setMappingLoading] = useState(false);
  const [titleTab, setTitleTab] = useState('基本');
  const [contentTab, setContentTab] = useState('基本');
  const [titleText, setTitleText] = useState('');
  const [contentText, setContentText] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const titleTabs = ['基本', '10文字', '15文字', '20文字', '25文字', '30文字', '40文字', '50文字', '100文字'];
  const contentTabs = ['基本', '100文字', '200文字', '300文字', '400文字', '500文字', '1000文字', 'HTMLタグ'];

  const canSave = useMemo(() => {
    return templateName.trim().length > 0 && label.trim().length > 0;
  }, [templateName, label]);

  useEffect(() => {
    const id = searchParams.get('id') || '';
    const lbl = searchParams.get('label') || '';
    const gId = searchParams.get('girlId') || '';
    const fType = (searchParams.get('folderType') || '') as TemplateFolderType;

    setTemplateId(id);
    if (lbl) setLabel(lbl);
    if (gId) setGirlId(gId);
    if (fType === 'normal' || fType === 'regular' || fType === 'disabled') setFolderType(fType);

    const load = async () => {
      if (!id) return;
      setIsLoading(true);
      setLoadError(null);
      try {
        const list = await getTemplates({ id });
        const t = list[0];
        if (!t) {
          setLoadError('テンプレートが見つかりませんでした');
          return;
        }
        setTemplateId(t.id);
        setTemplateName(t.name || '');
        setLabel(t.label || '');
        setGirlId(t.girl_id || '');
        setImageUrl(t.image_url || null);

        if (t.content) {
          try {
            const parsed = JSON.parse(t.content) as { titleText?: string; contentText?: string };
            setTitleText(parsed.titleText ?? '');
            setContentText(parsed.contentText ?? '');
          } catch {
            setContentText(t.content);
          }
        }
      } catch (e) {
        setLoadError(e instanceof Error ? e.message : '取得に失敗しました');
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, [searchParams]);

  const rebuildFlowRows = async (templateIdForLoad: string) => {
    setMappingLoading(true);
    try {
      // content-update と同じソース：config/flows.json を page=content-list で取得
      const flowsWithSites = getFlowsByPage('content-list');
      const baseRows: CategoryMappingRow[] = flowsWithSites.map(({ site, flow }) => ({
        site_automation_id: site.id, // site.id は automation_id
        type_label: getTypeName(flow.types[0] || 'content'),
        flow_code: flow.code,
        flow_name: flow.name,
        is_enabled: false,
        category_path: [],
      }));

      // 3) 既存テンプレならDB保存済みの紐付けを重ねる
      if (templateIdForLoad) {
        const saved = await getTemplateFlowMappings(templateIdForLoad);
        const savedMap = new Map<string, typeof saved[number]>();
        for (const m of saved) {
          savedMap.set(`${m.site_automation_id}:${m.flow_code}`, m);
        }
        for (const r of baseRows) {
          const key = `${r.site_automation_id}:${r.flow_code}`;
          const m = savedMap.get(key);
          if (m) {
            r.is_enabled = m.is_enabled;
            r.category_path = m.category_path;
            if (!r.flow_name) r.flow_name = m.flow_name || r.flow_name;
          }
        }
      }

      setMappingRows(baseRows);
    } catch (e) {
      alert(`カテゴリ設定の取得に失敗しました\n${e instanceof Error ? e.message : String(e)}`);
      setMappingRows([]);
    } finally {
      setMappingLoading(false);
    }
  };

  useEffect(() => {
    void rebuildFlowRows(templateId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateId]);

  const handleSave = async () => {
    if (!canSave) {
      alert('テンプレート名とカテゴリー（フォルダ）は必須です');
      return;
    }

    setIsSaving(true);
    try {
      let nextImageUrl = imageUrl;
      if (imageFile) {
        const form = new FormData();
        form.append('file', imageFile);
        const uploadRes = await fetch('/api/template/upload-image', {
          method: 'POST',
          body: form,
        });
        const uploadText = await uploadRes.text();
        if (!uploadRes.ok) {
          throw new Error(`画像アップロード失敗: ${uploadRes.status} ${uploadRes.statusText} - ${uploadText}`);
        }
        const uploadJson = JSON.parse(uploadText) as { public_url?: string };
        nextImageUrl = uploadJson.public_url || null;
        setImageUrl(nextImageUrl);
        setImageFile(null);
      }

      const payload = JSON.stringify({
        titleText,
        contentText,
        titleTab,
        contentTab,
      });

      const saved = await saveTemplate({
        id: templateId || undefined,
        folder_type: folderType,
        name: templateName.trim(),
        content: payload,
        image_url: nextImageUrl ?? null,
        label: label || null,
        girl_id: girlId || null,
      });

      setTemplateId(saved.id);

      // カテゴリ設定（テンプレ×フロー紐付け）も保存
      if (mappingRows.length > 0) {
        await saveTemplateFlowMappings(
          saved.id,
          mappingRows.map((r) => ({
            site_automation_id: r.site_automation_id,
            flow_code: r.flow_code,
            flow_name: r.flow_name,
            is_enabled: r.is_enabled,
            category_path: r.category_path,
          }))
        );
      }

      alert('保存しました');
      router.push('/template');
    } catch (e) {
      alert(`保存に失敗しました\n${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setIsSaving(false);
    }
  };

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
      <TemplateEditHeader
        labelText={label}
        girlText={girlId}
        onSave={handleSave}
        isSaving={isSaving}
        canSave={canSave}
      />

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

          {/* Content Tab */}
          {activeTab === 'content' && !isLoading && (
            <TemplateContentTab
              templateName={templateName}
              setTemplateName={setTemplateName}
              imageFile={imageFile}
              setImageFile={setImageFile}
              titleTabs={titleTabs}
              contentTabs={contentTabs}
              titleTab={titleTab}
              setTitleTab={setTitleTab}
              contentTab={contentTab}
              setContentTab={setContentTab}
              titleText={titleText}
              setTitleText={setTitleText}
              contentText={contentText}
              setContentText={setContentText}
            />
          )}

          {/* Category Tab */}
          {activeTab === 'category' && !isLoading && (
            <TemplateCategoryTab
              rows={mappingRows}
              setRows={setMappingRows}
              onReload={() => void rebuildFlowRows(templateId)}
              isLoading={mappingLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateEditClient;


