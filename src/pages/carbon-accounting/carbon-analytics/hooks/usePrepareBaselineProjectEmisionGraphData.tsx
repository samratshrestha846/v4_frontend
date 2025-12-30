import { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';
import { CarbonEmissionReductionSummary } from '../../../../types/carbon-accounting/carbonAccounting';
import { CC_DURATION_MONTH_OPTIONS } from '../../../../constants/durationOptions';

type ChartSeriesData = {
  name: string;
  data: number[];
};

export default function usePrepareBaselineProjectEmisionGraphData(
  summary: CarbonEmissionReductionSummary,
  duration: string
) {
  const [loading, setLoading] = useState<boolean>(true);
  const [chartSeries, setChartSeries] = useState<ChartSeriesData[]>([]);
  const [chartOptions, setChartOptions] = useState<ApexOptions>({});

  useEffect(() => {
    if (summary) {
      parseGraphData();
    }
  }, [summary]);

  const parseGraphData = () => {
    const baselinEmission: number[] = [];
    const projectEmission: number[] = [];
    const label: string[] = [CC_DURATION_MONTH_OPTIONS[duration].label];
    baselinEmission.push(summary.total_baseline_emission ?? 0);
    projectEmission.push(summary.total_project_emission ?? 0);
    setChartSeries(apexAreaChartSeries(baselinEmission, projectEmission));
    setChartOptions(apexAreaChartOptions(label));
    setLoading(false);
  };

  const findMax = () => {
    return Math.ceil(
      (Math.max(
        ...[
          summary.total_baseline_emission ?? 0,
          summary.total_project_emission ?? 0,
        ]
      ) /
        10) *
        10
    );
  };

  const apexAreaChartSeries = (
    baselinEmission: number[],
    projectEmission: number[]
  ): ChartSeriesData[] => {
    return [
      {
        name: 'Baseline Emission',
        data: baselinEmission,
      },
      {
        name: 'Project Emission',
        data: projectEmission,
      },
    ];
  };

  const apexAreaChartOptions = (graphLabels?: string[]): Object => {
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
      colors: ['#39afd1', '#0acf97'],
      labels: graphLabels,
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
          max: findMax,
          decimalsInFloat: 2,
          forceNiceScale: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            width: 4,
            color: '#39afd1',
          },
          title: {
            text: 'Baseline Emission',
          },
          seriesName: 'Baseline Emission',
        },

        {
          min: 0,
          max: findMax,
          decimalsInFloat: 2,
          forceNiceScale: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            width: 4,
            color: '#0acf97',
          },
          seriesName: 'Project Emission',
          opposite: true,
          title: {
            text: 'Project Emission',
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
