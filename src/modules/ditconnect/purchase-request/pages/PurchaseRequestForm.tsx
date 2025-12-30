import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import JoditEditor from 'jodit-react';
import CancelButton from '@uhub/components/Form/CancelButton';
import SubmitButton from '@uhub/components/Form/SubmitButton';
import BackendValidationMessage from '@uhub/components/BackendValidationMessage';
import CustomDatePicker from '@uhub/components/CustomDatePicker';
import ReactSelect from '@uhub/components/ReactSelect';
import { FormInput } from '@uhub/components';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { LabelNumericValue } from '@uhub/types/common';
import { PurchaseRequestFormProps } from '../types/PurchaseRequest';
import usePurchaseRequestForm from '../hooks/usePurchaseRequestForm';
import useDropDown from '../../hooks/useDropDown';
import { SUPPLIER } from '../../supplier/constants/constant';
import {
  PURCHASE_REQUEST_DELIVERY_METHOD_OPTIONS,
  PURCHASE_REQUEST_PRIORITY_OPTIONS,
} from '../constants/constant';

import { JODIT_TEXT_EDITOR_CONFIG } from '../../../../constants/editorConstants';
import PurchaseRequestItemForm from './PurchaseRequestItemForm';
import HandlePurchaseRequestDocument from './HandlePurchaseRequestDocument';
import { DROPDOWN_PURCHASE_REQUEST_APPROVERS } from '../../constants/apiUrls';

