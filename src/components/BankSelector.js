import React, { useState } from 'react';
import { Row, Col, Card, Button, Badge, Alert } from 'react-bootstrap';
import { banks } from '../data/bankData';

const BankSelector = ({ onSelectBanks }) => {
  const [selectedBanks, setSelectedBanks] = useState([]);
  const [error, setError] = useState('');

  const handleBankToggle = (bankId) => {
    try {
      setError('');

      // Validation basique
      if (!bankId || typeof bankId !== 'string') {
        setError('Erreur: ID de banque invalide');
        return;
      }

      // Trouver la banque
      const bank = banks.find(b => b && b.id === bankId);
      if (!bank) {
        setError(`Banque ${bankId} non trouvée`);
        return;
      }

      // Validation des données de base
      if (!bank.name || !Array.isArray(bank.returns) || bank.returns.length === 0) {
        setError(`Données incomplètes pour ${bankId}`);
        return;
      }

      // Mettre à jour la sélection
      setSelectedBanks(prevSelected => {
        const isSelected = prevSelected.includes(bankId);
        let newSelection;

        if (isSelected) {
          // Désélectionner
          newSelection = prevSelected.filter(id => id !== bankId);
        } else {
          // Vérifier la limite
          if (prevSelected.length >= 6) {
            setError('Maximum 6 banques sélectionnables');
            return prevSelected;
          }
          // Sélectionner
          newSelection = [...prevSelected, bankId];
        }

        // Notifier le parent
        if (onSelectBanks) {
          const selectedBankObjects = banks
            .filter(b => newSelection.includes(b.id))
            .map(b => ({
              id: b.id,
              name: b.name,
              returns: b.returns,
              prices: b.prices
            }));
          onSelectBanks(selectedBankObjects);
        }

        return newSelection;
      });

    } catch (err) {
      console.error('Erreur de sélection:', err);
      setError('Erreur lors de la sélection');
    }
  };

  const clearSelection = () => {
    setSelectedBanks([]);
    setError('');
    if (onSelectBanks) {
      onSelectBanks([]);
    }
  };

  const selectAll = () => {
    try {
      const allIds = banks.slice(0, 6).map(bank => bank.id).filter(id => id);
      setSelectedBanks(allIds);
      if (onSelectBanks) {
        const selectedBankObjects = banks
          .filter(b => allIds.includes(b.id))
          .map(b => ({
            id: b.id,
            name: b.name,
            returns: b.returns,
            prices: b.prices
          }));
        onSelectBanks(selectedBankObjects);
      }
    } catch (err) {
      console.error('Erreur sélection tout:', err);
      setError('Erreur lors de la sélection automatique');
    }
  };

  return (
    <Card className="bank-selector-card">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4>
            <span role="img" aria-label="bank">🏦</span>
            Sélection des banques
            <span role="img" aria-label="chart">📈</span>
          </h4>
          <div className="d-flex gap-2">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={selectAll}
            >
              Tout sélectionner
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={clearSelection}
              disabled={selectedBanks.length === 0}
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
            (2-6 banques recommandées)
          </small>
        </div>

        <Row>
          {banks.map((bank) => {
            const isSelected = selectedBanks.includes(bank.id);
            const isValid = bank &&
                           bank.id &&
                           bank.name &&
                           Array.isArray(bank.returns) &&
                           bank.returns.length > 0;

            return (
              <Col lg={4} md={6} key={bank.id} className="mb-4">
                <Card
                  className={`bank-card ${isSelected ? 'selected' : ''} ${!isValid ? 'invalid' : ''}`}
                  onClick={() => handleBankToggle(bank.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <Card.Body className="text-center">
                    <div className="bank-logo mb-3">
                      <img
                        src={`/images/logos/${bank.id}.png`}
                        alt={bank.name}
                        className="bank-logo-img"
                        onError={(e) => {
                          e.target.src = `data:image/svg+xml;base64,${btoa(`
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="20" cy="20" r="20" fill="#1e3c72"/>
                              <text x="20" y="25" font-size="16" fill="white" text-anchor="middle" font-family="Arial">
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

                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">
                        {Array.isArray(bank.returns) ? bank.returns.length : 0} données
                      </small>
                      {isSelected && (
                        <Badge bg="success">✓</Badge>
                      )}
                    </div>

                    {!isValid && (
                      <small className="text-danger d-block mt-1">
                        ⚠️ Données incomplètes
                      </small>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>

        {selectedBanks.length > 0 && (
          <div className="mt-4 p-3 bg-light rounded">
            <h6 className="mb-3">
              <span role="img" aria-label="selected">🎯</span>
              Banques sélectionnées ({selectedBanks.length})
            </h6>
            <div className="d-flex flex-wrap gap-2">
              {selectedBanks.map(bankId => {
                const bank = banks.find(b => b.id === bankId);
                return (
                  <Badge key={bankId} bg="primary" className="p-2">
                    {bank ? bank.name : bankId}
                  </Badge>
                );
              })}
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default BankSelector;