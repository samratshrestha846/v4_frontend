import React from 'react';
import { Col, Row } from 'react-bootstrap';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { numberFormat } from '@uhub/helpers/api/utils';
import MapContent from '../../pages/dashboardMapView/MapContent';
import QuickAction from './components/QuickAction';
import DeviceInfo from './components/DeviceInfo';
import useUnifiedDashboard from './hooks/useUnifiedDashboard';
import AnalyticsCard from './components/AnalyticsCard';

const UnifiedDashboard: React.FC = () => {
  const { data, isFetching, isError } = useUnifiedDashboard();

  if (isFetching) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <div className="unified-dasboard mt-3">
      <Row>
        <Col lg={10} xl={10}>
          <div className="unified-dashboard-analytics">
            <Row>
              <Col sm={6} md={4} lg={3} xl={3}>
                <div className="d-flex flex-column justify-content-start aliang-items-center gap-3">
                  <AnalyticsCard
                    title="Total Water Flow"
                    text={
                      data?.total_water_flow
                        ? `${numberFormat(data?.total_water_flow)} L`
                        : '-'
                    }
                    bottomText="(Last 14 Days)"
                    wrapperClass="border-info"
                  />

                  <AnalyticsCard
                    title="Total Nutrient Flow"
                    text={
                      data?.total_nutrient_flow
                        ? `${numberFormat(data?.total_nutrient_flow)} L`
                        : '-'
                    }
                    bottomText="(Last 14 Days)"
                    wrapperClass="border-warning"
                  />
                </div>
              </Col>
              <Col sm={6} md={4} lg={3} xl={3}>
                <div className="d-flex flex-column justify-content-start aliang-items-center gap-3">
                  <AnalyticsCard
                    title="No. of Livestock"
                    text={
                      data?.number_live_stock
                        ? numberFormat(data?.number_live_stock)
                        : '-'
                    }
                    bottomText="(Last Year)"
                    wrapperClass="border-danger"
                  />

                  <AnalyticsCard
                    title="uDose"
                    text={data?.udose_count.toString() ?? '-'}
                    bottomText="(Last Month)"
                    wrapperClass="border-primary"
                  />
                </div>
              </Col>

              <Col sm={6} md={4} lg={3} xl={3}>
                <AnalyticsCard
                  title="Entity Information"
                  wrapperClass="entities-information h-100">
                  <div className="d-flex justify-content-between align-items-center gap-3 flex-nowrap">
                    <p className="m-0 font-16">Customers</p>
                    <span className="font-24 fw-semibold text-black text-nowrap">
                      {data?.customer_count ?? 0}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center gap-3 flex-nowrap">
                    <p className="m-0 font-16">Properties</p>
                    <span className="font-24 fw-semibold text-black text-nowrap">
                      {data?.customer_property_count ?? 0}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center gap-3 flex-nowrap">
                    <p className="m-0 font-16">Sites</p>
                    <span className="font-24 fw-semibold text-black text-nowrap">
                      {data?.site_count ?? 0}
                    </span>
                  </div>
                </AnalyticsCard>
              </Col>
              <Col sm={6} md={4} lg={3} xl={3}>
                <AnalyticsCard
                  title="Device Information"
                  wrapperClass="device-information h-100">
                  {data && <DeviceInfo data={data.device_info} />}
                </AnalyticsCard>
              </Col>
            </Row>
          </div>
          <Row>
            <Col md={12} lg={12} xl={12}>
              <MapContent
                wrapperclass="my-3 rounded-2"
                height="70vh"
                mapWrapperClass="rounded-2"
              />
            </Col>
          </Row>
        </Col>
        <Col lg={2} xl={2}>
          <QuickAction />
        </Col>
      </Row>
    </div>
  );
};

export default UnifiedDashboard;
