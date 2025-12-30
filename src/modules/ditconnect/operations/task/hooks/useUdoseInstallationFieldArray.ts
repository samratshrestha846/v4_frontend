import { LabelValue } from '@uhub/types/common';
import useDevicesDropdown from '@uhub/hooks/dropdown/useDevicesDropdown';
import usePropertiesDropdown from '@uhub/hooks/dropdown/usePropertiesDropdown';
import { DynamicFormConfig } from '../../../types/dynamicForm';
import {
  DEFAULT_UDOSE_INSTALLATION,
  rainfallSettingStatus,
} from '../types/Task';

export default function useUdoseInstallationFieldArray() {
  const formConfig = (
    deviceOptions: LabelValue[],
    siteOptions: LabelValue[]
  ): DynamicFormConfig => {
    return {
      fields: [
        {
          name: 'customer_property.id',
          type: 'select',
          placeholder: 'Select Customer Property',
          options: siteOptions,
          label: 'Customer Property',
        },

        {
          name: 'site_name',
          type: 'text',
          placeholder: 'Enter Site Name',
          label: 'Site Name',
        },
        {
          name: 'device.id',
          type: 'select',
          placeholder: 'Select Device',
          options: deviceOptions,
          label: 'Device',
        },
        {
          name: 'rainfall_setting',
          type: 'select',
          options: rainfallSettingStatus,
          label: 'Rainfall Setting',
          placeholder: 'Select Rainfall Setting',
        },
      ],
      defaultValues: DEFAULT_UDOSE_INSTALLATION,
    };
  };

  const {
    data: deviceOptions,
    isFetching: isDeviceOptionFetching,
    isError: isDeviceOptionError,
  } = useDevicesDropdown({});

  const {
    data: propertiesOptions,
    isFetching: isFetchingPropertiesOptions,
    isError: isErrorPropertiesOptions,
  } = usePropertiesDropdown();

  return {
    formConfig: formConfig(deviceOptions ?? [], propertiesOptions ?? []),
    isFetching: isDeviceOptionFetching || isFetchingPropertiesOptions,
    isError: isDeviceOptionError || isErrorPropertiesOptions,
  };
}
