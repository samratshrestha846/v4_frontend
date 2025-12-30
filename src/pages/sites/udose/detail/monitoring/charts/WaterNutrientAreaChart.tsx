import React from 'react';
import Chart from 'react-apexcharts';
import { UdoseRecordHour } from '../../../../../../types/udose/udoseSummary';
import usePrepareWaterNutrientData from '../hooks/usePrepareWaterNutrientData';
import CustomLoader from '../../../../../../components/CustomLoader';

type Props = {
  hourlyRecords: UdoseRecordHour[];
  height?: number;
};

const WaterNutrientAreaChart: React.FC<Props> = ({ hourlyRecords, height }) => {
  const { loading, chartSeries, chartOptions } =
    usePrepareWaterNutrientData(hourlyRecords);

  return loading ? (
    <CustomLoader />
  ) : (
    <Chart
      options={chartOptions}
      series={chartSeries}
      className="apex-charts"
      type="area"
      height={height ?? 400}
    />
  );
};

export default WaterNutrientAreaChart;
