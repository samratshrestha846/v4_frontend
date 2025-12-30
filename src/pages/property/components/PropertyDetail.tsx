/* eslint-disable react/prop-types */
import React from 'react';
import { Card } from 'react-bootstrap';
import { Property } from '../../../types/property/propertyList';

type Props = {
  property?: Property;
};

const PropertyDetail: React.FC<Props> = ({ property }) => {
  return (
    <Card>
      <Card.Header as="h5" className="px-2 fw-meium text-primary-color">
        Property Detail
      </Card.Header>
      <Card.Body>
        <p className=" mb-2">
          <strong>Property Name :</strong> &nbsp;&nbsp;&nbsp;
          {property?.name}
        </p>
        <p className=" mb-2">
          <strong>Property Region :</strong> &nbsp;&nbsp;&nbsp;
          {`${property?.region?.name}, ${property?.region?.state}`}
        </p>
        <p className="mb-2">
          <strong>Business Name :</strong> &nbsp;&nbsp;&nbsp;
          {property?.customer?.business_name}
        </p>
        <p className="mb-2">
          <strong>Business Email :</strong> &nbsp;&nbsp;&nbsp;
          {property?.customer?.email ? property?.customer?.email : '-'}
        </p>
        <p className="mb-2">
          <strong>Business Phone :</strong> &nbsp;&nbsp;&nbsp;
          {property?.customer?.phone ? property?.customer?.phone : '-'}
        </p>
      </Card.Body>
    </Card>
  );
};

export default PropertyDetail;
