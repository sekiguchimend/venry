'use client';

import React from 'react';
import { HelpCircle, Mail, Phone, Clock, MessageSquare } from 'lucide-react';

const SupportPage: React.FC = () => {
  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <HelpCircle size={24} className="mr-3 text-blue-700" />
          <h1 className="text-3xl font-bold text-gray-800 m-0">
            Mr.Venreyサポート
          </h1>
        </div>
        <p className="text-gray-600 text-base m-0">
          ご不明な点やお困りのことがございましたら、お気軽にお問い合わせください。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* サポート時間 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <Clock size={20} className="mr-2 text-blue-700" />
            <h3 className="text-lg font-semibold text-gray-800 m-0">
              サポート時間
            </h3>
          </div>
          <div className="text-gray-600 leading-relaxed">
            <p className="my-2">平日: 9:00 - 18:00</p>
            <p className="my-2">土日祝: 10:00 - 17:00</p>
            <p className="my-2 text-sm text-gray-400">
              ※年末年始は休業いたします
            </p>
          </div>
        </div>

        {/* 電話サポート */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <Phone size={20} className="mr-2 text-blue-700" />
            <h3 className="text-lg font-semibold text-gray-800 m-0">
              電話サポート
            </h3>
          </div>
          <div className="text-gray-600 leading-relaxed">
            <p className="my-2 text-lg font-semibold text-gray-800">
              03-1234-5678
            </p>
            <p className="my-2 text-sm">
              緊急時や急を要するお問い合わせの場合は、お電話でご連絡ください。
            </p>
          </div>
        </div>

        {/* メールサポート */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <Mail size={20} className="mr-2 text-blue-700" />
            <h3 className="text-lg font-semibold text-gray-800 m-0">
              メールサポート
            </h3>
          </div>
          <div className="text-gray-600 leading-relaxed">
            <p className="my-2 text-base font-semibold text-gray-800">
              support@mrvenrey.com
            </p>
            <p className="my-2 text-sm">
              24時間受付。通常1営業日以内にご返信いたします。
            </p>
          </div>
        </div>
      </div>

      {/* よくある質問 */}
      <div className="mt-12">
        <div className="flex items-center mb-6">
          <MessageSquare size={24} className="mr-3 text-blue-700" />
          <h2 className="text-2xl font-bold text-gray-800 m-0">
            よくある質問
          </h2>
        </div>

        <div className="flex flex-col gap-3 md:gap-4">
          {[
            {
              question: 'パスワードを忘れてしまいました',
              answer: 'ログイン画面の「パスワードを忘れた方」リンクから、パスワードの再設定を行ってください。'
            },
            {
              question: '写真のアップロードができません',
              answer: 'ファイルサイズが10MB以下で、JPEGまたはPNG形式であることをご確認ください。問題が解決しない場合は、ブラウザのキャッシュをクリアしてお試しください。'
            },
            {
              question: 'スケジュールの変更はいつまで可能ですか？',
              answer: '当日の2時間前まで変更が可能です。それ以降の変更については、お電話でのお問い合わせをお願いいたします。'
            },
            {
              question: 'システムメンテナンスの予定はありますか？',
              answer: '定期メンテナンスは月1回、第3日曜日の深夜2:00-6:00に実施しております。詳細はお知らせページでご確認ください。'
            }
          ].map((faq, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
              <h3 className="text-base font-semibold text-gray-800 mb-2">
                Q. {faq.question}
              </h3>
              <p className="text-sm text-gray-600 m-0 leading-relaxed">
                A. {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* お問い合わせフォーム */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          お問い合わせフォーム
        </h2>

        <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 shadow-sm">
          <form className="flex flex-col gap-4 md:gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                お名前 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full py-3 px-3 border border-gray-300 rounded text-sm box-border"
                placeholder="お名前を入力してください"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                メールアドレス <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="w-full py-3 px-3 border border-gray-300 rounded text-sm box-border"
                placeholder="example@domain.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                お問い合わせ内容 <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={6}
                className="w-full py-3 px-3 border border-gray-300 rounded text-sm box-border resize-y"
                placeholder="お問い合わせ内容を詳しくご記入ください"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-700 text-white py-3 px-8 border-none rounded text-base font-semibold cursor-pointer self-start"
            >
              送信する
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
