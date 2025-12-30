import React from 'react';
import { Row, Col, Form, FormLabel } from 'react-bootstrap';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import classNames from 'classnames';
import { FormInput } from '../../../components';
import { capitalizeFirstLetter } from '../../../helpers';
import { SupplementFormFields } from '../../../types/supplements/supplement';
import Nutrient from '../../../types/nutrients/nutrients';

type Props = {
  control: Control<SupplementFormFields>;
  register: UseFormRegister<SupplementFormFields>;
  errors: FieldErrors<SupplementFormFields>;
  methaneNonReducingNutrientList: Nutrient[];
  methaneReducingNutrientList: Nutrient[];
};

const SupplementNutritionAddForm: React.FC<Props> = ({
  control,
  register,
  errors,
  methaneNonReducingNutrientList,
  methaneReducingNutrientList,
}) => {
  return (
    <div
      className={
        errors && errors.nutrition?.message ? 'custom-is-invalid' : ''
      }>
      <h5 className="mt-0 mb-2 text-uppercase text-slate-gray">
        Methane Non-reducing Nutritions
      </h5>
      <Row>
        {methaneNonReducingNutrientList.map((item) => (
          <Col
            md={4}
            sm={6}
            className="react-select-form mb-3 d-flex flex-column"
            key={item.name}>
            <FormLabel>{capitalizeFirstLetter(item.name)}</FormLabel>
            <div>
              <div className="input-group flex-nowrap">
                <FormInput
                  register={register}
                  errors={errors}
                  control={control}
                  name={`nutrition[${item.name}]`}
                  type="decimal"
                  placeholder="0.00"
                  className={classNames(
                    'custom-field',
                    errors && (errors.nutrition as any)?.[item.name]
                      ? 'is-invalid'
                      : ''
                  )}
                  containerClass="flex-grow-1"
                />
                <span className="input-group-text">g/ml</span>
              </div>
              {errors && (errors.nutrition as any)?.[item.name] ? (
                <Form.Control.Feedback type="invalid" className="d-block">
                  {(errors?.nutrition as any)?.[item.name]?.message}
                </Form.Control.Feedback>
              ) : null}
            </div>
          </Col>
        ))}
      </Row>

      <h5 className="mt-0 mb-2 text-uppercase text-slate-gray">
        Methane Reducing Nutritions
      </h5>
      <Row>
        {methaneReducingNutrientList?.map((item) => (
          <Col md={4} sm={6} key={item.name}>
            <FormLabel>{capitalizeFirstLetter(item.name)}</FormLabel>
            <div>
              <div className="input-group flex-nowrap">
                <FormInput
                  register={register}
                  errors={errors}
                  control={control}
                  name={`nutrition[${item.name}]`}
                  type="decimal"
                  placeholder="0.00"
                  className={classNames(
                    'custom-field',
                    errors && (errors.nutrition as any)?.[item.name]
                      ? 'is-invalid'
                      : ''
                  )}
                  containerClass="flex-grow-1"
                />
                <span className="input-group-text">%</span>
              </div>
              {errors && (errors.nutrition as any)?.[item.name] ? (
                <Form.Control.Feedback type="invalid" className="d-block">
                  {(errors?.nutrition as any)?.[item.name]?.message}
                </Form.Control.Feedback>
              ) : null}
            </div>
          </Col>
        ))}
      </Row>

      {errors && (errors.nutrition as any) ? (
        <Form.Control.Feedback type="invalid" className="d-block mt-3">
          {(errors?.nutrition as any)?.message}
        </Form.Control.Feedback>
      ) : null}
    </div>
  );
};

export default SupplementNutritionAddForm;
