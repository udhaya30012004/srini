import React from 'react';
import './RiskCard.css'; // We can reuse the same styling

function OpportunityCard({ opportunity }) {
  return (
    <div className="risk-card">
      <div 
        className="severity-indicator" 
        style={{ backgroundColor: '#4CAF50' }} // Green color for opportunities
      ></div>
      <div className="risk-content">
        <h3>{opportunity.type}</h3>
        <p className="severity">{opportunity.benefit} Benefit</p>
        <p className="description">{opportunity.description}</p>
      </div>
    </div>
  );
}

export default OpportunityCard;