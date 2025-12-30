import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import apiDropdown from '../../helpers/api/dropdown';
import { LabSampleDropdownQueryParams } from '../../types/lab/labSampleList';
import useUdoseSitesDropdown from './useUdoseSitesDropdown';
import { LabelNumericValueDropdown } from '../../types/common';

export default function useLabSamplesDropdown(
  showModal: boolean,
  labReportId?: number
) {
  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState<string>();
  const [labSampleType, setLabSampleType] = useState<number>();
  const [site, setSite] = useState<number>();
  const [property, setProperty] = useState<number>();
  const [siteDropdownOptions, setSiteDropdownOptions] =
    useState<LabelNumericValueDropdown[]>();

  const {
    data: sitesOptions,
    isFetching: isFetchingSitesOptions,
    isError: isErrorSitesOptions,
  } = useUdoseSitesDropdown(property);

  const fetchLabSamplesDropdown = () => {
    const params: LabSampleDropdownQueryParams = { page: pageNumber + 1 };

    if (labSampleType) {
      params.lab_sample_type_id = labSampleType;
    }

    if (property) {
      params.customer_property_id = property;
    }

    if (site) {
      params.site_id = site;
    }

    if (search) {
      params.search = search;
    }

    if (labReportId) {
      params.lab_report_id = labReportId;
    }

    return apiDropdown.fetchLabSamplesDropdown(params);
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: [
      'lab-samples-dropdown',
      pageNumber,
      labSampleType,
      search,
      property,
      site,
    ],
    queryFn: fetchLabSamplesDropdown,
    enabled: !!showModal,
  });

  const handlePageChange = (e: any): void => {
    setPageNumber(e.selected);
  };

  const handleSearchOnChange = debounce((e): void => {
    setSearch(e.target.value);
    setPageNumber(0);
  }, 300);

  useEffect(() => {
    if (sitesOptions) {
      setSiteDropdownOptions(sitesOptions);
    }
  }, [sitesOptions]);

  return {
    data,
    isFetching,
    isFetched,
    isError,
    search,
    setSearch,
    labSampleType,
    setLabSampleType,
    pageNumber,
    handlePageChange,
    handleSearchOnChange,
    site,
    setSite,
    property,
    setProperty,
    siteDropdownOptions,
    isFetchingSitesOptions,
    isErrorSitesOptions,
  };
}
