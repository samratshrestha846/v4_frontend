/* eslint-disable no-nested-ternary */
// @flow
import React, { useEffect } from 'react';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector, useDispatch } from 'react-redux';
// actions
import { resetAuth, loginUser } from '../../redux/actions';
// components
import { VerticalForm, FormInput } from '../../components';
import AccountLayout from './AccountLayout';

/* bottom link */
const BottomLink = () => {
  return (
    <Row className="mt-3">
      <Col className="text-center">
        <p className="text-muted">
          {`Don't have an account ?`}
          <a
            href="https://ditagtech.com.au/contact/"
            className="fw-normal ms-1 link-primary"
            target="_blank"
            rel="noreferrer">
            Contact Us
          </a>
        </p>
      </Col>
    </Row>
  );
};

const Login: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  const { loading, userLoggedIn, user, error, verifyMfa, otpToken, email } =
    useSelector((state: any) => ({
      loading: state.Auth.loading,
      user: state.Auth.user,
      error: state.Auth.error,
      userLoggedIn: state.Auth.userLoggedIn,
      verifyMfa: state.Auth.verifyMfa,
      email: state.Auth.email,
      otpToken: state.Auth.otpToken,
    }));
  /*
    form validation schema
    */
  const schemaResolver = yupResolver(
    yup.object().shape({
      username: yup
        .string()
        .email('Enter a valid email address.')
        .required('Enter your email address.'),
      password: yup.string().required('Enter your password.'),
    })
  );

  /*
    handle form submission
    */
  const onSubmit = (formData: { username: string; password: string }) => {
    dispatch(loginUser(formData.username, formData.password));
  };

  return (
    <>
      {userLoggedIn || user ? (
        <Navigate to="/" replace />
      ) : verifyMfa ? (
        <Navigate to={`/login/verify-otp/${otpToken}?email=${email}`} replace />
      ) : null}

      <AccountLayout>
        {error?.response?.data?.message && (
          <Alert variant="danger" className="my-2">
            {error.response.data.message}
          </Alert>
        )}

        <VerticalForm onSubmit={onSubmit} resolver={schemaResolver}>
          <FormInput
            label="Email"
            type="text"
            name="username"
            placeholder="Enter your email"
            containerClass="mb-3"
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            containerClass="mb-1"
          />

          <div className="d-flex justify-content-end mb-3">
            <Link to="/forget-password" className="link-primary ">
              <small>Forgot your password ?</small>
            </Link>
          </div>

          <div className="d-grid gap-2 text-center">
            <Button
              variant="secondary"
              type="submit"
              disabled={loading}
              className="btn btn-secondary">
              Sign In
            </Button>
          </div>
          <div className="mb-0 text-center">
            <BottomLink />
          </div>
        </VerticalForm>
      </AccountLayout>
    </>
  );
};

export default Login;
