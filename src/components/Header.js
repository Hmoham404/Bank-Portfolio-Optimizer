import React from 'react';

const Header = () => {

  return (
    <div className="header">
      {/* Formes flottantes animées */}
      <div className="floating-shapes">
        <div className="shape shape-1">📊</div>
        <div className="shape shape-2">📈</div>
        <div className="shape shape-3">💰</div>
        <div className="shape shape-4">📉</div>
        <div className="shape shape-5">🎯</div>
        <div className="shape shape-6">⚡</div>
      </div>

      {/* Conteneur principal du logo */}
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
          <div className="subtitle">
            <span className="subtitle-icon">🎯</span>
            Optimisation Avancée de Portefeuille
            <span className="subtitle-icon">⚡</span>
          </div>
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

      {/* Badge IHEC avec plus d'informations */}
      <div className="ihec-badge-container">
        <div className="ihec-badge">
          <span className="badge-icon">🎓</span>
          <span className="badge-text">IHEC Carthage - Master Analyse Financière</span>
          <span className="badge-icon">📚</span>
        </div>
        <div className="academic-info">
          <span className="info-item">
            <span className="info-icon">👨‍🏫</span>
            Enseignant: Pr. XYZ
          </span>
          <span className="info-divider">•</span>
          <span className="info-item">
            <span className="info-icon">📅</span>
            2024-2025
          </span>
        </div>
      </div>

      {/* Description améliorée */}
      <div className="header-description">
        <p className="description-text">
          <span className="description-icon">🚀</span>
          Comparez les stratégies
          <span className="highlight-markowitz"> Markowitz</span>
          <span className="separator">vs</span>
          <span className="highlight-hrp">HRP</span>
          avec des métriques en temps réel
          <span className="description-icon">✨</span>
        </p>
        <div className="description-features">
          <span className="feature-badge">
            <span className="feature-icon">📊</span>
            Analyse temps réel
          </span>
          <span className="feature-badge">
            <span className="feature-icon">🎯</span>
            Optimisation intelligente
          </span>
          <span className="feature-badge">
            <span className="feature-icon">🔍</span>
            Comparaison détaillée
          </span>
        </div>
      </div>

      {/* Statistiques améliorées */}
      <div className="header-stats">
        <div className="stat-item">
          <span className="stat-value">1952</span>
          <span className="stat-label">Naissance Markowitz</span>
          <span className="stat-subtext">Théorie moderne du portefeuille</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-value">2016</span>
          <span className="stat-label">Publication HRP</span>
          <span className="stat-subtext">Approche hiérarchique</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-value">6</span>
          <span className="stat-label">Banques analysées</span>
          <span className="stat-subtext">Données historiques complètes</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-value">Live</span>
          <span className="stat-label">Calculs temps réel</span>
          <span className="stat-subtext">Mise à jour instantanée</span>
        </div>
      </div>

      {/* Call-to-action subtil */}
      <div className="cta-section">
        <div className="cta-text">
          <span className="cta-icon">👆</span>
          Commencez par sélectionner vos banques ci-dessous
          <span className="cta-icon">👇</span>
        </div>
      </div>
    </div>
  );
};

export default Header;