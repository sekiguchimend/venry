import React from 'react';
import { Search, Settings } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative w-full md:w-[300px]">
      <Search
        size={16}
        className="md:w-[18px] md:h-[18px] absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
      />
      <input
        type="text"
        placeholder="サイト名・URLで検索"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full py-2 pr-10 pl-10 border border-gray-200 rounded-full text-xs md:text-sm outline-none transition-colors focus:border-blue-700"
      />
      <Settings
        size={16}
        className="md:w-[18px] md:h-[18px] absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
      />
    </div>
  );
};

export default SearchBar;