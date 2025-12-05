import { getAccessToken, getSession } from '@/lib/api/auth';
import { getAPI } from '@/lib/api/server';
import { UserResponse } from '@/lib/api/types';

// サーバーコンポーネント - 認証が必要なページの例
// ミドルウェアで認証チェックを行うため、ここでは不要
export default async function ProfilePage() {
  // アクセストークンとユーザーIDを取得（デバッグ用）
  const session = await getSession();
  const accessToken = await getAccessToken();
  const userId = session?.userId;

  let user: UserResponse | null = null;
  let error: string | null = null;

  try {
    // バックエンドAPIからユーザー情報を取得
    user = await getAPI<UserResponse>('/api/user/me');
  } catch (err) {
    error = err instanceof Error ? err.message : 'ユーザー情報の取得に失敗しました';
    console.error('API Error:', err);
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">プロフィール</h1>

      {/* セッション情報 */}
      <div className="mb-8 p-6 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">セッション情報</h2>
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-semibold">Supabase User ID:</span>{' '}
            <code className="bg-white px-2 py-1 rounded">{userId}</code>
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user?.user?.email || '-'}
          </p>
          <p>
            <span className="font-semibold">アクセストークン:</span>{' '}
            <code className="bg-white px-2 py-1 rounded text-xs">
              {accessToken ? `${accessToken.substring(0, 20)}...` : 'なし'}
            </code>
          </p>
        </div>
      </div>

      {/* エラー表示 */}
      {error && (
        <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">エラー</h2>
          <p>{error}</p>
        </div>
      )}

      {/* ユーザー情報（バックエンドAPIから取得） */}
      {user && (
        <div className="space-y-8">
          {/* 基本情報 */}
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">基本情報</h2>
            <div className="space-y-3">
              <div className="flex">
                <span className="font-semibold w-32">ID:</span>
                <span>{user.user.id}</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-32">名前:</span>
                <span>{user.user.name}</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-32">メール:</span>
                <span>{user.user.email}</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-32">役割:</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {user.user.role}
                </span>
              </div>
              <div className="flex">
                <span className="font-semibold w-32">ステータス:</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    user.user.is_active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {user.user.is_active ? 'アクティブ' : '非アクティブ'}
                </span>
              </div>
              {user.user.last_login_at && (
                <div className="flex">
                  <span className="font-semibold w-32">最終ログイン:</span>
                  <span>{new Date(user.user.last_login_at).toLocaleString('ja-JP')}</span>
                </div>
              )}
            </div>
          </div>

          {/* 会社情報 */}
          {user.company && (
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">会社情報</h2>
              <div className="space-y-3">
                <div className="flex">
                  <span className="font-semibold w-32">会社名:</span>
                  <span>{user.company.name}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-32">電話番号:</span>
                  <span>{user.company.phone_number}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-32">メール:</span>
                  <span>{user.company.email}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-32">郵便番号:</span>
                  <span>{user.company.postal_code}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-32">住所:</span>
                  <span>{user.company.address}</span>
                </div>
              </div>
            </div>
          )}

          {/* デバッグ情報 */}
          <details className="p-6 bg-gray-50 rounded-lg">
            <summary className="cursor-pointer font-semibold">
              デバッグ情報（開発用）
            </summary>
            <pre className="mt-4 p-4 bg-white rounded overflow-auto text-xs">
              {JSON.stringify({ user, session }, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
}

