import React from 'react';
import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';
import CustomLoader from '../../../../components/CustomLoader';
import { CeresTagPFISummary } from '../../../../types/ceresTag/ceresTag';
import usePrepareDMIAndMethaneProductionBarGraph from '../../hooks/usePrepareDMIAndMethaneProductionBarGraph';

type Props = {
  data?: CeresTagPFISummary[];
};

const DryMatterConsumptionAndMethaneEmissionBarGraph: React.FC<Props> = ({
  data,
}) => {
  const { chartSeries, chartOptions, loading } =
    usePrepareDMIAndMethaneProductionBarGraph(data);

  return loading ? (
    <CustomLoader />
  ) : (
    <Card>
      <Card.Header as="h5" className="text-primary-color">
        Dry Matter Consumption and Methane Emission
      </Card.Header>
      <Card.Body>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          className="apex-charts"
          height={400}
        />
      </Card.Body>
    </Card>
  );
};

export default DryMatterConsumptionAndMethaneEmissionBarGraph;
