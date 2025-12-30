import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { STOCKTAKE_ADD, STOCKTAKE_LIST } from '../constants/constant';
import StocktakeForm from './StocktakeForm';
import { StocktakeFormProps } from '../types/Stocktake';

const AddStocktake: React.FC = () => {
  const title: string = 'Stocktake';
  const defaultValues: StocktakeFormProps = {
    id: null,
    date: new Date(),
    location_id: null,
    notes: null,
    available_stocktake_items: [],
    not_found_stocktake_items: [],
  };
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title} List`, path: STOCKTAKE_LIST, active: false },
          {
            label: `Add ${title}`,
            path: STOCKTAKE_ADD,
            active: true,
          },
        ]}
        title={`Add ${title}`}
      />
      <Card>
        <Card.Body>
          <StocktakeForm defaultValues={defaultValues} />
        </Card.Body>
      </Card>
    </>
  );
};

export default AddStocktake;
