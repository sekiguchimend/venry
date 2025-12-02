# バックエンドAPI統合ガイド

## 概要

このプロジェクトは、Go言語で実装されたバックエンドAPIサーバーと、Next.js 15のサーバーコンポーネントを使用したフロントエンドで構成されています。

## アーキテクチャ

```
┌─────────────────────────────────────────────────┐
│         Next.js Frontend (Port 3000)            │
│  ┌────────────────┐  ┌──────────────────────┐  │
│  │  Server Comp   │  │   Client Comp        │  │
│  │  (SSR/SSG)     │  │   (Browser)          │  │
│  └────────┬───────┘  └──────────┬───────────┘  │
│           │                      │              │
│           │ getAPI()            │ getAPIClient()│
│           └──────────┬───────────┘              │
│                      │                          │
│           ┌──────────▼──────────┐               │
│           │   Supabase Auth     │               │
│           │   (JWT Token)       │               │
│           └──────────┬──────────┘               │
└──────────────────────┼──────────────────────────┘
                       │
                       │ Bearer Token
                       ▼
┌─────────────────────────────────────────────────┐
│          Go Backend API (Port 8080)             │
│  ┌────────────────────────────────────────┐    │
│  │         Auth Middleware                │    │
│  │         (JWT Verification)             │    │
│  └────────────────┬───────────────────────┘    │
│                   │                             │
│  ┌────────────────▼───────────────────────┐    │
│  │         API Handlers                   │    │
│  │  - User Management                     │    │
│  │  - Site Management                     │    │
│  └────────────────┬───────────────────────┘    │
│                   │                             │
│  ┌────────────────▼───────────────────────┐    │
│  │      PostgreSQL (Supabase)             │    │
│  └────────────────────────────────────────┘    │
└─────────────────────────────────────────────────┘
```

## セットアップ手順

### 1. バックエンドの起動

```bash
# backendディレクトリに移動
cd backend

# 環境変数ファイルを作成
cp .env.example .env

# .envファイルを編集して、以下を設定:
# - DATABASE_URL: Supabaseのデータベース接続文字列
# - SUPABASE_JWT_SECRET: SupabaseのJWT Secret

# サーバーを起動
go run cmd/server/main.go
```

バックエンドサーバーは `http://localhost:8080` で起動します。

### 2. フロントエンドの起動

```bash
# frontディレクトリに移動
cd front

# 環境変数ファイルを作成（既に設定済みの場合はスキップ）
# .env.local に以下を追加:
NEXT_PUBLIC_API_URL=http://localhost:8080

# 開発サーバーを起動
npm run dev
```

フロントエンドは `http://localhost:3000` で起動します。

## 使用方法

### サーバーコンポーネントでAPIを呼び出す

```typescript
// app/example/page.tsx
import { getAPI } from '@/lib/api/server';
import { UserResponse } from '@/lib/api/types';

export default async function ExamplePage() {
  // サーバーサイドでAPIを呼び出し
  const user = await getAPI<UserResponse>('/api/user/me');

  return (
    <div>
      <h1>{user.user.name}</h1>
      <p>{user.user.email}</p>
    </div>
  );
}
```

### クライアントコンポーネントでAPIを呼び出す

```typescript
// components/ExampleComponent.tsx
'use client';

import { useState, useEffect } from 'react';
import { getAPIClient } from '@/lib/api/client';
import { UserResponse } from '@/lib/api/types';

export default function ExampleComponent() {
  const [user, setUser] = useState<UserResponse | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getAPIClient<UserResponse>('/api/user/me');
      setUser(userData);
    };
    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user.user.name}</h1>
      <p>{user.user.email}</p>
    </div>
  );
}
```

## 利用可能なAPIエンドポイント

### 認証不要

- `GET /health` - ヘルスチェック

### 認証必要

- `GET /api/user/me` - 現在のユーザー情報を取得
- `PUT /api/user/profile` - ユーザープロフィールを更新
- `GET /api/sites` - サイト一覧を取得
- `GET /api/credentials` - 会社のサイト認証情報を取得

## サンプルページ

サンプルページを用意しています：

- `/api-example` - サーバーコンポーネントでAPIを呼び出すサンプル

## トラブルシューティング

### CORS エラーが発生する

バックエンドの `.env` ファイルで `ALLOWED_ORIGINS` を確認してください：

```env
ALLOWED_ORIGINS=http://localhost:3000
```

### 認証エラーが発生する

1. Supabaseでログインしているか確認
2. バックエンドの `SUPABASE_JWT_SECRET` が正しく設定されているか確認
3. トークンの有効期限が切れていないか確認

### データベース接続エラー

1. バックエンドの `DATABASE_URL` が正しく設定されているか確認
2. Supabaseプロジェクトが起動しているか確認
3. データベースマイグレーションが適用されているか確認

### ユーザー情報が見つからない

`users` テーブルに `auth_user_id` カラムが追加されているか確認してください。マイグレーションが適用されていない場合は、Supabaseダッシュボードで手動で実行してください。

## データベースセットアップ

### auth_user_id カラムの追加

ユーザー認証を機能させるには、`users` テーブルに `auth_user_id` カラムを追加する必要があります：

```sql
ALTER TABLE users ADD COLUMN IF NOT EXISTS auth_user_id UUID UNIQUE;
CREATE INDEX IF NOT EXISTS idx_users_auth_user_id ON users(auth_user_id);
```

### ユーザーとAuth IDの紐付け

Supabaseで新規登録したユーザーを、`users` テーブルに登録する必要があります：

```sql
INSERT INTO users (company_id, email, name, role, auth_user_id, is_active)
VALUES (
  1, -- company_id
  'user@example.com', -- email
  'ユーザー名', -- name
  'admin', -- role
  'auth-user-id-from-supabase', -- auth_user_id (Supabase Auth の user.id)
  true -- is_active
);
```

Auth User ID は、フロントエンドでログイン後に取得できます：

```typescript
const { data: { user } } = await supabase.auth.getUser();
console.log(user.id); // これがauth_user_id
```

## 開発のベストプラクティス

### サーバーコンポーネントを優先

- データ取得はできるだけサーバーコンポーネントで行う
- SEOが重要なページはサーバーコンポーネントを使用
- 初期表示が高速になる

### クライアントコンポーネントの使用場面

- ユーザーインタラクションが必要な場合
- リアルタイムデータ更新が必要な場合
- ブラウザAPIを使用する場合

### キャッシング戦略

サーバーコンポーネントでは、Next.jsのキャッシング機能を活用できます：

```typescript
// キャッシュしない（デフォルト）
const user = await getAPI<UserResponse>('/api/user/me');

// 60秒間キャッシュ
const user = await getAPI<UserResponse>('/api/user/me', 'force-cache');
```

## 本番環境へのデプロイ

### バックエンド

1. `.env` ファイルに本番環境の設定を追加
2. ビルド: `go build -o bin/server cmd/server/main.go`
3. 実行: `./bin/server`

### フロントエンド

1. `.env.production` を作成し、本番環境のAPIのURLを設定：
   ```
   NEXT_PUBLIC_API_URL=https://api.yourdomain.com
   ```
2. ビルド: `npm run build`
3. 起動: `npm start`

