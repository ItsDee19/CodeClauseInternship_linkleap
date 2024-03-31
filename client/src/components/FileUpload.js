import React, { useState } from 'react';
import './FileUpload.css';

const FileUpload = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [isReadyToUpload, setIsReadyToUpload] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setSelectedFileName(file.name);
    setIsReadyToUpload(true); // File is chosen, enable upload button
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      onUpload(formData);
      setSelectedFile(null);
      setSelectedFileName('');
      setIsReadyToUpload(false); // Reset readiness after upload
    } else {
      alert('Please select a file to upload.');
    }
  };

  return (
    <div className="file-upload">
      <input type="file" id="file" onChange={handleFileSelect} />
      <label htmlFor="file">Choose File</label>
      <span>{selectedFileName}</span>
      <button disabled={!isReadyToUpload} onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
