import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import ReactSelect from '../../../../components/ReactSelect';
import { FormInput } from '../../../../components';
import {
  CropCycleFormValues,
  CropLifeCycle,
} from '../../../../types/horticulture/horticulture';
import { LabelNumericValue } from '../../../../types/common';

type Props = {
  control: Control<CropCycleFormValues>;
  errors: FieldErrors<CropCycleFormValues>;
  register: UseFormRegister<CropCycleFormValues>;
  cropsOption: LabelNumericValue[];
  cropCycleDetail?: CropLifeCycle;
};

const EditCropCycleForm: React.FC<Props> = ({
  register,
  errors,
  control,
  cropsOption,
  cropCycleDetail,
}) => {
  return (
    <Row>
      <Col sm={6} md={6}>
        <div className="mb-2">
          <ReactSelect
            name="crop_id"
            label="Crop"
            errors={errors}
            control={control}
            options={cropsOption}
            defaultSelected={cropsOption?.find(
              (element) => element.value === cropCycleDetail?.crop_id
            )}
          />
        </div>
      </Col>
      <Col sm={6} md={6}>
        <div className="mb-2">
          <FormInput
            label="Crop Stage Name"
            type="text"
            name="crop_stage_name"
            placeholder="Enter Crop Stage Name"
            register={register}
            key="crop_stage_name"
            errors={errors}
            control={control}
            containerClass="mb-2"
          />
        </div>
      </Col>
      <Col sm={6} md={6}>
        <FormInput
          label="Started In Days"
          type="number"
          name="started_in_days"
          placeholder="Enter Started In Days"
          register={register}
          key="started_in_days"
          errors={errors}
          control={control}
          containerClass="mb-2"
        />
      </Col>
      <Col sm={6} md={6}>
        <FormInput
          label="Ended In Days"
          type="number"
          name="ended_in_days"
          placeholder="Enter Ended In Days"
          register={register}
          key="ended_in_days"
          errors={errors}
          control={control}
          containerClass="mb-2"
        />
      </Col>
    </Row>
  );
};

export default EditCropCycleForm;
