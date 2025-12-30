import React from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import Select from 'react-select';
import { useParams } from 'react-router-dom';
import BatterySolarVoltage from './BatterySolarVoltage';
import Conductivity from './Conductivity';
import NutrientUsage from './NutrientUsage';
import WaterNutrient from './WaterNutrient';
import DURATION_OPTIONS, {
  DURATION_LAST_7_DAYS,
} from '../../../../../constants/durationOptions';
import useUdoseMonitoring from './hooks/useUdoseMonitoring';
import CustomLoader from '../../../../../components/CustomLoader';

const Monitoring: React.FC = () => {
  const { id } = useParams();
  const {
    data: records,
    isFetching: isFetchingRecords,
    isConductivityProbeInstalled,
    siteDetail,
    selectedDate,
    setSelectedDate,
  } = useUdoseMonitoring();

  return (
    <>
      <Row className="mt-3 me-1">
        <Col md={9} />
        <Col md={3}>
          <Select
            onChange={(val) => {
              setSelectedDate(val ? val.value : DURATION_LAST_7_DAYS);
            }}
            name="duration"
            options={DURATION_OPTIONS}
            value={DURATION_OPTIONS?.find(
              (item: any) => item.value === selectedDate
            )}
          />
        </Col>
      </Row>
      {isFetchingRecords ? (
        <CustomLoader />
      ) : (
        <Row className="mx-0 ">
          <Col md={6}>
            <WaterNutrient
              hourlyRecords={records?.udose_record_hours!}
              id={Number(id)}
            />
          </Col>
          <Col md={6}>
            <NutrientUsage
              fourHourlyRecords={records?.udose_record_four_hours!}
              id={Number(id)}
            />
          </Col>
          <Col md={6}>
            <BatterySolarVoltage
              udoseHealth={records?.health!}
              id={Number(id)}
            />
          </Col>
          {/* Display only if conductivity probe is Installed */}
          <Col md={6}>
            {isConductivityProbeInstalled ? (
              <Conductivity
                setting={siteDetail?.latest_setting!}
                fourHourlyRecords={records?.udose_record_four_hours!}
                id={Number(id)}
              />
            ) : (
              <Alert variant="secondary">
                <h5>Conductivity probe is not installed</h5>
              </Alert>
            )}
          </Col>
        </Row>
      )}
    </>
  );
};

export default Monitoring;
