import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { prepareDynamicUrl } from '@uhub/helpers';
import { SUPPLEMENT_INVENTORY_VIEW } from '../constants/constant';
import useReadSupplementInventory from '../hooks/useReadSupplementInventory';
import SupplementInventoryInfo from '../components/SupplementInventoryInfo';
import SupplementInventoryTransactionTable from './SupplementInventoryTransactionTable';
import useUrlFilters from '../../../hooks/useUrlFilters';
import { SupplementInventoryTransactionParams } from '../types/SupplementInventory';
import { SUMMARY_LIST } from '../../summary/constants/constant';

const ViewSupplementInventory: React.FC = () => {
  const { id } = useParams();
  const title: string = 'Supplement Inventory';
  const [filters, setFilters] =
    useUrlFilters<SupplementInventoryTransactionParams>();

  const { data, isFetching, isError } = useReadSupplementInventory(id);
  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: `${title}`,
            path: SUMMARY_LIST,
            active: false,
          },
          {
            label: data?.supplement_name ?? `View ${title}`,
            path: prepareDynamicUrl(SUPPLEMENT_INVENTORY_VIEW, id),
            active: true,
          },
        ]}
        title={`${data?.supplement_name}`}
      />
      <Card>
        <Card.Body>
          {data && <SupplementInventoryInfo supplementInventory={data} />}
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          {data && (
            <SupplementInventoryTransactionTable
              isFetching={isFetching}
              data={data!.transactions}
              filters={filters}
              setFilters={setFilters}
            />
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default ViewSupplementInventory;
