/**
 * 設定ファイルローダー
 *
 * サイト・フロー定義をJSONから読み込み、型安全なアクセスを提供
 */

import sitesConfig from './sites.json';
import flowsConfig from './flows.json';

// ============================================
// 型定義
// ============================================

export interface SiteConfig {
  id: string;
  uuid: string;
  name: string;
  category: string;
  isActive: boolean;
}

export interface FlowConfig {
  code: string;
  name: string;
  types: string[];
  pages: string[];
  isPaid: boolean;
  isActive: boolean;
}

export interface FlowStep {
  action: 'navigate' | 'click' | 'input' | 'upload' | 'wait' | 'waitTime' | 'select' | 'screenshot' | 'condition' | 'loop';
  selector?: string;
  url?: string;
  value?: string;
  file?: string;
  timeout?: number;
  ms?: number;
  path?: string;
  _comment?: string;
}

export interface FlowStepConfig {
  name: string;
  loginUrl: string;
  description?: string;
  isBulkUpdate?: boolean;
  steps: FlowStep[];
}

// フロータイプ定義
export type FlowType =
  | 'photo_diary'
  | 'sokuhime'
  | 'news'
  | 'coupon'
  | 'ranking_up'
  | 'recruit_female'
  | 'recruit_male'
  | 'bulk_update'
  | 'video'
  | 'direct_mail'
  | 'event'
  | 'blog'
  | 'standby'
  | 'pickup'
  | 'content';

// ページタイプ定義
export type PageType =
  | 'content-list'
  | 'monthly-site'
  | 'female-recruitment'
  | 'male-recruitment'
  | 'group-create';

// ============================================
// 型付きデータ
// ============================================

const sites: SiteConfig[] = sitesConfig.sites as SiteConfig[];
const flows: Record<string, FlowConfig[]> = flowsConfig.flows as Record<string, FlowConfig[]>;

// タイプとページの定義を取得
const flowTypes = (flowsConfig as { _types: Record<string, string> })._types;
const flowPages = (flowsConfig as { _pages: Record<string, string> })._pages;

// ============================================
// サイト関連ユーティリティ
// ============================================

/**
 * 全サイト一覧を取得
 */
export function getAllSites(): SiteConfig[] {
  return sites.filter(site => site.isActive);
}

/**
 * サイトIDからサイトを取得
 */
export function getSiteById(siteId: string): SiteConfig | undefined {
  return sites.find(site => site.id === siteId);
}

/**
 * UUIDからサイトを取得
 */
export function getSiteByUuid(uuid: string): SiteConfig | undefined {
  return sites.find(site => site.uuid === uuid);
}

/**
 * カテゴリでサイトをフィルタ
 */
export function getSitesByCategory(category: string): SiteConfig[] {
  return sites.filter(site => site.category === category && site.isActive);
}

/**
 * 全サイトIDを取得
 */
export function getAllSiteIds(): string[] {
  return sites.filter(site => site.isActive).map(site => site.id);
}

// ============================================
// フロー関連ユーティリティ
// ============================================

/**
 * サイトのフロー一覧を取得
 */
export function getFlowsBySiteId(siteId: string): FlowConfig[] {
  const siteFlows = flows[siteId];
  if (!siteFlows) return [];
  return siteFlows.filter(flow => flow.isActive);
}

/**
 * 特定のフローを取得
 */
export function getFlow(siteId: string, flowCode: string): FlowConfig | undefined {
  const siteFlows = flows[siteId];
  if (!siteFlows) return undefined;
  return siteFlows.find(flow => flow.code === flowCode);
}

/**
 * 有料フローのみ取得
 */
export function getPaidFlows(siteId: string): FlowConfig[] {
  return getFlowsBySiteId(siteId).filter(flow => flow.isPaid);
}

/**
 * 無料フローのみ取得
 */
export function getFreeFlows(siteId: string): FlowConfig[] {
  return getFlowsBySiteId(siteId).filter(flow => !flow.isPaid);
}

// ============================================
// ページ別フロー取得
// ============================================

/**
 * 特定ページに表示するフローを全サイトから取得
 */
export function getFlowsByPage(page: PageType): Array<{ site: SiteConfig; flow: FlowConfig }> {
  const result: Array<{ site: SiteConfig; flow: FlowConfig }> = [];

  for (const site of getAllSites()) {
    const siteFlows = getFlowsBySiteId(site.id);
    for (const flow of siteFlows) {
      if (flow.pages.includes(page)) {
        result.push({ site, flow });
      }
    }
  }

  return result;
}

/**
 * 特定タイプのフローを全サイトから取得
 */
