import { LabelValue } from '@uhub/types/common';
import useDropDown from '../../hooks/useDropDown';
import { DEFAULT_ADDITIONAL_ITEM_FORM } from '../types/SalesOrder';
import { ADDITION_ITEM_DROP_DOWN } from '../constants/constant';
import { DynamicFormConfig } from '../../types/dynamicForm';

export default function useAdditionItemFieldArray() {
  const {
    data: additionalItemOptions,
    isFetching,
    isError,
  } = useDropDown<LabelValue[]>(ADDITION_ITEM_DROP_DOWN);
  const formConfig: DynamicFormConfig = {
    fields: [
      {
        name: 'item_name',
        type: 'select',
        placeholder: 'Select Item Name',
        options: additionalItemOptions!,
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
    defaultValues: DEFAULT_ADDITIONAL_ITEM_FORM,
  };
  return {
    formConfig,
    isFetching,
    isError,
  };
}
