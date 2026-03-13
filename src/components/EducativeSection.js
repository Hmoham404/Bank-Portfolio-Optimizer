import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';  // Vérifier que ces imports sont présents

const EducativeSection = () => {
  return (
    <div className="educative-section">
      <h2 className="educative-title">
        <span className="educative-icon">🎓</span>
        Comprendre l'optimisation de portefeuille
        <span className="educative-icon">📚</span>
      </h2>
      
      <Row>
        <Col md={6}>
          <Card className="educative-card">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <span className="educative-icon">📊</span>
                <h4 className="mb-0">Markowitz (1952)</h4>
              </div>
              <p className="text-muted">
                <strong>La théorie moderne du portefeuille</strong> - Cherche le meilleur compromis 
                entre risque et rendement.
              </p>
              <ul className="list-unstyled">
                <li className="mb-2">✓ <span className="edu-tooltip">
                  Frontière efficiente
                  <span className="tooltip-text">Ensemble des portefeuilles optimaux qui maximisent le rendement pour un niveau de risque donné</span>
                </span></li>
                <li className="mb-2">✓ <span className="edu-tooltip">
                  Diversification
                  <span className="tooltip-text">"Ne mettez pas tous vos œufs dans le même panier" - Réduire le risque en combinant des actifs</span>
                </span></li>
                <li className="mb-2">✓ <span className="edu-tooltip">
                  Ratio de Sharpe
                  <span className="tooltip-text">Mesure du rendement ajusté au risque (rendement - taux sans risque) / volatilité</span>
                </span></li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="educative-card">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <span className="educative-icon">🌲</span>
                <h4 className="mb-0">HRP (2016)</h4>
              </div>
              <p className="text-muted">
                <strong>Hierarchical Risk Parity</strong> - Utilise le machine learning pour une 
                diversification plus robuste.
              </p>
              <ul className="list-unstyled">
                <li className="mb-2">✓ <span className="edu-tooltip">
                  Clustering hiérarchique
                  <span className="tooltip-text">Regroupe les actifs similaires pour mieux comprendre leurs relations</span>
                </span></li>
                <li className="mb-2">✓ <span className="edu-tooltip">
                  Allocation par risque
                  <span className="tooltip-text">Distribue le risque de façon équilibrée à travers les clusters</span>
                </span></li>
                <li className="mb-2">✓ <span className="edu-tooltip">
                  Robustesse
                  <span className="tooltip-text">Moins sensible aux erreurs d'estimation et aux changements de marché</span>
                </span></li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={12}>
          <Card className="educative-card bg-primary text-white">
            <Card.Body>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h5 className="mb-2">📌 Objectif pédagogique</h5>
                  <p className="mb-0">
                    Comparez les deux approches en sélectionnant différentes banques. 
                    Observez comment les poids et les métriques changent !
                  </p>
                </div>
                <span className="display-4">🎯</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default EducativeSection;