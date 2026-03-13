import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { banks } from '../data/bankData';

const BankSelector = ({ onSelectBanks }) => {
  const [selectedBanks, setSelectedBanks] = useState([]);

  const handleBankChange = (bank, isChecked) => {
    if (isChecked) {
      setSelectedBanks([...selectedBanks, bank]);
    } else {
      setSelectedBanks(selectedBanks.filter(b => b.name !== bank.name));
    }
  };

  const handleSubmit = () => {
    if (selectedBanks.length > 0) {
      onSelectBanks(selectedBanks);
    }
  };

  return (
    <Card className="mb-4">
      <Card.Header>
        <h4>Sélectionnez vos banques</h4>
      </Card.Header>
      <Card.Body>
        <Form>
          {banks.map((bank) => (
            <Form.Check
              key={bank.name}
              type="checkbox"
              id={bank.name}
              label={
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src={bank.logo}
                    alt={`${bank.name} logo`}
                    style={{ width: '30px', height: '30px', objectFit: 'contain' }}
                  />
                  {bank.name}
                </span>
              }
              checked={selectedBanks.some(b => b.name === bank.name)}
              onChange={(e) => handleBankChange(bank, e.target.checked)}
              className="mb-2"
            />
          ))}
        </Form>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={selectedBanks.length === 0}
          className="mt-3"
        >
          Calculer le portefeuille ({selectedBanks.length} banques sélectionnées)
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BankSelector;