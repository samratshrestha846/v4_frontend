import React, { FC } from 'react';
import Chart from 'react-apexcharts';
import usePrepareWaterNutrientFlowData from '../hooks/usePrepareWaterNutrientFlowData';
import { SupplementFeedAnalysisRecord } from '../../../../../../types/udose/supplementFeedAnalysis';
import CustomLoader from '../../../../../../components/CustomLoader';

type Props = {
  records: SupplementFeedAnalysisRecord[];
};

const WaterNutrientFlowGraph: FC<Props> = ({ records }) => {
  const { loading, chartSeries, chartOptions } =
    usePrepareWaterNutrientFlowData(records);

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      className="apex-charts"
      type="bar"
      height={350}
    />
  );
};

export default WaterNutrientFlowGraph;
