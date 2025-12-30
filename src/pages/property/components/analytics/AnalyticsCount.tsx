// @flow
import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useUdoseAnalyticsContext } from '../../../../context/useUdoseAnalyticsContext';
import commaSeperatedNumber from '../../../../helpers/numberHelper';

const AnalyticsCount = () => {
  const { dashboardAnalytics } = useUdoseAnalyticsContext();

  return (
    <Card className="">
      <Card.Body className="p-2">
        <Row>
          <Col className="col-md-6 col-lg-4 col-xl-4 col-sm-6 col-xs-12 overview-card">
            <div className="d-flex align-items-center gap-2">
              <div className="flex-shrink-0">
                <div className="avatar-sm">
                  <span className="avatar-title bg-yellow rounded-circle my-0">
                    <i className="bx bx-money-withdraw font-20" />
                  </span>
                </div>
              </div>
              <div className="flex-grow-1">
                <h3 className="text-black  fw-bold my-1">
                  $
                  {
                    dashboardAnalytics?.costNutrientData
                      ?.daily_avg_cost_per_head
                  }
                </h3>
                <h6
                  className="text-black-50 fw-bold"
                  title="Daily Average Cost">
                  Daily Average Cost (Per Head)
                </h6>
              </div>
            </div>
          </Col>
          <Col className="col-md-6 col-lg-4 col-xl-4 col-sm-6 col-xs-12 overview-card">
            <div className="d-flex align-items-center gap-2">
              <div className="flex-shrink-0">
                <div className="avatar-sm">
                  <span className="avatar-title bg-skyBlue rounded-circle my-0">
                    <i className="bx bx-card font-20" />
                  </span>
                </div>
              </div>
              <div className="flex-grow-1">
                <h3 className="text-black  fw-bold my-1">
                  {dashboardAnalytics?.countData?.total_sites}
                </h3>
                <h6
                  className="text-black-50 fw-bold"
                  title="Total Installed Dosers">
                  uDOSEs Installed
                </h6>
              </div>
            </div>
          </Col>
          <Col className="col-md-6 col-lg-4 col-xl-4 col-sm-6 col-xs-12 overview-card">
            <div className="d-flex align-items-center gap-2">
              <div className="flex-shrink-0">
                <div className="avatar-sm">
                  <span className="avatar-title bg-teal rounded-circle my-0">
                    <i className="bx bxl-baidu font-20" />
                  </span>
                </div>
              </div>
              <div className="flex-grow-1">
                <h3 className="text-black  fw-bold">
                  {commaSeperatedNumber(
                    Number(dashboardAnalytics?.countData?.livestock_equivalent)
                  )}
                </h3>
                <h6
                  className="text-black-50 fw-bold"
                  title="Livestock Equivalent">
                  Livestock Equivalent
                </h6>
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default AnalyticsCount;
