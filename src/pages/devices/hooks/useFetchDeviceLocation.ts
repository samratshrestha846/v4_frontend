import { APICore } from '../../../helpers/api/apiCore';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

const useFetchDeviceLocation = () => {
  const api = new APICore();

  const onSuccess = () => {
    toast.success('Update location command submitted successfully');
  };

  const onError = () => {
    toast.error('Error submitting update location command');
  };

  const fetchDeviceLocation = async (deviceId: number) => {
    await api.create(`devices/${deviceId}/locations`, { deviceId });
  };

  const { mutateAsync } = useMutation({
    mutationFn: fetchDeviceLocation,
    onSuccess,
    onError,
  });

  const updateLocation = async (deviceId: number) => {
    await mutateAsync(deviceId);
  };

  return { updateLocation };
};

export default useFetchDeviceLocation;
