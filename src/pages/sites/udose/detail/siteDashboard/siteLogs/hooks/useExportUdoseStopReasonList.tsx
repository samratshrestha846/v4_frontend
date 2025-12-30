import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import apiUdose from '../../../../../../../helpers/api/udose';
import { UdoseStopReasonFilterParam } from '../../../../../../../types/udose/udoseStopReason';

export default function useExportUdoseStopReasonList(siteId: number) {
  const [isExportList, setIsExportList] = useState<boolean>(false);

  const exportUdoseStopReasonList = () => {
    const params: UdoseStopReasonFilterParam = {};
    if (siteId) {
      params.site_id = siteId;
    }
    return apiUdose.exportUdoseStopReason(params);
  };

  const {
    data: exportedList,
    isFetching: isExportingList,
    isFetched: isExportededList,
  } = useQuery({
    queryKey: ['export-udose-stop-reason', isExportList],
    queryFn: exportUdoseStopReasonList,
    refetchOnWindowFocus: false,
    enabled: !!isExportList,
  });

  const downloadExportedUdoseStopReasonList = (details: {
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
      downloadExportedUdoseStopReasonList({
        fileData: exportedList,
        fileName: `UdoseStopReasonList ${new Date()}`,
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
