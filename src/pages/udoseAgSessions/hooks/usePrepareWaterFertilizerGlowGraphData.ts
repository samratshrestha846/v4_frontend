import { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';
import { ChartSeriesData } from '../../../types/common';
import { formattedDatetime } from '../../../helpers';
import { UdoseAgSessionRunningVolume } from '../../../types/udoseAgs/udoseAgs';
import { FERTILIZER_COLOR, WATER_COLOR } from '../../../constants/constants';

export default function usePrepareWaterFertilizerGlowGraphData(
  records?: UdoseAgSessionRunningVolume[] | []
) {
  const [loading, setLoading] = useState<boolean>(true);
  const [chartSeries, setChartSeries] = useState<ChartSeriesData[]>([]);
  const [chartOptions, setChartOptions] = useState<ApexOptions>({});

  useEffect(() => {
    parseGraphData(records);
  }, [records]);

  const parseGraphData = (dataRecords?: UdoseAgSessionRunningVolume[]) => {
    const waterFlow: number[] = [];
    const fertiliserFlow: number[] = [];
    const date: string[] = [];

    dataRecords?.forEach((value) => {
      waterFlow.push(Number(value.water_flow));
      fertiliserFlow.push(value.fertiliser_flow);
      date.push(formattedDatetime(value.message_date));
    });

    setChartSeries(apexAreaChartSeries(waterFlow, fertiliserFlow));
    setChartOptions(apexAreaChartOptions(date));
    setLoading(false);
  };

  const apexAreaChartSeries = (
    waterFlow: number[],
    fertiliserFlow: number[]
  ): ChartSeriesData[] => {
    return [
      {
        name: 'Water Flow (L)',
        data: waterFlow,
      },
      {
        name: 'Fertilizer Flow (L)',
        data: fertiliserFlow,
      },
    ];
  };

  const apexAreaChartOptions = (messageDate: string[]): ApexOptions => {
    return {
      chart: {
        stacked: false,
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: true,
        },
      },

      stroke: {
        width: 2,
        curve: 'smooth',
      },
      colors: [WATER_COLOR, FERTILIZER_COLOR],
      labels: messageDate,

      xaxis: {
        categories: messageDate,
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: true,
        },
        title: {
          text: 'Date',
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: [
        {
          min: 0,
          forceNiceScale: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            width: 4,
            color: WATER_COLOR,
          },
          title: {
            text: 'Water Flow (L)',
          },
          seriesName: 'Water Flow',
        },

        {
          min: 0,
          forceNiceScale: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            width: 4,
            color: FERTILIZER_COLOR,
          },
          seriesName: 'Fertilizer Flow',
          opposite: true,
          title: {
            text: 'Fertilizer Flow (L)',
          },
        },
      ],
      fill: {
        opacity: [1, 1],
        gradient: {
          inverseColors: false,
          shade: 'light',
          stops: [0, 100, 100, 100],
        },
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        shared: true,
        intersect: false,
        x: {
          show: true,
        },
      },
    };
  };

  return {
    loading,
    chartSeries,
    chartOptions,
  };
}
