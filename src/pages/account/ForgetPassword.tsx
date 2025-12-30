// @flow
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Alert } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// actions
import { resetAuth, forgotPassword } from '../../redux/actions';

// components
import { VerticalForm, FormInput } from '../../components';

import AccountLayout from './AccountLayout';
import Confirm from './Confirm';
import BottomLink from './BottomLink';

const ForgetPassword: React.FC = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');

  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  const { loading, passwordReset, resetPasswordSuccess, error } = useSelector(
    (state: any) => ({
      loading: state.Auth.loading,
      resetPasswordSuccess: state.Auth.resetPasswordSuccess,
      error: state.Auth.error,
      passwordReset: state.Auth.passwordReset,
    })
  );

  /*
   * form validation schema
   */
  const schemaResolver = yupResolver(
    yup.object().shape({
      username: yup
        .string()
        .email('Please enter your valid email address.')
        .required('Please enter your email address.'),
    })
  );

  /*
   * handle form submission
   */
  const onSubmit = (formData: { username: string }) => {
    setEmail(formData.username);
    dispatch(forgotPassword(formData.username));
  };

  return resetPasswordSuccess ? (
    <Confirm email={email} />
  ) : (
    <AccountLayout>
      <h4 className="mt-0">Reset Password</h4>
      <p className="text-muted mb-3">
        {`Enter your email address and we'll send you an email with instructions
        to reset your password`}
      </p>

      {error?.response?.data && (
        <Alert variant="danger" className="my-2">
          {error?.response?.data?.message ??
            `Oops something went wrong. Please try again.`}
        </Alert>
      )}

      {!passwordReset && (
        <VerticalForm onSubmit={onSubmit} resolver={schemaResolver}>
          <FormInput
            label="Email"
            type="text"
            name="username"
            placeholder="Enter your email"
            containerClass="mb-3"
          />

          <div className="mb-4 text-center d-grid">
            <Button
              variant="secondary"
              className="btn btn-secondary"
              type="submit"
              disabled={loading}>
              <i className="mdi mdi-lock-reset me-half" /> Reset Password
            </Button>
          </div>
        </VerticalForm>
      )}
      <BottomLink />
    </AccountLayout>
  );
};

export default ForgetPassword;
