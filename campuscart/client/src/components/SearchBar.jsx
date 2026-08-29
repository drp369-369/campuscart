import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ onSearch, initialValue = '', placeholder = 'Search textbooks, electronics, calculators...' }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="search-container" role="search">
      <Search size={18} color="#94A3B8" />
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        id="marketplace-search-input"
      />
      {searchTerm && (
        <button
          type="button"
          onClick={handleClear}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '0.25rem', color: '#94A3B8' }}
          title="Clear search"
        >
          <X size={16} />
        </button>
      )}
      <button
        type="submit"
        className="btn btn-primary btn-sm"
        id="marketplace-search-btn"
        style={{ marginLeft: '0.25rem' }}
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
