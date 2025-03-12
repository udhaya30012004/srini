import React from 'react';
import './RiskCard.css'; // We can reuse the same styling

function KeyClauseCard({ clause }) {
  return (
    <div className="risk-card">
      <div 
        className="severity-indicator" 
        style={{ backgroundColor: '#2196F3' }} // Blue color for key clauses
      ></div>
      <div className="risk-content">
        <h3>{clause.title}</h3>
        <p className="severity">{clause.importance} Importance</p>
        <p className="description">{clause.description}</p>
      </div>
    </div>
  );
}

export default KeyClauseCard;