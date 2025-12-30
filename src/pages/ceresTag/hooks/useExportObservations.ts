import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ceresTagAPI from '../../../helpers/api/ceresTagAPI';
import { CeresTagObservationQueryParams } from '../../../types/ceresTag/ceresTag';
import filterByFromToDateQueryParams from '../../../helpers/filterHelper';
import { customFileDownloader } from '../../../helpers';

export default function useExportObservations(
  duration: string,
  ceresTagId?: string
) {
  const [isExport, setIsExport] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const exportObservations = () => {
    const params = prepareQueryParams();
    return ceresTagAPI.exportObservations(params, ceresTagId);
  };

  const prepareQueryParams = () => {
    const params: CeresTagObservationQueryParams =
      filterByFromToDateQueryParams(duration);
    return params;
  };

  useEffect(() => {
    if (isExport) {
      exportObservations()
        .then((exportedData) => {
          if (exportedData instanceof Blob || exportedData instanceof File) {
            customFileDownloader({
              fileData: exportedData,
              fileName: `ceres-tags-observations-${new Date().toString()}`,
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

  const handleExportObservations = () => {
    setIsExport(true);
    setIsExporting(true);
  };

  return {
    isExporting,
    handleExportObservations,
  };
}
