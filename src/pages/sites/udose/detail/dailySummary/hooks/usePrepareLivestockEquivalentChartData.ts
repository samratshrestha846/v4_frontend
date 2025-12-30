import { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';
import { UdoseDailySummaryRecord } from '../../../../../../types/udose/udoseSummary';

type ChartSeriesData = {
  name: string;
  data: number[];
  type: string;
};

export default function usePrepareLivestockEquivalentChartData(
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
    const actualLivestock: number[] = [];
    const calculatedLivestock: number[] = [];
    const messageDate: string[] = [];

    data.forEach((value) => {
      actualLivestock.push(value.setting?.livestock_count ?? 0);
      calculatedLivestock.push(value.no_of_livestock ?? 0);
      messageDate.push(value.message_date);
    });

    setChartSeries(apexAreaChartSeries(actualLivestock, calculatedLivestock));
    setChartOptions(apexAreaChartOptions(messageDate));
    setLoading(false);
  };

  const apexAreaChartSeries = (
    actualLivestock: number[],
    calculatedLivestock: number[]
  ): ChartSeriesData[] => {
    return [
      {
        name: 'Livestock Calculated',
        data: calculatedLivestock,
        type: 'column',
      },
      {
        name: 'Livestock Set',
        data: actualLivestock,
        type: 'line',
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
      colors: ['#700606', '#067006'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [0, 4],
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
