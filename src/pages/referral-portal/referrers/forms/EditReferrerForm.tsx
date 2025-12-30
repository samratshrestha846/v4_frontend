/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormInput } from '../../../../components';
import FileDocumentLink from '../../../../components/FileDocumentLink';
import {
  Referrer,
  ReferrerFormFields,
} from '../../../../types/referrer/referrerList';
import CustomDatePicker from '../../../../components/CustomDatePicker';

type Props = {
  control: Control<ReferrerFormFields>;
  register: UseFormRegister<ReferrerFormFields>;
  errors: FieldErrors<ReferrerFormFields>;
  submitted: boolean;
  navigateToReferrerList: () => void;
  referrer?: Referrer;
};

const EditReferrerForm: React.FC<Props> = ({
  control,
  register,
  errors,
  submitted,
  navigateToReferrerList,
  referrer,
}) => {
  return (
    <>
      <Row>
        <Col md={6} className="mb-3">
          <FormInput
            label="First Name"
            type="text"
            name="first_name"
            placeholder="Enter First Name"
            errors={errors}
            register={register}
            control={control}
          />
        </Col>
        <Col md={6} className="mb-3">
          <FormInput
            label="Last Name"
            type="text"
            name="last_name"
            placeholder="Enter Last Name"
            errors={errors}
            register={register}
            control={control}
          />
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-3">
          <FormInput
            label="Email"
            type="text"
            name="email"
            placeholder="Enter Email"
            errors={errors}
            register={register}
            control={control}
          />
        </Col>
        <Col md={6} className="mb-3">
          <FormInput
            label="Phone Number"
            type="text"
            name="phone_number"
            placeholder="Enter Phone Number"
            errors={errors}
            register={register}
            control={control}
          />
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-3">
          <FormInput
            label="Addess"
            type="text"
            name="address"
            placeholder="Enter address"
            errors={errors}
            register={register}
            control={control}
          />
        </Col>
        <Col md={4} className="mb-3">
          <FormInput
            label="Contract File"
            type="file"
            name="contract_file"
            errors={errors}
            register={register}
            control={control}
          />
        </Col>

        <Col md={2} className="mb-3">
          <FileDocumentLink
            fileLabel="Attached file"
            fileName="Contract file"
            fileUrl={referrer?.contract_file}
            fileTypeIcon="bx bxs-file-pdf"
          />
          <a href={referrer?.contract_file}>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="contract-file"> View </Tooltip>}>
              <i className="bx bx-eye text-info pt-0" />
            </OverlayTrigger>
          </a>
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-3">
          <CustomDatePicker
            label="Contract Effective Date"
            name="contract_effective_date"
            defaultSelected={undefined}
            maxDate={new Date()}
            control={control}
            errors={errors}
          />
        </Col>

        <Col md={6} className="mb-3">
          <CustomDatePicker
            label="Contract Expiry Date"
            name="contract_expiry_date"
            defaultSelected={undefined}
            minDate={new Date()}
            control={control}
            errors={errors}
          />
        </Col>
      </Row>

      <Row className="">
        <Col>
          <div className="float-end button-list">
            <Button
              className="btn btn-ghost"
              variant="outline"
              onClick={navigateToReferrerList}>
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
    </>
  );
};

export default EditReferrerForm;
