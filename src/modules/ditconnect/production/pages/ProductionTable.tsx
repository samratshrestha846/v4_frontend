/* eslint-disable no-unused-vars */
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
import { ProductionListResponse } from '../types/Production';
import {
  PRODUCTION_EDIT,
  PRODUCTION_VIEW,
  READ_PRODUCTION,
  UPDATE_PRODUCTION,
} from '../constants/constant';

const ProductionTable: React.FC<ListTableProps<ProductionListResponse>> = ({
  isFetching,
  data,
  filters,
  setFilters,
}) => {
  const actionColumnFormatter = (row: any) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'View',
        icon: 'bx bx-show',
        url: prepareDynamicUrl(PRODUCTION_VIEW, row.id),
        permission: READ_PRODUCTION,
      },
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        url: prepareDynamicUrl(PRODUCTION_EDIT, row.id),
        permission: UPDATE_PRODUCTION,
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
      dataField: 'batch_number',
      text: 'Batch No.',
    },
    {
      dataField: 'supplement.name',
      text: 'Supplement',
    },
    {
      dataField: 'qty',
      text: 'Qty',
    },
    {
      dataField: 'location.name',
      text: 'Location',
    },
    {
      dataField: 'date',
      text: 'Date',
    },
    {
      dataField: 'production_order_no',
      text: 'Order No.',
    },
    {
      dataField: 'created_by.name',
      text: 'Created By',
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

export default ProductionTable;
