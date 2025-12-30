import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';

import carbonCreditAccounting from '../../../../helpers/api/carbonCreditAccounting';
import { prepareDateRangeFilterParams } from '../../../../helpers/filterHelper';
import { CarbonEmissionReductionSummaryQueryParams } from '../../../../types/carbon-accounting/carbonAccounting';
import {
  CC_DURATION_CUSTOM_DATE,
  CC_DURATION_THREE_MONTHS,
} from '../../../../constants/durationOptions';
import useCustomersDropdown from '../../../../hooks/dropdown/useCustomersDropdown';
import usePropertiesDropdown from '../../../../hooks/dropdown/usePropertiesDropdown';
import useUdoseSitesDropdown from '../../../../hooks/dropdown/useUdoseSitesDropdown';
import { CustomDateRange } from '../../../../types/common';

export default function useFetchCarbonEmissionReductionSummary() {
  // filter variables
  const [customer, setCustomer] = useState<number>();
  const [property, setProperty] = useState<number>();
  const [site, setSite] = useState<number>();
  const [duration, setDuration] = useState<string>(CC_DURATION_THREE_MONTHS);
  const [customDateRange, setCustomDateRange] = useState<CustomDateRange>({
    from_date: undefined,
    to_date: undefined,
  });

  // customers dropdown options
  const {
    customersDropdown: customersOptions,
    isFetchingCustomersDropdown: isFetchingCustomersOptions,
    isErrorCustomersDropdown: isErrorCustomersOptions,
  } = useCustomersDropdown();

  // properties dropdown options
  const {
    data: propertiesOptions,
    isFetching: isFetchingPropertiesOptions,
    isError: isErrorPropertiesOptions,
  } = usePropertiesDropdown(true, customer);

  // sites dropdown options
  const {
    data: sitesOptions,
    isFetching: isFetchingSitesOptions,
    isError: isErrorSitesOptions,
  } = useUdoseSitesDropdown(property);

  // Prepare filter query params
  const prepareQueryParams = () => {
    const params: CarbonEmissionReductionSummaryQueryParams = {};

    if (customer) {
      params.customer_id = customer;
    }

    if (property) {
      params.customer_property_id = property;
    }

    if (site) {
      params.site_id = site;
    }

    if (duration === CC_DURATION_CUSTOM_DATE) {
      params.date_from = moment(customDateRange.from_date).format('YYYY-MM-DD');
      params.date_to = moment(customDateRange.to_date).format('YYYY-MM-DD');
    } else {
      const { as_of_date_from: dateFrom, as_of_date_to: dateTo } =
        prepareDateRangeFilterParams(duration);
      params.date_from = moment(dateFrom).format('YYYY-MM-DD');
      params.date_to = moment(dateTo).format('YYYY-MM-DD');
    }
    return params;
  };

  const fetchCarbonEmissionReductionsSummary = () => {
    const params = prepareQueryParams();
    return carbonCreditAccounting.fetchCarbonEmissionReductionsSummary(params);
  };

  const { data, isFetching, isError } = useQuery({
    queryFn: fetchCarbonEmissionReductionsSummary,
    queryKey: [
      'fetch-carbon-emission-reductions-summary',
      customer,
      property,
      site,
      customDateRange,
    ],
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isFetching,
    isError,
    customer,
    setCustomer,
    property,
    setProperty,
    site,
    setSite,
    duration,
    setDuration,
    customDateRange,
    setCustomDateRange,
    customersOptions,
    isFetchingCustomersOptions,
    isErrorCustomersOptions,
    propertiesOptions,
    isFetchingPropertiesOptions,
    isErrorPropertiesOptions,
    sitesOptions,
    isFetchingSitesOptions,
    isErrorSitesOptions,
  };
}
