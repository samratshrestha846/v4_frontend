/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { Control, FieldErrors } from 'react-hook-form';
import ReactSelect from '../../../../components/ReactSelect';
import { UbotFormFields, UbotSite } from '../../../../types/ubot';
import { LabelNumericValue } from '../../../../types/common';

type Props = {
  errors: FieldErrors<UbotFormFields>;
  control: Control<UbotFormFields>;
  propertyOptions: LabelNumericValue[];
  customer?: string;
  region?: string;
  // eslint-disable-next-line no-unused-vars
  propagateOnChange: (selected: any) => void;
  showCustomerRegion: boolean;
  ubotData?: UbotSite;
};

const UbotBusinessInfoEditForm: React.FC<Props> = ({
  control,
  errors,
  propertyOptions,
  customer,
  region,
  propagateOnChange,
  showCustomerRegion,
  ubotData,
}) => {
  return (
    <>
      <h5 className="mt-0 mb-2 text-uppercase p-2 b-secondary">
        <i className="mdi mdi-file-table-box-multiple-outline me-1" />
        Property Details
      </h5>
      <Row className="mb-1">
        <Col sm={6} md={4} className="react-select-form mb-2">
          <ReactSelect
            errors={errors}
            control={control}
            label="Property"
            name="customer_property_id"
            options={propertyOptions}
            propagateOnChange={propagateOnChange}
            defaultSelected={propertyOptions?.find(
              (element) => element.value === ubotData?.customer_property?.id
            )}
          />
        </Col>

        {showCustomerRegion && (
          <>
            <Col sm={6} md={4} className="mb-2">
              <Form.Label
                className="form-label text-muted"
                htmlFor="disabledSelect">
                Customer
              </Form.Label>
              <input
                value={customer}
                type="text"
                className="form-control"
                disabled
              />
            </Col>
            <Col sm={6} md={4} className="mb-2">
              <Form.Label
                className="form-label text-muted"
                htmlFor="disabledSelect">
                Region
              </Form.Label>
              <input
                value={region}
                type="text"
                className="form-control"
                disabled
              />
            </Col>
          </>
        )}
      </Row>
    </>
  );
};
export default UbotBusinessInfoEditForm;
