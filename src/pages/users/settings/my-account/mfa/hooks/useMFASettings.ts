import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  User,
  UserPreferenceFormFields,
} from '../../../../../../types/user/user';
import userApi from '../../../../../../helpers/api/user';
import useModalFeature from '../../../../../../hooks/common/useModalFeature';
import {
  USER_PREFERENCE_MFA_DISABLED,
  USER_PREFERENCE_MFA_ENABLED,
} from '../../../../../../constants/userConstants';
import { PREFERENCE_MFA_KEY } from '../../constants/constant';

export default function useMFASettings(user?: User) {
  const [userPreferences, setUserPreferences] = useState<
    { key: string; value: string }[]
  >([{ key: PREFERENCE_MFA_KEY, value: 'disabled' }]);

  const queryClient = useQueryClient();

  const { showModal, toggleModal } = useModalFeature();

  useEffect(() => {
    const mfaPreference = user?.preferences?.find(
      (item) => item.key === PREFERENCE_MFA_KEY
    );

    if (mfaPreference) {
      setUserPreferences([
        { key: mfaPreference.key, value: mfaPreference.value },
      ]);
    }
  }, [user]);

  const updateUserPreferenceSettings = (fromData: UserPreferenceFormFields) => {
    return userApi.updateUserPreferenceSettings(user!.id, fromData);
  };

  const onSuccess = () => {
    toast.success('User Preference Settings Updated Successfully.');
    toggleModal();
    queryClient.invalidateQueries({ queryKey: ['read-user', user?.id] });
  };

  const onError = (error: any) => {
    toast.error(
      error.response?.data?.status?.message ||
        'Oops, something went wrong. Please try again later.'
    );
  };

  const updateUserPreferenceSettingsMutation = useMutation({
    mutationKey: ['update-user-preference-settings'],
    mutationFn: updateUserPreferenceSettings,
    onSuccess,
    onError,
  });

  useEffect(() => {
    if (user?.preferences && user?.preferences?.length > 0) {
      setUserPreferences(user.preferences);
    }
  }, [user]);

  const handleCancel = () => {
    const previousUserPreference = userPreferences?.map((p) => {
      return {
        ...p,
        value:
          p.value === USER_PREFERENCE_MFA_DISABLED
            ? USER_PREFERENCE_MFA_ENABLED
            : USER_PREFERENCE_MFA_DISABLED,
      };
    });
    setUserPreferences(previousUserPreference);
    toggleModal();
  };

  const handleChange = (event: any, preference: any) => {
    const { checked } = event.target;
    const updatedPreferences = userPreferences?.map((p) => {
      if (p.key === preference.key) {
        return {
          ...p,
          value: checked
            ? USER_PREFERENCE_MFA_ENABLED
            : USER_PREFERENCE_MFA_DISABLED,
        };
      }
      return p;
    });
    setUserPreferences(updatedPreferences);
    toggleModal();
  };

  const handleConfirmationSave = () => {
    const payload: UserPreferenceFormFields = {
      preferences: userPreferences.map((p) => ({
        key: p.key,
        value: p.value,
      })),
    };
    updateUserPreferenceSettingsMutation.mutate(payload);
  };

  return {
    userPreferences,
    handleChange,
    handleConfirmationSave,
    showModal,
    toggleModal,
    handleCancel,
  };
}
