import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import moment from 'moment';
import { FleetVehicleFormProps } from '../types/FleetVehicle';
import { FLEET_VEHICLE_LIST, FLEET_VEHICLE } from '../constants/constant';
import HttpApi from '../../Http/http';

export default function useFleetVehicleForm(
  defaultValues: FleetVehicleFormProps
) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const apiCore = new HttpApi();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const schemaResolver = yupResolver(
    yup.object().shape({
      reg_number: yup
        .string()
        .required('Reg number field is required.')
        .typeError('Reg number field is required.'),
      type: yup
        .string()
        .required('Type is required.')
        .typeError('Type is required.'),
      rego_until: yup
        .string()
        .required('Rego until is required.')
        .typeError('Rego  until is required.'),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FleetVehicleFormProps>({
    resolver: schemaResolver,
    defaultValues,
  });
  const createFleetVehicle = async (fromData: FleetVehicleFormProps) => {
    if (id) {
      return apiCore.update(`${FLEET_VEHICLE}/${id}`, fromData);
    }
    return apiCore.create(FLEET_VEHICLE, fromData);
  };

  const navigateToList = () => {
    navigate(location.state?.from || FLEET_VEHICLE_LIST);
  };

  const onSuccess = (): void => {
    toast.success(
      id
        ? 'Fleet Vehicle Created Successfully.'
        : 'Fleet Vehicle Updated Successfully.'
    );
    navigateToList();
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
    mutationKey: ['create-fleet-vehicle'],
    mutationFn: createFleetVehicle,
    onSuccess,
    onError,
  });

  const onSubmit = async (formData: FleetVehicleFormProps) => {
    setSubmitted(true);

    if (formData.purchased_date) {
      formData.purchased_date = moment(formData.purchased_date).format(
        'YYYY-MM-DD'
      );
    }

    if (formData.rego_until) {
      formData.rego_until = moment(formData.rego_until).format('YYYY-MM-DD');
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
    navigateToList,
    onSubmit,
    id,
  };
}
