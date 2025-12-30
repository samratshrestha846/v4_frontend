import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ApexOptions } from 'apexcharts';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { DURATION_LAST_14_DAYS } from '../../../../constants/durationOptions';
import twentyFourHourUsage from '../../../../helpers/api/udose/twentyFourHourUsage';
import { formatGraphDate } from '../../../../helpers';
import initialStoreState from '../../../../types/redux/store-type';
import { DurationQueryFilterStartEndParams } from '../../../../types/common';
import { UdoseRecordTwentyFourHour } from '../../../../types/udose/udoseSummary';
import filterByFromToDateQueryParams from '../../../../helpers/filterHelper';
import { NUTRIENT_COLOR, WATER_COLOR } from '../../../../constants/constants';

type ChartSeriesData = {
  name: string;
  data: number[];
};

export default function usePrepareTwentyFourHourGraphData() {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [chartSeries, setChartSeries] = useState<ChartSeriesData[]>([]);
  const [chartOptions, setChartOptions] = useState<ApexOptions>({});

  const [duration, setDuration] = useState<string>(DURATION_LAST_14_DAYS);

  const stateSite = useSelector((state: initialStoreState) => state.Site);
  const { siteDetail } = stateSite;

  const getSiteTwentyFourHourUsage = () => {
    const { as_of_date_from: fromDate, as_of_date_to: toDate } =
      filterByFromToDateQueryParams(duration);
    const params: DurationQueryFilterStartEndParams = {
      start_date: moment(fromDate).format('YYYY-MM-DD'),
      end_date: moment(toDate).format('YYYY-MM-DD'),
    };
    return twentyFourHourUsage.getSiteTwentyFourHourUsage(id, params);
  };

  const { data, isFetching, isError } = useQuery({
    queryKey: ['twenty-four-hour-usage', duration, id],
    queryFn: getSiteTwentyFourHourUsage,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      parseGraphData(data);
    }
  }, [data]);

  const parseGraphData = (records: UdoseRecordTwentyFourHour[]) => {
    const waterFlow: number[] = [];
    const nutrientFlow: number[] = [];
    const date: string[] = [];

    records?.forEach((value) => {
      waterFlow.push(value.water_flow);
      nutrientFlow.push(value.nutrient_flow / 1000);
      date.push(formatGraphDate(value.message_date));
    });

    setChartSeries(apexAreaChartSeries(waterFlow, nutrientFlow));
    setChartOptions(apexAreaChartOptions(date));
    setLoading(false);
  };

  const handleChangeDuration = (selected: any) => {
    setDuration(selected.value);
  };

  const apexAreaChartSeries = (
    waterFlow: number[],
    nutrientFlow: number[]
  ): ChartSeriesData[] => {
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

  const apexAreaChartOptions = (messageDate: string[]): ApexOptions => {
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
      labels: messageDate,
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
          seriesName: 'Nutrine Flow',
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
  return {
    data,
    loading,
    chartSeries,
    chartOptions,
    duration,
    handleChangeDuration,
    isFetching,
    isError,
    siteDetail,
  };
}
