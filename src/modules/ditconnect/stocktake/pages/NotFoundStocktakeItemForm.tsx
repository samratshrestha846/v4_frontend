/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Table } from 'react-bootstrap';
import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';
import { LabelNumericValue } from '@uhub/types/common';
import { StocktakeFormProps } from '../types/Stocktake';
import NotFoundStocktakeItemFormRow from './NotFoundStocktakeItemFormRow';

type Props = {
  register: UseFormRegister<StocktakeFormProps>;
  control: Control<StocktakeFormProps>;
  errors: FieldErrors<StocktakeFormProps>;
  itemFields: FieldArrayWithId<
    StocktakeFormProps,
    'not_found_stocktake_items',
    'id'
  >[];
  addItem: () => void;
  // eslint-disable-next-line no-unused-vars
  removeItem: (index: number) => void;
  supplmentOptions: LabelNumericValue[];
  setValue: any;
};
const NotFoundStocktakeItemForm: React.FC<Props> = ({
  register,
  control,
  errors,
  itemFields,
  addItem,
  removeItem,
  supplmentOptions,
  setValue,
}) => {
  return (
    <>
      <h5 className="my-3 text-uppercase text-soft-gray">Not Found Products</h5>
      <Table bordered size="sm">
        <thead className="thead-bg-light">
          <tr>
            <th className="text-center">Product</th>
            <th className="text-center">Quantity</th>
            <th className="text-center">Batch No.</th>
            <th className="text-center">Notes</th>
            <th className="text-center">{}</th>
          </tr>
        </thead>
        <tbody>
          {itemFields?.map((itemField, indexKey) => (
            <NotFoundStocktakeItemFormRow
              key={indexKey}
              control={control}
              register={register}
              errors={errors}
              removeItem={removeItem}
              itemField={itemField}
              indexKey={indexKey}
              supplmentOptions={supplmentOptions}
              setValue={setValue}
            />
          ))}
          <tr>
            <td colSpan={6}>
              <div className="d-flex justify-content-center align-items-center">
                <Button
                  variant=""
                  onClick={addItem}
                  className="border-dashed-success px-5 flex-grow-1"
                  size="sm">
                  <i className="bx bx-plus ms-1 text-success" />
                  <span className="text-success">Add Item</span>
                </Button>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default NotFoundStocktakeItemForm;
