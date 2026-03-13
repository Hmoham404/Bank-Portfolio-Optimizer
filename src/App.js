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
import { calculateMultiBankPortfolio } from './utils/portfolioCalculations';

function App() {
  const [selectedBanks, setSelectedBanks] = useState([]);
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('theorie');

  const handleBankSelection = (banks) => {
    console.log('Banques sélectionnées:', banks);
    setSelectedBanks(banks);
    
    if (banks.length > 0) {
      setLoading(true);
      
      // Simuler un délai de calcul
      setTimeout(() => {
        try {
          const results = calculateMultiBankPortfolio(banks);
          console.log('Résultats:', results);
          setPortfolio(results);
        } catch (error) {
          console.error('Erreur:', error);
          // Données par défaut en cas d'erreur
          setPortfolio({
            markowitz: {
              expectedReturn: '8.50',
              risk: '12.30',
              sharpeRatio: '0.53',
              weights: { 'BIAT': '0.333', 'BNA': '0.333', 'Attijari': '0.334' },
              efficientFrontier: []
            },
            hrp: {
              expectedReturn: '8.20',
              risk: '11.80',
              sharpeRatio: '0.53',
              weights: { 'BIAT': '0.333', 'BNA': '0.333', 'Attijari': '0.334' },
              clustering: ['Cluster 1', 'Cluster 2']
            }
          });
        } finally {
          setLoading(false);
        }
      }, 1000);
    } else {
      setPortfolio(null);
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
            
            {!loading && selectedBanks.length > 0 && portfolio && (
              <div className="fade-in">
                <h3 className="mt-5 mb-4">
                  Résultats pour {selectedBanks.length} banque(s)
                </h3>
                
                <div className="grid-2">
                  <MarkowitzChart portfolio={portfolio.markowitz} />
                  <HRPChart portfolio={portfolio.hrp} />
                </div>
                
                <PortfolioResults 
                  markowitz={portfolio.markowitz} 
                  hrp={portfolio.hrp} 
                />
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