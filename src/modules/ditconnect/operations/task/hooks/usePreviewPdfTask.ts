import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { prepareDynamicUrl } from '@uhub/helpers';
import HttpApi from '../../../Http/http';
import { TASK_PREVIEW_PDF } from '../constants/constant';

export default function usePreviewPdfTask(id: number) {
  const [isDownloadedReport, setIsDownloadedReport] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const apiCore = new HttpApi();
  const downloadPdf = () => {
    return apiCore.get(prepareDynamicUrl(TASK_PREVIEW_PDF, id));
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
      downloadPdf()
        .then((response: { data: any }) => {
          if (response) {
            downloadReport({
              fileData: response.data,
              fileName: `task-${id}`,
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
  }, [id, isDownloadedReport]);

  const handleDownloadPdf = () => {
    setIsDownloadedReport(true);
    return null;
  };

  return {
    handleDownloadPdf,
    loading,
  };
}
