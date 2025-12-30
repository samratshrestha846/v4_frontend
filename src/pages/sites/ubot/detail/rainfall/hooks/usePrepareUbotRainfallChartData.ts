import { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';
import {
  CumulativeRainfallRecord,
  HourlyRainfallRecord,
} from '../../../../../../types/ubot';
import { formattedDatetime } from '../../../../../../helpers';
import {
  RAINFALL_FILTER_TYPE_CUMULATIVE,
  RAINFALL_FILTER_TYPE_HOURLY,
} from '../../../../../../constants/durationOptions';

type ChartSeriesData = {
  name: string;
  data: number[];
};

type Props = {
  records?: CumulativeRainfallRecord[] | HourlyRainfallRecord[];
  rainfallFilterType: string;
};

export default function usePrepareUbotRainfallChartData({
  records,
  rainfallFilterType,
}: Props) {
  const [chartSeries, setChartSeries] = useState<ChartSeriesData[]>([]);
  const [chartOptions, setChartOptions] = useState<ApexOptions>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    parseGraphData(records);
  }, [records]);

  const parseGraphData = (
    data?: CumulativeRainfallRecord[] | HourlyRainfallRecord[]
  ) => {
    const rainfall: number[] = [];
    const date: string[] = [];

    if (rainfallFilterType === RAINFALL_FILTER_TYPE_CUMULATIVE) {
      (data as CumulativeRainfallRecord[])?.forEach((value) => {
        rainfall.push(value.rainfall);
        date.push(formattedDatetime(value.date));
      });
    }

    if (rainfallFilterType === RAINFALL_FILTER_TYPE_HOURLY) {
      (data as HourlyRainfallRecord[])?.forEach((value) => {
        rainfall.push(value.rainfall);
        date.push(formattedDatetime(value.message_date));
      });
    }

    setChartSeries(apexAreaChartSeries(rainfall));
    setChartOptions(apexAreaChartOptions(date));
    setLoading(false);
  };

  const apexAreaChartSeries = (rainfall: number[]): ChartSeriesData[] => {
    return [
      {
        name: 'Rainfall (mm))',
        data: rainfall,
      },
    ];
  };

  const apexAreaChartOptions = (messageDate: string[]): ApexOptions => {
    return {
      chart: {
        type: 'bar',
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
            text: 'Rainfall (mm)',
          },
          seriesName: 'Rainfall',
        },
      ],
      tooltip: {
        x: {
          show: true,
          format: 'ddd, dd MMM yyyy hh:mm TT',
        },
        fixed: {
          enabled: false,
          position: 'topRight',
        },
      },
    };
  };

  return { loading, chartSeries, chartOptions };
}
