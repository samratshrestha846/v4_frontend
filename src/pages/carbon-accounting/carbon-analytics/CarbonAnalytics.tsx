import React from 'react';
import { Col, Row } from 'react-bootstrap';
import TotalCarbonAbatement from '../components/TotalCarbonAbatement';
import CustomLoader from '../../../components/CustomLoader';
import ErrorMessage from '../../../components/ErrorMessage';
import TotalClaimed from '../components/TotalClaimed';
import useFetchCarbonEmissionReductions from './hooks/useFetchCarbonAnalytics';

const CarbonAnalytics: React.FC = () => {
  const {
    data: carbonEmissionReduction,
    isFetching,
    isError,
  } = useFetchCarbonEmissionReductions();

  if (isFetching) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <Row>
      <Col>
        <div className="carbon-analytics flex-wrap mb-3">
          <TotalCarbonAbatement
            carbonEmissionReduction={carbonEmissionReduction}
          />
          <TotalClaimed
            claimedAmount={carbonEmissionReduction?.carbon_credit_claim}
          />
        </div>
      </Col>
    </Row>
  );
};

export default CarbonAnalytics;
