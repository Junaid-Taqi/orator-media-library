import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {  useTranslation } from '../Services/Localization/Localization';


export default function SearchBar({ searchTerm, onSearch }) {
const { t } = useTranslation();
  return (
    <div className="search-row">
      <div className="search-input-wrap">
        <FontAwesomeIcon className="search-icon" icon={faSearch} />
        <input
          className="search-input"
          placeholder={t('searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
