import React from 'react';
import Chart from 'react-apexcharts';
import { Card, Col, Row } from 'react-bootstrap';
import PageTitle from '../../components/PageTitle';
import { numberFormat } from '../../helpers/api/utils';
import SitesCount from './sites_count';
import Statistics from './Statistics';
import SiteOverview from './siteOverview/SiteOverview';
import useFetchDashboardStatistics from './hooks/useFetchDashboardStatistics';
import usePrepareDashboardDonutChartData from './hooks/usePrepareDashboardDonutChartData';
import CustomLoader from '../../components/CustomLoader';
import ErrorMessage from '../../components/ErrorMessage';

const Dashboard = () => {
  const {
    data: dashboardData,
    isFetching,
    isError,
  } = useFetchDashboardStatistics();

  const { loading, chartSeries, chartOptions } =
    usePrepareDashboardDonutChartData(dashboardData);

  if (isFetching || loading) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <div>
      <PageTitle
        breadCrumbItems={[{ label: 'Dashboard', path: '/', active: true }]}
        title="Dashboard"
      />
      <Statistics data={dashboardData} />
      <SiteOverview />
      <Row>
        <Col md={8}>
          <Card>
            <Card.Body>
              <h4 className="header-title mb-3">
                Water and Nutrient Flow in last 7 days
              </h4>

              <div className="chart-content-bg">
                <Row className="text-center">
                  <Col md={6}>
                    <p className="text-muted mb-0 mt-3">Water Flow</p>
                    <h2 className="fw-normal mb-3">
                      <small className="mdi mdi-checkbox-blank-circle text-info align-middle me-1" />
                      <span>
                        {dashboardData?.total_water_flow
                          ? `${numberFormat(dashboardData.total_water_flow)} KL`
                          : '-'}
                      </span>
                    </h2>
                  </Col>

                  <Col md={6}>
                    <p className="text-muted mb-0 mt-3">Nutrient Dosed</p>
                    <h2 className="fw-normal mb-3">
                      <small className="mdi mdi-checkbox-blank-circle text-warning align-middle me-1" />
                      <span>
                        {dashboardData?.total_nutrient_flow
                          ? `${numberFormat(dashboardData?.total_nutrient_flow)} L`
                          : '-'}
                      </span>
                    </h2>
                  </Col>
                </Row>
              </div>

              {dashboardData && (
                <Chart
                  options={chartOptions}
                  series={chartSeries}
                  type="line"
                  className="apex-charts mt-3"
                  height={320}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>{dashboardData && <SitesCount data={dashboardData} />}</Col>
      </Row>
    </div>
  );
};

export default Dashboard;
