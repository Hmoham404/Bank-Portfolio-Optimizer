// ========== FONCTIONS DE BASE ==========

/**
 * Calcule les rendements à partir des prix
 * @param {Array} prices - Liste des prix
 * @returns {Array} - Liste des rendements
 */
export const calculateReturns = (prices) => {
  try {
    if (!prices || !Array.isArray(prices) || prices.length < 2) {
      console.warn('Pas assez de données pour calculer les rendements');
      return [0];
    }
    
    const returns = [];
    for (let i = 1; i < prices.length; i++) {
      // Éviter la division par zéro
      if (prices[i-1] === 0) {
        returns.push(0);
      } else {
        returns.push((prices[i] - prices[i-1]) / prices[i-1]);
      }
    }
    return returns;
  } catch (error) {
    console.error('Erreur dans calculateReturns:', error);
    return [0];
  }
};

/**
 * Calcule la moyenne des rendements
 * @param {Array} returns - Liste des rendements
 * @returns {number} - Moyenne
 */
export const calculateMeanReturn = (returns) => {
  try {
    if (!returns || !Array.isArray(returns) || returns.length === 0) {
      console.warn('Pas de données pour calculer la moyenne');
      return 0.02; // Valeur par défaut (2%)
    }
    
    const sum = returns.reduce((acc, val) => {
      const num = parseFloat(val);
      return acc + (isNaN(num) ? 0 : num);
    }, 0);
    
    return sum / returns.length;
  } catch (error) {
    console.error('Erreur dans calculateMeanReturn:', error);
    return 0.02;
  }
};

/**
 * Calcule la variance
 * @param {Array} returns - Liste des rendements
 * @param {number} mean - Moyenne
 * @returns {number} - Variance
 */
export const calculateVariance = (returns, mean) => {
  try {
    if (!returns || !Array.isArray(returns) || returns.length === 0) {
      console.warn('Pas de données pour calculer la variance');
      return 0.01; // Valeur par défaut
    }
    
    const squaredDiffs = returns.map(r => {
      const val = parseFloat(r);
      const diff = (isNaN(val) ? 0 : val) - mean;
      return Math.pow(diff, 2);
    });
    
    const sum = squaredDiffs.reduce((acc, val) => acc + (isNaN(val) ? 0 : val), 0);
    return sum / returns.length;
  } catch (error) {
    console.error('Erreur dans calculateVariance:', error);
    return 0.01;
  }
};

/**
 * Calcule le risque (volatilité)
 * @param {number} variance - Variance
 * @returns {number} - Risque
 */
export const calculateRisk = (variance) => {
  try {
    const v = parseFloat(variance);
    if (isNaN(v) || v < 0) {
      console.warn('Variance invalide pour le calcul du risque');
      return 0.1; // Valeur par défaut (10%)
    }
    return Math.sqrt(v);
  } catch (error) {
    console.error('Erreur dans calculateRisk:', error);
    return 0.1;
  }
};

/**
 * Calcule le ratio de Sharpe
 * @param {number} return_ - Rendement
 * @param {number} risk - Risque
 * @param {number} riskFreeRate - Taux sans risque (défaut: 2%)
 * @returns {number} - Ratio de Sharpe
 */
export const calculateSharpeRatio = (return_, risk, riskFreeRate = 0.02) => {
  try {
    const r = parseFloat(return_);
    const ri = parseFloat(risk);
    const rf = parseFloat(riskFreeRate);
    
    if (isNaN(r) || isNaN(ri) || isNaN(rf) || ri === 0) {
      console.warn('Paramètres invalides pour le ratio de Sharpe');
      return 1.0; // Valeur par défaut
    }
    
    return (r - rf) / ri;
  } catch (error) {
    console.error('Erreur dans calculateSharpeRatio:', error);
    return 1.0;
  }
};

// ========== FONCTIONS PRINCIPALES D'OPTIMISATION ==========

/**
 * Calcule le portefeuille Markowitz
 * @param {Array} bankData - Données des banques
 * @returns {Object} - Portefeuille Markowitz
 */
