import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import CustomLoader from '@uhub/components/CustomLoader';
import CustomDataTable from '@uhub/components/CustomDataTable';
import { CustomDropdownMenuItem, TableColumn } from '@uhub/types/common';
import { prepareDynamicUrl, shortDateFormat } from '@uhub/helpers';
import ActionDropdown from '@uhub/components/ActionDropdown';
import Pagination from '@uhub/components/Pagination';
import { useLocation } from 'react-router-dom';
import {
  InventoryItemFlag,
  InventoryItemStockListResponse,
  TechInventoryItemFlagQueryParam,
} from '../types/TechInventory';
import {
  READ_INVENTORY_ITEM_STOCK,
  TECH_INVENTORY_ITEM_STOCK,
  TECH_INVENTORY_ITEM_STOCK_SHOW,
  TECH_INVENTORY_LIST,
} from '../constants/constant';
import useFetchList from '../../../hooks/useFetchList';
import useUrlFilters from '../../../hooks/useUrlFilters';

const InventoryItemStockList: React.FC = () => {
  const [filters, setFilters] =
    useUrlFilters<TechInventoryItemFlagQueryParam>();
  const location = useLocation();

  const title = filters?.title ?? 'Items Stock';

  const { data, isFetching, isError } =
    useFetchList<InventoryItemStockListResponse>(
      `${TECH_INVENTORY_ITEM_STOCK}`,
      filters
    );

  const actionColumnFormatter = (row: any) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'View',
        icon: 'bx bx-show',
        url: prepareDynamicUrl(TECH_INVENTORY_ITEM_STOCK_SHOW, row.id),
        permission: READ_INVENTORY_ITEM_STOCK,
      },
    ];

    return (
      <ActionDropdown
        key={`${title}-show-${row.id}`}
        icon="bx bx-dots-vertical-rounded"
        iconColorClass="font-14 text-gray"
        containerClass="custom-dropdown d-flex align-items-center justify-content-between text-white"
        menuItems={menuItems}
      />
    );
  };
  const columns: TableColumn[] = [
    {
      dataField: 'user.name',
      text: 'User',
    },
    {
      dataField: 'action',
      text: 'Action Type',
    },
    {
      dataField: 'notes',
      text: 'Notes',
    },
    {
      dataField: 'qty',
      text: 'Qty',
    },
    {
      dataField: 'created_at',
      text: 'Date',
      formatter: (row: InventoryItemFlag) => {
        return shortDateFormat(row.created_at);
      },
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

  if (isError) return <CustomLoader />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: `Tech Inventory List`,
            path: location.state?.from || TECH_INVENTORY_LIST,
          },
          {
            label: `${title}`,
            path: TECH_INVENTORY_LIST,
            active: true,
          },
        ]}
        title={title}
      />

      <Card>
        <Card.Body>
          {isFetching ? (
            <CustomLoader />
          ) : (
            <>
              <CustomDataTable columns={columns} data={data!.data} />
              {data && (
                <Pagination
                  data={data?.meta_data?.pagination}
                  pageNumber={Number(filters.page ?? 1) - 1}
                  handlePageChange={handlePageChange}
                />
              )}
            </>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default InventoryItemStockList;
