'use client';

import React, { useState } from 'react';

interface IdPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  siteName: string;
  onSave: () => void;
  onUnregister: () => void;
  isRegistered: boolean;
}

interface ContentItem {
  id: number;
  name: string;
  checked: boolean;
  hasLink?: boolean;
}

const IdPassModal: React.FC<IdPassModalProps> = ({ isOpen, onClose, siteName, onSave, onUnregister, isRegistered }) => {
  const [id, setId] = useState('himechannel7+S2154@gmail.com');
  const [password, setPassword] = useState('dcphoteheru');
  const [contents, setContents] = useState<ContentItem[]>([
    { id: 1, name: `${siteName}(店舗投稿)`, checked: true, hasLink: true },
    { id: 2, name: `${siteName}(クーポン)`, checked: true },
    { id: 3, name: `${siteName}(今すぐ遊べる)【一括更新専用】`, checked: true },
  ]);
  const [allChecked, setAllChecked] = useState(true);

  if (!isOpen) return null;

  const handleAllCheckChange = () => {
    const newValue = !allChecked;
    setAllChecked(newValue);
    setContents(contents.map(item => ({ ...item, checked: newValue })));
  };

  const handleItemCheckChange = (itemId: number) => {
    const newContents = contents.map(item =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    );
    setContents(newContents);
    setAllChecked(newContents.every(item => item.checked));
  };

  const handleSave = () => {
    onSave();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          width: '100%',
          maxWidth: '550px',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            padding: '16px 20px',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <div>
            <div style={{ fontSize: '16px', fontWeight: '500', color: '#333' }}>
              ID・PASS設定
            </div>
            <div style={{ fontSize: '14px', color: '#666', marginTop: '2px' }}>
              {siteName}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {isRegistered && (
              <button
                onClick={onUnregister}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#e53935',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: '16px' }}>🗑</span>
                登録解除
              </button>
            )}
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#666',
                padding: '4px',
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '20px' }}>
          {/* STEP1 */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span
                style={{
                  backgroundColor: '#323232',
                  color: '#fff',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '600',
                }}
              >
                STEP1
              </span>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>
                ログイン情報を設定
              </span>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                  <label style={{ width: '50px', fontSize: '14px', color: '#333' }}>ID</label>
                  <input
                    type="text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '10px 12px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px',
                    }}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <label style={{ width: '50px', fontSize: '14px', color: '#333' }}>PASS</label>
                  <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '10px 12px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px',
                    }}
                  />
                </div>
              </div>
              <button
                style={{
                  padding: '10px 16px',
                  backgroundColor: '#fff',
                  border: '1px solid #1976d2',
                  borderRadius: '4px',
                  color: '#1976d2',
                  fontSize: '14px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span style={{ color: '#1976d2' }}>○</span>
                認証OK
              </button>
            </div>

            <div style={{ marginTop: '12px' }}>
              <a
                href="#"
                style={{
                  color: '#1976d2',
                  fontSize: '13px',
                  textDecoration: 'underline',
                }}
              >
                前回使用したID・PASSを反映する
              </a>
            </div>
          </div>

          {/* STEP2 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span
                style={{
                  backgroundColor: '#323232',
                  color: '#fff',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '600',
                }}
              >
                STEP2
              </span>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>
                更新するコンテンツを選択
              </span>
            </div>

            {/* Header row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 0',
                borderBottom: '1px solid #e0e0e0',
              }}
            >
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                <input
                  type="checkbox"
                  checked={allChecked}
                  onChange={handleAllCheckChange}
                  style={{ width: '18px', height: '18px', accentColor: '#1976d2' }}
                />
                <span style={{ fontSize: '14px', color: '#666' }}>コンテンツ名</span>
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#666', fontSize: '13px' }}>
                上位
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: '#1976d2',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                >
                  ?
                </span>
              </div>
            </div>

            {/* Content items */}
            {contents.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '14px 0',
                  borderBottom: '1px solid #f0f0f0',
                }}
              >
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleItemCheckChange(item.id)}
                    style={{ width: '18px', height: '18px', accentColor: '#1976d2' }}
                  />
                  <span style={{ fontSize: '14px', color: '#333' }}>{item.name}</span>
                </label>
                {item.hasLink && (
                  <span style={{ color: '#1976d2', fontSize: '16px', cursor: 'pointer' }}>↗</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            padding: '16px 20px',
            borderTop: '1px solid #e0e0e0',
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: '10px 32px',
              backgroundColor: '#f5f5f5',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer',
              color: '#333',
            }}
          >
            キャンセル
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: '10px 32px',
              backgroundColor: '#4caf50',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer',
              color: '#fff',
            }}
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdPassModal;
