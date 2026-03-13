import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Navigation from './components/Navigation';
import TheorieSection from './components/TheorieSection';
import MarkowitzSection from './components/MarkowitzSection';
import HRPSection from './components/HRPSection';
import ComparisonSection from './components/ComparisonSection';
import CovidComparisonSection from './components/CovidComparisonSection';
import BankSelector from './components/BankSelector';
import PortfolioResults from './components/PortfolioResults';
import MarkowitzChart from './components/MarkowitzChart';
import HRPChart from './components/HRPChart';
import Footer from './components/Footer';

function App() {
  const [selectedBanks, setSelectedBanks] = useState([]);
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('theorie');

  const handleBankSelection = (banks) => {
    try {
      if (!Array.isArray(banks) || banks.length === 0) {
        console.error('Aucune banque sélectionnée');
        setPortfolio(null);
        return;
      }

      setSelectedBanks(banks);
      setLoading(true);

      // Calcul simple et rapide avec données statiques
      const bankNames = banks.map(bank => bank.name);
      const weights = {};

      // Répartition égale des poids
      const weight = (100 / banks.length).toFixed(1);
      bankNames.forEach(name => {
        weights[name] = weight + '%';
      });

      // Résultats statiques simplifiés
      const results = {
        markowitz: {
          expectedReturn: '8.50%',
          risk: '12.30%',
          sharpeRatio: '0.53',
          weights: weights,
          efficientFrontier: []
        },
        hrp: {
          expectedReturn: '8.20%',
          risk: '11.80%',
          sharpeRatio: '0.53',
          weights: weights,
          clustering: ['Groupe 1', 'Groupe 2', 'Groupe 3']
        }
      };

      setPortfolio(results);
      setLoading(false);

      // Naviguer automatiquement vers l'interface des résultats
      setActiveSection('calculator');

    } catch (error) {
      console.error('Erreur lors de la sélection des banques:', error);
      setPortfolio(null);
      setLoading(false);
    }
  };

  const renderSection = () => {
    switch(activeSection) {
      case 'theorie':
        return <TheorieSection />;
      case 'markowitz':
        return <MarkowitzSection />;
      case 'hrp':
        return <HRPSection />;
      case 'comparaison':
        return <ComparisonSection />;
      case 'covid':
        return <CovidComparisonSection />;
      case 'calculator':
        return (
          <div className="calculator-section">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="text-center mb-5">
                    <h2 className="display-4 mb-3">
                      <i className="fas fa-chart-line text-primary me-3"></i>
                      Résultats du Portefeuille
                    </h2>
                    <p className="lead text-muted">
                      Comparaison des stratégies d'optimisation Markowitz vs HRP
                    </p>
                    <div className="selected-banks-summary mb-4">
                      <h5 className="text-primary">
                        <i className="fas fa-university me-2"></i>
                        Banques sélectionnées ({selectedBanks.length})
                      </h5>
                      <div className="d-flex flex-wrap justify-content-center gap-2">
                        {selectedBanks.map((bank, index) => (
                          <span key={index} className="badge bg-light text-primary border px-3 py-2">
                            <img
                              src={bank.logo}
                              alt={bank.name}
                              style={{ width: '20px', height: '20px', marginRight: '5px' }}
                            />
                            {bank.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row g-4">
                <div className="col-lg-6">
                  <div className="chart-card">
                    <div className="card-header-custom">
                      <h4 className="mb-0">
                        <i className="fas fa-chart-pie text-success me-2"></i>
                        Optimisation Markowitz
                      </h4>
                    </div>
                    <div className="card-body">
                      <MarkowitzChart portfolio={portfolio.markowitz} />
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="chart-card">
                    <div className="card-header-custom">
                      <h4 className="mb-0">
                        <i className="fas fa-route text-info me-2"></i>
                        Optimisation HRP
                      </h4>
                    </div>
                    <div className="card-body">
                      <HRPChart portfolio={portfolio.hrp} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-12">
                  <PortfolioResults
                    markowitz={portfolio.markowitz}
                    hrp={portfolio.hrp}
                  />
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-12 text-center">
                  <button
                    className="btn btn-outline-primary btn-lg me-3"
                    onClick={() => setActiveSection('selection')}
                  >
                    <i className="fas fa-arrow-left me-2"></i>
                    Retour à la sélection
                  </button>
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={() => {
                      setSelectedBanks([]);
                      setPortfolio(null);
                      setActiveSection('selection');
                    }}
                  >
                    <i className="fas fa-redo me-2"></i>
                    Nouvelle analyse
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'selection':
        return (
          <>
            <BankSelector onSelectBanks={handleBankSelection} />

            {loading && (
              <div className="loading-container">
                <div className="spinner"></div>
                <h4 className="mt-3">Optimisation en cours...</h4>
                <p className="text-muted">Calcul des portefeuilles...</p>
              </div>
            )}

            {!loading && selectedBanks.length === 0 && (
              <div className="text-center p-5">
                <div className="display-1 mb-4">👆</div>
                <h3 className="mb-3">Sélectionnez des banques</h3>
                <p className="text-muted lead">
                  Choisissez des banques pour voir les résultats
                </p>
              </div>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Container className="app-container">
      <Header />
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
      {renderSection()}
      <Footer />
    </Container>
  );
}

export default App;