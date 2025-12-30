import { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';
import { UdoseDailySummaryRecord } from '../../../../../../types/udose/udoseSummary';

type ChartSeriesData = {
  name: string;
  data: number[];
};

export default function usePreparePumpSpeedChart(
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
    const pumpSpeed: number[] = [];
    const messageDate: string[] = [];
    let averagePumpSpeed = 0;

    data = data.filter(
      (value) => value.water_flow > 0 && value.nutrient_flow > 0
    );

    data.forEach((value) => {
      pumpSpeed.push(value.pump_speed);
      messageDate.push(value.message_date);
    });

    averagePumpSpeed = Number(
      (pumpSpeed.reduce((a, b) => a + b, 0) / pumpSpeed.length).toFixed(1)
    );

    setChartSeries(apexAreaChartSeries(pumpSpeed));
    setChartOptions(apexAreaChartOptions(messageDate, averagePumpSpeed));
    setLoading(false);
  };

  const apexAreaChartSeries = (pumpSpeed: number[]): ChartSeriesData[] => {
    return [
      {
        name: 'Pump Speed (mls/sec)',
        data: pumpSpeed,
      },
    ];
  };

  const apexAreaChartOptions = (
    messageDate: string[],
    averagePumpSpeed: number
  ): ApexOptions => {
    return {
      chart: {
        type: 'line',
        toolbar: {
          show: true,
        },
      },
      labels: messageDate,
      annotations: {
        yaxis: [
          {
            y: averagePumpSpeed,
            strokeDashArray: 0,
            borderColor: '#C04F02',
            label: {
              borderColor: '#C04F02',
              style: {
                color: '#fff',
                background: '#C04F02',
              },
              text: `Average Pump Speed: ${averagePumpSpeed}`,
            },
          },
        ],
      },
      colors: ['#C0AE02'],
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
