import React from 'react';
import { Site } from '../../../types/id-pass';

interface SiteRowProps {
  site: Site;
}

const SiteRow: React.FC<SiteRowProps> = ({ site }) => {
  const actionLabels = ['有', '無', '次', '女', '出'];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 120px 80px',
        padding: '12px 16px',
        borderBottom: '1px solid #f0f0f0',
        alignItems: 'center',
        transition: 'background-color 0.2s ease'
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
    >
      {/* Site Name and Registration Button */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <button
          style={{
            padding: '6px 12px',
            backgroundColor: '#4caf50',
            color: '#ffffff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4caf50'}
        >
          + 登録
        </button>
        <span style={{
          fontSize: '14px',
          color: '#333',
          fontWeight: '400'
        }}>
          {site.name}
        </span>
      </div>

      {/* Action Buttons (Gray Outline) */}
      <div style={{
        display: 'flex',
        gap: '4px',
        justifyContent: 'center'
      }}>
        {actionLabels.map((label) => (
          <button
            key={label}
            style={{
              width: '20px',
              height: '20px',
              border: '1px solid #d0d0d0',
              borderRadius: '3px',
              backgroundColor: '#ffffff',
              fontSize: '10px',
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

      {/* Empty memo column */}
      <div style={{
        textAlign: 'center'
      }}>
        {/* Empty for memo */}
      </div>
    </div>
  );
};

export default SiteRow;