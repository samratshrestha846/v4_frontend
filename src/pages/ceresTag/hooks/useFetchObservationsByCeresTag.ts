import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ceresTagAPI from '../../../helpers/api/ceresTagAPI';
import {
  CeresTagObservationFeatureProperty,
  CeresTagObservationQueryParams,
} from '../../../types/ceresTag/ceresTag';
import { ChartSeriesData } from '../../../types/common';

import { formattedDatetime, formattedYmdDate } from '../../../helpers';

export default function useFetchObservationsByCeresTag() {
  const { id } = useParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [chartSeries, setChartSeries] = useState<ChartSeriesData[]>([]);
  const [chartOptions, setChartOptions] = useState<ApexOptions>({});

  const fetchCeresTagObservations = () => {
    const params: CeresTagObservationQueryParams = {
      ceres_tag_id: id ? Number(id) : undefined,
    };
    return ceresTagAPI.fetchCeresTagObservations(params);
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['ceres-tag-observations', id],
    queryFn: fetchCeresTagObservations,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      const dataa: CeresTagObservationFeatureProperty[] = data?.features?.map(
        (item: any) => item.properties
      );
      const twentyFourHoursData = dataa?.filter(
        (item) =>
          formattedYmdDate(item.datetime) ===
          formattedYmdDate(dataa?.[0]?.datetime)
      );

      parseGraphData(twentyFourHoursData.reverse());
    }
  }, [data]);

  const parseGraphData = (records: CeresTagObservationFeatureProperty[]) => {
    const temperature: number[] = [];

    const observationDate: string[] = [];

    records?.forEach((value) => {
      temperature.push(Number(value.Temperature));

      observationDate.push(formattedDatetime(value.datetime));
    });

    setChartSeries(apexAreaChartSeries(temperature));
    setChartOptions(apexAreaChartOptions(observationDate));
    setLoading(false);
  };

  const apexAreaChartSeries = (temperature: number[]): any[] => {
    return [
      {
        name: 'Temperature',
        data: temperature,
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
      colors: ['#FFBC00'],
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
            text: 'Temperature (Celsius)',
          },
          seriesName: 'Temperature (Celsius)',
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
    data,
    isFetching,
    isFetched,
    isError,
    chartOptions,
    chartSeries,
    loading,
  };
}
