import React from 'react';
import { Row, Col, Card, ProgressBar } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import { FaArrowUp, FaArrowDown, FaBalanceScale } from 'react-icons/fa';

const PortfolioResults = ({ markowitz, hrp }) => {
  if (!markowitz || !hrp) return null;

  const getComparisonBadge = (markowitzVal, hrpVal) => {
    const diff = parseFloat(markowitzVal) - parseFloat(hrpVal);
    if (Math.abs(diff) < 0.1) return <Badge bg="secondary">⚖️ Équivalent</Badge>;
    return diff > 0 ? 
      <Badge bg="success"><FaArrowUp /> Markowitz supérieur</Badge> : 
      <Badge bg="info"><FaArrowDown /> HRP supérieur</Badge>;
  };

  return (
    <Row>
      <Col md={6}>
        <Card className="portfolio-card">
          <Card.Body>
            <h4 className="text-center mb-4">
              <span role="img" aria-label="markowitz">📊</span> 
              Portefeuille Markowitz
              <span role="img" aria-label="rocket">🚀</span>
            </h4>
            
            <div className="metric-grid">
              <div className="metric-item">
                <span className="metric-label">Rendement</span>
                <span className="metric-value">{markowitz.expectedReturn}%</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Risque</span>
                <span className="metric-value">{markowitz.risk}%</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Sharpe</span>
                <span className="metric-value">{markowitz.sharpeRatio}</span>
              </div>
            </div>

            <h6 className="mt-4">📋 Poids des actifs :</h6>
            <div className="weight-table">
              {Object.entries(markowitz.weights).map(([bank, weight]) => (
                <div key={bank} className="weight-item">
                  <span>{bank}</span>
                  <Badge bg="light" text="dark">
                    {(parseFloat(weight) * 100).toFixed(1)}%
                  </Badge>
                </div>
              ))}
            </div>

            <ProgressBar 
              now={parseFloat(markowitz.risk) * 10} 
              label={`Risque ${markowitz.risk}%`}
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
              <span role="img" aria-label="balance">⚖️</span>
            </h4>
            
            <div className="metric-grid">
              <div className="metric-item">
                <span className="metric-label">Rendement</span>
                <span className="metric-value">{hrp.expectedReturn}%</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Risque</span>
                <span className="metric-value">{hrp.risk}%</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Sharpe</span>
                <span className="metric-value">{hrp.sharpeRatio}</span>
              </div>
            </div>

            <h6 className="mt-4">📋 Poids des actifs :</h6>
            <div className="weight-table">
              {Object.entries(hrp.weights).map(([bank, weight]) => (
                <div key={bank} className="weight-item">
                  <span>{bank}</span>
                  <Badge bg="light" text="dark">
                    {(parseFloat(weight) * 100).toFixed(1)}%
                  </Badge>
                </div>
              ))}
            </div>

            <ProgressBar 
              now={parseFloat(hrp.risk) * 10} 
              label={`Risque ${hrp.risk}%`}
              variant="info"
              className="mt-3"
            />
          </Card.Body>
        </Card>
      </Col>

      <Col xs={12} className="mt-4">
        <Card className="bg-light">
          <Card.Body>
            <h5 className="text-center">
              <FaBalanceScale /> Comparaison des stratégies <FaBalanceScale />
            </h5>
            <Row className="text-center">
              <Col md={4}>
                {getComparisonBadge(markowitz.expectedReturn, hrp.expectedReturn)}
                <div className="mt-2">Rendement</div>
              </Col>
              <Col md={4}>
                {getComparisonBadge(hrp.risk, markowitz.risk)}
                <div className="mt-2">Risque (inversé)</div>
              </Col>
              <Col md={4}>
                {getComparisonBadge(markowitz.sharpeRatio, hrp.sharpeRatio)}
                <div className="mt-2">Ratio de Sharpe</div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default PortfolioResults;