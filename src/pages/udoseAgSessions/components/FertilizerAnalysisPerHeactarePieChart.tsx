import React from 'react';
import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';
import usePreparePieChartData from '../hooks/usePreparePieChartData';
import CustomLoader from '../../../components/CustomLoader';
import { SessionSummaryFertilizerAnalysisPerHectare } from '../../../types/udoseAgs/udoseAgs';

type Props = {
  fertilizerAnalysisPerHectare?: SessionSummaryFertilizerAnalysisPerHectare | null;
};

const FertilizerAnalysisPerHeactarePieChart: React.FC<Props> = ({
  fertilizerAnalysisPerHectare,
}) => {
  const { loading, series, options } = usePreparePieChartData(
    fertilizerAnalysisPerHectare?.breakdown
  );

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <Card>
      <Card.Header as="h5" className="text-primary-color">
        Fertilizer Analysis Per Hectare
      </Card.Header>
      <Card.Body>
        <Chart
          options={options}
          series={series}
          type="pie"
          height={220}
          className="apex-charts"
        />
      </Card.Body>
    </Card>
  );
};

export default FertilizerAnalysisPerHeactarePieChart;