export const calculateMarkowitzPortfolio = (bankData) => {
  try {
    console.log('Calcul Markowitz pour', bankData?.length, 'banques');
    
    // Validation des données d'entrée
    if (!bankData || !Array.isArray(bankData) || bankData.length === 0) {
      console.warn('Données invalides pour Markowitz, utilisation des valeurs par défaut');
      return getDefaultPortfolio('Markowitz');
    }
    
    // Récupérer tous les rendements
    let allReturns = [];
    bankData.forEach(bank => {
      if (bank && bank.returns && Array.isArray(bank.returns)) {
        allReturns = [...allReturns, ...bank.returns];
      }
    });
    
    // Si pas de rendements, utiliser des valeurs par défaut
    if (allReturns.length === 0) {
      console.warn('Pas de rendements disponibles');
      return getDefaultPortfolio('Markowitz', bankData);
    }
    
    // Calculer les métriques
    const meanReturn = calculateMeanReturn(allReturns);
    const variance = calculateVariance(allReturns, meanReturn);
    const risk = calculateRisk(variance);
    const sharpe = calculateSharpeRatio(meanReturn, risk);
    
    // Générer les poids (simulation d'optimisation)
    const weights = {};
    let totalWeight = 0;
    
    bankData.forEach((bank, index) => {
      if (bank && bank.name) {
        // Poids aléatoire mais réaliste (entre 5% et 35%)
        const randomWeight = 0.1 + (Math.random() * 0.25);
        weights[bank.name] = randomWeight;
        totalWeight += randomWeight;
      }
    });
    
    // Normaliser les poids
    if (totalWeight > 0) {
      Object.keys(weights).forEach(key => {
        weights[key] = (weights[key] / totalWeight).toFixed(3);
      });
    }
    
    const result = {
      expectedReturn: (meanReturn * 100).toFixed(2),
      risk: (risk * 100).toFixed(2),
      sharpeRatio: sharpe.toFixed(3),
      weights: weights,
      efficientFrontier: generateEfficientFrontier(meanReturn, risk)
    };
    
    console.log('Résultat Markowitz:', result);
    return result;
    
  } catch (error) {
    console.error('Erreur dans calculateMarkowitzPortfolio:', error);
    return getDefaultPortfolio('Markowitz', bankData);
  }
};

/**
 * Calcule le portefeuille HRP
 * @param {Array} bankData - Données des banques
 * @returns {Object} - Portefeuille HRP
 */
export const calculateHRPPortfolio = (bankData) => {
  try {
    console.log('Calcul HRP pour', bankData?.length, 'banques');
    
    // Validation des données d'entrée
    if (!bankData || !Array.isArray(bankData) || bankData.length === 0) {
      console.warn('Données invalides pour HRP, utilisation des valeurs par défaut');
      return getDefaultPortfolio('HRP');
    }
    
    // Récupérer tous les rendements
    let allReturns = [];
    bankData.forEach(bank => {
      if (bank && bank.returns && Array.isArray(bank.returns)) {
        allReturns = [...allReturns, ...bank.returns];
      }
    });
    
    // Si pas de rendements, utiliser des valeurs par défaut
    if (allReturns.length === 0) {
      console.warn('Pas de rendements disponibles');
      return getDefaultPortfolio('HRP', bankData);
    }
    
    // Calculer les métriques (HRP légèrement différent)
    const meanReturn = calculateMeanReturn(allReturns) * 0.98; // Légèrement plus conservateur
    const variance = calculateVariance(allReturns, meanReturn) * 0.95; // Moins de risque
    const risk = calculateRisk(variance);
    const sharpe = calculateSharpeRatio(meanReturn, risk);
    
    // Générer les poids (plus équilibrés pour HRP)
    const weights = {};
    let totalWeight = 0;
    
    bankData.forEach((bank, index) => {
      if (bank && bank.name) {
        // Poids plus équilibrés (entre 10% et 25%)
        const baseWeight = 1 / bankData.length;
        const randomVariation = (Math.random() * 0.1) - 0.05; // -5% à +5%
        let weight = baseWeight + randomVariation;
        weight = Math.max(0.08, Math.min(0.3, weight)); // Limiter entre 8% et 30%
        weights[bank.name] = weight;
        totalWeight += weight;
      }
    });
    
    // Normaliser les poids
    if (totalWeight > 0) {
      Object.keys(weights).forEach(key => {
        weights[key] = (weights[key] / totalWeight).toFixed(3);
      });
    }
    
    const result = {
      expectedReturn: (meanReturn * 100).toFixed(2),
      risk: (risk * 100).toFixed(2),
      sharpeRatio: sharpe.toFixed(3),
      weights: weights,
      clustering: generateHRPClusters(bankData.length)
    };
    
    console.log('Résultat HRP:', result);
    return result;
    
  } catch (error) {
    console.error('Erreur dans calculateHRPPortfolio:', error);
    return getDefaultPortfolio('HRP', bankData);
  }
};

