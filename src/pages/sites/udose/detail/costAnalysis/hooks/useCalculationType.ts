import { useState } from 'react';
import { DOSE_RATE_CALCULATOR } from '../../../../../../constants/constants';

export default function useCalculationType() {
  const [calculationType, setCalculationType] = useState<string | undefined>(
    DOSE_RATE_CALCULATOR
  );

  return {
    calculationType,
    setCalculationType,
  };
}
