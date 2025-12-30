import { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';
import { capitalizeFirstLetter, findNutrientColor } from '../../../../helpers';

export default function usePrepareAverageNutrientConsumptionDonutChartData(
  records: Record<string, number>
) {
  const [loading, setLoading] = useState<boolean>(true);
  const [chartSeries, setChartSeries] = useState<number[]>([]);
  const [chartOptions, setChartOptions] = useState<ApexOptions>({});
  const [isNutrientConsumed, setIsNutrientConsumed] = useState(false);

  useEffect(() => {
    parseGraphData(records);
    setIsNutrientConsumed(Object.values(records).every((val) => val !== 0));
  }, [records]);

  const parseGraphData = (dataRecords: Record<string, number>) => {
    const labelData: string[] = [];
    const seriesData: number[] = [];
    const colors: string[] = [];

    Object.keys(dataRecords)?.forEach((item) => {
      labelData.push(capitalizeFirstLetter(item));
      seriesData.push(dataRecords[item]);
      colors.push(findNutrientColor(item) ?? '');
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
        type: 'donut',
      },
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
          },
        },
      },
      dataLabels: {
        enabled: true,
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: (val) => {
            return `${val} g`;
          },
        },
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
        offsetX: 0,
        offsetY: 5,
      },
    };
  };

  return {
    loading,
    chartSeries,
    chartOptions,
    isNutrientConsumed,
  };
}
