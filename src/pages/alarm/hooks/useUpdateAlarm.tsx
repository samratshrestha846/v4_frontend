import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import apiAlarm from '../../../helpers/api/alarm';
import { AlarmFormValues } from '../../../types/alarm/alarm';
import { ALARM_LIST } from '../../../constants/path';
import useReadAlarm from './useReadAlarm';

export default function useUpdateAlarm(id: number) {
  const navigate = useNavigate();
  const [serverValidationError, setServerValidationError] =
    useState<boolean>(false);

  const [submitted, setSubmitted] = useState(false);

  const { data: alarmDetail, isFetching, isError } = useReadAlarm(Number(id));

  const editorRef = useRef(null);
  const [potentialAction, setPotentialAction] = useState<string>('');

  const updateAlarm = (formData: AlarmFormValues) => {
    return apiAlarm.updateAlarm(id, formData);
  };

  const navigateToAlarmList = () => {
    navigate(ALARM_LIST);
  };

  const onSuccess = (): void => {
    setSubmitted(false);
    toast.success('Alarm Updated Successfully.');
    navigateToAlarmList();
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

  const updateAlarmMutation = useMutation({
    mutationKey: ['update-alarm'],
    mutationFn: updateAlarm,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      severity_level: yup
        .string()
        .required('Severity Level is required.')
        .typeError('Severity Level is invalid.'),
      alarm_code: yup
        .number()
        .positive('Alarm code must be positive numeric value.')
        .required('Alarm code is required.')
        .typeError('Alarm code is invalid.'),
      status: yup
        .boolean()
        .required('Status is required.')
        .typeError('Status is invalid.'),
      visible_to_customers: yup
        .boolean()
        .required('External Visibility is required.')
        .typeError('External Visibility is invalid.'),
      description: yup
        .string()
        .required('Description is required.')
        .typeError('Description is invalid.'),
    })
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm<AlarmFormValues>({
    resolver: schemaResolver,
  });

  const onSubmit = async (formData: AlarmFormValues) => {
    setSubmitted(true);
    const formDataAll = { ...formData, potential_actions: potentialAction };
    updateAlarmMutation.mutate(formDataAll);
  };

  useEffect(() => {
    if (alarmDetail) {
      reset({
        severity_level: alarmDetail.severity_level,
        alarm_code: alarmDetail.alarm_code,
        status: alarmDetail.status,
        visible_to_customers: alarmDetail.visible_to_customers,
        description: alarmDetail.description,
      });
    }
  }, [alarmDetail]);

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    updateAlarmMutation,
    navigateToAlarmList,
    submitted,
    alarmDetail,
    isError,
    isFetching,
    potentialAction,
    setPotentialAction,
    editorRef,
  };
}
