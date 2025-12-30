import React from 'react';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { prepareDynamicUrl } from '@uhub/helpers';
import { can } from '@uhub/helpers/checkPermission';
import { Button } from 'react-bootstrap';
import useReadPolicy from '../hooks/useReadPolicy';
import { NOTIFY_POLICY, POLICY_LIST, POLICY_VIEW } from '../constants/constant';
import PolicyInfo from './PolicyInfo';
import useNotifyPolicy from '../hooks/useNotifyPolicy';

const ViewPolicy: React.FC = () => {
  const { id } = useParams();
  const title: string = 'Policy';
  const canNotify = can(NOTIFY_POLICY);

  const { data, isFetching, isError } = useReadPolicy(id);

  const { onSubmit } = useNotifyPolicy(Number(id));

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}s`, path: POLICY_LIST, active: false },
          {
            label: `${data.title}`,
            path: prepareDynamicUrl(POLICY_VIEW, id),
            active: true,
          },
        ]}
        title={`${title} Details`}
      />

      {canNotify && (
        <div className="d-flex justify-content-end mb-2">
          <Button onClick={onSubmit} className="icon-button">
            <i className="bx bx-bell" />
          </Button>
        </div>
      )}

      {data && <PolicyInfo policy={data} />}
    </>
  );
};

export default ViewPolicy;
