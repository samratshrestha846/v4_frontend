import { FormInput } from '@uhub/components';
import ReactSelect from '@uhub/components/ReactSelect';
import usePropertiesDropdown from '@uhub/hooks/dropdown/usePropertiesDropdown';
import React, { useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import CustomLoader from '@uhub/components/CustomLoader';
import useReadProperty from '../../../../pages/property/hooks/useReadProperty';

type Props = {
  setFormValue: any;
  errors: any;
  control: any;
  watch: any;
  register: any;
  defaultCustomerPropertyId: number;
};
const CustomerPropertyForm: React.FC<Props> = ({
  setFormValue,
  errors,
  control,
  watch,
  register,
  defaultCustomerPropertyId,
}) => {
  const { data: propertyOptions, isFetching: isPropertyOptionFetching } =
    usePropertiesDropdown();
  const { data: propertyRecord, isFetching: isPropertyRecordFetching } =
    useReadProperty(watch('customer.property_id'));
  useEffect(() => {
    if (propertyRecord && propertyRecord.customer) {
      setFormValue('customer', {
        customer_id: propertyRecord.customer.id,
        property_id: propertyRecord.id,
        name: propertyRecord.customer.business_name,
        property_name: propertyRecord.name,
        identifier: '',
        email: propertyRecord.customer.email,
        phone: propertyRecord.customer.phone,
      });
    }
  }, [propertyRecord]);
  if (isPropertyOptionFetching || isPropertyRecordFetching) {
    return <CustomLoader />;
  }
  return (
    <Card>
      <Card.Header>
        <h5 className="text-primary-color m-0">
          <span className="text-nowrap">Customer Details</span>
        </h5>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col xl={6} lg={6} md={6} className="mb-3">
            <ReactSelect
              name="customer.property_id"
              label="Customer Property"
              errors={errors}
              control={control}
              options={propertyOptions ?? []}
              defaultSelected={propertyOptions?.find(
                (item: any) => item.value === defaultCustomerPropertyId
              )}
              value={propertyOptions?.find(
                (item: any) => item.value === watch('customer.property_id')
              )}
              isClearable
            />
          </Col>
          <Col xl={6} lg={6} md={6} className="mb-3">
            <FormInput
              label="Customer Name"
              type="hidden"
              errors={errors}
              control={control}
              register={register}
              name="customer.customer_id"
              readOnly
              defaultValue={propertyRecord?.customer?.id}
            />
            <FormInput
              label="Customer Name"
              type="text"
              errors={errors}
              control={control}
              register={register}
              name="customer.name"
              readOnly
              defaultValue={propertyRecord?.customer?.business_name}
            />
          </Col>
          <Col xl={6} lg={6} md={6} className="mb-3">
            <FormInput
              label="Property Name"
              type="text"
              name="customer.property_name"
              readOnly
              defaultValue={propertyRecord?.name}
            />
          </Col>
          <Col xl={6} lg={6} md={6} className="mb-3">
            <FormInput
              label="Email"
              type="text"
              errors={errors}
              control={control}
              name="customer.email"
              readOnly
              defaultValue={propertyRecord?.customer?.email}
            />
          </Col>
          <Col xl={6} lg={6} md={6} className="mb-3">
            <FormInput
              label="Phone"
              type="text"
              errors={errors}
              control={control}
              name="customer.phone"
              readOnly
              defaultValue={propertyRecord?.customer?.phone}
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
export default CustomerPropertyForm;
