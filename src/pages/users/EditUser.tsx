/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import BackendValidationMessage from '../../components/BackendValidationMessage';
import CustomLoader from '../../components/CustomLoader';
import ErrorMessage from '../../components/ErrorMessage';
import useUpdateUser from './hooks/useUpdateUser';
import UserEditForm from './forms/UserEditForm';

type Props = {
  toggleModal: () => void;
  refetch: any;
  id: number;
};

const EditUser: React.FC<Props> = ({ toggleModal, refetch, id }) => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
    isFetchingUserDetail,
    isErrorUserDetail,
    userDetail,
  } = useUpdateUser({ toggleModal, refetch, id });

  if (isFetchingUserDetail) return <CustomLoader />;

  if (isErrorUserDetail) return <ErrorMessage />;

  return (
    <Row>
      <Col>
        {serverValidationError && (
          <BackendValidationMessage
            setServerValidationError={setServerValidationError}
          />
        )}

        <div className="p-1">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <UserEditForm
              control={control}
              register={register}
              errors={errors}
              userDetail={userDetail}
            />

            <div className="float-end button-list mt-2">
              <Button
                variant="outline"
                className="btn btn-ghost"
                onClick={toggleModal}>
                <i className="bx bx-x me-1" /> Cancel
              </Button>
              <Button
                variant="secondary"
                type="submit"
                className="btn btn-secondary "
                disabled={submitted}>
                <i className="bx bx-save me-1" /> Save
              </Button>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default EditUser;
