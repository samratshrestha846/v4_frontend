/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Dispatch, SetStateAction } from 'react';
import { Row, Col, Form, Alert, Button } from 'react-bootstrap';
import {
  Control,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import ReactSelect from '../../../../../../../../components/ReactSelect';
import { FormInput } from '../../../../../../../../components';

import { SiteStatusFormFields } from '../../../../../../../../types/siteStatus';
import FormFieldRequired from '../../../../../../../../components/Form/FormFieldRequired';
import { DOSER_STOP_REASON_OPTIONS } from '../../../../../../../../constants/constants';

type Props = {
  control: Control<SiteStatusFormFields>;
  errors: FieldErrors<SiteStatusFormFields>;
  register: UseFormRegister<SiteStatusFormFields>;
  doserStatus: boolean;
  handleCancel: () => void;
  submitted: boolean;
  serverValidationError: boolean;
  setServerValidationError: Dispatch<SetStateAction<boolean>>;
  handleSubmit: UseFormHandleSubmit<SiteStatusFormFields, undefined>;
  onSubmit: (formData: SiteStatusFormFields) => Promise<void>;
};

const ManualDoserStopForm: React.FC<Props> = ({
  control,
  errors,
  register,
  doserStatus,
  handleCancel,
  submitted,
  serverValidationError,
  setServerValidationError,
  handleSubmit,
  onSubmit,
}) => {
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="modal-close-button-wrapper mb-3">
        <h5 className="text-primary-color m-0">Add uDOSE Stop Reason</h5>
        <button
          onClick={handleCancel}
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

      <Row>
        <Col md={4} className="mb-3">
          <Form.Label>
            Reason Type <FormFieldRequired />
          </Form.Label>
        </Col>
        <Col md={8} className="mb-3">
          <ReactSelect
            name="reason"
            errors={errors}
            control={control}
            options={DOSER_STOP_REASON_OPTIONS}
            placeholder="Reason Type"
            isClearable
          />
        </Col>
      </Row>
      <Row>
        <Col md={4} className="mb-3">
          <Form.Label>Additional Info </Form.Label>
        </Col>
        <Col md={8} className="mb-3">
          <FormInput
            name="notes"
            type="textarea"
            placeholder="Text here..."
            errors={errors}
            register={register}
            control={control}
          />
        </Col>
      </Row>

      <Row xs="auto" className="float-end">
        <Col>
          <div className="button-list">
            <Button
              variant="outline"
              className="btn btn-ghost"
              onClick={handleCancel}>
              <i className="bx bx-x " /> Cancel
            </Button>

            <Button
              variant="secondary"
              type="submit"
              className="btn btn-secondary"
              disabled={submitted}>
              <i className="bx bx-send" /> Submit
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default ManualDoserStopForm;
