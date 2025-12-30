import { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';
import { findSupplementColor } from '../../../../helpers';
import { DailyAverageSupplementIntake } from '../../../../types/property/analytics';
import { SUPPLEMENT_NAME_MAPPING } from '../../../../constants/supplementMapping';

export default function usePrepareSupplementIntakePieChartData(
  records?: DailyAverageSupplementIntake[] | []
) {
  const [loading, setLoading] = useState<boolean>(true);
  const [chartSeries, setChartSeries] = useState<number[]>([]);
  const [chartOptions, setChartOptions] = useState<ApexOptions>({});

  useEffect(() => {
    parseGraphData(records);
  }, [records]);

  const parseGraphData = (dataRecords?: DailyAverageSupplementIntake[]) => {
    const labelData: string[] = [];
    const seriesData: number[] = [];
    const colors: string[] = [];

    dataRecords?.forEach((item) => {
      labelData.push(item.supplement_name);
      seriesData.push(item.avg_daily_intake);
      colors.push(
        findSupplementColor(SUPPLEMENT_NAME_MAPPING[item.supplement_name]) ?? ''
      );
    });

    setChartSeries(seriesData);
    setChartOptions(apexAreaChartOptions(labelData, colors));
    setLoading(false);
  };

  const apexAreaChartOptions = (
    labelData: string[],
    colorsData: string[]
  ): ApexOptions => {
    return {
      chart: {
        type: 'pie',
      },
      dataLabels: {
        enabled: true,
      },
      labels: labelData,
      colors: colorsData,
      legend: {
        show: false,
        position: 'bottom',
        horizontalAlign: 'center',
        // verticalAlign: 'middle',
        floating: false,
        fontSize: '10px',
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: (val) => {
            return `${val} L`;
          },
        },
      },
    };
  };

  return {
    loading,
    chartSeries,
    chartOptions,
  };
}
