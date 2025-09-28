import React from 'react';
import { Search, Settings } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div style={{
      position: 'relative',
      width: '300px'
    }}>
      <Search
        size={18}
        style={{
          position: 'absolute',
          left: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#666'
        }}
      />
      <input
        type="text"
        placeholder="サイト名・URLで検索"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{
          width: '100%',
          padding: '8px 40px 8px 40px',
          border: '1px solid #e0e0e0',
          borderRadius: '20px',
          fontSize: '14px',
          outline: 'none',
          transition: 'border-color 0.2s ease'
        }}
        onFocus={(e) => e.target.style.borderColor = '#1976d2'}
        onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
      />
      <Settings
        size={18}
        style={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#666',
          cursor: 'pointer'
        }}
      />
    </div>
  );
};

export default SearchBar;