import React from 'react';
import Chart from 'react-apexcharts';

import { UdoseDailySummaryRecord } from '../../../../../../types/udose/udoseSummary';
import usePrepareNutrientFlowChartData from '../hooks/usePrepareNutrientFlowChartData';
import CustomLoader from '../../../../../../components/CustomLoader';

type Props = {
  dailyRecords?: UdoseDailySummaryRecord[];
};

const NutrientFlowChart: React.FC<Props> = ({ dailyRecords }) => {
  const { loading, chartSeries, chartOptions } =
    usePrepareNutrientFlowChartData(dailyRecords);

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="line"
      className="apex-charts"
      height={400}
    />
  );
};

export default NutrientFlowChart;
