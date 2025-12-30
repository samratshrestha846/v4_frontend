import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormInput } from '../../../components';
import PRODUCT_OPTIONS from '../../../constants/productOptions';
import ReactSelect from '../../../components/ReactSelect';
import { CustomerInputFields } from '../../../types/customer/customerOnboarding';
import { LabelValueDropdown } from '../../../types/common';
import { Customer } from '../../../types/customer/customerList';

type Props = {
  control: Control<CustomerInputFields>;
  errors: FieldErrors<CustomerInputFields>;
  register: UseFormRegister<CustomerInputFields>;
  submitted?: boolean;
  navigateToCustomerList: () => void;
  referrerOptions: LabelValueDropdown[];
  customer?: Customer;
};

const CustomerEditForm: React.FC<Props> = ({
  control,
  register,
  errors,
  submitted,
  navigateToCustomerList,
  referrerOptions,
  customer,
}) => {
  return (
    <Row>
      <Col sm={6} className="mb-2">
        <FormInput
          label="Business Name"
          type="text"
          name="business_name"
          placeholder="Enter Business Name"
          errors={errors}
          register={register}
          control={control}
        />
      </Col>

      <Col sm={6} className="mb-2">
        <FormInput
          label="Email"
          type="email"
          name="email"
          placeholder="Enter Email"
          errors={errors}
          register={register}
          control={control}
        />
      </Col>

      <Col sm={6} className="mb-2">
        <FormInput
          label="Phone"
          type="number"
          name="phone"
          placeholder="Enter Phone"
          errors={errors}
          register={register}
          control={control}
        />
      </Col>
      <Col xl={6} lg={6} md={6} className="mb-3">
        <ReactSelect
          name="referrer_id"
          label="Referrer"
          errors={errors}
          control={control}
          options={referrerOptions}
          defaultSelected={referrerOptions.find(
            (item) => Number(item.value) === customer?.referrer_id
          )}
        />
      </Col>
      <Col sm={4} className="mb-2">
        <h5>Products</h5>
        {PRODUCT_OPTIONS.map((product, index) => (
          <FormInput
            key={`subscribed_products_${product.label}`}
            id={`subscribed_products_${index}`}
            label={product.label}
            type="checkbox"
            name={`subscribed_products[${index}]`}
            errors={errors}
            register={register}
            control={control}
            defaultChecked={customer?.subscribed_products?.includes(
              product.value
            )}
          />
        ))}
      </Col>

      <Col sm={4} className="mb-2">
        <h5>Setting</h5>
        <FormInput
          label="Show Dashboard"
          type="checkbox"
          name="settings[show_dashboard]"
          errors={errors}
          register={register}
          control={control}
          defaultChecked={
            customer?.settings?.show_dashboard
              ? customer?.settings?.show_dashboard
              : false
          }
        />
      </Col>

      <Col sm={4} className="mb-3">
        <h5>Is Active</h5>
        <FormInput
          label="Yes"
          type="checkbox"
          name="is_active"
          errors={errors}
          register={register}
          control={control}
          defaultChecked={customer?.is_active ? customer.is_active : false}
        />
      </Col>

      <Col sm={12}>
        <div className="float-end button-list">
          <Button
            className="btn btn-ghost"
            variant="outline"
            onClick={navigateToCustomerList}>
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
  );
};

export default CustomerEditForm;
