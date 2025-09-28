'use client';

import React from 'react';
import ContentRow from '../components/ContentRow';
import { ContentItem } from '../../../types/content-update';

const ContentListTab: React.FC = () => {
  const contentItems: ContentItem[] = [
    {
      id: '1',
      editButton: {
        type: 'primary',
        text: '編集'
      },
      timer: {
        nextTime: '21:35',
        date: '08月17日'
      },
      timerIcon: {
        color: '#f44336'
      },
      contentName: 'HIME CHANNEL(店舗詳細)',
      lastUpdated: {
        date: '08月17日',
        time: '20:35'
      },
      category: {
        label: 'その他',
        backgroundColor: '#fff3e0'
      }
    },
    {
      id: '2',
      editButton: {
        type: 'secondary',
        text: '編集'
      },
      timer: {
        nextTime: '22:00',
        date: '08月18日'
      },
      timerIcon: {
        color: '#4caf50'
      },
      contentName: '求人情報サイト(トップページ)',
      lastUpdated: {
        date: '08月18日',
        time: '15:30'
      },
      category: {
        label: '求人',
        backgroundColor: '#e3f2fd'
      }
    },
    {
      id: '3',
      editButton: {
        type: 'secondary',
        text: '編集'
      },
      timer: {
        nextTime: '09:00',
        date: '08月19日'
      },
      timerIcon: {
        color: '#ff9800'
      },
      contentName: 'キャンペーン告知(特設ページ)',
      lastUpdated: {
        date: '08月19日',
        time: '08:00'
      },
      category: {
        label: '特集',
        backgroundColor: '#f3e5f5'
      }
    },
    {
      id: '4',
      editButton: {
        type: 'secondary',
        text: '編集'
      },
      timer: {
        nextTime: '12:30',
        date: '08月20日'
      },
      timerIcon: {
        color: '#2196f3'
      },
      contentName: 'イベント情報(月間スケジュール)',
      lastUpdated: {
        date: '08月20日',
        time: '11:00'
      },
      category: {
        label: 'イベント',
        backgroundColor: '#e8f5e9'
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

export default ContentListTab;