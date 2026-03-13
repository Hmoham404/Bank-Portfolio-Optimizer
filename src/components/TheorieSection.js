import React from 'react';
import { Row, Col } from 'react-bootstrap';

const TheorieSection = () => {
  return (
    <div className="section-container">
      <h2 className="section-title">
        <span className="section-icon">📚</span>
        Théorie de l'optimisation de portefeuille
      </h2>

      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h3>1952 - Harry Markowitz</h3>
            <p>Prix Nobel d'économie pour la théorie moderne du portefeuille</p>
            <div className="edu-tooltip">
              Concept clé: Frontière efficiente
              <span className="tooltip-content">
                Ensemble des portefeuilles qui offrent le meilleur rendement possible pour un niveau de risque donné
              </span>
            </div>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h3>2016 - Marcos López de Prado</h3>
            <p>Introduction du Hierarchical Risk Parity (HRP)</p>
            <div className="edu-tooltip">
              Concept clé: Clustering hiérarchique
              <span className="tooltip-content">
                Utilise le machine learning pour regrouper les actifs similaires et mieux diversifier
              </span>
            </div>
          </div>
        </div>
      </div>

      <Row className="mt-5">
        <Col md={6}>
          <div className="explain-card">
            <h3>🎯 Objectif commun</h3>
            <p>Maximiser le rendement tout en minimisant le risque à travers la diversification</p>
            <ul>
              <li>Réduire la volatilité du portefeuille</li>
              <li>Optimiser l'allocation d'actifs</li>
              <li>Protéger contre les pertes</li>
            </ul>
          </div>
        </Col>
        <Col md={6}>
          <div className="explain-card">
            <h3>⚖️ Différence fondamentale</h3>
            <p>Markowitz optimise les poids, HRP optimise la structure hiérarchique</p>
            <ul>
              <li>Markowitz: sensible aux erreurs d'estimation</li>
              <li>HRP: plus robuste et diversifié</li>
              <li>HRP: meilleure performance hors échantillon</li>
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TheorieSection;