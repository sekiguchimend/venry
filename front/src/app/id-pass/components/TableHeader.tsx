import React from 'react';

const TableHeader: React.FC = () => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 120px 80px',
      padding: '12px 16px',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #e0e0e0',
      fontSize: '12px',
      fontWeight: '500',
      color: '#666'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        サイト名
        <div style={{
          width: '0',
          height: '0',
          borderLeft: '4px solid transparent',
          borderRight: '4px solid transparent',
          borderTop: '4px solid #666'
        }} />
      </div>
      <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
        ステータス
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#2196f3'
        }} />
      </div>
      <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
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