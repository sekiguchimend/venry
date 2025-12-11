'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { TabKey, Site } from '../../../types/id-pass';
import { SITES_DATA } from '../utils/siteData';
import { TAB_CONFIG } from '../utils/tabConfig';
import { filterSites, paginateSites } from '../utils/pagination';
import TabNavigation from './TabNavigation';
import SearchBar from './SearchBar';
import PaginationControls from './PaginationControls';
import TableHeader from './TableHeader';
import SiteRow from './SiteRow';
import type { CredentialData } from '../actions/credentials';

interface ApiSite {
  id: string;
  name: string;
  site_url: string;
  site_type: string;
  automation_id: string;
  is_active: boolean;
  description: string;
  created_at: string;
  updated_at: string;
}

interface IdPassClientProps {
  initialCredentials: CredentialData[];
  initialSites?: ApiSite[];
}

const IdPassClient: React.FC<IdPassClientProps> = ({ initialCredentials, initialSites = [] }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [credentials, setCredentials] = useState<CredentialData[]>(initialCredentials);

  // 登録済みサイトIDを計算
  // バックエンドAPIは既にis_registered=trueでフィルタリングしているため、
  // 取得された認証情報は全て登録済みとして扱う
  const registeredSiteIds = useMemo(() => {
    return credentials.map(cred => cred.site_id);
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

  // データベースから取得したサイト情報を優先し、JSON設定ファイルの情報とマージ
  const allSites = useMemo(() => {
    const sitesMap = new Map<string, Site>();
    
    // まずバックエンドAPIから取得したサイト情報を追加（データベースの情報を優先）
    initialSites.forEach(apiSite => {
      // JSON設定から対応するサイトを探してフロー情報を取得
      const configSite = SITES_DATA.find(s => s.id === apiSite.id || s.automationId === apiSite.automation_id);
      
      sitesMap.set(apiSite.id, {
        id: apiSite.id,
        name: apiSite.name,
        status: apiSite.is_active ? 'active' : 'inactive',
        automationId: apiSite.automation_id,
        flows: configSite?.flows || [],
      });
    });
    
    // JSON設定ファイルのサイトで、データベースに存在しないものを追加
    SITES_DATA.forEach(site => {
      if (!sitesMap.has(site.id)) {
        sitesMap.set(site.id, site);
      }
    });
    
    // 認証情報から取得したサイトで、まだ存在しないものを追加（フォールバック）
    credentials.forEach(cred => {
      if (!sitesMap.has(cred.site_id) && cred.site_id) {
        sitesMap.set(cred.site_id, {
          id: cred.site_id,
          name: cred.site_name || '不明なサイト',
          status: cred.status === 'active' ? 'active' : 'inactive',
          automationId: cred.site_automation_id || '',
          flows: [],
        });
      }
    });
    
    return Array.from(sitesMap.values());
  }, [initialSites, credentials]);

  // タブに応じてサイトをフィルタリング
  const tabFilteredSites = useMemo(() => {
    switch (activeTab) {
      case 'registered':
        return allSites.filter(site => registeredSiteIds.includes(site.id));
      case 'unregistered':
        return allSites.filter(site => !registeredSiteIds.includes(site.id));
      default:
        return allSites;
    }
  }, [activeTab, registeredSiteIds, allSites]);

  const filteredSites = useMemo(() =>
    filterSites(tabFilteredSites, searchTerm),
    [tabFilteredSites, searchTerm]
  );

  const { paginatedSites, paginationInfo } = useMemo(() =>
    paginateSites(filteredSites, currentPage, itemsPerPage),
    [filteredSites, currentPage, itemsPerPage]
  );

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
