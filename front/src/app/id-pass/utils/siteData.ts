/**
 * サイトデータユーティリティ
 *
 * JSON設定ファイルからサイト・フロー情報を読み込み
 * 後方互換性のため旧形式のAPIを維持
 */

import { Site } from '../../../types/id-pass';
import {
  getAllSitesLegacy,
  getSiteLegacyByAutomationId,
  getSiteLegacyByUuid,
  getFlowsBySiteId as getFlowsBySiteIdFromConfig,
} from '../../../config';

// ============================================
// サイトデータ（JSON設定から読み込み）
// ============================================

/**
 * 対応サイト一覧
 * JSON設定ファイル（config/sites.json, config/flows.json）から自動生成
 */
export const SITES_DATA: Site[] = getAllSitesLegacy();

// ============================================
// ユーティリティ関数
// ============================================

/**
 * automationIdからサイトを取得
 */
export function getSiteByAutomationId(automationId: string): Site | undefined {
  return getSiteLegacyByAutomationId(automationId);
}

/**
 * サイトIDからサイトを取得
 */
export function getSiteById(id: string): Site | undefined {
  return getSiteLegacyByUuid(id);
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
  if (!site) return [];

  // automationIdを使用してフローを取得
  return getFlowsBySiteIdFromConfig(site.automationId).map(flow => ({
    code: flow.code,
    name: flow.name,
    isPaid: flow.isPaid || undefined,
  }));
}
