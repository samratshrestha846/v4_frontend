import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
// import chroma from 'chroma-js';
// import GeoRasterLayer from 'georaster-layer-for-leaflet';
import { ImageOverlay } from 'leaflet';
import rainfall from '../../../helpers/api/rainfall';

// const parseGeoraster = require('georaster');

export default function useRainfallData(
  rainfallHide: boolean,
  customerPropertyId?: string
) {
  const [rainfallRange, setRainfallRange] = useState<[number, number]>([0, 0]);
  const [rainfallLayer] = useState<ImageOverlay | null>(null); // removed set method
  const [georasterData] = useState(null); // removed set method
  const [fetchRasterError] = useState<boolean>(false); // removed set method
  const [fetchingRaster, setFetchingRaster] = useState<boolean>(false);

  // Calculating date range from the dropdown value
  const getDateRange = (value: number) => {
    const currentDate = new Date();
    let targetMonth = currentDate.getMonth() - value + 1;
    let targetYear = currentDate.getFullYear();
    if (targetMonth <= 0) {
      targetMonth += 12;
      targetYear -= 1;
    }
    const firstDayOfMonth = new Date(targetYear, targetMonth - 1, 1);
    const lastDayOfMonth = new Date(targetYear, targetMonth, 0);
    const startDate = `${firstDayOfMonth.getFullYear()}-${(
      firstDayOfMonth.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-01`;
    const endDate = `${lastDayOfMonth.getFullYear()}-${(
      lastDayOfMonth.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${lastDayOfMonth.getDate()}`;
    return `${startDate}-${endDate}`;
  };

  const [dateRange, setDateRange] = useState(getDateRange(1)); // set initial date range

  const param = {
    file_path: `rainfall-raster-images/rainfall-raster-${customerPropertyId}-${dateRange}.tif`,
  };

  const fetchRainfallData = () => {
    return rainfall.fetchRainfallRasterData(param);
  };

  const { isError, isFetching, isSuccess } = useQuery({
    queryKey: ['fetch-rainfall-data', param, dateRange],
    queryFn: fetchRainfallData,
    refetchOnWindowFocus: false,
    enabled: !!customerPropertyId,
  });

  // useEffect(() => {
  //   if (data && !rainfallHide) {
  //     setFetchingRaster(true);
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch(data.url);

  //         if (!response.ok) {
  //           throw new Error();
  //         }
  //         setFetchRasterError(false);
  //         const arrayBuffer = await response.arrayBuffer();
  //         const georaster = await parseGeoraster(arrayBuffer);
  //         setGeorasterData(georaster);
  //         const minimum = georaster.mins[0];
  //         const maximum = georaster.maxs[0];
  //         const scale = chroma
  //           .scale('YlGnBu')
  //           .domain([minimum, maximum], 5, 'quantiles');

  //         setRainfallRange([minimum, maximum]);

  //         const georasterLayer = new GeoRasterLayer({
  //           georaster,
  //           opacity: 0.8,
  //           pixelValuesToColorFn: (values) => {
  //             const value = values[0];
  //             if (value <= 0) return 'rgba(255, 255, 255, 0)';
  //             return scale(value).hex();
  //           },
  //         });

  //         setRainfallLayer(georasterLayer);
  //       } catch (error) {
  //         setGeorasterData(null);
  //         setRainfallLayer(null);
  //         setFetchRasterError(true);
  //         setFetchingRaster(false);
  //       }
  //     };

  //     fetchData();
  //   }
  // }, [data, rainfallHide]);

  return {
    isError,
    isFetching,
    isSuccess,
    setDateRange,
    getDateRange,
    rainfallRange,
    setRainfallRange,
    fetchRasterError,
    fetchingRaster,
    setFetchingRaster,
    rainfallLayer,
    georasterData,
  };
}
