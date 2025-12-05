'use client';

import React, { useState, useTransition, useEffect, useMemo } from 'react';
import { saveCredential, deleteCredential } from '../actions/credentials';
import { getSiteByAutomationId } from '../utils/siteData';
import { SiteFlow } from '@/types/id-pass';

interface IdPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  siteId: string;
  siteName: string;
  siteAutomationId?: string;
  onSave: (loginId: string) => void;
  onUnregister: () => void;
  isRegistered: boolean;
  initialLoginId?: string;
  initialPassword?: string;
  initialFlowCodes?: string[];
}

interface FlowItem extends SiteFlow {
  checked: boolean;
}

const IdPassModal: React.FC<IdPassModalProps> = ({
  isOpen,
  onClose,
  siteId,
  siteName,
  siteAutomationId = '',
  onSave,
  onUnregister,
  isRegistered,
  initialLoginId = '',
  initialPassword = '',
  initialFlowCodes = [],
}) => {
  const [id, setId] = useState(initialLoginId);
  const [password, setPassword] = useState(initialPassword);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [flows, setFlows] = useState<FlowItem[]>([]);
  const [allChecked, setAllChecked] = useState(true);

  // initialFlowCodesを文字列化して比較用にメモ化
  const initialFlowCodesKey = useMemo(
    () => JSON.stringify(initialFlowCodes),
    [initialFlowCodes]
  );

  // モーダルが開くたびに初期値を更新
  useEffect(() => {
    if (isOpen) {
      setId(initialLoginId);
      setPassword(initialPassword);
      setError(null);

      // サイトのautomation_idからフロー一覧を取得
      const site = getSiteByAutomationId(siteAutomationId);
      const siteFlows = site?.flows || [];
      const flowItems: FlowItem[] = siteFlows.map((flow) => ({
        ...flow,
        // 初期値があればそれを使用、なければ全てチェック
        checked: initialFlowCodes.length > 0
          ? initialFlowCodes.includes(flow.code)
          : true,
      }));
      setFlows(flowItems);
      setAllChecked(flowItems.length > 0 && flowItems.every((f) => f.checked));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialLoginId, initialPassword, siteAutomationId, initialFlowCodesKey]);

  if (!isOpen) return null;

  const handleAllCheckChange = () => {
    const newValue = !allChecked;
    setAllChecked(newValue);
    setFlows(flows.map((item) => ({ ...item, checked: newValue })));
  };

  const handleItemCheckChange = (code: string) => {
    const newFlows = flows.map((item) =>
      item.code === code ? { ...item, checked: !item.checked } : item
    );
    setFlows(newFlows);
    setAllChecked(newFlows.every((item) => item.checked));
  };

  const handleSave = () => {
    if (!id.trim()) {
      setError('IDを入力してください');
      return;
    }
    if (!password.trim()) {
      setError('パスワードを入力してください');
      return;
    }

    // 選択されたフローコードを取得
    const selectedFlowCodes = flows
      .filter((f) => f.checked)
      .map((f) => f.code);

    if (selectedFlowCodes.length === 0) {
      setError('更新するコンテンツを1つ以上選択してください');
      return;
    }

    setError(null);

    startTransition(async () => {
      const result = await saveCredential(siteId, id, password, selectedFlowCodes);
      if (result.success) {
        onSave(id);
      } else {
        setError(result.message);
      }
    });
  };

  const handleUnregister = () => {
    startTransition(async () => {
      const result = await deleteCredential(siteId);
      if (result.success) {
        onUnregister();
      } else {
        setError(result.message);
      }
    });
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
                onClick={handleUnregister}
                disabled={isPending}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: isPending ? '#999' : '#e53935',
                  fontSize: '14px',
                  cursor: isPending ? 'not-allowed' : 'pointer',
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
          {/* Error Message */}
          {error && (
            <div
              style={{
                padding: '12px',
                marginBottom: '16px',
                backgroundColor: '#ffebee',
                borderRadius: '4px',
                color: '#c62828',
                fontSize: '14px',
              }}
            >
              {error}
            </div>
          )}

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
                    placeholder="ログインIDを入力"
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
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="パスワードを入力"
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

            {flows.length > 0 ? (
              <>
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
                </div>

                {/* Flow items */}
                {flows.map((item) => (
                  <div
                    key={item.code}
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
                        onChange={() => handleItemCheckChange(item.code)}
                        style={{ width: '18px', height: '18px', accentColor: '#1976d2' }}
                      />
                      <div>
                        <span style={{ fontSize: '14px', color: '#333' }}>{item.name}</span>
                        {item.isPaid && (
                          <span style={{
                            fontSize: '10px',
                            color: '#fff',
                            backgroundColor: '#ff9800',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            marginLeft: '8px'
                          }}>
                            有料
                          </span>
                        )}
                        {item.description && (
                          <span style={{ fontSize: '12px', color: '#999', marginLeft: '8px' }}>
                            {item.description}
                          </span>
                        )}
                      </div>
                    </label>
                  </div>
                ))}
              </>
            ) : (
              <div
                style={{
                  padding: '20px',
                  textAlign: 'center',
                  color: '#999',
                  fontSize: '14px',
                }}
              >
                このサイトには利用可能なフローがありません
              </div>
            )}
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
            disabled={isPending}
            style={{
              padding: '10px 32px',
              backgroundColor: '#f5f5f5',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: isPending ? 'not-allowed' : 'pointer',
              color: '#333',
            }}
          >
            キャンセル
          </button>
          <button
            onClick={handleSave}
            disabled={isPending}
            style={{
              padding: '10px 32px',
              backgroundColor: isPending ? '#a5d6a7' : '#4caf50',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: isPending ? 'not-allowed' : 'pointer',
              color: '#fff',
            }}
          >
            {isPending ? '保存中...' : '保存'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdPassModal;
