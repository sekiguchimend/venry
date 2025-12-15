'use client';

import React, { useMemo, useState } from 'react';
import { HelpCircle, Copy, Clipboard, RotateCcw } from 'lucide-react';
import type { SiteOption } from '../../types';
import { QaItemEditor } from './QaItemEditor';
import { QaSiteTabs } from './QaSiteTabs';
import type { QaItem, QaSiteTabId } from './types';

function makeEmptyItems(count: number): QaItem[] {
  return Array.from({ length: count }, () => ({ question: '', answer: '' }));
}

const QA_ITEM_COUNT = 10;

export default function QATab({ siteOptions }: { siteOptions: SiteOption[] }) {
  const tabs = useMemo(
    () =>
      [
        { id: 'common' as const, label: '共通Q&A' },
        { id: 'delihelTown' as const, label: 'デリヘルタウン' },
        { id: 'kuchikomi' as const, label: '口コミ風俗情報...' },
        { id: 'cityHeaven' as const, label: 'シティヘブン...' },
        { id: 'manzoku' as const, label: 'マンゾクネット' },
        { id: 'ekichika' as const, label: '駅ちか人気！...' },
        { id: 'fuzokuJapan' as const, label: '風俗じゃぱん！' },
      ] satisfies { id: QaSiteTabId; label: string }[],
    [],
  );

  const [activeSite, setActiveSite] = useState<QaSiteTabId>('common');
  const [qaListBySite, setQaListBySite] = useState<Record<QaSiteTabId, QaItem[]>>(() => ({
    common: makeEmptyItems(QA_ITEM_COUNT),
    delihelTown: makeEmptyItems(QA_ITEM_COUNT),
    kuchikomi: makeEmptyItems(QA_ITEM_COUNT),
    cityHeaven: makeEmptyItems(QA_ITEM_COUNT),
    manzoku: makeEmptyItems(QA_ITEM_COUNT),
    ekichika: makeEmptyItems(QA_ITEM_COUNT),
    fuzokuJapan: makeEmptyItems(QA_ITEM_COUNT),
  }));

  // NOTE: スクショ表記に合わせて「共通Q&A更新サイト：6サイト」を固定表示にしています。
  // 実データ連携が入ったら、siteOptions などから算出に差し替えてください。
  const commonQaUpdateSiteCount = 6;

  const activeList = qaListBySite[activeSite];

  const handleChangeItem = (index: number, next: QaItem) => {
    setQaListBySite((prev) => ({
      ...prev,
      [activeSite]: prev[activeSite].map((it, i) => (i === index ? next : it)),
    }));
  };

  return (
    <div className="space-y-4">
      {/* 上部リンク */}
      <div className="flex items-center justify-between">
        <button type="button" className="text-sm text-blue-600 hover:underline flex items-center gap-2">
          <HelpCircle size={16} className="text-blue-600" />
          Q&A項目について
        </button>
        <button type="button" className="text-sm text-blue-600 hover:underline">
          他の女性のQ&Aを読み込む
        </button>
      </div>

      {/* 注意 */}
      <div className="bg-yellow-50 border border-yellow-200 px-5 py-4 text-sm text-amber-700 leading-relaxed">
        <div>
          各サイトタブで1項目でも入力されている場合は更新対象となるため、
          <br />
          未入力の箇所は、サイト側で登録済みのQ&Aの内容が削除されるのでご注意ください。
          <br />
          (例：質問1　入力あり、回答1　未入力)
        </div>
        <div className="mt-3">
          すべての項目が未入力の場合は更新されません。
          <br />
          ※サイト側に登録済みのQ&Aの内容は保持されます
        </div>
      </div>

      {/* サブタブ */}
      <QaSiteTabs tabs={tabs} active={activeSite} onChange={setActiveSite} />

      {/* 見出し */}
      <div className="bg-gray-50 border border-gray-200 border-t-0">
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="text-base font-semibold text-gray-800">{tabs.find((t) => t.id === activeSite)?.label}</div>
            <HelpCircle size={16} className="text-blue-600" />
            <button type="button" className="text-sm text-blue-600 hover:underline">
              ≡ 共通Q&A更新サイト：{commonQaUpdateSiteCount}サイト
            </button>
          </div>
          <div className="flex items-center gap-4 text-blue-600">
            <button type="button" className="p-1 hover:text-blue-700" aria-label="コピー">
              <Copy size={18} />
            </button>
            <button type="button" className="p-1 hover:text-blue-700" aria-label="貼り付け">
              <Clipboard size={18} />
            </button>
            <div className="w-px h-6 bg-gray-300" />
            <button type="button" className="p-1 hover:text-blue-700" aria-label="リセット">
              <RotateCcw size={18} />
            </button>
          </div>
        </div>

        {/* 入力一覧 */}
        <div className="bg-white border-t border-gray-200 px-5">
          {activeList.map((item, idx) => (
            <QaItemEditor key={idx} index={idx} item={item} onChange={(next) => handleChangeItem(idx, next)} />
          ))}
        </div>
      </div>
    </div>
  );
}


