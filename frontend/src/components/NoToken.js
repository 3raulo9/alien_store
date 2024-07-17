import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const NoToken = () => {
  const linkStyle = {
    color: 'white',
    fontWeight: 'bold'
  };

  return (
    <Container className="mt-5">
      <h2>Access Denied</h2>
      <p>
        To access this page, you need to{' '}
        <Link to="/login" style={linkStyle}>log in</Link> or{' '}
        <Link to="/register" style={linkStyle}>register</Link>.
      </p>
    </Container>
  );
};

export default NoToken;
