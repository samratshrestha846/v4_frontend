import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import useCalculateCostFeed from './hooks/useCalculateCostFeed';
import Loader from '../../components/Loader';
import CostFeedCalculationForm from './forms/CostFeedCalculationForm';
import CostAnalysis from './components/CostAnalysis';
import FeedAnalysis from './components/FeedAnalysis';

const CostFeedAnalysis: React.FC = () => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    costFeedData,
    loading,
  } = useCalculateCostFeed();

  const handleContactUs = () => {
    window.location.href = 'https://ditagtech.com.au/contact/';
  };

  return (
    <div className="cost-feed-page p-3 bg-white">
      <h1 className="analysis-header text-center">Calculate Cost Feed</h1>
      <div className="p-3">
        <div className="box-showdow mb-3 p-3">
          <CostFeedCalculationForm
            register={register}
            control={control}
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            serverValidationError={serverValidationError}
            setServerValidationError={setServerValidationError}
          />
        </div>
        {loading ? (
          <Loader />
        ) : (
          costFeedData && (
            <>
              <Row>
                <Col md={6}>
                  <CostAnalysis costFeedData={costFeedData} />
                </Col>
                <Col md={6}>
                  <FeedAnalysis
                    feedAnalysisData={costFeedData.feedAnalysis}
                    productName={costFeedData.productName}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <div className="d-flex flex-column just-content-center align-items-center gap-2 mt-4">
                    <p className="m-0">
                      Contact us for questions on cost feed analysis or
                      additional information about DIT AgTech.
                    </p>
                    <Button
                      variant="info text-uppercase"
                      onClick={handleContactUs}>
                      Contact Us
                    </Button>
                  </div>
                </Col>
              </Row>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default CostFeedAnalysis;
