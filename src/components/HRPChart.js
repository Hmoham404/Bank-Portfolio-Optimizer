import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const HRPChart = ({ portfolio }) => {
  if (!portfolio) return null;

  const pieData = {
    labels: Object.keys(portfolio.weights),
    datasets: [
      {
        label: 'Poids des actifs',
        data: Object.values(portfolio.weights).map(w => parseFloat(w) * 100),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const dendrogramData = {
    labels: portfolio.clustering || ['Cluster 1', 'Cluster 2', 'Cluster 3'],
    datasets: [
      {
        label: 'Hiérarchie des clusters',
        data: [5, 4, 3, 2, 1],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      }
    ]
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Distribution des poids HRP 🥧',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.label}: ${context.raw}%`;
          }
        }
      }
    }
  };

  return (
    <Card className="chart-container">
      <Card.Body>
        <Row>
          <Col md={6}>
            <div style={{ height: '250px' }}>
              <Pie data={pieData} options={pieOptions} />
            </div>
          </Col>
          <Col md={6}>
            <h6 className="text-center mb-3">
              <span role="img" aria-label="tree">🌳</span> 
              Structure hiérarchique (Clustering)
            </h6>
            <div style={{ height: '200px' }}>
              <Line 
                data={dendrogramData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false }
                  },
                  scales: {
                    y: { display: false }
                  }
                }} 
              />
            </div>
          </Col>
        </Row>
        
        <div className="mt-3">
          <h6>📊 Avantages HRP :</h6>
          <ul className="text-muted small">
            <li>✓ Plus robuste aux changements de marché</li>
            <li>✓ Meilleure diversification</li>
            <li>✓ Moins sensible aux erreurs d'estimation</li>
            <li>✓ Poids plus équilibrés</li>
          </ul>
        </div>
      </Card.Body>
    </Card>
  );
};

export default HRPChart;