'use client';

import React from 'react';
import { Edit, Clock } from 'lucide-react';
import { ContentItem } from '../../../types/content-update';

interface ContentRowProps {
  item: ContentItem;
}

const ContentRow: React.FC<ContentRowProps> = ({ item }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '60px 100px 20px 1fr 140px 100px 60px 60px',
      padding: '8px 16px',
      borderBottom: '1px solid #f0f0f0',
      minHeight: '50px',
      alignItems: 'center'
    }}>
      {/* Edit Button */}
      <div>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            padding: '3px 6px',
            backgroundColor: item.editButton.type === 'primary' ? '#1976d2' : 'transparent',
            color: item.editButton.type === 'primary' ? '#ffffff' : '#1976d2',
            border: 'none',
            borderRadius: '3px',
            fontSize: '10px',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          <Edit size={10} />
          {item.editButton.text}
        </button>
      </div>

      {/* Timer Section */}
      <div>
        <div style={{ fontSize: '10px', color: '#666', marginBottom: '1px' }}>次回</div>
        <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '1px' }}>
          {item.timer.nextTime}
        </div>
        <div style={{ fontSize: '10px', color: '#666' }}>({item.timer.date})</div>
      </div>

      {/* Timer Icon */}
      <div>
        <Clock size={16} style={{ color: item.timerIcon.color }} />
      </div>

      {/* Content Name */}
      <div style={{
        fontSize: '14px',
        color: '#333',
        fontWeight: '400'
      }}>
        {item.contentName}
      </div>

      {/* Last Updated */}
      <div style={{ textAlign: 'center' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3px',
          fontSize: '12px',
          color: '#1976d2',
          textDecoration: 'underline',
          cursor: 'pointer'
        }}>
          {item.lastUpdated.date}{item.lastUpdated.time}
          <Edit size={11} />
        </div>
      </div>

      {/* Category Tag */}
      <div style={{ textAlign: 'center' }}>
        <span style={{
          display: 'inline-block',
          padding: '3px 8px',
          backgroundColor: item.category.backgroundColor,
          color: '#666',
          fontSize: '11px',
          borderRadius: '10px',
          fontWeight: '500'
        }}>
          {item.category.label}
        </span>
      </div>

      {/* Priority Edit Icon */}
      <div style={{ textAlign: 'center' }}>
        <Edit size={13} style={{ color: '#666', cursor: 'pointer' }} />
      </div>

      {/* Memo Column (empty) */}
      <div style={{ textAlign: 'center' }}>
        {/* Empty */}
      </div>
    </div>
  );
};

export default ContentRow;