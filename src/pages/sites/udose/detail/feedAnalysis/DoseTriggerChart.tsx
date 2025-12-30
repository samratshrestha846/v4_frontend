import { ApexOptions } from 'apexcharts';
import React, { FC } from 'react';
import Chart from 'react-apexcharts';

type Props = {
  graphData: any;
};

const DoseTriggerChart: FC<Props> = ({ graphData }) => {
  const options: ApexOptions = {
    chart: {
      height: 380,
      type: 'area',
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: 'Expected vs Actual dose-trigger ratio',
    },
    stroke: {
      width: 3,
      curve: 'smooth',
    },
    colors: ['#727cf5', '#6c757d'],
    legend: {
      offsetY: -10,
    },
    xaxis: {
      categories: graphData?.message_date,
    },
    yaxis: {
      // min: 0,
      // max: 2.34,
      // logBase: 10,
      logarithmic: true,
      forceNiceScale: true,
      axisTicks: {
        show: true,
        // borderType: 'solid',
        color: '#78909C',
        width: 6,
        offsetX: 0,
        offsetY: 0,
      },
    },
    tooltip: {
      enabled: true,
    },
    grid: {
      row: {
        colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.2,
      },
      borderColor: '#f1f3fa',
    },
  };

  return (
    <div>
      <Chart
        options={options}
        series={graphData?.series}
        type="area"
        height={300}
        className="apex-charts mb-4"
      />
    </div>
  );
};

export default DoseTriggerChart;
