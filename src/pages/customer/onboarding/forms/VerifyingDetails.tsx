/* eslint-disable react/prop-types */
import React from 'react';
import { Badge, Col, Row } from 'react-bootstrap';
import {
  BusinessOwnerInputFields,
  CustomerInputFields,
  PropertyInputFields,
  StationManagerInputFields,
} from '../../../../types/customer/customerOnboarding';
import { LabelValue } from '../../../../types/common';

type Props = {
  customerDetails?: CustomerInputFields;
  ownerDetails?: BusinessOwnerInputFields;
  propertyDetails?: PropertyInputFields;
  stationManagerDetails?: StationManagerInputFields;
  regionsDropdown?: LabelValue[];
  referrerOptions?: LabelValue[];
};

const VerifyingDetails: React.FC<Props> = ({
  customerDetails,
  ownerDetails,
  propertyDetails,
  stationManagerDetails,
  regionsDropdown,
  referrerOptions,
}) => {
  return (
    <>
      <div className="mb-3">
        <h5 className="mt-0 text-slate-gray text-uppercase">
          Customer Business Details
        </h5>
        <Row className="ms-2">
          <Col md={4}>
            <h6 className="font-14">Business Name</h6>
            <p className="text-sm lh-150">
              {customerDetails?.business_name ?? '-'}
            </p>
          </Col>
          <Col md={4}>
            <h6 className="font-14">Email</h6>
            <p className="text-sm lh-150">{customerDetails?.email ?? '-'}</p>
          </Col>
          <Col md={4}>
            <h6 className="font-14">Phone</h6>
            <p className="text-sm lh-150">{customerDetails?.phone ?? '-'}</p>
          </Col>
          <Col md={4}>
            <h6 className="font-14">Referrered By</h6>
            <p className="text-sm lh-150">
              {(referrerOptions &&
                referrerOptions.find(
                  (item: any) => item.value === customerDetails?.referrer_id
                )?.label) ??
                '-'}
            </p>
          </Col>

          <Col md={4}>
            <h6 className="font-14">Subscribed Products</h6>
            <p className="text-sm lh-150">
              {customerDetails?.subscribed_products &&
                customerDetails?.subscribed_products?.map((item) => (
                  <Badge key={item} className="badge-outline-primary me-1">
                    {item}
                  </Badge>
                ))}
            </p>
          </Col>

          <Col md={4}>
            <h6 className="font-14">Show Dashboard</h6>
            <Badge
              className={`badge-outline-${
                customerDetails?.settings?.show_dashboard ? 'success' : 'gray'
              }`}>
              {customerDetails?.settings?.show_dashboard
                ? 'Enabled'
                : 'Disabled'}
            </Badge>
          </Col>

          <Col md={4}>
            <h6 className="font-14">Status</h6>
            <Badge
              className={`badge-outline-${
                customerDetails?.is_active ? 'success' : 'gray'
              }`}>
              {customerDetails?.is_active ? 'Active' : 'Inactive'}
            </Badge>
          </Col>
        </Row>
      </div>
      <div className="mb-3">
        <h5 className="mt-0 text-slate-gray text-uppercase">
          Customer Account Details
        </h5>
        <Row className="ms-2">
          <Col md={4}>
            <h6 className="font-14">Full Name</h6>
            <p className="text-sm lh-150">
              {ownerDetails?.owner_first_name} {ownerDetails?.owner_last_name}
            </p>
          </Col>
          <Col md={4}>
            <h6 className="font-14">Email</h6>
            <p className="text-sm lh-150">{ownerDetails?.owner_email ?? '-'}</p>
          </Col>
          <Col md={4}>
            <h6 className="font-14">Mobile</h6>
            <p className="text-sm lh-150">
              {ownerDetails?.owner_phone_number ?? '-'}
            </p>
          </Col>
        </Row>
      </div>
      <div className="mb-3">
        <h5 className="mt-0 text-slate-gray text-uppercase">
          Property Details
        </h5>
        <Row className="ms-2">
          <Col md={4}>
            <h6 className="font-14"> Name</h6>
            <p className="text-sm lh-150">{propertyDetails?.name ?? '-'}</p>
          </Col>
          <Col md={4}>
            <h6 className="font-14">Region</h6>
            <p className="text-sm lh-150">
              {(regionsDropdown &&
                regionsDropdown.find(
                  (item: any) =>
                    item.value === Number(propertyDetails?.region_id)
                )?.label) ??
                '-'}
            </p>
          </Col>
          <Col md={4}>
            <h6 className="font-14"> Optiweigh Setting</h6>
            <Badge
              className={`badge-outline-${
                propertyDetails?.is_enable ? 'success' : 'gray'
              }`}>
              {propertyDetails?.is_enable ? 'Enabled' : 'Disabled'}
            </Badge>
          </Col>
          <Col md={4}>
            <h6 className="font-14"> Optiweigh Client ID</h6>
            <p className="text-sm lh-150">
              {propertyDetails?.client_id ?? '-'}
            </p>
          </Col>
        </Row>
      </div>
      <div className="mb-3">
        <h5 className="mt-0 text-slate-gray text-uppercase">
          Station Manager Details
        </h5>
        <Row className="ms-2">
          <Col md={4}>
            <h6 className="font-14"> Full Name</h6>
            <p className="text-sm lh-150">
              {stationManagerDetails?.first_name}
              {stationManagerDetails?.last_name}
            </p>
          </Col>
          <Col md={4}>
            <h6 className="font-14">Email Address</h6>
            <p className="text-sm lh-150">
              {stationManagerDetails?.email_address ?? '-'}
            </p>
          </Col>
          <Col md={4}>
            <h6 className="font-14">Mobile</h6>
            <p className="text-sm lh-150">
              {stationManagerDetails?.phone_number ?? '-'}
            </p>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default VerifyingDetails;
