import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import InstalledUdoses from './InstalledUdoses';
import PropertyDropdown from './PropertyDropdown';
import useFetchDashboardCount from '../hooks/useFetchDashboardCount';
import CustomLoader from '../../../components/CustomLoader';
import { DashboardCountKPI } from '../../../types/dashboard/kpi';
import ErrorMessage from '../../../components/ErrorMessage';
import { DIGIT_AFTER_DECIMAL } from '../../../constants/constants';
import commaSeperatedNumber from '../../../helpers/numberHelper';

type DashboardKPIOverview = {
  data?: DashboardCountKPI;
  isFetching: boolean;
  isError: boolean;
};

const DashboardOverview: React.FC = () => {
  const { data, isFetching, isError }: DashboardKPIOverview =
    useFetchDashboardCount();

  if (isFetching) {
    return (
      <Card className="summary">
        <CustomLoader />
      </Card>
    );
  }

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <Card className="summary">
      <Card.Body className="px-2 py-1">
        <Row>
          <Col className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-xs-12  overview-card">
            <div className="d-flex align-items-center gap-2">
              <div className="flex-shrink-0">
                <div className="avatar-sm">
                  <span className="avatar-title bg-purple rounded-circle my-0">
                    <i className="bx bx-briefcase font-20" />
                  </span>
                </div>
              </div>
              <div className="flex-grow-1">
                <h3 className="text-black-50  fw-bold my-1">
                  {data?.total_customer_properties ?? 0}
                </h3>
                <PropertyDropdown />
              </div>
            </div>
          </Col>
          <Col className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-xs-12  overview-card">
            <div className="d-flex align-items-center gap-2">
              <div className="flex-shrink-0">
                <div className="avatar-sm">
                  <span className="avatar-title bg-primary rounded-circle my-0">
                    <i className="bx bx-card font-20" />
                  </span>
                </div>
              </div>
              <div className="flex-grow-1">
                <h3 className="text-black-50  fw-bold my-1">
                  {data?.total_sites ?? 0}
                </h3>
                <InstalledUdoses />
              </div>
            </div>
          </Col>
          <Col className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-xs-12  overview-card">
            <div className="d-flex align-items-center gap-2">
              <div className="flex-shrink-0">
                <div className="avatar-sm">
                  <span className="avatar-title bg-skyBlue rounded-circle my-0">
                    <i className="bx bx-water font-20" />
                  </span>
                </div>
              </div>
              <div className="flex-grow-1">
                <h3 className="text-black-50  fw-bold my-1">
                  {data?.avg_water_flow
                    ? `${commaSeperatedNumber(Number(data.avg_water_flow.toFixed(DIGIT_AFTER_DECIMAL)))} L`
                    : '0 L'}
                </h3>
                <h6
                  className="text-black-50 fw-bold"
                  title="Daily Average Cost">
                  Avg. Water Flow
                  <small className="font-10">( 14 days )</small>
                </h6>
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
                <h3 className="text-black-50  fw-bold">
                  {data?.avg_nutrient_flow
                    ? `${commaSeperatedNumber(Number((data.avg_nutrient_flow / 1000).toFixed(DIGIT_AFTER_DECIMAL)))} L`
                    : '0 L'}
                </h3>
                <h6
                  className="text-black-50 fw-bold"
                  title="Livestock Equivalent">
                  Avg. Nutrient Flow
                  <small className="font-10">( 14 days)</small>
                </h6>
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default DashboardOverview;
