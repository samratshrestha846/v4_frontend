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
import { can } from '@uhub/helpers/checkPermission';
import { Link } from 'react-router-dom';
import { PolicyListResponse, PolicyResponse } from '../types/Policy';
import {
  ACCESS_POLICY,
  POLICY_EDIT,
  POLICY_VIEW,
  READ_POLICY,
  UPDATE_POLICY,
} from '../constants/constant';

const PolicyTable: React.FC<ListTableProps<PolicyListResponse>> = ({
  isFetching,
  data,
  filters,
  setFilters,
}) => {
  const canReadPolicy = can(READ_POLICY);

  const actionColumnFormatter = (row: any) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'View',
        icon: 'bx bx-show',
        url: prepareDynamicUrl(POLICY_VIEW, row.id),
        permission: ACCESS_POLICY,
      },
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        url: prepareDynamicUrl(POLICY_EDIT, row.id),
        permission: UPDATE_POLICY,
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

  const fileFormatter = (row: PolicyResponse) => {
    return canReadPolicy ? (
      <Link to={row.file_url} className="text-primary fw-medium">
        {row.file}
      </Link>
    ) : null;
  };

  const columns: TableColumn[] = [
    {
      dataField: 'title',
      text: 'Title',
    },
    {
      dataField: 'file',
      text: 'File',
      formatter: fileFormatter,
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

export default PolicyTable;
