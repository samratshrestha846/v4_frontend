/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ReactSelect from '../../../components/ReactSelect';

type Props = {
  propertyOptions: any;
  paddockOptions: any;
  blockOptions: any;
  subBlockOptions: any;
  fertilizerOptions: any;
  errors?: any;
  control?: any;
  propagateOnPropertyChange: (selected?: any) => void;
  propagateOnPaddockChange: (selected: any) => void;
  propagateOnBlockChange: (selected: any) => void;
};

const AssignAreaAndFertilizerForm: React.FC<Props> = ({
  propertyOptions,
  paddockOptions,
  blockOptions,
  subBlockOptions,
  fertilizerOptions,
  errors,
  control,
  propagateOnPropertyChange,
  propagateOnPaddockChange,
  propagateOnBlockChange,
}) => {
  return (
    <Row>
      <Col md={6} className="mb-2">
        <ReactSelect
          control={control}
          errors={errors}
          label="Property"
          name="customer_property_id"
          placeholder="Choose Property"
          options={propertyOptions}
          propagateOnChange={propagateOnPropertyChange}
          isClearable
        />
      </Col>
      <Col md={6} className="mb-2">
        <ReactSelect
          control={control}
          errors={errors}
          label="Paddock"
          name="paddock_id"
          placeholder="Choose Paddock"
          options={paddockOptions}
          propagateOnChange={propagateOnPaddockChange}
          isClearable
        />
      </Col>

      <Col md={6} className="mb-2">
        <ReactSelect
          control={control}
          errors={errors}
          label="Block"
          name="block_id"
          placeholder="Choose Block"
          options={blockOptions}
          propagateOnChange={propagateOnBlockChange}
          isClearable
        />
      </Col>
      <Col md={6} className="mb-2">
        <ReactSelect
          control={control}
          errors={errors}
          label="Sub Block"
          name="sub_block_id"
          placeholder="Choose Sub Block"
          options={subBlockOptions}
          isOptionalField
          isClearable
        />
      </Col>
      <Col md={12} className="mb-2">
        <ReactSelect
          control={control}
          errors={errors}
          label="Fertilizer"
          name="fertilizer_id"
          placeholder="Choose Fertilizer"
          options={fertilizerOptions}
          isClearable
        />
      </Col>
    </Row>
  );
};

export default AssignAreaAndFertilizerForm;
