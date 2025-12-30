import React from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '../../../../../components/PageTitle';

import {
  UDOSE_AG_DAILY_MESSAGE_LIST,
  UDOSE_AG_LIST,
  UDOSE_AG_VIEW,
} from '../../../../../constants/path';
import { prepareDynamicUrl } from '../../../../../helpers';
import useReadUdoseAg from '../../../hooks/useReadUdoseAg';
import useFetchUdoseAgMessage from '../hook/useFetchUdoseAgMessage';
import UdoseAgMessageTable from '../../../list/UdoseAgMessageTable';
import ErrorMessage from '../../../../../components/ErrorMessage';
import UdoseAgDailyMessageFilter from '../../../detail/dailyMessages/list/UdoseAgDailyMessageFilter';

const ListUdoseAgDailyMessage: React.FC = () => {
  const { id } = useParams();
  const { data: udoseAgDetail } = useReadUdoseAg();

  const {
    data: udoseAgMessage,
    isFetching: isFetchingMessage,
    isError: isErrorMessage,
    pageNumber,
    handlePageChange,
    duration,
    handleChangeDuration,
  } = useFetchUdoseAgMessage();

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'uDose Ags', path: UDOSE_AG_LIST },
          {
            label: `${udoseAgDetail?.name ?? 'Udose Ag Detail'}`,
            path: prepareDynamicUrl(UDOSE_AG_VIEW, id),
          },
          {
            label: 'Daily Messages',
            path: prepareDynamicUrl(UDOSE_AG_DAILY_MESSAGE_LIST, id),
            active: true,
          },
        ]}
        title="Daily Messages"
      />

      <UdoseAgDailyMessageFilter
        duration={duration}
        handleChangeDuration={handleChangeDuration}
      />

      {isErrorMessage && <ErrorMessage />}

      <UdoseAgMessageTable
        data={udoseAgMessage}
        pageNumber={pageNumber}
        handlePageChange={handlePageChange}
        isFetchingMessage={isFetchingMessage}
      />
    </>
  );
};

export default ListUdoseAgDailyMessage;
