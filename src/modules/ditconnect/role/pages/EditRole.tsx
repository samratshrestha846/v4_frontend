import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { prepareDynamicUrl } from '@uhub/helpers';
import { ROLE_EDIT, ROLE_LIST } from '../constants/constant';
import RoleForm from './RoleForm';
import useReadRole from '../hooks/useReadRole';

const EditRole: React.FC = () => {
  const { id } = useParams();

  const title: string = 'Role';
  const { data, isFetching, isError } = useReadRole(id);

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: ROLE_LIST, active: false },
          {
            label: `Edit ${title}`,
            path: prepareDynamicUrl(ROLE_EDIT, id),
            active: true,
          },
        ]}
        title={`Edit ${title}`}
      />
      <Card>
        <Card.Body>{data && <RoleForm defaultValues={data} />}</Card.Body>
      </Card>
    </>
  );
};

export default EditRole;
