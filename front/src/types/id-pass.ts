export interface Site {
  id: number;
  name: string;
  status: 'active' | 'inactive';
  hasIssues?: boolean;
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