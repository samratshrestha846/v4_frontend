import { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';
import { ChartSeriesData } from '../../../../../types/common';
import { UdoseRecordTwentyFourHour } from '../../../../../types/udose/udoseSummary';
import { formatGraphDate } from '../../../../../helpers';
import {
  NUTRIENT_COLOR,
  WATER_COLOR,
} from '../../../../../constants/constants';

export default function usePrepareWaterNutrientFlowGraphData(
  records?: UdoseRecordTwentyFourHour[] | []
) {
  const [loading, setLoading] = useState<boolean>(true);
  const [chartSeries, setChartSeries] = useState<ChartSeriesData[]>([]);
  const [chartOptions, setChartOptions] = useState<ApexOptions>({});

  useEffect(() => {
    if (records) {
      parseGraphData(records);
      parseGraphData(records);
    }
  }, [records]);

  const parseGraphData = (dataRecords: UdoseRecordTwentyFourHour[]) => {
    const waterFlow: number[] = [];
    const nutrientFlow: number[] = [];
    const date: string[] = [];

    dataRecords?.forEach((value) => {
      waterFlow.push(Number(value.water_flow.toFixed(1)));
      nutrientFlow.push(Number((value.nutrient_flow / 1000).toFixed(1)));
      date.push(formatGraphDate(value.message_date));
    });

    setChartSeries(apexAreaChartSeries(waterFlow, nutrientFlow));
    setChartOptions(apexAreaChartOptions(date));
    setLoading(false);
  };

  const apexAreaChartSeries = (
    waterFlow: number[],
    nutrientFlow: number[]
  ): ChartSeriesData[] => {
    return [
      {
        name: 'Water Flow (L)',
        data: waterFlow,
      },
      {
        name: 'Nutrient Flow (L)',
        data: nutrientFlow,
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
      colors: [WATER_COLOR, NUTRIENT_COLOR],
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
          decimalsInFloat: 1,
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
          decimalsInFloat: 1,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            width: 4,
            color: NUTRIENT_COLOR,
          },
          seriesName: 'Nutrient Flow',
          opposite: true,
          title: {
            text: 'Nutrient Flow (L)',
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
