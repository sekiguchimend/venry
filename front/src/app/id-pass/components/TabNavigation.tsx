import React from 'react';
import { TabKey, TabItem } from '../../../types/id-pass';

interface TabNavigationProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  tabs: TabItem[];
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div style={{
      display: 'flex',
      borderBottom: '1px solid #e0e0e0'
    }}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          style={{
            padding: '12px 24px',
            border: 'none',
            backgroundColor: activeTab === tab.key ? '#ffffff' : '#f5f5f5',
            color: activeTab === tab.key ? '#1976d2' : '#666',
            borderBottom: activeTab === tab.key ? '2px solid #1976d2' : '2px solid transparent',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: activeTab === tab.key ? '500' : '400',
            transition: 'all 0.2s ease'
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;