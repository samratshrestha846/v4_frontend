import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  FLEET_MAINTENANCE,
  FLEET_MAINTENANCE_STATUS_COMPLETED,
} from '../constants/constant';
import HttpApi from '../../Http/http';
import { FleetMaintenanceResponse } from '../types/FleetMaintenance';

type Props = {
  maintenance: FleetMaintenanceResponse;
  toggleModal: () => void;
};

export default function useMarksAsCompletedFleetMaintenance({
  maintenance,
  toggleModal,
}: Props) {
  const apiCore = new HttpApi();
  const queryClient = useQueryClient();

  const markAsCompleted = async (updatePatchFormData: any) => {
    const response = apiCore.update(
      `${FLEET_MAINTENANCE}/${maintenance.id}`,
      updatePatchFormData
    );
    return response.data;
  };

  const onSuccess = () => {
    toast.success('Marked As Completed Successfully.');
    queryClient.invalidateQueries({
      queryKey: [FLEET_MAINTENANCE],
    });
    toggleModal();
  };

  const onError = () => {
    toast.error('Unable to mark as Completed. Please try again.');
  };

  const markAsCompletedMutation = useMutation({
    mutationKey: ['mark-as-completed-maintenance', maintenance.id],
    mutationFn: markAsCompleted,
    onSuccess,
    onError,
  });

  const handleMarkAsCompleted = () => {
    markAsCompletedMutation.mutate({
      ...maintenance,
      maintenance_status: FLEET_MAINTENANCE_STATUS_COMPLETED,
    });
  };

  return {
    handleMarkAsCompleted,
  };
}
