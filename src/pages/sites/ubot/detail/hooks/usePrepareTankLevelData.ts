import { useEffect, useState } from 'react';
import { TankLevelOption } from '../../../../../types/ubot';
import tankLevelOptions from '../../constants';

export default function usePrepareTankLevelData(tankLevel?: number) {
  const [tankLevels, setTankLevels] = useState<TankLevelOption[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (tankLevel !== undefined) {
      findTankLevel(tankLevel);
    }
  }, [tankLevel]);

  const findTankLevel = (currentTankLevel: number) => {
    const filteredTankLevels: TankLevelOption[] = [];
    tankLevelOptions.forEach((element) => {
      if (element.level - 10 < currentTankLevel) {
        if (currentTankLevel - (element.level - 10) < 10) {
          filteredTankLevels.push({ ...element, level: currentTankLevel });
        } else {
          filteredTankLevels.push(element);
        }
      }
    });
    setTankLevels(filteredTankLevels);
    setLoading(false);
  };
  return { tankLevels, loading };
}
