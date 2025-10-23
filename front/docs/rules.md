# 開発ルール

このプロジェクトにおける開発時の重要なルールを以下に記載します。

## 1. Tailwind CSS の使用について

### 動的な値の禁止
- Tailwind CSS では動的な値を使用しないでください
- 例：`w-[${width}px]` や `text-[${color}]` などの動的な値は避ける
- 代わりに事前定義されたクラス名を使用するか、CSS変数を活用してください

```tsx
// ❌ 悪い例
<div className={`w-[${dynamicWidth}px] h-[${dynamicHeight}px]`}>

// ✅ 良い例
<div className="w-64 h-32">
// または
<div className="w-full h-auto" style={{ width: dynamicWidth, height: dynamicHeight }}>
```

## 2. パフォーマンスの最適化

### 無駄なレンダリングの防止
- 不要な再レンダリングを避けるため、以下の点に注意してください：
  - `React.memo` を適切に使用する
  - `useMemo` と `useCallback` を効果的に活用する
  - 状態の更新を最小限に抑える
  - 適切な依存配列を設定する

```tsx
// ✅ 良い例
const MemoizedComponent = React.memo(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => processItem(item));
  }, [data]);

  return <div>{processedData}</div>;
});
```

## 3. コード構造とDRY原則

### フォルダー構造を意識した設計
- プロジェクトのフォルダー構造に従って、適切な場所にコードを配置してください
- 共通コンポーネントは `src/components/` に配置
- ページ固有のコンポーネントは各ページのディレクトリ内に配置
- ユーティリティ関数は `src/utils/` に配置

### コードの重複排除
- 同じ機能を持つコードは共通化してください
- 再利用可能なコンポーネントを作成し、重複を避ける
- 共通のロジックは custom hooks として抽出する
- 定数や設定値は適切な場所で一元管理する

```tsx
// ✅ 良い例：共通コンポーネントの作成
// src/components/common/Button.tsx
export const Button = ({ variant, children, ...props }) => {
  return (
    <button 
      className={`btn ${variant === 'primary' ? 'btn-primary' : 'btn-secondary'}`}
      {...props}
    >
      {children}
    </button>
  );
};

// 各ページで再利用
import { Button } from '@/components/common/Button';
```

## 4. ファイルサイズの管理

### 500行制限ルール
- 1つのファイルが500行を超える場合は、コンポーネントを分割してください
- 機能ごとに適切にコンポーネントを分離する
- 関連する機能は同じディレクトリ内でグループ化する

```
// 分割例
src/
  components/
    UserProfile/
      index.tsx          // メインコンポーネント
      UserInfo.tsx       // ユーザー情報部分
      UserSettings.tsx   // 設定部分
      UserActions.tsx    // アクション部分
```

## 5. デザインの一貫性

### 既存デザインの保持
- デザイン変更の指定がない場合は、既存のデザインを変更せずに修正・追加を行ってください
- 新機能追加時も既存のデザインシステムに合わせる
- UI/UXの一貫性を保つため、既存のコンポーネントスタイルを参考にする

## 6. その他の重要事項

### 言語設定
- 開発時のコメントや変数名は日本語を使用してください
- ユーザー向けのテキストも日本語で統一する

### コードクリーンアップ
- 修正後に重複するコードは必ず削除してください
- 未使用のimportや変数は削除する
- 適切なコメントを残し、不要なコメントは削除する

---

これらのルールを遵守することで、保守性が高く、パフォーマンスに優れたアプリケーションを構築できます。
