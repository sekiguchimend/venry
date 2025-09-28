'use client';

import React, { useState, useMemo } from 'react';
import { TabKey } from '../../types/id-pass';
import { SITES_DATA } from './utils/siteData';
import { TAB_CONFIG } from './utils/tabConfig';
import { filterSites, paginateSites } from './utils/pagination';
import TabNavigation from './components/TabNavigation';
import SearchBar from './components/SearchBar';
import PaginationControls from './components/PaginationControls';
import TableHeader from './components/TableHeader';
import SiteRow from './components/SiteRow';

const IdPassPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 15;

  const filteredSites = useMemo(() =>
    filterSites(SITES_DATA, searchTerm),
    [searchTerm]
  );

  const { paginatedSites, paginationInfo } = useMemo(() =>
    paginateSites(filteredSites, currentPage, itemsPerPage),
    [filteredSites, currentPage, itemsPerPage]
  );

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <div style={{
      padding: '20px',
      minHeight: '100vh'
    }}>
      {/* Single Unified Card */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        {/* Navigation Tabs */}
        <TabNavigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
          tabs={TAB_CONFIG}
        />

        {/* Search Bar and Pagination Row */}
        <div style={{
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #f0f0f0'
        }}>
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
          <SiteRow key={site.id} site={site} />
        ))}
      </div>
    </div>
  );
};

export default IdPassPage;