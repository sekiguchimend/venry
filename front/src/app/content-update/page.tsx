'use client';

import React, { useState } from 'react';
import { Search, Settings, Plus } from 'lucide-react';
import { TabKey, TabItem } from '../../types/content-update';
import { getTabContent, getItemCount, shouldShowGroupButtons } from './utils/tabContentFactory';
import TableHeader from './components/TableHeader';
import GroupButtons from './components/GroupButtons';
import PaginationControls from './components/PaginationControls';

const ContentUpdatePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('content-list');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const tabs: TabItem[] = [
    { key: 'content-list', label: 'コンテンツ一覧' },
    { key: 'monthly-site', label: '月末通り貫通サイト運営' },
    { key: 'female-recruitment', label: '女性求人' },
    { key: 'male-recruitment', label: '男性求人' }
  ];

  return (
    <div style={{
      padding: '20px',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      {/* Header Buttons Section */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px'
      }}>
        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center'
        }}>
          <button
            style={{
              padding: '8px 16px',
              backgroundColor: '#ffffff',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              fontSize: '14px',
              color: '#333',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'background-color 0.2s ease'
            }}
          >
            <Settings size={16} />
            まとめて更新設定
          </button>

          <button
            style={{
              padding: '8px 16px',
              backgroundColor: '#ffffff',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              fontSize: '14px',
              color: '#333',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'background-color 0.2s ease'
            }}
          >
            <Settings size={16} />
            ツール
          </button>

          <button
            style={{
              padding: '8px 16px',
              backgroundColor: '#ffffff',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              fontSize: '14px',
              color: '#333',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'background-color 0.2s ease'
            }}
          >
            <Settings size={16} />
            更新情報を見る!
          </button>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#ffffff',
          padding: '8px 12px',
          borderRadius: '4px',
          border: '1px solid #e0e0e0'
        }}>
          <span style={{
            fontSize: '14px',
            color: '#333',
            fontWeight: '500'
          }}>
            24時間更新
          </span>
          <Settings size={16} style={{ color: '#666' }} />
        </div>
      </div>

      {/* Main Content Card */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #e0e0e0'
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '12px 24px',
                border: 'none',
                backgroundColor: '#ffffff',
                color: activeTab === tab.key ? '#1976d2' : '#666',
                borderBottom: activeTab === tab.key ? '3px solid #1976d2' : '3px solid transparent',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeTab === tab.key ? '500' : '400',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
          <button
            style={{
              padding: '12px 16px',
              border: 'none',
              backgroundColor: '#ffffff',
              color: '#666',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'background-color 0.2s ease'
            }}
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Search Bar and Pagination Row */}
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
              placeholder="コンテンツ名で検索"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 40px 8px 40px',
                border: '1px solid #e0e0e0',
                borderRadius: '20px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s ease'
              }}
            />
          </div>

          {/* Pagination and Count */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            {shouldShowGroupButtons(activeTab) && <GroupButtons />}

            <div style={{
              fontSize: '14px',
              color: '#666'
            }}>
              {getItemCount(activeTab)}
            </div>

            <PaginationControls
              activeTab={activeTab}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>

        {/* Table Header */}
        <TableHeader />

        {/* Tab Content */}
        {getTabContent(activeTab)}
      </div>
    </div>
  );
};

export default ContentUpdatePage;