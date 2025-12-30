import React from 'react';
import Chart from 'react-apexcharts';
import { UdoseRecordFourHour } from '../../../../../../types/udose/udoseSummary';
import usePrepareNutrientUsageData from '../hooks/usePrepareNutrientUsageData';
import CustomLoader from '../../../../../../components/CustomLoader';

type Props = {
  fourHourlyRecords: UdoseRecordFourHour[];
  height?: number;
};

const NutrientUsageAreaChart: React.FC<Props> = ({
  fourHourlyRecords,
  height,
}) => {
  const { loading, chartSeries, chartOptions } =
    usePrepareNutrientUsageData(fourHourlyRecords);

  return loading ? (
    <CustomLoader />
  ) : (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="area"
      className="apex-charts"
      height={height ?? 400}
    />
  );
};

export default NutrientUsageAreaChart;
