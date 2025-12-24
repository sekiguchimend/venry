import React from 'react';
import { Trash2 } from 'lucide-react';

type Props = {
  index: number;
  postTitle: string;
  setPostTitle: (v: string) => void;
  normalTime: string;
  setNormalTime: (v: string) => void;
  normalPrice: string;
  setNormalPrice: (v: string) => void;
  couponTime: string;
  setCouponTime: (v: string) => void;
  couponPrice: string;
  setCouponPrice: (v: string) => void;
  conditions: string;
  setConditions: (v: string) => void;
};

const PostContentSection: React.FC<Props> = ({
  index,
  postTitle,
  setPostTitle,
  normalTime,
  setNormalTime,
  normalPrice,
  setNormalPrice,
  couponTime,
  setCouponTime,
  couponPrice,
  setCouponPrice,
  conditions,
  setConditions,
}) => {
  const handleClear = () => {
    setPostTitle('');
    setNormalTime('');
    setNormalPrice('');
    setCouponTime('');
    setCouponPrice('');
    setConditions('');
  };

  return (
    <div className="mb-8">
      {/* Post Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-black text-white rounded flex items-center justify-center font-bold text-base">
            {index}
          </div>
          <h3 className="text-base font-medium text-gray-800">{index}件目の投稿内容を設定</h3>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleClear}
            className="text-sm text-blue-600 hover:underline cursor-pointer bg-transparent border-none"
          >
            内容を消去
          </button>
          <button className="flex items-center gap-1 text-sm text-red-600 hover:underline cursor-pointer bg-transparent border-none">
            <Trash2 size={14} />
            枠を削除
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Title */}
        <div className="flex items-start gap-8">
          <div className="w-32 pt-2">
            <label className="text-sm text-gray-700 flex items-center gap-2">
              タイトル
              <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded">必須</span>
            </label>
          </div>
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                placeholder="新規割MAX3000円"
                maxLength={1000}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                {postTitle.length}/1000
              </span>
            </div>
          </div>
        </div>

        {/* Normal Price */}
        <div className="flex items-start gap-8">
          <div className="w-32 pt-2">
            <label className="text-sm text-gray-700 flex items-center gap-2">
              通常価格
              <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded">必須</span>
            </label>
          </div>
          <div className="flex-1 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={normalTime}
                onChange={(e) => setNormalTime(e.target.value)}
                placeholder="60"
                maxLength={1000}
                className="w-24 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 text-right"
              />
              <span className="text-sm text-gray-600">分</span>
              <span className="text-xs text-gray-400">{normalTime.length}/1000</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={normalPrice}
                onChange={(e) => setNormalPrice(e.target.value)}
                placeholder="16000"
                maxLength={1000}
                className="w-32 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 text-right"
              />
              <span className="text-sm text-gray-600">円</span>
              <span className="text-xs text-gray-400">{normalPrice.length}/1000</span>
            </div>
          </div>
        </div>

        {/* Coupon Price */}
        <div className="flex items-start gap-8">
          <div className="w-40 pt-2">
            <label className="text-sm text-gray-700 flex items-center gap-2">
              クーポン価格
              <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded">必須</span>
            </label>
          </div>
          <div className="flex-1 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={couponTime}
                onChange={(e) => setCouponTime(e.target.value)}
                placeholder="60"
                maxLength={1000}
                className="w-24 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 text-right"
              />
              <span className="text-sm text-gray-600">分</span>
              <span className="text-xs text-gray-400">{couponTime.length}/1000</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={couponPrice}
                onChange={(e) => setCouponPrice(e.target.value)}
                placeholder="13000"
                maxLength={1000}
                className="w-32 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 text-right"
              />
              <span className="text-sm text-gray-600">円</span>
              <span className="text-xs text-gray-400">{couponPrice.length}/1000</span>
            </div>
          </div>
        </div>

        {/* Conditions */}
        <div className="flex items-start gap-8">
          <div className="w-32 pt-2">
            <label className="text-sm text-gray-700">使用条件、有効期限など</label>
          </div>
          <div className="flex-1">
            <div className="relative">
              <textarea
                value={conditions}
                onChange={(e) => setConditions(e.target.value)}
                placeholder="受付時に新規割(HIMEチャンネル見た）とお申し付けください。&#10;※合算禁ありで適用、他の割引との併用不可、時間指定、本指名、のお客様は対象外"
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 resize-none"
              />
              <span className="absolute right-3 bottom-3 text-xs text-gray-400">{conditions.length}/∞</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostContentSection;


