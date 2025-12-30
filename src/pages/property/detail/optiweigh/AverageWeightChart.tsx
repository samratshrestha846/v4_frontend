import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';
import useFetchOptiweighWeightCharts from '../hooks/useFetchOptiweighWeightCharts';
import CustomLoader from '../../../../components/CustomLoader';
import { ChartSeriesData } from '../../../../types/common';

const AverageWeightChart = () => {
  const [apexOptions, setApexOptions] = useState({});
  const [apexSeries, setApexSeries] = useState<ChartSeriesData[]>([]);

  const { dateSet, weightSet, animalCount, isFetching } =
    useFetchOptiweighWeightCharts();

  useEffect(() => {
    setApexOptions(getApexOptions());
    setApexSeries(getApexSeriesData());
  }, [weightSet, animalCount]);

  const getApexOptions = () => {
    return {
      chart: {
        height: 380,
        type: 'line',
        stacked: false,
        toolbar: {
          show: false,
        },
      },
      stroke: {
        width: [0, 2, 4],
        curve: 'smooth',
      },
      plotOptions: {
        bar: {
          columnWidth: '30%',
        },
      },
      colors: ['#727cf5', '#39afd1', '#fa5c7c'],
      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: 'vertical',
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100],
        },
      },
      labels: dateSet,
      markers: {
        size: 0,
      },
      legend: {
        offsetY: 0,
      },
      xaxis: {
        type: 'date',
      },
      yaxis: {
        title: {
          text: 'Weight (Kg)',
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (y: any) => {
            if (typeof y !== 'undefined') {
              return y.toFixed(0);
            }
            return y;
          },
        },
      },
      grid: {
        borderColor: '#f1f3fa',
      },
    };
  };

  // chart data
  const getApexSeriesData = () => {
    return [
      {
        name: 'Avg. Weight',
        type: 'column',
        data: weightSet,
      },

      {
        name: 'Animal Count',
        type: 'line',
        data: animalCount,
      },
    ];
  };

  if (isFetching) {
    return <CustomLoader />;
  }

  return (
    <Card className=" border-0 shadow-none ">
      <Card.Header as="h5" className="text-primary-color">
        Average Weight
      </Card.Header>
      <Card.Body className="p-0">
        <Chart
          options={apexOptions}
          series={apexSeries}
          type="line"
          height={320}
          className="apex-charts"
        />
      </Card.Body>
    </Card>
  );
};

export default AverageWeightChart;
