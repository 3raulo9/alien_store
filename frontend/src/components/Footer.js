import React from "react";
import { Container, Row, Col } from "react-bootstrap";
// Sample Footer component with dark theme and green highlights
const Footer = () => {
  const footerStyle = {
    backgroundColor: '#121212', // Dark background color
    color: '#21d07a', // Bright green text color
    textAlign: 'center',
    padding: '10px 0',
    fontSize: '1.2em',
  };

  return (
    <footer style={footerStyle}>
      <Container>
        <Row>
          <Col>
            COPYRIGHT © 2024 RAUL ASADOV - ALL RIGHTS RESERVED.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
