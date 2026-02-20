import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faImage, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { viewMedia } from '../Services/Slices/ViewMediaSlice';
import { deleteMedia } from '../Services/Slices/DeleteMediaSlice';
import { getAllMedia } from '../Services/Slices/GetMediaSlice';

export default function MediaCard({ item, user }) {
  const dispatch = useDispatch();

  // Destructure with defaults to handle API response format
  const { title, size, mimeType, uploadedDate, usedInSlidesCount, mediaId } = item;
  const isVideo = mimeType.startsWith('video');
  const thumbIcon = isVideo ? faVideo : faImage;

  const handleView = () => {
    dispatch(viewMedia({ mediaId }))
      .unwrap()
      .then(result => {
        if (result.success) {
          window.open(result.url, '_blank');
        }
      })
      .catch(err => console.error("Failed to load media URL", err));
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      await dispatch(deleteMedia({ mediaId: String(mediaId) }));
      // Refresh list
      if (user?.groups?.[0]?.id) {
        dispatch(getAllMedia({ groupId: user.groups[0].id }));
      }
    }
  };

  const formattedDate = uploadedDate ? new Date(uploadedDate).toLocaleDateString() : '';

  return (
    <article className="media-card">
      <div className="media-thumb">
        <FontAwesomeIcon icon={thumbIcon} size="2x" />
      </div>

      <div className="card-overlay">
        <div className="card-meta">
          <div className="media-name" title={title}>{title}</div>
          <div className="media-size">{Math.round(size / 1024)} KB</div>

          <div className="meta-details">
            <div className="meta-row"><span className="label">Uploaded:</span><span className="value">{formattedDate}</span></div>
            <div className="meta-row"><span className="label">Used in:</span><span className="value link">{usedInSlidesCount || 0} Slides</span></div>
          </div>
        </div>

        <div className="card-actions">
          <button className="btn-view" onClick={handleView}>
            <FontAwesomeIcon icon={faEye} />&nbsp;View
          </button>
          <button className="btn-delete" aria-label="delete" onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /></button>
        </div>
      </div>
    </article>
  );
}
