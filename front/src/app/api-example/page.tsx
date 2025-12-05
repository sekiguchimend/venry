import { getAPI } from '@/lib/api/server';
import { UserResponse, Site } from '@/lib/api/types';
import Link from 'next/link';

// サーバーコンポーネント（デフォルト）
// ミドルウェアで認証チェックを行うため、ここでは不要
export default async function ApiExamplePage() {

  let user: UserResponse | null = null;
  let sites: Site[] = [];
  let error: string | null = null;

  try {
    // サーバーサイドでAPIを呼び出し
    user = await getAPI<UserResponse>('/api/user/me');
    sites = await getAPI<Site[]>('/api/sites');
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unknown error';
    console.error('API Error:', err);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/profile"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          ← プロフィールページへ
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">API統合サンプル</h1>

      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm">
          💡 このページはサーバーコンポーネントで実装されています。
          <br />
          ミドルウェアで管理されているアクセストークンを使用して、
          <br />
          GoバックエンドAPIからデータを取得しています。
        </p>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <h2 className="text-xl font-semibold mb-2">エラー</h2>
          <p>{error}</p>
          <p className="mt-4 text-sm">
            ⚠️ バックエンドAPIが起動していることを確認してください。
            <br />
            <code className="bg-white px-2 py-1 rounded">
              cd backend && go run cmd/server/main.go
            </code>
          </p>
        </div>
      )}

      {/* ユーザー情報 */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">ユーザー情報</h2>
        {user ? (
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
                <p>
                  <span className="font-semibold">住所:</span> {user.company.address}
                </p>
              </>
            )}
          </div>
        ) : (
          <p className="text-gray-500">ユーザー情報を取得できませんでした</p>
        )}
      </div>

      {/* サイト一覧 */}
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">登録サイト一覧</h2>
        {sites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sites.map((site) => (
              <div key={site.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">{site.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{site.description}</p>
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm break-all"
                >
                  {site.url}
                </a>
                <p className="mt-2 text-xs text-gray-500">タイプ: {site.site_type}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">サイト情報を取得できませんでした</p>
        )}
      </div>
    </div>
  );
}
