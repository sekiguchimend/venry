'use client';

import React, { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import WomenListRow from './WomenListRow';
import { WomenListProps, WomanItem } from '../types/women-list';

const WomenList: React.FC<WomenListProps> = ({
  items,
  searchTerm: initialSearchTerm = '',
  onSearch,
  totalCount = 282,
  currentPage = 1,
  totalPages = 4,
  onPageChange
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  const handlePageClick = (page: number) => {
    onPageChange?.(page);
  };

  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    }}>
      {/* Header Section */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
        borderBottom: '1px solid #f0f0f0'
      }}>
        {/* Left side - Action buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <button
            style={{
              padding: '8px 16px',
              backgroundColor: '#4caf50',
              border: 'none',
              borderRadius: '20px',
              fontSize: '14px',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Plus size={16} />
            新規登録
          </button>

          <button
            style={{
              padding: '8px 16px',
              backgroundColor: '#4caf50',
              border: 'none',
              borderRadius: '20px',
              fontSize: '14px',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Plus size={16} />
            女性取り込み
          </button>

          <button
            style={{
              padding: '8px 16px',
              backgroundColor: 'transparent',
              border: '1px solid #e0e0e0',
              borderRadius: '20px',
              fontSize: '14px',
              color: '#666',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9H21ZM5 3H14.17L19 7.83V21H5V3Z"/>
            </svg>
            別名管理
          </button>

          <button
            style={{
              padding: '8px 16px',
              backgroundColor: 'transparent',
              border: '1px solid #e0e0e0',
              borderRadius: '20px',
              fontSize: '14px',
              color: '#666',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M19 19H5V5H19V19M17 12H7V10H17V12Z"/>
            </svg>
            ツール
          </button>

          <button
            style={{
              padding: '8px 16px',
              backgroundColor: 'transparent',
              border: '1px solid #e0e0e0',
              borderRadius: '20px',
              fontSize: '14px',
              color: '#666',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Filter size={16} />
            サイト入実
          </button>
        </div>

        {/* Right side - View toggle */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <button style={{
            width: '32px',
            height: '32px',
            backgroundColor: '#1976d2',
            border: 'none',
            borderRadius: '4px',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 3H21V5H3V3M3 7H21V9H3V7M3 11H21V13H3V11M3 15H21V17H3V15M3 19H21V21H3V19Z"/>
            </svg>
          </button>
          <button style={{
            width: '32px',
            height: '32px',
            backgroundColor: 'transparent',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            color: '#666',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 11H11V3H3M5 5H9V9H5M13 3V11H21V3M19 5V9H15V5M3 21H11V13H3M5 15H9V19H5M15 21H19V19H15M21 19V21H21V19M15 15H17V17H15M19 15H21V17H19M15 13H17V15H15M19 13H21V15H19"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Search and Controls Section */}
      <div style={{
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #f0f0f0'
      }}>
        {/* Search Bar */}
        <div style={{
          position: 'relative',
          width: '350px'
        }}>
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#666'
            }}
          />
          <input
            type="text"
            placeholder="女性名で検索"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
              width: '100%',
              padding: '8px 40px 8px 40px',
              border: '1px solid #e0e0e0',
              borderRadius: '20px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          <button
            style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#666',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 17V19H9V17H3M3 5V7H13V5H3M13 21V19H21V17H13V15H11V21H13M7 9V11H3V13H7V15H9V9H7M21 13V11H11V13H21M15 9H13V7H15V5H17V9H15Z"/>
            </svg>
          </button>
        </div>

        {/* Filter Tag */}
        <div style={{
          backgroundColor: '#1976d2',
          color: '#fff',
          padding: '4px 12px',
          borderRadius: '4px',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          📂 選択編集
        </div>

        {/* Status and Pagination */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            fontSize: '14px',
            color: '#666'
          }}>
            1-50人 / {totalCount}人中
          </div>
          <div style={{
            fontSize: '14px',
            color: '#666'
          }}>
            上限400人
          </div>

          {/* Pagination */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: page === currentPage ? '#1976d2' : 'transparent',
                  color: page === currentPage ? '#fff' : '#666',
                  border: '1px solid #e0e0e0',
                  borderRadius: '50%',
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {page}
              </button>
            ))}
            <button style={{
              width: '24px',
              height: '24px',
              backgroundColor: 'transparent',
              color: '#666',
              border: '1px solid #e0e0e0',
              borderRadius: '50%',
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Table Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '60px 100px 60px 1fr 80px 120px 80px',
        padding: '12px 16px',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #e0e0e0',
        fontSize: '12px',
        fontWeight: '400',
        color: '#666',
        alignItems: 'center'
      }}>
        <div></div>
        <div style={{ textAlign: 'center' }}>名前 ↓</div>
        <div style={{ textAlign: 'center' }}>年齢 ↓</div>
        <div style={{ paddingLeft: '8px' }}>新人</div>
        <div style={{ textAlign: 'center' }}>サイズ</div>
        <div style={{ textAlign: 'center' }}>入店日 ↓</div>
        <div style={{ textAlign: 'center' }}>公開状態 ↓</div>
        <div style={{ textAlign: 'center' }}>メモ ↓</div>
      </div>

      {/* Content Rows */}
      {items.map((item) => (
        <WomenListRow key={item.id} item={item} />
      ))}
    </div>
  );
};

export default WomenList;