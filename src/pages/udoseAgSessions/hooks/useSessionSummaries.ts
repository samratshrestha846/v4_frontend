import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import udoseAgs from '../../../helpers/api/udoseAgs';
import { UdoseAgSessionSummariesParams } from '../../../types/udoseAgs/udoseAgs';
import { LabelValueDropdown } from '../../../types/common';
import filterByFromToDateQueryParams from '../../../helpers/filterHelper';
import { formattedShortDate } from '../../../helpers';

export default function useSessionSummaries() {
  const { id } = useParams();

  const [duration, setDuration] = useState<string>();
  const [pageNumber, setPageNumber] = useState(0);

  const [noDateMessageInSelectedDateRage, setNoDateMessageInSelectedDateRage] =
    useState<string>();

  const handleChangeDuration = (selected: LabelValueDropdown) => {
    setDuration(selected ? selected.value : undefined);

    if (selected) {
      const { as_of_date_from: dateFrom, as_of_date_to: dateTo } =
        filterByFromToDateQueryParams(selected.value);
      setNoDateMessageInSelectedDateRage(
        `No fertigation sessions found between ${formattedShortDate(dateFrom)} and ${formattedShortDate(dateTo)}.`
      );
    }
  };

  const prepareQueryParameters = () => {
    const params: UdoseAgSessionSummariesParams = { page: pageNumber + 1 };

    if (duration) {
      const durationParam = filterByFromToDateQueryParams(duration);

      params.from_date = durationParam.as_of_date_from;
      params.to_date = durationParam.as_of_date_to;
    }

    return params;
  };

  const handlePageChange = (e: any) => {
    setPageNumber(e.selected);
  };

  const getUdoseAgSessionSummaries = () => {
    const params = prepareQueryParameters();
    return udoseAgs.udoseAgSessionSummaries(id, params);
  };

  const { data, isFetching, isFetched, isError, refetch } = useQuery({
    queryKey: ['udose-ag-session-summaries', pageNumber, duration],
    queryFn: getUdoseAgSessionSummaries,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
    pageNumber,
    handlePageChange,
    duration,
    handleChangeDuration,
    refetch,
    noDateMessageInSelectedDateRage,
  };
}
