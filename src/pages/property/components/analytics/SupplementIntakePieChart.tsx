import React from 'react';
import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';
import { findSupplementColor } from '../../../../helpers';
import CustomLoader from '../../../../components/CustomLoader';
import { DailyAverageSupplementIntake } from '../../../../types/property/analytics';
import usePrepareSupplementIntakePieChartData from '../../detail/hooks/usePrepareSupplementIntakePieChartData';
import { SUPPLEMENT_NAME_MAPPING } from '../../../../constants/supplementMapping';

type Props = {
  data: DailyAverageSupplementIntake[];
};

const SupplementIntakePieChart: React.FC<Props> = ({ data }) => {
  const { loading, chartOptions, chartSeries } =
    usePrepareSupplementIntakePieChartData(data);

  if (loading) return <CustomLoader />;

  return (
    <Card className="">
      <Card.Header as="h5" className="text-primary-color">
        Daily Average Supplement Intake
      </Card.Header>
      <Card.Body className="minHeight">
        {data.length > 0 && (
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="pie"
            height={220}
            className="apex-charts"
          />
        )}
        <div className="chart-widget-list">
          {data?.map((item) => (
            <p className="font-12" key={item.supplement_name}>
              <i
                className="mdi mdi-circle me-1"
                style={{
                  color: `${findSupplementColor(
                    SUPPLEMENT_NAME_MAPPING[item.supplement_name]
                  )}`,
                }}
              />
              {item.supplement_name}
              <span className="float-end fw-bold">{`${item.avg_daily_intake} L`}</span>
            </p>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default SupplementIntakePieChart;
