import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container-fluid">
        <Row>
          <Col md={6}>{currentYear} © DIT AgTech</Col>

          <Col md={6}>
            <div className="text-md-end footer-links d-none d-md-block">
              <a
                href="https://ditagtech.com.au/"
                rel="noreferrer"
                target="_blank">
                About
              </a>
              <a href="/privacy-policy.html" rel="noreferrer" target="_blank">
                Privacy Policy
              </a>
              <a
                href="https://ditagtech.com.au/contact/"
                rel="noreferrer"
                target="_blank">
                Contact Us
              </a>
            </div>
          </Col>
        </Row>
      </div>
    </footer>
  );
};

export default Footer;
