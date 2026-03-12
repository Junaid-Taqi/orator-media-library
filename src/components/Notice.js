import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import {  useTranslation } from '../Services/Localization/Localization';


export default function Notice(){
const { t } = useTranslation();
  return (
    <div className="notice">
      <div className="notice-icon"><FontAwesomeIcon icon={faInfoCircle} /></div>
      <div className="notice-body">
        <div className="notice-title">{t('mediaStorage')}</div>
        <div className="notice-desc">{t('FileStored')}</div>
      </div>
    </div>
  );
}
