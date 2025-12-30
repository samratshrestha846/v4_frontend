/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { FormInput } from '@uhub/components';
import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { PurchaseRequestFormProps } from '../types/PurchaseRequest';
import PurchaseRequestItemFormRow from './purchaseRequestItemFormRow';

type Props = {
  register: UseFormRegister<PurchaseRequestFormProps>;
  control: Control<PurchaseRequestFormProps>;
  errors: FieldErrors<PurchaseRequestFormProps>;
  itemFields: FieldArrayWithId<
    PurchaseRequestFormProps,
    'purchase_request_items',
    'id'
  >[];
  addItem: () => void;
  // eslint-disable-next-line no-unused-vars
  removeItem: (index: number) => void;
  setValue: UseFormSetValue<PurchaseRequestFormProps>;
};
const PurchaseRequestItemForm: React.FC<Props> = ({
  register,
  control,
  errors,
  itemFields,
  addItem,
  removeItem,
  setValue,
}) => {
  return (
    <>
      <h5 className="my-3 text-uppercase text-soft-gray">Items</h5>
      <div className="table-responsive table-no-min-height">
        <Table bordered size="sm">
          <thead className="thead-bg-light">
            <tr>
              <th className="text-center">Name</th>
              <th className="text-center">Unit</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Rate</th>
              <th className="text-center">Total</th>
              <th className="text-center">{}</th>
            </tr>
          </thead>
          <tbody>
            {itemFields?.map((_, indexKey) => (
              <PurchaseRequestItemFormRow
                key={indexKey}
                indexKey={indexKey}
                control={control}
                errors={errors}
                register={register}
                setValue={setValue}
                removeItem={removeItem}
                itemFields={itemFields}
              />
            ))}
            <tr>
              <td colSpan={3}>
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
              <td className="text-end fw-bold">Grand Total</td>
              <td>
                <FormInput
                  label=""
                  type="number"
                  name="total_price"
                  register={register}
                  control={control}
                  errors={errors}
                  step="0.0001"
                  readOnly
                />
              </td>
              <td>{}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default PurchaseRequestItemForm;
