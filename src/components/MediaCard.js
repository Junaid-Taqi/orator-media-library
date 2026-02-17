import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faImage, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function MediaCard({item}){
  const {name,size,type,uploaded,usedIn} = item;
  const thumbIcon = type === 'video' ? faVideo : faImage;
  return (
    <article className="media-card">
      <div className="media-thumb"><FontAwesomeIcon icon={thumbIcon} size="3x" /></div>

      <div className="card-overlay">
        <div className="card-meta">
          <div className="media-name">{name}</div>
          <div className="media-size">{Math.round(size/1024)} KB</div>

          <div className="meta-details">
            <div className="meta-row"><span className="label">Uploaded:</span><span className="value">{uploaded}</span></div>
            <div className="meta-row"><span className="label">Used in:</span><span className="value link">{usedIn}</span></div>
          </div>
        </div>

        <div className="card-actions">
          <button className="btn-view"><FontAwesomeIcon icon={faEye} />&nbsp;View</button>
          <button className="btn-delete" aria-label="delete"><FontAwesomeIcon icon={faTrash} /></button>
        </div>
      </div>
    </article>
  );
}
