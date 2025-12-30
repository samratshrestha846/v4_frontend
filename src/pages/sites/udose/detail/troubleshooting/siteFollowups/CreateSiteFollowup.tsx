import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

import useCreateSiteFollowup from './hooks/useCreateSiteFollowup';
import AddSiteFollowupForm from './forms/AddSiteFollowupForm';
import BackendValidationMessage from '../../../../../../components/BackendValidationMessage';

type Props = {
  toggleModal: () => void;
  refetchSiteFollowups: any;
};

const CreateSiteFollowup: React.FC<Props> = ({
  toggleModal,
  refetchSiteFollowups,
}) => {
  const {
    register,
    control,
    errors,
    onSubmit,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
  } = useCreateSiteFollowup({
    toggleModal,
    refetchSiteFollowups,
  });
  return (
    <>
      {serverValidationError && (
        <BackendValidationMessage
          setServerValidationError={setServerValidationError}
        />
      )}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <AddSiteFollowupForm
          register={register}
          control={control}
          errors={errors}
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
    </>
  );
};

export default CreateSiteFollowup;
