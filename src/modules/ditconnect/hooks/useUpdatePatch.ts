import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import HttpApi from '../Http/http';

type Props = {
  title: string;
  data: Record<string, any>;
  endpoint: string;
  refetchKey: string;
  toggleModal: () => void;
};

export default function useUpdatePatch({
  title,
  data,
  endpoint,
  refetchKey,
  toggleModal,
}: Props) {
  const apiCore = new HttpApi();

  const queryClient = useQueryClient();

  const updatePatch = async () => {
    return apiCore.updatePatch(endpoint, data);
  };

  const onSuccess = (): void => {
    toast.success(`Update Successfully.`);
    queryClient.invalidateQueries({ queryKey: [refetchKey] });
    toggleModal();
  };

  const onError = () => {
    toast.error(`Unable to update ${title}. Please try again.`);
    toggleModal();
  };

  const updatePatchMutation = useMutation({
    mutationKey: [`${title}-update-patch`],
    mutationFn: updatePatch,
    onSuccess,
    onError,
  });

  const updatePatchRecord = () => {
    updatePatchMutation.mutate();
  };
  return {
    updatePatchRecord,
    isLoading: updatePatchMutation.isLoading,
  };
}
