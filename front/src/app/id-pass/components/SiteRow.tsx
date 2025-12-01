'use client';

import React, { useState } from 'react';
import { Edit } from 'lucide-react';
import { Site, TabKey } from '../../../types/id-pass';
import IdPassModal from './IdPassModal';

interface SiteRowProps {
  site: Site;
  isRegistered: boolean;
  onRegister: (siteId: number) => void;
  onUnregister: (siteId: number) => void;
  activeTab: TabKey;
}

const SiteRow: React.FC<SiteRowProps> = ({ site, isRegistered, onRegister, onUnregister, activeTab }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const actionLabels = ['有', '無', '次', '女', '出'];

  const handleSave = () => {
    onRegister(site.id);
    setIsModalOpen(false);
  };

  const handleUnregister = () => {
    onUnregister(site.id);
    setIsModalOpen(false);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 140px auto 1fr',
        padding: '12px 16px',
        borderBottom: '1px solid #f0f0f0',
        alignItems: 'center',
        transition: 'background-color 0.2s ease'
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
    >
      {/* Site Name and Registration/Edit Button */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        {activeTab === 'registered' ? (
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              padding: '6px 12px',
              backgroundColor: '#ffffff',
              color: '#3b82f6',
              border: 'none',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#3b82f6';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.color = '#3b82f6';
            }}
          >
            <Edit size={12} />
            編集
          </button>
        ) : (
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              padding: '6px 12px',
              backgroundColor: '#ffffff',
              color: '#4caf50',
              border: 'none',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#4caf50';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.color = '#4caf50';
            }}
          >
            + 登録
          </button>
        )}
        <span style={{
          fontSize: '14px',
          color: '#333',
          fontWeight: '400'
        }}>
          {site.name}
        </span>
      </div>

      {/* Action Buttons (Gray Outline) - ステータスの真下 */}
      <div style={{
        display: 'flex',
        gap: '2px',
        justifyContent: 'flex-start'
      }}>
        {actionLabels.map((label) => (
          <button
            key={label}
            style={{
              width: '18px',
              height: '18px',
              border: '1px solid #d0d0d0',
              borderRadius: '3px',
              backgroundColor: '#ffffff',
              fontSize: '9px',
              color: '#666',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f5f5f5';
              e.currentTarget.style.borderColor = '#b0b0b0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.borderColor = '#d0d0d0';
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Memo column */}
      <div style={{ marginLeft: '8px' }}>
        {/* Memo content here */}
      </div>

      {/* Empty spacer */}
      <div></div>

      {/* Modal */}
      <IdPassModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        siteName={site.name}
        onSave={handleSave}
        onUnregister={handleUnregister}
        isRegistered={isRegistered}
      />
    </div>
  );
};

export default SiteRow;