import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUploader from './FileUploader';
import { analyzeContractText } from '../services/api';
import './Home.css';

function Home({ onAnalyze }) {
  const [contractText, setContractText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleTextChange = (e) => {
    setContractText(e.target.value);
  };

  const handleFileUpload = (analysisResult) => {
    onAnalyze(analysisResult);
    navigate('/dashboard');
  };

  const handleSubmit = async () => {
    if (!contractText.trim()) {
      alert('Please enter contract text or upload a file');
      return;
    }

    setIsLoading(true);

    try {
      const analysisResult = await analyzeContractText(contractText);
      onAnalyze(analysisResult);
      setIsLoading(false);
      setContractText('');
      navigate('/dashboard');
    } catch (error) {
      setIsLoading(false);
      alert('Error analyzing the contract. Please try again.');
    }
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