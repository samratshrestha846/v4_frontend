import React from 'react';
import { Card } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import {
  capitalizeFirstLetter,
  findNutrientColor,
} from '../../../../helpers/helpers';
import CustomLoader from '../../../../components/CustomLoader';
import usePrepareAverageNutrientConsumptionDonutChartData from '../../detail/hooks/usePrepareAverageNutrientConsumptionDonutChartData';

type Props = {
  data: Record<string, number>;
};

const NutrientConsumptionDonutChart: React.FC<Props> = ({ data }) => {
  const { loading, chartOptions, chartSeries, isNutrientConsumed } =
    usePrepareAverageNutrientConsumptionDonutChartData(data);

  if (loading) return <CustomLoader />;

  return (
    <Card className="">
      <Card.Header as="h5" className="text-primary-color">
        Daily Average Nutrient Consumption
      </Card.Header>
      <Card.Body className="minHeight">
        {isNutrientConsumed && (
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="donut"
            height={220}
            className="apex-charts"
          />
        )}
        <div className="chart-widget-list">
          {!Object.values(data).every((val) => val === 0) &&
            Object.keys(data)?.map((item) => (
              <p className="font-12" key={item}>
                <i
                  className="mdi mdi-circle me-1"
                  style={{ color: `${findNutrientColor(item)}` }}
                />
                {capitalizeFirstLetter(item)}
                <span className="float-end fw-bold">{`${data[item]} g`}</span>
              </p>
            ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default NutrientConsumptionDonutChart;
