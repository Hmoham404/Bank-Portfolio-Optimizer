import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, Card, Button, Badge, Alert, ProgressBar } from 'react-bootstrap';
import { banks } from '../data/bankData';

const BankSelector = ({ onSelectBanks }) => {
  const [selectedBanks, setSelectedBanks] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredBank, setHoveredBank] = useState(null);

  // Calculs en temps réel des métriques
  const portfolioMetrics = useMemo(() => {
    if (selectedBanks.length === 0) return null;

    const selectedBankData = banks.filter(bank => selectedBanks.includes(bank.id));

    // Rendement moyen pondéré
    const totalReturns = selectedBankData.reduce((sum, bank) => {
      const avgReturn = bank.returns.reduce((a, b) => a + b, 0) / bank.returns.length;
      return sum + avgReturn;
    }, 0);
    const avgReturn = totalReturns / selectedBankData.length;

    // Volatilité moyenne
    const volatilities = selectedBankData.map(bank => {
      const mean = bank.returns.reduce((a, b) => a + b, 0) / bank.returns.length;
      const variance = bank.returns.reduce((sum, ret) => sum + Math.pow(ret - mean, 2), 0) / bank.returns.length;
      return Math.sqrt(variance);
    });
    const avgVolatility = volatilities.reduce((a, b) => a + b, 0) / volatilities.length;

    // Ratio de Sharpe estimé (rendement / volatilité)
    const sharpeRatio = avgReturn / avgVolatility;

    // Score de diversification (0-100)
    const diversificationScore = Math.min(100, selectedBanks.length * 15 + (sharpeRatio > 1 ? 20 : 0));

    return {
      avgReturn: (avgReturn * 100).toFixed(2),
      avgVolatility: (avgVolatility * 100).toFixed(2),
      sharpeRatio: sharpeRatio.toFixed(2),
      diversificationScore,
      totalBanks: selectedBanks.length
    };
  }, [selectedBanks]);

  // Validation des données au montage
  useEffect(() => {
    if (!Array.isArray(banks) || banks.length === 0) {
      setError('Erreur: Données des banques non disponibles');
      return;
    }

    const invalidBanks = banks.filter(bank =>
      !bank ||
      !bank.id ||
      !bank.name ||
      !Array.isArray(bank.returns) ||
      bank.returns.length === 0
    );

    if (invalidBanks.length > 0) {
      console.warn('Banques avec données invalides:', invalidBanks);
    }
  }, []);

  const handleBankToggle = async (bankId) => {
    try {
      setIsLoading(true);
      setError('');

      if (!bankId || typeof bankId !== 'string') {
        throw new Error('ID de banque invalide');
      }

      const bank = banks.find(b => b && b.id === bankId);
      if (!bank) {
        throw new Error(`Banque avec ID ${bankId} non trouvée`);
      }

      if (!bank.name || !Array.isArray(bank.returns) || bank.returns.length === 0) {
        throw new Error(`Données invalides pour la banque ${bankId}`);
      }

      setSelectedBanks(prevSelected => {
        const isSelected = prevSelected.includes(bankId);
        let newSelection;

        if (isSelected) {
          newSelection = prevSelected.filter(id => id !== bankId);
        } else {
          if (prevSelected.length >= 6) {
            setError('Maximum 6 banques peuvent être sélectionnées');
            return prevSelected;
          }
          newSelection = [...prevSelected, bankId];
        }

        updateParentSelection(newSelection);
        return newSelection;
      });

    } catch (err) {
      console.error('Erreur lors de la sélection:', err);
      setError(err.message || 'Erreur lors de la sélection de la banque');
    } finally {
      setIsLoading(false);
    }
  };

  const updateParentSelection = (selectedIds) => {
    try {
      const selectedBankObjects = banks
        .filter(bank => bank && selectedIds.includes(bank.id))
        .map(bank => ({
          id: bank.id,
          name: bank.name || 'Banque inconnue',
          returns: Array.isArray(bank.returns) ? bank.returns : [],
          prices: Array.isArray(bank.prices) ? bank.prices : []
        }));

      if (typeof onSelectBanks === 'function') {
        onSelectBanks(selectedBankObjects);
      }
    } catch (err) {
      console.error('Erreur lors de la mise à jour de la sélection:', err);
    }
  };

  const clearSelection = () => {
    setSelectedBanks([]);
    setError('');
    if (typeof onSelectBanks === 'function') {
      onSelectBanks([]);
    }
  };

  const selectAll = () => {
    try {
      const allIds = banks.slice(0, 6).map(bank => bank.id).filter(id => id);
      setSelectedBanks(allIds);
      updateParentSelection(allIds);
    } catch (err) {
      console.error('Erreur lors de la sélection de toutes les banques:', err);
      setError('Erreur lors de la sélection automatique');
    }
  };

  // Fonction pour calculer les métriques individuelles d'une banque
  const getBankMetrics = (bank) => {
    if (!bank || !Array.isArray(bank.returns) || bank.returns.length === 0) {
      return null;
    }

    const avgReturn = bank.returns.reduce((a, b) => a + b, 0) / bank.returns.length;
    const mean = avgReturn;
    const variance = bank.returns.reduce((sum, ret) => sum + Math.pow(ret - mean, 2), 0) / bank.returns.length;
    const volatility = Math.sqrt(variance);

    return {
      avgReturn: (avgReturn * 100).toFixed(2),
      volatility: (volatility * 100).toFixed(2),
      dataPoints: bank.returns.length,
      performance: avgReturn > 0.02 ? 'excellent' : avgReturn > 0.01 ? 'good' : avgReturn > 0 ? 'neutral' : 'poor'
    };
  };

  // Fonction pour obtenir la classe de performance
  const getPerformanceClass = (performance) => {
    switch (performance) {
      case 'excellent': return 'excellent';
      case 'good': return 'good';
      case 'neutral': return 'neutral';
      case 'poor': return 'poor';
      default: return 'neutral';
    }
  };

  return (
    <div className="bank-selector-container">
      {/* Métriques du portefeuille en temps réel */}
      {portfolioMetrics && (
        <Row className="mb-4">
          <Col lg={12}>
            <Card className="modern-card">
              <Card.Body>
                <h5 className="mb-4 text-center">
                  <span role="img" aria-label="metrics">📊</span>
                  Métriques du Portefeuille
                </h5>
                <Row>
                  <Col md={3} sm={6} className="mb-3">
                    <div className="metric-card">
                      <div className="metric-value">{portfolioMetrics.avgReturn}%</div>
                      <div className="metric-label">Rendement Moyen</div>
                      <div className={`metric-trend ${parseFloat(portfolioMetrics.avgReturn) > 2 ? 'positive' : 'negative'}`}>
                        {parseFloat(portfolioMetrics.avgReturn) > 2 ? '↗' : '↘'}
                      </div>
                    </div>
                  </Col>
                  <Col md={3} sm={6} className="mb-3">
                    <div className="metric-card">
                      <div className="metric-value">{portfolioMetrics.avgVolatility}%</div>
                      <div className="metric-label">Volatilité</div>
                      <div className={`metric-trend ${parseFloat(portfolioMetrics.avgVolatility) < 15 ? 'positive' : 'negative'}`}>
                        {parseFloat(portfolioMetrics.avgVolatility) < 15 ? '↘' : '↗'}
                      </div>
                    </div>
                  </Col>
                  <Col md={3} sm={6} className="mb-3">
                    <div className="metric-card">
                      <div className="metric-value">{portfolioMetrics.sharpeRatio}</div>
                      <div className="metric-label">Ratio Sharpe</div>
                      <div className={`metric-trend ${parseFloat(portfolioMetrics.sharpeRatio) > 1 ? 'positive' : 'negative'}`}>
                        {parseFloat(portfolioMetrics.sharpeRatio) > 1 ? '↗' : '↘'}
                      </div>
                    </div>
                  </Col>
                  <Col md={3} sm={6} className="mb-3">
                    <div className="metric-card">
                      <div className="metric-value">{portfolioMetrics.diversificationScore}%</div>
                      <div className="metric-label">Diversification</div>
                      <ProgressBar
                        now={portfolioMetrics.diversificationScore}
                        className="mt-2"
                        style={{ height: '6px' }}
                        variant={portfolioMetrics.diversificationScore > 70 ? 'success' : portfolioMetrics.diversificationScore > 40 ? 'warning' : 'danger'}
                      />
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Sélecteur de banques */}
      <Card className="modern-card bank-selector-card">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4>
              <span role="img" aria-label="bank">🏦</span>
              Sélectionnez vos banques
              <span role="img" aria-label="chart">📈</span>
            </h4>
            <div className="d-flex gap-2">
              <Button
                variant="outline-primary"
                size="sm"
                onClick={selectAll}
                disabled={isLoading}
                className="btn-modern"
              >
                Tout sélectionner
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={clearSelection}
                disabled={isLoading || selectedBanks.length === 0}
                className="btn-modern"
              >
                Effacer
              </Button>
            </div>
          </div>

          {error && (
            <Alert variant="danger" className="mb-3">
              <strong>Erreur:</strong> {error}
            </Alert>
          )}

          <div className="mb-3">
            <Badge bg="info" className="me-2">
              {selectedBanks.length} sélectionnée(s)
            </Badge>
            <small className="text-muted">
              (2-6 banques recommandées pour une diversification optimale)
            </small>
          </div>

          <Row className="mt-4">
            {banks.map((bank, index) => {
              const isSelected = selectedBanks.includes(bank.id);
              const isValid = bank &&
                             bank.id &&
                             bank.name &&
                             Array.isArray(bank.returns) &&
                             bank.returns.length > 0;
              const metrics = getBankMetrics(bank);

              return (
                <Col lg={4} md={6} key={bank.id || `bank-${Math.random()}`} className="mb-4">
                  <Card
                    className={`bank-card hover-lift ${isSelected ? 'selected' : ''} ${!isValid ? 'invalid' : ''}`}
                    onClick={() => !isLoading && handleBankToggle(bank.id)}
                    onMouseEnter={() => setHoveredBank(bank.id)}
                    onMouseLeave={() => setHoveredBank(null)}
                    style={{
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      opacity: isLoading ? 0.7 : 1,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    <Card.Body className="text-center">
                      <div className="bank-logo mb-3">
                        <img
                          src={`/images/logos/${bank.id}.png`}
                          alt={bank.name || 'Banque'}
                          className="bank-logo-img"
                          onError={(e) => {
                            e.target.src = `data:image/svg+xml;base64,${btoa(`
                              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="20" cy="20" r="20" fill="#1e3c72"/>
                                <text x="20" y="25" font-size="16" fill="white" text-anchor="middle" font-family="Arial, sans-serif">
                                  ${bank.name ? bank.name.charAt(0).toUpperCase() : 'B'}
                                </text>
                              </svg>
                            `)}`;
                          }}
                        />
                      </div>

                      <h6 className="mb-2">{bank.name || 'Banque inconnue'}</h6>

                      {bank.description && (
                        <p className="text-muted small mb-2">{bank.description}</p>
                      )}

                      {/* Métriques individuelles */}
                      {metrics && (
                        <div className="mb-3">
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <small className="text-muted">Rendement:</small>
                            <span className="fw-bold text-primary">{metrics.avgReturn}%</span>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <small className="text-muted">Volatilité:</small>
                            <span className="fw-bold text-warning">{metrics.volatility}%</span>
                          </div>
                          <div className="performance-indicator mb-2">
                            <span className={`performance-indicator ${getPerformanceClass(metrics.performance)}`}>
                              {metrics.performance === 'excellent' ? '⭐ Excellent' :
                               metrics.performance === 'good' ? '👍 Bon' :
                               metrics.performance === 'neutral' ? '➖ Moyen' : '⚠️ Faible'}
                            </span>
                          </div>
                          <small className="text-muted d-block">
                            {metrics.dataPoints} points de données
                          </small>
                        </div>
                      )}

                      {/* Indicateur de sélection */}
                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">
                          {Array.isArray(bank.returns) ? bank.returns.length : 0} données
                        </small>
                        {isSelected && (
                          <Badge bg="success" className="ms-2">✓</Badge>
                        )}
                      </div>

                      {!isValid && (
                        <small className="text-danger d-block mt-1">
                          ⚠️ Données incomplètes
                        </small>
                      )}

                      {/* Tooltip informatif au survol */}
                      {hoveredBank === bank.id && metrics && (
                        <div className="tooltip-modern">
                          <div className="tooltip-content">
                            <strong>{bank.name}</strong><br/>
                            Rendement annuel: {metrics.avgReturn}%<br/>
                            Volatilité: {metrics.volatility}%<br/>
                            Données historiques: {metrics.dataPoints} points<br/>
                            <small>Cliquez pour {isSelected ? 'désélectionner' : 'sélectionner'}</small>
                          </div>
                        </div>
                      )}
                    </Card.Body>

                    {/* Overlay de chargement */}
                    {isLoading && (
                      <div className="loading-overlay">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Chargement...</span>
                        </div>
                      </div>
                    )}
                  </Card>
                </Col>
              );
            })}
          </Row>

          {/* Résumé de la sélection */}
          {selectedBanks.length > 0 && (
            <div className="mt-4 p-3 bg-light rounded modern-card">
              <h6 className="mb-3">
                <span role="img" aria-label="selected">🎯</span>
                Banques sélectionnées ({selectedBanks.length})
              </h6>
              <div className="d-flex flex-wrap gap-2">
                {selectedBanks.map(bankId => {
                  const bank = banks.find(b => b.id === bankId);
                  const metrics = getBankMetrics(bank);
                  return (
                    <Badge key={bankId} bg="primary" className="p-2 d-flex align-items-center">
                      <span className="me-2">{bank ? bank.name : bankId}</span>
                      {metrics && (
                        <small className="ms-1 text-light">
                          ({metrics.avgReturn}%)
                        </small>
                      )}
                      <button
                        type="button"
                        className="btn-close btn-close-white ms-2"
                        style={{ fontSize: '10px', padding: '2px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBankToggle(bankId);
                        }}
                        disabled={isLoading}
                        title="Retirer cette banque"
                      />
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}

          {/* Indicateur de chargement global */}
          {isLoading && (
            <div className="text-center mt-3">
              <div className="spinner-border spinner-border-sm text-primary" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
              <small className="text-muted ms-2">Mise à jour de la sélection...</small>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default BankSelector;