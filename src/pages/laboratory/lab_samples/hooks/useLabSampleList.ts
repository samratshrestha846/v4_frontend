import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';
import apiLabSample from '../../../../helpers/api/labSample';
import useCustomersDropdown from '../../../../hooks/dropdown/useCustomersDropdown';
import usePropertiesDropdown from '../../../../hooks/dropdown/usePropertiesDropdown';
import useUdoseSitesDropdown from '../../../../hooks/dropdown/useUdoseSitesDropdown';
import useLabSampleTypesDropdown from '../../../../hooks/dropdown/useLabSampleTypesDropdown';
import { LabSampleQuery } from '../../../../types/lab/labSampleList';

const useLabSampleList = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState('');

  const [customer, setCustomer] = useState<number>();
  const [property, setProperty] = useState<number>();
  const [sampleType, setSampleType] = useState<number>();
  const [site, setSite] = useState<number>();

  const [propertiesOptions, setPropertiesOptions] = useState<any[]>([]);
  const [sitesOptions, setSitesOptions] = useState<any[]>([]);

  const [isExportReport, isSetExportReport] = useState<boolean>(false);

  const {
    customersDropdown: customersOptions,
    isFetchingCustomersDropdown: isFetchingCustomersOptions,
  } = useCustomersDropdown();

  const { data: propertiesDropodwn, isFetching: isFetchingPropertiesDropdown } =
    usePropertiesDropdown();

  const {
    data: sitesDropdown,
    isFetching: isFetchingSitesDropdown,
    isSuccess: isSuccessSiteOptions,
  } = useUdoseSitesDropdown(property);

  useEffect(() => {
    setPropertiesOptions(propertiesDropodwn);
  }, [propertiesDropodwn, sitesDropdown]);

  const prepareQueryParams = () => {
    const params: LabSampleQuery = { page: pageNumber + 1 };
    if (search) {
      params.search = search;
    }

    if (customer) {
      params.customer_id = customer;
    }

    if (property) {
      params.customer_property_id = property;
    }

    if (sampleType) {
      params.lab_sample_type_id = sampleType;
    }

    if (site) {
      params.site_id = site;
    }
    return params;
  };

  const fetchLabSamples = () => {
    const params: LabSampleQuery = prepareQueryParams();
    return apiLabSample.fetchLabSamples(params);
  };

  const { data, isFetching, isError } = useQuery(
    ['lab-samples', search, pageNumber, customer, property, sampleType, site],
    fetchLabSamples,
    { refetchOnWindowFocus: false }
  );

  const {
    data: labSampleTypesOptions,
    isFetching: isFetchingLabSampleTypesOptions,
  } = useLabSampleTypesDropdown();

  const exportLabSampleReport = () => {
    if (sampleType) {
      const params: LabSampleQuery = prepareQueryParams();
      delete params.page;
      return apiLabSample.exportLabSampleReport(params);
    }
    toast.warning('Please select sample type to export report.');
    return null;
  };

  const {
    data: exportedReport,
    isFetching: isFetchingReport,
    isFetched: isFetchedReport,
  } = useQuery({
    queryKey: ['export-lab-report', isExportReport],
    queryFn: exportLabSampleReport,
    refetchOnWindowFocus: false,
    enabled: !!isExportReport,
  });

  const downloadLabSampleReport = (details: {
    fileData: Blob;
    fileName: string;
    fileExtension: string;
  }) => {
    const url = window.URL.createObjectURL(details.fileData);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${details.fileName}.${details.fileExtension}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    return null;
  };

  useEffect(() => {
    if (exportedReport && isFetchedReport) {
      downloadLabSampleReport({
        fileData: exportedReport,
        fileName: `Lab-Sample-Report ${new Date()}`,
        fileExtension: 'xlsx',
      });
      isSetExportReport(false);
    }
  }, [isFetchedReport]);

  const handlePageChange = (e: any): void => {
    setPageNumber(e.selected);
  };

  const handleExportReport = () => {
    if (sampleType) {
      isSetExportReport(true);
      return null;
    }
    toast.warning('Please select sample type to export report.');
    return null;
  };

  const handleSearchOnChange = debounce((e): void => {
    setSearch(e.target.value);
    setPageNumber(0);
  }, 300);

  const propagateOnCustomerChange = (selected: number) => {
    if (selected) {
      setPropertiesOptions(
        propertiesDropodwn?.filter((item: any) => item.customer_id === selected)
      );
    } else {
      setPropertiesOptions(propertiesDropodwn);
    }
  };

  const propagateOnPropertyChange = (selected: number) => {
    setProperty(selected);
  };

  useEffect(() => {
    if (sitesDropdown && isSuccessSiteOptions) {
      setSitesOptions(sitesDropdown);
    }
  }, [sitesDropdown, isSuccessSiteOptions]);

  return {
    data,
    isFetching,
    isError,
    pageNumber,
    search,
    handlePageChange,
    handleSearchOnChange,
    customer,
    setCustomer,
    property,
    setProperty,
    site,
    setSite,
    sampleType,
    setSampleType,
    customersOptions,
    isFetchingCustomersOptions,
    propertiesOptions,
    isFetchingPropertiesDropdown,
    sitesOptions,
    isFetchingSitesDropdown,
    labSampleTypesOptions,
    isFetchingLabSampleTypesOptions,
    propagateOnCustomerChange,
    propagateOnPropertyChange,
    handleExportReport,
    isFetchingReport,
    setSearch,
  };
};

export default useLabSampleList;
