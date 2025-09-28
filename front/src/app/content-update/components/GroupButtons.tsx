'use client';

import React from 'react';
import { Edit } from 'lucide-react';

const GroupButtons: React.FC = () => {
  return (
    <>
      <button
        style={{
          padding: '6px 12px',
          backgroundColor: '#ffffff',
          border: '1px solid #1976d2',
          borderRadius: '4px',
          fontSize: '13px',
          color: '#1976d2',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
      >
        グループ参照止
      </button>
      <button
        style={{
          padding: '6px 12px',
          backgroundColor: '#ffffff',
          border: '1px solid #1976d2',
          borderRadius: '4px',
          fontSize: '13px',
          color: '#1976d2',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
      >
        <Edit size={14} />
        グループを編集
      </button>
    </>
  );
};

export default GroupButtons;