import React, { Dispatch, SetStateAction } from 'react';
import { Row, Col, Form, Alert, Button, Modal, Card } from 'react-bootstrap';
import { User } from '../../../types/user/user';
import useAssignExplicitPermissions from './hooks/useAssignExplicitPermissions';
import usePermissionsList from './hooks/usePermissionsList';
import ExplicitPermissionForm from './forms/ExplicitPermissionForm';
import CustomLoader from '../../../components/CustomLoader';
import ErrorMessage from '../../../components/ErrorMessage';

type Props = {
  user: User | undefined;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
};

const AssignExplicitPermission: React.FC<Props> = ({
  setShowModal,
  user,
  refetch,
}) => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
    onSubmit,
  }: any = useAssignExplicitPermissions({ refetch, setShowModal });

  const {
    permissions,
    isFetching: isFetchingPermissions,
    isError,
    grantedPermissionsList,
  } = usePermissionsList(user);

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <>
      {serverValidationError && (
        <Alert
          variant="danger"
          onClose={() => setServerValidationError(false)}
          dismissible>
          <strong>Validation Failed - </strong> Please fix validation errors and
          try again
        </Alert>
      )}

      <Modal.Body>
        {isFetchingPermissions ? (
          <CustomLoader />
        ) : (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              {permissions?.map((item) => {
                const allPermissionsGranted = item.permissions.every(
                  (permission) => permission.role_has_permission
                );

                // Skip rendering the Col if all permissions are false
                if (allPermissionsGranted) {
                  return null;
                }

                return (
                  <Col md={4} key={item.module}>
                    <Card className="shadow-lg">
                      <Card.Header>
                        <div className="d-flex justify-content-between gap-1 align-items-center">
                          <h5 className="text-primary-color m-0">
                            {item.module}
                          </h5>
                        </div>
                      </Card.Header>
                      <Card.Body>
                        <ExplicitPermissionForm
                          item={item}
                          register={register}
                          control={control}
                          errors={errors}
                          user={user}
                          grantedPermissionsList={grantedPermissionsList}
                        />
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
            <hr />
            <div className="button-list float-end">
              <Button
                variant="outline"
                className="btn btn-ghost "
                onClick={() => setShowModal(false)}>
                <i className="bx bx-x me-1" /> Cancel
              </Button>
              <Button
                type="submit"
                variant="secondary"
                className="btn btn-secondary "
                disabled={submitted}>
                <i className="bx bx-save me-1" /> Save
              </Button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </>
  );
};

export default AssignExplicitPermission;
