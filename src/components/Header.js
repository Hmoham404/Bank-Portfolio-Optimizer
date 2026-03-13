import React from 'react';

const Header = () => {
  return (
    <div className="header">
      <div className="floating-shapes">
        <div className="shape shape-1">📊</div>
        <div className="shape shape-2">📈</div>
        <div className="shape shape-3">💰</div>
        <div className="shape shape-4">📉</div>
      </div>

      <div className="logo-main-container">
        <div className="logo-circle ihec-logo-circle">
          <img 
            src="/images/logos/ihec-logo.png" 
            alt="IHEC Carthage"
            className="logo-img-large"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '📚';
            }}
          />
        </div>
        
        <div className="title-container">
          <h1 className="main-title">
            <span className="title-word">Bank</span>
            <span className="title-word">Portfolio</span>
            <span className="title-word">Optimizer</span>
          </h1>
          <div className="title-underline"></div>
        </div>

        <div className="logo-circle fc-logo-circle">
          <img 
            src="/images/logos/fc-logo.png" 
            alt="Finance Club"
            className="logo-img-large"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '💼';
            }}
          />
        </div>
      </div>

      <div className="ihec-badge-container">
        <div className="ihec-badge">
          <span className="badge-icon">🎓</span>
          <span className="badge-text">IHEC Carthage - Master Analyse Financière</span>
          <span className="badge-icon">📚</span>
        </div>
      </div>

      <div className="header-description">
        <p className="description-text">
          <span className="description-icon">🚀</span>
          Explorez la différence entre 
          <span className="highlight-markowitz"> Markowitz</span> 
          <span className="separator">vs</span> 
          <span className="highlight-hrp">HRP</span> 
          en temps réel
          <span className="description-icon">✨</span>
        </p>
      </div>

      <div className="header-stats">
        <div className="stat-item">
          <span className="stat-value">1952</span>
          <span className="stat-label">Markowitz</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-value">2016</span>
          <span className="stat-label">HRP</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-value">6</span>
          <span className="stat-label">Banques</span>
        </div>
      </div>
    </div>
  );
};

export default Header;