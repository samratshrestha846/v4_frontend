import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import labReport from '../../../../helpers/api/labReport';

export default function useDownloadLabReport(labReportId?: number) {
  const [isDownloadedReport, setIsDownloadedReport] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const downloadLabReport = () => {
    return labReport.downloadLabReport(labReportId);
  };

  const downloadReport = (details: {
    fileData: Blob;
    fileName: string;
    fileExtension: string;
  }) => {
    const url = window.URL.createObjectURL(details.fileData);
    const newTab = window.open(url, '_blank');
    if (newTab) {
      newTab.focus();
    } else {
      toast.error('Oops womethign went wrong! Please try again later.');
    }
    setLoading(false);
    setIsDownloadedReport(false);
  };

  useEffect(() => {
    if (isDownloadedReport) {
      setLoading(true);
      downloadLabReport()
        .then((response) => {
          if (response) {
            downloadReport({
              fileData: response.data,
              fileName: `Lab Report ${new Date()}`,
              fileExtension: 'pdf',
            });
          }
        })
        .catch(() => {
          toast.error('Oops something went wrong! Please try again later.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [labReportId, isDownloadedReport]);

  const handleDownloadReport = () => {
    setIsDownloadedReport(true);
    return null;
  };

  return {
    handleDownloadReport,
    loading,
  };
}
