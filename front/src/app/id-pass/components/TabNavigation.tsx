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
          className={`py-3 px-3 md:px-6 border-none cursor-pointer text-xs md:text-sm transition-all whitespace-nowrap ${
            activeTab === tab.key
              ? 'bg-white text-blue-700 border-b-2 border-b-blue-700 font-medium'
              : 'bg-gray-50 text-gray-600 border-b-2 border-b-transparent font-normal hover:bg-gray-100'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;