'use client';

import React from 'react';
import { ContentTabKey } from '../../../types/content-update';
import ContentListTab from '../tabs/ContentListTab';
import MonthlySiteTab from '../tabs/MonthlySiteTab';
import FemaleRecruitmentTab from '../tabs/FemaleRecruitmentTab';
import MaleRecruitmentTab from '../tabs/MaleRecruitmentTab';
import GroupCreateTab from '../tabs/GroupCreateTab';
import { getFlowCountByPage } from './flowUtils';
import { PageType } from '../../../config';

const ITEMS_PER_PAGE = 50;

// タブキーからページタイプへのマッピング
const tabToPageType: Record<Exclude<ContentTabKey, 'group-create'>, PageType> = {
  'content-list': 'content-list',
  'monthly-site': 'monthly-site',
  'female-recruitment': 'female-recruitment',
  'male-recruitment': 'male-recruitment',
};

export const getTabContent = (
  activeTab: ContentTabKey,
  currentPage: number = 1,
  selectedGroupId: string | null = null,
  editingGroupId: string | null = null,
  onGroupUpdated?: () => void
): React.ReactNode => {
  switch (activeTab) {
    case 'content-list':
      return <ContentListTab currentPage={currentPage} selectedGroupId={selectedGroupId} />;
    case 'monthly-site':
      return <MonthlySiteTab currentPage={currentPage} selectedGroupId={selectedGroupId} />;
    case 'female-recruitment':
      return <FemaleRecruitmentTab currentPage={currentPage} selectedGroupId={selectedGroupId} />;
    case 'male-recruitment':
      return <MaleRecruitmentTab currentPage={currentPage} selectedGroupId={selectedGroupId} />;
    case 'group-create':
      return <GroupCreateTab editingGroupId={editingGroupId} onGroupUpdated={onGroupUpdated} />;
    default:
      return <ContentListTab currentPage={currentPage} selectedGroupId={selectedGroupId} />;
  }
};

// 総件数を取得
export const getTotalCount = (activeTab: ContentTabKey): number => {
  if (activeTab === 'group-create') return 0;
  const pageType = tabToPageType[activeTab];
  return getFlowCountByPage(pageType);
};

// 表示用の件数文字列を取得
export const getItemCount = (activeTab: ContentTabKey, currentPage: number = 1): string => {
  if (activeTab === 'group-create') return '';

  const total = getTotalCount(activeTab);
  const start = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(currentPage * ITEMS_PER_PAGE, total);

  return `${start}-${end}件 / ${total}件中`;
};

// ページ数を取得
export const getTotalPages = (activeTab: ContentTabKey): number => {
  const total = getTotalCount(activeTab);
  return Math.ceil(total / ITEMS_PER_PAGE);
};

export { ITEMS_PER_PAGE };

export const shouldShowGroupButtons = (activeTab: ContentTabKey): boolean => {
  return ['monthly-site', 'female-recruitment', 'male-recruitment'].includes(activeTab);
};

export const shouldShowSecondPage = (activeTab: ContentTabKey): boolean => {
  return activeTab === 'content-list';
};