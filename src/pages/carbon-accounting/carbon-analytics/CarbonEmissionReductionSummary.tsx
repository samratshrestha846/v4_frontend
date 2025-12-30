import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

import CustomLoader from '../../../components/CustomLoader';
import ErrorMessage from '../../../components/ErrorMessage';
import useFetchCarbonEmissionReductionSummary from './hooks/useFetchCarbonEmissionReductionSummary';
import BaselineProjectEmissionGraph from './BaselineProjectEmissionGraph';
import ReductionSummaryDetail from './ReductionSummaryDetail';
import FilterCarbonEmissionReductionSummary from './FilterCarbonEmissionReductionSummary';

const CarbonEmissionReductionSummary: React.FC = () => {
  const {
    data: summary,
    isFetching,
    isError,
    customer,
    setCustomer,
    property,
    setProperty,
    site,
    setSite,
    duration,
    setDuration,
    setCustomDateRange,
    customersOptions,
    isErrorCustomersOptions,
    propertiesOptions,
    isErrorPropertiesOptions,
    sitesOptions,
    isErrorSitesOptions,
  } = useFetchCarbonEmissionReductionSummary();

  if (
    isError ||
    isErrorCustomersOptions ||
    isErrorPropertiesOptions ||
    isErrorSitesOptions
  )
    return <ErrorMessage />;

  return (
    <Card>
      <Card.Body>
        <FilterCarbonEmissionReductionSummary
          customer={customer}
          setCustomer={setCustomer}
          property={property}
          setProperty={setProperty}
          site={site}
          setSite={setSite}
          duration={duration}
          setDuration={setDuration}
          customersOptions={customersOptions ?? []}
          propertiesOptions={propertiesOptions ?? []}
          sitesOptions={sitesOptions ?? []}
          setCustomDateRange={setCustomDateRange}
        />

        {isFetching ? (
          <CustomLoader />
        ) : (
          <Row>
            <Col md={7}>
              <BaselineProjectEmissionGraph
                data={summary!}
                duration={duration}
              />
            </Col>
            <Col md={5}>
              <ReductionSummaryDetail data={summary!} />
            </Col>
          </Row>
        )}
      </Card.Body>
    </Card>
  );
};

export default CarbonEmissionReductionSummary;
