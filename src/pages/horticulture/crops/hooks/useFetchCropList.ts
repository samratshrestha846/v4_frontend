import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import horticulture from '../../../../helpers/api/horticulture';
import { ListCropsParams } from '../../../../types/horticulture/horticulture';

export default function useFetchCropList() {
  const [pageNumber, setPageNumber] = useState(0);

  const prepareQueryParameters = () => {
    const params: ListCropsParams = { page: pageNumber + 1 };
    return params;
  };

  const fetchCropList = () => {
    const params = prepareQueryParameters();
    return horticulture.fetchCrops(params);
  };

  const handlePageChange = (e: any) => {
    setPageNumber(e.selected);
  };

  const { data, isFetching, isError } = useQuery({
    queryKey: ['fetch-crop-list', pageNumber],
    queryFn: fetchCropList,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isFetching,
    isError,
    pageNumber,
    handlePageChange,
  };
}
