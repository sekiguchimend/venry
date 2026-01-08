'use client';

import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { getFlowItemsByPage } from '../utils/flowUtils';
import { FlowItem } from '../../../types/content-update';
import { createContentGroup, getContentId, getContentGroupItems, getContentGroups, updateContentGroup } from '../actions/content-groups';

interface GroupCreateTabProps {
  editingGroupId?: string | null;
  onGroupUpdated?: () => void;
}

const GroupCreateTab: React.FC<GroupCreateTabProps> = ({ editingGroupId, onGroupUpdated }) => {
  const [groupName, setGroupName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [hideGroupSettings, setHideGroupSettings] = useState(false);
  const [contentItems, setContentItems] = useState<FlowItem[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoadingGroup, setIsLoadingGroup] = useState(false);

  const isEditing = !!editingGroupId;

  // コンテンツリストを取得
  useEffect(() => {
    const items = getFlowItemsByPage('content-list');
    setContentItems(items);
  }, []);

  // 編集モード時にグループ情報を取得
  useEffect(() => {
    const loadGroupData = async () => {
      if (!editingGroupId) {
        setGroupName('');
        setSelectedItems([]);
        return;
      }

      setIsLoadingGroup(true);
      try {
        // グループ情報を取得
        const groupsResult = await getContentGroups();
        if (groupsResult.success && groupsResult.groups) {
          const group = groupsResult.groups.find(g => g.id === editingGroupId);
          if (group) {
            setGroupName(group.name);
          }
        }

        // グループアイテムを取得
        const itemsResult = await getContentGroupItems(editingGroupId);
        if (itemsResult.success && itemsResult.items) {
          // グループアイテムのsite_id + content_nameからFlowItemを探してselectedItemsに設定
          const allItems = getFlowItemsByPage('content-list');
          const selectedIds: string[] = [];

          for (const groupItem of itemsResult.items) {
            // automation_idとcontent_nameでマッチング
            const matchingItem = allItems.find(item =>
              item.siteId === groupItem.automation_id &&
              item.flowName === groupItem.content_name
            );
            if (matchingItem) {
              selectedIds.push(matchingItem.id);
            }
          }

          setSelectedItems(selectedIds);
        }
      } catch (error) {
        console.error('Failed to load group data:', error);
      } finally {
        setIsLoadingGroup(false);
      }
    };

    loadGroupData();
  }, [editingGroupId]);

  const handleCheckboxChange = (id: string) => {
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

  // グループ作成/更新ハンドラー
  const handleSaveGroup = async () => {
    // バリデーション
    if (!groupName.trim()) {
      alert('グループ名を入力してください');
      return;
    }

    if (selectedItems.length === 0) {
      alert('コンテンツを少なくとも1つ選択してください');
      return;
    }

    setIsCreating(true);

    try {
      // 選択されたコンテンツからコンテンツIDを取得
      const selectedFlowItems = contentItems.filter(item => selectedItems.includes(item.id));

      // コンテンツIDを取得（server actionを使用）
      const contentIds: string[] = [];

      for (const flowItem of selectedFlowItems) {
        try {
          const result = await getContentId(
            flowItem.siteId,
            flowItem.flowCode,
            flowItem.flowName
          );

          if (result.id) {
            contentIds.push(result.id);
          }
        } catch (error) {
          console.error('Failed to get content ID:', error);
        }
      }

      if (contentIds.length === 0) {
        alert('コンテンツIDの取得に失敗しました');
        setIsCreating(false);
        return;
      }

      let result;
      if (isEditing && editingGroupId) {
        // グループを更新
        result = await updateContentGroup(editingGroupId, groupName, contentIds);
        if (result.success) {
          alert('グループを更新しました');
          onGroupUpdated?.();
        } else {
          alert(`グループの更新に失敗しました: ${result.error || '不明なエラー'}`);
        }
      } else {
        // グループを作成
        result = await createContentGroup(groupName, contentIds);
        if (result.success) {
          alert('グループを作成しました');
          // リセット
          setGroupName('');
          setSelectedItems([]);
          onGroupUpdated?.();
        } else {
          alert(`グループの作成に失敗しました: ${result.error || '不明なエラー'}`);
        }
      }
    } catch (error) {
      console.error('Failed to save group:', error);
      alert(isEditing ? 'グループの更新に失敗しました' : 'グループの作成に失敗しました');
    } finally {
      setIsCreating(false);
    }
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
          onClick={handleSaveGroup}
          disabled={isCreating || isLoadingGroup || !groupName.trim() || selectedItems.length === 0}
          style={{
            padding: '8px 24px',
            backgroundColor: isCreating || isLoadingGroup || !groupName.trim() || selectedItems.length === 0 ? '#9ca3af' : '#3b82f6',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            color: '#fff',
            cursor: isCreating || isLoadingGroup || !groupName.trim() || selectedItems.length === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          {isCreating ? (isEditing ? '更新中...' : '作成中...') : (isEditing ? 'グループを更新' : 'グループを作成')}
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
                <div style={{ fontSize: '13px', color: '#333' }}>{item.flowName}</div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#666',
                    backgroundColor: item.category.backgroundColor
                  }}>
                    {item.category.label}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {/* 上位アイコンは今は表示しない */}
                </div>
                <div style={{ textAlign: 'center', fontSize: '13px', color: '#333' }}>-</div>
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
                  <div style={{ fontSize: '13px', color: '#333' }}>{item.flowName}</div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <span style={{
                      padding: '2px 6px',
                      borderRadius: '8px',
                      fontSize: '10px',
                      color: '#666',
                      backgroundColor: item.category.backgroundColor
                    }}>
                      {item.category.label}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {/* 上位アイコンは今は表示しない */}
                  </div>
                  <div style={{ textAlign: 'center', fontSize: '12px', color: '#333' }}>-</div>
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
