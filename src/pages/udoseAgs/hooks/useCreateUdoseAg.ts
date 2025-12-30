import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { UDOSE_AG_LIST } from '../../../constants/path';
import { STATUS_ACTIVE } from '../../../constants/constants';
import udoseAgs from '../../../helpers/api/udoseAgs';
import { UdoseAgsFormValues } from '../../../types/udoseAgs/udoseAgs';

export default function useCreateUdoseAg() {
  const navigate = useNavigate();
  const [serverValidationError, setServerValidationError] =
    useState<boolean>(false);

  const [submitted, setSubmitted] = useState(false);

  const createUdoseAg = (fromData: UdoseAgsFormValues) => {
    return udoseAgs.createUdoseAg(fromData);
  };

  const navigateToUdoseAgList = () => {
    navigate(UDOSE_AG_LIST);
  };

  const onSuccess = (): void => {
    setSubmitted(false);
    toast.success('Udose Ag Created Successfully.');
    navigateToUdoseAgList();
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

  const createUdoseAgMutation = useMutation({
    mutationKey: ['create-udose-ag'],
    mutationFn: createUdoseAg,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      name: yup.string().required('Name is required.'),
      customer_id: yup
        .number()
        .typeError('Customer is invalid.')
        .required('Customer is required.'),
      device_id: yup
        .number()
        .typeError('Device is invalid.')
        .required('Device is required.'),
      installed_at: yup
        .date()
        .typeError('Installed at is invalid.')
        .required('Installed at is required.'),
      status: yup
        .number()
        .typeError('Status is invalid.')
        .required('Status is required.'),
      trailer_no: yup
        .string()
        .typeError('Trailer number is invalid.')
        .required('Trailer number is required.'),
    })
  );

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<UdoseAgsFormValues>({
    resolver: schemaResolver,
    defaultValues: {
      installed_at: moment().toDate(),
      status: STATUS_ACTIVE,
    },
  });

  const onSubmit = async (formData: any) => {
    setSubmitted(true);
    if (formData.installed_at)
      formData.installed_at = moment(formData.installed_at).format(
        'YYYY-MM-DD hh:mm:ss'
      );
    createUdoseAgMutation.mutate(formData);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    createUdoseAgMutation,
    navigateToUdoseAgList,
    submitted,
  };
}
