import React from 'react';
import Chart from 'react-apexcharts';
import usePrepareUbotRainfallChartData from './hooks/usePrepareUbotRainfallChartData';
import {
  CumulativeRainfallRecord,
  HourlyRainfallRecord,
} from '../../../../../types/ubot';
import CustomLoader from '../../../../../components/CustomLoader';

type Props = {
  data?: CumulativeRainfallRecord[] | HourlyRainfallRecord[];
  rainfallFilterType: string;
  isFetching: boolean;
};

const UbotRainfallChart: React.FC<Props> = ({
  data,
  rainfallFilterType,
  isFetching,
}) => {
  const { loading, chartSeries, chartOptions } =
    usePrepareUbotRainfallChartData({
      records: data,
      rainfallFilterType,
    });

  return loading || isFetching ? (
    <CustomLoader />
  ) : (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="area"
      className="apex-charts"
      height={400}
    />
  );
};

export default UbotRainfallChart;
