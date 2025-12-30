import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import PageTitle from '../../../../../components/PageTitle';
import TableWithPagination from '../../../../../components/TableWithPagination';
import useFetchUdoseDailySummary from './hooks/useFetchUdoseDailySummary';
import ErrorMessage from '../../../../../components/ErrorMessage';
import CustomLoader from '../../../../../components/CustomLoader';
import { UDOSE_SITE_LIST, UDOSE_VIEW } from '../../../../../constants/path';
import NutrientFlowChart from './components/NutrientFlowChart';
import PumpSpeedChart from './components/PumpSpeedChart';
import LivestockEquivalentChart from './components/LivestockEquivalentChart';
import { prepareDynamicUrl } from '../../../../../helpers';

const UdoseDailySummary: React.FC = () => {
  const { id: siteId } = useParams();
  const {
    data: dailyRecords,
    isFetching,
    isError,
    searchParams,
    columns,
  } = useFetchUdoseDailySummary();

  const siteName = searchParams.get('site_name');

  if (isError) {
    return <ErrorMessage />;
  }

  if (isFetching) {
    return <CustomLoader />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Dashboard', path: '/' },
          { label: 'uDoses', path: UDOSE_SITE_LIST },
          {
            label: `${siteName ?? ''}`,
            path: `${prepareDynamicUrl(UDOSE_VIEW, siteId)}`,
            active: false,
          },
          {
            label: 'Daily Summary',
            path: '/',
            active: true,
          },
        ]}
        title="uDOSE Daily Summary"
      />
      <Row>
        <Col md={12}>
          <Card>
            <Card.Header>
              <h5 className="m-0 text-primary-color">
                Nutrient Flow on Target
              </h5>
            </Card.Header>
            <Card.Body>
              <NutrientFlowChart dailyRecords={dailyRecords} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={12}>
          <Card>
            <Card.Header>
              <h5 className="m-0 text-primary-color">Pump Speed</h5>
            </Card.Header>
            <Card.Body>
              <PumpSpeedChart dailyRecords={dailyRecords} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={12}>
          <LivestockEquivalentChart dailyRecords={dailyRecords} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body className="p-2">
              {dailyRecords && (
                <TableWithPagination columns={columns} data={dailyRecords} />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default UdoseDailySummary;
