import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import moment from 'moment';
import { LabSampleFormProps } from '../types/LabSample';
import { LAB_SAMPLE_LIST, LAB_SAMPLE } from '../constants/constant';
import HttpApi from '../../Http/http';

export default function useLabSampleForm(defaultValues: LabSampleFormProps) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const apiCore = new HttpApi();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const schemaResolver = yupResolver(
    yup.object().shape({
      sample_id: yup
        .number()
        .positive('Sample ID must be a positive numeric value.')
        .nullable()
        .transform((value, originalValue) =>
          originalValue === '' ? null : value
        )
        .typeError('Sample ID must be a numeric value.')
        .test('is-edit', 'Sample ID is required.', (value) => {
          if (id && !value) {
            return false;
          }
          return true;
        }),
      collected_at: yup
        .string()
        .required('Collected at is required.')
        .typeError('Collected at is required.'),
      received_datetime: yup
        .date()
        .nullable()
        .test('is-edit', 'Received at is required.', (value) => {
          if (id && !value) {
            return false;
          }
          return true;
        }),
      sample_type_id: yup
        .number()
        .required('Sample type is required.')
        .typeError('Sample type is required.'),
      other_site: yup.mixed().when('site_id', {
        is: () => watchedSiteID === null || watchedSiteID === undefined,
        then: yup
          .string()
          .typeError('The paddock  is required when site is not selected.')
          .required('The paddock  is required when site is not selected.'),
        otherwise: yup.string().nullable(),
      }),
      ph_value: yup
        .number()
        .max(14, 'Dung freshness score must not be greater than 14.')
        .positive('Dung freshness score must be a positive number.')
        .nullable()
        .transform((value, originalValue) =>
          originalValue === '' ? null : value
        ),
      dung_freshness_score: yup
        .number()
        .max(4, 'Dung freshness score must not be greater than 4.')
        .positive('Dung freshness score must be a positive number.')
        .nullable()
        .transform((value, originalValue) =>
          originalValue === '' ? null : value
        ),
      faecal_score: yup
        .number()
        .max(5, 'Faecal score must not be greater than 5.')
        .positive('Faecal score must be a positive number.')
        .nullable()
        .transform((value, originalValue) =>
          originalValue === '' ? null : value
        ),
      number_of_cattle: yup
        .number()
        .positive('No. of cattle must be a positive number.')
        .nullable()
        .transform((value, originalValue) =>
          originalValue === '' ? null : value
        ),
      images: yup
        .mixed()
        .nullable()
        .test(
          'file-format',
          'Images must be files of type: jpeg, jpg, png, heic.',
          (value) => {
            if (!value) return true;
            const allowedExtensions = ['jpeg', 'jpg', 'png', 'heic'];
            return Array.from(value as FileList).every((file) => {
              const fileExtension = file.name.split('.').pop()?.toLowerCase(); // Extract extension
              return allowedExtensions.includes(fileExtension || '');
            });
          }
        )
        .test(
          'file-size',
          'Each attachment size must not exceed 5MB.',
          (value) => {
            if (!value) return true;
            return Array.from(value as FileList).every(
              (file) => file.size <= 5120 * 1024
            );
          }
        )
        .test('max-files', 'You can upload up to 5 files.', (value) => {
          if (!value) return true;
          return (value as FileList).length <= 5;
        }),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LabSampleFormProps>({
    resolver: schemaResolver,
    defaultValues,
  });
  const createLabSample = async (fromData: LabSampleFormProps) => {
    if (id) {
      return apiCore.createWithFile(`${LAB_SAMPLE}/${id}`, fromData);
    }
    return apiCore.createWithFile(LAB_SAMPLE, fromData);
  };

  const navigateToList = () => {
    navigate(location.state?.from || LAB_SAMPLE_LIST);
  };

  const onSuccess = (): void => {
    toast.success(
      !id
        ? 'LabSample Created Successfully.'
        : 'LabSample Updated Successfully.'
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
    mutationKey: ['create-LabSample'],
    mutationFn: createLabSample,
    onSuccess,
    onError,
  });

  const onSubmit = async (formData: LabSampleFormProps) => {
    setSubmitted(true);

    if (formData.collected_at) {
      formData.collected_at = moment(formData.collected_at)
        .utc()
        .format('YYYY-MM-DD HH:mm');
    }

    if (formData.received_datetime) {
      formData.received_datetime = moment(formData.received_datetime)
        .utc()
        .format('YYYY-MM-DD HH:mm');
    }

    formData.images = formData.images ? Array.from(formData.images) : [];

    formData.used_tablespoon_collection = formData.used_tablespoon_collection
      ? 1
      : 0;

    createMutation.mutate(formData);
  };

  const watchedSampleType = watch('sample_type_id');
  const watchedPropertyID = watch('customer_property_id');
  const watchedSiteID = watch('site_id');

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
    setValue,
    watchedSampleType,
    watchedPropertyID,
  };
}
