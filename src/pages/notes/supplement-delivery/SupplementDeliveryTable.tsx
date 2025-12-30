/* eslint-disable no-unused-vars */
import React, { SetStateAction } from 'react';
import CustomDataTable from '../../../components/CustomDataTable';
import Pagination from '../../../components/Pagination';
import { SupplementDelivery } from '../../../types/notes/supplementDeliveries';
import { formattedShortDate, prepareDynamicUrl } from '../../../helpers';
import { READ_NOTE_SUPPLEMENT_DELIVERIES } from '../../../constants/permissions';
import { SUPPLEMENT_DELIVERY_NOTE_VIEW } from '../../../constants/path';
import ActionDropdown from '../../../components/ActionDropdown';
import { CustomDropdownMenuItem } from '../../../types/common';

type Props = {
  data: any;
  pageNumber: number;
  handlePageChange: React.Dispatch<SetStateAction<any>>;
  sort?: string;
  direction?: string;
  handleTabeDataSorting: any;
};

const SupplementDeliveryTable: React.FC<Props> = ({
  data,
  pageNumber,
  handlePageChange,
  sort,
  direction,
  handleTabeDataSorting,
}) => {
  const actionColumnFormatter = (row: SupplementDelivery) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'View',
        icon: 'bx bx-show',
        url: prepareDynamicUrl(SUPPLEMENT_DELIVERY_NOTE_VIEW, row.id),
        permission: READ_NOTE_SUPPLEMENT_DELIVERIES,
      },
    ];

    return (
      <ActionDropdown
        icon="bx bx-dots-vertical-rounded"
        iconColorClass="text-muted"
        containerClass="custom-dropdown d-flex align-items-center justify-content-between text-white"
        menuItems={menuItems}
      />
    );
  };

  const columns = [
    {
      text: 'Date',
      dataField: 'date',
      formatter: (row: SupplementDelivery) =>
        row.date ? formattedShortDate(row.date) : '-',
    },
    { dataField: 'customer_property.name', text: 'Property' },
    { dataField: 'site.name', text: 'Site' },
    { dataField: 'performer.name', text: 'Note Taker' },
    { dataField: 'action', text: '', formatter: actionColumnFormatter },
  ];

  return (
    <>
      <CustomDataTable
        columns={columns}
        data={data.body}
        sort={sort}
        direction={direction}
        handleTabeDataSorting={handleTabeDataSorting}
      />
      <Pagination
        data={data?.meta_data?.pagination}
        pageNumber={pageNumber}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default SupplementDeliveryTable;
