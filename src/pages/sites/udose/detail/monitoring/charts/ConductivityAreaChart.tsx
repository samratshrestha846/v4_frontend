import React from 'react';
import Chart from 'react-apexcharts';
import { UdoseRecordFourHour } from '../../../../../../types/udose/udoseSummary';
import usePrepareConductivityData from '../hooks/usePrepareConductivityData';
import CustomLoader from '../../../../../../components/CustomLoader';
import { SiteSetting } from '../../../../../../types/site';

type Props = {
  setting: SiteSetting;
  fourHourlyRecords: UdoseRecordFourHour[];
  height?: number;
};

const ConductivityAreaChart: React.FC<Props> = ({
  setting,
  fourHourlyRecords,
  height,
}) => {
  const { loading, chartSeries, chartOptions } = usePrepareConductivityData(
    setting,
    fourHourlyRecords
  );
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

export default ConductivityAreaChart;
