import { Site } from '../../../types/id-pass';

/**
 * 対応サイト一覧（参照.mdに基づく完全な定義）
 *
 * 各サイトには automationId とフロー一覧が含まれます
 * フローの code はバックエンド（Go/Rod）で参照するキーとして使用
 */
export const SITES_DATA: Site[] = [
  // 1. HIME CHANNEL
  {
    id: '650fa91d-7fd1-4787-9b8a-6493b80bb65c',
    name: 'HIME CHANNEL',
    status: 'active',
    automationId: 'hime_channel',
    flows: [
      { code: 'shop_post', name: 'HIME CHANNEL(店舗投稿)' },
      { code: 'coupon', name: 'HIME CHANNEL(クーポン)' },
      { code: 'available_now_bulk', name: 'HIME CHANNEL(今すぐ遊べる)【一括更新専用】' },
    ],
  },

  // 2. KFJ京都風俗情報
  {
    id: '8b0a0312-1d93-4c7d-95fd-31a707c96636',
    name: 'KFJ京都風俗情報',
    status: 'active',
    automationId: 'kfj_kyoto',
    flows: [
      { code: 'news', name: 'KFJ京都風俗情報(ニュース)' },
      { code: 'realtime', name: 'KFJ京都風俗情報(リアルタイム)' },
      { code: 'discount_ticket', name: 'KFJ京都風俗情報(割引チケット)' },
    ],
  },

  // 3. Qプリ
  {
    id: 'eb1c4653-c950-4e9b-98c0-97f8805d9b6a',
    name: 'Qプリ',
    status: 'active',
    automationId: 'qpri',
    flows: [],
  },

  // 4. オフィシャル(京都ホテヘル倶楽部様)
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    name: 'オフィシャル(京都ホテヘル倶楽部様)',
    status: 'active',
    automationId: 'official_kyoto_hoteheru',
    flows: [
      { code: 'sokuhime_bulk', name: 'オフィシャル(京都ホテヘル倶楽部様)(即姫)【一括更新専用】' },
    ],
  },

  // 5. ガールズヘブン
  {
    id: '4df956fb-e760-4dcf-9b75-4370f1ab875e',
    name: 'ガールズヘブン',
    status: 'active',
    automationId: 'girls_heaven',
    flows: [
      { code: 'search_ranking_up', name: 'ガールズヘブン(お店検索表示順アップ)' },
      { code: 'manager_blog', name: 'ガールズヘブン(店長ブログ)' },
      { code: 'recruit', name: 'ガールズヘブン(求人)' },
      { code: 'senior_voice_old', name: 'ガールズヘブン(先輩ボイス(旧))' },
    ],
  },

  // 6. シティヘブンネット
  {
    id: '6a32f75c-601c-45d4-9a5e-71526bb847c1',
    name: 'シティヘブンネット',
    status: 'active',
    automationId: 'cityheaven',
    flows: [
      { code: 'heaven_update_button', name: 'シティヘブンネット(ヘブン更新ボタン)' },
      { code: 'pokkiri', name: 'シティヘブンネット(ポッキリ)' },
      { code: 'photo_diary', name: 'シティヘブンネット(写メ日記)' },
      { code: 'sokuhime_single', name: 'シティヘブンネット(即ヒメ登録)【1人ずつ更新】' },
      { code: 'sokuhime_all', name: 'シティヘブンネット(即ヒメ登録)【全員同時更新】' },
      { code: 'direct_mail', name: 'シティヘブンネット(直送便/プラチナメール)' },
      { code: 'video', name: 'シティヘブンネット(動画)' },
    ],
  },

  // 7. ジョブヘブン【メンズヘブン】
  {
    id: 'b2c3d4e5-f6a7-8901-bcde-f23456789012',
    name: 'ジョブヘブン【メンズヘブン】',
    status: 'active',
    automationId: 'job_heaven',
    flows: [
      { code: 'attendance_order', name: 'シティヘブンネット(出勤並び順一発設定)' },
      { code: 'girl_page_update', name: 'シティヘブンネット(女の子ページ更新)【長期未更新女性のみ】' },
      { code: 'search_ranking_up', name: 'ジョブヘブン【メンズヘブン】(お店検索表示順アップ)' },
      { code: 'recruit_movie', name: 'ジョブヘブン【メンズヘブン】(求人ムービー)' },
      { code: 'manager_blog', name: 'ジョブヘブン【メンズヘブン】(店長ブログ)' },
      { code: 'senior_voice', name: 'ジョブヘブン【メンズヘブン】(先輩の声)' },
    ],
  },

  // 8. デリヘルタウン
  {
    id: 'c3d4e5f6-a7b8-9012-cdef-345678901234',
    name: 'デリヘルタウン',
    status: 'active',
    automationId: 'deliheru_town',
    flows: [
      { code: 'news', name: 'デリヘルタウン(お知らせ)' },
      { code: 'standby_pickup_single', name: 'デリヘルタウン(待機情報-ピックアップ)【1人ずつ更新】【有料】', isPaid: true },
      { code: 'standby_pickup_all', name: 'デリヘルタウン(待機情報-ピックアップ)【全員同時更新】【有料】', isPaid: true },
      { code: 'title_image', name: 'デリヘルタウン(タイトル画像(店舗バナー))' },
      { code: 'discount', name: 'デリヘルタウン(割引特典)' },
      { code: 'photo_diary', name: 'デリヘルタウン(写メ日記)' },
      { code: 'standby_status', name: 'デリヘルタウン(待機情報-待機中に設定)' },
      { code: 'special_content', name: 'デリヘルタウン(特設コンテンツ)' },
    ],
  },

  // 9. バニラ
  {
    id: 'd4e5f6a7-b8c9-0123-def0-456789012345',
    name: 'バニラ',
    status: 'active',
    automationId: 'vanilla',
    flows: [
      { code: 'manager_blog', name: 'バニラ(店長ブログ)' },
    ],
  },

  // 10. ぴゅあじょ
  {
    id: 'e5f6a7b8-c9d0-1234-ef01-567890123456',
    name: 'ぴゅあじょ',
    status: 'active',
    automationId: 'pureajo',
    flows: [
      { code: 'pr_video', name: 'ぴゅあじょ(PR動画)' },
      { code: 'urgent_recruit', name: 'ぴゅあじょ(急募速報)' },
      { code: 'ranking_up', name: 'ぴゅあじょ(上位表示)' },
      { code: 'manager_news', name: 'ぴゅあじょ(店長NEWS)' },
    ],
  },

  // 11. ぴゅあらば
  {
    id: 'f6a7b8c9-d0e1-2345-f012-678901234567',
    name: 'ぴゅあらば',
    status: 'active',
    automationId: 'purela',
    flows: [
      { code: 'photo_diary', name: 'ぴゅあらば(写メ日記)' },
    ],
  },

  // 12. ぴゅあらばスタッフ
  {
    id: 'a7b8c9d0-e1f2-3456-0123-789012345678',
    name: 'ぴゅあらばスタッフ',
    status: 'active',
    automationId: 'purela_staff',
    flows: [
      { code: 'urgent_recruit', name: 'ぴゅあらばスタッフ(急募速報)' },
      { code: 'ranking_up', name: 'ぴゅあらばスタッフ(上位表示実行)' },
    ],
  },

  // 13. マンゾクネット
  {
    id: 'b8c9d0e1-f2a3-4567-1234-890123456789',
    name: 'マンゾクネット',
    status: 'active',
    automationId: 'manzoku',
    flows: [
      { code: 'available_now', name: 'マンゾクネット(今すぐ入れるGAL)【有料】', isPaid: true },
      { code: 'latest_info', name: 'マンゾクネット(最新情報)【有料】', isPaid: true },
      { code: 'photo_diary', name: 'マンゾクネット(写メ日記)【有料】', isPaid: true },
      { code: 'video_ranking_up', name: 'マンゾクネット(動画管理-上位表示)' },
    ],
  },

  // 14. 駅ちか人気！風俗ランキング
  {
    id: 'c9d0e1f2-a3b4-5678-2345-901234567890',
    name: '駅ちか人気！風俗ランキング',
    status: 'active',
    automationId: 'ekichika',
    flows: [
      { code: 'news', name: '駅ちか人気！風俗ランキング(ニュース)' },
      { code: 'photo_diary', name: '駅ちか人気！風俗ランキング(写メ日記)' },
      { code: 'ranking_up', name: '駅ちか人気！風俗ランキング(上位表示)' },
      { code: 'sokuhime', name: '駅ちか人気！風俗ランキング(即ヒメ)' },
      { code: 'video_post', name: '駅ちか人気！風俗ランキング(動画投稿)' },
    ],
  },

  // 15. 口コミ風俗情報局
  {
    id: 'd0e1f2a3-b4c5-6789-3456-012345678901',
    name: '口コミ風俗情報局',
    status: 'active',
    automationId: 'kuchikomi',
    flows: [
      { code: 'suguhime_busy_reregister', name: '口コミ風俗情報局(すぐヒメ！)【接客中を再登録】' },
      { code: 'suguhime_selected', name: '口コミ風俗情報局(すぐヒメ！)【選択女性を更新】' },
      { code: 'suguhime_paid', name: '口コミ風俗情報局(すぐヒメ！)【有料】', isPaid: true },
      { code: 'suguhime_paid_single', name: '口コミ風俗情報局(すぐヒメ！)【有料】【1人ずつ更新】', isPaid: true },
      { code: 'himewari', name: '口コミ風俗情報局(ヒメ割！)' },
      { code: 'himewari_selected', name: '口コミ風俗情報局(ヒメ割！)【選択女性を更新】' },
      { code: 'himewari_multiple', name: '口コミ風俗情報局(ヒメ割！)【複数女性を更新】' },
      { code: 'hime_diary', name: '口コミ風俗情報局(ヒメ日記)' },
      { code: 'kyokuwari', name: '口コミ風俗情報局(局割！)' },
      { code: 'breaking_news', name: '口コミ風俗情報局(速報！)' },
      { code: 'manager_recommend', name: '口コミ風俗情報局(店長イチオシ)' },
      { code: 'pickup', name: '口コミ風俗情報局(ピックアップ)' },
      { code: 'discount_event', name: '口コミ風俗情報局(割引・イベント)' },
    ],
  },

  // 16. 風俗じゃぱん！
  {
    id: 'e1f2a3b4-c5d6-7890-4567-123456789012',
    name: '風俗じゃぱん！',
    status: 'active',
    automationId: 'fuzoku_japan',
    flows: [
      { code: 'available_now', name: '風俗じゃぱん！(今から遊べる女の子)' },
      { code: 'available_now_multiple', name: '風俗じゃぱん！(今から遊べる女の子)【複数女性を更新】' },
      { code: 'shop_news', name: '風俗じゃぱん！(店舗速報)' },
      { code: 'video_post', name: '風俗じゃぱん！(動画投稿)' },
      { code: 'event_freetext', name: '風俗じゃぱん！(イベント(フリーテキスト))-1枚目を更新' },
      { code: 'coupon', name: '風俗じゃぱん！(クーポン券)-1枚目を更新' },
      { code: 'pickup_girls', name: '風俗じゃぱん！(ピックアップガールズ)' },
    ],
  },
];

/**
 * automationIdからサイトを取得
 */
export function getSiteByAutomationId(automationId: string): Site | undefined {
  return SITES_DATA.find(site => site.automationId === automationId);
}

/**
 * サイトIDからサイトを取得
 */
export function getSiteById(id: string): Site | undefined {
  return SITES_DATA.find(site => site.id === id);
}

/**
 * 全サイトのautomation_id一覧を取得
 */
export function getAllSiteAutomationIds(): string[] {
  return SITES_DATA.map(site => site.automationId);
}

/**
 * サイトのフロー一覧を取得
 */
export function getFlowsBySiteId(siteId: string): Site['flows'] {
  const site = getSiteById(siteId);
  return site?.flows || [];
}
