import React, { useEffect, useState } from 'react';
import RiskCard from './RiskCard';
import OpportunityCard from './OpportunityCard';
import KeyClauseCard from './KeyClauseCard';
import ComplianceCard from './ComplianceCard';
import './Dashboard.css';

function Dashboard() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/contracts');
        if (!response.ok) {
          throw new Error('Failed to fetch contracts');
        }
        const data = await response.json();
        setContracts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, []);

  const safeContracts = contracts || [];

  if (loading) {
    return (
      <div className="dashboard-container">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (safeContracts.length === 0) {
    return (
      <div className="dashboard-container empty-dashboard">
        <h1>Dashboard</h1>
        <p>No contracts analyzed yet. Go to the home page to analyze a contract.</p>
      </div>
    );
  }

  const latestContract = safeContracts[safeContracts.length - 1];

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
          <h3>Opportunity Level</h3>
          <div className="opportunity-meter">
            <div 
              className="opportunity-indicator" 
              style={{ width: `${latestContract.opportunityLevel}%`, backgroundColor: getOpportunityColor(latestContract.opportunityLevel) }}
            ></div>
          </div>
          <p className="opportunity-percentage">{latestContract.opportunityLevel}%</p>
          <p className="opportunity-label">{getOpportunityLabel(latestContract.opportunityLevel)}</p>
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

        <div className="opportunities-section">
          <h2>Opportunities</h2>
          {latestContract.opportunities.map(opportunity => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>

        <div className="key-clauses-section">
          <h2>Key Clauses</h2>
          {latestContract.keyClauses.map(keyClause => (
            <KeyClauseCard key={keyClause.id} keyClause={keyClause} />
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

function getOpportunityColor(level) {
  if (level < 30) return '#F44336'; // Red for low opportunity
  if (level < 70) return '#FFC107'; // Yellow for medium opportunity
  return '#4CAF50'; // Green for high opportunity
}

function getOpportunityLabel(level) {
  if (level < 30) return 'Low Opportunity';
  if (level < 70) return 'Medium Opportunity';
  return 'High Opportunity';
}

export default Dashboard;