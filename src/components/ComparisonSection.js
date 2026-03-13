import React from 'react';
import { Row, Col } from 'react-bootstrap';

const ComparisonSection = () => {
  return (
    <div className="section-container">
      <h2 className="section-title">
        <span className="section-icon">⚖️</span>
        Comparaison détaillée
      </h2>

      <Row className="mb-4">
        <Col md={6}>
          <div className="explain-card" style={{ borderLeft: '5px solid #1e3c72' }}>
            <h3 className="text-center">📊 Markowitz</h3>
            <div className="metric-item mb-3">
              <div className="metric-label">Philosophie</div>
              <div className="metric-value">Optimisation</div>
            </div>
            <div className="metric-item mb-3">
              <div className="metric-label">Force</div>
              <div className="metric-value">Mathématique</div>
            </div>
            <div className="metric-item mb-3">
              <div className="metric-label">Faiblesse</div>
              <div className="metric-value">Instabilité</div>
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className="explain-card" style={{ borderLeft: '5px solid #2a5298' }}>
            <h3 className="text-center">🌲 HRP</h3>
            <div className="metric-item mb-3">
              <div className="metric-label">Philosophie</div>
              <div className="metric-value">Diversification</div>
            </div>
            <div className="metric-item mb-3">
              <div className="metric-label">Force</div>
              <div className="metric-value">Robustesse</div>
            </div>
            <div className="metric-item mb-3">
              <div className="metric-label">Faiblesse</div>
              <div className="metric-value">Complexité</div>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <div className="comparison-card">
            <h4 className="text-center mb-4">Quand utiliser chaque méthode ?</h4>
            <Row>
              <Col md={6}>
                <div className="comparison-item">
                  <h5>📊 Markowitz</h5>
                  <ul className="list-unstyled">
                    <li>✓ Données stables</li>
                    <li>✓ Marché efficient</li>
                    <li>✓ Long terme</li>
                    <li>✓ Grande confiance dans les estimations</li>
                  </ul>
                </div>
              </Col>
              <Col md={6}>
                <div className="comparison-item">
                  <h5>🌲 HRP</h5>
                  <ul className="list-unstyled">
                    <li>✓ Marchés volatils</li>
                    <li>✓ Données incertaines</li>
                    <li>✓ Trading fréquent</li>
                    <li>✓ Recherche de diversification</li>
                  </ul>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ComparisonSection;