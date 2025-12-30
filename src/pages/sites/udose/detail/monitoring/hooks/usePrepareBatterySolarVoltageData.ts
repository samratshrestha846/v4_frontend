import { useEffect, useState } from 'react';
import moment from 'moment';
import { ApexOptions } from 'apexcharts';
import { UdoseHealth } from '../../../../../../types/udose/udoseSummary';
import {
  BATTERY_VOLTAGE_COLOR,
  SOLOR_VOLTAGE_COLOR,
} from '../../../../../../constants/constants';

export default function usePrepareBatterySolarVoltageData(
  healthRecords: UdoseHealth[]
) {
  const [chartSeries, setChartSeries] = useState<any[]>([]);
  const [chartOptions, setChartOptions] = useState<ApexOptions>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    parseGraphData(healthRecords);
  }, [healthRecords]);

  const parseGraphData = (data: UdoseHealth[]) => {
    const batteryArray: number[] = [];
    const solarArray: number[] = [];
    const voltageDatesDateTimeArray: string[] = [];

    data?.forEach((value) => {
      batteryArray.push(value.battery_voltage);
      solarArray.push(value.solar_voltage);
      voltageDatesDateTimeArray.push(
        moment.utc(value.message_date).toLocaleString()
      );
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
      colors: [BATTERY_VOLTAGE_COLOR, SOLOR_VOLTAGE_COLOR],
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
            color: BATTERY_VOLTAGE_COLOR,
            width: 4,
          },
          labels: {
            style: {
              colors: BATTERY_VOLTAGE_COLOR,
            },
          },
          title: {
            text: 'Battery  Voltage (V)',
            style: {
              color: BATTERY_VOLTAGE_COLOR,
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
            color: SOLOR_VOLTAGE_COLOR,
            width: 4,
          },
          labels: {
            style: {
              colors: SOLOR_VOLTAGE_COLOR,
            },
          },
          seriesName: 'Voltage',
          opposite: true,
          title: {
            text: 'Solar Voltage (V)',
            style: {
              color: SOLOR_VOLTAGE_COLOR,
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
