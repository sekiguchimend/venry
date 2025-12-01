'use client';

import React from 'react';
import { HelpCircle } from 'lucide-react';

const TableHeader: React.FC = () => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '50px 100px 1fr 100px 80px 50px auto 1fr',
      padding: '12px 16px',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #e0e0e0',
      fontSize: '12px',
      fontWeight: '500',
      color: '#666'
    }}>
      <div></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        タイマー
        <div style={{
          width: '0',
          height: '0',
          borderLeft: '4px solid transparent',
          borderRight: '4px solid transparent',
          borderTop: '4px solid #666'
        }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        コンテンツ名
        <div style={{
          width: '0',
          height: '0',
          borderLeft: '4px solid transparent',
          borderRight: '4px solid transparent',
          borderTop: '4px solid #666'
        }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
        最終更新日
        <HelpCircle size={14} color="#3b82f6" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
        種別
        <HelpCircle size={14} color="#3b82f6" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
        上位
        <div style={{
          width: '0',
          height: '0',
          borderLeft: '4px solid transparent',
          borderRight: '4px solid transparent',
          borderTop: '4px solid #666'
        }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '8px' }}>
        メモ
        <div style={{
          width: '0',
          height: '0',
          borderLeft: '4px solid transparent',
          borderRight: '4px solid transparent',
          borderTop: '4px solid #666'
        }} />
      </div>
      <div></div>
    </div>
  );
};

export default TableHeader;
