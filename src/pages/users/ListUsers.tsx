import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PageTitle from '../../components/PageTitle';
import CustomDataTable from '../../components/CustomDataTable';
import Pagination from '../../components/Pagination';
import CustomLoader from '../../components/CustomLoader';
import ErrorMessage from '../../components/ErrorMessage';
import ActionDropdown from '../../components/ActionDropdown';
import useModalFeature from '../../hooks/common/useModalFeature';
import { can } from '../../helpers/checkPermission';
import { User } from '../../types/user/user';
import { formattedDatetime, prepareDynamicUrl } from '../../helpers';
import { USER_LIST, USER_VIEW } from '../../constants/path';
import {
  CREATE_USER,
  DEACTIVATE_USER,
  READ_USER,
  RESET_USER_PASSWORD,
} from '../../constants/permissions';
import {
  ACTION_DEACTIVATE_USER,
  ACTION_EDIT_USER,
  ACTION_RESET_PASSWORD,
} from './constants/actionConstants';
import useListUsers from './hooks/useListUsers';
import useRolesDropdown from '../../hooks/dropdown/useRolesDropdown';
import FilterUser from './FilterUser';
import AddUserModal from './modals/AddUserModal';
import EditUser from './EditUser';
import ResetUserPassword from './ResetUserPassword';
import DeactivateUser from './DeactivateUser';
import { CustomDropdownMenuItem, TableColumn } from '../../types/common';
import IconLabelStatus from '../../components/IconLabelStatus';
import {
  STATUS_LABEL_ACTIVE,
  STATUS_LABEL_INACTIVE,
} from '../../constants/constants';

const ListUsers: React.FC = () => {
  const canCreateUser = can(CREATE_USER);

  // role dropdown hook call
  const { data: roleOptions, isError: isErrorRoleOptions } = useRolesDropdown();

  const {
    pageNumber,
    search,
    data,
    isFetching,
    isError,
    handlePageChange,
    handleSearchOnChange,
    refetch,
    setSearch,
    role,
    setRole,
    status,
    setStatus,
  } = useListUsers();

  const { showModal, toggleModal } = useModalFeature();

  const statusColumnFormatter = (row: User) => {
    return (
      <IconLabelStatus
        label={row?.status ? STATUS_LABEL_ACTIVE : STATUS_LABEL_INACTIVE}
        iconClass="bx bxs-circle"
        iconTextClass={row?.status ? 'text-success' : 'text-light-gray'}
      />
    );
  };

  const actionColumnFormatter = (user: User) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'View User',
        icon: 'bx bx-show',
        url: prepareDynamicUrl(USER_VIEW, user.id),
        permission: READ_USER,
      },
      {
        label: 'Edit User',
        icon: 'bx bx-edit',
        actionKey: ACTION_EDIT_USER,
        permission: READ_USER,
        modalContent: (
          <EditUser id={user.id} refetch={refetch} toggleModal={toggleModal} />
        ),
      },
    ];

    if (user.status) {
      menuItems.push(
        {
          label: 'Reset Password',
          icon: 'bx bx-reset',
          actionKey: ACTION_RESET_PASSWORD,
          permission: RESET_USER_PASSWORD,
          modalContent: (
            <ResetUserPassword
              user={user}
              refetch={refetch}
              toggleModal={toggleModal}
            />
          ),
        },
        {
          label: 'Deactivate User',
          icon: 'bx bx-user-x',
          actionKey: ACTION_DEACTIVATE_USER,
          permission: DEACTIVATE_USER,
          modalContent: (
            <DeactivateUser
              user={user}
              refetch={refetch}
              toggleModal={toggleModal}
            />
          ),
        }
      );
    }
    return (
      <ActionDropdown
        icon="bx bx-dots-vertical-rounded"
        iconColorClass="font-14 text-gray"
        containerClass="custom-dropdown d-flex align-items-center justify-content-between"
        menuItems={menuItems}
        refetch={refetch}
        size="lg"
      />
    );
  };

  const columns: TableColumn[] = [
    {
      dataField: 'name',
      text: 'Full Name',
      formatter: (row: User) => `${row.first_name} ${row.last_name}`,
    },

    {
      dataField: 'email',
      text: 'Email',
    },
    {
      dataField: 'role.name',
      text: 'Role',
      formatter: (row: User) =>
        row.roles?.length > 0 ? row.roles?.[0]?.name : '-',
    },
    {
      dataField: 'phone_number',
      text: 'Mobile Number',
    },
    {
      dataField: 'status',
      text: 'Status',
      formatter: statusColumnFormatter,
    },
    {
      dataField: 'created_at',
      text: 'Created At',
      formatter: (row: User) =>
        row?.created_at ? formattedDatetime(row.created_at) : '-',
    },
    {
      dataField: '',
      text: '',
      formatter: actionColumnFormatter,
    },
  ];

  if (isError || isErrorRoleOptions) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: 'Users',
            path: USER_LIST,
            active: true,
          },
        ]}
        title="Users"
      />
      <Card>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center gap-1 flex-wrap mb-2">
            <FilterUser
              search={search}
              setSearch={setSearch}
              handleSearchOnChange={handleSearchOnChange}
              role={role}
              setRole={setRole}
              roleOptions={roleOptions}
              status={status}
              setStatus={setStatus}
            />
            {canCreateUser && (
              <div className="float-end">
                <Button
                  variant="secondary"
                  className="btn btn-sm mb-2"
                  onClick={toggleModal}>
                  <i className="bx bx-plus me-1" /> Add User
                </Button>
              </div>
            )}
          </div>

          {isFetching ? (
            <CustomLoader />
          ) : (
            <>
              <CustomDataTable columns={columns} data={data!.body} />
              <Pagination
                data={data?.meta_data?.pagination}
                pageNumber={pageNumber}
                handlePageChange={handlePageChange}
              />
            </>
          )}
        </Card.Body>
      </Card>
      <AddUserModal
        showModal={showModal}
        toggleModal={toggleModal}
        refetch={refetch}
      />
    </>
  );
};

export default ListUsers;
