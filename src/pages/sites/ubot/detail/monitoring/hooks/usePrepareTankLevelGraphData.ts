import { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';
import { UbotSummaryRecord } from '../../../../../../types/ubot';
import { formattedDatetime } from '../../../../../../helpers';

type ChartSeriesData = {
  name: string;
  data: number[];
};

export default function usePrepareTankLevelGraphData(
  records?: UbotSummaryRecord[]
) {
  const [chartSeries, setChartSeries] = useState<any[]>([]);
  const [chartOptions, setChartOptions] = useState<ApexOptions>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    parseGraphData(records);
  }, [records]);

  const parseGraphData = (data?: UbotSummaryRecord[]) => {
    const tankLevel: number[] = [];
    const date: string[] = [];

    data?.forEach((value) => {
      tankLevel.push(value.tank_level);
      date.push(formattedDatetime(value.message_date));
    });

    setChartSeries(apexAreaChartSeries(tankLevel));
    setChartOptions(apexAreaChartOptions(date));
    setLoading(false);
  };

  const apexAreaChartSeries = (tankLevel: number[]): ChartSeriesData[] => {
    return [
      {
        name: 'Tank Level (%)',
        data: tankLevel,
      },
    ];
  };

  const apexAreaChartOptions = (messageDate: string[]): ApexOptions => {
    return {
      chart: {
        stacked: false,
        zoom: {
          enabled: true,
        },
        toolbar: {
          show: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
        curve: 'smooth',
      },
      colors: ['#44badc', '#FFBC00'],
      labels: messageDate,
      fill: {
        opacity: [0.25, 1],
        gradient: {
          inverseColors: false,
          shade: 'light',
          stops: [0, 100, 100, 100],
        },
      },
      xaxis: {
        type: 'datetime',
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: true,
        },

        tooltip: {
          enabled: true,
        },
      },
      yaxis: [
        {
          decimalsInFloat: 2,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            width: 4,
            color: '#44badc',
          },
          title: {
            text: 'Tank Level (%)',
          },
          seriesName: 'Tank Level',
        },
      ],
      tooltip: {
        shared: true,
        intersect: false,
        x: {
          show: true,
          format: 'ddd, dd MMM yyyy hh:mm TT',
        },
      },
    };
  };

  return { loading, chartSeries, chartOptions };
}
