import React from 'react';
import { Card, Col, Row, Badge } from 'react-bootstrap';

import StockTypeModule from './DeviceStockType';
import Udose from '../../../assets/images/udose/udose.png';

import { Device } from '../../../types/device/device';
import { LABEL_NO, LABEL_YES } from '../../../constants/constants';
import {
  capitalizeWordFirstLetter,
  formattedShortDate,
} from '../../../helpers';

type Props = {
  device: Device | undefined;
};

const DeviceInfo: React.FC<Props> = ({ device }) => {
  return (
    <Card>
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center gap-1">
          <h5 className="text-primary-color m-0">Device Info</h5>
          <StockTypeModule stockTypeName={device?.stock_type_name!} />
        </div>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col lg={12}>
            <div className="text-center d-block mb-4 mt-0">
              <img
                src={Udose}
                className="img-fluid"
                style={{ maxWidth: '190px' }}
                alt="IMG"
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={6} sm={6} md={6}>
            <h6 className="font-14">Configuration</h6>
            <p>{device?.device_configuration?.type ?? '-'}</p>
          </Col>
          <Col xs={6} sm={6} md={6}>
            <h6 className="font-14">Device Variant</h6>
            <p>
              {device?.variant
                ? capitalizeWordFirstLetter(device.variant.replace('_', ' '))
                : '-'}
            </p>
          </Col>
          <Col xs={6} sm={6} md={6}>
            <h6 className="font-14">Serial Number</h6>
            <p className="text-uppercase">{device?.serial_number ?? '-'}</p>
          </Col>
          <Col xs={6} sm={6} md={6}>
            <h6 className="font-14">Telemetry Option</h6>
            <p>{device?.has_telemetry ? LABEL_YES : LABEL_NO}</p>
          </Col>

          <Col xs={6} sm={6} md={6}>
            <h6 className="font-14">Telemetry Type</h6>
            <p>{device?.telemetry ?? '-'}</p>
          </Col>

          <Col xs={6} sm={6} md={6}>
            <h6 className="font-14">Gateway Modem</h6>
            <p className="text-uppercase">
              {device?.gateway_modem_number ?? '-'}
            </p>
          </Col>
          <Col xs={6} sm={6} md={6}>
            <h6 className="font-14">Refurbished Option</h6>
            <p>{device?.is_refurbished ? LABEL_YES : LABEL_NO}</p>
          </Col>
          <Col xs={6} sm={6} md={6}>
            <h6 className="font-14">Flowmeter Option</h6>
            <p>{device?.has_flow_meter ? LABEL_YES : LABEL_NO}</p>
          </Col>
          <Col xs={6} sm={6} md={6}>
            <h6 className="font-14">Updated At</h6>
            <p>
              {device?.updated_at
                ? formattedShortDate(device?.updated_at)
                : '-'}
            </p>
          </Col>
        </Row>
        {device && device.tags.length > 0 && (
          <Row>
            <Col md="12">
              <h6 className="font-14">Tags</h6>
              <ul className="custom-list m-0 p-0 d-flex flex-wrap gap-1">
                {device?.tags?.map((tag) => (
                  <li key={tag.id} className="mb-1">
                    <Badge className="badge badge-outline-primary font-12">
                      {tag.name}
                    </Badge>
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        )}
      </Card.Body>
    </Card>
  );
};

export default DeviceInfo;
