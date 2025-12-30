import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { can } from '../../../helpers/checkPermission';
import { READ_DEVICE } from '../../../constants/permissions';
import { UdoseAgs } from '../../../types/udoseAgs/udoseAgs';
import { formattedDatetime, prepareDynamicUrl } from '../../../helpers';
import { DEVICE_VIEW } from '../../../constants/path';

type Props = {
  udoseAgDetail?: UdoseAgs;
};

const UdoseAgInfo: React.FC<Props> = ({ udoseAgDetail }) => {
  const canReadDevice = can(READ_DEVICE);

  return (
    <Row>
      <Col xs={6} sm={6} lg={4}>
        <h6 className="font-14">Customer</h6>
        <p className="text-sm lh-150">
          {udoseAgDetail?.customer?.business_name ?? '-'}
        </p>
      </Col>

      <Col xs={6} sm={6} lg={4}>
        <h6 className="font-14">Device Serial No.</h6>

        {canReadDevice ? (
          <p className="text-sm lh-150">
            {udoseAgDetail?.device ? (
              <Link
                to={prepareDynamicUrl(DEVICE_VIEW, udoseAgDetail?.device?.id)}
                className="icon-font-1"
                target="_blank">
                {udoseAgDetail?.device?.serial_number ?? '-'}
              </Link>
            ) : (
              '-'
            )}
          </p>
        ) : (
          <p className="text-sm lh-150">
            {udoseAgDetail?.device?.serial_number ?? '-'}
          </p>
        )}
      </Col>

      <Col xs={6} sm={6} lg={4}>
        <h6 className="font-14">Installed At</h6>
        <p className="text-sm lh-150">
          {udoseAgDetail?.installed_at
            ? formattedDatetime(udoseAgDetail?.installed_at)
            : '-'}
        </p>
      </Col>

      <Col xs={6} sm={6} lg={4}>
        <h6 className="font-14">Trailer No.</h6>
        <p className="text-sm lh-150">{udoseAgDetail?.trailer_no ?? '-'}</p>
      </Col>

      <Col xs={6} sm={6} lg={4}>
        <h6 className="font-14">Last Communicated</h6>
        <p className="text-sm lh-150">
          {udoseAgDetail?.communicated_at
            ? formattedDatetime(udoseAgDetail?.communicated_at)
            : '-'}
        </p>
      </Col>
    </Row>
  );
};

export default UdoseAgInfo;
