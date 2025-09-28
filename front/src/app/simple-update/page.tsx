'use client';

import React, { useState } from 'react';
import { Search, Trash2, Eye, Plus } from 'lucide-react';

interface UpdateHistoryItem {
  id: number;
  date: string;
  time: string;
  title: string;
  gender: string;
  label: string;
}

const UPDATE_HISTORY_DATA: UpdateHistoryItem[] = [
  {
    id: 1,
    date: '2024/01/23',
    time: '17:44',
    title: '※テンプレートが削除されました',
    gender: 'まよ',
    label: '新人'
  },
  {
    id: 2,
    date: '2024/01/22',
    time: '19:44',
    title: '◆新人出勤情報◆急遽招集トミ人気！！',
    gender: '',
    label: '新人'
  }
];

const SimpleUpdatePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = UPDATE_HISTORY_DATA.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{
      padding: '20px',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      {/* New Post Button - Added above the card */}
      <div style={{
        marginBottom: '16px'
      }}>
        <button
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 20px',
            backgroundColor: '#4caf50',
            color: '#ffffff',
            border: 'none',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#45a049';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#4caf50';
          }}
        >
          <Plus size={18} />
          新規投稿
        </button>
      </div>

      {/* Main Card Container */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        {/* Title Section inside card */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #e0e0e0'
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '18px',
            fontWeight: '600',
            color: '#333'
          }}>
            過去の更新履歴
          </h2>
        </div>

        {/* Search Bar and Button Section */}
        <div style={{
          padding: '16px 20px',
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            position: 'relative',
            flex: 1,
            maxWidth: '400px'
          }}>
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#1976d2'
              }}
            />
            <input
              type="text"
              placeholder="タイトル・テンプレート名で検索"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px 10px 35px',
                border: '1px solid #e0e0e0',
                borderRadius: '20px',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: '#ffffff',
                color: '#333',
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#1976d2'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          <button
            style={{
              padding: '8px 16px',
              backgroundColor: 'transparent',
              color: '#1976d2',
              border: 'none',
              borderRadius: '3px',
              fontSize: '14px',
              fontWeight: '400',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f7ff'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Trash2 size={16} />
            選択削除
          </button>
        </div>

      {/* Table Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '40px 140px 1fr 120px 120px',
        padding: '12px 20px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e0e0e0',
        fontSize: '14px',
        fontWeight: '400',
        color: '#666'
      }}>
        <div></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          更新日時
          <div style={{
            width: '0',
            height: '0',
            borderLeft: '3px solid transparent',
            borderRight: '3px solid transparent',
            borderTop: '4px solid #999'
          }} />
        </div>
        <div>タイトル/テンプレート名</div>
        <div style={{ textAlign: 'center' }}>女性</div>
        <div style={{
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px'
        }}>
          ラベル
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#2196f3'
          }} />
        </div>
      </div>

      {/* History Rows */}
      {filteredHistory.map((item, index) => (
        <div
          key={item.id}
          style={{
            display: 'grid',
            gridTemplateColumns: '40px 140px 1fr 120px 120px',
            padding: '12px 20px',
            borderBottom: index === filteredHistory.length - 1 ? 'none' : '1px solid #e0e0e0',
            alignItems: 'center',
            backgroundColor: '#ffffff'
          }}
        >
          {/* Eye Icon Column */}
          <div style={{
            textAlign: 'center'
          }}>
            {index === 1 && (
              <Eye
                size={16}
                style={{
                  color: '#1976d2',
                  cursor: 'pointer'
                }}
              />
            )}
          </div>

          {/* Date and Time */}
          <div style={{
            fontSize: '14px',
            color: '#333',
            fontWeight: '400'
          }}>
            {item.date} {item.time}
          </div>

          {/* Title with colored text */}
          <div style={{
            fontSize: '14px',
            color: item.title.includes('削除されました') ? '#d32f2f' : '#333',
            fontWeight: '400'
          }}>
            {item.title}
          </div>

          {/* Gender */}
          <div style={{
            fontSize: '14px',
            color: '#333',
            textAlign: 'center'
          }}>
            {item.gender}
          </div>

          {/* Label */}
          <div style={{
            textAlign: 'center'
          }}>
            <span
              style={{
                padding: '4px 12px',
                backgroundColor: '#ffffff',
                color: '#1976d2',
                border: '1px solid #1976d2',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '400',
                display: 'inline-block'
              }}
            >
              {item.label}
            </span>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default SimpleUpdatePage;