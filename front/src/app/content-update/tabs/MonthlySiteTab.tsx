'use client';

import React from 'react';
import ContentRow from '../components/ContentRow';
import { getFlowItemsByPage } from '../utils/flowUtils';

const MonthlySiteTab: React.FC = () => {
  // JSON設定からmonthly-siteページのフローを取得
  const flowItems = getFlowItemsByPage('monthly-site');

  return (
    <>
      {flowItems.map((item) => (
        <ContentRow key={item.id} item={item} />
      ))}
    </>
  );
};

export default MonthlySiteTab;
