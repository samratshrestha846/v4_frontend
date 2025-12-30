/* eslint-disable camelcase */
import { ChangeEvent, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import { LAB_REPORT_LIST } from '../../../../constants/path';
import {
  CustomerSnapshot,
  LabReportFormValues,
} from '../../../../types/lab/labReport';
import labReport from '../../../../helpers/api/labReport';
import { LabTestResultView } from '../../../../types/lab/labTestResult';
import { LabSample } from '../../../../types/lab/labSampleList';
import labTestResult from '../../../../helpers/api/labTestResult';
import prepareLabTestResults from '../helpers/labHelper';

export default function useCreateLabReport() {
  const navigate = useNavigate();
  const [serverValidationError, setServerValidationError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedLabSamples, setSelectedLabSamples] = useState<LabSample[]>([]);

  const [defaultTestResults, setDefaultTestResults] = useState<
    LabTestResultView[]
  >([]);

  const [otherTestResults, setOtherTestResults] = useState<LabTestResultView[]>(
    []
  );

  const [isExistingProperty, setIsExistingProperty] = useState(false);

  const createLabReport = (fromData: LabReportFormValues) => {
    return labReport.createLabReport(fromData);
  };

  const navigateToLabReportList = () => {
    navigate(LAB_REPORT_LIST);
  };

  const onSuccess = (): void => {
    setSubmitted(false);
    toast.success('Lab Report Created Successfully.');
    navigateToLabReportList();
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

  const createLabReportMutation = useMutation({
    mutationKey: ['create-lab-report'],
    mutationFn: createLabReport,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      lab_sample_ids: yup
        .array()
        .of(yup.number())
        .min(1, 'At least one lab sample is required')
        .typeError('At least one lab sample is required')
        .required('Lab sample is required'),
      summary: yup.string().nullable(),
      recommendation: yup.string().nullable(),
      job_description: yup.string().nullable(),
      sample_condition: yup.string().nullable(),
      report_date: yup
        .date()
        .max(new Date(), 'Report date can not be future date.')
        .typeError('Lab report date is invalid.')
        .required('Lab report date is required.'),
      no_of_sample_received: yup
        .number()
        .positive('No. of sample received must be a positive numeric value.')
        .required('No. of sample received is required.')
        .typeError('No. of sample received is invalid.'),

      is_existing_property: yup.boolean(),
      customer_property_id: yup.mixed().when('is_existing_property', {
        is: true,
        then: yup
          .number()
          .typeError('Customer property is invalid.')
          .required(
            'Customer property is required if property  already exists'
          ),
        otherwise: yup.string().nullable(),
      }),

      customer: yup.mixed().when('is_existing_property', {
        is: false,
        then: yup
          .string()
          .required('Customer name is required.')
          .typeError('Customer name is invalid.'),
        otherwise: yup.string().nullable(),
      }),

      name: yup.string().nullable(),
      email: yup.string().email().nullable(),
      phone: yup
        .string()
        .nullable()
        .test('is-valid-phone', 'Phone number is invalid.', (value) => {
          if (!value) return true;
          return /^\d{5,15}$/.test(value);
        }),
    })
  );

  useEffect(() => {
    if (!isExistingProperty) {
      setValue('customer', '');
      setValue('name', '');
      setValue('phone', '');
      setValue('email', '');
    }
  }, [isExistingProperty]);

  const {
    register,
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<LabReportFormValues>({
    resolver: schemaResolver,
    defaultValues: {
      report_date: new Date(),
      settings: {
        show_supplement: true,
        show_comprehensive_report: false,
        show_summary: false,
        show_recommendation: false,
      },
    },
  });

  const onSubmit = async (formData: LabReportFormValues) => {
    setSubmitted(true);
    const {
      is_existing_property,
      customer,
      name,
      phone,
      email,
      ...cleanedFormData
    } = formData;

    if (isExistingProperty) {
      delete cleanedFormData.customer_snapshot;
    } else {
      const customerSnapshot: CustomerSnapshot = {
        customer: customer ?? '',
        name,
        phone,
        email,
      };
      cleanedFormData.customer_snapshot = customerSnapshot;
      delete cleanedFormData.customer_property_id;
    }

    if (formData.report_date) {
      cleanedFormData.report_date = moment(formData.report_date).format(
        'YYYY-MM-DD'
      );
    }

    cleanedFormData.settings = {
      show_supplement: cleanedFormData?.settings?.show_supplement || false,
      show_comprehensive_report:
        cleanedFormData?.settings?.show_comprehensive_report || false,
      show_summary: cleanedFormData?.settings?.show_summary || false,
      show_recommendation:
        cleanedFormData?.settings?.show_recommendation || false,
    };
    createLabReportMutation.mutate(cleanedFormData);
  };

  const updateLabTestResult = (updatedLabSamples: LabSample[]): void => {
    setSelectedLabSamples(updatedLabSamples);
    const {
      defaultResults: updatedDefaultResults,
      otherResults: updatedOtherResults,
    } = prepareLabTestResults(updatedLabSamples);

    setDefaultTestResults(updatedDefaultResults);
    setOtherTestResults(updatedOtherResults);
    setValue(
      'lab_sample_ids',
      updatedLabSamples?.map((item) => item.id)
    );
    setLoading(false);
  };

  const handleChangeOnLabSampleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const changeLabSampleId = Number(e.target.value);
    setLoading(true);
    if (e.target.checked) {
      labTestResult
        .getLabTestResultByLabSampleById(String(changeLabSampleId))
        .then((res) => {
          const updatedLabSamples = [...selectedLabSamples, ...res];
          updateLabTestResult(updatedLabSamples);
        });
      toast.success('Selected Succesfully');
    } else {
      const updatedLabSamples = selectedLabSamples?.filter(
        (item) => item.id !== changeLabSampleId
      );

      updateLabTestResult(updatedLabSamples);
      toast.info('Removed Succesfully');
    }
  };

  const handleRemoveLabSample = (removedLabSampleId: number) => {
    setLoading(true);
    const updatedLabSamples = selectedLabSamples?.filter(
      (item) => item.id !== removedLabSampleId
    );
    updateLabTestResult(updatedLabSamples);
    setLoading(false);
    toast.info('Removed Succesfully');
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    createLabReportMutation,
    navigateToLabReportList,
    showModal,
    setShowModal,
    handleChangeOnLabSampleSelect,
    submitted,
    defaultTestResults,
    otherTestResults,
    selectedLabSamples,
    loading,
    isExistingProperty,
    setIsExistingProperty,
    handleRemoveLabSample,
  };
}
