import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { ROLE_ADD, ROLE_LIST } from '../constants/constant';
import RoleForm from './RoleForm';
import { RoleFormProps } from '../types/Role';

const AddRole: React.FC = () => {
  const title: string = 'Role';
  const defaultValues: RoleFormProps = {
    name: null,
    permissions: [],
  };
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: ROLE_LIST, active: false },
          {
            label: `Add ${title}`,
            path: ROLE_ADD,
            active: true,
          },
        ]}
        title={`Add ${title}`}
      />
      <Card>
        <Card.Body>
          <RoleForm defaultValues={defaultValues} />
        </Card.Body>
      </Card>
    </>
  );
};

export default AddRole;
