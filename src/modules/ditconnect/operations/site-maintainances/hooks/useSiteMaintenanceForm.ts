import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import moment from 'moment';
import { SiteMaintenanceFormProps } from '../types/siteMaintenance';
import HttpApi from '../../../Http/http';
import {
  SITE_MAINTENANCE_LIST,
  SITE_MAINTENANCES,
} from '../constants/constant';

export default function useSiteMaintenanceForm(
  defaultValues: SiteMaintenanceFormProps
) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const apiCore = new HttpApi();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const schemaResolver = yupResolver(
    yup.object().shape({
      site_id: yup
        .number()
        .typeError('Site ID must be an integer.')
        .required('Site ID is required.'),
      device_id: yup
        .number()
        .typeError('Device ID must be an integer.')
        .required('Device ID is required.'),
      customer_notes: yup
        .string()
        .nullable()
        .typeError('Customer notes must be a string.'),
      admin_notes: yup
        .string()
        .typeError('Admin notes must be a string.')
        .required('Admin notes are required.'),
      date: yup
        .date()
        .typeError('Date must be a valid date.')
        .required('Date is required.')
        .test(
          'before-or-equal',
          'Date must be before or equal to today.',
          (value) => {
            if (value === null || value === undefined) return true;
            return moment(value).isSameOrBefore(moment(), 'day');
          }
        ),
      attachments: yup
        .mixed()
        .nullable()
        .test(
          'file-format',
          'Attachments must be files of type: jpeg, jpg, png, heic.',
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
  } = useForm<SiteMaintenanceFormProps>({
    resolver: schemaResolver,
    defaultValues,
  });
  const createSiteMaintainenace = async (
    fromData: SiteMaintenanceFormProps
  ) => {
    if (id) {
      return apiCore.createWithFile(`${SITE_MAINTENANCES}/${id}`, fromData);
    }
    return apiCore.createWithFile(SITE_MAINTENANCES, fromData);
  };

  const navigateToList = () => {
    navigate(location.state?.from || SITE_MAINTENANCE_LIST);
  };

  const onSuccess = (): void => {
    toast.success(
      id
        ? 'Site Maintenance Updated Successfully.'
        : 'Site Maintenance Created Successfully.'
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

  const createSaleMutation = useMutation({
    mutationKey: ['create-site-maintainenance'],
    mutationFn: createSiteMaintainenace,
    onSuccess,
    onError,
  });

  const onSubmit = async (formData: SiteMaintenanceFormProps) => {
    setSubmitted(true);
    formData.attachments = formData.attachments
      ? Array.from(formData.attachments)
      : [];

    if (formData.date) {
      formData.date = moment(formData.date).format('YYYY-MM-DD');
    }

    createSaleMutation.mutate(formData);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    createSaleMutation,
    submitted,
    setSubmitted,
    navigateToList,
    onSubmit,
  };
}
