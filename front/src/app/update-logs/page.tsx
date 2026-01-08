'use client';

import React, { useState, useEffect } from 'react';
import { RefreshCw, AlertTriangle, FileText, Users, UserPlus, Trash2, ArrowUpDown, CheckCircle, Clock, XCircle } from 'lucide-react';

interface UpdateLog {
  id: string;
  company_id: string;
  update_type: string;
  target_id?: string;
  title?: string;
  girl_id?: string;
  girl_name?: string;
  label?: string;
  status: 'success' | 'failed' | 'pending' | 'deleted';
  error_message?: string;
  created_at: string;
}

type TabKey = 'all' | 'content-update' | 'female-update' | 'male-update' | 'delete-update' | 'replace-update';

const UpdateLogsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [logs, setLogs] = useState<UpdateLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<UpdateLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  // タブ定義
  const tabs = [
    { key: 'all' as TabKey, label: '更新結果', Icon: FileText },
    { key: 'content-update' as TabKey, label: 'コンテンツ更新結果', Icon: FileText },
    { key: 'female-update' as TabKey, label: '女性更新結果', Icon: Users },
    { key: 'male-update' as TabKey, label: '男性求人更新結果', Icon: UserPlus },
    { key: 'delete-update' as TabKey, label: '削除更新結果', Icon: Trash2 },
    { key: 'replace-update' as TabKey, label: '並び替え更新結果', Icon: ArrowUpDown },
  ];

  // ログを取得
  const fetchLogs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const url = `/api/update-history?date=${selectedDate}`;
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}${url}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setLogs(data || []);
      } else {
        console.error('Failed to fetch logs');
        setLogs([]);
      }
    } catch (error) {
      console.error('Error fetching logs:', error);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  // 初回ロード
  useEffect(() => {
    fetchLogs();
  }, [selectedDate]);

  // タブによるフィルタリング
  useEffect(() => {
    if (activeTab === 'all') {
      setFilteredLogs(logs);
    } else {
      setFilteredLogs(logs.filter(log => log.update_type === activeTab));
    }
  }, [activeTab, logs]);

  // ステータスアイコン
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="text-green-600" size={16} />;
      case 'failed':
        return <XCircle className="text-red-600" size={16} />;
      case 'pending':
        return <Clock className="text-yellow-600" size={16} />;
      case 'deleted':
        return <Trash2 className="text-gray-600" size={16} />;
      default:
        return null;
    }
  };

  // ステータステキスト
  const getStatusText = (status: string) => {
    switch (status) {
      case 'success':
        return '成功';
      case 'failed':
        return '失敗';
      case 'pending':
        return '処理中';
      case 'deleted':
        return '削除済み';
      default:
        return status;
    }
  };

  // 時刻フォーマット
  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="p-3 md:p-5 min-h-screen bg-gray-100">
      {/* ヘッダー */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between mb-5 gap-3">
        <h1 className="text-base md:text-lg font-medium text-gray-700">コンテンツ更新結果</h1>
        
        <div className="flex items-center gap-3">
          {/* 日付選択 */}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="py-2 px-3 border border-gray-200 rounded text-sm"
          />
          
          {/* 更新ボタン */}
          <button
            onClick={fetchLogs}
            disabled={loading}
            className="py-2 px-4 bg-blue-600 text-white rounded text-sm flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            <span className="hidden sm:inline">更新</span>
          </button>
        </div>
      </div>

      {/* メインコンテンツカード */}
      <div className="bg-white border border-gray-200 rounded overflow-hidden">
        {/* サイドバータブ */}
        <div className="flex border-b border-gray-200">
          {/* 左サイドバー */}
          <div className="w-48 md:w-64 border-r border-gray-200 bg-gray-50">
            {tabs.map((tab) => {
              const IconComponent = tab.Icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`w-full py-3 px-4 text-left text-sm transition-colors border-l-4 flex items-center gap-2 ${
                    activeTab === tab.key
                      ? 'bg-blue-50 border-blue-600 text-blue-700 font-medium'
                      : 'border-transparent text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <IconComponent size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* 右コンテンツエリア */}
          <div className="flex-1">
            {/* 検索バー */}
            <div className="p-4 border-b border-gray-100 bg-white">
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  placeholder="サイト名で検索"
                  className="w-full md:w-96 py-2 px-4 border border-gray-200 rounded-full text-sm outline-none focus:border-blue-600"
                />
              </div>
            </div>

            {/* ログリスト */}
            <div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 280px)' }}>
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <RefreshCw className="animate-spin text-blue-600" size={32} />
                </div>
              ) : filteredLogs.length === 0 ? (
                <div className="flex items-center justify-center py-20 text-gray-500">
                  ログがありません
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        {/* 時刻 */}
                        <div className="text-xs text-gray-500 w-16 flex-shrink-0 pt-1">
                          {formatTime(log.created_at)}
                        </div>

                        {/* ステータスアイコン */}
                        <div className="flex-shrink-0 pt-1">
                          {getStatusIcon(log.status)}
                        </div>

                        {/* コンテンツ */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900">
                              {log.title || log.label || '(タイトルなし)'}
                            </span>
                            {log.label && log.label !== log.title && (
                              <span className="text-xs text-gray-500">
                                【{log.label}】
                              </span>
                            )}
                          </div>

                          {/* エラーメッセージ */}
                          {log.status === 'failed' && log.error_message && (
                            <div className="text-sm text-red-600 mt-1">
                              {log.error_message}
                            </div>
                          )}

                          {/* 女性名 */}
                          {log.girl_name && (
                            <div className="text-sm text-gray-600 mt-1">
                              女性: {log.girl_name}
                            </div>
                          )}
                        </div>

                        {/* ステータスバッジ */}
                        <div className="flex-shrink-0">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                              log.status === 'success'
                                ? 'bg-green-100 text-green-700'
                                : log.status === 'failed'
                                ? 'bg-red-100 text-red-700'
                                : log.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {getStatusText(log.status)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateLogsPage;

