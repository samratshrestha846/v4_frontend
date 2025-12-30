import { useEffect, useState } from 'react';
import moment from 'moment';
import { ApexOptions } from 'apexcharts';
import { UdoseRecordFourHour } from '../../../../../../types/udose/udoseSummary';
import { NUTRIENT_COLOR } from '../../../../../../constants/constants';

export default function usePrepareNutrientUsageData(
  fourHourlyRecords: UdoseRecordFourHour[]
) {
  const [chartSeries, setChartSeries] = useState<any[]>([]);
  const [chartOptions, setChartOptions] = useState<ApexOptions>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    parseNutrientUsageGraphData(fourHourlyRecords);
  }, [fourHourlyRecords]);

  const parseNutrientUsageGraphData = (data: UdoseRecordFourHour[]) => {
    const nutrientLevel: number[] = [];
    const messageDate: string[] = [];

    data.forEach((value) => {
      nutrientLevel.push(value.nutrient_tank_level);
      messageDate.push(moment.utc(value.message_date).toLocaleString());
    });

    setChartSeries(apexAreaChartSeries(nutrientLevel));
    setChartOptions(apexAreaChartOptions(messageDate));
    setLoading(false);
  };

  const apexAreaChartSeries = (nutrientLevel: number[]) => {
    return [
      {
        name: 'Total Nutrient Left (L)',
        data: nutrientLevel,
      },
    ];
  };

  const apexAreaChartOptions = (messageDate: string[]): Object => {
    return {
      chart: {
        type: 'area',
        toolbar: {
          export: {
            csv: {
              dateFormatter: (timestamp: string) =>
                moment(timestamp).format('YYYY-MM-DD HH:mm:ss'),
            },
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [2, 2],
        curve: 'smooth',
      },
      labels: messageDate,
      colors: [NUTRIENT_COLOR],
      legend: {
        offsetY: -10,
      },
      fill: {
        opacity: [0.25, 1, 0.25, 0.25],
        gradient: {
          inverseColors: false,
          shade: 'light',
          stops: [0, 100, 100, 100],
        },
      },
      xaxis: {
        type: 'datetime',
        title: {
          text: ' ',
        },
        tooltip: {
          enabled: true,
        },
        labels: {
          datetimeUTC: false,
        },
      },
      yaxis: [
        {
          min: 0,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: NUTRIENT_COLOR,
            width: 4,
          },
          labels: {
            style: {
              colors: NUTRIENT_COLOR,
            },
          },
          seriesName: 'Nutrient Tank Level',
          opposite: false,
          title: {
            text: 'Nutrient Tank Level (L)',
            style: {
              color: NUTRIENT_COLOR,
            },
          },
        },
      ],

      tooltip: {
        x: {
          show: false,
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
