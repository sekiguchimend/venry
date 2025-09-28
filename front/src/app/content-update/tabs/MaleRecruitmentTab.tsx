'use client';

import React from 'react';
import ContentRow from '../components/ContentRow';
import { ContentItem } from '../../../types/content-update';

const MaleRecruitmentTab: React.FC = () => {
  const contentItems: ContentItem[] = [
    {
      id: '1',
      editButton: {
        type: 'secondary',
        text: '編集'
      },
      timer: {
        nextTime: '21:15',
        date: '08月17日'
      },
      timerIcon: {
        color: '#f44336'
      },
      contentName: 'メンズヘブン(お店様募集完了順アップ)',
      lastUpdated: {
        date: '08月17日',
        time: '20:15'
      },
      category: {
        label: '上位化',
        backgroundColor: '#e3f2fd'
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

export default MaleRecruitmentTab;