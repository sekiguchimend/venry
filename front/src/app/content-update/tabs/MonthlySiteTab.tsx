'use client';

import React from 'react';
import ContentRow from '../components/ContentRow';
import { getFlowItemsByPagePaginated } from '../utils/flowUtils';

interface MonthlySiteTabProps {
  currentPage?: number;
  selectedGroupId?: string | null;
}

const MonthlySiteTab: React.FC<MonthlySiteTabProps> = ({ currentPage = 1, selectedGroupId = null }) => {
  // JSON設定からmonthly-siteページのフローを取得（ページネーション対応）
  const flowItems = getFlowItemsByPagePaginated('monthly-site', currentPage);

  return (
    <>
      {flowItems.map((item) => (
        <ContentRow key={item.id} item={item} />
      ))}
    </>
  );
};

export default MonthlySiteTab;
