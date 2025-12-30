import { Dispatch, SetStateAction, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import permission from '../../../../helpers/api/permission';
import { ExplicitPermissionFormFields } from '../../../../types/permission/permissionList';

type Props = {
  refetch: () => void;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export default function useAssignExplicitPermissions({
  refetch,
  setShowModal,
}: Props) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const assignExplicitPermissions = (
    fromData: ExplicitPermissionFormFields
  ) => {
    return permission.assignExplicitPermissions(fromData);
  };

  const onSuccess = (): void => {
    toast.success('Permissions Assigned Successfully.');
    refetch();
  };

  const onError = (error: any) => {
    if (error.response && error.response.status === 417) {
      setServerValidationError(true);
      const errorData = error.response.data.errors;
      Object.keys(errorData).forEach((key) => {
        setError(key as any, {
          type: 'server',
          message: errorData[key][0],
        });
      });
    } else {
      toast.error(error.response.data.status.message);
    }
  };

  const assignExplicitPermissionsMutation = useMutation({
    mutationKey: ['assign-explicit-permissions'],
    mutationFn: assignExplicitPermissions,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(yup.object().shape({}));

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ExplicitPermissionFormFields>({ resolver: schemaResolver });

  const onSubmit = async (formData: ExplicitPermissionFormFields) => {
    setSubmitted(true);
    formData.user_id = Number(formData.user_id);
    formData.permission_id = formData.permission_id?.map((item) =>
      Number(item)
    );
    assignExplicitPermissionsMutation.mutate(formData);
    setShowModal(false);
    setSubmitted(false);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    assignExplicitPermissionsMutation,
    submitted,
    setSubmitted,
    onSubmit,
  };
}
