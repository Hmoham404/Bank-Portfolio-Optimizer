import React, { useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { banks } from '../data/bankData';

const BankSelector = ({ onSelectBanks }) => {
  const [selectedBanks, setSelectedBanks] = useState([]);

  const handleBankToggle = (bank) => {
    const isSelected = selectedBanks.some(b => b.name === bank.name);
    if (isSelected) {
      setSelectedBanks(selectedBanks.filter(b => b.name !== bank.name));
    } else {
      setSelectedBanks([...selectedBanks, bank]);
    }
  };

  const handleSubmit = () => {
    if (selectedBanks.length > 0) {
      onSelectBanks(selectedBanks);
    }
  };

  return (
    <div className="bank-selector-container">
      <Card className="mb-4 shadow-lg border-0">
        <Card.Header className="bg-gradient-primary text-white text-center py-4">
          <h3 className="mb-0">
            <i className="fas fa-university me-2"></i>
            Sélectionnez vos banques
          </h3>
          <p className="mb-0 mt-2 opacity-75">Choisissez les banques pour optimiser votre portefeuille</p>
        </Card.Header>
        <Card.Body className="p-4">
          <Row className="g-3">
            {banks.map((bank) => {
              const isSelected = selectedBanks.some(b => b.name === bank.name);
              return (
                <Col key={bank.name} md={6} lg={4} className="mb-3">
                  <Card
                    className={`bank-card h-100 ${isSelected ? 'selected shadow-lg' : 'shadow-sm'} cursor-pointer`}
                    onClick={() => handleBankToggle(bank)}
                    style={{
                      transition: 'all 0.3s ease',
                      border: isSelected ? '2px solid #007bff' : '1px solid #dee2e6',
                      transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                      cursor: 'pointer'
                    }}
                  >
                    <Card.Body className="text-center p-4">
                      <div className="bank-logo-container mb-3">
                        <img
                          src={bank.logo}
                          alt={`${bank.name} logo`}
                          className="bank-logo"
                          style={{
                            width: '60px',
                            height: '60px',
                            objectFit: 'contain',
                            filter: isSelected ? 'brightness(1.1)' : 'brightness(1)',
                            transition: 'all 0.3s ease'
                          }}
                        />
                      </div>
                      <h5 className="bank-name mb-2" style={{ color: isSelected ? '#007bff' : '#495057' }}>
                        {bank.name}
                      </h5>
                      <p className="bank-description text-muted small mb-3">
                        {bank.description}
                      </p>
                      <div className={`selection-indicator ${isSelected ? 'selected' : ''}`}>
                        <i className={`fas ${isSelected ? 'fa-check-circle text-success' : 'fa-circle text-muted'}`}></i>
                        <span className="ms-2">{isSelected ? 'Sélectionnée' : 'Cliquer pour sélectionner'}</span>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>

          <div className="text-center mt-4">
            <Button
              variant={selectedBanks.length > 0 ? "primary" : "secondary"}
              size="lg"
              onClick={handleSubmit}
              disabled={selectedBanks.length === 0}
              className="px-5 py-3 shadow-lg"
              style={{
                borderRadius: '50px',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
            >
              <i className="fas fa-calculator me-2"></i>
              Calculer le portefeuille
              {selectedBanks.length > 0 && (
                <span className="badge bg-light text-primary ms-2">
                  {selectedBanks.length} banque{selectedBanks.length > 1 ? 's' : ''}
                </span>
              )}
            </Button>
          </div>
        </Card.Body>
      </Card>

      <style jsx>{`
        .bank-selector-container {
          animation: fadeInUp 0.6s ease-out;
        }

        .bg-gradient-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .bank-card {
          border-radius: 15px;
          overflow: hidden;
          position: relative;
        }

        .bank-card:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important;
        }

        .bank-card.selected {
          background: linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%);
        }

        .bank-logo-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 80px;
        }

        .selection-indicator {
          font-size: 0.875rem;
          transition: all 0.3s ease;
        }

        .selection-indicator.selected {
          color: #28a745 !important;
          font-weight: 600;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .cursor-pointer {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default BankSelector;