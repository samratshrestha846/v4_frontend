import React from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { UDOSE_LIST, UDOSE_VIEW } from '../../../../../../constants/path';
import { prepareDynamicUrl } from '../../../../../../helpers';
import PageTitle from '../../../../../../components/PageTitle';
import CustomLoader from '../../../../../../components/CustomLoader';
import ErrorMessage from '../../../../../../components/ErrorMessage';
import useFetchUdoseRecordHours from './hooks/useFetchUdoseRecordHours';
import WaterNutrientAreaChart from '../charts/WaterNutrientAreaChart';
import DateRangeFilter from '../components/DateRangeFilter';

const HourlyWaterNutrientFlow: React.FC = () => {
  const { id } = useParams();
  const {
    data,
    isFetching,
    isError,
    startDate,
    endDate,
    setDateRange,
    handleSubmit,
  } = useFetchUdoseRecordHours(Number(id));

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Dashboard', path: '/' },
          { label: 'uDoses', path: UDOSE_LIST },
          {
            label: data?.site?.name ?? 'uDose Site',
            path: prepareDynamicUrl(UDOSE_VIEW, id),
          },
          {
            label: 'Hourly Water Nutrient Flow Summary',
            path: '',
            active: true,
          },
        ]}
        title="Hourly Water Nutrient Flow Summary"
      />

      <Card>
        <Card.Body>
          <DateRangeFilter
            title={data?.site?.name ?? 'uDose Site'}
            startDate={startDate}
            endDate={endDate}
            setDateRange={setDateRange}
            handleSubmit={handleSubmit}
          />
          {isFetching ? (
            <CustomLoader />
          ) : (
            <WaterNutrientAreaChart hourlyRecords={data!.hours!} height={500} />
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default HourlyWaterNutrientFlow;
