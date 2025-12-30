import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import moment from 'moment';
import udose from '../../../../helpers/api/udose';

export default function useExportAssetUsage() {
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const exportAssetUsageReport = () => {
    const params: {
      report_date?: string;
    } = prepareQueryParams();
    return udose.exportAssetUsageReport(params);
  };

  const {
    data: exportedReport,
    isFetching: isFetchingReport,
    isFetched: isFetchedReport,
  } = useQuery({
    queryKey: ['export-asset-usage', isExporting],
    queryFn: exportAssetUsageReport,
    refetchOnWindowFocus: false,
    enabled: !!isExporting,
  });
  const prepareQueryParams = () => {
    const params: {
      report_date?: string;
    } = {};

    if (selectedDate) {
      params.report_date = moment(selectedDate).format('YYYY-MM');
    }

    return params;
  };

  useEffect(() => {
    if (exportedReport && isFetchedReport) {
      downloadAssetUsageReport({
        fileData: exportedReport,
        fileName: `Asset Usage Report ${new Date()}`,
        fileExtension: 'xlsx',
      });
      setIsExporting(false);
    }
  }, [isFetchedReport]);
  const downloadAssetUsageReport = (details: {
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

  const handleExportReport = () => {
    setIsExporting(true);
    return null;
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return {
    handleExportReport,
    isExporting,
    isFetchingReport,
    isToggled,
    setIsToggled,
    handleDateChange,
    selectedDate,
  };
}
