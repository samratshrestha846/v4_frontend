import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PageTitle from '@uhub/components/PageTitle';
import { prepareDynamicUrl, shortDateFormat } from '@uhub/helpers';
import { Card, Col, Row } from 'react-bootstrap';
import {
  TECH_INVENTORY_ITEM_STOCK_LIST,
  TECH_INVENTORY_ITEM_STOCK_SHOW,
} from '../constants/constant';
import useReadInventoryItemStock from '../hooks/useReadInventoryItemStock';

const ViewInventoryItemStock: React.FC = () => {
  const { id } = useParams();
  const title = 'Inventory Item Stock';
  const location = useLocation();

  const { data, isFetching, isError } = useReadInventoryItemStock(id);

  if (isFetching) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: title,
            path: location.state?.from || TECH_INVENTORY_ITEM_STOCK_LIST,
          },
          {
            label: `View ${title}`,
            path: prepareDynamicUrl(TECH_INVENTORY_ITEM_STOCK_SHOW, data?.id),
            active: true,
          },
        ]}
        title={title}
      />
      <Card>
        <Card.Body>
          <Row>
            <Col sm={6} md={6}>
              <h6 className="font-14">Created By </h6>
              <p className="text-sm lh-150">{data?.user.name ?? '-'}</p>
            </Col>

            <Col sm={6} md={6}>
              <h6 className="font-14">Action Type</h6>
              <p className="text-sm lh-150">{data?.action ?? '-'}</p>
            </Col>

            <Col sm={6} md={6}>
              <h6 className="font-14">Created At</h6>
              <p className="text-sm lh-150">
                {shortDateFormat(data?.created_at)}
              </p>
            </Col>

            <Col sm={6} md={6}>
              <h6 className="font-14">Qty</h6>
              <p className="text-sm lh-150">{data?.qty}</p>
            </Col>
            <Col sm={6} md={6}>
              <h6 className="font-14">Item Name</h6>
              <p className="text-sm lh-150">
                {data?.inventory_item_count.inventory_item?.name}
              </p>
            </Col>
            <Col sm={6} md={6}>
              <h6 className="font-14">Notes </h6>
              <p className="text-sm lh-150">{data?.notes}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default ViewInventoryItemStock;
