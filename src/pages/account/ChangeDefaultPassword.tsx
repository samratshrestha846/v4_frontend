// @flow
import React from 'react';
import { Button, Alert, Form } from 'react-bootstrap';
import useChangeDefaultPassword from './hooks/useChangeDefaultPassword';
import AccountLayout from './AccountLayout';
import { FormInput } from '../../components';

const ChangeDefaultPassword: React.FC = () => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
  } = useChangeDefaultPassword();

  return (
    <AccountLayout>
      <div className="text-center w-75 m-auto">
        <h3 className="text-primary-color text-bold text-center mt-0 fw-bold mb-4">
          Change Password
        </h3>
      </div>

      {serverValidationError && (
        <Alert
          variant="danger"
          onClose={() => setServerValidationError(false)}
          dismissible>
          <strong>Validation Failed - </strong> Please fix validation errors and
          try again
        </Alert>
      )}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Temporary Password"
          type="text"
          name="old_password"
          register={register}
          errors={errors}
          placeholder="Enter old password"
          containerClass="mb-3"
          control={control}
          readOnly
        />

        <FormInput
          label="New Password"
          type="password"
          name="password"
          register={register}
          errors={errors}
          placeholder="Enter new password"
          containerClass="mb-3"
          control={control}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          name="password_confirmation"
          register={register}
          errors={errors}
          placeholder="Confirm new password"
          containerClass="mb-3"
          control={control}
        />

        <div className="d-grid gap-2 text-center">
          <Button
            variant="secondary"
            type="submit"
            disabled={submitted}
            className="btn btn-secondary">
            Submit
          </Button>
        </div>
      </Form>
    </AccountLayout>
  );
};

export default ChangeDefaultPassword;
