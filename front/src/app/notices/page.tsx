'use client';

import React, { useState } from 'react';
import { BookOpen, User, Edit } from 'lucide-react';

const NoticePage: React.FC = () => {
  return (
    <div style={{
      padding: '20px',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px'
    }}>
      {/* Left Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* フリーメモ */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '16px',
            borderBottom: '1px solid #e0e0e0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ fontSize: '16px', fontWeight: '500', color: '#333' }}>フリーメモ</span>
            <button style={{
              padding: '4px 8px',
              backgroundColor: '#f5f5f5',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              fontSize: '12px',
              color: '#666',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <Edit size={12} />
              編集
            </button>
          </div>
          <div style={{ padding: '16px' }}>
            <p style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: '#333',
              margin: 0
            }}>
              左側メニューの下の方に「コンテンツ更新情報」という項目があるのでそちらからメッセージが分かっている時は更新情報や画像を通してあげて下さい
            </p>
          </div>
        </div>

        {/* ショートカット */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '16px',
            borderBottom: '1px solid #e0e0e0'
          }}>
            <span style={{ fontSize: '16px', fontWeight: '500', color: '#333' }}>ショートカット</span>
          </div>
          <div style={{ padding: '16px' }}>
            {/* 出勤管理 */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 0',
              borderBottom: '1px solid #f0f0f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#4caf50',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <BookOpen size={16} style={{ color: '#ffffff' }} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>出勤管理</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>オートシャクプロ新機能</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>65</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>人出勤中</div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{
                    padding: '6px 12px',
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px',
                    fontSize: '12px',
                    color: '#666',
                    cursor: 'pointer'
                  }}>
                    出勤を追加
                  </button>
                  <button style={{
                    padding: '6px 12px',
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px',
                    fontSize: '12px',
                    color: '#666',
                    cursor: 'pointer'
                  }}>
                    更新・修験
                  </button>
                </div>
              </div>
            </div>

            {/* 女性管理 */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 0',
              borderBottom: '1px solid #f0f0f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#f44336',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <User size={16} style={{ color: '#ffffff' }} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>女性管理</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>282</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>人登録中</div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{
                    padding: '6px 12px',
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px',
                    fontSize: '12px',
                    color: '#666',
                    cursor: 'pointer'
                  }}>
                    女性を追加
                  </button>
                  <button style={{
                    padding: '6px 12px',
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px',
                    fontSize: '12px',
                    color: '#666',
                    cursor: 'pointer'
                  }}>
                    更新・修験
                  </button>
                </div>
              </div>
            </div>

            {/* コンテンツ更新 */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#2196f3',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Edit size={16} style={{ color: '#ffffff' }} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>コンテンツ更新</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>41</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>件実施中</div>
                </div>
                <button style={{
                  padding: '6px 12px',
                  backgroundColor: '#f5f5f5',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: '#666',
                  cursor: 'pointer'
                }}>
                  更新・修験
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* 重要なお知らせ */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '16px',
            borderBottom: '1px solid #e0e0e0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span style={{ fontSize: '16px', fontWeight: '500', color: '#333' }}>重要なお知らせ</span>
            <button style={{
              padding: '4px 8px',
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '12px',
              color: '#1976d2',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}>
              もっと見る
            </button>
          </div>
          <div style={{ padding: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  backgroundColor: '#666',
                  borderRadius: '50%',
                  marginTop: '6px',
                  flexShrink: 0
                }} />
                <div>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '2px' }}>
                    08/13 18:30
                    <span style={{
                      backgroundColor: '#f44336',
                      color: '#ffffff',
                      padding: '1px 4px',
                      borderRadius: '2px',
                      fontSize: '10px',
                      marginLeft: '4px'
                    }}>NEW</span>
                  </div>
                  <div style={{ fontSize: '14px', color: '#333' }}>営業体制のお知らせ</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  backgroundColor: '#666',
                  borderRadius: '50%',
                  marginTop: '6px',
                  flexShrink: 0
                }} />
                <div>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '2px' }}>
                    08/13 18:23
                    <span style={{
                      backgroundColor: '#f44336',
                      color: '#ffffff',
                      padding: '1px 4px',
                      borderRadius: '2px',
                      fontSize: '10px',
                      marginLeft: '4px'
                    }}>NEW</span>
                  </div>
                  <div style={{ fontSize: '14px', color: '#333' }}>※復旧済※Mr.Venrey→不具合発生のご報告</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  backgroundColor: '#666',
                  borderRadius: '50%',
                  marginTop: '6px',
                  flexShrink: 0
                }} />
                <div>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '2px' }}>07/23 18:11</div>
                  <div style={{ fontSize: '14px', color: '#333' }}>【仕様変更】オートシンクロ情報群の出動画面を一部変更しました。</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  backgroundColor: '#666',
                  borderRadius: '50%',
                  marginTop: '6px',
                  flexShrink: 0
                }} />
                <div>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '2px' }}>07/15 17:50</div>
                  <div style={{ fontSize: '14px', color: '#333' }}>【仕様変更】オートシンクロ情報群の画面を一部変更しました。</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* お知らせ */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '16px',
            borderBottom: '1px solid #e0e0e0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span style={{ fontSize: '16px', fontWeight: '500', color: '#333' }}>お知らせ</span>
            <button style={{
              padding: '4px 8px',
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '12px',
              color: '#1976d2',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}>
              もっと見る
            </button>
          </div>
          <div style={{ padding: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  backgroundColor: '#666',
                  borderRadius: '50%',
                  marginTop: '6px',
                  flexShrink: 0
                }} />
                <div>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    08/12 17:36
                    <span style={{
                      backgroundColor: '#2196f3',
                      color: '#ffffff',
                      padding: '1px 4px',
                      borderRadius: '2px',
                      fontSize: '10px'
                    }}>修正</span>
                    <span style={{
                      backgroundColor: '#f44336',
                      color: '#ffffff',
                      padding: '1px 4px',
                      borderRadius: '2px',
                      fontSize: '10px'
                    }}>NEW</span>
                  </div>
                  <div style={{ fontSize: '14px', color: '#333' }}>【修正】メンエスStyleの修正を行いました。</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  backgroundColor: '#666',
                  borderRadius: '50%',
                  marginTop: '6px',
                  flexShrink: 0
                }} />
                <div>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    08/05 16:40
                    <span style={{
                      backgroundColor: '#2196f3',
                      color: '#ffffff',
                      padding: '1px 4px',
                      borderRadius: '2px',
                      fontSize: '10px'
                    }}>修正</span>
                    <span style={{
                      backgroundColor: '#f44336',
                      color: '#ffffff',
                      padding: '1px 4px',
                      borderRadius: '2px',
                      fontSize: '10px'
                    }}>NEW</span>
                  </div>
                  <div style={{ fontSize: '14px', color: '#333' }}>【修正】ヤッちゃおう！の修正を行いました。</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  backgroundColor: '#666',
                  borderRadius: '50%',
                  marginTop: '6px',
                  flexShrink: 0
                }} />
                <div>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    08/04 18:51
                    <span style={{
                      backgroundColor: '#4caf50',
                      color: '#ffffff',
                      padding: '1px 4px',
                      borderRadius: '2px',
                      fontSize: '10px'
                    }}>新規追加</span>
                    <span style={{
                      backgroundColor: '#f44336',
                      color: '#ffffff',
                      padding: '1px 4px',
                      borderRadius: '2px',
                      fontSize: '10px'
                    }}>NEW</span>
                  </div>
                  <div style={{ fontSize: '14px', color: '#333' }}>【コンテンツ追加】アンダーナビコンテンツを追加いたしました。</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  backgroundColor: '#666',
                  borderRadius: '50%',
                  marginTop: '6px',
                  flexShrink: 0
                }} />
                <div>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    08/04 18:51
                    <span style={{
                      backgroundColor: '#2196f3',
                      color: '#ffffff',
                      padding: '1px 4px',
                      borderRadius: '2px',
                      fontSize: '10px'
                    }}>修正</span>
                    <span style={{
                      backgroundColor: '#f44336',
                      color: '#ffffff',
                      padding: '1px 4px',
                      borderRadius: '2px',
                      fontSize: '10px'
                    }}>NEW</span>
                  </div>
                  <div style={{ fontSize: '14px', color: '#333' }}>【修正】アンダーナビの修正を行いました。</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  backgroundColor: '#666',
                  borderRadius: '50%',
                  marginTop: '6px',
                  flexShrink: 0
                }} />
                <div>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    08/04 18:51
                    <span style={{
                      backgroundColor: '#ff5722',
                      color: '#ffffff',
                      padding: '1px 4px',
                      borderRadius: '2px',
                      fontSize: '10px'
                    }}>サイト取得停止</span>
                    <span style={{
                      backgroundColor: '#f44336',
                      color: '#ffffff',
                      padding: '1px 4px',
                      borderRadius: '2px',
                      fontSize: '10px'
                    }}>NEW</span>
                  </div>
                  <div style={{ fontSize: '14px', color: '#333' }}>【サイト取得停止】夜遊びガイドの取得いを停止いたしました。</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  backgroundColor: '#666',
                  borderRadius: '50%',
                  marginTop: '6px',
                  flexShrink: 0
                }} />
                <div>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    07/31 16:09
                    <span style={{
                      backgroundColor: '#ff9800',
                      color: '#ffffff',
                      padding: '1px 4px',
                      borderRadius: '2px',
                      fontSize: '10px'
                    }}>仕様変更</span>
                  </div>
                  <div style={{ fontSize: '14px', color: '#333' }}>【仕様変更】インバウンド向けサイトの更新仕様を変更いたしました</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  backgroundColor: '#666',
                  borderRadius: '50%',
                  marginTop: '6px',
                  flexShrink: 0
                }} />
                <div>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    07/29 15:58
                    <span style={{
                      backgroundColor: '#4caf50',
                      color: '#ffffff',
                      padding: '1px 4px',
                      borderRadius: '2px',
                      fontSize: '10px'
                    }}>新規追加</span>
                  </div>
                  <div style={{ fontSize: '14px', color: '#333' }}>【取致サイト追加】高級ソープTOP10ランキング/高級ソープ×ハーフエクト...</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  backgroundColor: '#666',
                  borderRadius: '50%',
                  marginTop: '6px',
                  flexShrink: 0
                }} />
                <div>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    07/24 15:48
                    <span style={{
                      backgroundColor: '#2196f3',
                      color: '#ffffff',
                      padding: '1px 4px',
                      borderRadius: '2px',
                      fontSize: '10px'
                    }}>修正</span>
                  </div>
                  <div style={{ fontSize: '14px', color: '#333' }}>【修正】風俗じゃぱん！の修正を行いました。</div>
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