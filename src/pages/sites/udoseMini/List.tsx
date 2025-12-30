import React from 'react';
import { Card } from 'react-bootstrap';
import { TableColumn } from '../../../types/common';
import useCheckProductSubscription from '../udose/hooks/useCheckProductSubscription';
import useUdoseMiniList from './hooks/useUdoseMiniList';
import { UDOSE_MINI_LIST } from '../../../constants/path';
import ProductInfo from './ProductInfo';
import PageTitle from '../../../components/PageTitle';
import CustomDataTable from '../../../components/CustomDataTable';
import CustomLoader from '../../../components/CustomLoader';
import ErrorMessage from '../../../components/ErrorMessage';

const List: React.FC = () => {
  const { data, isFetching, isError } = useUdoseMiniList();
  const { isSubscribed } = useCheckProductSubscription();

  const columns: TableColumn[] = [
    {
      dataField: 'site_number',
      text: 'Site Number',
    },
    {
      dataField: 'name',
      text: 'Name',
    },
    {
      dataField: 'device.serial_number',
      text: 'Device',

      formatter: (row: any) => {
        return row.device?.serial_number;
      },
    },
    {
      dataField: 'customer_property.customer.business_name',
      text: 'Customer',

      formatter: (row: any) => {
        return row.customer_property?.customer?.business_name;
      },
    },
    {
      dataField: 'customer_property.region.name',
      text: 'Region',

      formatter: (row: any) => {
        return `${row.customer_property?.region?.name} - ${row.customer_property?.region?.state}`;
      },
    },
  ];

  if (!isSubscribed) {
    return <ProductInfo />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'uDose Mini', path: '/', active: false },
          {
            label: 'uDose Mini Sites',
            path: UDOSE_MINI_LIST,
            active: true,
          },
        ]}
        title="uDose Mini"
      />

      <Card className="pb-4">
        <Card.Body>
          {isFetching ? (
            <CustomLoader />
          ) : (
            <CustomDataTable columns={columns} data={data?.data.data} />
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default List;
