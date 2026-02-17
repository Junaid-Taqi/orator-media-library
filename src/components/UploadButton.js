import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { uploadMedia } from '../Services/Slice/UploadMediaSlice';
import { getAllMedia } from '../Services/Slice/GetMediaSlice';

export default function UploadButton() {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const { uploadStatus } = useSelector((state) => state.UploadMedia);
  const user = JSON.parse(sessionStorage.getItem("liferayUser"));

  const handleUploadClick = () => {
    console.log("handleUploadClick");
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    console.log("handleFileChange");
    const files = Array.from(event.target.files);
    if (files.length > 0 && user) {
      // Prepare payload - adjusting based on slice expectations
      // The slice expects a title, we might use filename or a default
      // For multiple files, the API might handle it, or we loop.
      // The API wrapper in slice takes 'files' array.

      await dispatch(uploadMedia({
        files: files,
        groupId: user.groups[0].id,
        userId: user.userId,
        title: files[0].name // Simplified title logic
      }));

      // Refresh list after upload
      dispatch(getAllMedia({ groupId: user.groups[0].id }));
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        multiple
        onChange={handleFileChange}
      />
      <button className="upload-btn" onClick={handleUploadClick} disabled={uploadStatus === 'loading'}>
        {uploadStatus === 'loading' ? (
          <FontAwesomeIcon icon={faSpinner} spin />
        ) : (
          <FontAwesomeIcon icon={faUpload} />
        )}
        <span>{uploadStatus === 'loading' ? 'Uploading...' : 'Upload Media'}</span>
      </button>
    </>
  );
}
