'use client';

import React, { useState } from 'react';
import { Pause, Pencil, X } from 'lucide-react';
import { getContentGroups } from '../actions/content-groups';

interface ContentGroup {
  id: string;
  company_id: string;
  name: string;
  description?: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

interface GroupButtonsProps {
  selectedGroupId: string | null;
  onSelectGroup: (groupId: string | null) => void;
  onEditGroup?: () => void;
}

const GroupButtons: React.FC<GroupButtonsProps> = ({ selectedGroupId, onSelectGroup, onEditGroup }) => {
  const [showGroupList, setShowGroupList] = useState(false);
  const [groups, setGroups] = useState<ContentGroup[]>([]);
  const [loading, setLoading] = useState(false);

  // グループ一覧を取得
  const fetchGroups = async () => {
    setLoading(true);
    try {
      const result = await getContentGroups();
      if (result.success && result.groups) {
        setGroups(result.groups);
      }
    } catch (error) {
      console.error('Failed to fetch groups:', error);
    } finally {
      setLoading(false);
    }
  };

  // 初回レンダリング時にグループ一覧を取得
  React.useEffect(() => {
    fetchGroups();
  }, []);

  // グループボタンをクリック
  const handleGroupClick = async () => {
    setShowGroupList(true);
    await fetchGroups();
  };

  // グループ選択
  const handleSelectGroup = (group: ContentGroup) => {
    onSelectGroup(group.id);
    setShowGroupList(false);
  };

  // グループ解除
  const handleClearGroup = () => {
    onSelectGroup(null);
  };

  // 選択されたグループ名を取得
  const selectedGroupName = selectedGroupId
    ? groups.find(g => g.id === selectedGroupId)?.name
    : null;

  return (
    <div className="flex items-center gap-1 md:gap-2 relative">
      <button
        onClick={handleGroupClick}
        className="py-1 px-1.5 md:px-2 bg-transparent border-none text-xs text-blue-700 cursor-pointer underline flex items-center gap-1"
      >
        <Pause size={12} className="sm:hidden" />
        <span className="hidden sm:inline">
          {selectedGroupName ? `🗂 ${selectedGroupName}` : 'グループ一括停止'}
        </span>
      </button>
      <button
        onClick={onEditGroup}
        className="py-1 px-1.5 md:px-2 bg-transparent border-none text-xs text-blue-700 cursor-pointer underline flex items-center gap-1"
      >
        <Pencil size={12} className="sm:hidden" />
        <span className="hidden sm:inline">グループを編集</span>
      </button>
      {selectedGroupId && (
        <button
          onClick={handleClearGroup}
          className="py-1 px-1.5 md:px-2 bg-transparent border-none text-xs text-blue-700 cursor-pointer underline flex items-center gap-1"
        >
          <X size={12} className="sm:hidden" />
          <span className="hidden sm:inline">解除</span>
        </button>
      )}

      {/* グループ一覧モーダル */}
      {showGroupList && (
        <>
          {/* 背景オーバーレイ */}
          <div 
            onClick={() => setShowGroupList(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1000
            }}
          />
          
          {/* モーダルコンテンツ */}
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: 1001,
            minWidth: '400px',
            maxWidth: '600px',
            maxHeight: '80vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* ヘッダー */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>グループを選択</h3>
              <button
                onClick={() => setShowGroupList(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#6b7280',
                  padding: '0',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* コンテンツ */}
            <div style={{
              flex: 1,
              overflow: 'auto',
              padding: '16px 20px'
            }}>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '20px', color: '#9ca3af' }}>
                  読み込み中...
                </div>
              ) : groups.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '20px', color: '#9ca3af' }}>
                  グループがありません
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {groups.map((group) => (
                    <button
                      key={group.id}
                      onClick={() => handleSelectGroup(group)}
                      style={{
                        padding: '12px 16px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        backgroundColor: '#fff',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s',
                        fontSize: '14px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f9fafb';
                        e.currentTarget.style.borderColor = '#3b82f6';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#fff';
                        e.currentTarget.style.borderColor = '#e5e7eb';
                      }}
                    >
                      <div style={{ fontWeight: '500', color: '#333' }}>{group.name}</div>
                      {group.description && (
                        <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>
                          {group.description}
                        </div>
                      )}
      </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GroupButtons;
