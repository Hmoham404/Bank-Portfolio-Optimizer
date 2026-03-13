import React from 'react';
import { Row, Col } from 'react-bootstrap';

const HRPSection = () => {
  return (
    <div className="section-container">
      <h2 className="section-title">
        <span className="section-icon">🌲</span>
        Hierarchical Risk Parity (HRP)
      </h2>

      <Row className="mb-5">
        <Col lg={6}>
          <div className="explain-card">
            <h3>🔬 Comment ça marche ?</h3>
            <ol className="list-unstyled">
              <li className="mb-3">1. <strong>Clustering hiérarchique</strong> - Regrouper les actifs similaires</li>
              <li className="mb-3">2. <strong>Matrice de corrélation</strong> - Analyser les relations</li>
              <li className="mb-3">3. <strong>Allocation par niveau</strong> - Distribuer le risque</li>
            </ol>
          </div>
        </Col>
        <Col lg={6}>
          <div className="explain-card">
            <h3>📊 Avantages clés</h3>
            <ul>
              <li>Plus robuste aux changements</li>
              <li>Meilleure diversification</li>
              <li>Poids plus stables</li>
              <li>Moins de concentration</li>
            </ul>
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <div className="explain-card">
            <h4>🧮 Processus mathématique</h4>
            <p>1. Calcul de la matrice de corrélation</p>
            <p>2. Transformation en distance</p>
            <p>3. Clustering hiérarchique</p>
            <p>4. Allocation récursive</p>
          </div>
        </Col>
        <Col md={6}>
          <div className="explain-card">
            <h4>📈 Performance</h4>
            <ul>
              <li>Moins de turnover</li>
              <li>Meilleur Sharpe ratio</li>
              <li>Résistance aux crises</li>
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HRPSection;