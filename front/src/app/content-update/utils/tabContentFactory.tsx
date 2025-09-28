'use client';

import React from 'react';
import { TabKey } from '../../../types/content-update';
import ContentListTab from '../tabs/ContentListTab';
import MonthlySiteTab from '../tabs/MonthlySiteTab';
import FemaleRecruitmentTab from '../tabs/FemaleRecruitmentTab';
import MaleRecruitmentTab from '../tabs/MaleRecruitmentTab';

export const getTabContent = (activeTab: TabKey): React.ReactNode => {
  switch (activeTab) {
    case 'content-list':
      return <ContentListTab />;
    case 'monthly-site':
      return <MonthlySiteTab />;
    case 'female-recruitment':
      return <FemaleRecruitmentTab />;
    case 'male-recruitment':
      return <MaleRecruitmentTab />;
    default:
      return <ContentListTab />;
  }
};

export const getItemCount = (activeTab: TabKey): string => {
  switch (activeTab) {
    case 'content-list':
      return '1-50件 / 74件中';
    case 'monthly-site':
    case 'female-recruitment':
    case 'male-recruitment':
      return '1-8件 / 8件中';
    default:
      return '1-50件 / 74件中';
  }
};

export const shouldShowGroupButtons = (activeTab: TabKey): boolean => {
  return ['monthly-site', 'female-recruitment', 'male-recruitment'].includes(activeTab);
};

export const shouldShowSecondPage = (activeTab: TabKey): boolean => {
  return activeTab === 'content-list';
};