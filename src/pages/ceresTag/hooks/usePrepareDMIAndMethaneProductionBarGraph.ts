import { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';
import { CeresTagPFISummary } from '../../../types/ceresTag/ceresTag';

import {
  INDEX_7_DRY_MATTER_INTAKE,
  INDEX_8_METHANE_PRODUCTION,
} from '../../../constants/ceresTagConstants';
import { formattedShortDate } from '../../../helpers';
import { ChartSeriesData } from '../../../types/common';

export default function usePrepareDMIAndMethaneProductionBarGraph(
  data?: CeresTagPFISummary[]
) {
  const [loading, setLoading] = useState<boolean>(true);
  const [chartSeries, setChartSeries] = useState<ChartSeriesData[]>([]);
  const [chartOptions, setChartOptions] = useState<ApexOptions>({});

  useEffect(() => {
    if (data) {
      parseGraphData(data);
    }
  }, [data]);

  const parseGraphData = (records: CeresTagPFISummary[]) => {
    const dryMatterIntakeData: number[] = [];
    const methaneProductionData: number[] = [];

    const observationDate: string[] = [];

    records?.forEach((value) => {
      dryMatterIntakeData.push(Number(value.data[INDEX_7_DRY_MATTER_INTAKE]));

      methaneProductionData.push(
        Number(value.data[INDEX_8_METHANE_PRODUCTION])
      );

      observationDate.push(formattedShortDate(value.observation_date));
    });

    setChartSeries(
      apexAreaChartSeries(dryMatterIntakeData, methaneProductionData)
    );
    setChartOptions(apexAreaChartOptions(observationDate));
    setLoading(false);
  };

  const apexAreaChartSeries = (
    dryMatterIntakeData: number[],
    methaneProductionData: number[]
  ): any[] => {
    return [
      {
        name: 'Dry Matter Consumed (Kg)',
        data: dryMatterIntakeData,
      },

      {
        name: 'Methane Emitted (g)',
        data: methaneProductionData,
      },
    ];
  };

  const apexAreaChartOptions = (observationDatetime: string[]): ApexOptions => {
    return {
      chart: {
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 0,
        curve: 'smooth',
      },
      colors: ['#ffd766', '#c3e1c3'],
      labels: observationDatetime,
      fill: {
        opacity: [1, 1],
        gradient: {
          inverseColors: false,
          shade: 'light',
          stops: [0, 100, 100, 100],
        },
      },
      xaxis: {
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: true,
        },

        tooltip: {
          enabled: true,
        },
      },
      yaxis: [
        {
          min: 0,
          forceNiceScale: true,
          decimalsInFloat: 2,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            width: 4,
            color: '#ffd766',
          },
          title: {
            text: 'Dry Matter Consumed (Kg)',
          },
          seriesName: 'Dry Matter Consumed (Kg)',
        },

        {
          min: 0,
          forceNiceScale: true,
          decimalsInFloat: 2,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            width: 4,
            color: '#c3e1c3',
          },
          opposite: true,
          title: {
            text: 'Methane Emitted (g)',
          },
          seriesName: 'Methane Emitted (g)',
        },
      ],
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
    chartOptions,
    chartSeries,
    loading,
  };
}
