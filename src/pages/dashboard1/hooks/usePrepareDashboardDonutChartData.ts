import { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';
import { DashboardAnalytics } from '../../../types/dashboard/dashboard';

type ChartSeriesData = {
  name: string;
  data: number[];
};

export default function usePrepareDashboardDonutChartData(
  data?: DashboardAnalytics
) {
  const [loading, setLoading] = useState<boolean>(true);
  const [chartSeries, setChartSeries] = useState<ChartSeriesData[]>([]);
  const [chartOptions, setChartOptions] = useState<ApexOptions>({});

  useEffect(() => {
    if (data) {
      parseGraphData();
    }
  }, [data]);

  const parseGraphData = () => {
    setChartSeries(apexAreaChartSeries());
    setChartOptions(apexAreaChartOptions());
    setLoading(false);
  };

  const apexAreaChartSeries = (): ChartSeriesData[] => {
    return [
      {
        name: 'Water Flow',
        data: data?.daily_records.water_flow ?? [],
      },
      {
        name: 'Nutrient Flow',
        data: data?.daily_records.nutrient_flow ?? [],
      },
    ];
  };

  const apexAreaChartOptions = (): Object => {
    return {
      chart: {
        height: 320,
        type: 'line',
        dropShadow: {
          enabled: true,
          opacity: 0.1,
          blur: 7,
          left: -7,
          top: 7,
        },
        toolbar: {
          show: false,
        },
        parentHeightOffset: 0,
      },
      grid: {
        padding: {
          left: 0,
          right: 0,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 4,
      },
      zoom: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      colors: ['#44badc', '#FFBC00'],
      xaxis: {
        type: 'string',
        categories: data?.daily_records?.date ?? [],
        tooltip: {
          enabled: false,
        },
        axisBorder: {
          show: false,
        },
      },
      // yaxis: {
      //   labels: {
      //     formatter: function (val) {
      //       return val + 'k';
      //     },
      //   },
      // },
    };
  };
  return { loading, chartSeries, chartOptions };
}
