import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import useUserDropDownByPlatform from '@uhub/hooks/dropdown/useUserDropDownByPlatform';
import moment from 'moment';
import { TASK_TYPE, TaskFormProps, taskTypeOptions } from '../types/Task';
import { TASK_LIST, TASK } from '../constants/constant';
import { DIT_CONNECT_PLATFORM } from '../../../constants/authKey';
import HttpApi from '../../../Http/http';

export default function useTaskForm(defaultValues: TaskFormProps) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const apiCore = new HttpApi();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const {
    data: userOptions,
    isFetching: isFetchingUserOptions,
    isError: isErrorFetchingUserOptions,
  } = useUserDropDownByPlatform({ platform: DIT_CONNECT_PLATFORM });

  const schemaResolver = yupResolver(
    yup.object().shape({
      type: yup
        .string()
        .required('Task Type is required')
        .oneOf(
          taskTypeOptions.map((v) => v.value),
          'Invalid Task Type'
        ),

      date: yup.string().required('Date is required'),

      assigned_to: yup
        .number()
        .typeError('Assigned To must be a number')
        .required('Assigned To is required'),

      notes: yup.string().nullable(),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
    setValue,
  } = useForm<TaskFormProps>({
    resolver: schemaResolver,
    defaultValues,
  });

  const type = watch('type');
  const createTask = async (fromData: TaskFormProps) => {
    if (id) {
      return apiCore.update(`${TASK}/${id}`, fromData);
    }
    return apiCore.create(TASK, fromData);
  };

  const navigateToList = () => {
    navigate(location.state?.from || TASK_LIST);
  };

  const onSuccess = (): void => {
    toast.success(
      !id ? 'Task Created Successfully.' : 'Task Updated Successfully.'
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
    mutationKey: ['create-Task'],
    mutationFn: createTask,
    onSuccess,
    onError,
  });

  const onSubmit = async (formData: TaskFormProps) => {
    setSubmitted(true);

    if (formData.date) {
      formData.date = moment(formData.date).format('YYYY-MM-DD');
    }
    if (formData.type === TASK_TYPE.SUPPLEMENT_TRANSFER) {
      formData.descriptions = formData.descriptions.map((des) => ({
        ...des,
        qty: Number(des.qty),
      }));
    }
    createMutation.mutate(formData);
  };

  return {
    isEdit: !!id,
    type,
    isLoading: isFetchingUserOptions,
    isError: isErrorFetchingUserOptions,
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
    userOptions,
    setValue,
  };
}
