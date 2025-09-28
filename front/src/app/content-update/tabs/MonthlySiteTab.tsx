'use client';

import React from 'react';
import ContentRow from '../components/ContentRow';
import { ContentItem } from '../../../types/content-update';

const MonthlySiteTab: React.FC = () => {
  const contentItems: ContentItem[] = [
    {
      id: '1',
      editButton: {
        type: 'secondary',
        text: '編集'
      },
      timer: {
        nextTime: '08:10',
        date: '08月18日'
      },
      timerIcon: {
        color: '#f44336'
      },
      contentName: 'シティヘブンネット(直送便/プラチナメール)',
      lastUpdated: {
        date: '08月17日',
        time: '18:00'
      },
      category: {
        label: '速報',
        backgroundColor: '#e3f2fd'
      }
    },
    {
      id: '2',
      editButton: {
        type: 'secondary',
        text: '編集'
      },
      timer: {
        nextTime: '21:00',
        date: '08月17日'
      },
      timerIcon: {
        color: '#f44336'
      },
      contentName: 'ぴゅあらば(速報)',
      lastUpdated: {
        date: '08月17日',
        time: '20:00'
      },
      category: {
        label: '速報',
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

export default MonthlySiteTab;