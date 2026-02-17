import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar({ searchTerm, onSearch }) {
  return (
    <div className="search-row">
      <div className="search-input-wrap">
        <FontAwesomeIcon className="search-icon" icon={faSearch} />
        <input
          className="search-input"
          placeholder="Search media files..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
