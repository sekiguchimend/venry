'use client';

import React from 'react';
import ContentRow from '../components/ContentRow';
import { ContentItem } from '../../../types/content-update';

const FemaleRecruitmentTab: React.FC = () => {
  const contentItems: ContentItem[] = [
    {
      id: '1',
      editButton: {
        type: 'secondary',
        text: '編集'
      },
      timer: {
        nextTime: '21:11',
        date: '08月17日'
      },
      timerIcon: {
        color: '#f44336'
      },
      contentName: 'ガールズヘブン(お店様募集完了順アップ)',
      lastUpdated: {
        date: '08月17日',
        time: '20:11'
      },
      category: {
        label: '上位化',
        backgroundColor: '#ffebee'
      }
    }
  ];

  return (
    <>
      {contentItems.map((item) => (
        <ContentRow key={item.id} item={item} />
      ))}
    </>
  );
};

export default FemaleRecruitmentTab;