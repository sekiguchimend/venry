# ミドルウェアによるアクセストークン管理

## 概要

Next.jsのミドルウェアでSupabaseのアクセストークンを管理し、サーバーコンポーネントとバックエンドAPIで簡単に利用できるようにしています。

## アーキテクチャ

```
┌─────────────────────────────────────────────────────────┐
│                    Request Flow                         │
└─────────────────────────────────────────────────────────┘

1. ユーザーがページにアクセス
   ↓
2. Next.js Middleware が実行される
   ├─ Supabaseクッキーからセッションを取得
   ├─ アクセストークンを専用クッキー(sb-access-token)に保存
   └─ ユーザーIDを専用クッキー(sb-user-id)に保存
   ↓
3. サーバーコンポーネントが実行される
   ├─ cookies()でアクセストークンを取得
   └─ バックエンドAPIにトークンを付けてリクエスト
   ↓
4. Go Backend APIが認証を検証
   ├─ JWT トークンを検証
   └─ auth_user_id でユーザーを特定
   ↓
5. レスポンスを返す
```

## 実装の詳細

### 1. ミドルウェア（front/src/middleware.ts）

ミドルウェアで以下の処理を行います：

```typescript
// Supabaseセッションからアクセストークンを取得
const { data: { session } } = await supabase.auth.getSession();

// アクセストークンを専用クッキーに保存
if (session?.access_token) {
  response.cookies.set('sb-access-token', session.access_token, {
    httpOnly: true,           // XSS攻撃を防ぐ
    secure: true,             // HTTPS のみ（本番環境）
    sameSite: 'lax',          // CSRF攻撃を防ぐ
    maxAge: 60 * 60 * 24 * 7, // 7日間
    path: '/',
  });
}
```

**メリット：**
- サーバーコンポーネントから簡単にアクセスできる
- セキュリティ：httpOnly フラグでJavaScriptからアクセス不可
- 一元管理：ミドルウェアで全リクエストを処理

### 2. サーバーコンポーネントでの利用

#### 方法1: 認証ヘルパー関数を使用

```typescript
// app/profile/page.tsx
import { requireAuth, getAccessToken } from '@/lib/auth/server';

export default async function ProfilePage() {
  // 認証チェック（未認証の場合は自動リダイレクト）
  const session = await requireAuth();
  
  // アクセストークンを取得
  const accessToken = await getAccessToken();
  
  return <div>こんにちは、{session.user.email}</div>;
}
```

#### 方法2: API呼び出しで自動的にトークンを付与

```typescript
// app/dashboard/page.tsx
import { getAPI } from '@/lib/api/server';
import { UserResponse } from '@/lib/api/types';

export default async function DashboardPage() {
  // 内部でアクセストークンが自動的に付与される
  const user = await getAPI<UserResponse>('/api/user/me');
  
  return <div>{user.user.name}</div>;
}
```

### 3. 認証ヘルパー関数（front/src/lib/auth/server.ts）

サーバーコンポーネント用の便利な関数を提供：

```typescript
// 認証が必要なページで使用
await requireAuth();

// アクセストークンを取得
const token = await getAccessToken();

// ユーザーIDを取得
const userId = await getUserId();

// セッションを取得
const session = await getSession();

// ユーザー情報を取得
const user = await getCurrentUser();
```

### 4. API fetchユーティリティ（front/src/lib/api/server.ts）

バックエンドAPIへのリクエストを簡単に行える関数：

```typescript
import { getAPI, postAPI, putAPI, deleteAPI } from '@/lib/api/server';

// GET リクエスト
const user = await getAPI('/api/user/me');

// POST リクエスト
const result = await postAPI('/api/user/profile', { name: '新しい名前' });

// PUT リクエスト
await putAPI('/api/user/profile', { name: '更新' });

// DELETE リクエスト
await deleteAPI('/api/resource/123');
```

## 使用例

### 完全なページの例

