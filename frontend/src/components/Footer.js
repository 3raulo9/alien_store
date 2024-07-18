import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#121212', 
    color: '#21d07a', 
    textAlign: 'center',
    padding: '10px 0',
    fontSize: '1.2em',
  };

  return (
    <footer style={footerStyle}>
      <Container>
        <Row>
          <Col>
            COPYRIGHT © 2024 RAUL ASADOV, ALMOG RAGUAN - ALL RIGHTS RESERVED.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
