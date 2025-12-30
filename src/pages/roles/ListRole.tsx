import React from 'react';
import PageTitle from '../../components/PageTitle';
import useFetchRolesList from './hooks/useFetchRolesList';
import CustomLoader from '../../components/CustomLoader';
import ErrorMessage from '../../components/ErrorMessage';
import { ROLE_LIST } from '../../constants/path';
import CustomDataTable from '../../components/CustomDataTable';
import ActionDropdown from '../../components/ActionDropdown';
import ViewPermissionModal from './modal/ViewPermissionModal';
import Role from '../../types/role/role';
import { READ_ROLE } from '../../constants/permissions';
import { ROLE_SUPER_ADMIN } from '../../constants/constants';

const ListRole: React.FC = () => {
  const { data: roles, isFetching, isError, refetch } = useFetchRolesList();

  const actionColumnFormatter = (row: Role) => {
    const menuItems = [
      {
        label: 'View Granted Permissions',
        icon: 'bx bx-show',
        actionKey: `Granted Permissions - ${row.name}`,
        modalContent: <ViewPermissionModal role={row} />,
        permission: READ_ROLE,
      },
    ];
    return (
      row.name !== ROLE_SUPER_ADMIN && (
        <ActionDropdown
          menuItems={menuItems}
          containerClass="d-flex custom-dropdown align-items-center justify-content-between text-white"
          icon="bx bx-dots-vertical-rounded"
          iconColorClass="text-muted"
          refetch={refetch}
          size="xl"
        />
      )
    );
  };

  const columns = [
    {
      text: 'Role',
      dataField: 'name',
    },
    {
      text: '',
      dataField: '',
      formatter: actionColumnFormatter,
    },
  ];

  if (isFetching) {
    return <CustomLoader />;
  }

  if (isError) {
    return <ErrorMessage />;
  }
  return (
    <>
      <PageTitle
        breadCrumbItems={[{ label: 'Roles', path: ROLE_LIST, active: true }]}
        title="All Roles"
      />

      {roles && <CustomDataTable columns={columns} data={roles} />}
    </>
  );
};

export default ListRole;
