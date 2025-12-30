import { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';
import { CeresTagPFISummary } from '../../../types/ceresTag/ceresTag';

import {
  ANIMAL_BEHAVIOURS,
  INDEX_0_GRAZING,
  INDEX_1_RESTING_AND_RUMINATING,
  INDEX_2_WALKING,
  INDEX_6_DRINKINGAND_UNCLASSIFIED,
} from '../../../constants/ceresTagConstants';
import { formattedShortDate } from '../../../helpers';
import { ChartSeriesData } from '../../../types/common';

export default function usePreparePFIDailySummaryLineGraphData(
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
    const grazingDurations: number[] = [];
    const restingAndRuminatingDurations: number[] = [];
    const walkingDurations: number[] = [];
    const drinkingAndUnclassifiedDurations: number[] = [];

    const observationDate: string[] = [];

    records?.forEach((value) => {
      grazingDurations.push(Number(value.data[INDEX_0_GRAZING]));
      restingAndRuminatingDurations.push(
        Number(value.data[INDEX_1_RESTING_AND_RUMINATING])
      );
      walkingDurations.push(Number(value.data[INDEX_2_WALKING]));
      drinkingAndUnclassifiedDurations.push(
        Number(value.data[INDEX_6_DRINKINGAND_UNCLASSIFIED])
      );

      observationDate.push(formattedShortDate(value.observation_date));
    });

    setChartSeries(
      apexAreaChartSeries(
        grazingDurations,
        restingAndRuminatingDurations,
        walkingDurations,
        drinkingAndUnclassifiedDurations
      )
    );
    setChartOptions(apexAreaChartOptions(observationDate));
    setLoading(false);
  };

  const apexAreaChartSeries = (
    grazingDurations: number[],
    restingAndRuminatingDurations: number[],
    walkingDurations: number[],
    drinkingAndUnclassifiedDurations: number[]
  ): any[] => {
    return [
      {
        name: ANIMAL_BEHAVIOURS[INDEX_0_GRAZING],
        data: grazingDurations,
      },
      {
        name: ANIMAL_BEHAVIOURS[INDEX_1_RESTING_AND_RUMINATING],
        data: restingAndRuminatingDurations,
      },
      {
        name: ANIMAL_BEHAVIOURS[INDEX_2_WALKING],
        data: walkingDurations,
      },
      {
        name: ANIMAL_BEHAVIOURS[INDEX_6_DRINKINGAND_UNCLASSIFIED],
        data: drinkingAndUnclassifiedDurations,
      },
    ];
  };

  const apexAreaChartOptions = (date: string[]): ApexOptions => {
    return {
      chart: {
        type: 'line',
        zoom: {
          enabled: true,
        },
        toolbar: {
          show: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
        curve: 'smooth',
      },
      colors: ['#008000', '#808080', '#FFBC00', '#44badc'],
      labels: date,
      fill: {
        opacity: [0.25, 1],
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
          title: {
            text: 'Duration (Minutes)',
          },
          seriesName: 'Duration (Minutes)',
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

  return {
    chartOptions,
    chartSeries,
    loading,
  };
}
