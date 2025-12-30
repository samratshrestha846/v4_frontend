import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import ReactSelect from '../../../components/ReactSelect';
import { FormInput } from '../../../components';
import { convertToSlug } from '../../../helpers';

import { SupplementFormFields } from '../../../types/supplements/supplement';
import { BOOLEAN_STATUS_OPTIONS } from '../../../constants/constants';
import UnitWithSup from '../../../components/UnitWithSup';

type Props = {
  control: Control<SupplementFormFields>;
  register: UseFormRegister<SupplementFormFields>;
  errors: FieldErrors<SupplementFormFields>;
  watch: any;
  setValue: any;
  supplement?: any;
};

const SupplementAddForm: React.FC<Props> = ({
  control,
  register,
  errors,
  watch,
  setValue,
  supplement = {},
}) => {
  const name = watch('name');
  useEffect(() => {
    const slug = convertToSlug(name);
    setValue('slug', slug); // Set the value of the "slug" field
  }, [name, setValue]);

  return (
    <Row>
      <Col md={4} sm={6} className="mb-3">
        <FormInput
          label="Name"
          type="text"
          name="name"
          placeholder="Enter Name"
          errors={errors}
          register={register}
          control={control}
        />
      </Col>

      <Col md={4} sm={6} className="mb-3">
        <FormInput
          label="Slug"
          type="text"
          name="slug"
          errors={errors}
          register={register}
          control={control}
          readOnly
        />
      </Col>

      <Col md={4} sm={6} className="mb-3">
        <FormInput
          label={
            <UnitWithSup
              labelText="Density"
              baseText="Kg/m"
              supText={3}
              showParentheses
            />
          }
          type="text"
          name="density"
          placeholder="Enter Density"
          errors={errors}
          register={register}
          control={control}
        />
      </Col>

      <Col md={4} sm={6} className="mb-3">
        <FormInput
          label="Standard Concentration(%)"
          type="text"
          name="standard_concentration"
          placeholder="Enter Standard Concentration"
          errors={errors}
          register={register}
          control={control}
        />
      </Col>

      <Col md={4} sm={6} className="mb-3">
        <FormInput
          label="Methane Reducing Factor"
          type="text"
          name="methane_reducing_factor"
          placeholder="Enter Methane Reducing Factor"
          errors={errors}
          register={register}
          control={control}
        />
      </Col>

      <Col md={4} sm={6}>
        <div className="mb-3">
          <ReactSelect
            errors={errors}
            control={control}
            label="Status"
            name="is_active"
            options={BOOLEAN_STATUS_OPTIONS}
            defaultSelected={BOOLEAN_STATUS_OPTIONS.find((item) =>
              item.value === supplement ? supplement.is_active : true
            )}
          />
        </div>
      </Col>
    </Row>
  );
};

export default SupplementAddForm;
