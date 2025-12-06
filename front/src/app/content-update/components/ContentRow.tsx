'use client';

import React from 'react';
import { Edit, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FlowItem, FLOW_TYPE_COLORS, TIMER_COLORS } from '../../../types/content-update';

// FlowItem型に対応（旧ContentItemからの移行）
interface ContentRowProps {
  item: FlowItem;
}

const ContentRow: React.FC<ContentRowProps> = ({ item }) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/content-update/edit?siteId=${item.siteId}&flowCode=${item.flowCode}`);
  };

  // タイマーの色を決定（設定されていればそれを使用、なければデフォルト）
  const timerColor = item.timerIconColor || TIMER_COLORS.inactive;

  // タイプに基づくカテゴリカラーを取得
  const getCategoryStyle = () => {
    if (item.category) {
      return {
        backgroundColor: item.category.backgroundColor,
        label: item.category.label,
      };
    }
    // タイプの最初の要素からカラーを取得
    const firstType = item.types[0];
    if (firstType && FLOW_TYPE_COLORS[firstType]) {
      return {
        backgroundColor: FLOW_TYPE_COLORS[firstType].bg,
        label: firstType,
      };
    }
    return { backgroundColor: '#f5f5f5', label: '' };
  };

  const categoryStyle = getCategoryStyle();

  // タイマー情報（設定されていなければデフォルト表示）
  const timerInfo = item.timer || { nextTime: '--:--', date: '未設定' };
  const lastUpdatedInfo = item.lastUpdated || { date: '--', time: '--:--' };

  return (
    <div>
      {/* Desktop Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '50px 100px 1fr 100px 80px 50px auto 1fr',
        padding: '8px 16px',
        borderBottom: '1px solid #f0f0f0',
        minHeight: '50px',
        alignItems: 'center'
      }}>
        {/* 編集ボタン */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button
            onClick={handleEdit}
            style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            padding: '2px 6px',
            backgroundColor: 'transparent',
            color: '#3b82f6',
            border: 'none',
            borderRadius: '2px',
            fontSize: '11px',
            cursor: 'pointer',
            fontWeight: 'normal'
          }}>
            <Edit size={11} />
            編集
          </button>
        </div>

        {/* タイマー */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={16} style={{ color: timerColor }} />
          <div>
            <div style={{ fontSize: '10px', color: '#666' }}>次回</div>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#333' }}>{timerInfo.nextTime}</div>
            <div style={{ fontSize: '10px', color: '#666' }}>({timerInfo.date})</div>
          </div>
        </div>

        {/* コンテンツ名 */}
        <div style={{ fontSize: '14px', color: '#333' }}>
          {item.flowName}
        </div>

        {/* 最終更新日 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
          <span style={{ fontSize: '12px', color: '#3b82f6', textDecoration: 'underline', cursor: 'pointer' }}>
            {lastUpdatedInfo.date}{lastUpdatedInfo.time}
          </span>
          <Edit size={11} style={{ color: '#3b82f6' }} />
        </div>

        {/* 種別 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{
            padding: '2px 8px',
            backgroundColor: categoryStyle.backgroundColor,
            borderRadius: '8px',
            fontSize: '12px',
            color: '#666'
          }}>
            {categoryStyle.label}
          </span>
        </div>

        {/* 上位 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Edit size={13} style={{ color: '#666', cursor: 'pointer' }} />
        </div>

        {/* メモ */}
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '8px' }}>
          {/* メモ内容 */}
        </div>

        {/* 空きスペース */}
        <div></div>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden p-4 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-3">
          {/* タイマー */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Clock size={16} style={{ color: timerColor }} />
            <div>
              <div className="text-xs text-gray-500">次回</div>
              <div className="text-sm font-bold text-gray-800">{timerInfo.nextTime}</div>
              <div className="text-xs text-gray-500">({timerInfo.date})</div>
            </div>
          </div>

          {/* Content Info */}
          <div className="flex-1 min-w-0">
            <div className="text-sm text-gray-800">
              {item.flowName}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {lastUpdatedInfo.date} {lastUpdatedInfo.time} | {categoryStyle.label}
            </div>
          </div>

          {/* メモ */}
          <Edit size={14} className="text-gray-600 cursor-pointer flex-shrink-0" onClick={handleEdit} />
        </div>
      </div>
    </div>
  );
};

export default ContentRow;
