import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useModalFeature from '@uhub/hooks/common/useModalFeature';
import user from '../../../../../../helpers/api/user';

import {
  NotificationSetting,
  UserNotificationFormFields,
} from '../../../../../../types/user/user';

type Props = {
  userId: number;
  initialSettings: NotificationSetting;
};

export default function useNotificationSettings({
  userId,
  initialSettings,
}: Props) {
  const [settings, setSettings] = useState<NotificationSetting>({
    user_id: userId,
    is_turned_on: 0,
    preference: [],
    type: 'alarm',
  });
  const queryClient = useQueryClient();
  const { showModal, toggleModal } = useModalFeature();

  useEffect(() => {
    if (initialSettings) {
      setSettings(initialSettings);
    }
  }, [initialSettings]);

  const onSuccess = () => {
    toast.success('Notification Settings Updated Successfully.');
    queryClient.invalidateQueries({ queryKey: ['read-user', userId] });
    toggleModal();
  };

  const onError = (error: any) => {
    toast.error(
      error.response?.data?.status?.message ||
        'Oops, something went wrong. Please try again later.'
    );
  };

  const updateNotificationSettings = (fromData: UserNotificationFormFields) => {
    return user.notificationSettings(fromData);
  };

  const notificationSettingsMutation = useMutation({
    mutationKey: ['update-notification-settings'],
    mutationFn: updateNotificationSettings,
    onSuccess,
    onError,
  });

  const onSubmit = () => {
    notificationSettingsMutation.mutate({
      user_id: userId,
      settings: [settings],
    });
  };

  const handleNotificationSettingChange = (event: any) => {
    const { checked } = event.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      is_turned_on: checked ? 1 : 0,
    }));
    toggleModal();
  };

  const cancelNotificationSettingChange = () => {
    setSettings((preSettings) => ({
      ...settings,
      is_turned_on: preSettings.is_turned_on ? 0 : 1,
    }));
    toggleModal();
  };

  const handleNotificationPreferenceSettingChange = (event: any) => {
    const { value, checked } = event.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      preference: checked
        ? [...prevSettings.preference, value]
        : prevSettings.preference.filter((pref: string) => pref !== value),
    }));
    toggleModal();
  };

  const cancelNotificationPreferenceSettingChange = (via: string) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      preference: prevSettings.preference.includes(via)
        ? prevSettings.preference.filter((pref: string) => pref !== via)
        : [...prevSettings.preference, via],
    }));
    toggleModal();
  };

  return {
    settings,
    cancelNotificationSettingChange,
    handleNotificationSettingChange,
    handleNotificationPreferenceSettingChange,
    cancelNotificationPreferenceSettingChange,
    onSubmit,
    showModal,
    toggleModal,
  };
}
