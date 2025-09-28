'use client';

import React from 'react';
import { HelpCircle, Mail, Phone, Clock, MessageSquare } from 'lucide-react';

const SupportPage: React.FC = () => {
  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <HelpCircle size={24} style={{ marginRight: '12px', color: '#1976d2' }} />
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#333', margin: 0 }}>
            Mr.Venreyサポート
          </h1>
        </div>
        <p style={{ color: '#666', fontSize: '16px', margin: 0 }}>
          ご不明な点やお困りのことがございましたら、お気軽にお問い合わせください。
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
        {/* サポート時間 */}
        <div style={{
          backgroundColor: '#fff',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <Clock size={20} style={{ marginRight: '8px', color: '#1976d2' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', margin: 0 }}>
              サポート時間
            </h3>
          </div>
          <div style={{ color: '#666', lineHeight: '1.6' }}>
            <p style={{ margin: '8px 0' }}>平日: 9:00 - 18:00</p>
            <p style={{ margin: '8px 0' }}>土日祝: 10:00 - 17:00</p>
            <p style={{ margin: '8px 0', fontSize: '14px', color: '#999' }}>
              ※年末年始は休業いたします
            </p>
          </div>
        </div>

        {/* 電話サポート */}
        <div style={{
          backgroundColor: '#fff',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <Phone size={20} style={{ marginRight: '8px', color: '#1976d2' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', margin: 0 }}>
              電話サポート
            </h3>
          </div>
          <div style={{ color: '#666', lineHeight: '1.6' }}>
            <p style={{ margin: '8px 0', fontSize: '18px', fontWeight: '600', color: '#333' }}>
              03-1234-5678
            </p>
            <p style={{ margin: '8px 0', fontSize: '14px' }}>
              緊急時や急を要するお問い合わせの場合は、お電話でご連絡ください。
            </p>
          </div>
        </div>

        {/* メールサポート */}
        <div style={{
          backgroundColor: '#fff',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <Mail size={20} style={{ marginRight: '8px', color: '#1976d2' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', margin: 0 }}>
              メールサポート
            </h3>
          </div>
          <div style={{ color: '#666', lineHeight: '1.6' }}>
            <p style={{ margin: '8px 0', fontSize: '16px', fontWeight: '600', color: '#333' }}>
              support@mrvenrey.com
            </p>
            <p style={{ margin: '8px 0', fontSize: '14px' }}>
              24時間受付。通常1営業日以内にご返信いたします。
            </p>
          </div>
        </div>
      </div>

      {/* よくある質問 */}
      <div style={{ marginTop: '48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
          <MessageSquare size={24} style={{ marginRight: '12px', color: '#1976d2' }} />
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', margin: 0 }}>
            よくある質問
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
            <div key={index} style={{
              backgroundColor: '#fff',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                Q. {faq.question}
              </h3>
              <p style={{ fontSize: '14px', color: '#666', margin: 0, lineHeight: '1.6' }}>
                A. {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* お問い合わせフォーム */}
      <div style={{ marginTop: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '24px' }}>
          お問い合わせフォーム
        </h2>

        <div style={{
          backgroundColor: '#fff',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                お名前 <span style={{ color: '#f44336' }}>*</span>
              </label>
              <input
                type="text"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
                placeholder="お名前を入力してください"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                メールアドレス <span style={{ color: '#f44336' }}>*</span>
              </label>
              <input
                type="email"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
                placeholder="example@domain.com"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                お問い合わせ内容 <span style={{ color: '#f44336' }}>*</span>
              </label>
              <textarea
                rows={6}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  resize: 'vertical'
                }}
                placeholder="お問い合わせ内容を詳しくご記入ください"
              />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: '#1976d2',
                color: 'white',
                padding: '12px 32px',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                alignSelf: 'flex-start'
              }}
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