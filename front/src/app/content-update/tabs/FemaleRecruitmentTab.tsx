'use client';

import React from 'react';
import ContentRow from '../components/ContentRow';
import { getFlowItemsByPagePaginated } from '../utils/flowUtils';

interface FemaleRecruitmentTabProps {
  currentPage?: number;
  selectedGroupId?: string | null;
}

const FemaleRecruitmentTab: React.FC<FemaleRecruitmentTabProps> = ({ currentPage = 1, selectedGroupId = null }) => {
  // JSON設定からfemale-recruitmentページのフローを取得（ページネーション対応）
  const flowItems = getFlowItemsByPagePaginated('female-recruitment', currentPage);

  return (
    <>
      {flowItems.map((item) => (
        <ContentRow key={item.id} item={item} />
      ))}
    </>
  );
};

export default FemaleRecruitmentTab;
