/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import ReactSelect from '../../../../components/ReactSelect';
import { FormInput } from '../../../../components';

import { SiteStatusFormFields } from '../../../../types/siteStatus';
import FormFieldRequired from '../../../../components/Form/FormFieldRequired';
import { DOSER_STOP_REASON_OPTIONS } from '../../../../constants/constants';

type Props = {
  control: Control<SiteStatusFormFields>;
  errors: FieldErrors<SiteStatusFormFields>;
  register: UseFormRegister<SiteStatusFormFields>;
};

const SiteDeviceStatusForm: React.FC<Props> = ({
  control,
  errors,
  register,
}) => {
  return (
    <>
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
    </>
  );
};

export default SiteDeviceStatusForm;
