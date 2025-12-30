import React from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import useCreateSiteNote from './hooks/useCreateSiteNote';
import { FormInput } from '../../../../../../components';
import FormFieldRequired from '../../../../../../components/Form/FormFieldRequired';

type Props = {
  siteId: number;
  toggleModal?: () => void;
  refetch: any;
};

const CreateSiteNote: React.FC<Props> = ({ siteId, toggleModal, refetch }) => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    submitted,
    serverValidationError,
    setServerValidationError,
  } = useCreateSiteNote(Number(siteId), toggleModal, refetch);

  return (
    <>
      <div className="modal-close-button-wrapper mb-3">
        <h5 className="text-primary-color m-0">Site Note</h5>
        <button
          onClick={toggleModal}
          type="button"
          className="btn modal-close-button">
          <i className="bx bx-x font-20" />
        </button>
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

      <Form onSubmit={handleSubmit(onSubmit)} className="comment-area-box ">
        <Row>
          <Col md={3} className="mb-3">
            <Form.Label>
              Note <FormFieldRequired />{' '}
            </Form.Label>
          </Col>
          <Col md={9}>
            <FormInput
              name="description"
              type="textarea"
              control={control}
              register={register}
              errors={errors}
              containerClass="mb-3"
              placeholder="Site Maintenance, Conductivity probe cleaned, Supplement refilled etc.."
            />
          </Col>
        </Row>

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
                <i className="bx bx-send" /> Add Note
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default CreateSiteNote;
