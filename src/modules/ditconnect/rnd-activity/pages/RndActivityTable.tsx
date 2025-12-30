/* eslint-disable no-unused-vars */
import ErrorMessage from '@uhub/components/ErrorMessage';
import IconLabelStatus from '@uhub/components/IconLabelStatus';
import React from 'react';
import CustomLoader from '@uhub/components/CustomLoader';
import CustomDataTable from '@uhub/components/CustomDataTable';
import Pagination from '@uhub/components/Pagination';
import { prepareDynamicUrl } from '@uhub/helpers';
import {
  CustomDropdownMenuItem,
  ListTableProps,
  TableColumn,
} from '@uhub/types/common';
import ActionDropdown from '@uhub/components/ActionDropdown';
import DeleteModal from '../../components/DeleteModal';
import UpdateStatusModal from '../../components/UpdateStatusModal';
import { LabSampleResponse } from '../../lab-sample/types/LabSample';
import { RndActivityListResponse } from '../types/RndActivity';
import {
  DELETE_RND_ACTIVITY,
  READ_RND_ACTIVITY,
  RND_ACTIVITY,
  RND_ACTIVITY_EDIT,
  RND_ACTIVITY_STATUS_ACTIVE,
  RND_ACTIVITY_STATUS_INACTIVE,
  UPDATE_RND_ACTIVITY,
} from '../constants/constant';

const RndActivityTable: React.FC<ListTableProps<RndActivityListResponse>> = ({
  isFetching,
  isError,
  data,
  filters,
  setFilters,
}) => {
  const getStatusToggleData = (
    status:
      | typeof RND_ACTIVITY_STATUS_ACTIVE
      | typeof RND_ACTIVITY_STATUS_INACTIVE
  ) => ({
    status:
      status === RND_ACTIVITY_STATUS_ACTIVE
        ? RND_ACTIVITY_STATUS_INACTIVE
        : RND_ACTIVITY_STATUS_ACTIVE,
  });

  const actionColumnFormatter = (row: any) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        url: prepareDynamicUrl(RND_ACTIVITY_EDIT, row.id),
        permission: UPDATE_RND_ACTIVITY,
      },
      {
        label: 'Delete',
        icon: 'bx bx-trash',
        actionKey: 'Delete R&D Activity',
        modalContent: (
          <DeleteModal
            title={`Activity - ${row.name}`}
            endpoint={`${RND_ACTIVITY}/${row.id}`}
            refetchKey={RND_ACTIVITY}
            toggleModal={() => {}}
          />
        ),
        permission: DELETE_RND_ACTIVITY,
      },
      {
        label: 'Update Status',
        icon: 'bx bx-check',
        actionKey: 'Update Status',
        modalContent: (
          <UpdateStatusModal
            endpoint={`${RND_ACTIVITY}/${row.id}`}
            data={getStatusToggleData(row.status)}
            refetchKey={RND_ACTIVITY}
            title="status"
            toggleModal={() => {}}
          />
        ),
        permission: READ_RND_ACTIVITY,
      },
    ];

    return (
      <ActionDropdown
        icon="bx bx-dots-vertical-rounded"
        containerClass="custom-dropdown"
        menuItems={menuItems}
      />
    );
  };

  const statusColumnFormatter = (row: LabSampleResponse) => {
    return (
      <IconLabelStatus
        label={row.status}
        iconTextClass={
          row.status === RND_ACTIVITY_STATUS_ACTIVE
            ? 'text-success'
            : 'text-light-gray'
        }
      />
    );
  };
  const columns: TableColumn[] = [
    {
      dataField: 'section_no',
      text: 'Section No',
    },
    {
      dataField: 'name',
      text: 'Name',
    },
    {
      dataField: 'group',
      text: 'Group',
    },
    {
      dataField: 'description',
      text: 'Description',
    },
    {
      dataField: 'parent_activity.name',
      text: 'Parent',
    },
    {
      dataField: 'status',
      text: 'Status',
      formatter: statusColumnFormatter,
    },
    {
      dataField: 'action',
      text: '',
      formatter: actionColumnFormatter,
    },
  ];

  const handlePageChange = (selectedItem: any) => {
    setFilters((prev: any) => ({
      ...prev,
      page: selectedItem.selected + 1,
    }));
  };

  if (isFetching) return <CustomLoader />;

  if (isError) return <ErrorMessage />;
  return (
    <>
      <CustomDataTable columns={columns} data={data!.data} />
      <Pagination
        data={data!.meta_data!.pagination}
        pageNumber={Number(filters.page ?? 1) - 1}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default RndActivityTable;
