import { useEffect, useState } from 'react';
import { FeatureCollection, Geometry } from 'geojson';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import L from 'leaflet';
import ceresTagAPI from '../../../../../helpers/api/ceresTagAPI';
import { cowStanding } from '../../../../../assets/icons';
import { CeresTagObservationParams } from '../../../../../types/ceresTag/ceresTag';

type GeoJSONData = FeatureCollection<Geometry>;

export default function useCeresTagData(propertyId: number) {
  const [ceresTagActive, setCeresTagActive] = useState<boolean>(false);
  const [ceresTagData, setCeresTagData] = useState<GeoJSONData | null>(null); // This contains the whole data received from API
  const [times, setTimes] = useState<string[]>([]);
  const [timeSliderValue, setTimeSliderValue] = useState(0);
  const [ceresTagId, setCeresTagId] = useState<number | null>(null);
  const [displaySelectedDate, setDisplaySelectedDate] = useState<any>(null);
  const [asOfFrom, setAsOfFrom] = useState<string | null>(
    moment()
      .subtract(30, 'days') // Initially Maximum data will be of 1 month to display
      .startOf('day')
      .utc()
      .format('YYYY-MM-DD hh:mm:ss')
      .toString()
  );
  const [asOfTo, setAsOfTo] = useState<string | null>(null);

  const cowIcon = new L.Icon({
    iconUrl: cowStanding,
    iconSize: [20, 20],
    iconAnchor: [20, 20],
    popupAnchor: [-3, -10],
  });

  const prepareQueryParams = () => {
    const params: CeresTagObservationParams = {
      customer_property_id: propertyId,
    };

    if (ceresTagId) {
      params.ceres_tag_id = ceresTagId;
    }

    if (asOfFrom) {
      params.as_of_date_from = asOfFrom;
    }

    if (asOfTo) {
      params.as_of_date_to = asOfTo;
    }
    return params;
  };

  const fetchCeresTagData = () => {
    const params: CeresTagObservationParams = prepareQueryParams();
    return ceresTagAPI.fetchCeresTagObservationData(params);
  };

  const { data, isError, isFetching, isSuccess } = useQuery({
    queryKey: [
      'fetch-ceres-tag-data',
      ceresTagId,
      asOfFrom,
      asOfTo,
      propertyId,
    ],
    queryFn: fetchCeresTagData,
    refetchOnWindowFocus: false,
    enabled: !!propertyId,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setCeresTagData(data);
      const uniqueTimes: string[] = Array.from(
        new Set(
          data.features.map((feature: any) => feature.properties.datetime)
        )
      );

      setTimes(
        uniqueTimes.sort(
          (a, b) =>
            new Date(a as string).getTime() - new Date(b as string).getTime()
        )
      );

      setTimeSliderValue(uniqueTimes.length - 1);
    }
  }, [data, ceresTagId, isSuccess]);

  return {
    ceresTagActive,
    setCeresTagActive,
    ceresTagData,
    times,
    timeSliderValue,
    setTimeSliderValue,
    cowIcon,
    ceresTagId,
    setCeresTagId,
    asOfFrom,
    setAsOfFrom,
    asOfTo,
    setAsOfTo,
    isError,
    isFetching,
    displaySelectedDate,
    setDisplaySelectedDate,
  };
}
