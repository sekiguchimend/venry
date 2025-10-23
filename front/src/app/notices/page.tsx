'use client';

import React from 'react';
import { BookOpen, User, Edit } from 'lucide-react';

const NoticePage: React.FC = () => {
  return (
    <div className="p-3 md:p-5 min-h-screen bg-gray-100 grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-5">
      {/* Left Column */}
      <div className="flex flex-col gap-3 md:gap-5">
        {/* フリーメモ */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex items-center gap-2">
            <span className="text-base font-medium text-gray-800">フリーメモ</span>
            <button className="py-1 px-2 bg-gray-100 border border-gray-200 rounded text-xs text-gray-600 cursor-pointer flex items-center gap-1">
              <Edit size={12} />
              編集
            </button>
          </div>
          <div className="p-4">
            <p className="text-sm leading-relaxed text-gray-800 m-0">
              左側メニューの下の方に「コンテンツ更新情報」という項目があるのでそちらからメッセージが分かっている時は更新情報や画像を通してあげて下さい
            </p>
          </div>
        </div>

        {/* ショートカット */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <span className="text-base font-medium text-gray-800">ショートカット</span>
          </div>
          <div className="p-4">
            {/* 出勤管理 */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-3 border-b border-gray-100 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                  <BookOpen size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800">出勤管理</div>
                  <div className="text-xs text-gray-600">オートシャクプロ新機能</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">65</div>
                  <div className="text-xs text-gray-600">人出勤中</div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button className="py-1.5 px-3 bg-gray-100 border border-gray-200 rounded text-xs text-gray-600 cursor-pointer">
                    出勤を追加
                  </button>
                  <button className="py-1.5 px-3 bg-gray-100 border border-gray-200 rounded text-xs text-gray-600 cursor-pointer">
                    更新・修験
                  </button>
                </div>
              </div>
            </div>

            {/* 女性管理 */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-3 border-b border-gray-100 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800">女性管理</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">282</div>
                  <div className="text-xs text-gray-600">人登録中</div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button className="py-1.5 px-3 bg-gray-100 border border-gray-200 rounded text-xs text-gray-600 cursor-pointer">
                    女性を追加
                  </button>
                  <button className="py-1.5 px-3 bg-gray-100 border border-gray-200 rounded text-xs text-gray-600 cursor-pointer">
                    更新・修験
                  </button>
                </div>
              </div>
            </div>

            {/* コンテンツ更新 */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-3 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                  <Edit size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800">コンテンツ更新</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">41</div>
                  <div className="text-xs text-gray-600">件実施中</div>
                </div>
                <button className="py-1.5 px-3 bg-gray-100 border border-gray-200 rounded text-xs text-gray-600 cursor-pointer">
                  更新・修験
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex flex-col gap-3 md:gap-5">
        {/* 重要なお知らせ */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <span className="text-base font-medium text-gray-800">重要なお知らせ</span>
            <button className="py-1 px-2 bg-transparent border-none text-xs text-blue-700 cursor-pointer underline">
              もっと見る
            </button>
          </div>
          <div className="p-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-1.5 shrink-0" />
                <div>
                  <div className="text-xs text-gray-600 mb-0.5">
                    08/13 18:30
                    <span className="bg-red-500 text-white py-0.5 px-1 rounded-sm text-[10px] ml-1">NEW</span>
                  </div>
                  <div className="text-sm text-gray-800">営業体制のお知らせ</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-1.5 shrink-0" />
                <div>
                  <div className="text-xs text-gray-600 mb-0.5">
                    08/13 18:23
                    <span className="bg-red-500 text-white py-0.5 px-1 rounded-sm text-[10px] ml-1">NEW</span>
                  </div>
                  <div className="text-sm text-gray-800">※復旧済※Mr.Venrey→不具合発生のご報告</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-1.5 shrink-0" />
                <div>
                  <div className="text-xs text-gray-600 mb-0.5">07/23 18:11</div>
                  <div className="text-sm text-gray-800">【仕様変更】オートシンクロ情報群の出動画面を一部変更しました。</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-1.5 shrink-0" />
                <div>
                  <div className="text-xs text-gray-600 mb-0.5">07/15 17:50</div>
                  <div className="text-sm text-gray-800">【仕様変更】オートシンクロ情報群の画面を一部変更しました。</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* お知らせ */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <span className="text-base font-medium text-gray-800">お知らせ</span>
            <button className="py-1 px-2 bg-transparent border-none text-xs text-blue-700 cursor-pointer underline">
              もっと見る
            </button>
          </div>
          <div className="p-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-1.5 shrink-0" />
                <div>
                  <div className="text-xs text-gray-600 mb-0.5 flex items-center gap-1">
                    08/12 17:36
                    <span className="bg-blue-500 text-white py-0.5 px-1 rounded-sm text-[10px]">修正</span>
                    <span className="bg-red-500 text-white py-0.5 px-1 rounded-sm text-[10px]">NEW</span>
                  </div>
                  <div className="text-sm text-gray-800">【修正】メンエスStyleの修正を行いました。</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-1.5 shrink-0" />
                <div>
                  <div className="text-xs text-gray-600 mb-0.5 flex items-center gap-1">
                    08/05 16:40
                    <span className="bg-blue-500 text-white py-0.5 px-1 rounded-sm text-[10px]">修正</span>
                    <span className="bg-red-500 text-white py-0.5 px-1 rounded-sm text-[10px]">NEW</span>
                  </div>
                  <div className="text-sm text-gray-800">【修正】ヤッちゃおう！の修正を行いました。</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-1.5 shrink-0" />
                <div>
                  <div className="text-xs text-gray-600 mb-0.5 flex items-center gap-1">
                    08/04 18:51
                    <span className="bg-green-500 text-white py-0.5 px-1 rounded-sm text-[10px]">新規追加</span>
                    <span className="bg-red-500 text-white py-0.5 px-1 rounded-sm text-[10px]">NEW</span>
                  </div>
                  <div className="text-sm text-gray-800">【コンテンツ追加】アンダーナビコンテンツを追加いたしました。</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-1.5 shrink-0" />
                <div>
                  <div className="text-xs text-gray-600 mb-0.5 flex items-center gap-1">
                    08/04 18:51
                    <span className="bg-blue-500 text-white py-0.5 px-1 rounded-sm text-[10px]">修正</span>
                    <span className="bg-red-500 text-white py-0.5 px-1 rounded-sm text-[10px]">NEW</span>
                  </div>
                  <div className="text-sm text-gray-800">【修正】アンダーナビの修正を行いました。</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-1.5 shrink-0" />
                <div>
                  <div className="text-xs text-gray-600 mb-0.5 flex items-center gap-1">
                    08/04 18:51
                    <span className="bg-orange-600 text-white py-0.5 px-1 rounded-sm text-[10px]">サイト取得停止</span>
                    <span className="bg-red-500 text-white py-0.5 px-1 rounded-sm text-[10px]">NEW</span>
                  </div>
                  <div className="text-sm text-gray-800">【サイト取得停止】夜遊びガイドの取得いを停止いたしました。</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-1.5 shrink-0" />
                <div>
                  <div className="text-xs text-gray-600 mb-0.5 flex items-center gap-1">
                    07/31 16:09
                    <span className="bg-orange-500 text-white py-0.5 px-1 rounded-sm text-[10px]">仕様変更</span>
                  </div>
                  <div className="text-sm text-gray-800">【仕様変更】インバウンド向けサイトの更新仕様を変更いたしました</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-1.5 shrink-0" />
                <div>
                  <div className="text-xs text-gray-600 mb-0.5 flex items-center gap-1">
                    07/29 15:58
                    <span className="bg-green-500 text-white py-0.5 px-1 rounded-sm text-[10px]">新規追加</span>
                  </div>
                  <div className="text-sm text-gray-800">【取致サイト追加】高級ソープTOP10ランキング/高級ソープ×ハーフエクト...</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-1.5 shrink-0" />
                <div>
                  <div className="text-xs text-gray-600 mb-0.5 flex items-center gap-1">
                    07/24 15:48
                    <span className="bg-blue-500 text-white py-0.5 px-1 rounded-sm text-[10px]">修正</span>
                  </div>
                  <div className="text-sm text-gray-800">【修正】風俗じゃぱん！の修正を行いました。</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticePage;
