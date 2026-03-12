import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from '../Services/Localization/Localization';

export default function Header({ user }) {
  const t = useTranslation();
  return (
    <header className="ml-header">
      <div className="ml-brand">
        <div className="ml-title">{t('cityOfSpringfield')}</div>
        <div className="ml-sub">{t('monitorSignage')}</div>
      </div>
      <div className="ml-actions">
        <button className="icon-btn bell" aria-label="notifications">
          <FontAwesomeIcon icon={faBell} />
        </button>
        <div className="ml-user">
          <div className="ml-user-name">{user?.fullName}</div>
          <div className="ml-user-email">{user?.email}</div>
        </div>
        <div className="avatar"><FontAwesomeIcon icon={faUser} /></div>
      </div>
    </header>
  );
}
