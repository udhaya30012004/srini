import React, { useRef } from 'react';
import './FileUploader.css';

function FileUploader({ onFileLoad }) {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file');
      return;
    }

    // In a real application, you would use a PDF parsing library
    // For this example, we'll simulate reading the file
    const reader = new FileReader();
    reader.onload = (event) => {
      // In a real app, you'd use a PDF.js or similar library to extract text
      // For now, we'll just simulate extracted text
      const simulatedExtractedText = `Contract Agreement between parties A and B.
      This is a simulated text extracted from ${file.name}.
      For demonstration purposes only.`;
      
      onFileLoad(simulatedExtractedText);
    };
    reader.readAsText(file);
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