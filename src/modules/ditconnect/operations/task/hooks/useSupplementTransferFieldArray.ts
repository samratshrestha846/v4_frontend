import { LabelValue } from '@uhub/types/common';
import { useEffect, useRef, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { DynamicFormConfig } from '../../../types/dynamicForm';
import useSuppplementWithGroup from '../../../hooks/useSupplementWithGroup';
import useDitConnectLocationDropDown from '../../../hooks/useDitConnectLocationDropDown';
import { GroupedOption } from '../../../types/ditConnect';
import { ISupplement } from '../../production-request/types/productionRequest';
import { SUPPLEMENT_INVENTORIES_DROPDOWN } from '../constants/constant';
import { DEFAULT_SUPPLEMENT_TRANSFER } from '../types/Task';
import HttpApi from '../../../Http/http';

export default function useSupplementTransferFieldArray(control: any) {
  const apiCore = new HttpApi();
  const [batchOptions, setBatchOptions] = useState<{
    [key: number]: LabelValue[];
  }>({});

  const formConfig = (
    groupsOptions: GroupedOption<ISupplement>[],
    locationOptions: LabelValue[]
  ): DynamicFormConfig => {
    return {
      fields: [
        {
          name: 'supplement.id',
          type: 'group-select',
          placeholder: 'Select Supplement',
          groupedOptions: groupsOptions,
          label: 'Supplement',
        },

        {
          name: 'from_location.id',
          type: 'select',
          placeholder: 'Select From Location',
          options: locationOptions,
          label: 'From Location',
        },
        {
          name: 'to_location.id',
          type: 'select',
          options: locationOptions,
          label: 'To Location',
          placeholder: 'To Location',
        },
        {
          name: 'batch_no',
          type: 'select',
          placeholder: 'Select Batch Number',
          label: 'Batch Number',
          options: (index: number) => batchOptions[index] ?? [],
        },
        {
          name: 'qty',
          type: 'number',
          placeholder: 'Enter Quantity',
          label: 'Quantity',
        },
      ],
      defaultValues: DEFAULT_SUPPLEMENT_TRANSFER,
    };
  };
  const watchedFields = useWatch({ control, name: 'descriptions' });

  const { locationOptions, isFetchingLocationOptions, isErrorLocationOptions } =
    useDitConnectLocationDropDown();
  const {
    supplementWithGroupOptions,
    isSupplementWithGroupFetching,
    isSupplementWithGroupError,
  } = useSuppplementWithGroup();

  const fetchedBatchOptions = useRef(new Set<string>());

  const fetchBatchOptions = async (
    supplementId: number,
    locationId: number,
    index: number
  ) => {
    const key = `${supplementId}-${locationId}-${index}`;

    if (fetchedBatchOptions.current.has(key)) return;

    const response = await apiCore.get(SUPPLEMENT_INVENTORIES_DROPDOWN, {
      supplement_id: supplementId,
      location_id: locationId,
    });

    const transformedOptions: LabelValue[] = response.data.data.map(
      (item: any) => ({
        value: item?.batch_number,
        label: `${item?.batch_number}`,
      })
    );

    setBatchOptions((prev) => ({ ...prev, [index]: transformedOptions }));

    fetchedBatchOptions.current.add(key);
  };
  useEffect(() => {
    watchedFields.forEach((field: any, index: number) => {
      if (field.supplement?.id && field.from_location?.id) {
        fetchBatchOptions(field.supplement.id, field.from_location.id, index);
      }
    });
  }, [watchedFields]);
  return {
    formConfig: formConfig(
      supplementWithGroupOptions ?? [],
      locationOptions ?? []
    ),
    isFetching: isSupplementWithGroupFetching || isFetchingLocationOptions,
    isError: isSupplementWithGroupError || isErrorLocationOptions,
  };
}
