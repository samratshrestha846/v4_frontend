import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MaintenanceBookingFormProps } from '../types/MaintenanceBooking';
import { MAINTENANCE_BOOKING } from '../constants/constant';
import HttpApi from '../../../Http/http';

type Props = {
  defaultValues: MaintenanceBookingFormProps;
  toggleModal: () => void;
};

export default function useMaintenanceBookingForm({
  defaultValues,
  toggleModal,
}: Props) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const apiCore = new HttpApi();
  const id = defaultValues?.id;
  const queryClient = useQueryClient();

  const schemaResolver = yupResolver(
    yup.object().shape({
      booking_date: yup
        .string()
        .required('Booking date is required.')
        .typeError('Booking date is required.'),
      assignee_id: yup
        .number()
        .required('Assignee is required.')
        .typeError('Assignee is required.'),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<MaintenanceBookingFormProps>({
    resolver: schemaResolver,
    defaultValues,
  });
  const createMaintenanceBooking = async (
    fromData: MaintenanceBookingFormProps
  ) => {
    if (id) {
      return apiCore.update(`${MAINTENANCE_BOOKING}/${id}`, fromData);
    }
    return apiCore.create(MAINTENANCE_BOOKING, fromData);
  };

  const onSuccess = (): void => {
    toast.success(
      id
        ? 'Maintenance Booking Created Successfully.'
        : 'Maintenance Booking Updated Successfully.'
    );
    toggleModal();
    queryClient.invalidateQueries([
      'fleet-maintenance',
      String(defaultValues?.maintenance_id),
    ]);
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

  const createMutation = useMutation({
    mutationKey: ['create-MaintenanceBooking'],
    mutationFn: createMaintenanceBooking,
    onSuccess,
    onError,
  });

  const onSubmit = async (formData: MaintenanceBookingFormProps) => {
    setSubmitted(true);
    if (formData.booking_date) {
      formData.booking_date = moment(formData.booking_date).format(
        'YYYY-MM-DD'
      );
    }

    createMutation.mutate(formData);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    createMutation,
    submitted,
    setSubmitted,
    onSubmit,
  };
}
