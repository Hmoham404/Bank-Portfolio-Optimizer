import React, { useMemo } from 'react';
import { Row, Col, Card, ProgressBar, Badge } from 'react-bootstrap';
import { FaArrowUp, FaArrowDown, FaBalanceScale, FaChartLine, FaTrophy, FaShieldAlt, FaCoins } from 'react-icons/fa';

const PortfolioResults = ({ markowitz, hrp }) => {
  // Valeurs par défaut si les données sont manquantes
  const safeMarkowitz = useMemo(() => markowitz || {
    expectedReturn: '8.50',
    risk: '12.30',
    sharpeRatio: '0.53',
    weights: {}
  }, [markowitz]);

  const safeHrp = useMemo(() => hrp || {
    expectedReturn: '8.20',
    risk: '11.80',
    sharpeRatio: '0.53',
    weights: {}
  }, [hrp]);

  // Calculs avancés pour plus de valeur
  const portfolioInsights = useMemo(() => {
    const mReturn = parseFloat(safeMarkowitz.expectedReturn) || 0;
    const mRisk = parseFloat(safeMarkowitz.risk) || 0;
    const mSharpe = parseFloat(safeMarkowitz.sharpeRatio) || 0;

    const hReturn = parseFloat(safeHrp.expectedReturn) || 0;
    const hRisk = parseFloat(safeHrp.risk) || 0;
    const hSharpe = parseFloat(safeHrp.sharpeRatio) || 0;

    // Score de performance global (0-100)
    const mScore = Math.min(100, Math.max(0, (mReturn * 2) + (mSharpe * 20) - (mRisk * 0.5)));
    const hScore = Math.min(100, Math.max(0, (hReturn * 2) + (hSharpe * 20) - (hRisk * 0.5)));

    // Recommandation
    const recommendation = mScore > hScore ? 'markowitz' : hScore > mScore ? 'hrp' : 'both';

    // Métriques de risque-rendement
    const mRiskAdjustedReturn = mReturn / mRisk;
    const hRiskAdjustedReturn = hReturn / hRisk;

    return {
      markowitzScore: mScore.toFixed(1),
      hrpScore: hScore.toFixed(1),
      recommendation,
      markowitzRiskAdjusted: mRiskAdjustedReturn.toFixed(3),
      hrpRiskAdjusted: hRiskAdjustedReturn.toFixed(3),
      returnDifference: (mReturn - hReturn).toFixed(2),
      riskDifference: (mRisk - hRisk).toFixed(2),
      sharpeDifference: (mSharpe - hSharpe).toFixed(2)
    };
  }, [safeMarkowitz, safeHrp]);

  const getComparisonBadge = (mVal, hVal) => {
    const m = parseFloat(mVal) || 0;
    const h = parseFloat(hVal) || 0;
    const diff = m - h;

    if (Math.abs(diff) < 0.1) return <Badge bg="secondary">⚖️ Équivalent</Badge>;
    return diff > 0 ?
      <Badge bg="success"><FaArrowUp /> Markowitz</Badge> :
      <Badge bg="info"><FaArrowDown /> HRP</Badge>;
  };

  const getPerformanceIndicator = (score) => {
    const numScore = parseFloat(score);
    if (numScore >= 80) return { icon: '⭐', text: 'Excellent', variant: 'success' };
    if (numScore >= 60) return { icon: '👍', text: 'Bon', variant: 'primary' };
    if (numScore >= 40) return { icon: '➖', text: 'Moyen', variant: 'warning' };
    return { icon: '⚠️', text: 'À améliorer', variant: 'danger' };
  };

  const renderWeightsChart = (weights, title) => {
    const entries = Object.entries(weights || {});
    if (entries.length === 0) {
      return (
        <div className="text-center text-muted py-4">
          <FaCoins size={24} className="mb-2" />
          <p>Sélectionnez des banques pour voir la répartition</p>
        </div>
      );
    }

    return (
      <div className="weights-visualization">
        <h6 className="mb-3">{title}</h6>
        {entries
          .sort(([,a], [,b]) => parseFloat(b) - parseFloat(a))
          .map(([bank, weight]) => {
            const percentage = (parseFloat(weight) * 100 || 0).toFixed(1);
            return (
              <div key={bank} className="weight-bar-item mb-2">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="bank-name">{bank}</span>
                  <Badge bg="light" text="dark" className="weight-badge">
                    {percentage}%
                  </Badge>
                </div>
                <ProgressBar
                  now={parseFloat(percentage)}
                  className="weight-progress"
                  style={{ height: '8px' }}
                  variant={parseFloat(percentage) > 20 ? 'primary' : 'secondary'}
                />
              </div>
            );
          })}
      </div>
    );
  };

  return (
    <div className="portfolio-results-container">
      {/* Score de performance global */}
      <Row className="mb-4">
        <Col xs={12}>
          <Card className="modern-card">
            <Card.Body>
              <h5 className="text-center mb-4">
                <FaTrophy className="me-2" />
                Score de Performance Global
              </h5>
              <Row className="text-center">
                <Col md={6}>
                  <div className="metric-card">
                    <div className="metric-value">{portfolioInsights.markowitzScore}%</div>
                    <div className="metric-label">Markowitz</div>
                    <div className="performance-indicator mt-2">
                      <span className={`performance-indicator ${getPerformanceIndicator(portfolioInsights.markowitzScore).variant}`}>
                        {getPerformanceIndicator(portfolioInsights.markowitzScore).icon} {getPerformanceIndicator(portfolioInsights.markowitzScore).text}
                      </span>
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="metric-card">
                    <div className="metric-value">{portfolioInsights.hrpScore}%</div>
                    <div className="metric-label">HRP</div>
                    <div className="performance-indicator mt-2">
                      <span className={`performance-indicator ${getPerformanceIndicator(portfolioInsights.hrpScore).variant}`}>
                        {getPerformanceIndicator(portfolioInsights.hrpScore).icon} {getPerformanceIndicator(portfolioInsights.hrpScore).text}
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="text-center mt-3">
                <Badge
                  bg={portfolioInsights.recommendation === 'markowitz' ? 'success' :
                       portfolioInsights.recommendation === 'hrp' ? 'info' : 'secondary'}
                  className="p-2"
                >
                  <FaTrophy className="me-1" />
                  Recommandation: {
                    portfolioInsights.recommendation === 'markowitz' ? 'Portefeuille Markowitz' :
                    portfolioInsights.recommendation === 'hrp' ? 'Portefeuille HRP' :
                    'Les deux approches sont équivalentes'
                  }
                </Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Comparaison détaillée des portefeuilles */}
      <Row className="mb-4">
        <Col md={6}>
          <Card className="modern-card portfolio-card hover-lift">
            <Card.Body>
              <h4 className="text-center mb-4">
                <span role="img" aria-label="markowitz">📊</span>
                Portefeuille Markowitz
              </h4>

              <div className="metric-grid mb-4">
                <div className="metric-item">
                  <span className="metric-label">
                    <FaChartLine className="me-1" />
                    Rendement
                  </span>
                  <span className="metric-value text-success">{safeMarkowitz.expectedReturn}%</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">
                    <FaShieldAlt className="me-1" />
                    Risque
                  </span>
                  <span className="metric-value text-warning">{safeMarkowitz.risk}%</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">Sharpe</span>
                  <span className="metric-value text-info">{safeMarkowitz.sharpeRatio}</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">Rend./Risque</span>
                  <span className="metric-value text-primary">{portfolioInsights.markowitzRiskAdjusted}</span>
                </div>
              </div>

              {renderWeightsChart(safeMarkowitz.weights, 'Répartition Markowitz')}

              <div className="risk-indicator mt-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <small>Niveau de risque</small>
                  <Badge bg={parseFloat(safeMarkowitz.risk) > 15 ? 'danger' : parseFloat(safeMarkowitz.risk) > 10 ? 'warning' : 'success'}>
                    {parseFloat(safeMarkowitz.risk) > 15 ? 'Élevé' : parseFloat(safeMarkowitz.risk) > 10 ? 'Modéré' : 'Faible'}
                  </Badge>
                </div>
                <ProgressBar
                  now={parseFloat(safeMarkowitz.risk) * 10 || 50}
                  label={`Risque ${safeMarkowitz.risk}%`}
                  variant={parseFloat(safeMarkowitz.risk) > 15 ? 'danger' : parseFloat(safeMarkowitz.risk) > 10 ? 'warning' : 'success'}
                  className="risk-progress"
                />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="modern-card portfolio-card hrp hover-lift">
            <Card.Body>
              <h4 className="text-center mb-4">
                <span role="img" aria-label="hrp">🌲</span>
                Portefeuille HRP
              </h4>

              <div className="metric-grid mb-4">
                <div className="metric-item">
                  <span className="metric-label">
                    <FaChartLine className="me-1" />
                    Rendement
                  </span>
                  <span className="metric-value text-success">{safeHrp.expectedReturn}%</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">
                    <FaShieldAlt className="me-1" />
                    Risque
                  </span>
                  <span className="metric-value text-warning">{safeHrp.risk}%</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">Sharpe</span>
                  <span className="metric-value text-info">{safeHrp.sharpeRatio}</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">Rend./Risque</span>
                  <span className="metric-value text-primary">{portfolioInsights.hrpRiskAdjusted}</span>
                </div>
              </div>

              {renderWeightsChart(safeHrp.weights, 'Répartition HRP')}

              <div className="risk-indicator mt-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <small>Niveau de risque</small>
                  <Badge bg={parseFloat(safeHrp.risk) > 15 ? 'danger' : parseFloat(safeHrp.risk) > 10 ? 'warning' : 'success'}>
                    {parseFloat(safeHrp.risk) > 15 ? 'Élevé' : parseFloat(safeHrp.risk) > 10 ? 'Modéré' : 'Faible'}
                  </Badge>
                </div>
                <ProgressBar
                  now={parseFloat(safeHrp.risk) * 10 || 50}
                  label={`Risque ${safeHrp.risk}%`}
                  variant={parseFloat(safeHrp.risk) > 15 ? 'danger' : parseFloat(safeHrp.risk) > 10 ? 'warning' : 'success'}
                  className="risk-progress"
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Comparaison détaillée */}
      <Row>
        <Col xs={12}>
          <Card className="modern-card">
            <Card.Body>
              <h5 className="text-center mb-4">
                <FaBalanceScale className="me-2" />
                Analyse Comparative Détaillée
              </h5>

              <Row className="mb-4">
                <Col md={4}>
                  <div className="comparison-metric">
                    <h6>Rendement</h6>
                    <div className="d-flex justify-content-center mb-2">
                      {getComparisonBadge(safeMarkowitz.expectedReturn, safeHrp.expectedReturn)}
                    </div>
                    <small className="text-muted">
                      Différence: {portfolioInsights.returnDifference > 0 ? '+' : ''}{portfolioInsights.returnDifference}%
                    </small>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="comparison-metric">
                    <h6>Risque</h6>
                    <div className="d-flex justify-content-center mb-2">
                      {getComparisonBadge(safeHrp.risk, safeMarkowitz.risk)}
                    </div>
                    <small className="text-muted">
                      Différence: {portfolioInsights.riskDifference > 0 ? '+' : ''}{portfolioInsights.riskDifference}%
                    </small>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="comparison-metric">
                    <h6>Ratio Sharpe</h6>
                    <div className="d-flex justify-content-center mb-2">
                      {getComparisonBadge(safeMarkowitz.sharpeRatio, safeHrp.sharpeRatio)}
                    </div>
                    <small className="text-muted">
                      Différence: {portfolioInsights.sharpeDifference > 0 ? '+' : ''}{portfolioInsights.sharpeDifference}
                    </small>
                  </div>
                </Col>
              </Row>

              {/* Insights intelligents */}
              <div className="insights-section p-3 bg-light rounded">
                <h6 className="mb-3">💡 Insights Intelligents</h6>
                <Row>
                  <Col md={6}>
                    <div className="insight-item mb-2">
                      <strong>Markowitz:</strong> {
                        parseFloat(portfolioInsights.markowitzScore) > 70 ? 'Excellent équilibre risque-rendement' :
                        parseFloat(portfolioInsights.markowitzScore) > 50 ? 'Bon compromis global' :
                        'Peut être amélioré avec plus de diversification'
                      }
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="insight-item mb-2">
                      <strong>HRP:</strong> {
                        parseFloat(portfolioInsights.hrpScore) > 70 ? 'Réduction efficace du risque' :
                        parseFloat(portfolioInsights.hrpScore) > 50 ? 'Approche équilibrée' :
                        'Considérer une diversification accrue'
                      }
                    </div>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PortfolioResults;