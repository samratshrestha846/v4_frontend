import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormInput } from '../../../components';
import CustomDatePicker from '../../../components/CustomDatePicker';
import OPTIONS from '../../../constants/statusOptions';
import { STATUS_TEST_SITE } from '../../../constants/constants';
import { LabelNumericValueDropdown } from '../../../types/common';
import { UdoseAgs, UdoseAgsFormValues } from '../../../types/udoseAgs/udoseAgs';
import ReactSelect from '../../../components/ReactSelect';

type Props = {
  control: Control<UdoseAgsFormValues>;
  errors: FieldErrors<UdoseAgsFormValues>;
  register: UseFormRegister<UdoseAgsFormValues>;
  customersOptions: LabelNumericValueDropdown[];
  devicesOptions: LabelNumericValueDropdown[];
  udoseAgDetail?: UdoseAgs;
};

const EditUdoseAgForm: React.FC<Props> = ({
  register,
  errors,
  control,
  customersOptions,
  devicesOptions,
  udoseAgDetail,
}) => {
  return (
    <Row>
      <Col sm={6} md={6}>
        <FormInput
          label="Name"
          type="text"
          name="name"
          placeholder="Enter Name"
          register={register}
          key="name"
          errors={errors}
          control={control}
          containerClass="mb-2"
        />
      </Col>
      <Col sm={6} md={6}>
        <div className="mb-2">
          <ReactSelect
            errors={errors}
            control={control}
            label="Customer"
            name="customer_id"
            options={customersOptions}
            defaultSelected={customersOptions?.find(
              (val) => val.value === udoseAgDetail?.customer_id
            )}
          />
        </div>
      </Col>
      <Col sm={6} md={6}>
        <div className="mb-2">
          <ReactSelect
            errors={errors}
            control={control}
            label="Device"
            name="device_id"
            options={devicesOptions}
            defaultSelected={devicesOptions?.find(
              (val) => val.value === udoseAgDetail?.device_id
            )}
          />
        </div>
      </Col>
      <Col sm={6} md={6}>
        <div className="mb-2">
          <CustomDatePicker
            label="Installed At"
            name="installed_at"
            control={control}
            errors={errors}
            defaultSelected={new Date()}
            maxDate={new Date()}
          />
        </div>
      </Col>
      <Col sm={6} md={6}>
        <div className="mb-2">
          <ReactSelect
            errors={errors}
            control={control}
            label="Status"
            name="status"
            options={OPTIONS.filter((item) => item.value !== STATUS_TEST_SITE)}
            defaultSelected={OPTIONS.find(
              (item) => item.value === udoseAgDetail?.status
            )}
          />
        </div>
      </Col>

      <Col sm={6} md={6}>
        <FormInput
          label="Trailer Number"
          type="text"
          name="trailer_no"
          placeholder="Enter Trailer Number"
          register={register}
          key="trailer_no"
          errors={errors}
          control={control}
          containerClass="mb-2"
        />
      </Col>
    </Row>
  );
};

export default EditUdoseAgForm;
