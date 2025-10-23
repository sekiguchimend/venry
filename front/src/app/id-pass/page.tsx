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
    <div className="p-3 md:p-5 min-h-screen bg-gray-100">
      {/* Single Unified Card */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
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
          <SiteRow key={site.id} site={site} />
        ))}
      </div>
    </div>
  );
};

export default IdPassPage;