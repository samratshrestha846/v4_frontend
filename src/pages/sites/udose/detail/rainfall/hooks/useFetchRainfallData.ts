import moment from 'moment';
import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ApexOptions } from 'apexcharts';
import { useQuery } from '@tanstack/react-query';
import udoseRainfall from '../../../../../../helpers/api/udose/udoseRainfall';
import {
  RainfallFilterParams,
  RainfallRecord,
} from '../../../../../../types/udose/udoseRainfall';
import { formatGraphDate } from '../../../../../../helpers';

type ChartSeriesData = {
  name: string;
  data: number[];
};

export default function useFetchRainfallData() {
  const { id } = useParams();
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;
  const [chartSeries, setChartSeries] = useState<ChartSeriesData[]>([]);
  const [chartOptions, setChartOptions] = useState<ApexOptions>({});
  const [loading, setLoading] = useState<boolean>(true);

  const getUdoseRecordSummaryBySiteId = () => {
    const params: RainfallFilterParams = {
      date_from: moment(startDate).format('YYYY-MM-DD'),
      date_to: null,
    };

    if (startDate) {
      params.date_to = endDate
        ? moment(endDate).endOf('day').format('YYYY-MM-DD')
        : moment().format('YYYY-MM-DD');
    }

    return udoseRainfall.getUdoseRainfall(
      id,
      params.date_from && params.date_to ? params : null
    );
  };

  const { data, isFetching, isError, isSuccess, refetch } = useQuery({
    queryKey: ['udose-rainfall', id],
    queryFn: getUdoseRecordSummaryBySiteId,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  useEffect(() => {
    if (isSuccess) {
      parseGraphData(data.records);
    }
  }, [data]);

  const parseGraphData = async (rainfallData: RainfallRecord[]) => {
    const rainfallArray: number[] = [];
    const dateTimeArray: string[] = [];

    rainfallData.forEach((value) => {
      rainfallArray.push(value.rainfall);
      dateTimeArray.push(formatGraphDate(value.message_date));
    });

    setChartSeries(apexAreaChartSeries(rainfallArray));
    setChartOptions(apexAreaChartOptions(dateTimeArray));
    setLoading(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    refetch();
  };

  const apexAreaChartSeries = (rainfallArray: number[]): ChartSeriesData[] => {
    return [
      {
        name: 'Rainfall (mm)',
        data: rainfallArray,
      },
    ];
  };

  const apexAreaChartOptions = (dateTimeArray: string[]): ApexOptions => {
    return {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: true,
      },
      labels: dateTimeArray,
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'Rainfall Data (mm)',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
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
    };
  };
  return {
    data,
    isFetching,
    isError,
    isSuccess,
    setDateRange,
    startDate,
    endDate,
    handleSubmit,
    chartOptions,
    chartSeries,
    loading,
  };
}
