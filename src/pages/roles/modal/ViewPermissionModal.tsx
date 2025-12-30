/* eslint-disable no-nested-ternary */
import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import Role from '../../../types/role/role';
import useFetchPermissionsByRole from '../hooks/useFetchPermissionsByRole';
import { capitalizeFirstLetter } from '../../../helpers';
import ErrorMessage from '../../../components/ErrorMessage';
import CustomLoader from '../../../components/CustomLoader';

type Props = {
  role: Role;
  toggleModal?: () => void;
};

const ViewPermissionModal: React.FC<Props> = ({ role, toggleModal }) => {
  const { data, isFetching, isError } = useFetchPermissionsByRole(role.id);

  if (isFetching) {
    return <CustomLoader />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <>
      <Row>
        {data?.map(
          (module) =>
            module.permissions.some((item) => item.role_has_permission) && (
              <Col md={6} lg={4} key={module.module} className="p-1">
                <Card className="shadow-lg">
                  <Card.Header>
                    <div className="d-flex justify-content-between gap-1 align-items-center">
                      <h5 className="text-primary-color m-0">
                        {module.module}
                      </h5>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <ul className="nav d-flex flex-column">
                      {module.permissions?.map(
                        (perm) =>
                          perm.role_has_permission && (
                            <li key={perm.permission_id}>
                              <div>
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  checked={perm.role_has_permission}
                                  readOnly
                                />
                                <span className="ms-1">
                                  {capitalizeFirstLetter(perm.name)}
                                </span>
                              </div>
                            </li>
                          )
                      )}
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            )
        )}
      </Row>
      <div className="float-end">
        <Button
          variant="outline"
          className="btn btn-ghost"
          onClick={toggleModal}>
          <i className="bx bx-x me-1" />
          Close
        </Button>
      </div>
    </>
  );
};

export default ViewPermissionModal;
