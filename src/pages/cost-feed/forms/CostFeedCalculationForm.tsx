/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Dispatch, SetStateAction } from 'react';
import { Form, Row, Button, Alert, Col } from 'react-bootstrap';
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import FormInput from '../../../components/FormInput';
import useProductsDropdown from '../../../hooks/dropdown/useProductsDropdown';
import CustomLoader from '../../../components/CustomLoader';
import ErrorMessage from '../../../components/ErrorMessage';
import ReactSelect from '../../../components/ReactSelect';
import { CalculateCostFeedFormFields } from '../../../types/costFeed/costFeed';

type Props = {
  register: UseFormRegister<CalculateCostFeedFormFields>;
  control: Control<CalculateCostFeedFormFields>;
  errors: FieldErrors<CalculateCostFeedFormFields>;
  handleSubmit: UseFormHandleSubmit<CalculateCostFeedFormFields>;
  onSubmit: (formData: CalculateCostFeedFormFields) => Promise<void>;
  serverValidationError: boolean;
  setServerValidationError: Dispatch<SetStateAction<boolean>>;
};

const CostFeedCalculationForm: React.FC<Props> = ({
  register,
  control,
  errors,
  handleSubmit,
  onSubmit,
  serverValidationError,
  setServerValidationError,
}) => {
  const {
    productsDropdown,
    isFetchingProductsDropdown,
    isErrorProductsDropdown,
  } = useProductsDropdown();

  if (isFetchingProductsDropdown) {
    return <CustomLoader />;
  }

  if (isErrorProductsDropdown) {
    return <ErrorMessage />;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {serverValidationError && (
        <Alert
          variant="danger"
          onClose={() => setServerValidationError(false)}
          dismissible>
          <strong>Validation Failed - </strong> Please fix validation errors and
          try again
        </Alert>
      )}

      <div className="d-flex justify-content-between align-items-baseline gap-3 flex-wrap">
        <Row className="flex-grow-1 row-gap-2">
          <Col md={3} sm={6}>
            <FormInput
              type="number"
              name="dosing_rate"
              placeholder="Dosing Rate (ml)"
              errors={errors}
              register={register}
              control={control}
            />
          </Col>

          <Col md={3} sm={6}>
            <FormInput
              type="number"
              name="water_consumption"
              placeholder="Water Consumption (L)"
              errors={errors}
              register={register}
              control={control}
            />
          </Col>

          <Col md={3} sm={6}>
            <FormInput
              type="number"
              name="head_count"
              placeholder="Head Count"
              errors={errors}
              register={register}
              control={control}
            />
          </Col>

          <Col md={3} sm={6}>
            <ReactSelect
              errors={errors}
              control={control}
              name="product"
              placeholder="Choose Product"
              options={productsDropdown}
              isClearable
            />
          </Col>
        </Row>
        <Button variant="info" type="submit" className="text-uppercase">
          Calculate
        </Button>
      </div>
    </Form>
  );
};

export default CostFeedCalculationForm;
