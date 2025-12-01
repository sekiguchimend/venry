import React from 'react';
import { TabKey, TabItem } from '../../../types/id-pass';

interface TabNavigationProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  tabs: TabItem[];
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className="flex border-b border-gray-200 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`py-4 px-4 md:px-6 border-0 bg-white cursor-pointer text-xs md:text-sm transition-all whitespace-nowrap flex-shrink-0 relative ${
            activeTab === tab.key
              ? 'text-blue-700 font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-blue-700'
              : 'text-gray-600 font-normal'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;