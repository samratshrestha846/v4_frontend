import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import commaSeperatedNumber from '../../helpers/numberHelper';
import { DashboardAnalytics } from '../../types/dashboard/dashboard';

type Props = {
  data?: DashboardAnalytics;
};

const Statistics: React.FC<Props> = ({ data }) => {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-xs-12  overview-card">
            <div className="d-flex align-items-center gap-2">
              <div className="flex-shrink-0">
                <div className="avatar-sm">
                  <span className="avatar-title bg-gray rounded-circle my-0">
                    <i className="bx bx-group font-20" />
                  </span>
                </div>
              </div>
              <div className="flex-grow-1">
                <h3 className="text-black-50  fw-bold my-1">
                  {data?.customer_count ?? 0}
                </h3>
                <h6 className="text-black-50 fw-bold">Total Customers</h6>
              </div>
            </div>
          </Col>
          <Col className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-xs-12  overview-card">
            <div className="d-flex align-items-center gap-2">
              <div className="flex-shrink-0">
                <div className="avatar-sm">
                  <span className="avatar-title bg-gray rounded-circle my-0">
                    <i className="bx bx-briefcase font-20" />
                  </span>
                </div>
              </div>
              <div className="flex-grow-1">
                <h3 className="text-black-50  fw-bold my-1">
                  {data?.properties_count ?? 0}
                </h3>
                <h6 className="text-black-50 fw-bold">Total Properties</h6>
              </div>
            </div>
          </Col>
          <Col className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-xs-12  overview-card">
            <div className="d-flex align-items-center gap-2">
              <div className="flex-shrink-0">
                <div className="avatar-sm">
                  <span className="avatar-title bg-gray rounded-circle my-0">
                    <i className="bx bx-devices font-20" />
                  </span>
                </div>
              </div>
              <div className="flex-grow-1">
                <h3 className="text-black-50  fw-bold my-1">
                  {data?.devices_count ?? 0}
                </h3>
                <h6 className="text-black-50 fw-bold">Total Devices</h6>
              </div>
            </div>
          </Col>
          <Col className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-xs-12  overview-card">
            <div className="d-flex align-items-center gap-2">
              <div className="flex-shrink-0">
                <div className="avatar-sm">
                  <span className="avatar-title bg-gray rounded-circle my-0">
                    <i className="mdi mdi-cow font-20" />
                  </span>
                </div>
              </div>
              <div className="flex-grow-1">
                <h3 className="text-black-50  fw-bold my-1">
                  {data?.livestock_equivalent
                    ? commaSeperatedNumber(data.livestock_equivalent)
                    : 0}
                </h3>
                <h6 className="text-black-50 fw-bold">Livestock Equivalent</h6>
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Statistics;
