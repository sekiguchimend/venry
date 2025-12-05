'use client';

import React from 'react';
import { Edit, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ContentRowProps {
  item: {
    id: string;
    contentName: string;
    timer: {
      nextTime: string;
      date: string;
    };
    timerIconColor: string;
    lastUpdated: {
      date: string;
      time: string;
    };
    category: {
      label: string;
      backgroundColor: string;
    };
  };
}

const ContentRow: React.FC<ContentRowProps> = ({ item }) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/content-update/edit?id=${item.id}`);
  };

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
          <Clock size={16} style={{ color: item.timerIconColor }} />
          <div>
            <div style={{ fontSize: '10px', color: '#666' }}>次回</div>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#333' }}>{item.timer.nextTime}</div>
            <div style={{ fontSize: '10px', color: '#666' }}>({item.timer.date})</div>
          </div>
        </div>

        {/* コンテンツ名 */}
        <div style={{ fontSize: '14px', color: '#333' }}>
          {item.contentName}
        </div>

        {/* 最終更新日 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
          <span style={{ fontSize: '12px', color: '#3b82f6', textDecoration: 'underline', cursor: 'pointer' }}>
            {item.lastUpdated.date}{item.lastUpdated.time}
          </span>
          <Edit size={11} style={{ color: '#3b82f6' }} />
        </div>

        {/* 種別 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{
            padding: '2px 8px',
            backgroundColor: item.category.backgroundColor,
            borderRadius: '8px',
            fontSize: '12px',
            color: '#666'
          }}>
            {item.category.label}
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
            <Clock size={16} style={{ color: item.timerIconColor }} />
            <div>
              <div className="text-xs text-gray-500">次回</div>
              <div className="text-sm font-bold text-gray-800">{item.timer.nextTime}</div>
              <div className="text-xs text-gray-500">({item.timer.date})</div>
            </div>
          </div>

          {/* Content Info */}
          <div className="flex-1 min-w-0">
            <div className="text-sm text-gray-800">
              {item.contentName}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {item.lastUpdated.date} {item.lastUpdated.time} | {item.category.label}
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
