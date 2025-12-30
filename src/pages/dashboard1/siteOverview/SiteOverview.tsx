import React from 'react';
import { Card } from 'react-bootstrap';

import CustomLoader from '../../../components/CustomLoader';
import ErrorMessage from '../../../components/ErrorMessage';
import useFetchSiteKPIDashboardData from './hooks/useFetchSiteKPIDashboardData';
import useCreditTypesDropdown from '../../../hooks/dropdown/useCreditTypesDropdown';
import SiteStatistics from './components/SiteStatistics';
import SiteStatisticsFilter from './components/SiteStatisticsFilter';

const SiteOverview: React.FC = () => {
  const {
    data,
    isFetching,
    isError,
    setStartDate,
    setEndDate,
    setCreditType,
    startDate,
    endDate,
    creditType,
  } = useFetchSiteKPIDashboardData();

  const {
    data: creditTypeOptions,
    isError: isErrorCrediTypeOptions,
    isFetching: isFetchingCreditTypeCoptions,
  } = useCreditTypesDropdown();

  if (isError || isErrorCrediTypeOptions) {
    return <ErrorMessage />;
  }

  return (
    <Card>
      <Card.Body>
        <SiteStatisticsFilter
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          creditType={creditType}
          setCreditType={setCreditType}
          creditTypeOptions={creditTypeOptions}
        />
        {isFetching || isFetchingCreditTypeCoptions ? (
          <CustomLoader />
        ) : (
          <SiteStatistics data={data} />
        )}
      </Card.Body>
    </Card>
  );
};

export default SiteOverview;