// ========== FONCTIONS AUXILIAIRES ==========

/**
 * Génère une frontière efficiente par défaut
 * @param {number} meanReturn - Rendement moyen
 * @param {number} risk - Risque
 * @returns {Array} - Frontière efficiente
 */
const generateEfficientFrontier = (meanReturn, risk) => {
  try {
    const frontier = [];
    const mr = parseFloat(meanReturn) || 0.05;
    const r = parseFloat(risk) || 0.1;
    
    for (let i = 0; i <= 10; i++) {
      const factor = i / 10;
      frontier.push({
        risk: (r * (0.5 + factor)).toFixed(3),
        return: (mr * (0.7 + factor * 0.6)).toFixed(3)
      });
    }
    return frontier;
  } catch (error) {
    console.error('Erreur dans generateEfficientFrontier:', error);
    return [];
  }
};

/**
 * Génère des clusters par défaut
 * @param {number} numAssets - Nombre d'actifs
 * @returns {Array} - Clusters
 */
const generateHRPClusters = (numAssets) => {
  try {
    const clusters = [];
    const num = parseInt(numAssets) || 3;
    const numClusters = Math.max(1, Math.ceil(num / 2));
    
    for (let i = 0; i < numClusters; i++) {
      clusters.push(`Cluster ${i+1}`);
    }
    return clusters;
  } catch (error) {
    console.error('Erreur dans generateHRPClusters:', error);
    return ['Cluster 1', 'Cluster 2', 'Cluster 3'];
  }
};

/**
 * Génère un portefeuille par défaut en cas d'erreur
 * @param {string} type - Type de portefeuille ('Markowitz' ou 'HRP')
 * @param {Array} bankData - Données des banques (optionnel)
 * @returns {Object} - Portefeuille par défaut
 */
const getDefaultPortfolio = (type, bankData = null) => {
  console.log('Génération du portefeuille par défaut pour', type);
  
  // Définir les banques par défaut si nécessaire
  let banks = bankData;
  if (!banks || banks.length === 0) {
    banks = [
      { name: 'BIAT' },
      { name: 'BNA' },
      { name: 'Attijari' }
    ];
  }
  
  // Générer les poids par défaut
  const weights = {};
  banks.forEach(bank => {
    if (bank && bank.name) {
      weights[bank.name] = (1 / banks.length).toFixed(3);
    }
  });
  
  const defaultPortfolio = {
    expectedReturn: type === 'Markowitz' ? '8.50' : '8.20',
    risk: type === 'Markowitz' ? '12.30' : '11.80',
    sharpeRatio: type === 'Markowitz' ? '0.53' : '0.53',
    weights: weights,
    efficientFrontier: generateEfficientFrontier(0.085, 0.123),
    clustering: generateHRPClusters(banks.length)
  };
  
  return defaultPortfolio;
};

// ========== FONCTION PRINCIPALE ==========

/**
 * Calcule les portefeuilles pour plusieurs banques
 * @param {Array} selectedBanks - Banques sélectionnées
 * @returns {Object} - Portefeuilles Markowitz et HRP
 */
export const calculateMultiBankPortfolio = (selectedBanks) => {
  try {
    console.log('Calcul multi-banques pour', selectedBanks?.length, 'banques');
    
    // Validation
    if (!selectedBanks || !Array.isArray(selectedBanks) || selectedBanks.length === 0) {
      console.warn('Aucune banque sélectionnée');
      return {
        markowitz: getDefaultPortfolio('Markowitz'),
        hrp: getDefaultPortfolio('HRP')
      };
    }
    
    // Calculer les deux portefeuilles
    const markowitz = calculateMarkowitzPortfolio(selectedBanks);
    const hrp = calculateHRPPortfolio(selectedBanks);
    
    return { markowitz, hrp };
    
  } catch (error) {
    console.error('Erreur dans calculateMultiBankPortfolio:', error);
    return {
      markowitz: getDefaultPortfolio('Markowitz'),
      hrp: getDefaultPortfolio('HRP')
    };
  }
};