type Props = {
  defaultValues: PurchaseRequestFormProps;
};
const PurchaseRequestForm: React.FC<Props> = ({ defaultValues }) => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
    navigateToList,
    onSubmit,
    setValue,
    itemFields,
    addItem,
    removeItem,
  } = usePurchaseRequestForm(defaultValues);

  const {
    data: userOptions,
    isFetching: isFetchingUserOptions,
    isError: isErrorUserOptions,
  } = useDropDown<LabelNumericValue[]>(
    DROPDOWN_PURCHASE_REQUEST_APPROVERS,
    null
    // {
    //   type: 'approve_purchase_request',
    // }
  );

  const {
    data: supplierOptions,
    isFetching: isFetchingSupplierOptions,
    isError: isErrorSupplierOptions,
  } = useDropDown<LabelNumericValue[]>(SUPPLIER);

  const isFetching = isFetchingSupplierOptions || isFetchingUserOptions;

  const isError = isErrorSupplierOptions || isErrorUserOptions;

  if (isFetching) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {serverValidationError && (
        <BackendValidationMessage
          setServerValidationError={setServerValidationError}
        />
      )}
      <Row>
        <Col sm={6} lg={4} md={4}>
          <FormInput
            label="Title"
            type="text"
            name="title"
            register={register}
            control={control}
            errors={errors}
            containerClass="mb-2"
          />
        </Col>
        <Col sm={6} lg={4} md={4}>
          <div className="mb-2">
            <ReactSelect
              label="Requested To"
              name="requested_to"
              errors={errors}
              control={control}
              options={userOptions ?? []}
              placeholder="Select"
              isClearable
              defaultSelected={userOptions?.find(
                (item: any) => item.value === defaultValues?.requested_to
              )}
            />
          </div>
        </Col>

        <Col sm={6} lg={4} md={4}>
          <div className="mb-2">
            <CustomDatePicker
              label="Required By"
              name="required_by_date"
              control={control}
              errors={errors}
              defaultSelected={defaultValues?.required_by_date}
              isClearable
            />
          </div>
        </Col>

        <Col sm={6} lg={4} md={4}>
          <div className="mb-2">
            <ReactSelect
              label="Supplier"
              name="supplier_id"
              errors={errors}
              control={control}
              options={supplierOptions ?? []}
              placeholder="Select"
              isClearable
              defaultSelected={supplierOptions?.find(
                (item: any) => item.value === defaultValues?.supplier_id
              )}
            />
          </div>
        </Col>

        <Col sm={6} lg={4} md={4}>
          <div className="mb-2">
            <ReactSelect
              label="Priority"
              name="priority"
              errors={errors}
              control={control}
              options={PURCHASE_REQUEST_PRIORITY_OPTIONS ?? []}
              placeholder="Select"
              isClearable
              defaultSelected={PURCHASE_REQUEST_PRIORITY_OPTIONS?.find(
                (item: any) => item.value === defaultValues?.priority
              )}
            />
          </div>
        </Col>

        <Col sm={6} lg={4} md={4}>
          <FormInput
            label="Delivery Location"
            type="text"
            name="delivery_location"
            register={register}
            control={control}
            errors={errors}
            containerClass="mb-2"
          />
        </Col>
        <Col sm={6} lg={4} md={4}>
          <div className="mb-2">
            <ReactSelect
              label="Delivery Method"
              name="delivery_method"
              errors={errors}
              control={control}
              options={PURCHASE_REQUEST_DELIVERY_METHOD_OPTIONS ?? []}
              placeholder="Select"
              isClearable
              defaultSelected={PURCHASE_REQUEST_DELIVERY_METHOD_OPTIONS?.find(
                (item: any) => item.value === defaultValues?.delivery_method
              )}
            />
          </div>
        </Col>

        <Col sm={6} lg={4} md={4}>
          <FormInput
            label="Online Order URL"
            type="text"
            name="online_order_url"
            register={register}
            control={control}
            errors={errors}
            containerClass="mb-2"
          />
        </Col>

        <Col sm={6} lg={4} md={4}>
          <div className="mb-2">
            <CustomDatePicker
              label="Estimated Payment Date"
              name="estimated_payment_date"
              control={control}
              errors={errors}
              defaultSelected={defaultValues?.estimated_payment_date}
              isClearable
            />
          </div>
        </Col>
        <Col md={12}>
          <Form.Label>Remarks </Form.Label>
          <div className="mb-2">
            <JoditEditor
              config={JODIT_TEXT_EDITOR_CONFIG}
              value={defaultValues?.remarks ?? ''}
              onChange={(value) => {
                setValue('remarks', value ?? '');
              }}
            />
          </div>
        </Col>
      </Row>
      <h5 className="my-3 text-uppercase text-soft-gray">Documents</h5>
      <Row>
        <Col sm={6} lg={4} md={4}>
          <FormInput
            label="Quotations"
            type="file"
            name="quotation"
            register={register}
            control={control}
            errors={errors}
            containerClass="mb-2"
            multiple
          />
          {defaultValues.quotationResponse && (
            <HandlePurchaseRequestDocument
              documents={defaultValues.quotationResponse ?? []}
              title="Uploaded Files"
              titleClass="text-muted"
            />
          )}
        </Col>
        <Col sm={6} lg={4} md={4}>
          <FormInput
            label="Invoices"
            type="file"
            name="invoice"
            register={register}
            control={control}
            errors={errors}
            containerClass="mb-2"
            multiple
          />
          {defaultValues.invoiceResponse && (
            <HandlePurchaseRequestDocument
              documents={defaultValues.invoiceResponse ?? []}
              title="Uploaded Files"
              titleClass="text-muted"
            />
          )}
        </Col>

        <Col sm={6} lg={4} md={4}>
          <FormInput
            label="Contract"
            type="file"
            name="contract"
            register={register}
            control={control}
            errors={errors}
            containerClass="mb-2"
            multiple
          />
          {defaultValues.contractResponse && (
            <HandlePurchaseRequestDocument
              documents={defaultValues.contractResponse ?? []}
              title="Uploaded Files"
              titleClass="text-muted"
            />
          )}
        </Col>
      </Row>
      <PurchaseRequestItemForm
        control={control}
        register={register}
        errors={errors}
        itemFields={itemFields}
        addItem={addItem}
        removeItem={removeItem}
        setValue={setValue}
      />
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

export default PurchaseRequestForm;
