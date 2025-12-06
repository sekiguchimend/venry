/**
 * フロー関連のユーティリティ関数
 */
import { getFlowsByPage, PageType, SiteConfig, FlowConfig, getTypeName } from '../../../config';
import { FlowItem, FLOW_TYPE_COLORS } from '../../../types/content-update';

/**
 * JSON設定からFlowItem形式に変換
 */
export function convertToFlowItem(
  site: SiteConfig,
  flow: FlowConfig,
  extraData?: {
    timer?: { nextTime: string; date: string };
    timerIconColor?: string;
    lastUpdated?: { date: string; time: string };
  }
): FlowItem {
  // タイプの最初の要素からカテゴリを決定
  const primaryType = flow.types[0] || 'content';
  const typeColor = FLOW_TYPE_COLORS[primaryType] || FLOW_TYPE_COLORS.content;

  return {
    id: `${site.id}-${flow.code}`,
    siteId: site.id,
    siteName: site.name,
    flowCode: flow.code,
    flowName: flow.name,
    types: flow.types,
    pages: flow.pages,
    isPaid: flow.isPaid,
    timer: extraData?.timer,
    timerIconColor: extraData?.timerIconColor,
    lastUpdated: extraData?.lastUpdated,
    category: {
      label: getTypeName(primaryType),
      backgroundColor: typeColor.bg,
    },
  };
}

/**
 * 特定ページのフローを全て取得してFlowItem形式で返す
 */
export function getFlowItemsByPage(page: PageType): FlowItem[] {
  const flowsWithSites = getFlowsByPage(page);

  return flowsWithSites.map(({ site, flow }) =>
    convertToFlowItem(site, flow)
  );
}

/**
 * 有料フローのみ取得
 */
export function getPaidFlowItems(page: PageType): FlowItem[] {
  return getFlowItemsByPage(page).filter(item => item.isPaid);
}

/**
 * 無料フローのみ取得
 */
export function getFreeFlowItems(page: PageType): FlowItem[] {
  return getFlowItemsByPage(page).filter(item => !item.isPaid);
}
