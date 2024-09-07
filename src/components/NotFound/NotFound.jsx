import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" style={styles.link}>Go back to Home</Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  link: {
    marginTop: '20px',
    display: 'inline-block',
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: 'bold',
  }
};

export default NotFound;
