import { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';
import { UdoseDailySummaryRecord } from '../../../../../../types/udose/udoseSummary';

type ChartSeriesData = {
  name: string;
  data: number[];
};

export default function usePrepareNutrientFlowChartData(
  dailyRecords?: UdoseDailySummaryRecord[]
) {
  const [loading, setLoading] = useState(true);

  const [chartSeries, setChartSeries] = useState<ChartSeriesData[]>([]);
  const [chartOptions, setChartOptions] = useState<ApexOptions>({});

  useEffect(() => {
    if (dailyRecords) {
      parseGraphData(dailyRecords);
    }
  }, [dailyRecords]);

  const parseGraphData = (data: UdoseDailySummaryRecord[]) => {
    const onTarget: number[] = [];
    const messageDate: string[] = [];

    data.forEach((value) => {
      onTarget.push(value.on_target);
      messageDate.push(value.message_date);
    });

    setChartSeries(apexAreaChartSeries(onTarget));
    setChartOptions(apexAreaChartOptions(messageDate));
    setLoading(false);
  };

  const apexAreaChartSeries = (onTarget: number[]): ChartSeriesData[] => {
    return [
      {
        name: 'onTarget',
        data: onTarget,
      },
    ];
  };

  const apexAreaChartOptions = (messageDate: string[]): ApexOptions => {
    return {
      chart: {
        type: 'line',
        toolbar: {
          show: true,
        },
      },
      labels: messageDate,
      colors: ['#ffbc00'],
      annotations: {
        yaxis: [
          {
            y: 100,
            strokeDashArray: 0,
            borderColor: '#005f83',
            label: {
              borderColor: '#005f83',
              style: {
                color: '#fff',
                background: '#005f83',
              },
              text: `Expected Nutrient Flow`,
            },
          },
        ],
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      xaxis: {
        type: 'datetime',
        labels: {
          datetimeUTC: false,
        },
      },

      tooltip: {
        x: {
          show: false,
          format: 'ddd, dd MMM yyyy hh:mm TT',
        },
      },
    };
  };
  return { loading, chartSeries, chartOptions };
}
