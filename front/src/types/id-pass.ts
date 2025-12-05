export interface SiteFlow {
  code: string;
  name: string;
  description?: string;
  isPaid?: boolean;
}

export interface Site {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  hasIssues?: boolean;
  automationId: string;
  flows: SiteFlow[];
}

export type TabKey = 'all' | 'registered' | 'unregistered';

export interface TabItem {
  key: TabKey;
  label: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
}