import React from 'react';
import CustomLoader from '@uhub/components/CustomLoader';
import CustomDataTable from '@uhub/components/CustomDataTable';
import Pagination from '@uhub/components/Pagination';
import { formattedDatetime, prepareDynamicUrl } from '@uhub/helpers';
import {
  CustomDropdownMenuItem,
  ListTableProps,
  TableColumn,
} from '@uhub/types/common';
import ActionDropdown from '@uhub/components/ActionDropdown';
import IconLabelStatus from '@uhub/components/IconLabelStatus';
import { MessageListResponse, MessageResponse } from '../types/Message';
import { MESSAGE_EDIT, UPDATE_MESSAGE } from '../constants/constant';
import { ACTIVE } from '../../constants/common';

const MessageTable: React.FC<ListTableProps<MessageListResponse>> = ({
  isFetching,
  data,
  filters,
  setFilters,
}) => {
  const activeInactiveColumnFormatter = (row: MessageResponse) => {
    return (
      <IconLabelStatus
        iconTextClass={
          row.status === ACTIVE ? 'text-success' : 'text-light-gray'
        }
        label={row.status === ACTIVE ? 'Active' : 'Inactive'}
      />
    );
  };

  const nameFormatter = (row: MessageResponse) => {
    return (
      <>
        {row.author.first_name} {row.author.last_name}
      </>
    );
  };

  const actionColumnFormatter = (row: any) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        url: prepareDynamicUrl(MESSAGE_EDIT, row.id),
        permission: UPDATE_MESSAGE,
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
      dataField: 'type',
      text: 'Type',
    },
    {
      dataField: 'author.first_name',
      text: 'Author',
      formatter: nameFormatter,
    },
    {
      dataField: 'message',
      text: 'Message',
    },
    {
      dataField: 'publish_date',
      text: 'Publish at',
      formatter: (row: MessageResponse) =>
        row.publish_date ? formattedDatetime(row.publish_date) : '-',
    },
    {
      dataField: 'status',
      text: 'Status',
      formatter: activeInactiveColumnFormatter,
    },
    {
      dataField: 'expires_on',
      text: 'Expires on',
      formatter: (row: MessageResponse) =>
        row.expires_on ? formattedDatetime(row.expires_on) : '-',
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

export default MessageTable;
