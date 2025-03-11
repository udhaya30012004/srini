import React from 'react';
import RiskCard from './RiskCard';
import ComplianceCard from './ComplianceCard';
import './Dashboard.css';

function Dashboard({ contracts }) {
  if (contracts.length === 0) {
    return (
      <div className="dashboard-container empty-dashboard">
        <h1>Dashboard</h1>
        <p>No contracts analyzed yet. Go to the home page to analyze a contract.</p>
      </div>
    );
  }

  // Use the most recently analyzed contract
  const latestContract = contracts[contracts.length - 1];

  return (
    <div className="dashboard-container">
      <h1>Contract Analysis Dashboard</h1>
      
      <div className="dashboard-summary">
        <div className="summary-card">
          <h3>Risk Level</h3>
          <div className="risk-meter">
            <div 
              className="risk-indicator" 
              style={{ width: `${latestContract.riskLevel}%`, backgroundColor: getRiskColor(latestContract.riskLevel) }}
            ></div>
          </div>
          <p className="risk-percentage">{latestContract.riskLevel}%</p>
          <p className="risk-label">{getRiskLabel(latestContract.riskLevel)}</p>
        </div>
        
        <div className="summary-card">
          <h3>Total Issues Found</h3>
          <p className="issue-count">{latestContract.risks.length}</p>
        </div>
        
        <div className="summary-card">
          <h3>Compliance Status</h3>
          <div className="compliance-icons">
            <span className={`compliance-icon ${latestContract.compliance.gdpr ? 'compliant' : 'non-compliant'}`}>
              GDPR
            </span>
            <span className={`compliance-icon ${latestContract.compliance.hipaa ? 'compliant' : 'non-compliant'}`}>
              HIPAA
            </span>
            <span className={`compliance-icon ${latestContract.compliance.pci ? 'compliant' : 'non-compliant'}`}>
              PCI
            </span>
          </div>
        </div>
      </div>

      <div className="dashboard-details">
        <div className="risks-section">
          <h2>Risk Assessment</h2>
          {latestContract.risks.map(risk => (
            <RiskCard key={risk.id} risk={risk} />
          ))}
        </div>

        <div className="compliance-section">
          <h2>Compliance Details</h2>
          <ComplianceCard compliance={latestContract.compliance} />
        </div>
      </div>
    </div>
  );
}

function getRiskColor(level) {
  if (level < 30) return '#4CAF50'; // Green for low risk
  if (level < 70) return '#FFC107'; // Yellow for medium risk
  return '#F44336'; // Red for high risk
}

function getRiskLabel(level) {
  if (level < 30) return 'Low Risk';
  if (level < 70) return 'Medium Risk';
  return 'High Risk';
}

export default Dashboard;