import { useEffect, useState } from 'react';
import moment from 'moment';
import { ApexOptions } from 'apexcharts';
import { UdoseRecordHour } from '../../../../../../types/udose/udoseSummary';
import {
  NUTRIENT_COLOR,
  WATER_COLOR,
} from '../../../../../../constants/constants';

type DataPair = [string, number];

export default function usePrepareWaterNutrientData(
  hourlyRecords: UdoseRecordHour[]
) {
  const [chartSeries, setChartSeries] = useState<any[]>([]);
  const [chartOptions, setChartOptions] = useState<ApexOptions>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    parseHourlyGraphData(hourlyRecords);
  }, [hourlyRecords]);

  const parseHourlyGraphData = (data: UdoseRecordHour[]) => {
    const waterFlow: DataPair[] = [];
    const nutrientFlow: DataPair[] = [];
    const alarmed: DataPair[] = [];
    const stopped: DataPair[] = [];

    data?.forEach((value) => {
      const d = moment.utc(value.message_date).local().toLocaleString();
      waterFlow.push([d, value.water_flow]);
      nutrientFlow.push([d, value.nutrient_flow]);
      alarmed.push([d, value.status_code === 2 ? 1 : 0]);
      stopped.push([d, value.status_code === 0 ? 1 : 0]);
    });

    setChartSeries(
      apexAreaChartSeries(waterFlow, nutrientFlow, stopped, alarmed)
    );
    setChartOptions(apexAreaChartOptions());
    setLoading(false);
  };

  const apexAreaChartSeries = (
    waterFlow: DataPair[],
    nutrientFlow: DataPair[],
    stopped: DataPair[],
    alarmed: DataPair[]
  ) => {
    return [
      {
        name: 'Water Flow (L)',
        data: waterFlow,
      },
      {
        name: 'Nutrient Flow (mL)',
        data: nutrientFlow,
      },
      {
        name: 'Stopped',
        data: stopped,
      },
      {
        name: 'Alarmed',
        data: alarmed,
      },
    ];
  };

  const apexAreaChartOptions = (): Object => {
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
      colors: [WATER_COLOR, NUTRIENT_COLOR, '#a7a8ac', '#fa6c89'],
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
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: WATER_COLOR,
            width: 4,
          },
          labels: {
            style: {
              colors: WATER_COLOR,
            },
          },
          title: {
            text: 'Water Flow (L /hour)',
            style: {
              color: WATER_COLOR,
            },
          },
          seriesName: 'Water Flow',
        },

        {
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
          seriesName: 'Nutrient Dosed ',
          opposite: true,
          title: {
            text: 'Nutrient Dosed (mL /hour)',
            style: {
              color: NUTRIENT_COLOR,
            },
          },
        },
        {
          min: 0,
          show: false,
        },
        {
          min: 0,
          show: false,
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
