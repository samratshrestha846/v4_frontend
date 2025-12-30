// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import useAuth from '@uhub/hooks/useAuth';
// components
import Logo from '../../assets/images/logo.svg';
import notFoundImg from '../../assets/images/startman.svg';
import { UHUB_DASHBOARD } from '../../constants/path';
import { UNIFIED_DASHBOARD } from '../../modules/dashboard/constants/path';

const PermissionError = () => {
  const { isCustomer, isStationManager } = useAuth();
  return (
    <>
      <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">
        <div className="container">
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5} xxl={4}>
              <Card>
                {/* logo */}
                <Card.Header className="pt-4 pb-4 text-center bg-primary">
                  <Link to="/">
                    <span>
                      <img src={Logo} alt="" height="18" />
                    </span>
                  </Link>
                </Card.Header>

                <Card.Body className="p-4">
                  <div className="text-center">
                    <img src={notFoundImg} height="120" alt="" />

                    <h1 className="text-error mt-4">403</h1>
                    <h4 className="text-uppercase text-danger mt-3">
                      Permission Error
                    </h4>
                    <p className="text-muted mt-3">
                      It seems you do not have correct access. Please contact
                      administrator{' '}
                    </p>

                    <Link
                      className="btn btn-info mt-3"
                      to={
                        isCustomer || isStationManager
                          ? UHUB_DASHBOARD
                          : UNIFIED_DASHBOARD
                      }>
                      <i className="mdi mdi-reply" /> Return Home
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      <footer className="footer footer-alt" />
    </>
  );
};

export default PermissionError;
