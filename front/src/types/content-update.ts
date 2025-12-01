export interface ContentItem {
  id: string;
  editButton: {
    type: 'primary' | 'secondary';
    text: string;
  };
  timer: {
    nextTime: string;
    date: string;
  };
  timerIcon: {
    color: string;
  };
  contentName: string;
  lastUpdated: {
    date: string;
    time: string;
  };
  category: {
    label: string;
    backgroundColor: string;
  };
}

export type TabKey = 'content-list' | 'monthly-site' | 'female-recruitment' | 'male-recruitment' | 'group-create';

export interface TabItem {
  key: TabKey;
  label: string;
}