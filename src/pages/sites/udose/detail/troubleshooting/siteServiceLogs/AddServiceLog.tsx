import React from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';

import useCreateSiteServiceLog from './hooks/useCreateSiteServiceLog';
import AddServiceLogForm from './forms/AddServiceLogForm';
import useUsersDropdownByRole from '../../../../../../hooks/dropdown/useUserDropdownByRole';
import {
  ROLE_ADMIN,
  ROLE_MANAGER,
} from '../../../../../../constants/constants';
import CustomLoader from '../../../../../../components/CustomLoader';
import ErrorMessage from '../../../../../../components/ErrorMessage';

type Props = {
  toggleModal: () => void;
  refetchServiceLogs: () => void;
  refetchSiteFollowups?: () => void;
  followupId?: number;
};

const AddSiteServiceLog: React.FC<Props> = ({
  toggleModal,
  refetchServiceLogs,
  refetchSiteFollowups,
  followupId,
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
  } = useCreateSiteServiceLog({
    refetchServiceLogs,
    refetchSiteFollowups,
    toggleModal,
    followupId,
  });

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
          <AddServiceLogForm
            control={control}
            errors={errors}
            register={register}
            maintainersOptions={maintainersOptions}
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

export default AddSiteServiceLog;
