import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PageTitle from '@uhub/components/PageTitle';
import { prepareDynamicUrl, shortDateFormat } from '@uhub/helpers';
import { Button, Card, Row, Table } from 'react-bootstrap';
import { can } from '@uhub/helpers/checkPermission';
import useModalFeature from '@uhub/hooks/common/useModalFeature';
import useReadSalesOrder from '../hooks/useReadSalesOrder';
import { SALES_ORDER_LIST, SALES_ORDER_SHOW } from '../constants/constant';
import { InfoColumn } from '../../components/InfoColumn';
import { CREATE_PRODUCTION_REQUEST } from '../../operations/production-request/constants/constant';
import ProductionFacilityCreateModal from '../components/ProductionFacilityCreateModal';
// import { TASK_ADD } from '../../operations/task/constants/constant';
// import { TASK_TYPE } from '../../operations/task/types/Task';

interface TableSectionProps {
  title: string;
  headers: string[];
  data: any[];
  // eslint-disable-next-line no-unused-vars
  renderRow: (item: any, index: number) => React.JSX.Element;
}

const TableSection: React.FC<TableSectionProps> = ({
  title,
  headers,
  data,
  renderRow,
}) => (
  <Card>
    <Card.Title>{title}</Card.Title>
    <Card.Body>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>{data.map((item, index) => renderRow(item, index))}</tbody>
        </Table>
      </Row>
    </Card.Body>
  </Card>
);

type NoDataProps = {
  title: string;
};
const NoData: React.FC<NoDataProps> = ({ title }) => (
  <Card>
    <Card.Title>{title}</Card.Title>
    <Card.Body>
      <div>{title} not available in the inventory</div>
    </Card.Body>
  </Card>
);

const ViewSalesOrder: React.FC = () => {
  const { id } = useParams();
  const title = 'Show Sales Order';
  const location = useLocation();
  // const navigate = useNavigate();
  const hasCreatePermission = can(CREATE_PRODUCTION_REQUEST);
  const { showModal, toggleModal } = useModalFeature();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const { data, isFetching, isError } = useReadSalesOrder(id);

  if (isFetching) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  const infoData = [
    { label: 'Sales Order Id', value: data.sales_order_confirmation_id },
    { label: 'Created By', value: data.created_by.name },
    { label: 'Status', value: data.status },
    { label: 'Total (Incl GST)', value: data.total },
    {
      label: 'Confirmed At',
      value: data.confirmed_at ? shortDateFormat(data.confirmed_at) : '-',
    },
  ];

  const customerInfoData = [
    { label: 'Customer Name', value: data.customer.name },
    {
      label: 'Property Name',
      value: `${data.customer.property_name} ${
        data.customer.identifier ? `(${data.customer.identifier})` : ''
      }`,
    },
    { label: 'Phone', value: data.customer.phone },
    { label: 'Email', value: data.customer.email },
  ];

  const handleCheckAvailability = (product: any) => {
    toggleModal();
    setSelectedProduct(product);
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: title,
            path: location.state?.from || SALES_ORDER_LIST,
          },
          {
            label: `View ${title}`,
            path: prepareDynamicUrl(SALES_ORDER_SHOW, data?.id),
            active: true,
          },
        ]}
        title={title}
      />

      <Card>
        <Card.Title>Show Sales Order</Card.Title>
        <Card.Body>
          <Row>
            {infoData.map((info, index) => (
              <InfoColumn key={index} label={info.label} value={info.value} />
            ))}
          </Row>
        </Card.Body>
      </Card>

      <Card>
        <Card.Title>Customer Details</Card.Title>
        <Card.Body>
          <Row>
            {customerInfoData.map((info, index) => (
              <InfoColumn key={index} label={info.label} value={info.value} />
            ))}
          </Row>
        </Card.Body>
      </Card>

      {data.products.length > 0 ? (
        <TableSection
          title="Products"
          headers={[
            'Supplement Name',
            'Qty',
            'Rate',
            'Total (Incl GST)',
            'Action',
          ]}
          data={data.products}
          renderRow={(product, index) => (
            <tr key={index}>
              <td>{product.supplement.name}</td>
              <td>{product.qty}</td>
              <td>{product.rate}</td>
              <td>{product.total}</td>
              <td>
                {hasCreatePermission && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleCheckAvailability(product)}>
                    Check Availability
                  </Button>
                )}
              </td>
            </tr>
          )}
        />
      ) : (
        <NoData title="Products" />
      )}

      {data.additional_items.length > 0 ? (
        <TableSection
          title="Additional Items"
          headers={['Item', 'Qty', 'Rate', 'Total (Incl GST)']}
          data={data.additional_items}
          renderRow={(additionalItem, index) => (
            <tr key={index}>
              <td>{additionalItem.item_name}</td>
              <td>{additionalItem.qty}</td>
              <td>{additionalItem.rate}</td>
              <td>{additionalItem.total}</td>
            </tr>
          )}
        />
      ) : (
        <NoData title="Additional Items" />
      )}

      {data.udose_items.length > 0 ? (
        <TableSection
          title="Udose Items"
          headers={[
            'Item',
            'Qty',
            'Rate',
            'Total (Incl GST)',
            // 'Action'
          ]}
          data={data.udose_items}
          renderRow={(udoseItem, index) => (
            <tr key={index}>
              <td>{udoseItem.inventory_item?.name}</td>
              <td>{udoseItem.qty}</td>
              <td>{udoseItem.rate}</td>
              <td>{udoseItem.total}</td>
              {/* <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() =>
                    navigate(`${TASK_ADD}?type=${TASK_TYPE.UDOSE_INSTALLATION}`)
                  }>
                  <i className="bx bx-plus me-1" />
                  Assign Task
                </Button>
              </td> */}
            </tr>
          )}
        />
      ) : (
        <NoData title="Udose Items" />
      )}

      {selectedProduct && selectedProduct.supplement && (
        <ProductionFacilityCreateModal
          toggleModal={toggleModal}
          showModal={showModal}
          product={selectedProduct}
        />
      )}
    </>
  );
};

export default ViewSalesOrder;