export function getFlowsByType(type: FlowType): Array<{ site: SiteConfig; flow: FlowConfig }> {
  const result: Array<{ site: SiteConfig; flow: FlowConfig }> = [];

  for (const site of getAllSites()) {
    const siteFlows = getFlowsBySiteId(site.id);
    for (const flow of siteFlows) {
      if (flow.types.includes(type)) {
        result.push({ site, flow });
      }
    }
  }

  return result;
}

/**
 * ページとタイプの両方でフィルタリング
 */
export function getFlowsByPageAndType(
  page: PageType,
  type: FlowType
): Array<{ site: SiteConfig; flow: FlowConfig }> {
  const result: Array<{ site: SiteConfig; flow: FlowConfig }> = [];

  for (const site of getAllSites()) {
    const siteFlows = getFlowsBySiteId(site.id);
    for (const flow of siteFlows) {
      if (flow.pages.includes(page) && flow.types.includes(type)) {
        result.push({ site, flow });
      }
    }
  }

  return result;
}

/**
 * サイトIDとページでフローを取得
 */
export function getSiteFlowsByPage(siteId: string, page: PageType): FlowConfig[] {
  return getFlowsBySiteId(siteId).filter(flow => flow.pages.includes(page));
}

/**
 * サイトIDとタイプでフローを取得
 */
export function getSiteFlowsByType(siteId: string, type: FlowType): FlowConfig[] {
  return getFlowsBySiteId(siteId).filter(flow => flow.types.includes(type));
}

// ============================================
// タイプ・ページ定義の取得
// ============================================

/**
 * 全フロータイプを取得
 */
export function getAllFlowTypes(): Record<string, string> {
  return flowTypes;
}

/**
 * 全ページタイプを取得
 */
export function getAllPageTypes(): Record<string, string> {
  return flowPages;
}

/**
 * タイプの表示名を取得
 */
export function getTypeName(type: string): string {
  return flowTypes[type] || type;
}

/**
 * ページの表示名を取得
 */
export function getPageName(page: string): string {
  return flowPages[page] || page;
}

// ============================================
// 旧形式との互換性（Site型変換）
// ============================================

/**
 * 旧Site型形式でサイトデータを取得（後方互換性用）
 */
export interface LegacySite {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  automationId: string;
  flows: Array<{
    code: string;
    name: string;
    types?: string[];
    pages?: string[];
    isPaid?: boolean;
  }>;
}

export function getAllSitesLegacy(): LegacySite[] {
  return sites
    .filter(site => site.isActive)
    .map(site => ({
      id: site.uuid,
      name: site.name,
      status: 'active' as const,
      automationId: site.id,
      flows: getFlowsBySiteId(site.id).map(flow => ({
        code: flow.code,
        name: flow.name,
        types: flow.types,
        pages: flow.pages,
        isPaid: flow.isPaid || undefined,
      })),
    }));
}

export function getSiteLegacyByAutomationId(automationId: string): LegacySite | undefined {
  const site = getSiteById(automationId);
  if (!site) return undefined;

  return {
    id: site.uuid,
    name: site.name,
    status: 'active',
    automationId: site.id,
    flows: getFlowsBySiteId(site.id).map(flow => ({
      code: flow.code,
      name: flow.name,
      types: flow.types,
      pages: flow.pages,
      isPaid: flow.isPaid || undefined,
    })),
  };
}

export function getSiteLegacyByUuid(uuid: string): LegacySite | undefined {
  const site = getSiteByUuid(uuid);
  if (!site) return undefined;

  return {
    id: site.uuid,
    name: site.name,
    status: 'active',
    automationId: site.id,
    flows: getFlowsBySiteId(site.id).map(flow => ({
      code: flow.code,
      name: flow.name,
      types: flow.types,
      pages: flow.pages,
      isPaid: flow.isPaid || undefined,
    })),
  };
}

// ============================================
// エクスポート
// ============================================

export { sites, flows, flowTypes, flowPages };

// デフォルトエクスポート
export default {
  sites,
  flows,
  flowTypes,
  flowPages,
  getAllSites,
  getSiteById,
  getSiteByUuid,
  getSitesByCategory,
  getAllSiteIds,
  getFlowsBySiteId,
  getFlow,
  getPaidFlows,
  getFreeFlows,
  getFlowsByPage,
  getFlowsByType,
  getFlowsByPageAndType,
  getSiteFlowsByPage,
  getSiteFlowsByType,
  getAllFlowTypes,
  getAllPageTypes,
  getTypeName,
  getPageName,
  getAllSitesLegacy,
  getSiteLegacyByAutomationId,
  getSiteLegacyByUuid,
};
