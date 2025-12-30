import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import CustomDataTable from '@uhub/components/CustomDataTable';
import Pagination from '@uhub/components/Pagination';
import { TableColumn } from '@uhub/types/common';
import { shortDateFormat } from '@uhub/helpers';
import { useLocation } from 'react-router-dom';
import {
  InventoryItemFlag,
  InventoryItemFlagListResponse,
  TechInventoryItemFlagQueryParam,
} from '../types/TechInventory';
import {
  TECH_INVENTORY_ITEM_FLAG,
  TECH_INVENTORY_LIST,
} from '../constants/constant';
import useFetchList from '../../../hooks/useFetchList';
import useUrlFilters from '../../../hooks/useUrlFilters';

const InventoryItemFlagList: React.FC = () => {
  const [filters, setFilters] =
    useUrlFilters<TechInventoryItemFlagQueryParam>();
  const location = useLocation();

  const title = filters?.title ?? 'Items Flag';

  const { data, isFetching, isError } =
    useFetchList<InventoryItemFlagListResponse>(
      `${TECH_INVENTORY_ITEM_FLAG}`,
      filters
    );

  const columns: TableColumn[] = [
    {
      dataField: 'user.name',
      text: 'User',
    },
    {
      dataField: 'notes',
      text: 'Notes',
    },
    {
      dataField: 'created_at',
      text: 'Date',
      formatter: (row: InventoryItemFlag) => {
        return shortDateFormat(row.created_at);
      },
    },
  ];

  const handlePageChange = (selectedItem: any) => {
    setFilters((prev: any) => ({
      ...prev,
      page: selectedItem.selected + 1,
    }));
  };

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: `Tech Inventory List`,
            path: location.state?.from || TECH_INVENTORY_LIST,
            active: false,
          },
          {
            label: title ?? 'Item Flags',
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
              <CustomDataTable
                columns={columns}
                data={data!.data}
                wrapperClassName="table-no-min-height"
              />
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

export default InventoryItemFlagList;
