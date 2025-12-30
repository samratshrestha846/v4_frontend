import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { prepareDynamicUrl } from '@uhub/helpers';
import { FileFormProps } from '../../types/Document';
import HttpApi from '../../../Http/http';
import { FILES, FOLDER_VIEW } from '../../constants/constant';

export default function useFileForm(defaultValues: FileFormProps) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const apiCore = new HttpApi();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const schemaResolver = yupResolver(
    yup.object().shape({
      name: yup
        .string()
        .required('Name is required.')
        .typeError('Name is required.'),
      file: yup
        .mixed()
        .typeError(
          'File should be in jpg, png, jpeg, heic, or pdf format and must have a paper size of A0, A1, A2, A3, A4, A5 or A6.'
        ),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FileFormProps>({
    resolver: schemaResolver,
    defaultValues,
  });

  const createFolder = async (formData: FileFormProps) => {
    if (defaultValues.name) {
      return apiCore.update(`${FILES}/${id}`, formData);
    }
    return apiCore.createWithFile(FILES, formData);
  };

  const navigateToList = () => {
    navigate(location.state?.from || prepareDynamicUrl(FOLDER_VIEW, id));
  };

  const onSuccess = (): void => {
    toast.success(
      id ? 'File Updated Successfully.' : 'File Created Successfully.'
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
    mutationKey: ['create-file'],
    mutationFn: createFolder,
    onSuccess,
    onError,
  });

  const onSubmit = async (formData: FileFormProps) => {
    setSubmitted(true);
    if (formData.file) {
      formData.file = formData.file ? formData.file[0] : [];
    }

    if (formData.file_path) {
      delete formData.file_path;
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
  };
}
