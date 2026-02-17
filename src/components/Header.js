import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  const user = JSON.parse(sessionStorage.getItem("liferayUser"));

  return (
    <header className="ml-header">
      <div className="ml-brand">
        <div className="ml-title">CITY OF SPRINGFIELD</div>
        <div className="ml-sub">Monitor your digital signage network</div>
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
