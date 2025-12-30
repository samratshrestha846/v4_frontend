/* eslint-disable no-plusplus */
import { useEffect, useState } from 'react';
import { UdoseRecordTwentyFourHour } from '../../../../../types/udose/udoseSummary';
import { DIGIT_AFTER_DECIMAL } from '../../../../../constants/constants';

export default function useCalculateAverageFlow(
  flowRecords?: UdoseRecordTwentyFourHour[]
) {
  const [loading, setLoading] = useState(false);
  const [averageWaterFlow, setAverageWaterFlow] = useState(0);
  const [averageNutrientFlow, setAverageNutrientFlow] = useState(0);

  useEffect(() => {
    setLoading(true);
    if (flowRecords) {
      calculateAverage(flowRecords);
    }
  }, [flowRecords]);

  const calculateAverage = (records: UdoseRecordTwentyFourHour[]) => {
    let averagegWater = 0;
    let averageNutrient = 0;
    let waterFlowCount = 0;
    let nutrientFlowCount = 0;

    records?.forEach((value) => {
      if (value.water_flow > 0) {
        averagegWater += value.water_flow;
        waterFlowCount++;
      }

      if (value.nutrient_flow > 0) {
        averageNutrient += value.nutrient_flow / 1000;
        nutrientFlowCount++;
      }
    });

    if (waterFlowCount > 0) {
      averagegWater = Number(
        (averagegWater / waterFlowCount).toFixed(DIGIT_AFTER_DECIMAL)
      );
    }

    if (nutrientFlowCount > 0) {
      averageNutrient = Number(
        (averageNutrient / nutrientFlowCount).toFixed(DIGIT_AFTER_DECIMAL)
      );
    }

    setAverageWaterFlow(averagegWater);
    setAverageNutrientFlow(averageNutrient);
    setLoading(false);
  };

  return { loading, averageWaterFlow, averageNutrientFlow };
}
