'use client';

import React, { useState } from 'react';
import { Search, Settings, Edit, ChevronDown, Star } from 'lucide-react';

interface EscortData {
  id: number;
  favorite: boolean;
  status: 'waiting' | 'accepting' | string;
  statusCode?: string;
  time: string;
  name: string;
  comment: string;
  score: string;
}

const ESCORT_DATA: EscortData[] = [
  {
    id: 1,
    favorite: true,
    status: 'waiting',
    time: '15:00 〜 翌00:00',
    name: 'あんじゅ',
    comment: '小さなお顔とスレンダーな体、理想のスタイルを持つ彼女。',
    score: '28/1000'
  },
  {
    id: 2,
    favorite: true,
    status: 'accepting',
    statusCode: '〜23:10',
    time: '15:00 〜 翌00:00',
    name: 'れん',
    comment: '圧倒的なモデル美女と夢の様な時間！見惚し見苦笑！',
    score: '23/1000'
  },
  {
    id: 3,
    favorite: true,
    status: 'waiting',
    time: '17:00 〜 翌03:00',
    name: 'かれん',
    comment: '業界未経験！！元エステシャン！おっとりスレンダーレディ♪',
    score: '28/1000'
  }
];

const InstantEscortUpdatePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSort, setSelectedSort] = useState('latest');
  const [selectedTarget, setSelectedTarget] = useState('all-waiting');

  const tabs = [
    { key: 'all', label: '女性' },
    { key: 'site-settings', label: 'サイト設定' }
  ];

  return (
    <div style={{
      padding: '20px',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      {/* Orange Alert Banner */}
      <div style={{
        backgroundColor: '#ff9800',
        color: '#ffffff',
        padding: '12px 16px',
        marginBottom: '20px',
        borderRadius: '4px',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <div style={{
          width: '0',
          height: '0',
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderBottom: '14px solid #ffffff'
        }} />
        即客内可能な女性を各サイトへ一括で更新します。また、待機中や接客中の最新情報も可能です。
        目安更新時間に当日の出勤情報により異なりますので、ご注意ください。
        <div style={{
          marginLeft: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>目安更新時間 5:00</span>
          <Edit size={16} />
        </div>
      </div>

      {/* Control Row with Stop Button and Dropdowns - Outside Card */}
      <div style={{
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '20px'
      }}>
        {/* Stop Button */}
        <button
          style={{
            padding: '8px 16px',
            backgroundColor: '#f44336',
            color: '#ffffff',
            border: 'none',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'background-color 0.2s ease'
          }}
        >
          ⏸ 止める
        </button>

        <span style={{ color: '#666', fontSize: '14px' }}>自動更新中</span>

        {/* Dropdowns */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            style={{
              padding: '6px 12px',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              fontSize: '14px',
              backgroundColor: '#ffffff',
              cursor: 'pointer'
            }}
          >
            <option value="latest">最新</option>
            <option value="oldest">過去順</option>
          </select>

          <span style={{ color: '#666', fontSize: '14px' }}>で</span>

          <select
            value={selectedTarget}
            onChange={(e) => setSelectedTarget(e.target.value)}
            style={{
              padding: '6px 12px',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              fontSize: '14px',
              backgroundColor: '#ffffff',
              cursor: 'pointer'
            }}
          >
            <option value="all-waiting">全員同時</option>
            <option value="waiting-only">待機中のみ</option>
            <option value="accepting-only">接客中のみ</option>
          </select>

          <span style={{ color: '#666', fontSize: '14px' }}>を</span>

          <select
            style={{
              padding: '6px 12px',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              fontSize: '14px',
              backgroundColor: '#ffffff',
              cursor: 'pointer'
            }}
          >
            <option value="all-sites">死にに出勤している人等</option>
          </select>
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
        </div>


        {/* Search Bar and Status Row */}
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
              placeholder="名前で検索"
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

          {/* Status NEW button and Count */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <button
              style={{
                padding: '4px 8px',
                backgroundColor: '#ff4444',
                color: '#ffffff',
                border: 'none',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              NEW
            </button>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#4CAF50'
                }}
              />
              <span style={{ fontSize: '14px', color: '#666' }}>ステータス一括設定</span>
              <Settings size={16} style={{ color: '#666' }} />
            </div>

            <div style={{
              fontSize: '14px',
              color: '#666'
            }}>
              女性 65 人　更新対象 10 コンテンツ
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '60px 120px 200px 100px 150px 1fr 100px 60px',
          padding: '12px 16px',
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #e0e0e0',
          fontSize: '12px',
          fontWeight: '500',
          color: '#666'
        }}>
          <div style={{ textAlign: 'center' }}>
            対象女性
          </div>
          <div style={{ textAlign: 'center' }}>
            個別設定
          </div>
          <div style={{ textAlign: 'center' }}>
            ステータス
          </div>
          <div style={{ textAlign: 'center' }}>
            出勤
          </div>
          <div style={{ textAlign: 'center' }}>
            選択
          </div>
          <div style={{ textAlign: 'center' }}>
            名前
          </div>
          <div style={{ textAlign: 'center' }}>
            コメント
          </div>
          <div style={{ textAlign: 'center' }}>
            除外設定
          </div>
        </div>

        {/* Escort Data Rows */}
        {ESCORT_DATA.map((escort) => (
          <div
            key={escort.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '60px 120px 200px 100px 150px 1fr 100px 60px',
              padding: '12px 16px',
              borderBottom: '1px solid #f0f0f0',
              alignItems: 'center',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            {/* Favorite Star */}
            <div style={{ textAlign: 'center' }}>
              <Star
                size={20}
                style={{
                  color: escort.favorite ? '#ffc107' : '#e0e0e0',
                  fill: escort.favorite ? '#ffc107' : 'none',
                  cursor: 'pointer'
                }}
              />
            </div>

            {/* Individual Settings */}
            <div style={{ textAlign: 'center' }}>
              <button
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                個別設定
              </button>
            </div>

            {/* Status */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              <div
                style={{
                  padding: '4px 8px',
                  backgroundColor: escort.status === 'waiting' ? '#ffffff' : '#4CAF50',
                  color: escort.status === 'waiting' ? '#666' : '#ffffff',
                  border: escort.status === 'waiting' ? '1px solid #e0e0e0' : 'none',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}
              >
                {escort.status === 'waiting' ? '待機中' : '接客中'}
              </div>
              {escort.statusCode && (
                <div
                  style={{
                    padding: '2px 6px',
                    backgroundColor: '#2196F3',
                    color: '#ffffff',
                    borderRadius: '3px',
                    fontSize: '10px'
                  }}
                >
                  {escort.statusCode}
                </div>
              )}
              <ChevronDown size={16} style={{ color: '#666' }} />
            </div>

            {/* Time */}
            <div style={{
              textAlign: 'center',
              fontSize: '12px',
              color: '#666'
            }}>
              {escort.time}
            </div>

            {/* Selection Buttons */}
            <div style={{
              display: 'flex',
              gap: '4px',
              justifyContent: 'center'
            }}>
              {['連絡', '選択'].map((label) => (
                <button
                  key={label}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Name */}
            <div style={{
              fontSize: '14px',
              color: '#333',
              fontWeight: '500'
            }}>
              {escort.name}
            </div>

            {/* Comment */}
            <div style={{
              fontSize: '12px',
              color: '#666',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {escort.comment}
            </div>

            {/* Score */}
            <div style={{
              textAlign: 'center',
              fontSize: '12px',
              color: '#666'
            }}>
              {escort.score}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstantEscortUpdatePage;