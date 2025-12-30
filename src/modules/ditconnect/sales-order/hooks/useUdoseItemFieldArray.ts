/* eslint-disable no-unused-vars */
import { LabelValue } from '@uhub/types/common';
import useDropDown from '../../hooks/useDropDown';
import { DEFAULT_UDOSE_INVENTORY_ITEM_FORM } from '../types/SalesOrder';
import { UDOSE_INVENTORY_ITEM_DROP_DOWN } from '../constants/constant';
import { DynamicFormConfig } from '../../types/dynamicForm';

export default function useUdoseItemFieldArray() {
  const {
    data: udoseOptions,
    isFetching,
    isError,
  } = useDropDown<LabelValue[]>(UDOSE_INVENTORY_ITEM_DROP_DOWN);
  const formConfig: DynamicFormConfig = {
    fields: [
      {
        name: 'inventory_item_id',
        type: 'select',
        placeholder: 'Select Inventory item',
        options: udoseOptions!,
      },
      {
        name: 'qty',
        type: 'number',
        placeholder: 'Enter Quantity',
        step: '0.01',
      },
      {
        name: 'rate',
        type: 'number',
        placeholder: 'Enter Rate',
        step: '0.01',
      },
      {
        name: 'total',
        type: 'number',
        placeholder: 'Enter Total',
        step: '0.01',
      },
    ],
    defaultValues: DEFAULT_UDOSE_INVENTORY_ITEM_FORM,
  };
  return {
    formConfig,
    isFetching,
    isError,
  };
}
