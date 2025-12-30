/* eslint-disable react/prop-types */
import React from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { Col, Form, Row } from 'react-bootstrap';

import { FormInput } from '../../../../components';
import { STATUS_OPTIONS } from '../../../../constants/statusOptions';
import ReactSelect from '../../../../components/ReactSelect';
import FERTILIZER_NUTRIENTS from '../../../../constants/fertilizerConstants';
import { capitalizeFirstLetter } from '../../../../helpers';
import {
  Fertilizer,
  FertilizerFormFields,
} from '../../../../types/horticulture/fertilizer';

type Props = {
  register: UseFormRegister<FertilizerFormFields>;
  control: Control<FertilizerFormFields>;
  errors: FieldErrors<FertilizerFormFields>;
  fertilizerDetail?: Fertilizer;
};

const FertilizerEditForm: React.FC<Props> = ({
  register,
  control,
  errors,
  fertilizerDetail,
}) => {
  return (
    <Row>
      <Col sm={6} md={6}>
        <FormInput
          label="Name"
          type="text"
          name="name"
          placeholder="Name"
          register={register}
          control={control}
          errors={errors}
          containerClass="mb-2"
        />
      </Col>

      <Col sm={6} md={6}>
        <div className="mb-2">
          <ReactSelect
            label="Status"
            name="is_active"
            errors={errors}
            control={control}
            options={STATUS_OPTIONS}
            defaultSelected={STATUS_OPTIONS?.find(
              (item) => !!item.value === fertilizerDetail?.is_active
            )}
          />
        </div>
      </Col>
      <Col md={12}>
        <h5 className="p-2 b-secondary">Analysis Parameters</h5>
      </Col>
      <Col sm={6} md={4}>
        <FormInput
          label="Water Mass (g)"
          type="text"
          name="water_mass"
          placeholder="Water Mass"
          register={register}
          control={control}
          errors={errors}
          containerClass="mb-2"
        />
      </Col>

      <Col sm={6} md={4}>
        <FormInput
          label="Fertilizer Mass (g)"
          type="text"
          name="fertilizer_mass"
          placeholder="Fertilizer Mass"
          register={register}
          control={control}
          errors={errors}
          containerClass="mb-2"
        />
      </Col>
      <Col sm={6} md={4}>
        <FormInput
          label="Solution Volume (mL)"
          type="text"
          name="solution_volume"
          placeholder="Solution Volume"
          register={register}
          control={control}
          errors={errors}
          containerClass="mb-2"
        />
      </Col>

      <Col md={12}>
        <h5 className="p-2 b-secondary">Nutrition Combination (%)</h5>
      </Col>
      <div>
        <Row>
          {FERTILIZER_NUTRIENTS?.map((fertilizer) => (
            <Col md={4} key={fertilizer.key}>
              <div className="mb-2">
                <FormInput
                  label={`${capitalizeFirstLetter(fertilizer.name)} (${fertilizer.symbol})`}
                  type="text"
                  name={`nutrition_combination[${fertilizer.key}]`}
                  placeholder="0.00"
                  register={register}
                  control={control}
                  errors={errors}
                />
                {errors && errors.nutrition_combination?.[fertilizer.key] ? (
                  <Form.Control.Feedback type="invalid" className="d-block">
                    {errors?.nutrition_combination?.[fertilizer.key]?.message}
                  </Form.Control.Feedback>
                ) : null}
              </div>
            </Col>
          ))}
        </Row>
        {errors && errors.nutrition_combination ? (
          <Form.Control.Feedback type="invalid" className="d-block">
            {errors?.nutrition_combination?.message as any}
          </Form.Control.Feedback>
        ) : null}
      </div>
    </Row>
  );
};

export default FertilizerEditForm;
