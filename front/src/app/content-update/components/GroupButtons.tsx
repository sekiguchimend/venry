'use client';

import React from 'react';

const GroupButtons: React.FC = () => {
  return (
    <div className="flex items-center gap-1 md:gap-2">
      <button className="py-1 px-1.5 md:px-2 bg-transparent border-none text-xs text-blue-700 cursor-pointer underline">
        <span className="hidden sm:inline">🗂 グループ</span>
        <span className="sm:hidden">🗂</span>
      </button>
      <button className="py-1 px-1.5 md:px-2 bg-transparent border-none text-xs text-blue-700 cursor-pointer underline">
        <span className="hidden sm:inline">🗂 解除</span>
        <span className="sm:hidden">❌</span>
      </button>
    </div>
  );
};

export default GroupButtons;
