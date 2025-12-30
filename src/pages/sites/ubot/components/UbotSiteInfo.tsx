import React, { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UbotSite } from '../../../../types/ubot';
import { can } from '../../../../helpers/checkPermission';
import { READ_DEVICE } from '../../../../constants/permissions';

type Props = {
  ubotDetail?: UbotSite;
};

const UbotSiteInfo: FC<Props> = ({ ubotDetail }) => {
  const canReadDevice = can(READ_DEVICE);
  return (
    <>
      <h5 className="text-primary-color">{ubotDetail?.name}</h5>
      <Row className="mt-3 ms-2">
        <Col sm={6} lg={6} md={6}>
          <h6 className="font-14">Customer</h6>
          <p className="text-sm lh-150">
            {ubotDetail?.customer_property?.customer?.business_name ?? '-'}
          </p>
        </Col>
        <Col sm={6} lg={6} md={6}>
          <h6 className="font-14">Current Tank Level</h6>
          <p className="text-sm lh-150">
            {ubotDetail?.latest_ubot_record_hour?.tank_level || 0} %
          </p>
        </Col>
        <Col sm={6} lg={6} md={6}>
          <h6 className="font-14">Property</h6>
          <p className="text-sm lh-150">
            {ubotDetail?.customer_property?.name ?? '-'}
          </p>
        </Col>
        <Col sm={6} lg={6} md={6}>
          <h6 className="font-14">Tank Capacity</h6>

          {ubotDetail &&
          ubotDetail.tank_setting &&
          ubotDetail.tank_setting.tank_capacity &&
          ubotDetail.tank_setting.tank_capacity > 0 ? (
            <p className="text-sm lh-150">
              {ubotDetail?.tank_setting?.tank_capacity || 0}
              <small> Ltr </small>
            </p>
          ) : (
            '-'
          )}
        </Col>
        <Col sm={6} lg={6} md={6}>
          <h6 className="font-14">Region</h6>
          <p className="text-sm lh-150">
            {ubotDetail?.customer_property?.region?.name ?? '-'}
          </p>
        </Col>
        <Col sm={6} lg={6} md={6}>
          <h6 className="font-14">Device Serial No.</h6>

          {canReadDevice && (
            <p className="text-sm lh-150">
              {ubotDetail?.device && (
                <Link
                  to={`/devices/view/${ubotDetail?.device?.id}`}
                  className="icon-font-1"
                  target="_blank">
                  {ubotDetail?.device?.serial_number ?? '-'}{' '}
                  <i className="bx bx-link-external" />
                </Link>
              )}
            </p>
          )}
          {!canReadDevice && (
            <p className="text-sm lh-150">
              {ubotDetail?.device?.serial_number ?? '-'}
            </p>
          )}
        </Col>
      </Row>
    </>
  );
};
export default UbotSiteInfo;
