import React from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import CustomLoader from '../../components/CustomLoader';
import ErrorMessage from '../../components/ErrorMessage';
import BackendValidationMessage from '../../components/BackendValidationMessage';
import useRolesDropdown from '../../hooks/dropdown/useRolesDropdown';
import useCreateUser from './hooks/useCreateUser';
import useCustomersDropdown from '../../hooks/dropdown/useCustomersDropdown';
import UserAddForm from './forms/UserAddForm';

type Props = {
  toggleModal: () => void;
  refetch: any;
};

const AddUser: React.FC<Props> = ({ toggleModal, refetch }) => {
  const { data: roleOptions, isFetching, isError } = useRolesDropdown();

  const {
    customersDropdown,
    isFetchingCustomersDropdown,
    isErrorCustomersDropdown,
  } = useCustomersDropdown();

  const {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
    showCustomerField,
    propagateOnRoleChange,
  } = useCreateUser({ toggleModal, refetch });

  if (isFetching || isFetchingCustomersDropdown) return <CustomLoader />;

  if (isError || isErrorCustomersDropdown) return <ErrorMessage />;

  return (
    <>
      {serverValidationError && (
        <BackendValidationMessage
          setServerValidationError={setServerValidationError}
        />
      )}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <UserAddForm
          control={control}
          register={register}
          errors={errors}
          roleOptions={roleOptions ?? []}
          customerOptions={customersDropdown ?? []}
          showCustomerField={showCustomerField}
          propagateOnRoleChange={propagateOnRoleChange}
        />
        <Row>
          <Col>
            <div className="button-list float-end mt-2">
              <Button
                variant="outline"
                className="btn btn-ghost"
                onClick={toggleModal}>
                <i className="bx bx-x me-1" />
                Cancel
              </Button>
              <Button
                variant="secondary"
                className="btn btn-secondary"
                type="submit"
                disabled={submitted}>
                <i className="bx bx-save me-1" />
                Save
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default AddUser;
