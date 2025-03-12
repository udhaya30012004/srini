import React, { useRef } from 'react';
import { uploadContractPdf } from '../services/api';
import './FileUploader.css';

function FileUploader({ onFileLoad }) {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file');
      return;
    }

    try {
      const analysisResult = await uploadContractPdf(file);
      onFileLoad(analysisResult);
    } catch (error) {
      alert('Error processing the PDF. Please try again.');
    }
  };

  return (
    <div className="file-uploader">
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <button className="upload-btn" onClick={handleButtonClick}>
        <span className="plus-icon">+</span>
        <span>Upload Files</span>
      </button>
    </div>
  );
}

export default FileUploader;