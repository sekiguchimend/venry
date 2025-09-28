'use client';

import React from 'react';

const TableHeader: React.FC = () => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '60px 100px 20px 1fr 140px 100px 60px 60px',
      padding: '12px 16px',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #e0e0e0',
      fontSize: '12px',
      fontWeight: '500',
      color: '#666',
      alignItems: 'center'
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
      <div></div>
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
        最終更新日
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#2196f3'
        }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
        種別
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#2196f3'
        }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
        上位
        <div style={{
          width: '0',
          height: '0',
          borderLeft: '4px solid transparent',
          borderRight: '4px solid transparent',
          borderTop: '4px solid #666'
        }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
        メモ
        <div style={{
          width: '0',
          height: '0',
          borderLeft: '4px solid transparent',
          borderRight: '4px solid transparent',
          borderTop: '4px solid #666'
        }} />
      </div>
    </div>
  );
};

export default TableHeader;