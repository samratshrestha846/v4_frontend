import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { prepareDynamicUrl } from '@uhub/helpers';
import { SUPPLEMENT_INVENTORY_LIST } from '../constants/constant';
import SupplementInventoryForm from './SupplementInventoryForm';
import useReadSupplementInventory from '../hooks/useReadSupplementInventory';
import { SupplementInventoryAdjustmentFormProps } from '../types/SupplementInventory';
import SupplementInventoryInfo from '../components/SupplementInventoryInfo';
import { SUMMARY_LIST } from '../../summary/constants/constant';

const AdjustSupplementInventory: React.FC = () => {
  const { id } = useParams();

  const title: string = 'Supplement Inventory';
  const defaultValues: SupplementInventoryAdjustmentFormProps = {
    adj_qty: null,
    dates: new Date(),
    notes: null,
  };

  const { data, isFetching, isError } = useReadSupplementInventory(id);

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: SUMMARY_LIST, active: false },
          {
            label: `Adjust ${title}`,
            path: prepareDynamicUrl(SUPPLEMENT_INVENTORY_LIST, id),
            active: true,
          },
        ]}
        title={`Adjust ${title}`}
      />
      <Card>
        <Card.Body>
          {data && <SupplementInventoryInfo supplementInventory={data} />}
        </Card.Body>
      </Card>
      <PageTitle
        breadCrumbItems={[
          {
            label: `${title}`,
            path: SUPPLEMENT_INVENTORY_LIST,
            active: false,
          },
          {
            label: `Adjust ${title}`,
            path: prepareDynamicUrl(SUPPLEMENT_INVENTORY_LIST, id),
            active: true,
          },
        ]}
        title="Adjust Form"
      />
      <Card>
        <Card.Body>
          <SupplementInventoryForm defaultValues={defaultValues} />
        </Card.Body>
      </Card>
    </>
  );
};

export default AdjustSupplementInventory;
