'use client';

import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, X } from 'lucide-react';

const STATUS_LEGEND = [
  { label: '有', description: '有料プランがあるサイト' },
  { label: '無', description: '無料プランがあるサイト' },
  { label: '求', description: '求人サイト' },
  { label: '女', description: '女性更新に対応しているサイト' },
  { label: '出', description: '出勤更新に対応しているサイト' },
];

const TableHeader: React.FC = () => {
  const [showLegend, setShowLegend] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowLegend(false);
      }
    };

    if (showLegend) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLegend]);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 140px auto 1fr',
      padding: '12px 16px',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #e0e0e0',
      fontSize: '12px',
      fontWeight: '500',
      color: '#666'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        サイト名
        <div style={{
          width: '0',
          height: '0',
          borderLeft: '4px solid transparent',
          borderRight: '4px solid transparent',
          borderTop: '4px solid #666'
        }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', position: 'relative' }}>
        ステータス
        <button
          ref={buttonRef}
          onClick={() => setShowLegend(!showLegend)}
          style={{
            background: 'none',
            border: 'none',
            padding: '0',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <HelpCircle size={14} color="#3b82f6" />
        </button>

        {/* Legend Popover */}
        {showLegend && (
          <div
            ref={popoverRef}
            style={{
              position: 'absolute',
              top: '100%',
              left: '0',
              marginTop: '8px',
              backgroundColor: '#fff',
              borderRadius: '8px',
              padding: '24px 32px',
              minWidth: '320px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
              zIndex: 1000
            }}
          >
            <button
              onClick={() => setShowLegend(false)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={18} color="#333" />
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {STATUS_LEGEND.map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '2px solid #93c5fd',
                    backgroundColor: '#eff6ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#3b82f6',
                    flexShrink: 0
                  }}>
                    {item.label}
                  </div>
                  <span style={{ fontSize: '16px', color: '#333', whiteSpace: 'nowrap' }}>
                    {item.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '8px' }}>
        メモ
        <div style={{
          width: '0',
          height: '0',
          borderLeft: '4px solid transparent',
          borderRight: '4px solid transparent',
          borderTop: '4px solid #666'
        }} />
      </div>
      <div></div>
    </div>
  );
};

export default TableHeader;