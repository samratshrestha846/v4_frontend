/* eslint-disable no-plusplus */
import { useEffect, useState } from 'react';
import {
  CumulativeRainfallRecord,
  HourlyRainfallRecord,
} from '../../../../../types/ubot';

type Props = {
  cumulativeRainfallRecord?: CumulativeRainfallRecord[];
  hourlyRainfallRecord?: HourlyRainfallRecord[];
};
export default function usecalculateAverageRainfall({
  cumulativeRainfallRecord,
  hourlyRainfallRecord,
}: Props) {
  const [averageCumulativeRainfall, setAverageCumulativeRainfall] = useState(0);
  const [averageHourlyRainfall, setAverageHourlyRainfall] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    calculateAverageRainfall();
  }, [cumulativeRainfallRecord, hourlyRainfallRecord]);

  const calculateAverageRainfall = () => {
    let cumulativeRainfallSum = 0;
    let cumulativeRainfallCount = 0;

    let hounlyRainfallSum = 0;
    let hourlyRainfallCount = 0;

    cumulativeRainfallRecord?.forEach((item) => {
      if (item.rainfall > 0) {
        cumulativeRainfallSum += item.rainfall;
        cumulativeRainfallCount++;
      }
    });

    hourlyRainfallRecord?.forEach((item) => {
      if (item.rainfall > 0) {
        hounlyRainfallSum += item.rainfall;
        hourlyRainfallCount++;
      }
    });

    if (cumulativeRainfallRecord && cumulativeRainfallRecord.length > 0) {
      setAverageCumulativeRainfall(
        Number((cumulativeRainfallSum / cumulativeRainfallCount).toFixed(1))
      );
    }

    if (hourlyRainfallRecord && hourlyRainfallRecord.length > 0) {
      setAverageHourlyRainfall(
        Number((hounlyRainfallSum / hourlyRainfallCount).toFixed(1))
      );
    }

    setLoading(false);
  };

  return { loading, averageCumulativeRainfall, averageHourlyRainfall };
}
