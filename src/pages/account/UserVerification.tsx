import React from 'react';
import { Button, Alert, Row, Col, Form } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { FormInput } from '../../components';
import AccountLayout from './AccountLayout';
import useVerifyMFAToken from './hooks/useVerifyMFAToken';

/* bottom link */
const BottomLink = () => {
  return (
    <Row className="mt-3">
      <Col className="text-center">
        <p className="text-muted">
          {`Don't have an account?`}
          <a
            href="https://ditagtech.com.au/contact/"
            className="text-muted ms-1">
            <b>Contact Us</b>
          </a>
        </p>
      </Col>
    </Row>
  );
};

const UserVerification = () => {
  const { loading, userLoggedIn, user, error } = useSelector((state: any) => ({
    loading: state.Auth.loading,
    user: state.Auth.user,
    error: state.Auth.error,
    userLoggedIn: state.Auth.userLoggedIn,
  }));

  const {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    submitted,
    token,
    email,
  } = useVerifyMFAToken();

  return (
    <>
      {userLoggedIn || user ? <Navigate to="/" replace /> : null}

      <AccountLayout>
        <div className="text-center w-75 m-auto">
          <h4 className="text-dark-50 text-center mt-0 fw-bold mb-4">
            Verify OTP
          </h4>
        </div>

        {error && (
          <Alert variant="danger" className="my-2">
            {error.response.data.message ??
              'Ooops something went wrong. Please try again.'}
          </Alert>
        )}

        {errors && (errors.otpToken || errors.email) && (
          <Alert variant="danger" className="my-2">
            {errors?.otpToken?.message ?? 'OTP Verification link is invalid.'}
          </Alert>
        )}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            type="hidden"
            name="email"
            defaultValue={email}
            register={register}
            control={control}
          />
          <FormInput
            type="hidden"
            name="otpToken"
            defaultValue={token}
            register={register}
            control={control}
          />
          <FormInput
            label="Enter Code"
            type="text"
            name="code"
            placeholder="XXXXXX"
            containerClass="mb-3"
            register={register}
            control={control}
            errors={errors}
          />

          <div className="mb-2 d-grid gap-2 mb-0 text-center ">
            <Button
              size="sm"
              variant="secondary"
              type="submit"
              disabled={submitted || loading}
              className="btn btn-secondary">
              <i className="bx bx-check-shield me-half" />
              {submitted || loading ? 'Verifying...' : 'Verify'}
            </Button>
          </div>
        </Form>
        <BottomLink />
      </AccountLayout>
    </>
  );
};

export default UserVerification;
