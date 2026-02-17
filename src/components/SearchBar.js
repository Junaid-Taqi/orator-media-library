import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar(){
  return (
    <div className="search-row">
      <div className="search-input-wrap">
        <FontAwesomeIcon className="search-icon" icon={faSearch} />
        <input className="search-input" placeholder="Search media files..." />
      </div>
    </div>
  );
}
