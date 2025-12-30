import { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';
import { formatGraphDate } from '../../../../../../helpers';
import { SupplementFeedAnalysisRecord } from '../../../../../../types/udose/supplementFeedAnalysis';
import {
  NUTRIENT_COLOR,
  NUTRIENT_TARGET_DOSE_COLOR,
  WATER_COLOR,
} from '../../../../../../constants/constants';

type DataColumn = {
  x: string;
  y: number;
  goals?: [
    { name: string; value: number; strokeHeight: number; strokeColor: string },
  ];
};

type SeriesData = {
  name: string;
  data: DataColumn[];
};

export default function usePrepareWaterNutrientFlowData(
  records: SupplementFeedAnalysisRecord[]
) {
  const [loading, setLoading] = useState<boolean>(true);
  const [chartSeries, setChartSeries] = useState<SeriesData[]>([]);
  const [chartOptions, setChartOptions] = useState<ApexOptions>({});

  useEffect(() => {
    parseGraphData(records);
  }, []);

  const parseGraphData = (recordsData: SupplementFeedAnalysisRecord[]) => {
    const waterFlow: DataColumn[] = [];
    const nutrientFlow: DataColumn[] = [];
    const labels: string[] = [];

    recordsData?.forEach((value) => {
      waterFlow.push({
        x: formatGraphDate(value.message_date),
        y: parseFloat(value.water_flow.toFixed(2)),
      });

      const nutrientFlowWithGoals: DataColumn = {
        x: formatGraphDate(value.message_date),
        y: parseFloat((value.nutrient_flow / 1000).toFixed(2)),
        goals: [
          {
            name: 'Expected',
            value: parseFloat(
              (
                ((value.water_flow / value.udose_record_setting.trigger_point) *
                  value.udose_record_setting.target_dose) /
                1000
              ).toFixed(2)
            ),
            strokeHeight: 2,
            strokeColor: NUTRIENT_TARGET_DOSE_COLOR,
          },
        ],
      };
      nutrientFlow.push(nutrientFlowWithGoals);
      labels.push(formatGraphDate(value.message_date));
    });

    setChartSeries(apexAreaChartSeries(waterFlow, nutrientFlow));
    setChartOptions(apexAreaChartOptions(labels));
    setLoading(false);
  };

  const apexAreaChartSeries = (
    waterFlow: DataColumn[],
    nutrientFlow: DataColumn[]
  ): SeriesData[] => {
    return [
      {
        name: 'Water Flow (L)',
        data: waterFlow,
      },
      {
        name: 'Nutrient Flow (L)',
        data: nutrientFlow,
      },
    ];
  };

  const apexAreaChartOptions = (graphLabels: string[]): Object => {
    return {
      chart: {
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
        curve: 'smooth',
      },
      colors: [WATER_COLOR, NUTRIENT_COLOR],
      labels: graphLabels,
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
        title: {
          text: 'Date',
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
            color: WATER_COLOR,
          },
          title: {
            text: 'Water Flow (L)',
          },
          seriesName: 'Water Flow',
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
            color: NUTRIENT_COLOR,
          },
          seriesName: 'Nutrient Flow',
          opposite: true,
          title: {
            text: 'Nutrient Flow (L)',
          },
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

  return { loading, chartSeries, chartOptions };
}
