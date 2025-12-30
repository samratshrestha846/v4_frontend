import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import { capitalizeFirstLetter } from '../../../helpers';
import { NUTRIENT_COLOR_CODE } from '../../../constants/Supplements';

export default function usePreparePieChartData(
  breakdownData?: Record<string, number>
) {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<ApexOptions>({});
  const [series, setSeries] = useState<any>([]);

  useEffect(() => {
    setLoading(true);
    prepareChartData(breakdownData);
  }, [breakdownData]);

  const prepareChartData = (breakdown?: Record<string, number>) => {
    const seriesData: number[] = [];
    const labelData: string[] = [];
    const nutrientColors: string[] = [];

    if (breakdown) {
      const breakdownKeys: string[] = Object.keys(breakdown);
      breakdownKeys?.forEach((item) => {
        labelData.push(capitalizeFirstLetter(item));
        seriesData.push(breakdown[item]);
        nutrientColors.push(NUTRIENT_COLOR_CODE[item]);
      });
    }
    setSeries(seriesData);
    setOptions({
      chart: {
        type: 'pie',
      },
      dataLabels: {
        enabled: true,
      },
      labels: labelData,
      colors: nutrientColors,
      legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
        // verticalAlign: 'middle',
        floating: false,
        fontSize: '10px',
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: (val: any) => {
            return `${val} g`;
          },
        },
      },
    });
    setLoading(false);
  };

  return { loading, series, options };
}
