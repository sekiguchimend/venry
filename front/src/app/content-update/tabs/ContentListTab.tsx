'use client';

import React from 'react';
import ContentRow from '../components/ContentRow';
import { getFlowItemsByPage } from '../utils/flowUtils';

const ContentListTab: React.FC = () => {
  // JSON設定からcontent-listページのフローを取得
  const flowItems = getFlowItemsByPage('content-list');

  return (
    <>
      {flowItems.map((item) => (
        <ContentRow key={item.id} item={item} />
      ))}
    </>
  );
};

export default ContentListTab;
