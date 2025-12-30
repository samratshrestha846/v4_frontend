import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import HttpApi from '../../Http/http';
import { STAFF } from '../constants/constant';

type Props = {
  id?: number;
  toggleModal?: () => void;
};

export default function useChangeStaffStatus({ id, toggleModal }: Props) {
  const apiCore = new HttpApi();
  const queryClient = useQueryClient();

  const changeStatus = async (formData: any) => {
    const response = await apiCore.updatePatch(`${STAFF}/${id}`, formData);
    return response.data;
  };

  const onSuccess = (): void => {
    toast.success('Staff Status Changed Successfully.');
    if (toggleModal) {
      toggleModal();
    }
    queryClient.invalidateQueries([STAFF]);
  };

  const onError = () => {
    toast.error('Unable to change status. Please try again.');
  };

  const deleteMutation = useMutation({
    mutationKey: ['update-staff', id],
    mutationFn: changeStatus,
    onSuccess,
    onError,
  });

  const handleChangeStatus = () => {
    const formData: any = { status: 0 };
    deleteMutation.mutate(formData);
  };

  return {
    handleChangeStatus,
  };
}
