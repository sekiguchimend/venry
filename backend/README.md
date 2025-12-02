# Mr.Venrey Backend API

Go言語で実装されたバックエンドAPIサーバー

## 機能

- Supabase JWT認証
- PostgreSQLデータベース接続
- CORS対応
- ロギング
- ユーザー管理API
- サイト管理API

## セットアップ

### 1. 環境変数の設定

`.env`ファイルを作成し、以下の内容を設定してください：

```env
PORT=8080
SUPABASE_URL=https://rqzzpdmawtbrvmuddckz.supabase.co
SUPABASE_JWT_SECRET=your-jwt-secret-here
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.rqzzpdmawtbrvmuddckz.supabase.co:5432/postgres
ALLOWED_ORIGINS=http://localhost:3000
```

### 2. 依存関係のインストール

```bash
go mod download
```

### 3. サーバーの起動

```bash
go run cmd/server/main.go
```

サーバーは `http://localhost:8080` で起動します。

## APIエンドポイント

### ヘルスチェック（認証不要）

```
GET /health
```

レスポンス:
```json
{
  "status": "ok",
  "database": "connected"
}
```

### ユーザー情報取得（認証必要）

```
GET /api/user/me
Authorization: Bearer <access_token>
```

レスポンス:
```json
{
  "user": {
    "id": 1,
    "company_id": 1,
    "email": "user@example.com",
    "name": "ユーザー名",
    "role": "admin",
    "is_active": true,
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  },
  "company": {
    "id": 1,
    "name": "会社名",
    "phone_number": "03-1234-5678",
    "email": "company@example.com"
  }
}
```

### ユーザープロフィール更新（認証必要）

```
PUT /api/user/profile
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "新しい名前"
}
```

### サイト一覧取得（認証必要）

```
GET /api/sites
Authorization: Bearer <access_token>
```

レスポンス:
```json
[
  {
    "id": 1,
    "name": "サイト名",
    "url": "https://example.com",
    "site_type": "type",
    "is_active": true,
    "description": "説明"
  }
]
```

### 会社のサイト認証情報取得（認証必要）

```
GET /api/credentials
Authorization: Bearer <access_token>
```

## プロジェクト構造

```
backend/
├── cmd/
│   └── server/
│       └── main.go          # エントリーポイント
├── internal/
│   ├── handlers/            # HTTPハンドラー
│   │   ├── health.go
│   │   ├── user.go
│   │   └── site.go
│   ├── middleware/          # ミドルウェア
│   │   ├── auth.go         # JWT認証
│   │   ├── cors.go         # CORS設定
│   │   └── logger.go       # ロギング
│   ├── models/             # データモデル
│   │   ├── database.go     # DB接続
│   │   ├── user.go         # ユーザーモデル
│   │   └── site.go         # サイトモデル
│   └── services/           # ビジネスロジック
├── go.mod
├── go.sum
└── README.md
```

## 開発

### ビルド

```bash
go build -o bin/server cmd/server/main.go
```

### 実行

```bash
./bin/server
```

### テスト

```bash
go test ./...
```

## フロントエンドからの利用

### サーバーコンポーネント

```typescript
import { getAPI } from '@/lib/api/server';
import { UserResponse } from '@/lib/api/types';

export default async function Page() {
  const user = await getAPI<UserResponse>('/api/user/me');
  
  return <div>{user.user.name}</div>;
}
```

### クライアントコンポーネント

```typescript
'use client';

import { useEffect, useState } from 'react';
import { getAPIClient } from '@/lib/api/client';
import { UserResponse } from '@/lib/api/types';

export default function Component() {
  const [user, setUser] = useState<UserResponse | null>(null);
  
  useEffect(() => {
    getAPIClient<UserResponse>('/api/user/me').then(setUser);
  }, []);
  
  return <div>{user?.user.name}</div>;
}
```

## 認証

このAPIは、SupabaseのJWTトークンを使用して認証を行います。

1. フロントエンドでSupabase Authを使用してログイン
2. アクセストークンを取得
3. `Authorization: Bearer <access_token>`ヘッダーでAPIにリクエスト

## トラブルシューティング

### データベース接続エラー

- `DATABASE_URL`が正しく設定されているか確認
- Supabaseプロジェクトが起動しているか確認

### JWT検証エラー

- `SUPABASE_JWT_SECRET`が正しく設定されているか確認
- トークンの有効期限が切れていないか確認

### CORS エラー

- `ALLOWED_ORIGINS`にフロントエンドのURLが含まれているか確認

