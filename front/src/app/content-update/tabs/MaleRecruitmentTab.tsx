'use client';

import React from 'react';
import ContentRow from '../components/ContentRow';
import { getFlowItemsByPagePaginated } from '../utils/flowUtils';

interface MaleRecruitmentTabProps {
  currentPage?: number;
  selectedGroupId?: string | null;
}

const MaleRecruitmentTab: React.FC<MaleRecruitmentTabProps> = ({ currentPage = 1, selectedGroupId = null }) => {
  // JSON設定からmale-recruitmentページのフローを取得（ページネーション対応）
  const flowItems = getFlowItemsByPagePaginated('male-recruitment', currentPage);

  return (
    <>
      {flowItems.map((item) => (
        <ContentRow key={item.id} item={item} />
      ))}
    </>
  );
};

export default MaleRecruitmentTab;
