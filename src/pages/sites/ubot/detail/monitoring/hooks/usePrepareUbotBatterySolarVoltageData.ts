import { useEffect, useState } from 'react';
import moment from 'moment';
import { ApexOptions } from 'apexcharts';
import { UbotSummaryRecord } from '../../../../../../types/ubot';
import { formattedDatetime } from '../../../../../../helpers';

export default function usePrepareUbotBatterySolarVoltageData(
  records?: UbotSummaryRecord[]
) {
  const [chartSeries, setChartSeries] = useState<any[]>([]);
  const [chartOptions, setChartOptions] = useState<ApexOptions>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    parseGraphData(records);
  }, [records]);

  const parseGraphData = (data?: UbotSummaryRecord[]) => {
    const batteryArray: number[] = [];
    const solarArray: number[] = [];
    const voltageDatesDateTimeArray: string[] = [];

    data?.forEach((value) => {
      batteryArray.push(value.battery_voltage);
      solarArray.push(value.solar_voltage);
      voltageDatesDateTimeArray.push(formattedDatetime(value.message_date));
    });
    setChartSeries(series(batteryArray, solarArray));
    setChartOptions(apexAreaChartOptions(voltageDatesDateTimeArray));
    setLoading(false);
  };

  const series = (battery: number[], solar: number[]) => {
    return [
      {
        name: 'Battery (V)',
        data: battery,
      },
      {
        name: 'Solar (V)',
        data: solar,
      },
    ];
  };

  const apexAreaChartOptions = (voltageDate: string[]): Object => {
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
      labels: voltageDate,
      colors: ['#5d91f8', '#fff002'],
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
          max: 20,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#44badc',
            width: 4,
          },
          labels: {
            style: {
              colors: '#44badc',
            },
          },
          title: {
            text: 'Battery  Voltage (V)',
            style: {
              color: '#44badc',
            },
          },
          seriesName: 'Voltage',
        },

        {
          min: 0,
          max: 20,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#FFBC00',
            width: 4,
          },
          labels: {
            style: {
              colors: '#FFBC00',
            },
          },
          seriesName: 'Nutrient Dosed ',
          opposite: true,
          title: {
            text: 'Solar Voltage (V)',
            style: {
              color: '#FFBC00',
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
