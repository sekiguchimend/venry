'use client';

import React, { useState, useEffect } from 'react';
import { HelpCircle, Pencil, FileText, Trash2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getContentPosts, saveContentPosts, getContentIdBySiteAndFlow } from '@/lib/api/content';

const ContentEditPage: React.FC = () => {
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
        </div>

        {/* Main Content Area */}
        <div className="bg-white">

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="p-6">
            {/* Post Content Settings */}
            <div className="mb-8">
              {/* Post Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-black text-white rounded flex items-center justify-center font-bold text-base">
                    1
                  </div>
                  <h3 className="text-base font-medium text-gray-800">1件目の投稿内容を設定</h3>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setPostTitle('');
                      setNormalTime('');
                      setNormalPrice('');
                      setCouponTime('');
                      setCouponPrice('');
                      setConditions('');
                    }}
                    className="text-sm text-blue-600 hover:underline cursor-pointer bg-transparent border-none"
                  >
                    内容を消去
                  </button>
                  <button className="flex items-center gap-1 text-sm text-red-600 hover:underline cursor-pointer bg-transparent border-none">
                    <Trash2 size={14} />
                    枠を削除
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                {/* Title */}
                <div className="flex items-start gap-8">
                  <div className="w-32 pt-2">
                    <label className="text-sm text-gray-700 flex items-center gap-2">
                      タイトル
                      <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded">必須</span>
                    </label>
                  </div>
                  <div className="flex-1">
                    <div className="relative">
                      <input
                        type="text"
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                        placeholder="新規割MAX3000円"
                        maxLength={1000}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                        {postTitle.length}/1000
                      </span>
                    </div>
                  </div>
                </div>

                {/* Normal Price */}
                <div className="flex items-start gap-8">
                  <div className="w-32 pt-2">
                    <label className="text-sm text-gray-700 flex items-center gap-2">
                      通常価格
                      <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded">必須</span>
                    </label>
                  </div>
                  <div className="flex-1 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={normalTime}
                        onChange={(e) => setNormalTime(e.target.value)}
                        placeholder="60"
                        maxLength={1000}
                        className="w-24 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 text-right"
                      />
                      <span className="text-sm text-gray-600">分</span>
                      <span className="text-xs text-gray-400">{normalTime.length}/1000</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={normalPrice}
                        onChange={(e) => setNormalPrice(e.target.value)}
                        placeholder="16000"
                        maxLength={1000}
                        className="w-32 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 text-right"
                      />
                      <span className="text-sm text-gray-600">円</span>
                      <span className="text-xs text-gray-400">{normalPrice.length}/1000</span>
                    </div>
                  </div>
                </div>

                {/* Coupon Price */}
                <div className="flex items-start gap-8">
                  <div className="w-40 pt-2">
                    <label className="text-sm text-gray-700 flex items-center gap-2">
                      クーポン価格
                      <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded">必須</span>
                    </label>
                  </div>
                  <div className="flex-1 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={couponTime}
                        onChange={(e) => setCouponTime(e.target.value)}
                        placeholder="60"
                        maxLength={1000}
                        className="w-24 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 text-right"
                      />
                      <span className="text-sm text-gray-600">分</span>
                      <span className="text-xs text-gray-400">{couponTime.length}/1000</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={couponPrice}
                        onChange={(e) => setCouponPrice(e.target.value)}
                        placeholder="13000"
                        maxLength={1000}
                        className="w-32 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 text-right"
                      />
                      <span className="text-sm text-gray-600">円</span>
                      <span className="text-xs text-gray-400">{couponPrice.length}/1000</span>
                    </div>
                  </div>
                </div>

                {/* Conditions */}
                <div className="flex items-start gap-8">
                  <div className="w-32 pt-2">
                    <label className="text-sm text-gray-700">使用条件、有効期限など</label>
                  </div>
                  <div className="flex-1">
                    <div className="relative">
                      <textarea
                        value={conditions}
                        onChange={(e) => setConditions(e.target.value)}
                        placeholder="受付時に新規割(HIMEチャンネル見た）とお申し付けください。&#10;※合算禁ありで適用、他の割引との併用不可、時間指定、本指名、のお客様は対象外"
                        rows={8}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 resize-none"
                      />
                      <span className="absolute right-3 bottom-3 text-xs text-gray-400">
                        {conditions.length}/∞
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2件目 */}
            <div className="mb-8">
              {/* Post Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-black text-white rounded flex items-center justify-center font-bold text-base">
                    2
                  </div>
                  <h3 className="text-base font-medium text-gray-800">2件目の投稿内容を設定</h3>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setPostTitle2('');
                      setNormalTime2('');
                      setNormalPrice2('');
                      setCouponTime2('');
                      setCouponPrice2('');
                      setConditions2('');
                    }}
                    className="text-sm text-blue-600 hover:underline cursor-pointer bg-transparent border-none"
                  >
                    内容を消去
                  </button>
                  <button className="flex items-center gap-1 text-sm text-red-600 hover:underline cursor-pointer bg-transparent border-none">
                    <Trash2 size={14} />
                    枠を削除
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                {/* Title */}
                <div className="flex items-start gap-8">
                  <div className="w-32 pt-2">
                    <label className="text-sm text-gray-700 flex items-center gap-2">
                      タイトル
                      <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded">必須</span>
                    </label>
                  </div>
                  <div className="flex-1">
                    <div className="relative">
                      <input
                        type="text"
                        value={postTitle2}
                        onChange={(e) => setPostTitle2(e.target.value)}
                        placeholder="新規割MAX3000円"
                        maxLength={1000}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                        {postTitle2.length}/1000
                      </span>
                    </div>
                  </div>
                </div>

                {/* Normal Price */}
                <div className="flex items-start gap-8">
                  <div className="w-32 pt-2">
                    <label className="text-sm text-gray-700 flex items-center gap-2">
                      通常価格
                      <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded">必須</span>
                    </label>
                  </div>
                  <div className="flex-1 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={normalTime2}
                        onChange={(e) => setNormalTime2(e.target.value)}
                        placeholder="60"
                        maxLength={1000}
                        className="w-24 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 text-right"
                      />
                      <span className="text-sm text-gray-600">分</span>
                      <span className="text-xs text-gray-400">{normalTime2.length}/1000</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={normalPrice2}
                        onChange={(e) => setNormalPrice2(e.target.value)}
                        placeholder="16000"
                        maxLength={1000}
                        className="w-32 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 text-right"
                      />
                      <span className="text-sm text-gray-600">円</span>
                      <span className="text-xs text-gray-400">{normalPrice2.length}/1000</span>
                    </div>
                  </div>
                </div>

                {/* Coupon Price */}
                <div className="flex items-start gap-8">
                  <div className="w-40 pt-2">
                    <label className="text-sm text-gray-700 flex items-center gap-2">
                      クーポン価格
                      <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded">必須</span>
                    </label>
                  </div>
                  <div className="flex-1 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={couponTime2}
                        onChange={(e) => setCouponTime2(e.target.value)}
                        placeholder="60"
                        maxLength={1000}
                        className="w-24 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 text-right"
                      />
                      <span className="text-sm text-gray-600">分</span>
                      <span className="text-xs text-gray-400">{couponTime2.length}/1000</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={couponPrice2}
                        onChange={(e) => setCouponPrice2(e.target.value)}
                        placeholder="13000"
                        maxLength={1000}
                        className="w-32 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 text-right"
                      />
                      <span className="text-sm text-gray-600">円</span>
                      <span className="text-xs text-gray-400">{couponPrice2.length}/1000</span>
                    </div>
                  </div>
                </div>

                {/* Conditions */}
                <div className="flex items-start gap-8">
                  <div className="w-32 pt-2">
                    <label className="text-sm text-gray-700">使用条件、有効期限など</label>
                  </div>
                  <div className="flex-1">
                    <div className="relative">
                      <textarea
                        value={conditions2}
                        onChange={(e) => setConditions2(e.target.value)}
                        placeholder="受付時に新規割(HIMEチャンネル見た）とお申し付けください。&#10;※合算禁ありで適用、他の割引との併用不可、時間指定、本指名、のお客様は対象外"
                        rows={8}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 resize-none"
                      />
                      <span className="absolute right-3 bottom-3 text-xs text-gray-400">
                        {conditions2.length}/∞
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3件目 */}
            <div className="mb-8">
              {/* Post Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-black text-white rounded flex items-center justify-center font-bold text-base">
                    3
                  </div>
                  <h3 className="text-base font-medium text-gray-800">3件目の投稿内容を設定</h3>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setPostTitle3('');
                      setNormalTime3('');
                      setNormalPrice3('');
                      setCouponTime3('');
                      setCouponPrice3('');
                      setConditions3('');
                    }}
                    className="text-sm text-blue-600 hover:underline cursor-pointer bg-transparent border-none"
                  >
                    内容を消去
                  </button>
                  <button className="flex items-center gap-1 text-sm text-red-600 hover:underline cursor-pointer bg-transparent border-none">
                    <Trash2 size={14} />
                    枠を削除
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                {/* Title */}
                <div className="flex items-start gap-8">
                  <div className="w-32 pt-2">
                    <label className="text-sm text-gray-700 flex items-center gap-2">
                      タイトル
                      <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded">必須</span>
                    </label>
                  </div>
                  <div className="flex-1">
                    <div className="relative">
                      <input
                        type="text"
                        value={postTitle3}
                        onChange={(e) => setPostTitle3(e.target.value)}
                        placeholder="新規割MAX3000円"
                        maxLength={1000}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                        {postTitle3.length}/1000
                      </span>
                    </div>
                  </div>
                </div>

                {/* Normal Price */}
                <div className="flex items-start gap-8">
                  <div className="w-32 pt-2">
                    <label className="text-sm text-gray-700 flex items-center gap-2">
                      通常価格
                      <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded">必須</span>
                    </label>
                  </div>
                  <div className="flex-1 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={normalTime3}
                        onChange={(e) => setNormalTime3(e.target.value)}
                        placeholder="60"
                        maxLength={1000}
                        className="w-24 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 text-right"
                      />
                      <span className="text-sm text-gray-600">分</span>
                      <span className="text-xs text-gray-400">{normalTime3.length}/1000</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={normalPrice3}
                        onChange={(e) => setNormalPrice3(e.target.value)}
                        placeholder="16000"
                        maxLength={1000}
                        className="w-32 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 text-right"
                      />
                      <span className="text-sm text-gray-600">円</span>
                      <span className="text-xs text-gray-400">{normalPrice3.length}/1000</span>
                    </div>
                  </div>
                </div>

                {/* Coupon Price */}
                <div className="flex items-start gap-8">
                  <div className="w-40 pt-2">
                    <label className="text-sm text-gray-700 flex items-center gap-2">
                      クーポン価格
                      <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded">必須</span>
                    </label>
                  </div>
                  <div className="flex-1 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={couponTime3}
                        onChange={(e) => setCouponTime3(e.target.value)}
                        placeholder="60"
                        maxLength={1000}
                        className="w-24 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 text-right"
                      />
                      <span className="text-sm text-gray-600">分</span>
                      <span className="text-xs text-gray-400">{couponTime3.length}/1000</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={couponPrice3}
                        onChange={(e) => setCouponPrice3(e.target.value)}
                        placeholder="13000"
                        maxLength={1000}
                        className="w-32 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 text-right"
                      />
                      <span className="text-sm text-gray-600">円</span>
                      <span className="text-xs text-gray-400">{couponPrice3.length}/1000</span>
                    </div>
                  </div>
                </div>

                {/* Conditions */}
                <div className="flex items-start gap-8">
                  <div className="w-32 pt-2">
                    <label className="text-sm text-gray-700">使用条件、有効期限など</label>
                  </div>
                  <div className="flex-1">
                    <div className="relative">
                      <textarea
                        value={conditions3}
                        onChange={(e) => setConditions3(e.target.value)}
                        placeholder="受付時に新規割(HIMEチャンネル見た）とお申し付けください。&#10;※合算禁ありで適用、他の割引との併用不可、時間指定、本指名、のお客様は対象外"
                        rows={8}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 resize-none"
                      />
                      <span className="absolute right-3 bottom-3 text-xs text-gray-400">
                        {conditions3.length}/∞
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

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
        </div>
      </div>
    </div>
  );
};

export default ContentEditPage;
