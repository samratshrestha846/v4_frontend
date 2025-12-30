import React from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '../../../../components/PageTitle';
import ReferrerInfo from '../components/ReferrerInfo';
import ReferrerAnalyticsCount from '../components/analytics/ReferrerAnalyticsCount';
import ReferredCustomerList from './referred-customers/list/ReferredCustomerList';
import IncentiveList from './incentives/list/IncentiveList';
import useReadReferrer from '../hooks/useReadReferrer';
import ReferrerPaymentList from './payments/list/ReferrerPaymentList';
import ErrorMessage from '../../../../components/ErrorMessage';

const ViewReferrer: React.FC = () => {
  const { id } = useParams();
  const {
    data: referrer,
    isFetching: isFetchingReferrer,
    isError: isErrorReferrer,
  } = useReadReferrer(Number(id));

  if (isErrorReferrer) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Referrers', path: '/referrers/list', active: false },
          {
            label: referrer
              ? `${referrer?.first_name} ${referrer?.last_name}`
              : 'Referrer Details',
            path: '/referrers/view/:id',
            active: true,
          },
        ]}
        title=" Referrer Details "
      />
      <ReferrerAnalyticsCount
        referrer={referrer}
        isFetchingReferrer={isFetchingReferrer}
      />
      <ReferrerInfo
        referrer={referrer}
        isFetchingReferrer={isFetchingReferrer}
        isErrorReferrer={isErrorReferrer}
      />
      <ReferrerPaymentList />
      <IncentiveList />
      <ReferredCustomerList />
    </>
  );
};

export default ViewReferrer;
