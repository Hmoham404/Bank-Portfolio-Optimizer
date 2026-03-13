import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <div className="footer">
      <Container>
        <Row className="align-items-center">
          <Col md={4}>
            <img 
              src="/images/logos/ihec-logo.png" 
              alt="IHEC"
              className="footer-logo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '📚';
              }}
            />
          </Col>
          <Col md={4}>
            <h5>IHEC Carthage</h5>
            <p className="small mb-0">Financial Engineering Department</p>
            <p className="small">© 2024 - Tous droits réservés</p>
          </Col>
          <Col md={4}>
            <img 
              src="/images/logos/fc-logo.png" 
              alt="Finance Club"
              className="footer-logo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '🎓';
              }}
            />
          </Col>
        </Row>
        <hr className="mt-3 bg-white" />
        <p className="small mb-0">
          <span role="img" aria-label="heart">❤️</span> 
          Application éducative - Comparaison Markowitz vs HRP
          <span role="img" aria-label="heart">❤️</span>
        </p>
        <div className="mt-2">
          <span className="badge bg-light text-dark me-2">📊 Data-driven</span>
          <span className="badge bg-light text-dark me-2">🎯 Educational</span>
          <span className="badge bg-light text-dark">⚡ Interactive</span>
        </div>
      </Container>
    </div>
  );
};

export default Footer;