import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import classNames from 'classnames';
import BingMap from '../../../../../components/BingMap';
import { formattedDate } from '../../../../../helpers';
import useMap from './hooks/useMap';

const Map: React.FC = () => {
  const { siteDetail, copyCoordinate, isCopied, siteWithLocation } = useMap();
  return (
    <div className="pt-2">
      <Card className="ribbon-box">
        <Card.Body>
          <Row>
            <Col>
              <div
                className={classNames(
                  'ribbon',
                  'ribbon-success',
                  'float-start',
                  'mb-2'
                )}>
                <i className="mdi mdi-access-point me-1" />{' '}
                {siteDetail?.location &&
                  formattedDate(siteDetail?.location?.msg_original_date)}
              </div>
              <div className="d-flex justify-content-end align-items-center gap-3">
                {siteDetail?.latitude && siteDetail?.longitude && (
                  <div className="d-flex align-items-center">
                    <p className="fw-bold font-12 text-black-50 m-0">
                      GPS Location:&nbsp;&nbsp;
                      <span className="text-black">
                        {Number(siteDetail.latitude).toFixed(5)}
                        {', '} {Number(siteDetail.longitude).toFixed(5)}
                      </span>
                    </p>

                    <Button
                      onClick={copyCoordinate}
                      className="ms-1 p-0"
                      type="Button"
                      variant="link">
                      {!isCopied ? (
                        <i className="mdi mdi-content-copy ms-1" />
                      ) : (
                        <i className="mdi mdi-check-circle-outline ms-1">
                          Copied
                        </i>
                      )}
                    </Button>
                  </div>
                )}
                <div className="d-flex gap-1">
                  {siteDetail?.location_updated_at && (
                    <p className="fw-normal font-12 text-black-50 mb-0">
                      <i className="bx bx-info-circle " /> Last updated:{' '}
                      {formattedDate(siteDetail?.location_updated_at)}
                    </p>
                  )}
                </div>
              </div>
            </Col>
          </Row>
          <BingMap data={siteWithLocation} />
        </Card.Body>
      </Card>
    </div>
  );
};

export default Map;
