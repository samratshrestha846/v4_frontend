import { useEffect, useState } from 'react';
import useCustomersDropdown from '../../../../hooks/dropdown/useCustomersDropdown';
import usePropertiesDropdown from '../../../../hooks/dropdown/usePropertiesDropdown';
import useRegionsDropdown from '../../../../hooks/dropdown/useRegionsDropdown';
import useCreditTypesDropdown from '../../../../hooks/dropdown/useCreditTypesDropdown';

type Props = {
  // eslint-disable-next-line no-unused-vars
  setFilters: (values: []) => void;
};

export default function useUdoseFilter({ setFilters }: Props) {
  const [customer, setCustomer] = useState<number>();
  const [property, setProperty] = useState<number>();
  const [region, setRegion] = useState<number>();
  const [status, setStatus] = useState<any>('');
  const [serviceType, setServiceType] = useState<string>('');
  const [dosingMode, setDosingMode] = useState<any>('');

  const [propertiesOptions, setPropertiesOptions] = useState<any[]>([]);

  const {
    customersDropdown: customersOptions,
    isFetchingCustomersDropdown: isFetchingCustomersOptions,
  } = useCustomersDropdown();

  const { data: propertiesDropodwn, isFetching: isFetchingPropertiesDropdown } =
    usePropertiesDropdown();

  const {
    regionsDropdown: regionsOptions,
    isFetchingRegionsDropdown: isFetchingRegionsOptions,
  } = useRegionsDropdown();

  const {
    data: serviceTypesOptions,
    isFetching: isFetchingServiceTypesOptions,
  } = useCreditTypesDropdown();

  useEffect(() => {
    setPropertiesOptions(propertiesDropodwn);
  }, [propertiesDropodwn]);

  useEffect(() => {
    prepareFilterParams();
  }, [customer, property, region, status, serviceType, dosingMode]);

  const prepareFilterParams = () => {
    const params: any = {};
    if (customer) {
      params['filterable[customer_id]'] = customer;
    }

    if (property) {
      params['filterable[property_id]'] = property;
    }

    if (region) {
      params['filterable[region_id]'] = region;
    }

    if (status !== '' && status !== undefined && status !== null) {
      params['filterable[status]'] = status;
    }

    if (serviceType) {
      params['filterable[credit_type]'] = serviceType;
    }

    if (dosingMode !== '' && dosingMode !== undefined && dosingMode !== null) {
      params['filterable[dosing_mode]'] = dosingMode;
    }
    setFilters(params);
  };

  const propagateOnCustomerChange = (selected: number) => {
    if (selected) {
      setPropertiesOptions(
        propertiesDropodwn?.filter((item: any) => item.customer_id === selected)
      );
    } else {
      setPropertiesOptions(propertiesDropodwn);
    }
  };

  return {
    customer,
    setCustomer,
    property,
    setProperty,
    region,
    setRegion,
    status,
    setStatus,
    serviceType,
    setServiceType,
    dosingMode,
    setDosingMode,
    customersOptions,
    isFetchingCustomersOptions,
    propertiesOptions,
    isFetchingPropertiesDropdown,
    regionsOptions,
    isFetchingRegionsOptions,
    serviceTypesOptions,
    isFetchingServiceTypesOptions,
    propagateOnCustomerChange,
  };
}
