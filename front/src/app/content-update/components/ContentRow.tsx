'use client';

import React from 'react';
import { Edit, Clock } from 'lucide-react';
import { ContentItem } from '../../../types/content-update';

interface ContentRowProps {
  item: ContentItem;
}

const ContentRow: React.FC<ContentRowProps> = ({ item }) => {
  return (
    <div>
      {/* Desktop Layout */}
      <div className="hidden md:grid grid-cols-[60px_100px_20px_1fr_140px_100px_60px_60px] py-2 px-4 border-b border-gray-100 min-h-[50px] items-center">
        {/* Edit Button */}
        <div>
          <button
            className={`flex items-center gap-0.5 py-0.5 px-1.5 border-none rounded text-xs font-medium cursor-pointer ${
              item.editButton.type === 'primary'
                ? 'bg-blue-700 text-white'
                : 'bg-transparent text-blue-700'
            }`}
          >
            <Edit size={10} />
            {item.editButton.text}
          </button>
        </div>

        {/* Timer Section */}
        <div>
          <div className="text-xs text-gray-600 mb-px">次回</div>
          <div className="text-sm font-bold text-gray-800 mb-px">
            {item.timer.nextTime}
          </div>
          <div className="text-xs text-gray-600">({item.timer.date})</div>
        </div>

        {/* Timer Icon */}
        <div>
          <Clock size={16} style={{ color: item.timerIcon.color }} />
        </div>

        {/* Content Name */}
        <div className="text-sm text-gray-800 font-normal">
          {item.contentName}
        </div>

        {/* Last Updated */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-0.5 text-xs text-blue-700 underline cursor-pointer">
            {item.lastUpdated.date}{item.lastUpdated.time}
            <Edit size={11} />
          </div>
        </div>

        {/* Category Tag */}
        <div className="text-center">
          <span
            className="inline-block py-0.5 px-2 text-gray-600 text-xs rounded-lg font-medium"
            style={{ backgroundColor: item.category.backgroundColor }}
          >
            {item.category.label}
          </span>
        </div>

        {/* Priority Edit Icon */}
        <div className="text-center">
          <Edit size={13} className="text-gray-600 cursor-pointer" />
        </div>

        {/* Memo Column (empty) */}
        <div className="text-center">
          {/* Empty */}
        </div>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden p-4 border-b border-gray-100 bg-white">
        <div className="flex items-start gap-3">
          {/* Timer Icon and Info */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Clock size={16} style={{ color: item.timerIcon.color }} />
            <div className="text-center">
              <div className="text-xs text-gray-600">次回</div>
              <div className="text-sm font-bold text-gray-800">
                {item.timer.nextTime}
              </div>
              <div className="text-xs text-gray-600">
                {item.timer.date}
              </div>
            </div>
          </div>

          {/* Content Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="text-sm text-gray-800 font-normal flex-1 pr-2">
                {item.contentName}
              </div>
              <button
                className={`flex items-center gap-1 py-1 px-2 border-none rounded text-xs font-medium cursor-pointer flex-shrink-0 ${
                  item.editButton.type === 'primary'
                    ? 'bg-blue-700 text-white'
                    : 'bg-transparent text-blue-700'
                }`}
              >
                <Edit size={12} />
                {item.editButton.text}
              </button>
            </div>

            {/* Bottom Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="inline-block py-1 px-2 text-gray-600 text-xs rounded-lg font-medium"
                  style={{ backgroundColor: item.category.backgroundColor }}
                >
                  {item.category.label}
                </span>
                <div className="flex items-center gap-1 text-xs text-blue-700 underline cursor-pointer">
                  {item.lastUpdated.date} {item.lastUpdated.time}
                  <Edit size={10} />
                </div>
              </div>
              <Edit size={14} className="text-gray-600 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentRow;
