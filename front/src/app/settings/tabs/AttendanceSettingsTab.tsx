'use client';

import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

const AttendanceSettingsTab: React.FC = () => {
  // 出勤更新時間の変換
  const [convertTime, setConvertTime] = useState(false);

  // 「未設定」更新時の設定
  const [deleteUnsetAttendance, setDeleteUnsetAttendance] = useState(false);

  // 更新・取り込み期間の設定
  const [importPeriod, setImportPeriod] = useState('2週間');

  // 出勤取り込み設定
  const [importHolidayAsUnset, setImportHolidayAsUnset] = useState(false);
  const [importUnsetAsHoliday, setImportUnsetAsHoliday] = useState(true);

  // 出勤表示設定
  const [showWeeklyFromMonday, setShowWeeklyFromMonday] = useState(true);

  // シティヘブンネット 出勤設定
  const [changeSortOrder, setChangeSortOrder] = useState(false);
  const [prioritizeComment, setPrioritizeComment] = useState(true);
  const [textInputMode, setTextInputMode] = useState<'noTime' | 'holiday' | 'unset'>('noTime');

  // 夜遊びガイド 出勤設定
  const [updateWithAccepted, setUpdateWithAccepted] = useState(false);

  return (
    <div className="p-8">
      <h1 className="text-lg font-bold text-gray-800 mb-6">出勤設定</h1>

      {/* 出勤更新設定 */}
      <div className="mb-8">
        <h2 className="text-base font-bold text-[#E53935] mb-4">出勤更新設定</h2>

        {/* 出勤更新時間の変換 */}
        <div className="pb-6 mb-6 border-b border-gray-100 pl-4">
          <h3 className="text-sm font-bold text-gray-700 mb-3">出勤更新時間の変換</h3>
          <label className="flex items-center gap-2 cursor-pointer mb-3">
            <input
              type="checkbox"
              checked={convertTime}
              onChange={(e) => setConvertTime(e.target.checked)}
              className="w-4 h-4 accent-[#2196F3]"
            />
            <span className="text-sm text-gray-600">
              出勤更新時に「翌0:00」を「23:59」に変換して更新する
            </span>
          </label>
          <a href="#" className="text-sm text-[#2196F3] hover:underline">対応サイト一覧</a>
        </div>

        {/* 「未設定」更新時の設定 */}
        <div className="pb-6 mb-6 border-b border-gray-100 pl-4">
          <h3 className="text-sm font-bold text-gray-700 mb-3">「未設定」更新時の設定</h3>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={deleteUnsetAttendance}
              onChange={(e) => setDeleteUnsetAttendance(e.target.checked)}
              className="w-4 h-4 accent-[#2196F3]"
            />
            <span className="text-sm text-gray-600">
              「未設定」の場合、サイト側の出勤情報を削除する
            </span>
          </label>
        </div>

        {/* 更新・取り込み期間の設定 */}
        <div className="pb-6 mb-6 border-b border-gray-100 pl-4">
          <h3 className="text-sm font-bold text-gray-700 mb-1">更新・取り込み期間の設定</h3>
          <p className="text-xs text-gray-400 mb-3">※対象媒体のみ</p>
          <select
            value={importPeriod}
            onChange={(e) => setImportPeriod(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded text-sm bg-white text-gray-700 outline-none mb-3"
          >
            <option value="1週間">1週間</option>
            <option value="2週間">2週間</option>
            <option value="3週間">3週間</option>
            <option value="4週間">4週間</option>
          </select>
          <div>
            <a href="#" className="text-sm text-[#2196F3] hover:underline">2週間対応サイト一覧</a>
          </div>
        </div>
      </div>

      {/* 出勤取り込み設定 */}
      <div className="pb-6 mb-6 border-b border-gray-100">
        <h2 className="text-base font-bold text-gray-800 mb-4">出勤取り込み設定</h2>
        <div className="space-y-3 pl-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={importHolidayAsUnset}
              onChange={(e) => setImportHolidayAsUnset(e.target.checked)}
              className="w-4 h-4 accent-[#2196F3]"
            />
            <span className="text-sm text-gray-600">休みを未設定で取り込む</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={importUnsetAsHoliday}
              onChange={(e) => setImportUnsetAsHoliday(e.target.checked)}
              className="w-4 h-4 accent-[#2196F3]"
            />
            <span className="text-sm text-gray-600">未設定を休みで取り込む</span>
          </label>
        </div>
      </div>

      {/* 出勤表示設定 */}
      <div className="pb-6 mb-6 border-b border-gray-100">
        <h2 className="text-base font-bold text-gray-800 mb-4">出勤表示設定</h2>
        <div className="pl-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showWeeklyFromMonday}
              onChange={(e) => setShowWeeklyFromMonday(e.target.checked)}
              className="w-4 h-4 accent-[#2196F3]"
            />
            <span className="text-sm text-gray-600">週間スケジュールを月曜はじまりで表示する</span>
          </label>
        </div>
      </div>

      {/* シティヘブンネット 出勤設定 */}
      <div className="pb-6 mb-6 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-base font-bold text-gray-800">シティヘブンネット 出勤設定</h2>
          <span className="px-2 py-1 bg-[#FFA726] text-white text-[11px] rounded">
            シティヘブンネットご利用の場合のみ有効
          </span>
        </div>
        <div className="space-y-3 pl-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={changeSortOrder}
              onChange={(e) => setChangeSortOrder(e.target.checked)}
              className="w-4 h-4 accent-[#2196F3]"
            />
            <span className="text-sm text-gray-600">女性の並び順変更時に出勤一覧の並び順も変更する</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={prioritizeComment}
              onChange={(e) => setPrioritizeComment(e.target.checked)}
              className="w-4 h-4 accent-[#2196F3]"
            />
            <span className="text-sm text-gray-600">コメント入力時、コメントを優先して更新する</span>
            <HelpCircle size={14} className="text-[#2196F3] cursor-pointer" />
          </label>
        </div>

        {/* ラジオボタンセクション */}
        <div className="mt-6 pl-4">
          <p className="text-sm text-gray-600 mb-4">
            出勤取り込み時にテキスト入力があり、休み以外のステータスを選択している場合
          </p>
          <div className="space-y-3 pl-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="textInputMode"
                checked={textInputMode === 'noTime'}
                onChange={() => setTextInputMode('noTime')}
                className="w-4 h-4 accent-[#2196F3]"
              />
              <span className="text-sm text-gray-600">時刻無し出勤で取り込む</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="textInputMode"
                checked={textInputMode === 'holiday'}
                onChange={() => setTextInputMode('holiday')}
                className="w-4 h-4 accent-[#2196F3]"
              />
              <span className="text-sm text-gray-600">休みで取り込む</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="textInputMode"
                checked={textInputMode === 'unset'}
                onChange={() => setTextInputMode('unset')}
                className="w-4 h-4 accent-[#2196F3]"
              />
              <span className="text-sm text-gray-600">未設定で取り込む</span>
            </label>
          </div>
        </div>
      </div>

      {/* 夜遊びガイド 出勤設定 */}
      <div className="pb-6">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-base font-bold text-gray-800">夜遊びガイド 出勤設定</h2>
          <HelpCircle size={14} className="text-[#2196F3] cursor-pointer" />
          <span className="px-2 py-1 bg-[#FFA726] text-white text-[11px] rounded">
            夜遊びガイドご利用の場合のみ有効
          </span>
        </div>
        <div className="pl-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={updateWithAccepted}
              onChange={(e) => setUpdateWithAccepted(e.target.checked)}
              className="w-4 h-4 accent-[#2196F3]"
            />
            <span className="text-sm text-gray-600">出勤更新時に「出勤[受付]」で更新する</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSettingsTab;
