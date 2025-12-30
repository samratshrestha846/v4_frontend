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
import IconLabelStatus from '@uhub/components/IconLabelStatus';
import { Badge } from 'react-bootstrap';
import {
  SupplementListResponse,
  SupplementResponse,
} from '../types/Supplement';
import { SUPPLEMENT_EDIT, UPDATE_SUPPLEMENT } from '../constants/constant';
import {
  STATUS_LABEL_ACTIVE,
  STATUS_LABEL_INACTIVE,
} from '../../../../constants/constants';
import { ACTIVE } from '../../constants/common';

const SupplementTable: React.FC<ListTableProps<SupplementListResponse>> = ({
  isFetching,
  data,
  filters,
  setFilters,
}) => {
  const activeInactiveColumnFormatter = (row: SupplementResponse) => {
    return (
      <IconLabelStatus
        iconTextClass={
          row.status === ACTIVE ? 'text-success' : 'text-light-gray'
        }
        label={
          row.status === ACTIVE ? STATUS_LABEL_ACTIVE : STATUS_LABEL_INACTIVE
        }
      />
    );
  };
  const tagsColumnFormatter = (row: SupplementResponse) => {
    return (
      <ul className="custom-list m-0 p-0 d-flex flex-wrap gap-1">
        {row?.tags?.map((tag) => (
          <li key={tag} className="mb-1">
            <Badge className="badge-outline-secondary font-12">{tag}</Badge>
          </li>
        ))}
      </ul>
    );
  };
  const actionColumnFormatter = (row: any) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        url: prepareDynamicUrl(SUPPLEMENT_EDIT, row.id),
        permission: UPDATE_SUPPLEMENT,
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

  const columns: TableColumn[] = [
    {
      dataField: 'name',
      text: 'Name',
    },
    {
      dataField: 'slug',
      text: 'Slug',
    },
    {
      dataField: 'tags',
      text: 'Tags',
      formatter: tagsColumnFormatter,
    },
    {
      dataField: 'group',
      text: 'Group',
    },
    {
      dataField: 'type',
      text: 'Type',
    },
    {
      dataField: 'status',
      text: 'Status',
      formatter: activeInactiveColumnFormatter,
    },
    {
      dataField: '',
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

export default SupplementTable;
