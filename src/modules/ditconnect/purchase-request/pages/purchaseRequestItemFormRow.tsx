import React, { useEffect } from 'react';
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FormInput } from '@uhub/components';
import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  UseFormRegister,
  useWatch,
} from 'react-hook-form';
import { PurchaseRequestFormProps } from '../types/PurchaseRequest';

type Props = {
  register: UseFormRegister<PurchaseRequestFormProps>;
  control: Control<PurchaseRequestFormProps>;
  errors: FieldErrors<PurchaseRequestFormProps>;
  itemFields: FieldArrayWithId<
    PurchaseRequestFormProps,
    'purchase_request_items',
    'id'
  >[];
  // eslint-disable-next-line no-unused-vars
  removeItem: (index: number) => void;
  indexKey: number;
  setValue: any;
};
const PurchaseRequestItemFormRow: React.FC<Props> = ({
  register,
  control,
  errors,
  itemFields,
  removeItem,
  indexKey,
  setValue,
}) => {
  const qty = useWatch({
    control,
    name: `purchase_request_items.${indexKey}.qty`,
    defaultValue: null,
  });

  const rate = useWatch({
    control,
    name: `purchase_request_items.${indexKey}.rate`,
    defaultValue: null,
  });

  useEffect(() => {
    const total = (qty ?? 0) * (rate ?? 0);
    setValue(
      `purchase_request_items.${indexKey}.total`,
      Math.round(total * 10000) / 10000 // round-off to 4 digits
    );
  }, [qty, rate, setValue, indexKey]);

  return (
    <tr>
      <td>
        <FormInput
          label=""
          type="text"
          name={`purchase_request_items[${indexKey}][item_name]`}
          register={register}
          control={control}
          errors={errors}
          className={
            errors.purchase_request_items?.[indexKey as any]?.item_name
              ? 'is-invalid'
              : ''
          }
        />
        {errors &&
        errors.purchase_request_items?.[indexKey as any]?.item_name ? (
          <Form.Control.Feedback type="invalid" className="d-block">
            {errors.purchase_request_items?.[indexKey]?.item_name?.message}
          </Form.Control.Feedback>
        ) : null}
      </td>
      <td>
        <FormInput
          label=""
          type="text"
          name={`purchase_request_items[${indexKey}][unit]`}
          register={register}
          control={control}
          errors={errors}
          className={
            errors.purchase_request_items?.[indexKey as any]?.unit
              ? 'is-invalid'
              : ''
          }
        />
        {errors && errors.purchase_request_items?.[indexKey as any]?.unit ? (
          <Form.Control.Feedback type="invalid" className="d-block">
            {errors.purchase_request_items?.[indexKey]?.unit?.message}
          </Form.Control.Feedback>
        ) : null}
      </td>

      <td>
        <FormInput
          label=""
          type="number"
          name={`purchase_request_items[${indexKey}][qty]`}
          register={() => register(`purchase_request_items.${indexKey}.qty`)}
          control={control}
          errors={errors}
          step="0.0001"
          className={
            errors.purchase_request_items?.[indexKey as any]?.qty
              ? 'is-invalid'
              : ''
          }
        />
        {errors && errors.purchase_request_items?.[indexKey as any]?.qty ? (
          <Form.Control.Feedback type="invalid" className="d-block">
            {errors.purchase_request_items?.[indexKey]?.qty?.message}
          </Form.Control.Feedback>
        ) : null}
      </td>
      <td>
        <FormInput
          label=""
          type="number"
          name={`purchase_request_items[${indexKey}][rate]`}
          register={() => register(`purchase_request_items.${indexKey}.rate`)}
          control={control}
          errors={errors}
          step="0.0001"
          className={
            errors.purchase_request_items?.[indexKey as any]?.rate
              ? 'is-invalid'
              : ''
          }
        />
        {errors && errors.purchase_request_items?.[indexKey as any]?.rate ? (
          <Form.Control.Feedback type="invalid" className="d-block">
            {errors.purchase_request_items?.[indexKey]?.rate?.message}
          </Form.Control.Feedback>
        ) : null}
      </td>

      <td>
        <FormInput
          label=""
          type="number"
          name={`purchase_request_items[${indexKey}][total]`}
          register={() => register(`purchase_request_items.${indexKey}.total`)}
          control={control}
          errors={errors}
          step="0.0001"
          className={
            errors.purchase_request_items?.[indexKey as any]?.total
              ? 'is-invalid'
              : ''
          }
          readOnly
        />
        {errors && errors.purchase_request_items?.[indexKey as any]?.total ? (
          <Form.Control.Feedback type="invalid" className="d-block">
            {errors.purchase_request_items?.[indexKey]?.total?.message}
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
            aria-label="Remove Item"
            disabled={itemFields?.length === 1}>
            <i className="bx bx-trash" />
          </Button>
        </OverlayTrigger>
      </td>
    </tr>
  );
};

export default PurchaseRequestItemFormRow;
