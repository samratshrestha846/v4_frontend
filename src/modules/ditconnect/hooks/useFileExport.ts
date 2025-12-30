import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import HttpApi from '../Http/http';

type Props = {
  filters: any;
  endpoint: string;
  downloadFileName?: string;
  downloadFileExtension?: string;
};

export default function useFileExport({
  filters,
  endpoint,
  downloadFileName = 'File',
  downloadFileExtension = 'xlsx',
}: Props) {
  const [isExportFile, setIsExportFile] = useState<boolean>(false);
  const http = new HttpApi();

  const exportFile = async () => {
    const response = await http.downloadFile(endpoint, filters);
    return response.data;
  };

  const {
    data: exportedList,
    isFetching: isExporting,
    isFetched: isExportededList,
  } = useQuery({
    queryKey: [endpoint, isExportFile],
    queryFn: exportFile,
    refetchOnWindowFocus: false,
    enabled: !!isExportFile,
  });

  const download = (details: {
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
    if (exportedList && isExportededList) {
      download({
        fileData: exportedList,
        fileName: `${downloadFileName}-${new Date().toISOString().split('.').join('_')}`,
        fileExtension: downloadFileExtension,
      });
      setIsExportFile(false);
    }
  }, [isExportededList]);

  const handleExport = () => setIsExportFile(true);

  return { handleExport, isExporting };
}
