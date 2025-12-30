import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { prepareDynamicUrl } from '@uhub/helpers';
import useReadRole from '../hooks/useReadRole';
import { ROLE_LIST, ROLE_VIEW } from '../constants/constant';
import RoleInfo from './RoleInfo';
import ListPermission from './ListPermission';

const ViewRole: React.FC = () => {
  const { id } = useParams();
  const title: string = 'Role';

  const { data, isFetching, isError } = useReadRole(id);

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}s`, path: ROLE_LIST, active: false },
          {
            label: data?.name ?? `View ${title}`,
            path: prepareDynamicUrl(ROLE_VIEW, id),
            active: true,
          },
        ]}
        title={`${title} Details`}
      />
      <Card>
        <Card.Body>{data && <RoleInfo role={data} />}</Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <ListPermission permissions={data.permissions} readOnly />
        </Card.Body>
      </Card>
    </>
  );
};

export default ViewRole;
