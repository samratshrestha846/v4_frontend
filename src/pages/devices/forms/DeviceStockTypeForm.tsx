/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import ReactSelect from '../../../components/ReactSelect';
import { FormInput } from '../../../components';

import {
  Device,
  DeviceStockTypeUpdateFormFields,
} from '../../../types/device/device';

type Props = {
  control: Control<DeviceStockTypeUpdateFormFields>;
  errors: FieldErrors<DeviceStockTypeUpdateFormFields>;
  register: UseFormRegister<DeviceStockTypeUpdateFormFields>;
  stockTypesOptions?: any[];
  deviceData?: Device;
};

const DeviceStockTypeForm: React.FC<Props> = ({
  control,
  errors,
  register,
  stockTypesOptions,
  deviceData,
}) => {
  return (
    <Row>
      <Col md={12} className="mb-3">
        <div className="">
          <h6 className="font-14 "> Device Serial Number: </h6>
          <span>{deviceData?.serial_number}</span>
        </div>
      </Col>
      <Col md={6} className="mb-3">
        <ReactSelect
          name="stock_type_id"
          label="Stock Type"
          errors={errors}
          control={control}
          options={stockTypesOptions || []}
          defaultSelected={stockTypesOptions?.find(
            (item) => item.value === deviceData?.stock_type_id
          )}
        />
      </Col>
      <Col md={6} className="mb-3">
        <FormInput
          name="remarks"
          label="Any Notes / Remarks / Reference"
          errors={errors}
          register={register}
          control={control}
        />
      </Col>
    </Row>
  );
};

export default DeviceStockTypeForm;
