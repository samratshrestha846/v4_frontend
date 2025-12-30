import React, { useEffect, useState } from 'react';
import {
  Control,
  FieldErrors,
  UseFormRegister,
  useWatch,
} from 'react-hook-form';
import { LabelNumericValue } from '@uhub/types/common';
import ReactSelect from '@uhub/components/ReactSelect';
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FormInput } from '@uhub/components';
import { dateString } from '@uhub/helpers';
import { StocktakeFormProps, StocktakeItemFormProps } from '../types/Stocktake';

type Props = {
  register: UseFormRegister<StocktakeFormProps>;
  control: Control<StocktakeFormProps>;
  errors: FieldErrors<StocktakeFormProps>;
  // eslint-disable-next-line no-unused-vars
  removeItem: (index: number) => void;
  supplmentOptions: LabelNumericValue[];
  indexKey: number;
  itemField: StocktakeItemFormProps;
  setValue: any;
};

const NotFoundStocktakeItemFormRow: React.FC<Props> = ({
  control,
  register,
  errors,
  removeItem,
  supplmentOptions,
  indexKey,
  itemField,
  setValue,
}) => {
  const [supplementSlug, setSupplementSlug] = useState<string | null>();

  const date = useWatch({
    control,
    name: 'date',
    defaultValue: null,
  });

  const newQuantity =
    useWatch({
      control,
      name: `not_found_stocktake_items.${indexKey}.new_qty`,
      defaultValue: null,
    }) ?? 0;

  useEffect(() => {
    if (date && newQuantity && supplementSlug) {
      // extract date part of batch_no
      const datePartOfBatchNo = itemField.batch_no
        ?.split('-')
        .slice(-3)
        .join('-');
      // extract quantity part of existing batch number
      const quantityPartOfBatchNo = itemField?.batch_no
        ? (itemField.batch_no.match(/\((\d+)\)/)?.[1] ?? null)
        : null;
      // prepare batch no
      const batchNo = `${supplementSlug}(${quantityPartOfBatchNo ?? newQuantity})${itemField?.batch_no ? `-${datePartOfBatchNo ?? dateString(date)}` : `-${dateString(date)}`}`;
      setValue(`not_found_stocktake_items.${indexKey}.batch_no`, batchNo);
    }
  }, [supplementSlug, newQuantity, setValue, indexKey, date]);

  useEffect(() => {
    setSupplementSlug(itemField?.supplement_slug);
  }, [itemField]);

  const propagateOnSupplementChange = (
    selected: LabelNumericValue & { slug: string }
  ) => {
    setSupplementSlug(selected?.slug);
  };

  return (
    <tr>
      <td>
        <div style={{ minWidth: '15rem' }}>
          <ReactSelect
            label=""
            name={`not_found_stocktake_items[${indexKey}][supplement_id]`}
            control={control}
            errors={errors}
            options={supplmentOptions}
            defaultSelected={supplmentOptions?.find(
              (item) => item.value === itemField.supplement_id
            )}
            propagateOnChange={propagateOnSupplementChange}
          />
          {errors &&
          errors.not_found_stocktake_items?.[indexKey as any]?.supplement_id ? (
            <Form.Control.Feedback type="invalid" className="d-block">
              {
                errors.not_found_stocktake_items?.[indexKey]?.supplement_id
                  ?.message
              }
            </Form.Control.Feedback>
          ) : null}
        </div>
      </td>
      <td>
        <FormInput
          label=""
          type="number"
          name={`not_found_stocktake_items[${indexKey}][new_qty]`}
          register={() =>
            register(`not_found_stocktake_items.${indexKey}.new_qty`)
          }
          control={control}
          errors={errors}
          className={
            errors.not_found_stocktake_items?.[indexKey as any]?.new_qty
              ? 'is-invalid'
              : ''
          }
        />
        {errors &&
        errors.not_found_stocktake_items?.[indexKey as any]?.new_qty ? (
          <Form.Control.Feedback type="invalid" className="d-block">
            {errors.not_found_stocktake_items?.[indexKey]?.new_qty?.message}
          </Form.Control.Feedback>
        ) : null}
      </td>

      <td>
        <FormInput
          label=""
          type="text"
          name={`not_found_stocktake_items[${indexKey}][batch_no]`}
          register={() =>
            register(`not_found_stocktake_items.${indexKey}.batch_no`)
          }
          control={control}
          errors={errors}
          className={
            errors.not_found_stocktake_items?.[indexKey as any]?.batch_no
              ? 'is-invalid'
              : ''
          }
        />
        {errors &&
        errors.not_found_stocktake_items?.[indexKey as any]?.batch_no ? (
          <Form.Control.Feedback type="invalid" className="d-block">
            {errors.not_found_stocktake_items?.[indexKey]?.batch_no?.message}
          </Form.Control.Feedback>
        ) : null}
      </td>

      <td>
        <FormInput
          label=""
          type="text"
          name={`not_found_stocktake_items[${indexKey}][notes]`}
          register={() =>
            register(`not_found_stocktake_items.${indexKey}.notes`)
          }
          control={control}
          errors={errors}
          className={
            errors.not_found_stocktake_items?.[indexKey as any]?.notes
              ? 'is-invalid'
              : ''
          }
        />
        {errors &&
        errors.not_found_stocktake_items?.[indexKey as any]?.notes ? (
          <Form.Control.Feedback type="invalid" className="d-block">
            {errors.not_found_stocktake_items?.[indexKey]?.notes?.message}
          </Form.Control.Feedback>
        ) : null}
      </td>
      <td>
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="remove-item"> Remove Item</Tooltip>}>
          <Button
            variant=""
            onClick={() => removeItem(indexKey)}
            type="button"
            className="btn btn-sm p-1 m-0 btn-outline-danger"
            aria-label="Remove Item">
            <i className="bx bx-trash" />
          </Button>
        </OverlayTrigger>
      </td>
    </tr>
  );
};

export default NotFoundStocktakeItemFormRow;
