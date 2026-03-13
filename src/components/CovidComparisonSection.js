import React, { useState } from 'react';
import { Row, Col, Card, ButtonGroup, ToggleButton } from 'react-bootstrap';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const CovidComparisonSection = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('pre');

  const periods = [
    { name: 'Pré-COVID', value: 'pre', icon: '😊', years: '2018-2019' },
    { name: 'Pendant COVID', value: 'covid', icon: '😷', years: '2020-2021' },
    { name: 'Post-COVID', value: 'post', icon: '🚀', years: '2022-2023' }
  ];

  const performanceData = {
    pre: {
      markowitz: { return: 12.5, risk: 8.2, sharpe: 1.28 },
      hrp: { return: 11.8, risk: 7.5, sharpe: 1.31 },
      prices: [100, 102, 105, 108, 112, 115, 118, 122, 125, 128, 132, 135],
      volatility: [8.1, 8.3, 8.0, 8.4, 8.2, 8.1, 8.3, 8.2, 8.4, 8.0, 8.1, 8.2]
    },
    covid: {
      markowitz: { return: -5.2, risk: 25.5, sharpe: -0.28 },
      hrp: { return: -3.8, risk: 18.2, sharpe: -0.32 },
      prices: [100, 95, 82, 75, 78, 85, 88, 92, 95, 98, 102, 105],
      volatility: [15.2, 22.5, 28.3, 30.1, 25.8, 22.3, 20.1, 18.5, 17.2, 16.5, 15.8, 15.1]
    },
    post: {
      markowitz: { return: 18.5, risk: 12.5, sharpe: 1.32 },
      hrp: { return: 16.2, risk: 10.2, sharpe: 1.42 },
      prices: [100, 105, 112, 118, 125, 132, 138, 145, 152, 158, 165, 172],
      volatility: [10.2, 10.5, 11.2, 11.8, 12.5, 12.8, 13.2, 12.8, 12.5, 12.2, 11.8, 11.2]
    }
  };

  const currentData = performanceData[selectedPeriod];

  const priceChartData = {
    labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    datasets: [
      {
        label: 'Évolution des prix',
        data: currentData.prices,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 8,
      }
    ]
  };

  const volatilityChartData = {
    labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    datasets: [
      {
        label: 'Volatilité',
        data: currentData.volatility,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 8,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(30,60,114,0.9)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'white',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0,0,0,0.05)'
        }
      }
    }
  };

  return (
    <div className="section-container covid-section">
      <h2 className="section-title">
        <span className="section-icon">🦠</span>
        Impact du COVID-19 sur les Portefeuilles Bancaires
        <span className="section-icon">📊</span>
      </h2>

      <div className="period-selector">
        <ButtonGroup className="period-buttons">
          {periods.map((period) => (
            <ToggleButton
              key={period.value}
              id={`period-${period.value}`}
              type="radio"
              variant="outline-primary"
              name="period"
              value={period.value}
              checked={selectedPeriod === period.value}
              onChange={(e) => setSelectedPeriod(e.currentTarget.value)}
              className="period-button"
            >
              <span className="period-icon">{period.icon}</span>
              <div className="period-info">
                <span className="period-name">{period.name}</span>
                <small className="period-years">{period.years}</small>
              </div>
            </ToggleButton>
          ))}
        </ButtonGroup>
      </div>

      <Row className="mt-5">
        <Col lg={6}>
          <Card className="covid-card markowitz-card">
            <Card.Body>
              <div className="covid-card-header">
                <span className="card-icon">📊</span>
                <h4>Markowitz</h4>
                <span className="performance-badge" 
                  style={{background: currentData.markowitz.return > 0 ? '#28a745' : '#dc3545'}}>
                  {currentData.markowitz.return > 0 ? '+' : ''}{currentData.markowitz.return}%
                </span>
              </div>
              
              <div className="metrics-grid">
                <div className="metric-box">
                  <span className="metric-label">Rendement</span>
                  <span className="metric-value" style={{color: currentData.markowitz.return > 0 ? '#28a745' : '#dc3545'}}>
                    {currentData.markowitz.return > 0 ? '+' : ''}{currentData.markowitz.return}%
                  </span>
                </div>
                <div className="metric-box">
                  <span className="metric-label">Risque</span>
                  <span className="metric-value">{currentData.markowitz.risk}%</span>
                </div>
                <div className="metric-box">
                  <span className="metric-label">Sharpe</span>
                  <span className="metric-value" style={{color: currentData.markowitz.sharpe > 0 ? '#28a745' : '#dc3545'}}>
                    {currentData.markowitz.sharpe > 0 ? '+' : ''}{currentData.markowitz.sharpe}
                  </span>
                </div>
              </div>

              <div className="covid-insight">
                <span className="insight-icon">💡</span>
                <p className="insight-text">
                  {selectedPeriod === 'pre' && "Marché stable avec une croissance modérée. Le modèle Markowitz performe bien dans des conditions normales."}
                  {selectedPeriod === 'covid' && "Fort impact négatif avec une volatilité extrême. Markowitz montre ses limites face aux chocs soudains."}
                  {selectedPeriod === 'post' && "Forte reprise mais volatilité accrue. Markowitz capte bien la tendance haussière."}
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="covid-card hrp-card">
            <Card.Body>
              <div className="covid-card-header">
                <span className="card-icon">🌲</span>
                <h4>HRP</h4>
                <span className="performance-badge" 
                  style={{background: currentData.hrp.return > 0 ? '#28a745' : '#dc3545'}}>
                  {currentData.hrp.return > 0 ? '+' : ''}{currentData.hrp.return}%
                </span>
              </div>
              
              <div className="metrics-grid">
                <div className="metric-box">
                  <span className="metric-label">Rendement</span>
                  <span className="metric-value" style={{color: currentData.hrp.return > 0 ? '#28a745' : '#dc3545'}}>
                    {currentData.hrp.return > 0 ? '+' : ''}{currentData.hrp.return}%
                  </span>
                </div>
                <div className="metric-box">
                  <span className="metric-label">Risque</span>
                  <span className="metric-value">{currentData.hrp.risk}%</span>
                </div>
                <div className="metric-box">
                  <span className="metric-label">Sharpe</span>
                  <span className="metric-value" style={{color: currentData.hrp.sharpe > 0 ? '#28a745' : '#dc3545'}}>
                    {currentData.hrp.sharpe > 0 ? '+' : ''}{currentData.hrp.sharpe}
                  </span>
                </div>
              </div>

              <div className="covid-insight">
                <span className="insight-icon">💡</span>
                <p className="insight-text">
                  {selectedPeriod === 'pre' && "Performance légèrement inférieure mais plus stable. La diversification hiérarchique montre ses avantages."}
                  {selectedPeriod === 'covid' && "Meilleure résistance grâce à la diversification. Pertes limitées et reprise plus rapide."}
                  {selectedPeriod === 'post' && "Excellente reprise avec un risque mieux maîtrisé. Le ratio de Sharpe supérieur confirme sa robustesse."}
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col lg={6}>
          <Card className="chart-card">
            <Card.Body>
              <h5 className="chart-title">
                <span className="chart-icon">📈</span>
                Évolution des prix - {periods.find(p => p.value === selectedPeriod).name}
              </h5>
              <div style={{ height: '250px' }}>
                <Line data={priceChartData} options={chartOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="chart-card">
            <Card.Body>
              <h5 className="chart-title">
                <span className="chart-icon">📊</span>
                Volatilité - {periods.find(p => p.value === selectedPeriod).name}
              </h5>
              <div style={{ height: '250px' }}>
                <Line data={volatilityChartData} options={chartOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="comparison-table-card mt-4">
        <Card.Body>
          <h5 className="mb-4">
            <span className="section-icon">📋</span>
            Analyse comparative détaillée
          </h5>
          
          <div className="table-responsive">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Période</th>
                  <th>Métrique</th>
                  <th>Markowitz</th>
                  <th>HRP</th>
                  <th>Différence</th>
                  <th>Analyse</th>
                </tr>
              </thead>
              <tbody>
                <tr className="pre-row">
                  <td rowSpan="3">Pré-COVID</td>
                  <td>Rendement</td>
                  <td className="positive">+12.5%</td>
                  <td className="positive">+11.8%</td>
                  <td className="neutral">-0.7%</td>
                  <td rowSpan="3">Marché stable, Markowitz légèrement supérieur en rendement, HRP meilleur en gestion du risque</td>
                </tr>
                <tr className="pre-row">
                  <td>Risque</td>
                  <td>8.2%</td>
                  <td className="positive">7.5%</td>
                  <td className="positive">-0.7%</td>
                </tr>
                <tr className="pre-row">
                  <td>Sharpe</td>
                  <td>1.28</td>
                  <td className="positive">1.31</td>
                  <td className="positive">+0.03</td>
                </tr>

                <tr className="covid-row">
                  <td rowSpan="3">Pendant COVID</td>
                  <td>Rendement</td>
                  <td className="negative">-5.2%</td>
                  <td className="negative">-3.8%</td>
                  <td className="positive">+1.4%</td>
                  <td rowSpan="3">Crise majeure, HRP montre sa robustesse avec des pertes limitées et une volatilité mieux contrôlée</td>
                </tr>
                <tr className="covid-row">
                  <td>Risque</td>
                  <td className="negative">25.5%</td>
                  <td className="negative">18.2%</td>
                  <td className="positive">-7.3%</td>
                </tr>
                <tr className="covid-row">
                  <td>Sharpe</td>
                  <td className="negative">-0.28</td>
                  <td className="negative">-0.32</td>
                  <td className="neutral">-0.04</td>
                </tr>

                <tr className="post-row">
                  <td rowSpan="3">Post-COVID</td>
                  <td>Rendement</td>
                  <td className="positive">+18.5%</td>
                  <td className="positive">+16.2%</td>
                  <td className="neutral">-2.3%</td>
                  <td rowSpan="3">Forte reprise, HRP offre un meilleur compromis risque/rendement avec un Sharpe supérieur</td>
                </tr>
                <tr className="post-row">
                  <td>Risque</td>
                  <td>12.5%</td>
                  <td className="positive">10.2%</td>
                  <td className="positive">-2.3%</td>
                </tr>
                <tr className="post-row">
                  <td>Sharpe</td>
                  <td>1.32</td>
                  <td className="positive">1.42</td>
                  <td className="positive">+0.10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>

      <Row className="mt-5">
        <Col md={4}>
          <Card className="conclusion-card">
            <Card.Body className="text-center">
              <div className="conclusion-icon">📌</div>
              <h6>Leçon 1</h6>
              <p>La diversification est cruciale en période de crise</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="conclusion-card">
            <Card.Body className="text-center">
              <div className="conclusion-icon">🎯</div>
              <h6>Leçon 2</h6>
              <p>HRP plus robuste face aux chocs de marché</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="conclusion-card">
            <Card.Body className="text-center">
              <div className="conclusion-icon">⚡</div>
              <h6>Leçon 3</h6>
              <p>Markowitz performe mieux en conditions normales</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CovidComparisonSection;