'use client';

import React, { useState } from 'react';
import { Settings, BarChart3, Users, Zap, FileText } from 'lucide-react';

// Tab Components
import BasicSettingsTab from './tabs/BasicSettingsTab';
import AttendanceSettingsTab from './tabs/AttendanceSettingsTab';
import FemaleSettingsTab from './tabs/FemaleSettingsTab';
import ImmediateUpdateTab from './tabs/ImmediateUpdateTab';
import OtherSettingsTab from './tabs/OtherSettingsTab';

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  hasRequired?: boolean;
}

const TABS: TabItem[] = [
  { id: 'basic', label: '基本設定', icon: <Settings size={16} />, hasRequired: true },
  { id: 'attendance', label: '出勤設定', icon: <BarChart3 size={16} /> },
  { id: 'female', label: '女性設定', icon: <Users size={16} /> },
  { id: 'immediate', label: '即姫・接客一括更新', icon: <Zap size={16} /> },
  { id: 'other', label: 'その他', icon: <FileText size={16} /> },
];

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('basic');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicSettingsTab />;
      case 'attendance':
        return <AttendanceSettingsTab />;
      case 'female':
        return <FemaleSettingsTab />;
      case 'immediate':
        return <ImmediateUpdateTab />;
      case 'other':
        return <OtherSettingsTab />;
      default:
        return <BasicSettingsTab />;
    }
  };

  return (
    <div className="min-h-[calc(100vh-48px)] bg-[#f5f5f5] p-4 md:p-5">
      <div className="flex bg-white border border-gray-200 rounded min-h-[calc(100vh-88px)]">
        {/* Left Sidebar - Settings Menu */}
        <div className="w-[200px] border-r border-gray-200 flex-shrink-0">
          <div className="px-4 py-3 border-b border-gray-100">
            <span className="text-xs text-gray-400">設定メニュー</span>
          </div>
          <nav className="py-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors border-none cursor-pointer relative ${
                  activeTab === tab.id
                    ? 'bg-[#2196F3] text-white'
                    : 'bg-transparent text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={activeTab === tab.id ? 'text-white' : 'text-gray-400'}>
                    {tab.icon}
                  </span>
                  <span className="text-[13px]">{tab.label}</span>
                </div>
                {tab.hasRequired && (
                  <span className="px-1.5 py-0.5 bg-[#FF5722] text-white text-[10px] rounded">
                    必須
                  </span>
                )}
                {activeTab === tab.id && (
                  <div className="absolute right-0 top-0 bottom-0 w-[3px] bg-[#1565C0]" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto">
            {renderTabContent()}
          </div>

          {/* Fixed Footer with Save Button */}
          <div className="border-t border-gray-200 bg-white px-8 py-4 flex justify-center">
            <button
              onClick={() => console.log('Settings saved')}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#4CAF50] text-white rounded text-sm font-medium hover:bg-[#43A047] transition-colors cursor-pointer border-none"
            >
              <Settings size={16} />
              設定を保存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
