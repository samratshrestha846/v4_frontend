import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import moment from 'moment';
import report from '../../../../helpers/api/report';
import ExportDeviceParams from '../../../../types/report/device';

const useExportDeviceActivities = () => {
  const [isExportNewInstalled, setIsExportNewInstalled] =
    useState<boolean>(false);
  const [isExportSwapped, setIsExportSwapped] = useState<boolean>(false);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const exportDeviceNewInstalled = () => {
    const params = prepareQueryParams();
    return report.exportDeviceNewInstalled(params);
  };

  const {
    data: installedReport,
    isFetching: isFetchingInstalledReport,
    isFetched: isFetchedInstalledReport,
  } = useQuery({
    queryKey: ['export-device-installed-report', isExportNewInstalled],
    queryFn: exportDeviceNewInstalled,
    refetchOnWindowFocus: false,
    enabled: !!isExportNewInstalled,
  });

  const exportDeviceSwappedReport = () => {
    const params = prepareQueryParams();
    return report.exportDeviceSwappedReport(params);
  };

  const {
    data: swappedReport,
    isFetching: isFetchingSwappedReport,
    isFetched: isFetchedSwappedReport,
  } = useQuery({
    queryKey: ['export-device-swapped-report', isExportSwapped],
    queryFn: exportDeviceSwappedReport,
    refetchOnWindowFocus: false,
    enabled: !!isExportSwapped,
  });

  const prepareQueryParams = () => {
    const params: ExportDeviceParams = {};
    if (startDate) {
      params.as_of_date_from = moment(startDate).format('YYYY-MM-DD');
    }
    if (startDate) {
      params.as_of_date_to = moment(endDate).format('YYYY-MM-DD');
    }
    return params;
  };

  useEffect(() => {
    setStartDate(moment().startOf('month').toDate());
    setEndDate(moment().toDate());
  }, []);

  useEffect(() => {
    if (isFetchedInstalledReport) {
      setIsExportNewInstalled(false);

      if (installedReport instanceof Blob || installedReport instanceof File) {
        fileDownloader({
          fileData: installedReport,
          fileName: 'device-fresh-installation',
          fileExtension: 'xlsx',
        });
        toast.success('File Downloaded Successfully');
      } else {
        toast.error('Oops! something went wrong');
      }
    }

    if (isFetchedSwappedReport) {
      setIsExportSwapped(false);
      if (swappedReport instanceof Blob || swappedReport instanceof File) {
        fileDownloader({
          fileData: swappedReport,
          fileName: 'device-swap-overs',
          fileExtension: 'xlsx',
        });
        toast.success('File Downloaded Successfully');
      } else {
        toast.error('Oops! something went wrong');
      }
    }
  }, [isFetchedInstalledReport, isFetchedSwappedReport]);

  const fileDownloader = (details: {
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

  const handleExportNewInstalledDevices = () => {
    if (startDate && endDate) {
      setIsExportNewInstalled(true);
    } else {
      toast.warning('Please select the start and end date.');
    }
  };

  const handleExportSwappedDevices = () => {
    if (startDate && endDate) {
      setIsExportSwapped(true);
    } else {
      toast.warning('Please select the start and end date.');
    }
  };

  return {
    isFetchingInstalledReport,
    isFetchingSwappedReport,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    handleExportNewInstalledDevices,
    handleExportSwappedDevices,
  };
};

export default useExportDeviceActivities;
