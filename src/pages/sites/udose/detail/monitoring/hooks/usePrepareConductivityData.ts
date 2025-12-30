import { useEffect, useState } from 'react';
import moment from 'moment';
import { ApexOptions } from 'apexcharts';
import { UdoseRecordFourHour } from '../../../../../../types/udose/udoseSummary';
import { SiteSetting } from '../../../../../../types/site';

export default function usePrepareConductivityData(
  setting: SiteSetting,
  fourHourlyRecords: UdoseRecordFourHour[]
) {
  const [chartSeries, setChartSeries] = useState<any[]>([]);
  const [chartOptions, setChartOptions] = useState<ApexOptions>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    parseConductivityGraphData(fourHourlyRecords);
  }, [fourHourlyRecords]);

  const parseConductivityGraphData = (data: UdoseRecordFourHour[]) => {
    const highestConductivity: number[] = [];
    const lowestConductivity: number[] = [];
    const messageDate: string[] = [];

    data.forEach((value) => {
      highestConductivity.push(value.highest_conductivity);
      lowestConductivity.push(value.lowest_conductivity);
      messageDate.push(moment.utc(value.message_date).toLocaleString());
    });

    setChartSeries(
      apexAreaChartSeries(highestConductivity, lowestConductivity)
    );
    setChartOptions(
      apexAreaChartOptions(
        messageDate,
        setting?.conductivity_alarm_level,
        setting?.conductivity_skip_level,
        setting?.message_date
      )
    );
    setLoading(false);
  };

  const apexAreaChartSeries = (
    highestConductivity: number[],
    lowestConductivity: number[]
  ) => {
    return [
      {
        name: 'Highest Conductivity',
        data: highestConductivity,
      },
      {
        name: 'Lowest Conductivity',
        data: lowestConductivity,
      },
    ];
  };

  const apexAreaChartOptions = (
    messageDate: string[],
    conductivityAlarmLevel: number,
    conductivitySkipLevel: number,
    settingDate: string
  ): Object => {
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
      labels: messageDate,
      annotations: {
        yaxis: [
          {
            y: conductivityAlarmLevel,
            strokeDashArray: 0,
            borderColor: '#fa6767',
            label: {
              borderColor: '#fa6767',
              style: {
                color: '#fff',
                background: '#fa6767',
              },
              text: `Alarm Level - ${moment(new Date(settingDate)).format(
                'ddd, D MMM YYYY - hh:mm a'
              )}`,
            },
          },
          {
            y: conductivitySkipLevel,
            strokeDashArray: 0,
            borderColor: '#FEB025',
            label: {
              borderColor: '#FEB019',
              style: {
                color: '#fff',
                background: '#FEB019',
              },
              text: `Skip Dose Level - ${moment(new Date(settingDate)).format(
                'ddd, D MMM YYYY - hh:mm a'
              )}`,
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

      yaxis: {
        min: 0,
        max: () =>
          Math.ceil(
            (Math.max(
              ...(fourHourlyRecords?.map((item) => item.highest_conductivity) ??
                []),
              ...(fourHourlyRecords?.map((item) => item.lowest_conductivity) ??
                [])
            ) || 0) / 100
          ) * 100,
        forceNiceScale: true,
        title: {
          text: 'Conductivity Level (µS /m)',
          style: {
            color: '#44badc',
          },
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
