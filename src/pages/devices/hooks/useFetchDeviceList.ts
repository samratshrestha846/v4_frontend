import { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import moment from 'moment';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import device from '../../../helpers/api/device';
import { DeviceQueryParams } from '../../../types/device/device';

type TagIds = {
  label: string;
  value: string;
};

const useFetchDeviceList = () => {
  const [deviceConfiguration, setDeviceConfiguration] = useState('');
  const [stockType, setStockType] = useState('');
  const [telemetry, setTelemetry] = useState('');
  const [tagIds, setTagIds] = useState<TagIds[]>([]);

  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState('');
  const [asOfDate, setAsOfDate] = useState<Date | null>(new Date());
  const [isToggled, setIsToggled] = useState<boolean>(false);

  const [isExportReport, isSetExportReport] = useState<boolean>(false);

  const prepareQueryParameters = () => {
    const params: DeviceQueryParams = { page: pageNumber + 1 };

    if (search) {
      params.search = search;
    }
    if (deviceConfiguration) {
      params.config = Number(deviceConfiguration);
    }

    if (stockType) {
      params.stock = Number(stockType);
    }

    if (telemetry) {
      params.telemetry = telemetry;
    }

    if (tagIds.length > 0) {
      params.tag_ids = JSON.stringify(tagIds.map((elem) => elem.value));
    }
    if (isToggled && asOfDate) {
      params.as_of_date = moment(asOfDate).format('YYYY-MM-DD');
    }
    return params;
  };

  const fetchDevices = () => {
    const params = prepareQueryParameters();
    return device.fetchDevices(params);
  };

  const handleSearchOnChange = debounce((e) => {
    setSearch(e.target.value);
    setPageNumber(0);
  }, 300);

  const handlePageChange = (e: any) => {
    setPageNumber(e.selected);
  };

  const exportDeviceReport = () => {
    const params: DeviceQueryParams = prepareQueryParameters();
    delete params.page;
    return device.exportDeviceReport(params);
  };

  const {
    data: exportedReport,
    isFetching: isFetchingReport,
    isFetched: isFetchedReport,
  } = useQuery({
    queryKey: ['export-device-report', isExportReport],
    queryFn: exportDeviceReport,
    refetchOnWindowFocus: false,
    enabled: !!isExportReport,
  });

  const downloadDeviceReport = (details: {
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
      downloadDeviceReport({
        fileData: exportedReport,
        fileName: `Devices ${new Date()}`,
        fileExtension: 'xlsx',
      });
      isSetExportReport(false);
    }
  }, [isFetchedReport]);

  const handleExportReport = () => {
    if (asOfDate) {
      isSetExportReport(true);
      return null;
    }
    toast.warning('Please select as of Date.');
    return null;
  };

  const updateLocalStorage = () => {
    const filterParameters = {
      search,
      pageNumber,
      deviceConfiguration,
      stockType,
      telemetry,
      tagIds,
    };
    localStorage.setItem(
      'deviceFilterParameters',
      JSON.stringify(filterParameters)
    );
  };

  const { data, isFetching, isError } = useQuery({
    queryKey: [
      'devices',
      search,
      pageNumber,
      deviceConfiguration,
      stockType,
      telemetry,
      tagIds,
    ],
    queryFn: fetchDevices,
    refetchOnWindowFocus: false,
  });

  if (isFetching) {
    updateLocalStorage();
  }

  return {
    data,
    isFetching,
    isError,
    handleSearchOnChange,
    search,
    pageNumber,
    deviceConfiguration,
    stockType,
    telemetry,
    tagIds,
    asOfDate,
    handlePageChange,
    setDeviceConfiguration,
    setStockType,
    setTelemetry,
    setTagIds,
    setAsOfDate,
    isToggled,
    setIsToggled,
    handleExportReport,
    isFetchingReport,
    setSearch,
  };
};

export default useFetchDeviceList;
