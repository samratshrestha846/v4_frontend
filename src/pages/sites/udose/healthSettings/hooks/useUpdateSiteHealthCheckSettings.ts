import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import useFetchSiteHealthSettings from './useFetchSiteHealthSettings';
import healthCheckSettings from '../../../../../helpers/api/udose/healthCheckSettings';
import { prepareDynamicUrl } from '../../../../../helpers';
import { UDOSE_VIEW } from '../../../../../constants/path';
import { HealthSettingConfiguration } from '../../../../../types/udose/siteHealthSettings';

export default function useUpdateSiteHealthSettings() {
  const { id } = useParams();
  const [serverValidationError, setServerValidationError] = useState(false);
  const navigate = useNavigate();

  const {
    data: healthSettings,
    isSuccess,
    isFetching,
    isError,
  } = useFetchSiteHealthSettings();

  useEffect(() => {
    if (healthSettings) {
      reset(
        {
          checking_enabled:
            healthSettings?.health_check_configuration?.checking_enabled,
          water_flow:
            healthSettings?.health_check_configuration?.configuration
              .water_flow,
          water_flow_threshold_hours:
            healthSettings?.health_check_configuration?.configuration
              .water_flow_threshold_hours,
          min_water_flow:
            healthSettings?.health_check_configuration?.configuration
              .min_water_flow,
          min_water_flow_threshold:
            healthSettings?.health_check_configuration?.configuration
              .min_water_flow_threshold,

          water_leak:
            healthSettings?.health_check_configuration?.configuration
              .water_leak,
          max_water_flow_limit:
            healthSettings?.health_check_configuration?.configuration
              .max_water_flow_limit,
          max_water_flow_limit_hrs:
            healthSettings?.health_check_configuration?.configuration
              .max_water_flow_limit_hrs,
          tank_level:
            healthSettings?.health_check_configuration?.configuration
              .tank_level,
          tank_level_threshold:
            healthSettings?.health_check_configuration?.configuration
              .tank_level_threshold,
        },
        { keepTouched: true }
      );
    }
  }, [healthSettings]);

  const navigateToUdoseSiteView = () => {
    navigate(prepareDynamicUrl(UDOSE_VIEW, id));
  };

  const onSuccess = (): void => {
    toast.success('Site Health Check Setting Updated Successfully.');
    navigateToUdoseSiteView();
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
  };

  const updateSiteHealthCheckSettings = (
    fromData: HealthSettingConfiguration
  ) => {
    return healthCheckSettings.updateSiteHealthCheckSettings(fromData, id);
  };

  const updateSiteHealthCheckSettingsMutation = useMutation({
    mutationKey: ['update-site-health-check-settings', id],
    mutationFn: updateSiteHealthCheckSettings,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      max_water_flow_limit: yup
        .number()
        .positive('Must be a positive numeric value')
        .typeError('This field must be numeric value')
        .required('This field is Required.'),
      max_water_flow_limit_hrs: yup
        .number()
        .positive('Must be a positive numeric value')
        .typeError('This field must be numeric value')
        .required('This field is Required.'),
      tank_level_threshold: yup
        .number()
        .positive('Must be a positive numeric value')
        .typeError('This field must be numeric value')
        .required('This field is Required.'),
      water_flow_threshold_hours: yup
        .number()
        .positive('Must be a positive numeric value')
        .typeError('This field must be numeric value')
        .required('This field is Required.'),
      min_water_flow_threshold: yup
        .number()
        .positive('Must be a positive numeric value')
        .typeError('This field must be numeric value')
        .required('This field is Required.'),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm<HealthSettingConfiguration>({
    resolver: schemaResolver,
  });

  const onSubmit = async (formData: HealthSettingConfiguration) => {
    updateSiteHealthCheckSettingsMutation.mutate(formData);
  };

  return {
    register,
    control,
    handleSubmit,
    onSubmit,
    errors,
    serverValidationError,
    setServerValidationError,
    healthSettings,
    isSuccess,
    isFetching,
    isError,
    navigateToUdoseSiteView,
    setValue,
  };
}
