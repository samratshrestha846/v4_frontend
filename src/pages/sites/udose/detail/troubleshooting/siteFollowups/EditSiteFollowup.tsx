import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

import useUpdateSiteFollowup from './hooks/useUpdateSiteFollowup';
import ErrorMessage from '../../../../../../components/ErrorMessage';
import CustomLoader from '../../../../../../components/CustomLoader';
import EditSiteFollowupForm from './forms/EditSiteFollowupForm';
import BackendValidationMessage from '../../../../../../components/BackendValidationMessage';

type Props = {
  followupId: number;
  toggleModal: () => void;
  refetchSiteFollowups: any;
};

const EditSiteFollowup: React.FC<Props> = ({
  followupId,
  toggleModal,
  refetchSiteFollowups,
}) => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
    siteFollowupDetail,
    isError,
    isFetching,
  } = useUpdateSiteFollowup({
    followupId,
    toggleModal,
    refetchSiteFollowups,
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
          <BackendValidationMessage
            setServerValidationError={setServerValidationError}
          />
        )}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <EditSiteFollowupForm
            control={control}
            errors={errors}
            register={register}
            siteFollowupDetail={siteFollowupDetail}
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

export default EditSiteFollowup;
