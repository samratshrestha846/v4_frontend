import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import udoseApi from '../../../../helpers/api/udose';

export default function useExportUdoseList({ filters }: { filters: any }) {
  const [isExportList, setIsExportList] = useState<boolean>(false);

  const exportUdoseList = () => {
    const params: any = filters;
    return udoseApi.exportUdoseList(params);
  };

  const {
    data: exportedList,
    isFetching: isExportingList,
    isFetched: isExportededList,
  } = useQuery({
    queryKey: ['export-udose-list', isExportList],
    queryFn: exportUdoseList,
    refetchOnWindowFocus: false,
    enabled: !!isExportList,
  });

  const downloadExportedUdoseList = (details: {
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
      downloadExportedUdoseList({
        fileData: exportedList,
        fileName: `Udose Lists ${new Date()}`,
        fileExtension: 'xlsx',
      });
      setIsExportList(false);
    }
  }, [isExportededList]);

  const handleExportList = () => {
    setIsExportList(true);
    return null;
  };

  return { handleExportList, isExportingList };
}
