import React from 'react';

const Navigation = ({ activeSection, onSectionChange }) => {
  const sections = [
    { id: 'theorie', label: 'Théorie', icon: '📚' },
    { id: 'markowitz', label: 'Markowitz', icon: '📊' },
    { id: 'hrp', label: 'HRP', icon: '🌲' },
    { id: 'comparaison', label: 'Comparaison', icon: '⚖️' },
    { id: 'covid', label: 'COVID-19', icon: '🦠' },
    { id: 'selection', label: 'Banques', icon: '🏦' }
  ];

  return (
    <div className="nav-container">
      {sections.map(section => (
        <div
          key={section.id}
          className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
          onClick={() => onSectionChange(section.id)}
        >
          <span className="nav-icon">{section.icon}</span>
          <span className="nav-label">{section.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Navigation;