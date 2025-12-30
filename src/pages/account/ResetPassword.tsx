import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { FormInput } from '@uhub/components';
import useResetPassword from './hooks/useResetPassword';
import AccountLayout from './AccountLayout';
import logoutIcon from '../../assets/images/logout-icon.svg';
import BottomLink from './BottomLink';

const ResetSuccess = () => {
  return (
    <>
      <div className="text-center">
        <h4 className="mt-0">Reset Successfull !</h4>
        <p className="text-muted mb-4">Your password has been changed.</p>
      </div>

      <div className="logout-icon m-auto">
        <img src={logoutIcon} height="58px" alt="logout-cion" />
      </div>
    </>
  );
};

const ResetPassword = () => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    errorMessage,
    submitted,
    isSuccess,
  } = useResetPassword();

  return (
    <AccountLayout>
      {isSuccess ? (
        <ResetSuccess />
      ) : (
        <div className="m-auto">
          <h4 className="mt-0 mb-3 text-center">Reset Password</h4>

          {errorMessage && (
            <Alert variant="danger" className="my-2">
              {errorMessage}
            </Alert>
          )}

          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              type="password"
              label="New Password"
              name="password"
              control={control}
              errors={errors}
              register={register}
              containerClass="mb-3"
            />

            <FormInput
              type="password"
              label="Confirm Password"
              name="password_confirmation"
              control={control}
              errors={errors}
              register={register}
              containerClass="mb-3"
            />

            <div className="mb-4 text-center d-grid">
              <Button
                variant="secondary"
                type="submit"
                className="btn btn-secondary"
                disabled={submitted}>
                <i className="mdi mdi-lock-reset me-half" />
                Reset Password
              </Button>
            </div>
          </Form>
          <BottomLink />
        </div>
      )}
    </AccountLayout>
  );
};

export default ResetPassword;
