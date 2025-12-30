import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { prepareDynamicUrl } from '@uhub/helpers';
import { STOCKTAKE_EDIT, STOCKTAKE_LIST } from '../constants/constant';
import StocktakeForm from './StocktakeForm';
import useReadStocktake from '../hooks/useReadStocktake';
import { StocktakeFormProps, StocktakeResponse } from '../types/Stocktake';

const EditStocktake: React.FC = () => {
  const { id } = useParams();

  const title: string = 'Stocktake';
  const { data, isFetching, isError } = useReadStocktake(id);

  const prepareDefaultValues = (fetchedData: StocktakeResponse) => {
    const values: StocktakeFormProps = {
      id: fetchedData.id,
      date: new Date(fetchedData.date),
      location_id: fetchedData.location.id,
      available_stocktake_items: fetchedData?.available_stocktake_items?.map(
        (item) => ({
          id: item.id,
          supplement_id: item.supplement_id,
          supplement_name: item.supplement?.name,
          supplement_slug: item.supplement?.slug,
          batch_no: item.batch_no,
          available_qty: item.available_qty,
          new_qty: item.new_qty,
          notes: item.notes,
        })
      ),
      not_found_stocktake_items: fetchedData?.not_found_stocktake_items?.map(
        (item) => ({
          id: item.id,
          supplement_id: item.supplement_id,
          supplement_name: item.supplement?.name,
          supplement_slug: item.supplement?.slug,
          batch_no: item.batch_no,
          available_qty: item.available_qty,
          new_qty: item.new_qty,
          notes: item.notes,
        })
      ),
      notes: fetchedData.notes,
    };
    return values;
  };

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title} List`, path: STOCKTAKE_LIST, active: false },
          {
            label: `Edit ${title}`,
            path: prepareDynamicUrl(STOCKTAKE_EDIT, id),
            active: true,
          },
        ]}
        title={`Edit ${title}`}
      />
      <Card>
        <Card.Body>
          {data && <StocktakeForm defaultValues={prepareDefaultValues(data)} />}
        </Card.Body>
      </Card>
    </>
  );
};

export default EditStocktake;
