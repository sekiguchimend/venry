'use client';

import { useState, useEffect } from 'react';
import { getAPIClient } from '@/lib/api/client';
import { UserResponse } from '@/lib/api/types';

// クライアントコンポーネントの使用例
export default function UserProfileClient() {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getAPIClient<UserResponse>('/api/user/me');
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <p className="text-gray-500">読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-100 border border-red-400 text-red-700 rounded-lg">
        <p>エラー: {error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <p className="text-gray-500">ユーザー情報がありません</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">プロフィール</h2>
      <div className="space-y-2">
        <p>
          <span className="font-semibold">名前:</span> {user.user.name}
        </p>
        <p>
          <span className="font-semibold">メール:</span> {user.user.email}
        </p>
        <p>
          <span className="font-semibold">役割:</span> {user.user.role}
        </p>
        {user.company && (
          <>
            <p className="mt-4 text-lg font-semibold">会社情報</p>
            <p>
              <span className="font-semibold">会社名:</span> {user.company.name}
            </p>
            <p>
              <span className="font-semibold">電話:</span> {user.company.phone_number}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

