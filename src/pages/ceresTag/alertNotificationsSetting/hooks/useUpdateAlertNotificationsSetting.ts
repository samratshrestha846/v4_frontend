import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { PropertyFormValues } from '../../../../types/property/propertyList';
import { CERES_TAGS_LIST } from '../../../../constants/path';
import customerProperty from '../../../../helpers/api/customerProperty';
import { DEFAULT_ALERT_ACTIVITY_INTERVAL } from '../../../../constants/ceresTagConstants';
import useReadProperty from '../../../property/hooks/useReadProperty';

export default function useUpdateAlertNotificationsSetting() {
  const { id } = useParams();
  const [agreed, setAgreed] = useState(false);

  const navigate = useNavigate();

  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [activityAlertNone, setActivityAlertNone] = useState(true);
  const [activityAlertLow, setActivityAlertLow] = useState(true);
  const [activityAlertHigh, setActivityAlertHigh] = useState(true);

  const [enableActivityAlertNone, setEnableActivityAlertNone] = useState(false);
  const [enableActivityAlertLow, setEnableActivityAlertLow] = useState(false);
  const [enableActivityAlertHigh, setEnableActivityAlertHigh] = useState(false);

  const {
    data: propertyDetail,
    isError,
    isFetching,
    refetch,
  } = useReadProperty(Number(id));

  useEffect(() => {
    if (propertyDetail) {
      setActivityAlertNone(
        propertyDetail?.settings?.ceres_tag
          ?.enable_alert_type_activity_threshold_none
          ? propertyDetail?.settings?.ceres_tag
              ?.enable_alert_type_activity_threshold_none
          : true
      );

      setActivityAlertLow(
        propertyDetail?.settings?.ceres_tag
          ?.enable_alert_type_activity_threshold_low
          ? propertyDetail?.settings?.ceres_tag
              ?.enable_alert_type_activity_threshold_low
          : true
      );

      setActivityAlertHigh(
        propertyDetail?.settings?.ceres_tag
          ?.enable_alert_type_activity_threshold_high
          ? propertyDetail?.settings?.ceres_tag
              ?.enable_alert_type_activity_threshold_high
          : true
      );

      setEnableActivityAlertNone(
        propertyDetail.settings?.ceres_tag
          ?.enable_frequent_alert_type_activity_threshold_none ?? false
      );

      setEnableActivityAlertLow(
        propertyDetail?.settings?.ceres_tag
          ?.enable_frequent_alert_type_activity_threshold_low ?? false
      );

      setEnableActivityAlertHigh(
        propertyDetail?.settings?.ceres_tag
          ?.enable_frequent_alert_type_activity_threshold_high ?? false
      );
    }
  }, [propertyDetail]);

  const updatePropertyAlertNotiticationsSetting = (fromData: any) => {
    return customerProperty.updatePropertyAlertNotiticationsSetting(
      fromData,
      id
    );
  };

  const navigateToCeresTagList = () => {
    navigate(CERES_TAGS_LIST);
  };

  const onSuccess = (): void => {
    setSubmitted(false);
    toast.success('Alert Notification Settings Updated Successfully.');
    refetch();
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

  const updatePropertyAlertNotiticationsSettingMutation = useMutation({
    mutationKey: ['create-lab-report'],
    mutationFn: updatePropertyAlertNotiticationsSetting,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      settings: yup.object().shape({
        ceres_tag: yup.object().shape({
          enable_frequent_alert_type_activity_threshold_none: yup.boolean(),
          frequency_alert_type_activity_threshold_none: yup
            .mixed()
            .when('enable_frequent_alert_type_activity_threshold_none', {
              is: true,
              then: yup
                .number()
                .integer('Must be non decimal value.')
                .positive('Must be positive numeric value.')
                .max(1440, 'Must be less than or equal to 1440')
                .min(30, 'Must be greater than or equal to 30')
                .typeError('Must be numeric value.')
                .required(
                  'This field is required when frequent alert is enabled.'
                ),
              otherwise: yup.mixed().notRequired(),
            }),

          enable_frequent_alert_type_activity_threshold_low: yup.boolean(),
          frequency_alert_type_activity_threshold_low: yup
            .mixed()
            .when('enable_frequent_alert_type_activity_threshold_low', {
              is: true,
              then: yup
                .number()
                .integer('Must be non decimal value.')
                .positive('Must be positive numeric value.')
                .max(1440, 'Must be less than or equal to 1440')
                .min(30, 'Must be greater than or equal to 30')
                .typeError('Must be numeric value.')
                .required(
                  'This field is required when frequent alert is enabled.'
                ),
              otherwise: yup.mixed().notRequired(),
            }),

          enable_frequent_alert_type_activity_threshold_high: yup.boolean(),
          frequency_alert_type_activity_threshold_high: yup
            .mixed()
            .when('enable_frequent_alert_type_activity_threshold_high', {
              is: true,
              then: yup
                .number()
                .integer('Must be non decimal value.')
                .positive('Must be positive numeric value.')
                .max(1440, 'Must be less than or equal to 1440')
                .min(30, 'Must be greater than or equal to 30')
                .typeError('Must be numeric value.')
                .required(
                  'This field is required when frequent alert is enabled.'
                ),
              otherwise: yup.mixed().notRequired(),
            }),
        }),
      }),
      agreed: yup
        .boolean()
        .oneOf([true], 'Please check this box to proceed.')
        .required('Please check this box to proceed.'),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<PropertyFormValues>({
    resolver: schemaResolver,
    defaultValues: {
      settings: {
        ceres_tag: {
          enable_alert_type_activity_threshold_none: true,
          enable_alert_type_activity_threshold_low: true,
          enable_alert_type_activity_threshold_high: true,
          enable_frequent_alert_type_activity_threshold_none: false,
          enable_frequent_alert_type_activity_threshold_low: false,
          enable_frequent_alert_type_activity_threshold_high: false,
          frequency_alert_type_activity_threshold_none:
            DEFAULT_ALERT_ACTIVITY_INTERVAL,
          frequency_alert_type_activity_threshold_low:
            DEFAULT_ALERT_ACTIVITY_INTERVAL,
          frequency_alert_type_activity_threshold_high:
            DEFAULT_ALERT_ACTIVITY_INTERVAL,
        },
      },
      agreed: false,
    },
  });

  useEffect(() => {
    if (propertyDetail) {
      reset({
        customer_id: propertyDetail.customer?.id,
        name: propertyDetail.name,
        region_id: propertyDetail.region?.id,
        settings: propertyDetail.settings
          ? propertyDetail.settings
          : {
              optiweigh: {
                is_enable: false,
                client_id: null,
              },
            },
        agreed: false,
      });
    }
  }, [propertyDetail]);

  const onSubmit = async (formData: PropertyFormValues) => {
    setSubmitted(true);
    if (
      formData.settings?.ceres_tag?.frequency_alert_type_activity_threshold_high
    ) {
      formData.settings.ceres_tag.frequency_alert_type_activity_threshold_high =
        Number(
          formData.settings?.ceres_tag
            .frequency_alert_type_activity_threshold_high
        );
    }

    if (
      formData.settings?.ceres_tag?.frequency_alert_type_activity_threshold_low
    ) {
      formData.settings.ceres_tag.frequency_alert_type_activity_threshold_low =
        Number(
          formData.settings?.ceres_tag
            .frequency_alert_type_activity_threshold_low
        );
    }

    if (
      formData.settings?.ceres_tag?.frequency_alert_type_activity_threshold_none
    ) {
      formData.settings.ceres_tag.frequency_alert_type_activity_threshold_none =
        Number(
          formData.settings?.ceres_tag
            .frequency_alert_type_activity_threshold_none
        );
    }
    updatePropertyAlertNotiticationsSettingMutation.mutate(formData);
  };

  return {
    propertyDetail,
    isError,
    isFetching,
    refetch,

    register,
    control,
    handleSubmit,
    onSubmit,
    errors,
    serverValidationError,
    setServerValidationError,
    submitted,

    navigateToCeresTagList,

    agreed,
    setAgreed,
    activityAlertNone,
    setActivityAlertNone,
    activityAlertLow,
    setActivityAlertLow,
    activityAlertHigh,
    setActivityAlertHigh,

    enableActivityAlertNone,
    setEnableActivityAlertNone,
    enableActivityAlertLow,
    setEnableActivityAlertLow,
    enableActivityAlertHigh,
    setEnableActivityAlertHigh,
  };
}
