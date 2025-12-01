'use client';

import React from 'react';
import ContentRow from '../components/ContentRow';
import contentData from '../data/contentData.json';

const ContentListTab: React.FC = () => {
  return (
    <>
      {contentData.contentList.map((item) => (
        <ContentRow key={item.id} item={item} />
      ))}
    </>
  );
};

export default ContentListTab;