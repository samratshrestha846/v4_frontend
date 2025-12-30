import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { CeresTag } from '../../../types/ceresTag/ceresTag';
import { formattedDatetime, formattedShortDate } from '../../../helpers';
import { CERES_TAG_BRAND_CERESRANCH } from '../../../constants/ceresTagConstants';

type Props = {
  ceresTagDetail?: CeresTag;
};

const CeresTagInfo: React.FC<Props> = ({ ceresTagDetail }) => {
  return (
    <Row>
      <Col lg={4} md={6} sm={6} xs={6}>
        <h6 className="font-14">VID</h6>
        <p className="text-sm lh-150">{ceresTagDetail?.vid ?? '-'}</p>
      </Col>

      <Col lg={4} md={6} sm={6} xs={6}>
        <h6 className="font-14">Property</h6>
        <p className="text-sm lh-150">
          {ceresTagDetail?.customer_property?.name ?? '-'}
        </p>
      </Col>

      <Col lg={4} md={6} sm={6} xs={6}>
        <h6 className="font-14">Linked At</h6>
        <p className="text-sm lh-150">
          {ceresTagDetail?.linked_date
            ? formattedShortDate(ceresTagDetail?.linked_date)
            : '-'}
        </p>
      </Col>

      <Col lg={4} md={6} sm={6} xs={6}>
        <h6 className="font-14">First Date</h6>
        <p className="text-sm lh-150">
          {ceresTagDetail?.linked_date
            ? formattedShortDate(ceresTagDetail?.first_date)
            : '-'}
        </p>
      </Col>

      <Col lg={4} md={6} sm={6} xs={6}>
        <h6 className="font-14">Brand</h6>
        <p className="text-sm lh-150">{ceresTagDetail?.brand ?? '-'}</p>
      </Col>

      <Col lg={4} md={6} sm={6} xs={6}>
        <h6 className="font-14">Charge Type</h6>
        <p className="text-sm lh-150">{ceresTagDetail?.charge_type ?? '-'}</p>
      </Col>

      <Col lg={4} md={6} sm={6} xs={6}>
        <h6 className="font-14">Firmware Version</h6>
        <p className="text-sm lh-150">
          {ceresTagDetail?.firmware_version ?? '-'}
        </p>
      </Col>
      {ceresTagDetail?.brand === CERES_TAG_BRAND_CERESRANCH && (
        <>
          <Col lg={4} md={6} sm={6} xs={6}>
            <h6 className="font-14">Last Animal Updated At</h6>
            <p className="text-sm lh-150">
              {ceresTagDetail?.last_animal_updated_at
                ? formattedDatetime(ceresTagDetail?.last_animal_updated_at)
                : '-'}
            </p>
          </Col>

          <Col lg={4} md={6} sm={6} xs={6}>
            <h6 className="font-14">Last Animal Taken Off At</h6>
            <p className="text-sm lh-150">
              {ceresTagDetail?.last_animal_taken_off_at
                ? formattedDatetime(ceresTagDetail?.last_animal_taken_off_at)
                : '-'}
            </p>
          </Col>
        </>
      )}
    </Row>
  );
};

export default CeresTagInfo;
