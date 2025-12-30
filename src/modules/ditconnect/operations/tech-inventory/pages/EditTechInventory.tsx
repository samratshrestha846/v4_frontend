import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { prepareDynamicUrl } from '@uhub/helpers';
import {
  TECH_INVENTORY_EDIT,
  TECH_INVENTORY_LIST,
} from '../constants/constant';
import TechInventoryForm from './TechInventoryForm';
import useReadTechInventory from '../hooks/useReadTechInventory';
import { InventoryItemCount } from '../types/TechInventory';

const EditTechInventory: React.FC = () => {
  const { id } = useParams();

  const title: string = 'Tech Inventory';
  const { data, isFetching, isError } = useReadTechInventory(id);

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: TECH_INVENTORY_LIST, active: false },
          {
            label: `Edit ${title}`,
            path: prepareDynamicUrl(TECH_INVENTORY_EDIT, id),
            active: true,
          },
        ]}
        title={`Edit ${title}`}
      />
      <Card>
        <Card.Body>
          {data && (
            <TechInventoryForm
              defaultValues={{
                name: data.name,
                sku: data.sku,
                type: data.type,
                is_udose_item: data.is_udose_item,
                locations: data.inventory_item_counts.map(
                  (item: InventoryItemCount) => ({
                    location_id: item.location_id,
                    qty: item.qty,
                  })
                ),
              }}
            />
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default EditTechInventory;
