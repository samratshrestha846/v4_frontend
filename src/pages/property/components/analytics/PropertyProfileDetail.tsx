import React from 'react';
import { Card } from 'react-bootstrap';
import { ProfilePic } from '../../../../assets/images';
import { Property } from '../../../../types/property/propertyList';

type Props = {
  property?: Property;
};

const PropertyProfileDetail: React.FC<Props> = ({ property }) => {
  return (
    <Card>
      <Card.Body>
        <div className="d-flex flex-column gap-0">
          <div className="d-flex gap-1">
            <img
              src={ProfilePic}
              className="rounded-circle border-1 border-primary"
              width="32"
              height="32"
              alt="Profile"
            />
            <div className="d-flex flex-column align-content-center justify-content-center">
              <h5 className="p-0 m-0">{property?.customer?.business_name}</h5>
              <p className="text-black-50 mb-0 font-12">
                {property?.customer?.email}
              </p>
            </div>
          </div>

          <div className="d-flex justify-content-start align-items-center gap-1">
            <i className="bx bxs-joystick-button" />
            <p className="fw-normal mb-0 text-gray">{property?.name}</p>
          </div>

          <div className="d-flex justify-content-start align-items-center gap-1">
            <i className="bx bx-map" />
            <p className="fw-normal mb-0 text-gray">
              {property?.region?.name}, {property?.region?.state}
            </p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PropertyProfileDetail;
