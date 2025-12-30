import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { CeresTagHistoricalDataFormFields } from '../../../types/ceresTag/ceresTag';
import ceresTagAPI from '../../../helpers/api/ceresTagAPI';

type Props = {
  ceresTagESN: string;
  toggleModal?: () => void;
};

export default function useRequestHistoricalData({
  ceresTagESN,
  toggleModal,
}: Props) {
  const requestHistoricalData = (
    fromData: CeresTagHistoricalDataFormFields
  ) => {
    return ceresTagAPI.requestHistoricalData(fromData, ceresTagESN);
  };

  const onSuccess = (): void => {
    toast.success('Historical Data Requested Successfully.');
    if (toggleModal) {
      toggleModal();
    }
  };

  const onError = (error: any) => {
    toast.error(error.response.data.status.message);
  };

  const requestHistoricalDataMutation = useMutation({
    mutationKey: ['request-historical-data'],
    mutationFn: requestHistoricalData,
    onSuccess,
    onError,
  });

  const sendRequest = async () => {
    requestHistoricalDataMutation.mutate({ esn: ceresTagESN });
  };

  return {
    sendRequest,
  };
}
