import React, { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import {
  CumulativeRainfallRecord,
  HourlyRainfallRecord,
} from '../../../../../types/ubot';
import usecalculateAverageRainfall from '../hooks/useCalculateAverageRainfall';
import CustomLoader from '../../../../../components/CustomLoader';

type Props = {
  cumulativeRainfallRecord?: CumulativeRainfallRecord[];
  hourlyRainfallRecord?: HourlyRainfallRecord[];
};

const AvergaeRainfall: FC<Props> = ({
  cumulativeRainfallRecord,
  hourlyRainfallRecord,
}) => {
  const { loading, averageCumulativeRainfall, averageHourlyRainfall } =
    usecalculateAverageRainfall({
      cumulativeRainfallRecord,
      hourlyRainfallRecord,
    });

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <div className="chart-content-bg mt-1">
      <Row>
        <Col
          md={12}
          sm={12}
          className="d-flex justify-content-center align-items-center">
          <h6 className="text-primary text-uppercase my-2">Average Rainfall</h6>
        </Col>
        <Col md={6} sm={6} className="text-center">
          <p className="text-black-50 mb-0">
            Hourly
            <br /> <small className="text-muted">( last 7 Days)</small>
          </p>
          <h5 className="fw-normal mb-2">
            <span className="text-info">{averageHourlyRainfall} mm</span>
          </h5>
        </Col>
        <Col md={6} sm={6} className="text-center">
          <p className="text-black-50 mb-0">
            Daily <br />
            <small className="text-muted">( last 7 Days)</small>
          </p>
          <h5 className="fw-normal mb-2">
            <span className="text-info">{averageCumulativeRainfall} mm</span>
          </h5>
        </Col>
      </Row>
    </div>
  );
};
export default AvergaeRainfall;
