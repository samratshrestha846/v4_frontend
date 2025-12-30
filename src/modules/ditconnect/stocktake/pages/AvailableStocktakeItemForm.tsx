/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Table } from 'react-bootstrap';
import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';
import ReactSelect from '@uhub/components/ReactSelect';
import { FormInput } from '@uhub/components';
import NoDataAvailable from '@uhub/components/NoDataAvailable';
import { StocktakeFormProps } from '../types/Stocktake';

type Props = {
  register: UseFormRegister<StocktakeFormProps>;
  control: Control<StocktakeFormProps>;
  errors: FieldErrors<StocktakeFormProps>;
  itemFields: FieldArrayWithId<
    StocktakeFormProps,
    'available_stocktake_items',
    'id'
  >[];
};
const AvailableStocktakeItemForm: React.FC<Props> = ({
  register,
  control,
  errors,
  itemFields,
}) => {
  return (
    <>
      <h5 className="my-3 text-uppercase text-soft-gray">Available Products</h5>
      <Table bordered size="sm">
        <thead className="thead-bg-light">
          <tr>
            <th className="text-center">Product</th>
            <th className="text-center">Batch No.</th>
            <th className="text-center">Quantity</th>
            <th className="text-center">New Quantity</th>
            <th className="text-center">Notes</th>
          </tr>
        </thead>
        <tbody>
          {itemFields?.length > 0 ? (
            itemFields?.map((itemField, indexKey) => (
              <tr key={indexKey}>
                <td>
                  <div style={{ minWidth: '15rem' }}>
                    <ReactSelect
                      label=""
                      name={`available_stocktake_items[${indexKey}][supplement_id]`}
                      control={control}
                      errors={errors}
                      options={[
                        {
                          label: itemField.supplement_name,
                          value: itemField.supplement_id,
                        },
                      ]}
                      defaultSelected={{
                        label: itemField.supplement_name,
                        value: itemField.supplement_id,
                      }}
                      isDisabled
                    />
                    {errors &&
                    errors.available_stocktake_items?.[indexKey as any]
                      ?.supplement_id ? (
                      <Form.Control.Feedback type="invalid" className="d-block">
                        {
                          errors.available_stocktake_items?.[indexKey]
                            ?.supplement_id?.message
                        }
                      </Form.Control.Feedback>
                    ) : null}
                  </div>
                </td>
                <td>
                  <FormInput
                    label=""
                    type="text"
                    name={`available_stocktake_items[${indexKey}][batch_no]`}
                    register={register}
                    control={control}
                    errors={errors}
                    className={
                      errors.available_stocktake_items?.[indexKey as any]
                        ?.batch_no
                        ? 'is-invalid'
                        : ''
                    }
                    readOnly
                  />
                  {errors &&
                  errors.available_stocktake_items?.[indexKey as any]
                    ?.batch_no ? (
                    <Form.Control.Feedback type="invalid" className="d-block">
                      {
                        errors.available_stocktake_items?.[indexKey]?.batch_no
                          ?.message
                      }
                    </Form.Control.Feedback>
                  ) : null}
                </td>

                <td>
                  <FormInput
                    label=""
                    type="number"
                    name={`available_stocktake_items[${indexKey}][available_qty]`}
                    register={() =>
                      register(
                        `available_stocktake_items.${indexKey}.available_qty`
                      )
                    }
                    control={control}
                    errors={errors}
                    className={
                      errors.available_stocktake_items?.[indexKey as any]
                        ?.available_qty
                        ? 'is-invalid'
                        : ''
                    }
                    readOnly
                  />
                  {errors &&
                  errors.available_stocktake_items?.[indexKey as any]
                    ?.available_qty ? (
                    <Form.Control.Feedback type="invalid" className="d-block">
                      {
                        errors.available_stocktake_items?.[indexKey]
                          ?.available_qty?.message
                      }
                    </Form.Control.Feedback>
                  ) : null}
                </td>
                <td>
                  <FormInput
                    label=""
                    type="number"
                    name={`available_stocktake_items[${indexKey}][new_qty]`}
                    register={() =>
                      register(`available_stocktake_items.${indexKey}.new_qty`)
                    }
                    control={control}
                    errors={errors}
                    className={
                      errors.available_stocktake_items?.[indexKey as any]
                        ?.new_qty
                        ? 'is-invalid'
                        : ''
                    }
                  />
                  {errors &&
                  errors.available_stocktake_items?.[indexKey as any]
                    ?.new_qty ? (
                    <Form.Control.Feedback type="invalid" className="d-block">
                      {
                        errors.available_stocktake_items?.[indexKey]?.new_qty
                          ?.message
                      }
                    </Form.Control.Feedback>
                  ) : null}
                </td>

                <td>
                  <FormInput
                    label=""
                    type="text"
                    name={`available_stocktake_items[${indexKey}][notes]`}
                    register={() =>
                      register(`available_stocktake_items.${indexKey}.notes`)
                    }
                    control={control}
                    errors={errors}
                    className={
                      errors.available_stocktake_items?.[indexKey as any]?.notes
                        ? 'is-invalid'
                        : ''
                    }
                  />
                  {errors &&
                  errors.available_stocktake_items?.[indexKey as any]?.notes ? (
                    <Form.Control.Feedback type="invalid" className="d-block">
                      {
                        errors.available_stocktake_items?.[indexKey]?.notes
                          ?.message
                      }
                    </Form.Control.Feedback>
                  ) : null}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>
                <NoDataAvailable />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default AvailableStocktakeItemForm;
