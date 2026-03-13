import React from 'react';
import { Row, Col, Card, ProgressBar, Badge } from 'react-bootstrap';

const PortfolioResults = ({ markowitz, hrp }) => {
  // Valeurs par défaut si les données sont manquantes
  const safeMarkowitz = markowitz || {
    expectedReturn: '8.50',
    risk: '12.30',
    sharpeRatio: '0.53',
    weights: {}
  };

  const safeHrp = hrp || {
    expectedReturn: '8.20',
    risk: '11.80',
    sharpeRatio: '0.53',
    weights: {}
  };

  const getComparisonBadge = (mVal, hVal) => {
    const m = parseFloat(mVal) || 0;
    const h = parseFloat(hVal) || 0;
    const diff = m - h;

    if (Math.abs(diff) < 0.1) return <Badge bg="secondary">⚖️ Équivalent</Badge>;
    return diff > 0 ?
      <Badge bg="success">Markowitz</Badge> :
      <Badge bg="info">HRP</Badge>;
  };

  const renderWeights = (weights, title) => {
    const entries = Object.entries(weights || {});
    if (entries.length === 0) {
      return (
        <div className="text-center text-muted py-3">
          <p>Sélectionnez des banques</p>
        </div>
      );
    }

    return (
      <div>
        <h6 className="mt-3 mb-2">{title}</h6>
        {entries.map(([bank, weight]) => (
          <div key={bank} className="d-flex justify-content-between align-items-center mb-2">
            <span className="small">{bank}</span>
            <Badge bg="light" text="dark">
              {(parseFloat(weight) * 100 || 0).toFixed(1)}%
            </Badge>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Row>
      <Col md={6}>
        <Card className="portfolio-card">
          <Card.Body>
            <h4 className="text-center mb-4">
              <span role="img" aria-label="markowitz">📊</span>
              Portefeuille Markowitz
            </h4>

            <div className="metric-grid">
              <div className="metric-item">
                <span className="metric-label">Rendement</span>
                <span className="metric-value">{safeMarkowitz.expectedReturn}%</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Risque</span>
                <span className="metric-value">{safeMarkowitz.risk}%</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Sharpe</span>
                <span className="metric-value">{safeMarkowitz.sharpeRatio}</span>
              </div>
            </div>

            {renderWeights(safeMarkowitz.weights, 'Poids des actifs')}

            <ProgressBar
              now={parseFloat(safeMarkowitz.risk) * 10 || 50}
              label={`Risque ${safeMarkowitz.risk}%`}
              variant="danger"
              className="mt-3"
            />
          </Card.Body>
        </Card>
      </Col>

      <Col md={6}>
        <Card className="portfolio-card hrp">
          <Card.Body>
            <h4 className="text-center mb-4">
              <span role="img" aria-label="hrp">🌲</span>
              Portefeuille HRP
            </h4>

            <div className="metric-grid">
              <div className="metric-item">
                <span className="metric-label">Rendement</span>
                <span className="metric-value">{safeHrp.expectedReturn}%</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Risque</span>
                <span className="metric-value">{safeHrp.risk}%</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Sharpe</span>
                <span className="metric-value">{safeHrp.sharpeRatio}</span>
              </div>
            </div>

            {renderWeights(safeHrp.weights, 'Poids des actifs')}

            <ProgressBar
              now={parseFloat(safeHrp.risk) * 10 || 50}
              label={`Risque ${safeHrp.risk}%`}
              variant="info"
              className="mt-3"
            />
          </Card.Body>
        </Card>
      </Col>

      <Col xs={12} className="mt-4">
        <Card className="bg-light">
          <Card.Body>
            <h5 className="text-center">Comparaison</h5>
            <Row className="text-center">
              <Col md={4}>
                {getComparisonBadge(safeMarkowitz.expectedReturn, safeHrp.expectedReturn)}
                <div className="mt-2">Rendement</div>
              </Col>
              <Col md={4}>
                {getComparisonBadge(safeHrp.risk, safeMarkowitz.risk)}
                <div className="mt-2">Risque</div>
              </Col>
              <Col md={4}>
                {getComparisonBadge(safeMarkowitz.sharpeRatio, safeHrp.sharpeRatio)}
                <div className="mt-2">Sharpe</div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default PortfolioResults;