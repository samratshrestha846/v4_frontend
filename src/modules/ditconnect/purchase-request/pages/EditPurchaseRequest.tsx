import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { prepareDynamicUrl } from '@uhub/helpers';
import {
  PURCHASE_REQUEST_EDIT,
  PURCHASE_REQUEST_LIST,
} from '../constants/constant';
import PurchaseRequestForm from './PurchaseRequestForm';
import useReadPurchaseRequest from '../hooks/useReadPurchaseRequest';
import {
  PurchaseRequestFormProps,
  PurchaseRequestResponse,
} from '../types/PurchaseRequest';

const EditPurchaseRequest: React.FC = () => {
  const { id } = useParams();

  const title: string = 'Purchase Request';
  const { data, isFetching, isError } = useReadPurchaseRequest(id);

  const prepareDefaultValues = (fetchedData: PurchaseRequestResponse) => {
    const values: PurchaseRequestFormProps = {
      title: fetchedData.title,
      requested_to: fetchedData.requested_to,
      required_by_date: fetchedData.required_by_date
        ? new Date(fetchedData.required_by_date)
        : null,
      supplier_id: fetchedData.supplier_id,
      priority: fetchedData.priority,
      delivery_location: fetchedData.delivery_location,
      delivery_method: fetchedData.delivery_method,
      online_order_url: fetchedData.online_order_url,
      estimated_payment_date: fetchedData.estimated_payment_date
        ? new Date(fetchedData.estimated_payment_date)
        : null,
      remarks: fetchedData.remarks,
      total_price: fetchedData.total_price,
      quotation: [],
      invoice: [],
      contract: [],
      purchase_request_items: (fetchedData?.items ?? []).map((item) => ({
        id: item.id,
        item_name: item.item_name,
        unit: item.unit,
        qty: item.qty,
        rate: item.rate,
        total: item.total,
      })),
      quotationResponse: fetchedData.quotations,
      invoiceResponse: fetchedData.invoices,
      contractResponse: fetchedData.contracts,
    };
    return values;
  };

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: PURCHASE_REQUEST_LIST, active: false },
          {
            label: `Edit ${title}`,
            path: prepareDynamicUrl(PURCHASE_REQUEST_EDIT, id),
            active: true,
          },
        ]}
        title={`Edit ${title}`}
      />
      <Card>
        <Card.Body>
          {data && (
            <PurchaseRequestForm defaultValues={prepareDefaultValues(data)} />
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default EditPurchaseRequest;
