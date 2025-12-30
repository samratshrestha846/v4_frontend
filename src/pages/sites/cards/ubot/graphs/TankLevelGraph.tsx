import React, { FC } from 'react';
import Chart from 'react-apexcharts';
import { UbotSummaryRecord } from '../../../../../types/ubot';
import usePrepareTankLevelGraphData from '../../../ubot/detail/monitoring/hooks/usePrepareTankLevelGraphData';
import CustomLoader from '../../../../../components/CustomLoader';

type Props = {
  data?: UbotSummaryRecord[];
};

const TankLevelGraph: FC<Props> = ({ data }) => {
  const { loading, chartSeries, chartOptions } =
    usePrepareTankLevelGraphData(data);

  return loading ? (
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

export default TankLevelGraph;
