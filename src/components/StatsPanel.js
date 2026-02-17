import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faVideo, faHdd } from '@fortawesome/free-solid-svg-icons';

function formatSize(bytes) {
  if (!bytes) return '0 B';
  const units = ['B','KB','MB','GB'];
  let i=0; let s = bytes;
  while (s >= 1024 && i < units.length-1) { s /= 1024; i++; }
  return `${s.toFixed( (i===0?0:1) )} ${units[i]}`;
}

export default function StatsPanel({items=[]}){
  const total = items.length;
  const images = items.filter(i=>i.type==='image').length;
  const videos = items.filter(i=>i.type==='video').length;
  const size = items.reduce((s,i)=>s + (i.size || 0),0);

  return (
    <section className="stats-panel">
      <div className="stat-card">
        <div className="stat-label">Total Files</div>
        <div className="stat-value">{total}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Images</div>
        <div className="stat-value"><div className="stat-count">{images}</div><div className="stat-icon"><FontAwesomeIcon icon={faImage} /></div></div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Videos</div>
        <div className="stat-value"><div className="stat-count">{videos}</div><div className="stat-icon"><FontAwesomeIcon icon={faVideo} /></div></div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Total Size</div>
        <div className="stat-value"><div className="stat-count">{formatSize(size)}</div><div className="stat-icon"><FontAwesomeIcon icon={faHdd} /></div></div>
      </div>
    </section>
  );
}
