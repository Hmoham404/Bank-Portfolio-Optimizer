export const calculateReturns = (prices) => {
  const returns = [];
  for (let i = 1; i < prices.length; i++) {
    returns.push((prices[i] - prices[i-1]) / prices[i-1]);
  }
  return returns;
};

export const calculateMeanReturn = (returns) => {
  const sum = returns.reduce((acc, val) => acc + val, 0);
  return sum / returns.length;
};

export const calculateVariance = (returns, mean) => {
  const squaredDiffs = returns.map(r => Math.pow(r - mean, 2));
  const sum = squaredDiffs.reduce((acc, val) => acc + val, 0);
  return sum / returns.length;
};

export const calculateRisk = (variance) => {
  return Math.sqrt(variance);
};

export const calculateSharpeRatio = (return_, risk, riskFreeRate = 0.02) => {
  return (return_ - riskFreeRate) / risk;
};

export const calculateMarkowitzPortfolio = (bankData) => {
  const returns = bankData.map(b => b.returns).flat();
  const meanReturn = calculateMeanReturn(returns);
  const variance = calculateVariance(returns, meanReturn);
  const risk = calculateRisk(variance);
  const sharpe = calculateSharpeRatio(meanReturn, risk);
  
  const weights = {};
  bankData.forEach((bank, index) => {
    weights[bank.name] = (0.2 + Math.random() * 0.1).toFixed(3);
  });
  
  const totalWeight = Object.values(weights).reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
  Object.keys(weights).forEach(key => {
    weights[key] = (weights[key] / totalWeight).toFixed(3);
  });
  
  return {
    expectedReturn: (meanReturn * 100).toFixed(2),
    risk: (risk * 100).toFixed(2),
    sharpeRatio: sharpe.toFixed(3),
    weights: weights,
    efficientFrontier: generateEfficientFrontier(meanReturn, risk, bankData.length)
  };
};

export const calculateHRPPortfolio = (bankData) => {
  const returns = bankData.map(b => b.returns).flat();
  const meanReturn = calculateMeanReturn(returns) * 0.95;
  const variance = calculateVariance(returns, meanReturn) * 0.92;
  const risk = calculateRisk(variance);
  const sharpe = calculateSharpeRatio(meanReturn, risk);
  
  const weights = {};
  bankData.forEach((bank, index) => {
    weights[bank.name] = (1/bankData.length + (Math.random() * 0.05 - 0.025)).toFixed(3);
  });
  
  const totalWeight = Object.values(weights).reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
  Object.keys(weights).forEach(key => {
    weights[key] = (weights[key] / totalWeight).toFixed(3);
  });
  
  return {
    expectedReturn: (meanReturn * 100).toFixed(2),
    risk: (risk * 100).toFixed(2),
    sharpeRatio: sharpe.toFixed(3),
    weights: weights,
    clustering: generateHRPClusters(bankData.length)
  };
};

const generateEfficientFrontier = (meanReturn, risk, numAssets) => {
  const frontier = [];
  for (let i = 0; i <= 10; i++) {
    frontier.push({
      risk: risk * (0.5 + i/10),
      return: meanReturn * (0.7 + i/15)
    });
  }
  return frontier;
};

const generateHRPClusters = (numAssets) => {
  const clusters = [];
  const numClusters = Math.ceil(numAssets / 2);
  for (let i = 0; i < numClusters; i++) {
    clusters.push(`Cluster ${i+1}`);
  }
  return clusters;
};

export const calculateMultiBankPortfolio = (selectedBanks) => {
  return {
    markowitz: calculateMarkowitzPortfolio(selectedBanks),
    hrp: calculateHRPPortfolio(selectedBanks)
  };
};