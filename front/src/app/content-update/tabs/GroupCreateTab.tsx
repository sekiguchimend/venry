'use client';

import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

interface ContentItem {
  id: number;
  name: string;
  category: string;
  categoryColor: string;
  hasUpperIcon: boolean;
  time: string;
}

const GroupCreateTab: React.FC = () => {
  const [groupName, setGroupName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [hideGroupSettings, setHideGroupSettings] = useState(false);

  const contentItems: ContentItem[] = [
    { id: 1, name: 'HIME CHANNEL(クーポン)', category: '割引', categoryColor: '#3b82f6', hasUpperIcon: false, time: '60分' },
    { id: 2, name: 'HIME CHANNEL(今すぐ遊べる)【一括更新専用】', category: '即姫', categoryColor: '#f97316', hasUpperIcon: false, time: '60分' },
    { id: 3, name: 'HIME CHANNEL(店舗投稿)', category: 'その他', categoryColor: '#6b7280', hasUpperIcon: true, time: '60分' },
    { id: 4, name: 'KFJ京都風俗情報(ニュース)', category: '速報', categoryColor: '#3b82f6', hasUpperIcon: true, time: '10分' },
    { id: 5, name: 'KFJ京都風俗情報(割引チケット)', category: '割引', categoryColor: '#3b82f6', hasUpperIcon: true, time: '10分' },
    { id: 6, name: 'KFJ京都風俗情報(リアルタイム)', category: '即姫', categoryColor: '#f97316', hasUpperIcon: true, time: '10分' },
    { id: 7, name: 'オフィシャル(京都ホテヘル倶楽部様)(即姫)【一括更新専用】', category: '即姫', categoryColor: '#f97316', hasUpperIcon: false, time: '60分' },
    { id: 8, name: 'ガールズヘブン(お店検索表示順アップ)', category: '上位化', categoryColor: '#22c55e', hasUpperIcon: true, time: '30分' },
    { id: 9, name: 'ガールズヘブン(求人)', category: '求人', categoryColor: '#ef4444', hasUpperIcon: false, time: '60分' },
    { id: 10, name: 'ガールズヘブン(先輩ボイス(旧))', category: 'その他', categoryColor: '#6b7280', hasUpperIcon: false, time: '14分' },
    { id: 11, name: 'ガールズヘブン(店長ブログ)', category: 'その他', categoryColor: '#6b7280', hasUpperIcon: true, time: '15分' },
    { id: 12, name: 'シティヘブンネット(ヘブン更新ボタン)', category: '上位化', categoryColor: '#22c55e', hasUpperIcon: true, time: '5分' },
    { id: 13, name: 'シティヘブンネット(直送便/プラチナメール)', category: '速報', categoryColor: '#3b82f6', hasUpperIcon: true, time: '10分' },
  ];

  const handleCheckboxChange = (id: number) => {
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === contentItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(contentItems.map(item => item.id));
    }
  };

  const getSelectedContents = () => {
    return contentItems.filter(item => selectedItems.includes(item.id));
  };

  return (
    <div>
      {/* Header with Group Name Input */}
      <div style={{
        padding: '16px',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '14px', color: '#333' }}>グループ名</span>
          <span style={{
            backgroundColor: '#ef4444',
            color: '#fff',
            fontSize: '10px',
            padding: '2px 6px',
            borderRadius: '4px'
          }}>必須</span>
          <input
            type="text"
            placeholder="例:速報グループ"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            maxLength={20}
            style={{
              padding: '8px 12px',
              border: '1px solid #e5e7eb',
              borderRadius: '4px',
              fontSize: '14px',
              width: '200px',
              outline: 'none'
            }}
          />
          <span style={{ fontSize: '12px', color: '#9ca3af' }}>{groupName.length}/20</span>
        </div>
        <button
          style={{
            padding: '8px 24px',
            backgroundColor: '#3b82f6',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          グループを作成
        </button>
      </div>

      {/* Main Content */}
      <div style={{
        display: 'flex',
        minHeight: '500px'
      }}>
        {/* Left Panel - Content List */}
        <div style={{
          flex: 1,
          borderRight: '1px solid #e5e7eb',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Search Bar */}
          <div style={{
            padding: '16px',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              position: 'relative',
              flex: 1,
              minWidth: '200px',
              maxWidth: '300px'
            }}>
              <Search size={16} style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af'
              }} />
              <input
                type="text"
                placeholder="コンテンツ名で検索"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 36px 8px 36px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '4px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <SlidersHorizontal size={16} style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af',
                cursor: 'pointer'
              }} />
            </div>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              color: '#6b7280',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}>
              <input
                type="checkbox"
                checked={hideGroupSettings}
                onChange={(e) => setHideGroupSettings(e.target.checked)}
                style={{ width: '14px', height: '14px' }}
              />
              別グループ設定済を非表示
            </label>
          </div>

          {/* Table Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '40px 1fr 70px 50px 60px',
            padding: '12px 16px',
            backgroundColor: '#f9fafb',
            borderBottom: '1px solid #e5e7eb',
            fontSize: '12px',
            color: '#6b7280'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <input
                type="checkbox"
                checked={selectedItems.length === contentItems.length && contentItems.length > 0}
                onChange={handleSelectAll}
                style={{ width: '14px', height: '14px' }}
              />
            </div>
            <div>コンテンツ名</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
              種別
              <span style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: '#3b82f6',
                color: '#fff',
                fontSize: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>?</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
              上位
              <span style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: '#3b82f6',
                color: '#fff',
                fontSize: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>?</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
              最短
              <span style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: '#3b82f6',
                color: '#fff',
                fontSize: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>?</span>
            </div>
          </div>

          {/* Content List */}
          <div style={{ flex: 1, overflow: 'auto' }}>
            {contentItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '40px 1fr 70px 50px 60px',
                  padding: '12px 16px',
                  borderBottom: '1px solid #f3f4f6',
                  alignItems: 'center',
                  backgroundColor: selectedItems.includes(item.id) ? '#eff6ff' : '#fff'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                    style={{ width: '14px', height: '14px' }}
                  />
                </div>
                <div style={{ fontSize: '13px', color: '#333' }}>{item.name}</div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    color: item.categoryColor,
                    border: `1px solid ${item.categoryColor}`,
                    backgroundColor: '#fff'
                  }}>
                    {item.category}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {item.hasUpperIcon && (
                    <span style={{ color: '#9ca3af', fontSize: '16px' }}>↗</span>
                  )}
                </div>
                <div style={{ textAlign: 'center', fontSize: '13px', color: '#333' }}>{item.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Selected Contents */}
        <div style={{
          width: '400px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#f9fafb'
        }}>
          {/* Right Panel Header */}
          <div style={{
            padding: '16px',
            borderBottom: '1px solid #e5e7eb'
          }}>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
              現在{selectedItems.length}コンテンツ選択済
            </div>
            <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>
              ドラッグでコンテンツを並び替えることができます
            </div>
          </div>

          {/* Right Panel Table Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 60px 40px 50px',
            padding: '12px 16px',
            borderBottom: '1px solid #e5e7eb',
            fontSize: '12px',
            color: '#6b7280'
          }}>
            <div>コンテンツ名</div>
            <div style={{ textAlign: 'center' }}>種別</div>
            <div style={{ textAlign: 'center' }}>上位</div>
            <div style={{ textAlign: 'center' }}>最短</div>
          </div>

          {/* Selected Content List */}
          <div style={{
            flex: 1,
            overflow: 'auto',
            padding: selectedItems.length === 0 ? '40px 16px' : '0'
          }}>
            {selectedItems.length === 0 ? (
              <div style={{
                textAlign: 'center',
                color: '#9ca3af',
                fontSize: '14px'
              }}>
                左側のリストからコンテンツを選択してください
              </div>
            ) : (
              getSelectedContents().map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 60px 40px 50px',
                    padding: '12px 16px',
                    borderBottom: '1px solid #e5e7eb',
                    alignItems: 'center',
                    backgroundColor: '#fff'
                  }}
                >
                  <div style={{ fontSize: '13px', color: '#333' }}>{item.name}</div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <span style={{
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      color: item.categoryColor,
                      border: `1px solid ${item.categoryColor}`
                    }}>
                      {item.category}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {item.hasUpperIcon && (
                      <span style={{ color: '#9ca3af', fontSize: '14px' }}>↗</span>
                    )}
                  </div>
                  <div style={{ textAlign: 'center', fontSize: '12px', color: '#333' }}>{item.time}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCreateTab;
