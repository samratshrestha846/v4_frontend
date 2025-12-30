import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { DashboardKPIUdoseSite } from '../../../../types/dashboard/kpi';
import commaSeperatedNumber from '../../../../helpers/numberHelper';

type Props = {
  data?: DashboardKPIUdoseSite;
};

const SiteStatistics: React.FC<Props> = ({ data }) => {
  return (
    <Row>
      <Col className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-xs-12  overview-card">
        <div className="d-flex align-items-center gap-2">
          <div className="flex-shrink-0">
            <div className="avatar-sm">
              <span className="avatar-title bg-info rounded-circle my-0">
                <i className="bx bx-water font-20" />
              </span>
            </div>
          </div>
          <div className="flex-grow-1">
            <h3 className="text-black-50  fw-bold my-1">
              {data?.total_water_flow
                ? commaSeperatedNumber(Number(data.total_water_flow))
                : 0}
              {' L'}
            </h3>
            <h6 className="text-black-50 fw-bold">Total Water Flow</h6>
          </div>
        </div>
      </Col>
      <Col className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-xs-12  overview-card">
        <div className="d-flex align-items-center gap-2">
          <div className="flex-shrink-0">
            <div className="avatar-sm">
              <span className="avatar-title bg-warning rounded-circle my-0">
                <i className="bx bx-droplet font-20" />
              </span>
            </div>
          </div>
          <div className="flex-grow-1">
            <h3 className="text-black-50  fw-bold my-1">
              {commaSeperatedNumber(
                Math.floor(Number(data!.total_nutrient_flow) / 1000)
              )}
              {' L'}
            </h3>
            <h6 className="text-black-50 fw-bold">Total Nutrient Flow</h6>
          </div>
        </div>
      </Col>
      <Col className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-xs-12  overview-card">
        <div className="d-flex align-items-center gap-2">
          <div className="flex-shrink-0">
            <div className="avatar-sm">
              <span className="avatar-title bg-info-light rounded-circle my-0">
                <i className="mdi mdi-alarm-light font-20" />
              </span>
            </div>
          </div>
          <div className="flex-grow-1">
            <h3 className="text-black-50  fw-bold my-1">
              {data?.total_alarmed_sites ?? 0}
            </h3>
            <h6 className="text-black-50 fw-bold">Total Alarmed Sites</h6>
          </div>
        </div>
      </Col>
      <Col className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-xs-12  overview-card">
        <div className="d-flex align-items-center gap-2">
          <div className="flex-shrink-0">
            <div className="avatar-sm">
              <span className="avatar-title bg-danger rounded-circle my-0">
                <i className="mdi mdi-alarm-multiple font-20" />
              </span>
            </div>
          </div>
          <div className="flex-grow-1">
            <h3 className="text-black-50  fw-bold my-1">
              {data?.total_alarms ?? 0}
            </h3>
            <h6 className="text-black-50 fw-bold">Total Alarms</h6>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default SiteStatistics;
