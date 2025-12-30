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
  SupplementSaleListResponse,
  SupplementSaleResponse,
} from '../types/SupplementSale';
import {
  MODIFY_SUPPLEMENT_SALE,
  READ_SUPPLEMENT_SALE,
  SUPPLEMENT_SALE,
  SUPPLEMENT_SALE_VIEW,
} from '../constants/constant';
import UpdateSupplementStatus from '../../components/UpdateSupplementStatus';

const SupplementSaleTable: React.FC<
  ListTableProps<SupplementSaleListResponse>
> = ({ isFetching, data, filters, setFilters }) => {
  const canUpdate = can(MODIFY_SUPPLEMENT_SALE);
  const actionColumnFormatter = (row: any) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'View',
        icon: 'bx bx-show',
        url: prepareDynamicUrl(SUPPLEMENT_SALE_VIEW, row.id),
        permission: READ_SUPPLEMENT_SALE,
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

  const statusColumnFormatter = (row: SupplementSaleResponse) => {
    return (
      <UpdateSupplementStatus
        status={row.status}
        id={row.id}
        canUpdate={canUpdate}
        baseEndpoint={SUPPLEMENT_SALE}
      />
    );
  };

  const columns: TableColumn[] = [
    {
      dataField: 'batch_no',
      text: 'Batch Number',
      formatter: (row: SupplementSaleResponse) =>
        row?.batch_no ?? row?.supplement_manufacture?.batch_number ?? '-',
    },
    {
      dataField: 'supplement.name',
      text: 'Supplement',
    },
    {
      dataField: 'qty',
      text: 'Quantity',
    },
    {
      dataField: 'location.name',
      text: 'Location',
      formatter: (row: SupplementSaleResponse) =>
        row.location ? `${row.location.name}, ${row.location.state}` : '-',
    },
    {
      dataField: 'date',
      text: 'Date',
      formatter: (row: SupplementSaleResponse) =>
        row.date ? formattedShortDate(row.date) : '-',
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

export default SupplementSaleTable;
