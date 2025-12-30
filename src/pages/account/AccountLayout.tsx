// @flow
import React, { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LogoWhite from '../../assets/images/logo-white.svg';

// eslint-disable-next-line
type AccountLayoutProps = {
  bottomLinks?: any;
  children?: any;
};

const AccountLayout = ({ bottomLinks, children }: AccountLayoutProps) => {
  useEffect(() => {
    if (document.body) document.body.classList.add('authentication-bg');

    return () => {
      if (document.body) document.body.classList.remove('authentication-bg');
    };
  }, []);

  return (
    <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={12} lg={6} xl={5} xxl={4}>
            <div className="d-flex justify-content-center mb-3">
              <Link to="/">
                <img src={LogoWhite} alt="" height="58" />
              </Link>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={12} lg={6} xl={5} xxl={4}>
            <Card>
              <Card.Body className="p-4">{children}</Card.Body>
              {bottomLinks}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AccountLayout;
