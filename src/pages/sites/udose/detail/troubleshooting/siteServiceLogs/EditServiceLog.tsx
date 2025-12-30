import React from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';

import useUsersDropdownByRole from '../../../../../../hooks/dropdown/useUserDropdownByRole';
import {
  ROLE_ADMIN,
  ROLE_MANAGER,
} from '../../../../../../constants/constants';
import CustomLoader from '../../../../../../components/CustomLoader';
import ErrorMessage from '../../../../../../components/ErrorMessage';
import EditServiceLogForm from './forms/EditServiceLogForm';
import useUpdateSiteServiceLog from './hooks/useUpdateServiceLog';
import { ServiceLog } from '../../../../../../types/udose/serviceLog';

type Props = {
  toggleModal: () => void;
  refetchServiceLogs: () => void;
  serviceLogDetail?: ServiceLog;
};

const EditSiteServiceLog: React.FC<Props> = ({
  toggleModal,
  refetchServiceLogs,
  serviceLogDetail,
}) => {
  const {
    data: maintainersOptions,
    isFetching,
    isError,
  } = useUsersDropdownByRole({
    type: 'dropdown',
    roles: [ROLE_ADMIN, ROLE_MANAGER],
  });

  const {
    register,
    control,
    errors,
    onSubmit,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
  } = useUpdateSiteServiceLog({ serviceLogDetail, refetchServiceLogs });

  if (isFetching) {
    return <CustomLoader />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <Row>
      <Col md={12} xs={12}>
        {serverValidationError && (
          <Alert
            variant="danger"
            onClose={() => setServerValidationError(false)}
            dismissible>
            <strong>Validation Failed - </strong> Please fix validation errors
            and try again
          </Alert>
        )}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <EditServiceLogForm
            control={control}
            errors={errors}
            register={register}
            maintainersOptions={maintainersOptions}
            serviceLogDetail={serviceLogDetail}
          />

          <Row xs="auto" className="float-end">
            <Col>
              <div className="button-list">
                <Button
                  variant="outline"
                  className="btn btn-ghost"
                  onClick={toggleModal}>
                  <i className="bx bx-x " /> Cancel
                </Button>

                <Button
                  variant="secondary"
                  type="submit"
                  className="btn btn-secondary"
                  disabled={submitted}>
                  <i className="bx bx-save " /> Save
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default EditSiteServiceLog;
