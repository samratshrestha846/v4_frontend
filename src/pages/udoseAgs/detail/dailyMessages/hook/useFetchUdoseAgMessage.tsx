import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import udoseAgs from '../../../../../helpers/api/udoseAgs';
import { getLocalStorageData } from '../../../../../helpers';
import { UdoseAgMessageParams } from '../../../../../types/udoseAgs/udoseAgs';
import filterByFromToDateQueryParams from '../../../../../helpers/filterHelper';
import { LabelValueDropdown } from '../../../../../types/common';

const useFetchUdoseAgMessage = () => {
  const { id } = useParams();
  const [duration, setDuration] = useState<string | null>(null);

  const handleChangeDuration = (selected: LabelValueDropdown) => {
    setDuration(selected === null ? null : selected.value);
  };

  const localStorageData = getLocalStorageData('uDoseAgsMessageParameters');

  const [pageNumber, setPageNumber] = useState(
    localStorageData.pageNumber || 0
  );

  const prepareQueryParameters = () => {
    const params: UdoseAgMessageParams = {
      page: pageNumber + 1,
    };

    if (duration) {
      const durationParam = filterByFromToDateQueryParams(duration);

      params.from_date = durationParam.as_of_date_from;
      params.to_date = durationParam.as_of_date_to;
    }
    return params;
  };

  const fetchUdoseAgMessage = () => {
    const params = prepareQueryParameters();
    return udoseAgs.fetchUdoseAgMessage(id, params);
  };

  const handlePageChange = (e: any) => {
    setPageNumber(e.selected);
  };

  const { data, isFetching, isError } = useQuery({
    queryKey: ['fetch-udose-ag-message', id, pageNumber, duration],
    queryFn: fetchUdoseAgMessage,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  return {
    data,
    isFetching,
    isError,
    pageNumber,
    handlePageChange,
    duration,
    handleChangeDuration,
  };
};

export default useFetchUdoseAgMessage;
