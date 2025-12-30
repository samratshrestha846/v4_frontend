import React from 'react';
import Chart from 'react-apexcharts';
import { UdoseHealth } from '../../../../../../types/udose/udoseSummary';
import usePrepareBatterySolarVoltageData from '../hooks/usePrepareBatterySolarVoltageData';
import CustomLoader from '../../../../../../components/CustomLoader';

type Props = {
  udoseHealth: UdoseHealth[];
  height?: number;
};

const BatterySolarVoltageAreaChart: React.FC<Props> = ({
  udoseHealth,
  height,
}) => {
  const { loading, chartSeries, chartOptions } =
    usePrepareBatterySolarVoltageData(udoseHealth);

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

export default BatterySolarVoltageAreaChart;
