import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import horticulture from '../../../../helpers/api/horticulture';
import { ListCropLifeCycleParams } from '../../../../types/horticulture/horticulture';

export default function useFetchCropCycleList() {
  const [pageNumber, setPageNumber] = useState(0);
  const [crop, setCrop] = useState<number>();

  const prepareQueryParameters = () => {
    const params: ListCropLifeCycleParams = { page: pageNumber + 1 };

    if (crop) {
      params.crop_id = Number(crop);
    }

    return params;
  };

  const fetchCropCycleList = () => {
    const params = prepareQueryParameters();
    return horticulture.getCropCycleList(params);
  };

  const handlePageChange = (e: any) => {
    setPageNumber(e.selected);
  };

  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ['fetch-crop-cycle-list', pageNumber, crop],
    queryFn: fetchCropCycleList,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isFetching,
    isError,
    refetch,
    pageNumber,
    handlePageChange,
    crop,
    setCrop,
  };
}
