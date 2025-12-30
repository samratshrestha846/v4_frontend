import React from 'react';
import Chart from 'react-apexcharts';
import CustomLoader from '../../../components/CustomLoader';
import useFetchObservationsByCeresTag from '../hooks/useFetchObservationsByCeresTag';
import ErrorMessage from '../../../components/ErrorMessage';

const DeviceTemperatureGraph: React.FC = () => {
  const { isError, isFetching, chartOptions, chartSeries, loading } =
    useFetchObservationsByCeresTag();

  if (isError) return <ErrorMessage />;

  return isFetching || loading ? (
    <CustomLoader />
  ) : (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="area"
      className="apex-charts"
      height={350}
    />
  );
};

export default DeviceTemperatureGraph;
