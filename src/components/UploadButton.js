import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

export default function UploadButton() {
  return (
    <button className="upload-btn">
      <FontAwesomeIcon icon={faUpload} />
      <span>Upload Media</span>
    </button>
  );
}
