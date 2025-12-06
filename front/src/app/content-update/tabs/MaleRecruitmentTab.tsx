'use client';

import React from 'react';
import ContentRow from '../components/ContentRow';
import { getFlowItemsByPage } from '../utils/flowUtils';

const MaleRecruitmentTab: React.FC = () => {
  // JSON設定からmale-recruitmentページのフローを取得
  const flowItems = getFlowItemsByPage('male-recruitment');

  return (
    <>
      {flowItems.map((item) => (
        <ContentRow key={item.id} item={item} />
      ))}
    </>
  );
};

export default MaleRecruitmentTab;
