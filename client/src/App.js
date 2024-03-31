// src/App.js
import React, { useState } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import PasswordInput from './components/PasswordInput';
import ExpiryDateInput from './components/ExpiryDateInput';
import SharedLinks from './components/SharedLinks';

const App = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [password, setPassword] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [sharedLinks, setSharedLinks] = useState([]);

  const handleFileSelect = (file) => {
    setUploadedFiles([...uploadedFiles, file]);
  };

  const handleFileUpload = () => {
    uploadedFiles.forEach(file => {
      // Implement file upload logic here
      const formData = new FormData();
      formData.append('file', file);
      formData.append('password', password);
      formData.append('expiryDate', expiryDate);

      fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        console.log('File uploaded successfully:', data);
        setSharedLinks([...sharedLinks, data.link]);
      })
      .catch(error => {
        console.error('Error uploading file:', error);
        // Handle error
      });
    });
  };

  const handleSetPassword = (newPassword) => {
    setPassword(newPassword);
  };

  const handleSetExpiryDate = (newExpiryDate) => {
    setExpiryDate(newExpiryDate);
  };

  return (
    <div className="container">
      <h1 className="heading">LinkLeap - File Sharing Platform</h1>
      <div className="section">
        <FileUpload onFileSelect={handleFileSelect} onUpload={handleFileUpload} />
      </div>
      <div className="section">
        <PasswordInput onSetPassword={handleSetPassword} />
      </div>
      <div className="section">
        <ExpiryDateInput onSetExpiryDate={handleSetExpiryDate} />
      </div>
      <div className="section">
        <SharedLinks links={sharedLinks} />
      </div>
    </div>
  );
};

export default App;
