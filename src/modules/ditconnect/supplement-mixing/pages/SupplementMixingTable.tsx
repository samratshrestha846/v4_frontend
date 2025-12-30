/* eslint-disable no-unused-vars */
import React from 'react';
import CustomLoader from '@uhub/components/CustomLoader';
import CustomDataTable from '@uhub/components/CustomDataTable';
import Pagination from '@uhub/components/Pagination';
import { formattedShortDate, prepareDynamicUrl } from '@uhub/helpers';
import {
  CustomDropdownMenuItem,
  ListTableProps,
  TableColumn,
} from '@uhub/types/common';
import ActionDropdown from '@uhub/components/ActionDropdown';
import { can } from '@uhub/helpers/checkPermission';
import {
  SupplementMixingListResponse,
  SupplementMixingResponse,
} from '../types/SupplementMixing';
import {
  MODIFY_SUPPLEMENT_MIXING,
  READ_SUPPLEMENT_MIXING,
  SUPPLEMENT_MIXING,
  SUPPLEMENT_MIXING_VIEW,
} from '../constants/constant';
import UpdateSupplementStatus from '../../components/UpdateSupplementStatus';

const SupplementMixingTable: React.FC<
  ListTableProps<SupplementMixingListResponse>
> = ({ isFetching, data, filters, setFilters }) => {
  const canUpdate = can(MODIFY_SUPPLEMENT_MIXING);

  const actionColumnFormatter = (row: any) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'View',
        icon: 'bx bx-show',
        url: prepareDynamicUrl(SUPPLEMENT_MIXING_VIEW, row.id),
        permission: READ_SUPPLEMENT_MIXING,
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

  const statusColumnFormatter = (row: SupplementMixingResponse) => {
    return (
      <UpdateSupplementStatus
        status={row.status}
        id={row.id}
        canUpdate={canUpdate}
        baseEndpoint={SUPPLEMENT_MIXING}
      />
    );
  };

  const columns: TableColumn[] = [
    {
      dataField: 'stock_location.name',
      text: 'From Location',
      formatter: (row: SupplementMixingResponse) =>
        row.stock_location
          ? `${row.stock_location.name}, ${row.stock_location.state}`
          : '-',
    },
    {
      dataField: 'date',
      text: 'Date',
      formatter: (row: SupplementMixingResponse) =>
        row.date ? formattedShortDate(row.date) : '-',
    },
    {
      dataField: 'updated_batch_no',
      text: 'Updated Batch Number',
    },
    {
      dataField: 'updated_supplement.name',
      text: 'Updated Supplement',
    },
    {
      dataField: 'qty',
      text: 'Quantity',
    },
    {
      dataField: 'created_by.name',
      text: 'Created By',
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

export default SupplementMixingTable;
