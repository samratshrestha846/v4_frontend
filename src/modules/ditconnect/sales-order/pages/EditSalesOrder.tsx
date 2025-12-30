import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { prepareDynamicUrl } from '@uhub/helpers';
import { SALES_ORDER_EDIT, SALES_ORDER_LIST } from '../constants/constant';
import SalesOrderForm from './SalesOrderForm';
import useReadSalesOrder from '../hooks/useReadSalesOrder';

const EditSalesOrder: React.FC = () => {
  const { id } = useParams();

  const title: string = 'SalesOrder';
  const { data, isFetching, isError } = useReadSalesOrder(id);

  if (isFetching) return <CustomLoader />;

  if (isError) return <ErrorMessage />;
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: SALES_ORDER_LIST, active: false },
          {
            label: `Edit ${title}`,
            path: prepareDynamicUrl(SALES_ORDER_EDIT, id),
            active: true,
          },
        ]}
        title={`Edit ${title}`}
      />
      <Card>
        <Card.Body>
          {data && (
            <SalesOrderForm
              defaultValues={{
                total: data.total,
                additional_items: data.additional_items,
                customer: data.customer,
                products: data.products,
                udose_items: data.udose_items,
              }}
            />
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default EditSalesOrder;
