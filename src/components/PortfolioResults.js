import React from 'react';
import { Row, Col, Card, ProgressBar } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import { FaArrowUp, FaArrowDown, FaBalanceScale } from 'react-icons/fa';

const PortfolioResults = ({ markowitz, hrp }) => {
  // Vérification que les données existent
  if (!markowitz || !hrp) {
    return (
      <Card className="bg-warning p-4 text-center">
        <h5>Données insuffisantes pour l'affichage</h5>
      </Card>
    );
  }

  // Fonction sécurisée pour obtenir les valeurs
  const getValue = (obj, prop, defaultValue = '0.00') => {
    try {
      return obj && obj[prop] ? obj[prop] : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  // Fonction pour obtenir les poids
  const getWeights = (obj) => {
    try {
      return obj && obj.weights ? obj.weights : {};
    } catch {
      return {};
    }
  };

  const getComparisonBadge = (markowitzVal, hrpVal) => {
    try {
      const mVal = parseFloat(markowitzVal) || 0;
      const hVal = parseFloat(hrpVal) || 0;
      const diff = mVal - hVal;
      
      if (Math.abs(diff) < 0.1) return <Badge bg="secondary">⚖️ Équivalent</Badge>;
      return diff > 0 ? 
        <Badge bg="success"><FaArrowUp /> Markowitz supérieur</Badge> : 
        <Badge bg="info"><FaArrowDown /> HRP supérieur</Badge>;
    } catch {
      return <Badge bg="secondary">⚖️ Non disponible</Badge>;
    }
  };

  const markowitzWeights = getWeights(markowitz);
  const hrpWeights = getWeights(hrp);

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
                <span className="metric-value">{getValue(markowitz, 'expectedReturn')}%</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Risque</span>
                <span className="metric-value">{getValue(markowitz, 'risk')}%</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Sharpe</span>
                <span className="metric-value">{getValue(markowitz, 'sharpeRatio')}</span>
              </div>
            </div>

            <h6 className="mt-4">📋 Poids des actifs :</h6>
            <div className="weight-table">
              {Object.keys(markowitzWeights).length > 0 ? (
                Object.entries(markowitzWeights).map(([bank, weight]) => (
                  <div key={bank} className="weight-item">
                    <span>{bank}</span>
                    <Badge bg="light" text="dark">
                      {(parseFloat(weight) * 100 || 0).toFixed(1)}%
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-center">Aucun poids disponible</p>
              )}
            </div>

            <ProgressBar 
              now={parseFloat(getValue(markowitz, 'risk', '10')) * 10} 
              label={`Risque ${getValue(markowitz, 'risk')}%`}
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
                <span className="metric-value">{getValue(hrp, 'expectedReturn')}%</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Risque</span>
                <span className="metric-value">{getValue(hrp, 'risk')}%</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Sharpe</span>
                <span className="metric-value">{getValue(hrp, 'sharpeRatio')}</span>
              </div>
            </div>

            <h6 className="mt-4">📋 Poids des actifs :</h6>
            <div className="weight-table">
              {Object.keys(hrpWeights).length > 0 ? (
                Object.entries(hrpWeights).map(([bank, weight]) => (
                  <div key={bank} className="weight-item">
                    <span>{bank}</span>
                    <Badge bg="light" text="dark">
                      {(parseFloat(weight) * 100 || 0).toFixed(1)}%
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-center">Aucun poids disponible</p>
              )}
            </div>

            <ProgressBar 
              now={parseFloat(getValue(hrp, 'risk', '10')) * 10} 
              label={`Risque ${getValue(hrp, 'risk')}%`}
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
                {getComparisonBadge(
                  getValue(markowitz, 'expectedReturn'), 
                  getValue(hrp, 'expectedReturn')
                )}
                <div className="mt-2">Rendement</div>
              </Col>
              <Col md={4}>
                {getComparisonBadge(
                  getValue(hrp, 'risk'), 
                  getValue(markowitz, 'risk')
                )}
                <div className="mt-2">Risque (inversé)</div>
              </Col>
              <Col md={4}>
                {getComparisonBadge(
                  getValue(markowitz, 'sharpeRatio'), 
                  getValue(hrp, 'sharpeRatio')
                )}
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