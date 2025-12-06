'use client';

import React from 'react';
import ContentRow from '../components/ContentRow';
import { getFlowItemsByPage } from '../utils/flowUtils';

const FemaleRecruitmentTab: React.FC = () => {
  // JSON設定からfemale-recruitmentページのフローを取得
  const flowItems = getFlowItemsByPage('female-recruitment');

  return (
    <>
      {flowItems.map((item) => (
        <ContentRow key={item.id} item={item} />
      ))}
    </>
  );
};

export default FemaleRecruitmentTab;
