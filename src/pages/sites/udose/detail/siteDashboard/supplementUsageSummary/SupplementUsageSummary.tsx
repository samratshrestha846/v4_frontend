import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import useSupplementUsageSummary from './hooks/useSupplementUsageSummary';
import CustomLoader from '../../../../../../components/CustomLoader';
import ErrorMessage from '../../../../../../components/ErrorMessage';
import TrendAnalysis from '../../../../../../components/TrendAnalysis';

const SupplementUsageSummary: React.FC = () => {
  const {
    data: suppUsage,
    isFetching,
    isError,
    trendPercentage,
  } = useSupplementUsageSummary();

  if (isFetching) {
    return <CustomLoader />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <>
      <Card className="m-0">
        <Card.Body>
          <h5 className="m-0 mb-2 text-primary-color">Supplement Usage</h5>
          <Row className="supplement-total">
            <Col sm={6} md={4} className="supplement-total-info">
              <div className="supplement-info flex-grow-1">
                <h5 className="text-black text-nowrap">
                  {suppUsage?.current_month_total &&
                  suppUsage?.current_month_total > 0
                    ? `${suppUsage.current_month_total} L`
                    : '0 L'}
                </h5>
                <p className="mb-0 fw-bold">Current Month</p>
              </div>
            </Col>
            <Col sm={6} md={4} className="supplement-total-info">
              <div className="d-flex flex-column justify-content-between supplement-info">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex justify-content-start align-items-center gap-1">
                    <h5 className="text-black text-nowrap">
                      {suppUsage?.forecasted_month_end &&
                      suppUsage?.forecasted_month_end > 0
                        ? `${suppUsage.forecasted_month_end} L`
                        : `0 L`}
                    </h5>
                    <TrendAnalysis trendAmount={trendPercentage()} />
                  </div>
                </div>
                <p className="mb-0 fw-bold">Forecasted Month End</p>
              </div>
            </Col>
            <Col sm={6} md={4} className="supplement-total-info">
              <div className="supplement-info flex-grow-1">
                <h5 className="text-black text-nowrap">
                  {suppUsage?.last_month_total &&
                  suppUsage?.last_month_total > 0
                    ? `${suppUsage.last_month_total} L`
                    : '0 L'}
                </h5>
                <p className="mb-0 fw-bold">Last Month</p>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <p className="p-0 mt-1 font-12 fst-italic">
        <i className="bx bx-info-circle text-info me-1" />
        The usage shown above are just an estimate. Actual usage varies
        depending on number of livestock equivalent, weather, etc.
      </p>
    </>
  );
};

export default SupplementUsageSummary;
