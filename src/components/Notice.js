import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

export default function Notice(){
  return (
    <div className="notice">
      <div className="notice-icon"><FontAwesomeIcon icon={faInfoCircle} /></div>
      <div className="notice-body">
        <div className="notice-title">Media Library is Storage Only</div>
        <div className="notice-desc">Files stored here cannot be scheduled directly. To display media on screens, you must first create a <strong>Slide</strong> (Fullscreen or Template) and assign the media to it. Then add the Slide to a Content Pool and Timeline.</div>
      </div>
    </div>
  );
}
