'use client';

import React, { useState, useEffect } from 'react';
import { Search, Edit, Plus } from 'lucide-react';

const TemplatePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('template-list');
  const [searchTerm, setSearchTerm] = useState('');

  const templates = [
    {
      no: 1,
      image: '/images/template1.png',
      name: '5月くじイベント',
      hasWoman: false,
      hasNotice: false,
      hasMemo: false
    },
    {
      no: 2,
      image: '/images/template2.png',
      name: '【SUPER RALLY】※使用不可！使用時は要確集！',
      hasWoman: false,
      hasNotice: false,
      hasMemo: false
    },
    {
      no: 3,
      image: '/images/template3.png',
      name: 'スーパータイム割！※使用不可！使用時は要確集！',
      hasWoman: false,
      hasNotice: false,
      hasMemo: false
    }
  ];

  return (
    <div style={{
      padding: '20px',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      {/* Header Button Section */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px'
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
            gap: '4px',
            transition: 'background-color 0.2s ease'
          }}
        >
          <Plus size={16} />
          新規登録
        </button>

        <div style={{
          fontSize: '14px',
          color: '#666'
        }}>
          <a href="#" style={{ color: '#1976d2', textDecoration: 'underline' }}>グループ型配信</a>
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
          <button
            onClick={() => setActiveTab('template-list')}
            style={{
              padding: '12px 24px',
              border: 'none',
              backgroundColor: '#ffffff',
              color: activeTab === 'template-list' ? '#1976d2' : '#666',
              borderBottom: activeTab === 'template-list' ? '3px solid #1976d2' : '3px solid transparent',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: activeTab === 'template-list' ? '500' : '400',
              transition: 'all 0.2s ease'
            }}
          >
            テンプレート一覧
          </button>
          <button
            onClick={() => setActiveTab('regularly-used-folder')}
            style={{
              padding: '12px 24px',
              border: 'none',
              backgroundColor: '#ffffff',
              color: activeTab === 'regularly-used-folder' ? '#1976d2' : '#666',
              borderBottom: activeTab === 'regularly-used-folder' ? '3px solid #1976d2' : '3px solid transparent',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: activeTab === 'regularly-used-folder' ? '500' : '400',
              transition: 'all 0.2s ease'
            }}
          >
            定期用中フォルダ
          </button>
          <button
            onClick={() => setActiveTab('usage-disabled')}
            style={{
              padding: '12px 24px',
              border: 'none',
              backgroundColor: '#ffffff',
              color: activeTab === 'usage-disabled' ? '#1976d2' : '#666',
              borderBottom: activeTab === 'usage-disabled' ? '3px solid #1976d2' : '3px solid transparent',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: activeTab === 'usage-disabled' ? '500' : '400',
              transition: 'all 0.2s ease'
            }}
          >
            の要確集・使用不可
          </button>
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

        {/* Search Bar and Actions Row */}
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
              placeholder="テンプレート名で検索"
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

          {/* Action Links */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <a href="#" style={{
              fontSize: '14px',
              color: '#1976d2',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              🔄 テンプレート並び替え
            </a>
            <a href="#" style={{
              fontSize: '14px',
              color: '#1976d2',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              📁 選択削除
            </a>
            <div style={{
              fontSize: '14px',
              color: '#666'
            }}>
              登録件数29/上限400件
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '50px 40px 80px 1fr 100px 100px 80px',
          padding: '12px 16px',
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #e0e0e0',
          fontSize: '12px',
          fontWeight: '400',
          color: '#666',
          alignItems: 'center'
        }}>
          <div></div>
          <div style={{ textAlign: 'center' }}>No.</div>
          <div style={{ textAlign: 'center' }}>画像</div>
          <div style={{ paddingLeft: '8px' }}>テンプレート名</div>
          <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
            女性
            <div style={{
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              backgroundColor: '#2196f3',
              color: '#ffffff',
              fontSize: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold'
            }}>
              ?
            </div>
          </div>
          <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
            ラベル
            <div style={{
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              backgroundColor: '#2196f3',
              color: '#ffffff',
              fontSize: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold'
            }}>
              ?
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>メモ</div>
        </div>

        {/* Content Rows */}
        {templates.map((template) => (
          <div key={template.no} style={{
            display: 'grid',
            gridTemplateColumns: '50px 40px 80px 1fr 100px 100px 80px',
            padding: '8px 16px',
            borderBottom: '1px solid #f0f0f0',
            alignItems: 'center',
            minHeight: '60px'
          }}>
            {/* Edit Button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                  padding: '2px 6px',
                  backgroundColor: 'transparent',
                  color: '#1976d2',
                  border: 'none',
                  borderRadius: '2px',
                  fontSize: '11px',
                  cursor: 'pointer',
                  fontWeight: '400'
                }}
              >
                <Edit size={11} />
                編集
              </button>
            </div>

            {/* Number */}
            <div style={{ textAlign: 'center', fontSize: '13px', color: '#333' }}>
              {template.no}
            </div>

            {/* Image */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '40px',
                backgroundColor: '#e0e0e0',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {template.no === 1 && (
                  <div style={{
                    backgroundColor: '#666',
                    color: '#fff',
                    padding: '2px 4px',
                    borderRadius: '2px',
                    fontSize: '9px'
                  }}>
                    画像
                  </div>
                )}
                {template.no === 2 && (
                  <div style={{
                    backgroundColor: '#ffd700',
                    color: '#333',
                    padding: '2px 4px',
                    borderRadius: '2px',
                    fontSize: '8px',
                    fontWeight: 'bold'
                  }}>
                    SUPER
                  </div>
                )}
                {template.no === 3 && (
                  <div style={{
                    backgroundColor: '#ff6b6b',
                    color: '#fff',
                    padding: '2px 4px',
                    borderRadius: '2px',
                    fontSize: '9px'
                  }}>
                    タイム
                  </div>
                )}
              </div>
            </div>

            {/* Template Name */}
            <div style={{
              fontSize: '13px',
              color: '#333',
              paddingLeft: '8px',
              fontWeight: '400'
            }}>
              {template.name}
            </div>

            {/* Woman Column */}
            <div style={{ textAlign: 'center' }}>
              {/* Empty for now */}
            </div>

            {/* Label Column */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {template.no === 1 && (
                <button style={{
                  padding: '2px 8px',
                  backgroundColor: 'transparent',
                  border: '1px solid #e0e0e0',
                  borderRadius: '2px',
                  fontSize: '11px',
                  color: '#666',
                  cursor: 'pointer'
                }}>
                  イベント
                </button>
              )}
            </div>

            {/* Memo Column */}
            <div style={{ textAlign: 'center' }}>
              {/* Empty */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatePage;