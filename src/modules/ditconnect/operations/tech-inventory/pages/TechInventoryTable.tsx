/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
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
import classNames from 'classnames';
import {
  TechInventoryItemCountResponse,
  TechInventoryListResponse,
} from '../types/TechInventory';
import {
  DELETE_INVENTORY,
  READ_INVENTORY_ITEM_FLAG,
  TECH_INVENTORY_EDIT,
  TECH_INVENTORY_FLAG_LIST,
  TECH_INVENTORY_ITEM_STOCK_LIST,
  UPDATE_TECH_INVENTORY,
} from '../constants/constant';
import StatusColumn from '../../../components/StatusColumn';
import DeleteTechInventoryModal from '../components/DeleteTechInventoryModal';

const TechInventoryTable: React.FC<
  ListTableProps<TechInventoryListResponse>
> = ({ isFetching, data, filters, setFilters }) => {
  const actionColumnFormatter = (row: TechInventoryItemCountResponse) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'Inventory Item Flags',
        icon: 'bx bx-flag',
        url: `${TECH_INVENTORY_FLAG_LIST}?inventory_item_count_id=${row.id}&title=${row.inventory_item?.name} (${row.inventory_item?.sku})`,
        permission: READ_INVENTORY_ITEM_FLAG,
      },
      {
        label: 'Inventory Item Stock',
        icon: 'bx bx-folder',
        url: `${TECH_INVENTORY_ITEM_STOCK_LIST}?inventory_item_count_id=${row.id}&title=${row.inventory_item?.name} (${row.inventory_item?.sku})`,
        permission: UPDATE_TECH_INVENTORY,
      },
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        url: prepareDynamicUrl(TECH_INVENTORY_EDIT, row.inventory_item.id),
        permission: UPDATE_TECH_INVENTORY,
      },
      {
        label: 'Delete',
        icon: 'bx bx-trash',
        modalContent: <DeleteTechInventoryModal id={row.id} />,
        permission: DELETE_INVENTORY,
        actionKey: DELETE_INVENTORY,
      },
    ];

    return (
      <ActionDropdown
        icon="bx bx-dots-vertical-rounded"
        iconColorClass="font-14 text-gray"
        containerClass="custom-dropdown d-flex align-items-center justify-content-between text-white"
        menuItems={menuItems}
      />
    );
  };
  const locationColumnFormatter = (row: any) => {
    return (
      row.related_location && (
        <>
          <span>{row.related_location.name}</span>
          {row.related_location.state && <>, {row.related_location.state}</>}
        </>
      )
    );
  };
  const isUdoseItemFormatter = (row: any) => (
    <StatusColumn
      isActive={row?.inventory_item.is_udose_item}
      text={row?.inventory_item.is_udose_item ? 'Yes' : 'No'}
    />
  );
  const qrImgFormatter = (row: any) => (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/img-redundant-alt, jsx-a11y/no-static-element-interactions
    <i
      className={classNames('me-1', 'bx bx-qr ')}
      onClick={() => window.open(row.inventory_item?.qr_image_path, '_blank')}
    />
  );

  const columns: TableColumn[] = [
    {
      dataField: 'inventory_item.name',
      text: 'Item Name',
    },
    {
      dataField: 'inventory_item.sku',
      text: 'SKU',
    },
    {
      dataField: 'inventory_item.type',
      text: 'Type',
    },
    {
      dataField: 'related_location',
      text: 'Location',
      formatter: locationColumnFormatter,
    },
    {
      dataField: 'qty',
      text: 'Qty',
    },
    {
      dataField: 'inventory_item.is_udose_item',
      text: 'Is Udose Item',
      formatter: isUdoseItemFormatter,
    },
    {
      dataField: 'inventory_item.qr_image_path',
      text: 'QR Image',
      formatter: qrImgFormatter,
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

export default TechInventoryTable;
