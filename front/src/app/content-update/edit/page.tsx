'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { HelpCircle, Pencil, FileText } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getContentPosts, saveContentPosts, getContentIdBySiteAndFlow } from '@/lib/api/content';
import { getTemplates, getTemplateFolders, type Template, type TemplateFolder } from '@/app/template/actions/templates';
import PostContentSection from './components/PostContentSection';
import ScheduleTab from './components/ScheduleTab';
import { getFlow, getTypeName } from '@/config';

const ContentEditPageInner: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const contentIdParam = searchParams.get('id') || '';
  const siteId = searchParams.get('siteId') || '';
  const flowCode = searchParams.get('flowCode') || '';
  const flowName = searchParams.get('flowName') || '';

  const [contentId, setContentId] = useState(contentIdParam);
  const [activeTab, setActiveTab] = useState('content');
  const [, setContentName] = useState('ぴゅあらば(速報)');

  // 投稿内容設定
  const [postTitle, setPostTitle] = useState('');
  const [normalTime, setNormalTime] = useState('');
  const [normalPrice, setNormalPrice] = useState('');
  const [couponTime, setCouponTime] = useState('');
  const [couponPrice, setCouponPrice] = useState('');
  const [conditions, setConditions] = useState('');

  // 2件目
  const [postTitle2, setPostTitle2] = useState('');
  const [normalTime2, setNormalTime2] = useState('');
  const [normalPrice2, setNormalPrice2] = useState('');
  const [couponTime2, setCouponTime2] = useState('');
  const [couponPrice2, setCouponPrice2] = useState('');
  const [conditions2, setConditions2] = useState('');

  // 3件目
  const [postTitle3, setPostTitle3] = useState('');
  const [normalTime3, setNormalTime3] = useState('');
  const [normalPrice3, setNormalPrice3] = useState('');
  const [couponTime3, setCouponTime3] = useState('');
  const [couponPrice3, setCouponPrice3] = useState('');
  const [conditions3, setConditions3] = useState('');

  const [, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // 時刻指定更新用のstate
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [showTimerOverlay, setShowTimerOverlay] = useState(true);
  const [scheduleItems, setScheduleItems] = useState<{
    id: number;
    time: string;
    templateId: string;
    templateName: string;
  }[]>([]);
  const [templateSearch, setTemplateSearch] = useState('');
  const [selectedTemplateTab, setSelectedTemplateTab] = useState<'normal' | 'regular'>('normal');
  const [selectedFolderId, setSelectedFolderId] = useState<string>('');

  // テンプレート関連state
  const [templates, setTemplates] = useState<Template[]>([]);
  const [templateFolders, setTemplateFolders] = useState<TemplateFolder[]>([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(false);

  // 時刻オプション生成（5分刻み）
  const timeOptions = Array.from({ length: 24 * 12 }, (_, i) => {
    const hours = Math.floor(i / 12).toString().padStart(2, '0');
    const minutes = ((i % 12) * 5).toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  });

  // テンプレート一覧を取得（全件取得→画面側で分類。folder_id=null の既存テンプレも漏れなく表示する）
  useEffect(() => {
    const loadTemplates = async () => {
      setIsLoadingTemplates(true);
      try {
        const [templatesData, foldersData] = await Promise.all([
          getTemplates(),
          getTemplateFolders(),
        ]);
        setTemplates(templatesData);
        setTemplateFolders(foldersData);
      } catch (error) {
        console.error('Failed to load templates:', error);
      } finally {
        setIsLoadingTemplates(false);
      }
    };
    loadTemplates();
  }, []);

  // フォルダでフィルタされたテンプレート
  const currentFlowTypes = (() => {
    if (!siteId || !flowCode) return [] as string[];
    const flow = getFlow(siteId, flowCode);
    const types = flow?.types || [];
    return Array.from(new Set(types.filter(Boolean)));
  })();

  const dedicatedFlowType = currentFlowTypes[0] || '';
  const dedicatedFolderLabel = getTypeName(dedicatedFlowType || '専用');

  // 「専用テンプレート」はフローtypeごと（例: blog）に表示を固定する
  const typeFolderIds = (() => {
    if (currentFlowTypes.length === 0) return [] as string[];

    const ids = new Set<string>();
    for (const folder of templateFolders.filter((f) => f.folder_type === 'regular')) {
      const folderFlowType = (folder as { flow_type?: string | null }).flow_type || null;
      for (const t of currentFlowTypes) {
        const label = getTypeName(t);
        if (folderFlowType && folderFlowType === t) ids.add(folder.id);
        if (folder.name === label) ids.add(folder.id);
        if (folder.name === t) ids.add(folder.id);
      }
    }
    return Array.from(ids);
  })();

  const normalFolderIds = (() => {
    const ids = new Set<string>();
    for (const f of templateFolders) {
      if (f.folder_type === 'normal') ids.add(f.id);
    }
    return Array.from(ids);
  })();

  const baseTemplates = selectedTemplateTab === 'regular'
    ? templates.filter((t) => t.folder_id != null && typeFolderIds.includes(t.folder_id))
    : templates.filter((t) => t.folder_id == null || normalFolderIds.includes(t.folder_id));

  const filteredTemplates = baseTemplates.filter((t) => {
    const matchesSearch = !templateSearch || t.name.toLowerCase().includes(templateSearch.toLowerCase());

    // 専用テンプレート側はグループ選択を出さないため、folderフィルタはかけない
    if (selectedTemplateTab === 'regular') return matchesSearch;

    const matchesFolder = !selectedFolderId || t.folder_id === selectedFolderId;
    return matchesFolder && matchesSearch;
  });

  // 専用テンプレートはグループ選択を出さないため、常に未選択に戻す
  useEffect(() => {
    if (selectedTemplateTab !== 'regular') return;
    if (selectedFolderId) setSelectedFolderId('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTemplateTab]);

  // コンテンツIDを取得
  useEffect(() => {
    const fetchContentId = async () => {
      // URLパラメータからcontentIdがある場合はそれを使う
      if (contentIdParam) {
        console.log('Using contentId from URL:', contentIdParam);
        setContentId(contentIdParam);
        await loadContentPostsWithId(contentIdParam);
        return;
      }

      // 既にstateにcontentIdがある場合はそのまま使用
      if (contentId) {
        console.log('Using contentId from state:', contentId);
        await loadContentPostsWithId(contentId);
        return;
      }

      // siteIdとflowNameからコンテンツIDを取得
      if (siteId && (flowName || flowCode)) {
        try {
          setIsLoading(true);
          console.log('Searching for content:', { siteId, flowName, flowCode });
          const content = await getContentIdBySiteAndFlow(siteId, flowCode, flowName);
          console.log('Content result:', content);
          
          if (content.id) {
            setContentId(content.id);
            setContentName(content.name);
            // コンテンツIDが取得できたら投稿内容を読み込む
            await loadContentPostsWithId(content.id);
          } else {
            // コンテンツが見つからない場合は空の状態で続行
            console.log('Content not found, will create new one on save');
          }
        } catch (error) {
          console.error('Failed to get content ID:', error);
          // エラーでも続行（保存時に新規作成）
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchContentId();
  }, [siteId, flowCode, flowName, contentIdParam, contentId]);

  const loadContentPostsWithId = async (id: string) => {
    try {
      console.log('Loading content posts for content_id:', id);
      const posts = await getContentPosts(id);
      console.log('Loaded posts:', posts);

      // 1件目
      const post1 = posts.find((p) => p.post_number === 1);
      if (post1) {
        console.log('Setting post 1:', post1);
        setPostTitle(post1.title || '');
        setNormalTime(post1.normal_time || '');
        setNormalPrice(post1.normal_price || '');
        setCouponTime(post1.coupon_time || '');
        setCouponPrice(post1.coupon_price || '');
        setConditions(post1.conditions || '');
      } else {
        console.log('Post 1 not found');
      }

      // 2件目
      const post2 = posts.find((p) => p.post_number === 2);
      if (post2) {
        console.log('Setting post 2:', post2);
        setPostTitle2(post2.title || '');
        setNormalTime2(post2.normal_time || '');
        setNormalPrice2(post2.normal_price || '');
        setCouponTime2(post2.coupon_time || '');
        setCouponPrice2(post2.coupon_price || '');
        setConditions2(post2.conditions || '');
      } else {
        console.log('Post 2 not found');
      }

      // 3件目
      const post3 = posts.find((p) => p.post_number === 3);
      if (post3) {
        console.log('Setting post 3:', post3);
        setPostTitle3(post3.title || '');
        setNormalTime3(post3.normal_time || '');
        setNormalPrice3(post3.normal_price || '');
        setCouponTime3(post3.coupon_time || '');
        setCouponPrice3(post3.coupon_price || '');
        setConditions3(post3.conditions || '');
      } else {
        console.log('Post 3 not found');
      }
    } catch (error) {
      console.error('Failed to load content posts:', error);
    }
  };

  const handleSave = async () => {
    let targetContentId = contentId;

    // contentIdがない場合は、siteIdとflowNameから取得を試みる（存在しない場合は自動作成される）
    if (!targetContentId && siteId && (flowName || flowCode)) {
      try {
        const content = await getContentIdBySiteAndFlow(siteId, flowCode, flowName);
        if (content.id) {
          targetContentId = content.id;
          setContentId(content.id);
          setContentName(content.name);
        } else {
          // コンテンツが見つからない場合は、もう一度試す（バックエンドで自動作成される）
          const retryContent = await getContentIdBySiteAndFlow(siteId, flowCode, flowName);
          if (retryContent.id) {
            targetContentId = retryContent.id;
            setContentId(retryContent.id);
            setContentName(retryContent.name);
          }
        }
      } catch (error) {
        console.error('Failed to get content ID:', error);
        // エラーでも続行（バックエンドで自動作成される可能性がある）
      }
    }

    // コンテンツIDが取得できない場合は、もう一度試す
    if (!targetContentId && siteId && (flowName || flowCode)) {
      try {
        const content = await getContentIdBySiteAndFlow(siteId, flowCode, flowName);
        if (content.id) {
          targetContentId = content.id;
          setContentId(content.id);
          setContentName(content.name);
        }
      } catch (error) {
        console.error('Failed to get content ID on retry:', error);
      }
    }

    // それでもコンテンツIDが取得できない場合は、保存API内で作成を試みる
    // （保存APIはコンテンツIDが必要なので、ここでエラーを出す）
    if (!targetContentId) {
      console.error('Content ID not found after retries:', { siteId, flowName, flowCode });
      // 最後の試行として、flowNameを直接使って取得を試みる
      if (siteId && (flowName || flowCode)) {
        try {
          const finalContent = await getContentIdBySiteAndFlow(siteId, flowCode, flowName);
          if (finalContent.id) {
            targetContentId = finalContent.id;
            setContentId(finalContent.id);
            setContentName(finalContent.name);
          } else {
            alert('コンテンツIDが取得できませんでした。ページを再読み込みしてください。');
            return;
          }
        } catch (error) {
          console.error('Final attempt failed:', error);
          alert('コンテンツIDが取得できませんでした。ページを再読み込みしてください。');
          return;
        }
      } else {
        alert('コンテンツIDが取得できませんでした。サイトIDとフロー名を確認してください。');
        return;
      }
    }

    try {
      setIsSaving(true);

      const posts = [];

      // 1件目
      if (postTitle || normalTime || normalPrice || couponTime || couponPrice || conditions) {
        posts.push({
          post_number: 1,
          title: postTitle,
          normal_time: normalTime,
          normal_price: normalPrice,
          coupon_time: couponTime,
          coupon_price: couponPrice,
          conditions: conditions,
        });
      }

      // 2件目
      if (postTitle2 || normalTime2 || normalPrice2 || couponTime2 || couponPrice2 || conditions2) {
        posts.push({
          post_number: 2,
          title: postTitle2,
          normal_time: normalTime2,
          normal_price: normalPrice2,
          coupon_time: couponTime2,
          coupon_price: couponPrice2,
          conditions: conditions2,
        });
      }

      // 3件目
      if (postTitle3 || normalTime3 || normalPrice3 || couponTime3 || couponPrice3 || conditions3) {
        posts.push({
          post_number: 3,
          title: postTitle3,
          normal_time: normalTime3,
          normal_price: normalPrice3,
          coupon_time: couponTime3,
          coupon_price: couponPrice3,
          conditions: conditions3,
        });
      }

      const savedPosts = await saveContentPosts({
        content_id: targetContentId,
        posts: posts,
      });

      console.log('Saved posts:', savedPosts);
      console.log('Saved to content_id:', targetContentId);

      // 保存後にコンテンツIDをstateに保存（確実に同じIDを使うため）
      setContentId(targetContentId);
      
      // URLにcontent_idを追加して、確実に同じIDを使うようにする
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('id', targetContentId);
      window.history.replaceState({}, '', newUrl.toString());
      
      // 保存後にデータを再読み込み
      await loadContentPostsWithId(targetContentId);

      alert('保存しました');
    } catch (error) {
      console.error('Failed to save content posts:', error);
      alert('保存に失敗しました');
    } finally {
      setIsSaving(false);
    }
  };

  const handleBack = () => {
    router.push('/content-update');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Notice Bar */}
      <div className="bg-[#f5f5f5] px-4 py-2 border-b border-gray-200">
        <p className="text-[13px] text-[#323232] leading-relaxed">
          コンテンツの内容を編集できます。変更後は「保存」ボタンを押してください。
          <HelpCircle size={14} className="inline ml-1 text-[#2196F3] cursor-pointer" />
        </p>
        <p className="text-[13px] text-[#323232] leading-relaxed">
          次の文字列を入力すると更新時に変換します。$${'{{'}sitename{'}}'}⇒更新サイト名、$${'{{'}month{'}}'}⇒月、$${'{{'}day{'}}'}⇒日、$${'{{'}youbi{'}}'}⇒曜日
        </p>
      </div>

      {/* Header Section */}
      <div className="bg-gray-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              className="px-3 py-1 border border-gray-300 text-gray-600 text-[13px] rounded bg-white hover:bg-gray-50 cursor-pointer"
            >
              ← 戻る
            </button>
            <span className="px-3 py-1 border border-[#2196F3] text-[#2196F3] text-[13px] rounded bg-white">速報</span>
            <span className="text-[13px] text-gray-500">女性</span>
            <span className="text-[13px] text-[#323232]">未選択</span>
            <Pencil size={16} className="text-[#2196F3] cursor-pointer" />
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-[13px] text-[#2196F3] hover:underline cursor-pointer bg-transparent border-none">
              <FileText size={14} />
              メモを登録
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-5 py-2 bg-[#4CAF50] text-white text-[13px] rounded border-none cursor-pointer hover:bg-[#43A047] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? '保存中...' : '保存'}
            </button>
          </div>
        </div>
      </div>

      {/* White Card with Tabs */}
      <div className="bg-white border border-gray-200 rounded mx-4 mb-4">
        {/* Tabs */}
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
          <button
            onClick={() => setActiveTab('timer')}
            className={`px-6 py-3 text-[13px] cursor-pointer transition-all bg-white border-0 flex items-center gap-1 ${
              activeTab === 'timer'
                ? 'text-[#323232] border-b-2 border-b-[#2196F3]'
                : 'text-gray-500'
            }`}
          >
            タイマー設定
            <HelpCircle size={14} className="text-[#2196F3]" />
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-6 py-3 text-[13px] cursor-pointer transition-all bg-white border-0 flex items-center gap-1 ${
              activeTab === 'schedule'
                ? 'text-[#323232] border-b-2 border-b-[#2196F3]'
                : 'text-gray-500'
            }`}
          >
            時刻指定更新
            <HelpCircle size={14} className="text-[#2196F3]" />
          </button>
        </div>

        {/* Main Content Area */}
        <div className="bg-white">

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="p-6">
            <PostContentSection
              index={1}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              normalTime={normalTime}
              setNormalTime={setNormalTime}
              normalPrice={normalPrice}
              setNormalPrice={setNormalPrice}
              couponTime={couponTime}
              setCouponTime={setCouponTime}
              couponPrice={couponPrice}
              setCouponPrice={setCouponPrice}
              conditions={conditions}
              setConditions={setConditions}
            />

            <PostContentSection
              index={2}
              postTitle={postTitle2}
              setPostTitle={setPostTitle2}
              normalTime={normalTime2}
              setNormalTime={setNormalTime2}
              normalPrice={normalPrice2}
              setNormalPrice={setNormalPrice2}
              couponTime={couponTime2}
              setCouponTime={setCouponTime2}
              couponPrice={couponPrice2}
              setCouponPrice={setCouponPrice2}
              conditions={conditions2}
              setConditions={setConditions2}
            />

            <PostContentSection
              index={3}
              postTitle={postTitle3}
              setPostTitle={setPostTitle3}
              normalTime={normalTime3}
              setNormalTime={setNormalTime3}
              normalPrice={normalPrice3}
              setNormalPrice={setNormalPrice3}
              couponTime={couponTime3}
              setCouponTime={setCouponTime3}
              couponPrice={couponPrice3}
              setCouponPrice={setCouponPrice3}
              conditions={conditions3}
              setConditions={setConditions3}
            />

            {/* Bottom Save Button */}
            <div className="flex justify-center pt-6">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-8 py-2 bg-[#4CAF50] text-white text-sm rounded border-none cursor-pointer hover:bg-[#43A047] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? '保存中...' : '保存'}
              </button>
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
            </div>
          </div>
        )}

        {/* Timer Tab */}
        {activeTab === 'timer' && (
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-sm font-medium text-[#323232] mb-4">更新タイマー設定</h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm text-gray-600">自動更新</label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4" defaultChecked />
                    <span className="text-sm text-[#323232]">有効</span>
                  </label>
                </div>

                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm text-gray-600">更新間隔</label>
                  <select className="py-2 px-3 border border-gray-300 rounded text-sm bg-white min-w-[150px]">
                    <option>60分</option>
                    <option>30分</option>
                    <option>90分</option>
                    <option>120分</option>
                  </select>
                </div>

                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm text-gray-600">次回更新</label>
                  <span className="text-sm text-[#323232]">2024/01/15 14:30</span>
                </div>

                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm text-gray-600">最終更新</label>
                  <span className="text-sm text-[#323232]">2024/01/15 13:30</span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-sm font-medium text-[#323232] mb-4">更新時間帯</h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm text-gray-600">時間帯設定</label>
                  <select className="py-2 px-3 border border-gray-300 rounded text-sm bg-white min-w-[150px]">
                    <option>会社設定を継承</option>
                    <option>24時間</option>
                    <option>カスタム</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Tab - 時刻指定更新 */}
        {activeTab === 'schedule' && (
          <ScheduleTab
            isTimerRunning={isTimerRunning}
            setIsTimerRunning={setIsTimerRunning}
            showTimerOverlay={showTimerOverlay}
            setShowTimerOverlay={setShowTimerOverlay}
            scheduleItems={scheduleItems}
            setScheduleItems={setScheduleItems}
            timeOptions={timeOptions}
            templates={templates}
            templateFolders={templateFolders}
            isLoadingTemplates={isLoadingTemplates}
            templateSearch={templateSearch}
            setTemplateSearch={setTemplateSearch}
            selectedTemplateTab={selectedTemplateTab}
            setSelectedTemplateTab={setSelectedTemplateTab}
            selectedFolderId={selectedFolderId}
            setSelectedFolderId={setSelectedFolderId}
            filteredTemplates={filteredTemplates}
            dedicatedFolderLabel={dedicatedFolderLabel}
            dedicatedFlowType={dedicatedFlowType}
            onTemplateCreated={(t) => setTemplates((prev) => [t, ...prev])}
          />
        )}
        </div>
      </div>
    </div>
  );
};

export default function ContentEditPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100 flex items-center justify-center">読み込み中...</div>}>
      <ContentEditPageInner />
    </Suspense>
  );
}