```typescript
// app/dashboard/page.tsx
import { requireAuth, getAccessToken, getUserId } from '@/lib/auth/server';
import { getAPI } from '@/lib/api/server';
import { UserResponse, Site } from '@/lib/api/types';

export default async function DashboardPage() {
  // 1. 認証チェック（未認証なら /login へリダイレクト）
  const session = await requireAuth();
  
  // 2. トークン情報を取得（オプション）
  const accessToken = await getAccessToken();
  const userId = await getUserId();
  
  // 3. バックエンドAPIからデータを取得
  const user = await getAPI<UserResponse>('/api/user/me');
  const sites = await getAPI<Site[]>('/api/sites');
  
  return (
    <div>
      <h1>ダッシュボード</h1>
      <p>こんにちは、{user.user.name}さん</p>
      <p>ユーザーID: {userId}</p>
      
      <h2>サイト一覧</h2>
      <ul>
        {sites.map(site => (
          <li key={site.id}>{site.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

## セキュリティ

### クッキー設定

```typescript
{
  httpOnly: true,    // JavaScript からアクセス不可（XSS対策）
  secure: true,      // HTTPS のみ（本番環境）
  sameSite: 'lax',   // CSRF 対策
  maxAge: 604800,    // 7日間
  path: '/',         // 全パスでアクセス可能
}
```

### ベストプラクティス

1. **本番環境では必ず HTTPS を使用**
   ```typescript
   secure: process.env.NODE_ENV === 'production'
   ```

2. **トークンをクライアントサイドに露出しない**
   - `httpOnly: true` で JavaScript からアクセス不可

3. **適切な有効期限を設定**
   - デフォルト: 7日間
   - 必要に応じて調整

4. **認証エラーの適切な処理**
   ```typescript
   try {
     const user = await getAPI('/api/user/me');
   } catch (error) {
     // エラーハンドリング
     redirect('/login');
   }
   ```

## トラブルシューティング

### トークンが取得できない

**症状：** `getAccessToken()` が `null` を返す

**原因と解決策：**
1. ログインしていない → `/login` でログイン
2. ミドルウェアが実行されていない → ブラウザをリフレッシュ
3. クッキーが削除されている → 再ログイン

### バックエンドAPIで認証エラー

**症状：** `401 Unauthorized` エラー

**原因と解決策：**
1. トークンが無効 → 再ログイン
2. JWT Secret が間違っている → backend/.env を確認
3. トークンの有効期限切れ → 再ログイン

**デバッグ方法：**
```typescript
const accessToken = await getAccessToken();
console.log('Access Token:', accessToken);

// トークンの内容を確認（JWT デコード）
const payload = JSON.parse(
  Buffer.from(accessToken.split('.')[1], 'base64').toString()
);
console.log('Token Payload:', payload);
```

### ミドルウェアが実行されない

**症状：** トークンがクッキーに保存されない

**原因と解決策：**
1. matcher の設定を確認
   ```typescript
   export const config = {
     matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
   };
   ```

2. ページをリフレッシュ

3. ブラウザのDevToolsでクッキーを確認
   - Application → Cookies → `sb-access-token` を確認

## パフォーマンス最適化

### キャッシング

```typescript
// キャッシュしない（デフォルト、認証が必要なデータ）
const user = await getAPI('/api/user/me');

// 60秒間キャッシュ（公開データ）
const sites = await getAPI('/api/sites', 'force-cache');

// revalidate を使用
const sites = await getAPI('/api/sites', {
  next: { revalidate: 60 }
});
```

### パラレルフェッチ

```typescript
// 並列でデータを取得
const [user, sites, credentials] = await Promise.all([
  getAPI<UserResponse>('/api/user/me'),
  getAPI<Site[]>('/api/sites'),
  getAPI<Credential[]>('/api/credentials'),
]);
```

## API リファレンス

### 認証ヘルパー（lib/auth/server.ts）

| 関数 | 戻り値 | 説明 |
|------|--------|------|
| `requireAuth()` | `Session` | 認証チェック、未認証時はリダイレクト |
| `getSession()` | `Session \| null` | セッションを取得 |
| `getCurrentUser()` | `User \| null` | ユーザー情報を取得 |
| `getAccessToken()` | `string \| null` | アクセストークンを取得 |
| `getUserId()` | `string \| null` | ユーザーIDを取得 |

### API ユーティリティ（lib/api/server.ts）

| 関数 | 説明 |
|------|------|
| `getAPI<T>(endpoint, cache?)` | GET リクエスト |
| `postAPI<T>(endpoint, data)` | POST リクエスト |
| `putAPI<T>(endpoint, data)` | PUT リクエスト |
| `patchAPI<T>(endpoint, data)` | PATCH リクエスト |
| `deleteAPI<T>(endpoint)` | DELETE リクエスト |

## 参考ページ

- `/profile` - プロフィールページ（認証情報の表示）
- `/api-example` - API統合サンプル

## 関連ドキュメント

- [Supabase認証セットアップ](./SETUP.md)
- [バックエンド統合ガイド](./BACKEND_SETUP.md)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Supabase SSR](https://supabase.com/docs/guides/auth/server-side/nextjs)

