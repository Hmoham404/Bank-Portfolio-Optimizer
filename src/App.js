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
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('theorie');

  const handleBankSelection = (banks) => {
    try {
      console.log('Banques sélectionnées:', banks);
      setSelectedBanks(banks);
      setError(null);
      
      if (banks.length > 0) {
        setLoading(true);
        
        // Simuler un délai de calcul
        setTimeout(() => {
          try {
            const results = calculateMultiBankPortfolio(banks);
            console.log('Résultats calculés:', results);
            setPortfolio(results);
            setLoading(false);
          } catch (calcError) {
            console.error('Erreur de calcul:', calcError);
            setError('Erreur lors du calcul du portefeuille');
            setLoading(false);
          }
        }, 1000);
      } else {
        setPortfolio(null);
      }
    } catch (error) {
      console.error('Erreur dans handleBankSelection:', error);
      setError('Une erreur est survenue');
      setLoading(false);
    }
  };

  const renderSection = () => {
    try {
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
                  <p className="text-muted">Calcul de la frontière efficiente et du clustering hiérarchique</p>
                </div>
              )}
              
              {error && (
                <div className="alert alert-danger mt-3">
                  <strong>Erreur:</strong> {error}
                </div>
              )}
              
              {!loading && !error && selectedBanks.length > 0 && portfolio && (
                <div className="fade-in">
                  <h3 className="mt-5 mb-4">
                    Résultats pour votre portefeuille
                    <small className="text-muted ms-3">
                      {selectedBanks.length} banque(s) sélectionnée(s)
                    </small>
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
              
              {!loading && !error && selectedBanks.length === 0 && (
                <div className="text-center p-5">
                  <div className="display-1 mb-4">👆</div>
                  <h3 className="mb-3">Prêt à commencer ?</h3>
                  <p className="text-muted lead">
                    Sélectionnez des banques pour voir l'optimisation en action !
                  </p>
                </div>
              )}
            </>
          );
        default:
          return null;
      }
    } catch (error) {
      console.error('Erreur dans renderSection:', error);
      return <div className="alert alert-danger">Erreur d'affichage</div>;
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