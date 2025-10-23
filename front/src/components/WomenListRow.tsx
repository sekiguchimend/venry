'use client';

import React from 'react';
import { Edit } from 'lucide-react';
import { WomanItem } from '../types/women-list';

interface WomenListRowProps {
  item: WomanItem;
}

const WomenListRow: React.FC<WomenListRowProps> = ({ item }) => {
  return (
    <div className="grid grid-cols-[60px_100px_60px_1fr_80px_120px_80px] py-2 px-4 border-b border-gray-100 items-center min-h-[70px]">
      {/* Edit Button */}
      <div>
        <button className="flex items-center gap-0.5 py-0.5 px-1.5 bg-transparent text-blue-700 border-none rounded text-[11px] font-medium cursor-pointer">
          <Edit size={11} />
          編集
        </button>
      </div>

      {/* Profile Image */}
      <div className="flex justify-start items-center">
        <div
          className="w-[60px] h-[50px] bg-gray-100 rounded relative bg-cover bg-center"
          style={{
            backgroundImage: `url(${item.profileImage})`
          }}
        >
          {/* Number badges */}
          <div className="absolute bottom-0.5 left-0.5 flex gap-0.5">
            <div className="bg-gray-800 text-white text-[8px] py-0.5 px-0.5 rounded-sm font-bold">
              白5
            </div>
            <div className="bg-gray-800 text-white text-[8px] py-0.5 px-0.5 rounded-sm font-bold">
              色7
            </div>
          </div>
        </div>
      </div>

      {/* Age */}
      <div className="flex flex-col items-center justify-center">
        <div className="text-[13px] text-gray-800 font-normal">
          {item.age}
        </div>
      </div>

      {/* Name, Newcomer status and Measurements */}
      <div className="text-[13px] text-gray-800 pl-2">
        <div className="mb-1 flex items-center gap-2">
          <span className="text-[13px] font-medium text-gray-800">
            {item.name}
          </span>
          {item.isNewcomer && (
            <span className="inline-flex items-center justify-center py-0.5 px-1.5 bg-gray-200 rounded-sm text-[10px] text-gray-600">
              新人
            </span>
          )}
        </div>
        <div className="text-xs text-gray-600">
          T.{item.measurements.height}
        </div>
        <div className="text-xs text-gray-600">
          B.{item.measurements.bust} (C) W.{item.measurements.waist} H.{item.measurements.hip}
        </div>
      </div>

      {/* Registration Date */}
      <div className="text-[13px] text-gray-800 text-center">
        {item.registrationDate}
      </div>

      {/* Public Status */}
      <div className="flex justify-center items-center">
        <div
          className={`flex items-center border rounded-full py-1 px-3 text-[11px] ${
            item.isPublic
              ? 'bg-blue-50 border-blue-500 text-blue-700'
              : 'bg-gray-50 border-gray-200 text-gray-600'
          }`}
        >
          <div
            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
              item.isPublic ? 'bg-blue-500' : 'bg-gray-400'
            }`}
          ></div>
          公開中
        </div>
      </div>

      {/* Memo Column */}
      <div className="text-center">
        {/* Empty for memos */}
      </div>
    </div>
  );
};

export default WomenListRow;
