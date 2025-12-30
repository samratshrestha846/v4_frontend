import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { prepareDynamicUrl } from '@uhub/helpers';
import useReadActivityLog from '../hooks/useReadActivityLog';
import { ACTIVITY_LOG_LIST, ACTIVITY_LOG_VIEW } from '../constants/constant';
import ActivityLogInfo from './ActivityLogInfo';

const ViewActivityLog: React.FC = () => {
  const { id } = useParams();
  const title: string = 'Activity Log';

  const { data, isFetching, isError } = useReadActivityLog(id);

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}s`, path: ACTIVITY_LOG_LIST, active: false },
          {
            label: `View ${title}`,
            path: prepareDynamicUrl(ACTIVITY_LOG_VIEW, id),
            active: true,
          },
        ]}
        title={`${title} Details`}
      />
      <Card>
        <Card.Body>{data && <ActivityLogInfo activityLog={data} />}</Card.Body>
      </Card>
    </>
  );
};

export default ViewActivityLog;
