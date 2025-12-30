import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import udoseSettings from '../../../../../../helpers/api/udose/udoseSettings';

type Props = {
  editModal: boolean;
  setEditModal: Dispatch<SetStateAction<boolean>>;
};

export default function useUpdateDeviceSettings({
  editModal,
  setEditModal,
}: Props) {
  const { id } = useParams();
  const [agreed, setAgreed] = useState(false);

  const toggleAgree = () => {
    setAgreed(!agreed);
  };

  const updateDeviceSettings = (fromData: any) => {
    return udoseSettings.updateDeviceSettings(fromData, id);
  };

  const onSuccess = (): void => {
    setEditModal(!editModal);
    toast.success(
      `The request to update setting has been sent successfully. Please allow 3-5 mins to change the settings in device`
    );
  };

  const onError = (error: any) => {
    toast.error(`${error.response.data.status.code_text}`);
  };

  const updateDeviceSettingsMutation = useMutation({
    mutationKey: ['update-device-settings'],
    mutationFn: updateDeviceSettings,
    onSuccess,
    onError,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    let requestBody;
    if (entries.length > 2) {
      requestBody = entries.reduce((acc: any, [key, val]) => {
        if (key !== 'agreeTerms') {
          acc[key] = val;
        }
        return acc;
      }, {});
    } else {
      requestBody = entries.reduce((acc: any, [key, val]) => {
        if (key !== 'agreeTerms') {
          acc.key = key;
          acc.value = val;
        }
        return acc;
      }, {});
    }

    await updateDeviceSettingsMutation.mutate(requestBody);
  };

  return { agreed, toggleAgree, setAgreed, handleSubmit };
}
