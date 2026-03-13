import React from 'react';
import { Row, Col } from 'react-bootstrap';

const MarkowitzSection = () => {
  return (
    <div className="section-container">
      <h2 className="section-title">
        <span className="section-icon">📊</span>
        Modèle de Markowitz (Moyenne-Variance)
      </h2>

      <Row className="mb-5">
        <Col lg={6}>
          <div className="explain-card">
            <h3>📐 Formule mathématique</h3>
            <p className="mb-3">Maximiser: <strong>Rendement attendu - λ × Risque²</strong></p>
            <div className="edu-tooltip">
              λ = coefficient d'aversion au risque
              <span className="tooltip-content">
                Plus λ est grand, plus l'investisseur est prudent et cherche à minimiser le risque
              </span>
            </div>
          </div>
        </Col>
        <Col lg={6}>
          <div className="explain-card">
            <h3>📈 Frontière efficiente</h3>
            <p>Représentation graphique de tous les portefeuilles optimaux</p>
            <ul>
              <li>Points sur la courbe = portefeuilles optimaux</li>
              <li>Ratio de Sharpe = pente maximale</li>
              <li>Point tangent = portefeuille de marché</li>
            </ul>
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <div className="explain-card">
            <h4>✅ Avantages</h4>
            <ul>
              <li>Simple à comprendre</li>
              <li>Base théorique solide</li>
              <li>Optimisation mathématique</li>
            </ul>
          </div>
        </Col>
        <Col md={4}>
          <div className="explain-card">
            <h4>⚠️ Limites</h4>
            <ul>
              <li>Sensible aux erreurs</li>
              <li>Instabilité des poids</li>
              <li>Concentrations extrêmes</li>
            </ul>
          </div>
        </Col>
        <Col md={4}>
          <div className="explain-card">
            <h4>🎯 Usage</h4>
            <ul>
              <li>Grandes institutions</li>
              <li>Marchés stables</li>
              <li>Long terme</li>
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default MarkowitzSection;