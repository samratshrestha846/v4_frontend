import React from 'react';
import { Card } from 'react-bootstrap';
import moment from 'moment';

import DeviceStockType from './DeviceStockType';
import { StockType } from '../../../types/device/stockType';
import { formattedDatetime } from '../../../helpers';
import { TableColumn } from '../../../types/common';
import CustomDataTable from '../../../components/CustomDataTable';

type Props = {
  stockTypeHistory: StockType[] | undefined;
};

const DeviceStockHistory: React.FC<Props> = ({ stockTypeHistory }) => {
  const userColumnFormatter = (value: StockType) => {
    return (
      <>
        <h6 className="font-14 m-0 fw-normal">{`${value?.status_updated_by?.first_name} ${value?.status_updated_by?.last_name}`}</h6>
        <span className="text-muted font-10">
          {value?.status_updated_by?.email}
        </span>
      </>
    );
  };

  const stockTypeColumnFormatter = (value: StockType) => {
    return <DeviceStockType stockTypeName={value?.stock_type_name} />;
  };

  const dateColumnFormatter = (value: StockType) => {
    return (
      <>
        <h6 className="font-14 m-0 fw-normal">
          {formattedDatetime(value.created_at)}
        </h6>
        <span className="text-muted font-10">
          {moment(value.created_at).local().fromNow()}
        </span>
      </>
    );
  };

  const columns: TableColumn[] = [
    {
      dataField: 'user',
      text: 'User',
      formatter: userColumnFormatter,
    },
    {
      dataField: 'stock_type',
      text: 'Stock Type',
      formatter: stockTypeColumnFormatter,
    },
    {
      dataField: 'date',
      text: 'Date',
      formatter: dateColumnFormatter,
    },
    {
      dataField: 'remarks',
      text: 'Remarks',
    },
  ];
  return (
    <div>
      <Card>
        <Card.Header as="h5" className="text-primary-color">
          Stock History
        </Card.Header>
        <Card.Body>
          {stockTypeHistory && (
            <CustomDataTable columns={columns} data={stockTypeHistory} />
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default DeviceStockHistory;
