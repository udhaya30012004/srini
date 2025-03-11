import React, { useState } from 'react';
import FileUploader from './FileUploader';
import './Home.css';

function Home({ onAnalyze }) {
  const [contractText, setContractText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTextChange = (e) => {
    setContractText(e.target.value);
  };

  const handleFileUpload = (text) => {
    setContractText(text);
  };

  const handleSubmit = () => {
    if (!contractText.trim()) {
      alert('Please enter contract text or upload a file');
      return;
    }

    setIsLoading(true);

    // Simulate API call for contract analysis
    setTimeout(() => {
      const analysis = {
        id: Date.now(),
        text: contractText,
        riskLevel: Math.floor(Math.random() * 100),
        risks: [
          { id: 1, type: 'Liability Clause', severity: 'High', description: 'Unlimited liability exposure detected' },
          { id: 2, type: 'Payment Terms', severity: 'Medium', description: 'Vague payment schedule' },
          { id: 3, type: 'Termination Clause', severity: 'Low', description: 'Missing early termination details' }
        ],
        compliance: {
          gdpr: Math.random() > 0.5,
          hipaa: Math.random() > 0.5,
          pci: Math.random() > 0.5
        }
      };

      onAnalyze(analysis);
      setIsLoading(false);
      setContractText('');
      alert('Contract analyzed successfully! View results in Dashboard.');
    }, 2000);
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Contract Risk Analysis</h1>
        <h2>AI-Powered Contract Risk & Compliance Checker</h2>
        <p className="description">
          Secure, compliant, and risk-free contracts with AI. Instantly analyze legal documents, detect 
          risks, and ensure regulatory compliance—saving time and minimizing legal exposure.
        </p>
      </div>

      <div className="analyzer-section">
        <div className="text-input-container">
          <textarea
            className="contract-text-area"
            placeholder="Enter The Text"
            value={contractText}
            onChange={handleTextChange}
          />
          <div className="upload-container">
            <FileUploader onFileLoad={handleFileUpload} />
          </div>
        </div>

        <button 
          className="submit-btn" 
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Analyzing...' : 'submit'}
        </button>
      </div>
    </div>
  );
}

export default Home;