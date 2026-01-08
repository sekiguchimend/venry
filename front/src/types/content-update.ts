import type { PageType } from '../config';

// フロー表示用アイテム（JSON設定から生成）
export interface FlowItem {
  id: string;
  siteId: string;
  siteName: string;
  flowCode: string;
  flowName: string;
  types: string[];
  pages: string[];
  isPaid: boolean;
  // 表示用の追加情報
  timer?: {
    nextTime: string;
    date: string;
  };
  timerIconColor?: string;
  lastUpdated?: {
    date: string;
    time: string;
  };
  category?: {
    label: string;
    backgroundColor: string;
    textColor: string;
  };
}

// 旧ContentItem型（後方互換性用）
export interface ContentItem {
  id: string;
  editButton?: {
    type: 'primary' | 'secondary';
    text: string;
  };
  timer: {
    nextTime: string;
    date: string;
  };
  timerIconColor: string;
  contentName: string;
  lastUpdated: {
    date: string;
    time: string;
  };
  category: {
    label: string;
    backgroundColor: string;
  };
}

export type ContentTabKey = 'content-list' | 'monthly-site' | 'female-recruitment' | 'male-recruitment' | 'group-create';

export interface ContentTabItem {
  key: ContentTabKey;
  label: string;
  page: PageType | null; // group-createはnull
}

// タブ定義
export const CONTENT_TABS: ContentTabItem[] = [
  { key: 'content-list', label: 'コンテンツ一覧', page: 'content-list' },
  { key: 'monthly-site', label: '月額制サイト', page: 'monthly-site' },
  { key: 'female-recruitment', label: '女性求人', page: 'female-recruitment' },
  { key: 'male-recruitment', label: '男性求人', page: 'male-recruitment' },
  { key: 'group-create', label: 'グループ作成', page: null },
];

// フロータイプのカラー定義
export const FLOW_TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  photo_diary: { bg: '#e3f2fd', text: '#1565c0' },
  sokuhime: { bg: '#fce4ec', text: '#c62828' },
  news: { bg: '#fff3e0', text: '#e65100' },
  coupon: { bg: '#f3e5f5', text: '#7b1fa2' },
  ranking_up: { bg: '#e8f5e9', text: '#2e7d32' },
  recruit_female: { bg: '#fce4ec', text: '#ad1457' },
  recruit_male: { bg: '#e3f2fd', text: '#1565c0' },
  bulk_update: { bg: '#eceff1', text: '#455a64' },
  video: { bg: '#fff8e1', text: '#f57f17' },
  direct_mail: { bg: '#e0f2f1', text: '#00695c' },
  event: { bg: '#ede7f6', text: '#4527a0' },
  blog: { bg: '#fbe9e7', text: '#bf360c' },
  standby: { bg: '#e1f5fe', text: '#0277bd' },
  pickup: { bg: '#f9fbe7', text: '#827717' },
  content: { bg: '#f5f5f5', text: '#616161' },
};

// タイマーアイコンの色（状態別）
export const TIMER_COLORS = {
  active: '#4caf50',    // 緑：アクティブ
  warning: '#ff9800',   // オレンジ：まもなく
  urgent: '#f44336',    // 赤：緊急
  inactive: '#9e9e9e',  // グレー：非アクティブ
};

// 後方互換性のためのエイリアス
export type TabKey = ContentTabKey;
export type TabItem = ContentTabItem;
