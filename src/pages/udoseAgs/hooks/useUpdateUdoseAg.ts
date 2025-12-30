import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { UDOSE_AG_LIST } from '../../../constants/path';
import udoseAgs from '../../../helpers/api/udoseAgs';
import { UdoseAgsFormValues } from '../../../types/udoseAgs/udoseAgs';
import useReadUdoseAg from './useReadUdoseAg';

export default function useUpdateUdoseAg() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [serverValidationError, setServerValidationError] =
    useState<boolean>(false);

  const [submitted, setSubmitted] = useState(false);

  const { data: udoseAgDetail, isError, isFetching } = useReadUdoseAg();

  const updateUdoseAg = (fromData: UdoseAgsFormValues) => {
    return udoseAgs.updateUdoseAg(fromData, id);
  };

  const navigateToUdoseAgList = () => {
    navigate(UDOSE_AG_LIST);
  };

  const onSuccess = (): void => {
    setSubmitted(false);
    toast.success('Udose Ag Updated Successfully.');
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

  const updateUdoseAgMutation = useMutation({
    mutationKey: ['update-udose-ag'],
    mutationFn: updateUdoseAg,
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
    reset,
    setError,
    formState: { errors },
  } = useForm<UdoseAgsFormValues>({
    resolver: schemaResolver,
  });

  const onSubmit = async (formData: any) => {
    setSubmitted(true);
    if (formData.installed_at)
      formData.installed_at = moment(formData.installed_at).format(
        'YYYY-MM-DD hh:mm:ss'
      );
    updateUdoseAgMutation.mutate(formData);
  };

  useEffect(() => {
    if (udoseAgDetail) {
      reset({
        name: udoseAgDetail.name,
        customer_id: udoseAgDetail.customer_id,
        device_id: udoseAgDetail.device_id,
        installed_at: moment(udoseAgDetail.installed_at).toDate(),
        status: udoseAgDetail.status ? 1 : 0,
        trailer_no: udoseAgDetail.trailer_no,
      });
    }
  }, [udoseAgDetail]);

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    updateUdoseAgMutation,
    navigateToUdoseAgList,
    submitted,
    udoseAgDetail,
    isError,
    isFetching,
  };
}
