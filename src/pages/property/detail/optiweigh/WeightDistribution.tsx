import React from 'react';
import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';
import { ApexOptions } from 'apexcharts';
import useFetchOptiweighDistribution from '../hooks/useFetchOptiweighDistribution';

const WeightDistribution: React.FC = () => {
  const { weightRange, frequency } = useFetchOptiweighDistribution();

  const apexBarChartOpts: ApexOptions = {
    grid: {
      padding: {
        left: 0,
        right: 0,
      },
    },
    chart: {
      height: 320,
      type: 'bar',
      stacked: true,
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#727cf5', '#e3eaef'],
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    legend: {
      show: true,
    },
    fill: {
      opacity: 1,
    },
    xaxis: {
      categories: weightRange,
      axisBorder: {
        show: false,
      },
      title: {
        text: 'Weight Range (Kg)',
      },
    },
    yaxis: {
      decimalsInFloat: 0,
      title: {
        text: 'Animal Count',
      },
    },
    tooltip: {
      y: {
        formatter: (val: any) => val,
      },
    },
  };

  const apexBarChartData = [
    {
      name: 'Animal Count',
      data: frequency,
    },
  ];

  return (
    <Card className="">
      <Card.Header as="h5" className="text-primary-color">
        Weight Distribution
      </Card.Header>
      <Card.Body className="p-0">
        <Chart
          options={apexBarChartOpts}
          series={apexBarChartData}
          type="bar"
          className="apex-charts"
          height={320}
        />
      </Card.Body>
    </Card>
  );
};

export default WeightDistribution;
