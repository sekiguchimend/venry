'use client';

import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { getTemplates, type Template } from '../actions/templates';
import { createTemplateGroup, updateTemplateGroup, getTemplateGroups, getTemplateGroupItems } from '../actions/template-groups';

interface TemplateGroupCreateTabProps {
  editingGroupId?: string | null;
  onGroupCreated?: () => void;
}

const TemplateGroupCreateTab: React.FC<TemplateGroupCreateTabProps> = ({ editingGroupId, onGroupCreated }) => {
  const [groupName, setGroupName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [hideGroupSettings, setHideGroupSettings] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingGroup, setIsLoadingGroup] = useState(false);

  const isEditing = !!editingGroupId;

  // テンプレート一覧を取得
  useEffect(() => {
    const fetchTemplates = async () => {
      setIsLoading(true);
      try {
        const data = await getTemplates();
        setTemplates(data);
      } catch (error) {
        console.error('Failed to fetch templates:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTemplates();
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
        const groupsResult = await getTemplateGroups();
        if (groupsResult.success && groupsResult.groups) {
          const group = groupsResult.groups.find(g => g.id === editingGroupId);
          if (group) {
            setGroupName(group.name);
          }
        }

        // グループアイテムを取得
        const itemsResult = await getTemplateGroupItems(editingGroupId);
        if (itemsResult.success && itemsResult.items) {
          // グループアイテムのtemplate_idを選択状態に設定
          const selectedIds = itemsResult.items.map(item => item.template_id);
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

  // 検索フィルター
  const filteredTemplates = templates.filter((template) => {
    if (!searchTerm.trim()) return true;
    return template.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleCheckboxChange = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredTemplates.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredTemplates.map(item => item.id));
    }
  };

  const getSelectedTemplates = () => {
    return templates.filter(item => selectedItems.includes(item.id));
  };

  // グループ作成/更新ハンドラー
  const handleSaveGroup = async () => {
    // バリデーション
    if (!groupName.trim()) {
      alert('グループ名を入力してください');
      return;
    }

    if (selectedItems.length === 0) {
      alert('テンプレートを少なくとも1つ選択してください');
      return;
    }

    setIsCreating(true);

    try {
      let result;
      if (isEditing && editingGroupId) {
        // グループを更新
        result = await updateTemplateGroup(editingGroupId, groupName, selectedItems);
        if (result.success) {
          alert('グループを更新しました');
          onGroupCreated?.();
        } else {
          alert(`グループの更新に失敗しました: ${result.error || '不明なエラー'}`);
        }
      } else {
        // グループを作成
        result = await createTemplateGroup(groupName, selectedItems);
        if (result.success) {
          alert('グループを作成しました');
          // リセット
          setGroupName('');
          setSelectedItems([]);
          // 親コンポーネントに通知してグループ一覧を更新
          onGroupCreated?.();
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

  if (isLoading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>
        読み込み中...
      </div>
    );
  }

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
            placeholder="例:イベント用テンプレート"
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
        {/* Left Panel - Template List */}
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
                placeholder="テンプレート名で検索"
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
            gridTemplateColumns: '40px 1fr 80px 80px',
            padding: '12px 16px',
            backgroundColor: '#f9fafb',
            borderBottom: '1px solid #e5e7eb',
            fontSize: '12px',
            color: '#6b7280'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <input
                type="checkbox"
                checked={selectedItems.length === filteredTemplates.length && filteredTemplates.length > 0}
                onChange={handleSelectAll}
                style={{ width: '14px', height: '14px' }}
              />
            </div>
            <div>テンプレート名</div>
            <div style={{ textAlign: 'center' }}>ラベル</div>
            <div style={{ textAlign: 'center' }}>設定数</div>
          </div>

          {/* Template List */}
          <div style={{ flex: 1, overflow: 'auto' }}>
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '40px 1fr 80px 80px',
                  padding: '12px 16px',
                  borderBottom: '1px solid #f3f4f6',
                  alignItems: 'center',
                  backgroundColor: selectedItems.includes(template.id) ? '#eff6ff' : '#fff'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(template.id)}
                    onChange={() => handleCheckboxChange(template.id)}
                    style={{ width: '14px', height: '14px' }}
                  />
                </div>
                <div style={{ fontSize: '13px', color: '#333' }}>{template.name}</div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {template.label && (
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      color: '#22c55e',
                      border: '1px solid #22c55e',
                      backgroundColor: '#fff'
                    }}>
                      {template.label}
                    </span>
                  )}
                </div>
                <div style={{ textAlign: 'center', fontSize: '13px', color: '#3b82f6', textDecoration: 'underline', cursor: 'pointer' }}>
                  0
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Selected Templates */}
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
              現在{selectedItems.length}テンプレート選択済
            </div>
            <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>
              ドラッグでテンプレートを並び替えることができます
            </div>
          </div>

          {/* Right Panel Table Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 80px 80px',
            padding: '12px 16px',
            borderBottom: '1px solid #e5e7eb',
            fontSize: '12px',
            color: '#6b7280'
          }}>
            <div>テンプレート名</div>
            <div style={{ textAlign: 'center' }}>ラベル</div>
            <div style={{ textAlign: 'center' }}>設定数</div>
          </div>

          {/* Selected Template List */}
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
                左側のリストからテンプレートを選択してください
              </div>
            ) : (
              getSelectedTemplates().map((template) => (
                <div
                  key={template.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 80px 80px',
                    padding: '12px 16px',
                    borderBottom: '1px solid #e5e7eb',
                    alignItems: 'center',
                    backgroundColor: '#fff'
                  }}
                >
                  <div style={{ fontSize: '13px', color: '#333' }}>{template.name}</div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {template.label && (
                      <span style={{
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        color: '#22c55e',
                        border: '1px solid #22c55e'
                      }}>
                        {template.label}
                      </span>
                    )}
                  </div>
                  <div style={{ textAlign: 'center', fontSize: '12px', color: '#333' }}>0</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateGroupCreateTab;
