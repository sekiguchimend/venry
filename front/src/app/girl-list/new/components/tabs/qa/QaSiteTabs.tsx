'use client';

import React from 'react';
import type { QaSiteTabId } from './types';

export function QaSiteTabs({
  tabs,
  active,
  onChange,
}: {
  tabs: { id: QaSiteTabId; label: string }[];
  active: QaSiteTabId;
  onChange: (id: QaSiteTabId) => void;
}) {
  return (
    <div className="border-b border-gray-200">
      <div className="flex overflow-x-auto">
        {tabs.map((t) => {
          const isActive = t.id === active;
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={[
                'whitespace-nowrap px-6 py-3 text-sm border-b-2 transition-colors',
                isActive
                  ? 'border-blue-500 text-gray-900 font-semibold bg-white'
                  : 'border-transparent text-gray-600 hover:text-gray-900 bg-white',
              ].join(' ')}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}


