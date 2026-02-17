import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

export default function UploadButton() {
  return (
    <button className="upload-btn">
      <FontAwesomeIcon icon={faCloudUploadAlt} />
      <span>Upload Media</span>
    </button>
  );
}
