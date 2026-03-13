import React from 'react';
import { Card } from 'react-bootstrap';
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

const MarkowitzChart = ({ portfolio }) => {
  if (!portfolio) return null;

  const data = {
    labels: ['0%', '5%', '10%', '15%', '20%', '25%', '30%', '35%', '40%', '45%', '50%'],
    datasets: [
      {
        label: 'Frontière Efficiente',
        data: portfolio.efficientFrontier.map(p => p.return),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 8,
      },
      {
        label: 'Portefeuille Optimal',
        data: [{x: parseFloat(portfolio.risk), y: parseFloat(portfolio.expectedReturn)}],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.8)',
        type: 'scatter',
        pointRadius: 10,
        pointStyle: 'star',
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Frontière Efficiente de Markowitz 📈',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `Rendement: ${context.raw}%`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Risque (Volatilité) %'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Rendement Attendu %'
        }
      }
    }
  };

  return (
    <Card className="chart-container">
      <Card.Body>
        <div style={{ height: '300px' }}>
          <Line data={data} options={options} />
        </div>
        <div className="mt-3 text-center">
          <small className="text-muted">
            <span role="img" aria-label="star">⭐</span> 
            Point bleu = Portefeuille optimal (Sharpe ratio max)
          </small>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MarkowitzChart;