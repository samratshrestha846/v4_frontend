import { useEffect, useState } from 'react';
import useReadPaddock from '../../../hooks/useReadPaddock';

export default function usePreparePaddockViewData(id?: number) {
  const [numberOfBlocks, setNumberOfBlocks] = useState(0);

  const { data: paddock, isFetching, isError } = useReadPaddock(id);

  useEffect(() => {
    if (paddock) {
      setNumberOfBlocks(paddock.blocks_count);
    }
  }, [paddock]);

  return { paddock, isError, isFetching, numberOfBlocks, setNumberOfBlocks };
}
