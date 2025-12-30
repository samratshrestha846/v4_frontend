import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import transportEmission from '../../../helpers/api/transportEmission';
import { TransportEmissionFormFields } from '../../../types/transportEmission';

type Props = {
  toggleModal: () => void;
  refetch: any;
};

export default function useCreateTransportEmission({
  toggleModal,
  refetch,
}: Props) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const createTransportEmission = (fromData: TransportEmissionFormFields) => {
    return transportEmission.createTransportEmission(fromData);
  };

  const onSuccess = (): void => {
    toast.success('Transport Emission Created Successfully.');
    toggleModal();
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
    setSubmitted(false);
  };

  const createTransportEmissionMutation = useMutation({
    mutationKey: ['create-transport-emission'],
    mutationFn: createTransportEmission,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      origin: yup
        .string()
        .typeError('Origin is invalid')
        .required('Origin is required'),
      destination: yup
        .string()
        .typeError('Destination is invalid')
        .required('Destination is required.'),
      distance: yup
        .number()
        .positive('Distance must be a positive number')
        .typeError('Distance is invalid')
        .required('Distance is required.'),
      vehicle: yup
        .string()
        .typeError('Vehicle is invalid')
        .required('Vehicle is required.'),
      emission_per_kg: yup
        .number()
        .positive('Emission Per Kg must be a positive number')
        .typeError('Emission Per Kg is invalid')
        .required('Emission Per Kg is required.'),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<TransportEmissionFormFields>({ resolver: schemaResolver });

  const onSubmit = async (formData: any) => {
    setSubmitted(true);
    createTransportEmissionMutation.mutate(formData);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
  };
}
