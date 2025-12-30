import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useCustomersDropdown from '../../../../hooks/dropdown/useCustomersDropdown';
import usePropertiesDropdown from '../../../../hooks/dropdown/usePropertiesDropdown';

type Props = {
  setFilters: Dispatch<SetStateAction<any>>;
};

const useFilterUbotSites = ({ setFilters }: Props) => {
  const [customer, setCustomer] = useState<number>();
  const [property, setProperty] = useState<number>();
  const [status, setStatus] = useState<boolean>();

  const [propertiesOptions, setPropertiesOptions] = useState<any[]>([]);

  const {
    customersDropdown: customersOptions,
    isFetchingCustomersDropdown: isFetchingCustomersOptions,
    isErrorCustomersDropdown: isErrorCustomersOptions,
  } = useCustomersDropdown();

  const {
    data: propertiesDropodwn,
    isFetching: isFetchingPropertiesDropdown,
    isError: isErrorPropertiesDropdown,
  } = usePropertiesDropdown(true, customer);

  useEffect(() => {
    setPropertiesOptions(propertiesDropodwn);
  }, [propertiesDropodwn]);

  useEffect(() => {
    prepareFilterParams();
  }, [customer, property, status]);

  const prepareFilterParams = () => {
    const params: any = {};
    if (customer) {
      params.customer_id = customer;
    }

    if (property) {
      params.customer_property_id = property;
    }

    if (status !== undefined) {
      params.status = status;
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
    status,
    setStatus,
    customersOptions,
    isFetchingCustomersOptions,
    isErrorCustomersOptions,
    propertiesOptions,
    isFetchingPropertiesDropdown,
    isErrorPropertiesDropdown,
    propagateOnCustomerChange,
  };
};

export default useFilterUbotSites;
