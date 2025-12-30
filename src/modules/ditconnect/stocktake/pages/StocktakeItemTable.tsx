/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import { Card } from 'react-bootstrap';
import CustomDataTable from '@uhub/components/CustomDataTable';
import { TableColumn } from '@uhub/types/common';
import { debounce } from 'lodash';
import { StocktakeItemResponse } from '../types/Stocktake';

type Props = {
  title: string;
  data: StocktakeItemResponse[];
};

const StocktakeItemTable: React.FC<Props> = ({ title, data }) => {
  const [localSearch, setLocalSearch] = useState<string>();
  const [stocktakeItemList, setStocktakeItemList] =
    useState<StocktakeItemResponse[]>(data);

  // Debounced search input handler
  const handleSearchOnChange = debounce((e) => {
    setLocalSearch(e.target.value);
  }, 300);

  // Use useMemo to optimize filtering
  const filteredStocktakeItemList = useMemo(() => {
    if (!localSearch) return data;
    return data.filter(
      (item) =>
        item?.batch_no?.toLowerCase().includes(localSearch.toLowerCase()) ||
        item?.supplement?.name.toLowerCase().includes(localSearch.toLowerCase())
    );
  }, [localSearch, data]);

  // Update filtered list
  useEffect(() => {
    setStocktakeItemList(filteredStocktakeItemList);
  }, [filteredStocktakeItemList]);

  const columns: TableColumn[] = [
    {
      dataField: 'supplement.name',
      text: 'Supplement',
    },
    {
      dataField: 'batch_no',
      text: 'Batch Number',
    },
    {
      dataField: 'available_qty',
      text: 'Available Quantity',
    },
    {
      dataField: 'new_qty',
      text: 'New Quantity',
    },

    {
      dataField: 'notes',
      text: 'Notes',
    },
  ];

  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center gap-2 flex-wrap mb-3">
          <h5 className="text-primary-color mt-0 mb-3">{title}</h5>
          <div>
            <input
              onChange={handleSearchOnChange}
              className="form-control"
              placeholder="Search"
            />
          </div>
        </div>
        <CustomDataTable
          columns={columns}
          data={stocktakeItemList}
          wrapperClassName="table-no-min-height"
        />
      </Card.Body>
    </Card>
  );
};

export default StocktakeItemTable;
