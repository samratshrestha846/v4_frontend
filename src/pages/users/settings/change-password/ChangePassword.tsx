import React from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import useChangePassword from './hooks/useChangePassword';
import { FormInput } from '../../../../components';
import BackendValidationMessage from '../../../../components/BackendValidationMessage';

const ChangePassword = () => {
  const {
    register,
    control,
    errors,
    onSubmit,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
    reset,
  } = useChangePassword();

  return (
    <>
      <h5 className=" m-2 text-primary-color">Change Password</h5>
      <Row className="justify-content-md-start">
        <Col md={6}>
          <Card>
            <Card.Body>
              {serverValidationError && (
                <BackendValidationMessage
                  setServerValidationError={setServerValidationError}
                />
              )}
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="mb-1">
                  <div className="mb-2">
                    <FormInput
                      label="Old Password"
                      type="password"
                      name="old_password"
                      placeholder="Enter your old password here"
                      register={register}
                      key="old_password"
                      errors={errors}
                      control={control}
                      containerClass="mb-2"
                    />
                  </div>

                  <div className="mb-2">
                    <FormInput
                      label="New Password"
                      type="password"
                      name="password"
                      placeholder="Enter your new password here"
                      register={register}
                      key="password"
                      errors={errors}
                      control={control}
                    />
                    <Form.Text>
                      The password must be at least 8 characters and combination
                      of Upppercase, lowercase and a number
                    </Form.Text>
                  </div>

                  <FormInput
                    label="Confirm Password"
                    type="password"
                    name="password_confirmation"
                    placeholder="Confirm your password here"
                    register={register}
                    key="new_password"
                    errors={errors}
                    control={control}
                    containerClass="mb-2"
                  />
                </Row>
                <div className="button-list float-end">
                  <Button
                    variant="outline"
                    className="btn btn-ghost"
                    onClick={() => reset()}>
                    <i className="bx bx-reset me-1 font-18" />
                    Clear
                  </Button>

                  <Button
                    variant="secondary"
                    className="btn btn-secondary "
                    type="submit"
                    disabled={submitted}>
                    <i className="bx bx-send me-1 font-18" />
                    Submit
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ChangePassword;
