import { Control, useWatch } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { LabelValue } from '@uhub/types/common';
import useDropDown from '../../../hooks/useDropDown';
import {
  INPUT_TYPE_DROPDOWN,
  RESPONSE_SET_DROPDOWN,
} from '../constants/constant';
import {
  DEFAULT_INPUT_FIELDS,
  InputType,
  InputTypeField,
  TemplateFormProps,
} from '../types/Template';
import { FieldConfig } from '../../../types/dynamicForm';

export default function useInputFieldArray(
  control: Control<TemplateFormProps>
) {
  const transform = (data: any) => data;
  const {
    data: inputTypeOptions,
    isFetching,
    isError,
  } = useDropDown<InputType[]>(INPUT_TYPE_DROPDOWN, transform);
  const {
    data: responseSetOptions,
    isFetching: isResponseSetFetching,
    isError: isResponseSetError,
  } = useDropDown<LabelValue[]>(RESPONSE_SET_DROPDOWN);
  const [visibleFields, setVisibleFields] = useState<{
    [key: number]: string[];
  }>({});
  const formConfig = () => {
    const inputFieldOptions = inputTypeOptions?.map((inputType: InputType) => ({
      value: inputType.id,
      label: inputType.name,
    }));

    const fields: FieldConfig[] = [
      {
        name: 'form_label',
        type: 'text',
        placeholder: 'Enter your question here',
      },
      {
        name: 'input_type_id',
        type: 'select',
        placeholder: 'Select Type',
        options: inputFieldOptions!,
      },
      {
        name: 'response_set_id',
        type: 'select',
        placeholder: 'Select Input Type',
        isHidden: (index: number) =>
          !visibleFields[index]?.includes('response_set_id'),
        options: responseSetOptions,
      },
      {
        name: 'is_paragraph',
        type: 'checkbox',
        label: 'Is Paragrah',
        isHidden: (index: number) =>
          !visibleFields[index]?.includes('is_paragraph'),
      },
      {
        name: 'min',
        type: 'number',
        placeholder: 'Enter Min',
        isHidden: (index: number) => !visibleFields[index]?.includes('min'),
      },
      {
        name: 'max',
        type: 'number',
        placeholder: 'Enter Man',
        isHidden: (index: number) => !visibleFields[index]?.includes('max'),
      },
      {
        name: 'enable_date',
        type: 'checkbox',
        label: 'Enable Date',

        isHidden: (index: number) =>
          !visibleFields[index]?.includes('enable_date'),
      },
      {
        name: 'enable_time',
        type: 'checkbox',
        label: 'Enable Time',
        isHidden: (index: number) =>
          !visibleFields[index]?.includes('enable_time'),
      },
      {
        name: 'is_required',
        type: 'checkbox',
        label: 'Is Required',
        isHidden: (index: number) =>
          !visibleFields[index]?.includes('is_required'),
      },
    ];

    return {
      fields,
      defaultValues: DEFAULT_INPUT_FIELDS,
    };
  };

  const inputFields = useWatch({ control, name: 'inputFields' });

  useEffect(() => {
    const updatedVisibleFields: { [key: number]: string[] } = {};

    inputFields.forEach((inputField: InputTypeField, index) => {
      const inputTypeOpt = inputTypeOptions?.find(
        (d: InputType) => d.id === inputField.input_type_id
      );

      if (inputTypeOpt) {
        updatedVisibleFields[index] = inputTypeOpt.options;
      }
    });

    setVisibleFields(updatedVisibleFields);
  }, [inputFields, inputTypeOptions]);

  return {
    formConfig: formConfig(),
    isFetching: isFetching || isResponseSetFetching,
    isError: isError || isResponseSetError,
  };
}
