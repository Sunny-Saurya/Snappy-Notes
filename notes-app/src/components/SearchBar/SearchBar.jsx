import React from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

const SearchBar = ({ value, onChange, handleSearch, onClearSearch, darkMode = false }) => {
  return (
    <div className={`relative ${darkMode ? 'text-white' : 'text-gray-800'}`}>
      <div className="flex items-center">
        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search notes..."
          className={`w-full py-2 pl-10 pr-8 rounded-lg focus:outline-none ${
            darkMode 
              ? 'bg-[#1A1A1A] border border-gray-700 focus:border-purple-500 text-white' 
              : 'bg-gray-100 border border-gray-200 focus:border-blue-500'
          }`}
        />
        {value ? (
          <button
            onClick={onClearSearch}
            className={`absolute right-10 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <FiX size={18} />
          </button>
        ) : null}
        <button
          onClick={handleSearch}
          className={`absolute right-3 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <FiSearch size={18} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;