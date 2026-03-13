import React, { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import { banks } from '../data/bankData';

const BankSelector = ({ onSelectBanks }) => {
  const [selectedBanks, setSelectedBanks] = useState([]);

  const handleBankChange = (bankId) => {
    let updatedSelection;
    if (selectedBanks.includes(bankId)) {
      updatedSelection = selectedBanks.filter(id => id !== bankId);
    } else {
      updatedSelection = [...selectedBanks, bankId];
    }
    setSelectedBanks(updatedSelection);
    
    const selectedBankObjects = banks.filter(bank => updatedSelection.includes(bank.id));
    onSelectBanks(selectedBankObjects);
  };

  return (
    <Card className="bank-selector-card">
      <Card.Body>
        <h4 className="mb-4">
          <span role="img" aria-label="bank">🏦</span> 
          Sélectionnez les banques à analyser 
          <span role="img" aria-label="chart">📈</span>
          <small className="text-muted ms-3">
            <span className="edu-tooltip">
              ℹ️
              <span className="tooltip-content">Choisissez 2 à 6 banques pour une comparaison optimale</span>
            </span>
          </small>
        </h4>
        
        <Row className="mt-4">
          {banks.map((bank) => (
            <Col lg={4} md={6} key={bank.id} className="mb-4">
              <Card 
                className={`bank-card ${selectedBanks.includes(bank.id) ? 'selected' : ''}`}
                onClick={() => handleBankChange(bank.id)}
              >
                <Card.Body>
                  <div className="bank-logo">
                    <img 
                      src={`/images/logos/${bank.id}.png`} 
                      alt={bank.name}
                      className="bank-logo-img"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = bank.logo;
                      }}
                    />
                  </div>
                  <h5 className="bank-name">{bank.name}</h5>
                  <p className="bank-desc">{bank.description}</p>
                  {selectedBanks.includes(bank.id) && (
                    <Badge bg="success" className="mt-2 p-2">
                      ✓ Sélectionnée
                    </Badge>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        
        {selectedBanks.length > 0 && (
          <div className="mt-4 p-4 bg-light rounded">
            <h5 className="mb-3">
              <span role="img" aria-label="selected">🎯</span> 
              Portefeuille sélectionné ({selectedBanks.length} banques)
            </h5>
            <div className="d-flex flex-wrap gap-2">
              {selectedBanks.map(id => {
                const bank = banks.find(b => b.id === id);
                return (
                  <Badge key={id} bg="primary" className="p-3">
                    <img 
                      src={`/images/logos/${id}.png`} 
                      alt={bank.name}
                      style={{ width: '20px', height: '20px', marginRight: '8px', borderRadius: '50%' }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                      }}
                    />
                    {bank.name}
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