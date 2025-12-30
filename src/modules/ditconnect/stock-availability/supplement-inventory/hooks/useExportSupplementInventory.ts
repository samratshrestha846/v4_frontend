import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { customFileDownloader } from '@uhub/helpers';
import HttpApi from '../../../Http/http';
import { SUPPLEMENT_INVENTORY } from '../constants/constant';

export default function useExportSupplementInventory(filters: any) {
  const [isExport, setIsExport] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const apiCore = new HttpApi();

  const exportSupplementInventory = async (): Promise<any> => {
    const response = await apiCore.getFile(
      `${SUPPLEMENT_INVENTORY}/export`,
      filters
    );
    return response.data;
  };

  useEffect(() => {
    if (isExport) {
      exportSupplementInventory()
        .then((exportedData) => {
          if (exportedData instanceof Blob || exportedData instanceof File) {
            customFileDownloader({
              fileData: exportedData,
              fileName: `supplement-inventory-${new Date().toString()}`,
              fileExtension: 'xlsx',
            });
            toast.success('File Downloaded Successfully');
          } else {
            toast.error('Opps! Swomething went wrong. Please try again later.');
          }
        })
        .catch(() => {
          toast.error('Opps! Swomething went wrong. Please try again later.');
        })
        .finally(() => {
          setIsExport(false);
          setIsExporting(false);
        });
    }
  }, [isExport]);

  const handleExportSupplementInventory = () => {
    setIsExport(true);
    setIsExporting(true);
  };

  return {
    isExporting,
    handleExportSupplementInventory,
  };
}
