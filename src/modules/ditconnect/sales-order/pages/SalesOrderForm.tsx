/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import CancelButton from '@uhub/components/Form/CancelButton';
import SubmitButton from '@uhub/components/Form/SubmitButton';
import BackendValidationMessage from '@uhub/components/BackendValidationMessage';
import { FormInput } from '@uhub/components';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { SalesOrderFormProps } from '../types/SalesOrder';
import useSalesOrderForm from '../hooks/useSalesOrderForm';
import CustomerPropertyForm from '../components/CustomerPropertyForm';
import DynamicForm from '../../components/DynamicForm';

import useProductFieldArray from '../hooks/useProductFieldArray';
import useAdditionItemFieldArray from '../hooks/useAdditionItemFieldArray';
import useUdoseItemFieldArray from '../hooks/useUdoseItemFieldArray';

type Props = {
  defaultValues: SalesOrderFormProps;
};
const SalesOrderForm: React.FC<Props> = ({ defaultValues }) => {
  const {
    setFormValue,
    register,
    control,
    errors,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
    navigateToList,
    onSubmit,
    watch,
  } = useSalesOrderForm(defaultValues);
  const {
    formConfig: productFormConfig,
    isFetching: isProductFetching,
    isError: isProductError,
  } = useProductFieldArray();
  const {
    formConfig: additionalItemsConfig,
    isFetching: isAdditionalItemFetching,
    isError: isAdditionalItemError,
  } = useAdditionItemFieldArray();
  const {
    formConfig: udoseItemFieldConfig,
    isFetching: isUdoseItemFetching,
    isError: isUdoseItemError,
  } = useUdoseItemFieldArray();
  const dynamicFormConfig = [
    {
      formTitle: 'Products',
      formKey: 'products',
      config: productFormConfig,
    },
    {
      formTitle: 'Additional Items',
      formKey: 'additional_items',
      config: additionalItemsConfig,
    },
    {
      formTitle: 'Udose Items',
      formKey: 'udose_items',
      config: udoseItemFieldConfig,
    },
  ];
  if (isProductFetching || isAdditionalItemFetching || isUdoseItemFetching) {
    return <CustomLoader />;
  }
  if (isProductError || isAdditionalItemError || isUdoseItemError) {
    return <ErrorMessage />;
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {serverValidationError && (
        <BackendValidationMessage
          setServerValidationError={setServerValidationError}
        />
      )}
      <CustomerPropertyForm
        setFormValue={setFormValue}
        control={control}
        errors={errors}
        register={register}
        defaultCustomerPropertyId={defaultValues.customer.property_id}
        watch={watch}
      />

      {dynamicFormConfig.map(({ formTitle, formKey, config }) => (
        <DynamicForm
          key={formKey}
          control={control}
          errors={errors}
          register={register}
          formTitle={formTitle}
          formKey={formKey}
          config={config}
          formType="row"
        />
      ))}
      <Col sm={6} md={6}>
        <FormInput
          label="Total (Incl GST)"
          name="total"
          errors={errors}
          control={control}
          register={register}
          type="number"
          step="0.01"
        />
      </Col>
      <Row className="">
        <Col>
          <div className="float-end button-list">
            <CancelButton redirectOnClick={navigateToList} />
            <SubmitButton disable={submitted} />
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default SalesOrderForm;
