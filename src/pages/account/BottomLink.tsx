import React from 'react';
import { Link } from 'react-router-dom';

const BottomLink = () => {
  return (
    <footer className="footer footer-alt">
      <p className="text-muted">
        {'Back to '}
        <Link to="/login" className="link-primary fw-normal ms-1 ">
          Log In
        </Link>
      </p>
    </footer>
  );
};

export default BottomLink;
