/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import jwtDecode from 'jwt-decode';

import { resetAuth, ceresTagLogin } from '../../redux/actions';
import { VerticalForm, FormInput } from '../../components';
import AccountLayout from '../account/AccountLayout';

import {
  UserAuthenticationRedirectQueryParams,
  UserAuthenticationRequestQueryParams,
} from '../../types/ceresTag/userAuthentication';

/* bottom link */
const BottomLink = () => {
  return (
    <Row className="mt-3">
      <Col className="text-center">
        <p className="text-muted">
          {`Don't have an account?`}
          <a
            href="https://ditagtech.com.au/contact/"
            className="fw-normal ms-1 link-primary">
            Contact Us
          </a>
        </p>
      </Col>
    </Row>
  );
};

const CustomerAuthenticationEndpoint: React.FC = () => {
  const [requestData, setRequestData] =
    useState<UserAuthenticationRequestQueryParams>();
  const dispatch = useDispatch();

  const processRequestData = () => {
    const parsedUrl = new URL(window.location.href);
    const parsedSearchedParams = new URLSearchParams(parsedUrl.search);
    const paramsObject: any = {};
    parsedSearchedParams.forEach((item, index) => {
      paramsObject[index] = item;
    });
    setRequestData(paramsObject);
  };

  useEffect(() => {
    processRequestData();
  }, []);

  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  const { loading, ceresTagUser, error } = useSelector((state: any) => ({
    loading: state.Auth.loading,
    ceresTagUser: state.Auth.ceresTagUser,
    error: state.Auth.error,
    userLoggedIn: state.Auth.userLoggedIn,
  }));

  const schemaResolver = yupResolver(
    yup.object().shape({
      username: yup.string().required('Please enter Email'),
      password: yup.string().required('Please enter Password'),
    })
  );

  const onSubmit = (formData: { [x: string]: string }) => {
    dispatch(ceresTagLogin(formData.username, formData.password));
  };

  useEffect(() => {
    if (ceresTagUser && requestData) {
      const { token } = ceresTagUser!;
      const { state, redirect_uri } = requestData!;
      const expiredIn: any = jwtDecode(token); // jwtDecode provides the exp. timestamps in seconds
      const currentTimestamp = moment().valueOf(); // timestamps in milliseconds

      const diffInSeconds = moment(expiredIn.exp * 1000).diff(
        currentTimestamp,
        'seconds'
      ); // convert timestamps in milliseconds and compute the difference in seconds
      const redirectQueryParams: UserAuthenticationRedirectQueryParams = {
        token_type: 'Bearer',
        access_token: token,
        state,
        expires_in: diffInSeconds.toString(),
      };

      const queryParams = new URLSearchParams(redirectQueryParams);
      const redirectedUrl = `${redirect_uri}?${queryParams}`;
      window.location.href = redirectedUrl;
    }
  }, [ceresTagUser, requestData]);

  return (
    <AccountLayout>
      <div className="text-center w-75 m-auto">
        <h4 className="text-dark-50 text-center mt-0 fw-bold mb-4">Sign In</h4>
      </div>

      {error && (
        <Alert variant="danger" className="my-2">
          {error.response.data.status.code_text}
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
        />
        <div className="mb-3 d-flex justify-content-end">
          <Link to="/forget-password" className="link-primary ">
            <small>Forgot your password</small>
          </Link>
        </div>

        <div className="mb-2 d-grid gap-2 mb-0 text-center ">
          <Button
            size="sm"
            variant="secondary"
            type="submit"
            disabled={loading}
            className="btn btn-secondary">
            Sign In
          </Button>
        </div>

        <br />

        <div className="mb-0 text-center">
          <BottomLink />
        </div>
      </VerticalForm>
    </AccountLayout>
  );
};

export default CustomerAuthenticationEndpoint;
