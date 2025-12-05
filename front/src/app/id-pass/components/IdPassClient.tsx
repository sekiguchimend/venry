'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { TabKey } from '../../../types/id-pass';
import { SITES_DATA } from '../utils/siteData';
import { TAB_CONFIG } from '../utils/tabConfig';
import { filterSites, paginateSites } from '../utils/pagination';
import TabNavigation from './TabNavigation';
import SearchBar from './SearchBar';
import PaginationControls from './PaginationControls';
import TableHeader from './TableHeader';
import SiteRow from './SiteRow';
import type { CredentialData } from '../actions/credentials';

interface IdPassClientProps {
  initialCredentials: CredentialData[];
}

const IdPassClient: React.FC<IdPassClientProps> = ({ initialCredentials }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [credentials, setCredentials] = useState<CredentialData[]>(initialCredentials);

  // 登録済みサイトIDを計算
  const registeredSiteIds = useMemo(() => {
    return credentials
      .filter(cred => cred.is_registered)
      .map(cred => cred.site_id);
  }, [credentials]);

  // ログインID情報をsiteIdでマッピング
  const credentialMap = useMemo(() => {
    const map: Record<string, CredentialData> = {};
    credentials.forEach(cred => {
      map[cred.site_id] = cred;
    });
    return map;
  }, [credentials]);

  const itemsPerPage = 15;

  // タブに応じてサイトをフィルタリング
  const tabFilteredSites = useMemo(() => {
    switch (activeTab) {
      case 'registered':
        return SITES_DATA.filter(site => registeredSiteIds.includes(site.id));
      case 'unregistered':
        return SITES_DATA.filter(site => !registeredSiteIds.includes(site.id));
      default:
        return SITES_DATA;
    }
  }, [activeTab, registeredSiteIds]);

  const filteredSites = useMemo(() =>
    filterSites(tabFilteredSites, searchTerm),
    [tabFilteredSites, searchTerm]
  );

  const { paginatedSites, paginationInfo } = useMemo(() =>
    paginateSites(filteredSites, currentPage, itemsPerPage),
    [filteredSites, currentPage, itemsPerPage]
  );

  // データを再取得
  const refreshData = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleRegister = useCallback((siteId: string, loginId: string) => {
    // ローカルstateを更新
    setCredentials(prev => {
      const existing = prev.find(c => c.site_id === siteId);
      if (existing) {
        return prev.map(c =>
          c.site_id === siteId
            ? { ...c, is_registered: true, login_id: loginId }
            : c
        );
      }
      return [...prev, {
        id: '',
        site_id: siteId,
        site_name: '',
        login_id: loginId,
        is_registered: true,
        status: 'active',
      }];
    });
  }, []);

  const handleUnregister = useCallback((siteId: string) => {
    setCredentials(prev =>
      prev.map(c =>
        c.site_id === siteId
          ? { ...c, is_registered: false }
          : c
      )
    );
  }, []);

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <div className="p-3 md:p-5 min-h-screen bg-gray-100">
      {/* Single Unified Card */}
      <div className="bg-white border border-gray-200 rounded overflow-hidden">
        {/* Navigation Tabs */}
        <TabNavigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
          tabs={TAB_CONFIG}
        />

        {/* Search Bar and Pagination Row */}
        <div className="p-3 md:p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between border-b border-gray-100 gap-3">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
          />

          <PaginationControls
            currentPage={paginationInfo.currentPage}
            totalPages={paginationInfo.totalPages}
            onPageChange={setCurrentPage}
            totalItems={paginationInfo.totalItems}
            itemsPerPage={paginationInfo.itemsPerPage}
          />
        </div>

        {/* Table Header */}
        <TableHeader />

        {/* Site Rows */}
        {paginatedSites.map((site) => (
          <SiteRow
            key={site.id}
            site={site}
            isRegistered={registeredSiteIds.includes(site.id)}
            onRegister={handleRegister}
            onUnregister={handleUnregister}
            activeTab={activeTab}
            initialLoginId={credentialMap[site.id]?.login_id}
            initialPassword={credentialMap[site.id]?.login_password}
            initialFlowCodes={credentialMap[site.id]?.flow_codes}
          />
        ))}
      </div>
    </div>
  );
};

export default IdPassClient;
