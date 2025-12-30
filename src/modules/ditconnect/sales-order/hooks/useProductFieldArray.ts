import { DEFAULT_SALE_PRODUCT_FORM } from '../types/SalesOrder';
import { DynamicFormConfig } from '../../types/dynamicForm';
import useSuppplementWithGroup from '../../hooks/useSupplementWithGroup';

export default function useProductFieldArray() {
  const productFormConfig = (groupsOptions: any[]): DynamicFormConfig => {
    return {
      fields: [
        {
          name: 'supplement_id',
          type: 'group-select',
          placeholder: 'Select Supplement',
          groupedOptions: groupsOptions,
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
      defaultValues: DEFAULT_SALE_PRODUCT_FORM,
    };
  };
  const {
    supplementWithGroupOptions,
    isSupplementWithGroupFetching,
    isSupplementWithGroupError,
  } = useSuppplementWithGroup();

  return {
    formConfig: productFormConfig(supplementWithGroupOptions!),
    isFetching: isSupplementWithGroupFetching,
    isError: isSupplementWithGroupError,
  };
}
