'use client';

import React, { useState } from 'react';
import WomenList from '../../components/WomenList';
import { WomanItem } from '../../types/women-list';

const GirlListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data matching the screenshot
  const sampleWomen: WomanItem[] = [
    {
      id: '1',
      profileImage: '/images/women/woman1.jpg', // placeholder
      name: '瑞穂-ruri-',
      age: 24,
      isNewcomer: true,
      measurements: {
        height: 165,
        bust: 86,
        waist: 57,
        hip: 84
      },
      registrationDate: '2020/9/9',
      isPublic: true
    },
    {
      id: '2',
      profileImage: '/images/women/woman2.jpg', // placeholder
      name: '彩羽-ayaha-',
      age: 24,
      isNewcomer: true,
      measurements: {
        height: 153,
        bust: 82,
        waist: 56,
        hip: 81
      },
      registrationDate: '2021/8/13',
      isPublic: true
    }
  ];

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    // Here you would typically filter the data or trigger an API call
  };

  const handlePageChange = (page: number) => {
    // Handle pagination
    console.log('Page changed to:', page);
  };

  return (
    <div style={{
      padding: '20px',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <WomenList
        items={sampleWomen}
        searchTerm={searchTerm}
        onSearch={handleSearch}
        totalCount={282}
        currentPage={1}
        totalPages={4}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default GirlListPage;